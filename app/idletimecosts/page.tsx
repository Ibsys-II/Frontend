"use client";
import React, {useEffect} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {Workplace} from "@/api/workplace";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import {Stack, Typography} from "@mui/joy";
import {CustomTableComponent} from "@/components/shared/CustomTableComponent";
import {StatsCardComponent} from "@/components/shared/StatsCardComponent";

const IdleTimeCostsPage: React.FC = () => {
    const appContext = useApplicationContext();
    const period = appContext.period;

    const {
        data: workplaces,
        isLoading,
        error,
    } = useSWR<Workplace[]>(
        `getWorkPlacesByPeriodAndIsIdleTimeCosts-${period}`,
        async () => await appContext.getWorkPlacesByPeriodAndIsIdleTimeCosts(period)
    );

    const dataToShow = !workplaces ? [] : workplaces.map((w) => ({
        articleNumber: `${w.number}`,
        setupEvents: `${w.setupEvents}`,
        idleTime: `${w.idleTime}`,
        wageIdleTimeCosts: `${w.wageIdleTimeCosts} €`,
        wageCosts: `${w.wageCosts} €`,
        machineIdleTimeCosts: `${w.machineIdleTimeCosts} €`,
    }));

    const sumOfSetupEvents = !workplaces ? "0" : workplaces.reduce((acc, curr) => acc + (curr.setupEvents ?? 0), 0);

    const sumOfIdleTime = !workplaces ? "0" : workplaces.reduce((acc, curr) => acc + (curr.idleTime ?? 0), 0).toString().concat(" Minuten");

    const sumOfWageIdleTimeCosts = !workplaces ? "0" : workplaces.reduce((acc, curr) => acc + (curr.wageIdleTimeCosts ?? 0), 0).toFixed(2).concat(" €");

    const sumOfWageCosts = !workplaces ? "0" : workplaces.reduce((acc, curr) => acc + (curr.wageCosts ?? 0), 0).toFixed(2).concat(" €");

    const sumOfMachineIdleTimeCosts = !workplaces ? "0" : workplaces.reduce((acc, curr) => acc + (curr.machineIdleTimeCosts ?? 0), 0).toFixed(2).concat(" €");

    if (isLoading || !workplaces) return <div>Wird geladen</div>;

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>;

    return (
        <PageWrapperComponent title={"Leerzeitenkosten"} showPeriod>
            {workplaces.length > 0 ?
                <SectionListComponent>
                    <Stack direction={"row"} spacing={"var(--gap-3)"} justifyItems={"flex-start"} justifyContent={"flex-start"} sx={{ overflow: "auto" }}>
                        <StatsCardComponent label={"Summe Rüstvorgänge"} value={sumOfSetupEvents} />
                        <StatsCardComponent label={"Summe Leerzeiten"} value={sumOfIdleTime} />
                        <StatsCardComponent label={"Summe Lohnleerkosten"} value={sumOfWageIdleTimeCosts} />
                        <StatsCardComponent label={"Summe Lohnkosten"} value={sumOfWageCosts} />
                        <StatsCardComponent label={"Summe Maschinenstillstandskosten"} value={sumOfMachineIdleTimeCosts} />
                    </Stack>
                    <CustomTableComponent
                        headers={["Arbeitsplatz", "Rüstvorgänge", "Leerzeit(min)", "Lohnleerkosten", "Lohnkosten", "Kosten Maschinenstillstand"]}
                        rows={dataToShow}
                    />
                </SectionListComponent> :
                <Typography>Es sind noch keine Daten vorhanden</Typography>
            }
        </PageWrapperComponent>
    );
};

export default IdleTimeCostsPage;

