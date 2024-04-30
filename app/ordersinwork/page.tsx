"use client";
import React from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {Workplace} from "@/api/workplace";
import {CustomTableComponent} from "@/components/shared/CustomTableComponent";
import {Typography} from "@mui/joy";

const OrdersInWorkPage: React.FC = () => {
    const appContext = useApplicationContext();
    const period = appContext.period;

    const {
        data: workPlaces,
        isLoading,
        error,
    } = useSWR<Workplace[]>(
        `getWorkPlacesByPeriodAndIsOrdersInWork-${period}`,
        async () => await appContext.getWorkPlacesByPeriodAndIsOrdersInWork(period)
    );

    const dataToShow = !workPlaces ? [] : workPlaces.map((w) => ({
        number: `${w.number}`,
        //period: `${w.period}`,
        orderNumber: `${w.order}`,
        batch: `${w.batch}`,
        item: `${w.item}`,
        amount: `${w.amount}`,
        timeNeeded: `${w.timeNeed}`,
    }));

    if (isLoading || !workPlaces) return <div>Wird geladen</div>;

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>;

    return (
        <PageWrapperComponent title={"Aufträge in Bearbeitung"} showPeriod>
            {workPlaces.length > 0 ?
                <CustomTableComponent
                    headers={["Arbeitsplatz", "Fertigungsauftrag", "Los", "Teil", "Menge", "Zeitbedarf"]}
                    rows={dataToShow}
                /> :
                <Typography>Es sind noch keine Daten vorhanden</Typography>
            }
        </PageWrapperComponent>
    );
};

export default OrdersInWorkPage;

