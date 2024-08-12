"use client";
import React, {useEffect, useState} from "react";
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {Button} from "@mui/joy";
import {SupplyChainInput} from "@/api/neu/export";
import * as XmlJs from 'xml-js';
import useSWR from "swr";
import {getVertriebswunsch, Vertriebswunsch} from "@/api/neu/vertriebswunsch";
import {getAllSaleAndProductionProgramApi, SaleAndProductionProgram} from "@/api/neu/saleAndProductionProgram";
import {ProductionOrder} from "@/api/neu/productionOrder";
import useApplicationContext from "@/hooks/useApplicationContext";

const ExportComponent: React.FC = () => {
    const appContext = useApplicationContext();
    const [planedData, setPlanedData] = useState<SupplyChainInput | undefined>(undefined);
    const { data: vertriebswunsch } = useSWR<Vertriebswunsch>("getVertriebswunsch", getVertriebswunsch);
    const { data: allSaleAndProductionProgram } = useSWR<SaleAndProductionProgram[]>(
        "getAllSaleAndProductionProgram",
        getAllSaleAndProductionProgramApi
    );

    const {
        data: productionOrderList,
        isLoading,
        error,
        mutate: mutateProductionOrderList,
    } = useSWR<ProductionOrder[]>(`getAllProductionOrder`, appContext.getAllProductionOrder);

    useEffect(() => {
        const planedDataToUpdate: SupplyChainInput = {
            input: {
                qualitycontrol: {
                    type: "no",
                    delay: 0,
                    losequantity: 0,
                },
                sellwish: vertriebswunsch ? [
                    {
                        item: {
                            article: 1,
                            quantity: vertriebswunsch.p1PNPlusOne,
                        }
                    },
                    {
                        item: {
                            article: 2,
                            quantity: vertriebswunsch.p2PNPlusOne,
                        }
                    },
                    {
                        item: {
                            article: 3,
                            quantity: vertriebswunsch.p3PNPlusOne,
                        }
                    },
                ] : [],
                selldirect: allSaleAndProductionProgram ? [
                    {
                        item: {
                            article: 1,
                            quantity: allSaleAndProductionProgram.find((s) => s.article === "P1")?.pN ?? 0,
                            price: 100,
                            penalty: 0
                        }
                    },
                    {
                        item: {
                            article: 2,
                            quantity: allSaleAndProductionProgram.find((s) => s.article === "P2")?.pN ?? 0,
                            price: 100,
                            penalty: 0
                        }
                    },
                    {
                        item: {
                            article: 3,
                            quantity: allSaleAndProductionProgram.find((s) => s.article === "P3")?.pN ?? 0,
                            price: 100,
                            penalty: 0
                        }
                    }
                ] : [],
                orderlist: [],
                productionlist: productionOrderList ? productionOrderList.map((po) => ({
                    production: {
                        article: po.articleNumber,
                        quantity: po.saleOrder,
                    }
                })) : [],
                workingtimelist: [],
            }
        };
        setPlanedData(planedDataToUpdate);
    }, [vertriebswunsch]);

    const handleExport = () => {
        // TODO: Implement export logic
        console.log("Exporting simulation data...");

        if (!planedData) return;

        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const result = XmlJs.js2xml(mapDataToExport(planedData), options);

        console.log('---------------ExportXmlComponent', result)
        const blob = new Blob([result], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.xml';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }

    return (
        <PageWrapperComponent title={"Datenexport"}>
            <Button variant={"solid"} onClick={handleExport}>
                Simulationsdaten exportieren
            </Button>
        </PageWrapperComponent>
    );
};

const mapDataToExport = (dataToExport: SupplyChainInput) => {
    const {
        qualitycontrol,
        sellwish,
        selldirect,
        orderlist,
        productionlist,
        workingtimelist
    } = dataToExport.input

    return {
        "input": {
            "qualitycontrol": {
                "_attributes": {
                    "type": qualitycontrol.type,
                    "delay": qualitycontrol.delay,
                    "losequantity": qualitycontrol.losequantity
                }
            },
            "sellwish": {
                "item": sellwish.map(({ item }) => {
                    return {
                        "_attributes": {
                            "article": item.article,
                            "quantity": item.quantity
                        }
                    }
                })
            },
            "selldirect": {
                "item": selldirect.map(({ item }) => {
                    return {
                        "_attributes": {
                            "article": item.article,
                            "quantity": item.quantity,
                            "price": item.price,
                            "penalty": item.penalty
                        }
                    }
                })
            },
            "orderlist": {
                "order": orderlist.map(({ order }) => {
                    return {
                        "_attributes": {
                            "article": order.article,
                            "quantity": order.quantity,
                            "modus": order.modus
                        }
                    }
                })
            },
            "productionlist": {
                "production": productionlist.map(({ production }) => {
                    return {
                        "_attributes": {
                            "article": production.article,
                            "quantity": production.quantity
                        }
                    }
                })
            },
            "workingtimelist": {
                "workingtime": workingtimelist.map(({ workingtime }) => {
                    return {
                        "_attributes": {
                            "station": workingtime.station,
                            "shift": workingtime.shift,
                            "overtime": workingtime.overtime
                        }
                    }
                })
            }
        }
    }
}

export default ExportComponent;