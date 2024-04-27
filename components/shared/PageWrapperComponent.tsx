"use client";
import React, {PropsWithChildren, useEffect} from "react";
import styled from "styled-components";
import {Autocomplete, Box, Typography, useTheme} from "@mui/joy";
import {usePathname} from "next/navigation";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import useApplicationContext from "@/hooks/useApplicationContext";

type Props = PropsWithChildren & {
    title?: string;
    subtitle?: string;
    showPeriod?: boolean;
};

export const PageWrapperComponent: React.FC<Props> = (props) => {
    const { title, subtitle, showPeriod, children } = props;
    const pathname = usePathname();
    const theme = useTheme();
    const appContext = useApplicationContext();

    useEffect(() => {
        document.title = `${resolveWindowTitleFromPathName(pathname)} - ${process.env.NEXT_PUBLIC_APPLICATION_NAME}`;
    }, [title, subtitle, children]);

    const charactersToExcludeFromUrl = ["/", "-", "\\", "[", "]"];

    const resolveWindowTitleFromPathName = (pathname: string): string => {
        if (!pathname) return "";
        let result = pathname === "/" ? "Startseite" : pathname.slice(1);

        charactersToExcludeFromUrl.forEach((character) => {
            if (!result.includes(character)) return;

            const cleanText = result.replaceAll(character, " ");
            result = cleanText.slice(0);
        });

        return `${result.charAt(0).toUpperCase()}${result.slice(1)}`;
    };

    return (
        <PageContainer>
            <PageHeaderContainer sx={{ backgroundColor: theme.vars.palette.background.body }}>
                <TitleAndSubtitleContainer
                    titleispresent={title ? "true" : "false"}
                    bgcolor={theme.vars.palette.background.body}
                >
                    <Typography level="h2">{title}</Typography>
                    <Typography level="title-sm">{subtitle}</Typography>
                </TitleAndSubtitleContainer>
                <Box sx={{ backgroundColor: theme.vars.palette.background.body }}>
                    {showPeriod ?
                        <FormControl sx={{ backgroundColor: "inherit" }}>
                            <FormLabel>Periode</FormLabel>
                            <Autocomplete
                                defaultValue={appContext.period}
                                options={[4, 5]}
                                onChange={(_e, newValue) => {
                                    console.log(newValue)
                                    appContext.setPeriod(newValue as number)
                                }}
                                sx={{
                                    maxWidth: "200px"
                                }}
                            />
                        </FormControl> : null
                    }
                </Box>
            </PageHeaderContainer>
            <Box component="main">{children}</Box>
        </PageContainer>
    );
};
const PageContainer = styled(Box)``;

const PageHeaderContainer = styled(Box)`
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: var(--gap-2);
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
`;
const TitleAndSubtitleContainer = styled(Box)<{ titleispresent: "true" | "false", bgcolor: string }>`
    display: grid;
    gap: var(--gap-1);
    padding: 0 0 var(--gap-2) 0;
    background-color: ${(props) => props.bgcolor};
    //border-bottom: 1px solid var(--color-divider);
    padding-top: ${(props) => props.titleispresent === "true" ? "var(--gap-4)" : "unset"};
`;
