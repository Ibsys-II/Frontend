"use client";
import React from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {SimulationStepsComponent} from "@/components/shared/SimulationStepsComponent";
import {Box, Divider, Stack} from "@mui/joy";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import styled from "styled-components";

const SimulationPage: React.FC = () => {
    return (
        <PageWrapperComponent title={"Simulation"}>
            <PageContentContainer>
                <Stack direction={"row"} spacing={"var(--gap-3)"}>
                    <SimulationStepsComponent />
                    <Divider orientation={"vertical"} />
                </Stack>
                <SectionListComponent>
                    <PageSectionComponent title="Produktionsprogramm" subtitle="Geben Sie die Prognosen ein">

                    </PageSectionComponent>
                </SectionListComponent>
            </PageContentContainer>
        </PageWrapperComponent>
    );
};

const PageContentContainer = styled(Box)`
    display: grid;
    grid-gap: var(--gap-5);
    grid-template-columns: max-content 1fr;
    align-items: start;
    align-content: start;
`;

export default SimulationPage;

