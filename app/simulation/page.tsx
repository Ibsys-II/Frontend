"use client";
import React, {ReactNode, useEffect, useState} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {SimulationStepsComponent} from "@/components/shared/SimulationStepsComponent";
import {Box, Divider} from "@mui/joy";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import styled from "styled-components";
import {ProductionProgrammFormComponent} from "@/components/forms/ProductionProgrammFormComponent";
import {InfoCardComponent} from "@/components/shared/InfoCardComponent";
import {BillOfMaterialFormComponent} from "@/components/forms/BillOfMaterialFormComponent";

const SimulationPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState<ReactNode>(undefined);

    useEffect(() => {
        setActiveStep(simulationSteps[0]);
    }, []);

    const simulationSteps = [
        <ProductionProgrammFormComponent onSubmit={() => setActiveStep(simulationSteps[1])} />,
        <BillOfMaterialFormComponent onSubmit={() => {}} />,
    ];

    return (
        <PageWrapperComponent title={"Simulation"}>
            <PageContentContainer>
                <SimulationStepsContainer>
                    <SimulationStepsComponent />
                    <Divider orientation={"vertical"} sx={{ height: "100vh" }} />
                </SimulationStepsContainer>
                <SectionListComponent>{activeStep}</SectionListComponent>
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
    grid-gap: var(--gap-5);
    grid-template-columns: max-content 1fr 0.5fr;
    align-items: start;
    align-content: start;
`;
const SimulationStepsContainer = styled(Box)`
    display: flex;
    gap: var(--gap-3);
    position: sticky;
    max-height: 100vh;
    top: 15%;
`;

export default SimulationPage;

