"use client";
import React, {ChangeEvent, Ref, useEffect, useRef, useState} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {Button, Card, Divider, Stack, Typography} from "@mui/joy";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import xmlFormat from "xml-formatter";
import convert from "xml-js";
import {ForecastDto} from "@/api/forecast";
import useApplicationContext from "@/hooks/useApplicationContext";
import {WarehouseStockDto} from "@/api/warehousestock";
import {OrderDto} from "@/api/order";
import {WorkplaceDto} from "@/api/workplace";
import {WaitingListDto} from "@/api/waitingList";
import {BatchDto} from "@/api/batch";

const SimulationFromXmlFilePage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>();
    const appContext = useApplicationContext();
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [fileContent, setFileContent] = useState<string | undefined>(undefined);

    // Data from xlm upload for simulation
    // Forecast
    const [forecastDto, setForecastDto] = useState<ForecastDto | undefined>(undefined);
    // WarehouseStocks
    const [warehouseStockDtoList, setWarehouseStockDtoList] = useState<WarehouseStockDto[] | undefined>(undefined);
    // All orders
    const [ordersInwardStockMovement, setOrdersInwardStockMovement] = useState<OrderDto[] | undefined>(undefined);
    const [ordersFutureInwardStockMovement, setOrdersFutureInwardStockMovement] = useState<OrderDto[] | undefined>(undefined);
    const [ordersCompletedOrders, setOrdersCompletedOrders] = useState<OrderDto[] | undefined>(undefined);
    const [ordersCycleTimes, setOrdersCycleTimes] = useState<OrderDto[] | undefined>(undefined);
    // Work places
    const [workPlacesIdleTimeCosts, setWorkPlacesIdleTimeCosts] = useState<WorkplaceDto[] | undefined>(undefined);
    const [workPlacesWaitingListWorkStations, setWorkPlacesWaitingListWorkStations] = useState<WorkplaceDto[] | undefined>(undefined);
    const [workPlacesWaitingListStock, setWorkPlacesWaitingListStock] = useState<WorkplaceDto[] | undefined>(undefined);
    const [workPlacesOrdersInWork, setWorkPlacesOrdersInWork] = useState<WorkplaceDto[] | undefined>(undefined);
    // Waiting lists
    const [waitingListWorkStations, setWaitingListWorkStations] = useState<WaitingListDto[] | undefined>(undefined);
    const [waitingListsWaitingListStock, setWaitingListsWaitingListStock] = useState<WaitingListDto[] | undefined>(undefined);
    // Batches
    const [batchesCompletedOrders, setBatchesCompletedOrders] = useState<BatchDto[] | undefined>(undefined);

    useEffect(() => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.onload = handleFileRead;
        reader.readAsText(selectedFile, "utf-8");

        return () => {
            reader.abort();
        }
    }, [selectedFile]);

    useEffect(() => {
        if (!fileContent) return;
        const jsonString = convert.xml2json(fileContent, { compact: true, spaces: 4 });
        const jsonResult = JSON.parse(jsonString);

        setForecastDto(resolveForecastDtoFromRawJson(jsonResult));
        setWarehouseStockDtoList(resolveWarehouseStocksDtoFromRawJson(jsonResult));
        setOrdersInwardStockMovement(resolveOrdersInwardStockMovement(jsonResult));
        setOrdersFutureInwardStockMovement(resolveOrdersFutureInwardStockMovement(jsonResult));
        setWorkPlacesIdleTimeCosts(resolveWorkPlacesIdleTimeCosts(jsonResult));
        setWorkPlacesWaitingListWorkStations(resolveWorkPlacesWaitingListWorkStations(jsonResult));
        setWaitingListWorkStations(resolveWaitingListWorkStations(jsonResult));
        setWorkPlacesWaitingListStock(resolveWorkPlacesWaitingListStock(jsonResult));
        setWaitingListsWaitingListStock(resolveWaitingListsWaitingListStock(jsonResult));
        setWorkPlacesOrdersInWork(resolveWorkPlacesOrdersInWork(jsonResult));
        setOrdersCompletedOrders(resolveOrdersCompletedOrders(jsonResult));
        setBatchesCompletedOrders(resolveBatchesCompletedOrders(jsonResult));
        setOrdersCycleTimes(resolveOrdersCycleTimes(jsonResult));

    }, [fileContent]);

    const openFileDialog = () => {
        if (!inputRef.current) return;
        inputRef.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSelectedFile((event.target.files as unknown as File[])[0]);
    }

    const handleFileRead = (event: any) => {
        setFileContent(event.target.result);
    }

    const sendDataForSimulation = () => {
        // Forecast
        appContext.createForecast(forecastDto!);

        // WarehouseStocks
        appContext.createMultipleWarehouseStocks(warehouseStockDtoList!);

        // All Orders
        appContext.createMultipleOrders(ordersInwardStockMovement!);
        appContext.createMultipleOrders(ordersFutureInwardStockMovement!);
        appContext.createMultipleOrders(ordersCompletedOrders!);
        appContext.createMultipleOrders(ordersCycleTimes!);

        // Work places
        appContext.createMultipleWorkplaces(workPlacesIdleTimeCosts!);
        appContext.createMultipleWorkplaces(workPlacesWaitingListWorkStations!);
        appContext.createMultipleWorkplaces(workPlacesWaitingListStock!);
        appContext.createMultipleWorkplaces(workPlacesOrdersInWork!);

        // Waiting lists
        appContext.createMultipleWaitingLists(waitingListWorkStations!);
        appContext.createMultipleWaitingLists(waitingListsWaitingListStock!);

        // Batches
        appContext.createMultipleBatches(batchesCompletedOrders!);
    }

    // TODO: Move these functions to the business logik
    const resolveForecastDtoFromRawJson = (rawJson: any): ForecastDto => {
        // @ts-ignore
        return {
            ...Object.entries(rawJson.results.forecast._attributes)
                .map(([key, value]) => ({[key]: Number(value)}))
                .reduce((acc, curr) => ({...acc, ...curr}), {}),
            period: appContext.period
        };
    }

    const resolveWarehouseStocksDtoFromRawJson = (rawJson: any): WarehouseStockDto[] => {
        return rawJson
            .results
            .warehousestock
            .article
            .map((article: any) => ({
                ...Object.entries(article._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                period: appContext.period,
                articleId: Number(article._attributes.id),
                startAmount: Number(article._attributes.startamount),
                stockValue: Number(article._attributes.stockvalue),
            }))
            .map((obj: any) => removePropertiesFromOfObject(
                ["id", "articleid", "startamount", "startamount", "stockvalue"],
                obj
            ));
    }

    const resolveOrdersInwardStockMovement = (rawJson: any): OrderDto[] => {
        return rawJson
            .results
            .inwardstockmovement
            .order
            .map((order: any) => ({
                ...Object.entries(order._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                period: Number(order._attributes.orderperiod),
                materialCosts: Number(order._attributes.materialcosts),
                orderCosts: Number(order._attributes.ordercosts),
                entireCosts: Number(order._attributes.entirecosts),
                pieceCosts: Number(order._attributes.piececosts),
                isInwardStockMovement: true,
                idFromXml: Number(order._attributes.id),
                articleId: Number(order._attributes.article),
            }))
    }

    const resolveOrdersFutureInwardStockMovement = (rawJson: any): OrderDto[] => {
        if (!rawJson.results.futureinwardstockmovement.hasOwnProperty("order")) return [];
        return rawJson
            .results
            .futureinwardstockmovement
            .order
            .map((order: any) => ({
                ...Object.entries(order._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                period: Number(order._attributes.orderperiod),
                mode: Number(order._attributes.mode),
                isFutureInwardStockMovement: true,
                idFromXml: Number(order._attributes.id),
                articleId: Number(order._attributes.article),
            }))
    }

    const resolveWorkPlacesIdleTimeCosts = (rawJson: any): WorkplaceDto[] => {
        return rawJson
            .results
            .idletimecosts
            .workplace
            .map((workplace: any) => ({
                ...Object.entries(workplace._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                period: appContext.period,
                idFromXml: Number(workplace._attributes.id),
                number: Number(workplace._attributes.id),
                setupEvents: Number(workplace._attributes.setupevents),
                idleTime: Number(workplace._attributes.idletime),
                wageIdleTimeCosts: Number(workplace._attributes.wageidletimecosts),
                wageCosts: Number(workplace._attributes.wagecosts),
                machineIdleTimeCosts: Number(workplace._attributes.machineidletimecosts),
                isIdleTimeCosts: true,
            }))
    }

    const resolveWorkPlacesWaitingListWorkStations = (rawJson: any): WorkplaceDto[] => {
        return rawJson
            .results
            .waitinglistworkstations
            .workplace
            .map((workplace: any) => ({
                ...Object.entries(workplace._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                period: appContext.period,
                number: Number(workplace._attributes.id),
                timeNeed: Number(workplace._attributes.timeneed),
                isWaitingListWorkStations: true,
            }))
    }

    const resolveWaitingListWorkStations = (rawJson: any): WaitingListDto[] => {
        const waitingListDtoList: WaitingListDto[] = [];

        const rawData = rawJson
            .results
            .waitinglistworkstations
            .workplace;

        for (const workplace of rawData) {
            const workPlaceId = parseInt(workplace._attributes.id);

            if (!workplace.hasOwnProperty("waitinglist")) continue;
            if (workplace.waitinglist.hasOwnProperty("_attributes")) {
                const item = workplace.waitinglist;
                waitingListDtoList.push({
                    period: parseInt(item._attributes.period),
                    order: parseInt(item._attributes.order),
                    firstBatch: parseInt(item._attributes.firstbatch),
                    lastBatch: parseInt(item._attributes.lastbatch),
                    item: parseInt(item._attributes.item),
                    amount: parseInt(item._attributes.amount),
                    timeNeed: parseInt(item._attributes.timeneed),
                    workPlaceId
                });
                continue;
            }

            for (const item of workplace.waitinglist) {
                waitingListDtoList.push({
                    period: parseInt(item._attributes.period),
                    order: parseInt(item._attributes.order),
                    firstBatch: parseInt(item._attributes.firstbatch),
                    lastBatch: parseInt(item._attributes.lastbatch),
                    item: parseInt(item._attributes.item),
                    amount: parseInt(item._attributes.amount),
                    timeNeed: parseInt(item._attributes.timeneed),
                    workPlaceId
                });
            }
        }

        return waitingListDtoList;

    };

    const resolveWorkPlacesWaitingListStock = (rawJson: any): WorkplaceDto[] => {
        return rawJson
            .results
            .waitingliststock
            .missingpart
            .map((missingpart: any) => {
                const workPlace = missingpart.workplace;
                if (workPlace.hasOwnProperty("_attributes")) {
                    return {
                        period: appContext.period,
                        number: Number(workPlace._attributes.id),
                        timeNeed: Number(workPlace._attributes.timeneed),
                        isMissingPart: true,
                        isWaitingListStock: true,
                    }
                }

                return workPlace.map((w: any) => ({
                    period: appContext.period,
                    number: Number(w._attributes.id),
                    timeNeed: Number(w._attributes.timeneed),
                    isMissingPart: true,
                    isWaitingListStock: true,
                }))
            })
            .filter((w: any) => w)
            .flat()
    }

    const resolveWaitingListsWaitingListStock = (rawJson: any): WaitingListDto[] => {
        const waitingListDtoList: WaitingListDto[] = [];

        const rawData = rawJson
            .results
            .waitingliststock
            .missingpart;

        for (const missingpart of rawData) {
            const workPlace = missingpart.workplace;
            const workPlaceId = 0;

            if (!workPlace.hasOwnProperty("waitinglist")) continue;

            if (!workPlace.hasOwnProperty("_attributes")) {
                for (const item of workPlace) {
                    waitingListDtoList.push({
                        period: parseInt(item._attributes.period),
                        order: parseInt(item._attributes.order),
                        firstBatch: parseInt(item._attributes.firstbatch),
                        lastBatch: parseInt(item._attributes.lastbatch),
                        item: parseInt(item._attributes.item),
                        amount: parseInt(item._attributes.amount),
                        timeNeed: parseInt(item._attributes.timeneed),
                        workPlaceId
                    });
                }
                continue;
            }

            if (workPlace.waitinglist.hasOwnProperty("_attributes")) {
                const item = workPlace.waitinglist;
                waitingListDtoList.push({
                    period: parseInt(item._attributes.period),
                    order: parseInt(item._attributes.order),
                    firstBatch: parseInt(item._attributes.firstbatch),
                    lastBatch: parseInt(item._attributes.lastbatch),
                    item: parseInt(item._attributes.item),
                    amount: parseInt(item._attributes.amount),
                    timeNeed: parseInt(item._attributes.timeneed),
                    workPlaceId
                });
                continue;
            }

            for (const item of workPlace.waitinglist) {
                waitingListDtoList.push({
                    period: parseInt(item._attributes.period),
                    order: parseInt(item._attributes.order),
                    firstBatch: parseInt(item._attributes.firstbatch),
                    lastBatch: parseInt(item._attributes.lastbatch),
                    item: parseInt(item._attributes.item),
                    amount: parseInt(item._attributes.amount),
                    timeNeed: parseInt(item._attributes.timeneed),
                    workPlaceId
                });
            }
        }

        return waitingListDtoList;
    }

    const resolveWorkPlacesOrdersInWork = (rawJson: any): WorkplaceDto[] => {
        return rawJson
            .results
            .ordersinwork
            .workplace
            .map((workplace: any) => ({
                ...Object.entries(workplace._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                period: appContext.period,
                number: Number(workplace._attributes.id),
                timeNeed: Number(workplace._attributes.timeneed),
                isOrdersInWork: true,
            }))
    }

    const resolveOrdersCompletedOrders = (rawJson: any): OrderDto[] => {
        return rawJson
            .results
            .completedorders
            .order
            .map((order: any) => ({
                ...Object.entries(order._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                period: Number(order._attributes.orderperiod),
                averageUnitCosts: Number(order._attributes.averageunitcosts),
                isCompletedOrders: true,
                articleId: Number(order._attributes.id),
            }))
    }

    const resolveBatchesCompletedOrders = (rawJson: any): BatchDto[] => {
        return rawJson
            .results
            .completedorders
            .order
            .map((order: any) => {
                const batches = order.batch;
                const orderObj = order._attributes;

                if (!Array.isArray(batches)) {
                    const batchObj = batches._attributes;
                    return {
                        period: Number(orderObj.period),
                        amount: Number(batchObj.amount),
                        cycleTime: Number(batchObj.cycletime),
                        cost: Number(batchObj.cost),
                        itemNumber: Number(orderObj.item),
                    }
                }
                return batches.map((item: any) => ({
                    period: Number(orderObj.period),
                    amount: Number(item._attributes.amount),
                    cycleTime: Number(item._attributes.cycletime),
                    cost: Number(item._attributes.cost),
                    itemNumber: Number(orderObj.item),
                }))
            })
            .flat()
    }

    const resolveOrdersCycleTimes = (rawJson: any): OrderDto[] => {
        return rawJson
            .results
            .cycletimes
            .order
            .map((order: any) => ({
                ...Object.entries(order._attributes)
                    .map(([key, value]) => ({[key]: Number(value)}))
                    .reduce((acc, curr) => ({...acc, ...curr}), {}),
                startTime: Number(order._attributes.starttime),
                finishTime: Number(order._attributes.finishtime),
                averageUnitCosts: Number(order._attributes.averageunitcosts),
                cycleTimeMin: Number(order._attributes.cycletimemin),
                cycleTimeFactor: Number(order._attributes.cycletimefactor),
                isCycleTime: true,
                articleId: Number(order._attributes.id),
            }))
    }

    const removePropertiesFromOfObject = (properties: string[], obj: any) => {
        return Object.fromEntries(
            Object.entries(obj).filter(([key, _value]) => !properties.includes(key))
        );
    };

    return (
        <PageWrapperComponent title={"Aus XML-Datei simulieren"} showPeriod>
            <Button onClick={openFileDialog}>
                Wähle eine Datei aus
                <input
                    ref={inputRef as Ref<HTMLInputElement>}
                    type="file"
                    hidden
                    multiple={false}
                    onChange={handleFileChange}
                />
            </Button>
            {selectedFile ?
                <Stack spacing={"var(--gap-2)"} sx={{ mt: "var(--gap-4)" }}>
                    <Typography>{`Dateinname: ${selectedFile.name}`}</Typography>
                    <Typography>{`Größe: ${(selectedFile.size / 1000).toFixed(2)} KB`}</Typography>
                </Stack> : null}

            {fileContent ?
                <Card sx={{ mt: "var(--gap-3)" }}>
                    <Stack
                        direction="row" spacing="var(--gap-3)"
                        justifyContent={"space-between"}
                        justifyItems={"space-between"}
                        alignItems={"center"}
                        alignContent={"center"}
                    >
                        <Stack direction="row" spacing="var(--gap-1)">
                            <InsertDriveFileOutlinedIcon />
                            <Typography level="title-md">Inhalt der Datei</Typography>
                        </Stack>
                        <Button onClick={sendDataForSimulation}>Simulieren</Button>
                    </Stack>
                    <Divider />
                    <Stack>
                        <pre>{xmlFormat(fileContent)}</pre>
                    </Stack>
                </Card> : null}
        </PageWrapperComponent>
    );
};

export default SimulationFromXmlFilePage;

