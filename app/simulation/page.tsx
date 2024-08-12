"use client";
import React, {useState} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {SimulationStepsComponent} from "@/components/shared/SimulationStepsComponent";
import {Box, Card} from "@mui/joy";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import styled from "styled-components";
import {ProductionProgrammFormComponent} from "@/components/forms/ProductionProgrammFormComponent";
import {ProductionOrderTableComponent} from "@/components/forms/ProductionOrderTableComponent";
import {SimulationStep} from "@/contexts/ApplicationContext";
import {CapacityPlaningFormComponent} from "@/components/forms/CapacityPlaningFormComponent";
import MaterialPlanningFormComponent from "@/components/forms/MaterialPlanningFormComponent";

const SimulationPage: React.FC = () => {
    const simulationSteps: SimulationStep[] = [
        {
            title: "Produktionsprogramm",
            description: "Geben Sie das Produktionsprogramm bei allen Produkten ein",
            component: () => <ProductionProgrammFormComponent onSubmit={simulationSteps[0].onNext} />,
            onNext: () => setActiveStep(simulationSteps[1]),
        },
        {
            title: "Stücklisten auflösen",
            description: "Stücklistenauflösung",
            component: () => <ProductionOrderTableComponent onSubmit={() => {}} />,
            onNext: () => setActiveStep(simulationSteps[2]),
            onPrevious: () => setActiveStep(simulationSteps[0]),
        },
        {
            title: "Kapazitätsplanung",
            description: "Planen Sie bequem Ihre Kapazität",
            component: () => <CapacityPlaningFormComponent onSubmit={() => {}} />,
            onNext: () => setActiveStep(simulationSteps[3]),
            onPrevious: () => setActiveStep(simulationSteps[1]),
        },
        {
            title: "Materialplanung",
            description: "Materialplanung für eingekaufte Produkte",
            component: () => <MaterialPlanningFormComponent onSubmit={() => {}} />,
            //onNext: () => setActiveStep(simulationSteps[4]),
            onPrevious: () => setActiveStep(simulationSteps[2]),
        },
        // {
        //     title: "Losgrößensplitting",
        //     description: "Splitting",
        //     component: () => <div>Losgrößensplitting</div>,
        //     onNext: () => setActiveStep(simulationSteps[5]),
        //     onPrevious: () => setActiveStep(simulationSteps[3]),
        // },
        // {
        //     title: "Reihenfolgeplanung",
        //     description: "Bestimmen Sie in welcher Reihenfolge Ihre Aufträge abgearbeitet werden sollen",
        //     component: () => <div>Reihenfolgeplanung</div>,
        //     onNext: () => setActiveStep(simulationSteps[6]),
        //     onPrevious: () => setActiveStep(simulationSteps[4]),
        // },
        // {
        //     title: "Ergebnis",
        //     description: "Ergebnisse (Wichtige Kennzahlen)",
        //     component: () => <div>Ergebnis</div>,
        //     onPrevious: () => setActiveStep(simulationSteps[5]),
        // },
    ];

    const [activeStep, setActiveStep] = useState<SimulationStep | undefined>(simulationSteps[0]);

    return (
        <PageWrapperComponent title={"Simulation"}>
            <PageContentContainer>
                <SimulationStepsContainer>
                    <SimulationStepsComponent steps={simulationSteps} activeStep={activeStep} />
                </SimulationStepsContainer>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--gap-3)",
                    alignItems: "flex-start",
                }}>
                    {/*<Divider orientation={"vertical"} sx={{ height: "100vh", "--Divider-lineColor": "var(--color-divider)" }} />*/}
                    {activeStep ? <SectionListComponent>{activeStep.component()}</SectionListComponent> : null}
                </Box>
            </PageContentContainer>
        </PageWrapperComponent>
    );
};

const PageContentContainer = styled(Box)`
    display: grid;
    grid-gap: var(--gap-4);
    grid-template-columns: minmax(350px, max-content) 1fr;
    align-items: start;
    align-content: start;
`;
const SimulationStepsContainer = styled(Card)`
    display: flex;
    position: sticky;
    max-height: 100vh;
    top: 15%;
    padding-left: 0;
    padding-right: 0;
`;

export default SimulationPage;
