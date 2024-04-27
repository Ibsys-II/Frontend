"use client";
import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {SimulationStepsComponent} from "@/components/shared/SimulationStepsComponent";
import {Autocomplete, Box, Card, Divider, Stack} from "@mui/joy";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import styled from "styled-components";
import {ProductionProgrammFormComponent} from "@/components/forms/ProductionProgrammFormComponent";
import {InfoCardComponent} from "@/components/shared/InfoCardComponent";
import {BillOfMaterialsFormComponent} from "@/components/forms/BillOfMaterialsFormComponent";
import { v4 as uuid } from "uuid";
import {SimulationStep} from "@/contexts/ApplicationContext";
import {CapacityPlaningFormComponent} from "@/components/forms/CapacityPlaningFormComponent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";


const SimulationPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState<SimulationStep | undefined>(undefined);

    const simulationSteps: SimulationStep[] = useMemo(() => {
        return [
            {
                title: "Vertriebswunsch",
                description: "Wenn in der Vorperiode nicht die volle Liefertreue erreicht wurde, so wird der reduzierte Vertriebswunsch automatisch berechnet!",
                component: <ProductionProgrammFormComponent onSubmit={() => setActiveStep(simulationSteps[1])} />,
                onNext: () => setActiveStep(simulationSteps[1]),
            },
            {
                title: "Stücklisten auflösen",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                component: <BillOfMaterialsFormComponent onSubmit={() => {}} />,
                onNext: () => setActiveStep(simulationSteps[2]),
                onPrevious: () => setActiveStep(simulationSteps[0]),
            },
            {
                title: "Kapazitätsplanung",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                component: <CapacityPlaningFormComponent onSubmit={() => {}} />,
                onNext: () => setActiveStep(simulationSteps[3]),
                onPrevious: () => setActiveStep(simulationSteps[1]),
            },
            {
                title: "Teileverwendungsnachweis",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                component: <div>Teileverwendungsnachweis</div>,
                onNext: () => setActiveStep(simulationSteps[4]),
                onPrevious: () => setActiveStep(simulationSteps[2]),
            },
            {
                title: "Losgrößensplitting",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                component: <div>Losgrößensplitting</div>,
                onNext: () => setActiveStep(simulationSteps[5]),
                onPrevious: () => setActiveStep(simulationSteps[3]),
            },
            {
                title: "Reihenfolgeplanung",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                component: <div>Reihenfolgeplanung</div>,
                onNext: () => setActiveStep(simulationSteps[6]),
                onPrevious: () => setActiveStep(simulationSteps[4]),
            },
            {
                title: "Ergebnis",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                component: <div>Ergebnis</div>,
                onPrevious: () => setActiveStep(simulationSteps[5]),
            },
        ];
    }, []);

    useEffect(() => {
        setActiveStep(simulationSteps[0]);
    }, [simulationSteps]);

    return (
        <PageWrapperComponent title={"Simulation"} showPeriod>
            <PageContentContainer>
                <SimulationStepsContainer>
                    <SimulationStepsComponent steps={simulationSteps} activeStep={activeStep} />
                </SimulationStepsContainer>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--gap-3)",
                    alignItems: "flex-start",
                    // border: "1px solid var(--color-divider)",
                    // borderRadius: "8px",
                    // padding: "var(--gap-3)",
                    // minHeight: "100vh",
                }}>
                    {/*<Divider orientation={"vertical"} sx={{ height: "100vh", "--Divider-lineColor": "var(--color-divider)" }} />*/}
                    {activeStep ? <SectionListComponent>{activeStep.component}</SectionListComponent> : null}
                </Box>
                <InfoCardComponent>
                    <>
                        <div>
                            <b>Direktverkauf</b>
                        </div>
                        <div>
                            Über den zweiten Eingabeblock der Maske kann - zusätzlich zum Vertriebswunsch - der
                            Verkauf von Endprodukten ab Lager (Direktverkauf) veranlasst werden. Hierfür besteht
                            die Möglichkeit, dass beispielsweise Angebotspreise durch die Teilnehmer eingegeben
                            oder feste Abnahmepreise von der Spielleitung bestimmt werden.
                        </div>
                        <div>
                            <b>Hinweis</b>
                        </div>
                        <div>
                            Eine Eingabe ist nur nach Abstimmung mit der Spielleitung zulässig. Wenn nach
                            Abstimmung mit der Spielleitung ein solcher Direktverkauf veranlasst wurde, so ist
                            dabei folgendes zu beachten:
                        </div>
                        <div>
                            Die angegebenen Stückzahlen werden am Ende der Planperiode aus dem Lager abgezogen; zu
                            wenig ausgelieferte Enderzeugnisse können nicht nachgeliefert werden.Bei Direktverkäufen
                            kann abweichend von den Verkaufspreisen des Vertriebswunsches ( 200,--) ein beliebiger
                            Verkaufspreis vorgegeben werden.Bei Direktverkäufen können Konventionalstrafen bei
                            Teil- bzw. Nichtlieferung vereinbart werden. Diese werden bei der Endauswertung des
                            Gesamtergebnisses berücksichtigt. Konventionalstrafen sind je Teil einzugeben.
                        </div>
                    </>
                </InfoCardComponent>
            </PageContentContainer>
        </PageWrapperComponent>
    );
};

const PageContentContainer = styled(Box)`
    display: grid;
    grid-gap: var(--gap-4);
    grid-template-columns: max-content 1fr 0.5fr;
    align-items: start;
    align-content: start;
`;
const SimulationStepsContainer = styled(Card)`
    display: flex;
    //gap: var(--gap-3);
    position: sticky;
    max-height: 100vh;
    top: 15%;
    padding-left: 0;
    padding-right: 0;
    //border: 1px solid var(--color-divider);
    //border-radius: 8px;
    //padding: var(--gap-3);
`;

export default SimulationPage;

