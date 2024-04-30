"use client";
import React, {useEffect} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {Order} from "@/api/order";
import {CustomTableComponent} from "@/components/shared/CustomTableComponent";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import {Typography} from "@mui/joy";

const WarehouseAdditionsPage: React.FC = () => {
    const appContext = useApplicationContext();
    const period = appContext.period;

    const {
        data: orders,
        isLoading,
        error,
    } = useSWR<Order[]>(
        `getAppOrderByPeriodAndIsInwardStockMovement-${period}`,
        appContext.getAppOrderByIsInwardStockMovement
    );

    const dataToShow = !orders ? [] : orders.map((order) => ({
        orderNumber: `${order.period} - ${order.idFromXml}`,
        mode: `${order.mode}`,
        article: `${order.articleId}`,
        amount: `${order.amount}`,
        finished: "-",
        materialCosts: `${order.materialCosts?.toFixed(2)} €`,
        orderCosts: `${order.orderCosts?.toFixed(2)} €`,
        entireCosts: `${order.entireCosts?.toFixed(2)} €`,
        pieceCosts: `${order.pieceCosts?.toFixed(2)} €`,
    }));

    if (isLoading || !orders) return <div>Wird geladen</div>;

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>;

    return (
        <PageWrapperComponent title={"Lagerzugänge"} showPeriod>
            <SectionListComponent>
                {orders.length > 0 ?
                    <CustomTableComponent
                        headers={["Bestellauftragsnummer", "Bestellmodus", "Artikel", "Menge", "Periode-Tag-Stunde-Minute", "Materialkosten", "Bestellkosten", "Gesamtkosten", "Stückkosten"]}
                        rows={dataToShow}
                    /> : <Typography>Es sind noch keine Daten vorhanden</Typography>
                }
            </SectionListComponent>
        </PageWrapperComponent>
    );
};

export default WarehouseAdditionsPage;

