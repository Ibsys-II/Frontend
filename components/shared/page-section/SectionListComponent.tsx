"use client";
import React, {PropsWithChildren} from 'react';
import {Box} from "@mui/joy";
import styled from "styled-components";

type Props = PropsWithChildren;

export const SectionListComponent: React.FC<Props> = (props) => {
    const { children } = props;
    return (
        <SectionListContainer>
            {children}
        </SectionListContainer>
    );
};

const SectionListContainer = styled(Box)`
    display: grid;
    grid-gap: var(--gap-6);
`;