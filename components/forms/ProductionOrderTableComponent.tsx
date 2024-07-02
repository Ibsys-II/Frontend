import React, {ChangeEvent, useEffect, useState} from "react";
import {Box, Card, Divider, Input, Typography, useTheme} from "@mui/joy";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import styled from "styled-components";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {GOOD_TO_PRODUCE} from "@/contexts/ApplicationContext";
import PropsSimulationForm from "@/components/forms/formProps";
import {ProductionOrder} from "@/api/neu/productionOrder";
import {SaleAndProductionProgram} from "@/api/neu/saleAndProductionProgram";
import {CustomTableSimple} from "@/components/shared/CustomTableSimple";

export const ProductionOrderTableComponent: React.FC<PropsSimulationForm> = (props) => {
    const { onSubmit } = props;
    const appContext = useApplicationContext();
    const [productionOrderListToShow, setProductionOrderListToShow] = useState<ProductionOrder[]>([]);

    const {
        data: productionOrderList,
        isLoading,
        error,
        mutate: mutateProductionOrderList,
    } = useSWR<ProductionOrder[]>(`getAllProductionOrder`, appContext.getAllProductionOrder);

    const {
        data: saleAndProductionProgramList,
        isLoading: isSaleAndProductionProgramLoading,
        error: saleAndProductionProgramError,
    } = useSWR<SaleAndProductionProgram[]>(`SaleAndProductionProgram`, appContext.getAllSaleAndProductionProgram);

    useEffect(() => {
        setProductionOrderListToShow(productionOrderList ?? []);
    }, [productionOrderList, props]);

    const resolveProductionOrderOfSpecificGood = (good: GOOD_TO_PRODUCE): ProductionOrder[] => {
        console.log("productionOrderListToShow: ", productionOrderListToShow);
        return sortProductionOrdersOfGood(good, productionOrderListToShow);
    }

    const resolveProductionProgramOfGood = (good: GOOD_TO_PRODUCE): SaleAndProductionProgram => {
        return saleAndProductionProgramList!.find((s) => s.article === good)!;
    }

    const headerCells = [
        <Typography level={"body-sm"}>Artikel</Typography>,
        <Typography level={"body-sm"}>Vertriebswunsch</Typography>,
        <Typography level={"body-sm"}>Warteschlange</Typography>,
        <Typography level={"body-sm"}>Geplanter Sicherheitsbestand</Typography>,
        <Typography level={"body-sm"}>Lagerbestand Vorperiode</Typography>,
        <Typography level={"body-sm"}>Aufträge noch in Warteschlange</Typography>,
        <Typography level={"body-sm"}>Aufträge in Bearbeitung</Typography>,
        <Typography level={"body-sm"}>Produktionsauftrag</Typography>,
    ];

    const handlePlannedSafetyStockChange = async (id: string, event: ChangeEvent<HTMLInputElement>) => {
        if (!productionOrderList) return;

        const value = event.target.value ?? 0;

        // Update UI
        setProductionOrderListToShow(prev =>
            prev.map((p) => p.id === id ? {...p, plannedSafetyStock: parseInt(value) } : p )
        );

        const productionOrderToUpdate = productionOrderList.find((p) => p.id === id);

        if (!productionOrderToUpdate) return;

        const updatedProductionOrder: ProductionOrder = {
            ...productionOrderToUpdate,
            plannedSafetyStock: parseInt(value)
        };

        await appContext.updateProductionOrder(updatedProductionOrder);

        await mutateProductionOrderList();
    }

    if (isLoading ||
        isSaleAndProductionProgramLoading ||
        !productionOrderList ||
        !saleAndProductionProgramList
    ) return <div>Wird geladen</div>

    if (productionOrderListToShow.length === 0) return <Card>Keine Daten vorhanden. Importiere erst Daten aus der XML-Datei</Card>

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>

    if (saleAndProductionProgramError) return <div>{`Fehler beim Laden: ${(saleAndProductionProgramError as Error).toString()}`}</div>

    return (
        <PageSectionComponent
            title="Stücklistenauflösung"
            subtitle="Stücklisten auflösen"
        >
            <FormGroupContainer>
                <Box component="div">
                    <Typography level={"title-md"} fontWeight={600}>Kinderfahrrad {GOOD_TO_PRODUCE.CHILDREN_BIKE}</Typography>
                    <Typography color="primary">
                        Produktionsprogramm: {resolveProductionProgramOfGood(GOOD_TO_PRODUCE.CHILDREN_BIKE).pN} Stk.
                    </Typography>
                </Box>
                <Divider />
                <CustomTableSimple
                    headerCells={headerCells}
                    rows={resolveProductionOrderOfSpecificGood(GOOD_TO_PRODUCE.CHILDREN_BIKE).map((p, index) =>
                        <TableRow
                            key={index}
                            productionOrder={p}
                            onPlannedSafetyStockChange={handlePlannedSafetyStockChange}
                        />
                    )}
                />
            </FormGroupContainer>

            <FormGroupContainer>
                <Box component="div">
                    <Typography level={"title-md"} fontWeight={600}>Damenfahrrad {GOOD_TO_PRODUCE.WOMEN_BIKE}</Typography>
                    <Typography color="primary">
                        Produktionsprogramm: {resolveProductionProgramOfGood(GOOD_TO_PRODUCE.WOMEN_BIKE).pN} Stk.
                    </Typography>
                </Box>
                <Divider />
                <CustomTableSimple
                    headerCells={headerCells}
                    rows={resolveProductionOrderOfSpecificGood(GOOD_TO_PRODUCE.WOMEN_BIKE).map((p, index) =>
                        <TableRow
                            key={index}
                            productionOrder={p}
                            onPlannedSafetyStockChange={handlePlannedSafetyStockChange}
                        />
                    )}
                />
            </FormGroupContainer>

            <FormGroupContainer>
                <Box component="div">
                    <Typography level={"title-md"} fontWeight={600}>Herrenfahrrad {GOOD_TO_PRODUCE.MEN_BIKE}</Typography>
                    <Typography color="primary">
                        Produktionsprogramm: {resolveProductionProgramOfGood(GOOD_TO_PRODUCE.MEN_BIKE).pN} Stk.
                    </Typography>
                </Box>
                <Divider />
                <CustomTableSimple
                    headerCells={headerCells}
                    rows={resolveProductionOrderOfSpecificGood(GOOD_TO_PRODUCE.MEN_BIKE).map((p, index) =>
                        <TableRow
                            key={index}
                            productionOrder={p}
                            onPlannedSafetyStockChange={handlePlannedSafetyStockChange}
                        />
                    )}
                />
            </FormGroupContainer>
        </PageSectionComponent>
    );
};

