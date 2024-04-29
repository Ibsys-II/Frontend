"use client";
import React from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {resolveObjectWithSpecificPropertiesFromList} from "@/contexts/ApplicationContext";
import {WarehouseStock} from "@/api/warehousestock";
import {CustomTableComponent} from "@/components/shared/CustomTableComponent";
import {Typography} from "@mui/joy";

const WarehousePage: React.FC = () => {
    const appContext = useApplicationContext();
    const {
        data: warehouseStocks,
        isLoading,
        error,
    } = useSWR<WarehouseStock[]>("getWarehouseStocksByPeriod", async () => await appContext.getWarehouseStocksByPeriod(appContext.period));

    if (isLoading || !warehouseStocks) return <div>Wird geladen</div>;

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>;

    return (
        <PageWrapperComponent title={"Lagerbestand"}>
            {warehouseStocks.length > 0 ?
                <CustomTableComponent
                    headers={["Menge", "Prozentuale Startmenge", "Preis in €", "Lagerwert", "Artikel"]}
                    rows={resolveObjectWithSpecificPropertiesFromList(warehouseStocks, ["amount", "pct", "price", "stockValue", "articleId"])}
                /> :
                <Typography>Es sind noch keine Daten vorhanden</Typography>
            }
        </PageWrapperComponent>
    );
};

export default WarehousePage;

