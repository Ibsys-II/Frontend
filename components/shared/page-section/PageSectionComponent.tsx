"use client";
import React, {PropsWithChildren, ReactNode} from 'react';
import styled from "styled-components";
import {Box, Typography} from "@mui/joy";

type Props = PropsWithChildren & {
    title?: string
    subtitle?: string
    endDecorator?: ReactNode;
};

export const PageSectionComponent: React.FC<Props> = (props) => {
    const { title, subtitle, endDecorator, children } = props;

    return (
        <SectionContainer component={"section"}>
            {title || subtitle ?
                <SectionHeaderContainer>
                    <TitleAndSubtitleContainer>
                        {title ? <SectionTitle level={"h3"}>{title}</SectionTitle> : null}
                        {subtitle ? <SectionSubtitle level={"title-sm"}>{subtitle}</SectionSubtitle> : null}
                    </TitleAndSubtitleContainer>
                    <EndDecorator>{endDecorator}</EndDecorator>
                </SectionHeaderContainer>
                : null
            }
            {children}
        </SectionContainer>
    );
};

const SectionContainer = styled(Box)`
    display: grid;
    grid-gap: var(--gap-2);
`;
const SectionHeaderContainer = styled(Box)`
    display: grid;
    grid-gap: var(--gap-1);
    align-items: center;
    align-content: center;
    grid-template-columns: 1fr max-content;
`;
const TitleAndSubtitleContainer = styled(Box)`
    display: grid;
`;
const EndDecorator = styled(Box)``;
const SectionTitle = styled(Typography)``;
const SectionSubtitle = styled(Typography)``;

