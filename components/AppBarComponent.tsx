"use client";
import React from "react";
import styled from "styled-components";
import {Autocomplete, Box, Button, Divider, IconButton, Sheet, Stack, Typography, useColorScheme} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import LanguageIcon from '@mui/icons-material/Language';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import useApplicationContext from "@/hooks/useApplicationContext";
import {useRouter} from "next/navigation";

/**
 * React-Komponente für die App Bar der Anwendung.
 *
 * Stellt die Navigationselemente und die Suchfunktion bereit.
 */
const AppBarComponent: React.FC = () => {
    /**
     * Hook zur Ermitlung, ob das Gerät ein kleineres Display hat.
     * Wird für responsives Verhalten der App Bar verwendet.
     */
    const { isSmall } = useMediaQuery();
    const { mode, setMode } = useColorScheme();
    const appContext = useApplicationContext();
    const router = useRouter();

    const switchMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
        //setColorScheme(mode === 'dark' ? { light: 'light' } : { dark: 'dark' });
    }

    const handleClearDb = async () => {
        await appContext.clearDb();
        window.location.reload();
    }

    return (
        <NavigationWrapper>
            <NavigationBarContainer>
                <Stack direction="row" spacing="var(--gap-1)">
                    <Typography component="p" level="body-md">
                        {process.env.NEXT_PUBLIC_APPLICATION_NAME!}
                    </Typography>
                </Stack>
                <NavigationBarOptionsContainer>
                    <Button onClick={handleClearDb}>
                        Datenbank leeren
                    </Button>
                    {isSmall ?
                        <IconButton variant={"outlined"} onClick={switchMode}>
                            {mode === "light" ? <NightsStayOutlinedIcon /> : <WbSunnyOutlinedIcon />}
                        </IconButton>
                        :
                        <IconButton variant={"outlined"} onClick={switchMode}>
                            {mode === "light" ? <NightsStayOutlinedIcon /> : <WbSunnyOutlinedIcon />}
                        </IconButton>
                    }
                    <Autocomplete
                        startDecorator={<LanguageIcon />}
                        defaultValue={"Deutsch"}
                        options={["Deutsch", "English", "Français"]}
                        sx={{
                            maxWidth: "200px"
                        }}
                    />
                </NavigationBarOptionsContainer>
            </NavigationBarContainer>
            <Divider orientation={"horizontal"} />
        </NavigationWrapper>
    );
};

export default AppBarComponent;

const NavigationWrapper = styled(Box)`
    display: grid;
    height: 100%;
`;

const NavigationBarContainer = styled(Sheet)`
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-gap: var(--gap-2);
    align-content: center;
    align-items: center;
    padding: var(--gap-1) var(--gap-2);
    height: 100%;
`;

const NavigationBarOptionsContainer = styled(Box)`
    display: flex;
    gap: var(--gap-1);
`;