const sortProductionOrdersOfGood = (good: GOOD_TO_PRODUCE, productionOrders: ProductionOrder[]): ProductionOrder[] => {
    const productionOrdersOfGood = productionOrders.filter((p) => p.usedFor === good);
    switch (good) {
        case GOOD_TO_PRODUCE.CHILDREN_BIKE:
            return [
                productionOrdersOfGood.find((b) => b.articleNumber === 1)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 26)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 51)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 16)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 17)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 50)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 4)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 10)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 49)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 7)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 13)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 18)!,
            ];
        case GOOD_TO_PRODUCE.WOMEN_BIKE:
            return [
                productionOrdersOfGood.find((b) => b.articleNumber === 2)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 26)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 56)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 16)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 17)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 55)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 5)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 11)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 54)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 8)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 14)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 19)!,
            ];
        case GOOD_TO_PRODUCE.MEN_BIKE:
            return [
                productionOrdersOfGood.find((b) => b.articleNumber === 3)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 26)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 31)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 16)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 17)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 30)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 6)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 12)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 29)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 9)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 15)!,
                productionOrdersOfGood.find((b) => b.articleNumber === 20)!,
            ];
        default:
            return productionOrders;
    }
};

type PropsGridRow = {
    productionOrder: ProductionOrder,
    onPlannedSafetyStockChange: (id: string, event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}
const TableRow: React.FC<PropsGridRow> = (props) => {
    const { productionOrder: p, onPlannedSafetyStockChange } = props;
    const theme = useTheme();
    const color = p.productionOrder < 0 ? "rgba(196,28,28,0.44)" : "unset";

    return (
        <Box
            component={"tr"}
            sx={{
                "&:hover": {
                    //backgroundColor: p.productionOrder < 0 ? color : theme.vars.palette.neutral.outlinedHoverBg,
                    backgroundColor: p.productionOrder < 0 ? color : theme.vars.palette.primary["500"],
                    "& *:not(nth-child(n))": {
                        color: "white"
                    },
                },
                backgroundColor: color,
            }}
        >
            <Box component={"td"} fontWeight={600}>{p.article}</Box>
            <Box component={"td"}>{p.saleOrder ?? 0}</Box>
            <Box component={"td"}>{p.waitingQueue ?? 0}</Box>
            <Box component={"td"}>
                <Input
                    value={p.plannedSafetyStock}
                    type="number"
                    placeholder={"Menge eingeben"}
                    onChange={(e) => onPlannedSafetyStockChange(p.id, e)}
                    error={p.productionOrder < 0}
                    sx={{ color }}
                />
            </Box>
            <Box component={"td"}>{p.warehousePreviousPeriod}</Box>
            <Box component={"td"}>{p.ordersInWaitingQueue}</Box>
            <Box component={"td"}>{p.workInProgress}</Box>
            <Box component={"td"}>{p.productionOrder ?? 0}</Box>
        </Box>
    )
}

const FormGroupContainer = styled(Card)`
    display: grid;
    grid-gap: var(--gap-2);
`;
