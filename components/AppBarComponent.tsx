"use client";
import React from "react";
import styled from "styled-components";
import {Box, Sheet, Stack, Typography} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";

/**
 * Maximale Breite für das Suchfeld in der App Bar.
 */
const MAX_WIDTH_OF_SEARCH_INPUT_FIELD = "700px";

/**
 * React-Komponente für die App Bar der Anwendung.
 *
 * Stellt die Navigationselemente und die Suchfunktion bereit.
 */
export const AppBarComponent: React.FC = () => {
    /**
     * Hook zur Ermitlung, ob das Gerät ein kleineres Display hat.
     * Wird für responsives Verhalten der App Bar verwendet.
     */
    const { isSmall } = useMediaQuery();

    return (
        <NavigationBarContainer>
            <Stack direction="row" spacing="var(--gap-1)">
                <Typography component="p" level="body-md">
                    {process.env.NEXT_PUBLIC_APPLICATION_NAME!}
                </Typography>
            </Stack>
            <SearchInputContainer>
                <div></div>
                <div></div>
            </SearchInputContainer>
        </NavigationBarContainer>
    );
};

const NavigationBarContainer = styled(Sheet)`
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    grid-gap: var(--gap-2);
    align-content: center;
    align-items: center;
    padding: var(--gap-2);
    height: 100%;
    border-bottom: 2px solid var(--color-divider);
`;

const SearchInputContainer = styled(Box)`
    display: flex;
    grid-template-columns: auto 1fr;
    gap: var(--gap-1);
    width: 100%;
    max-width: ${MAX_WIDTH_OF_SEARCH_INPUT_FIELD};
    justify-self: center;
`;
