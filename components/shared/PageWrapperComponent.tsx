"use client";
import React, {PropsWithChildren, useEffect} from "react";
import styled from "styled-components";
import {Box, Typography} from "@mui/joy";
import {usePathname} from "next/navigation";

type Props = PropsWithChildren & {
    title?: string;
    subtitle?: string;
};

export const PageWrapperComponent: React.FC<Props> = (props) => {
    const { title, subtitle, children } = props;
    const pathname = usePathname();

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
        <>
            <Box>
                {title || title ? (
                    <TitleAndSubtitleContainer>
                        <Typography level="h2">{title}</Typography>
                        <Typography level="title-sm">{subtitle}</Typography>
                    </TitleAndSubtitleContainer>
                ) : null}
                <Box component="main">{children}</Box>
            </Box>
        </>
    );
};

const TitleAndSubtitleContainer = styled(Box)`
    display: grid;
    gap: var(--gap-1);
    padding: 0 0 var(--gap-2) 0;
`;
