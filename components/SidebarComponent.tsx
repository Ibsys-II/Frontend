"use client";
import React, {ReactNode, useEffect, useState} from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import styled from "styled-components";
import {Box, Divider, Typography} from "@mui/joy";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import {usePathname, useRouter} from "next/navigation";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {v4 as uuid} from "uuid";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const INITIAL_SIDEBAR_STATE = true;

/**
 * Typ für Schaltflächen in der Seitenleiste.
 */
type NavigationButton = {
    label: string;
    icon: ReactNode;
    isActive?: boolean | undefined;
    endAction?: ReactNode | undefined;
    onClick: () => void;
};

/**
 * React-Komponente für die Seitenleiste der Anwendung.
 */
const SidebarComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(INITIAL_SIDEBAR_STATE);
    const router = useRouter();
    const pathname = usePathname();
    const { isSmall } = useMediaQuery();

    useEffect(() => {
        if (!isSmall) {
            setIsOpen(true);
            return;
        }
        setIsOpen(false);
    }, [isSmall]);

    const upperButtons: NavigationButton[] = [
        {
            label: "Startseite",
            icon: <DashboardOutlinedIcon />,
            isActive: pathname === "/",
            onClick: () => router.push("/"),
        },
    ];

    const middleButtons: NavigationButton[] = [
        {
            label: "Datenimport (XML-Datei)",
            icon: <UploadFileOutlinedIcon />,
            isActive: pathname.includes("/upload-from-xml-file"),
            onClick: () => router.push("/upload-from-xml-file"),
        },
        {
            label: "Simulation",
            icon: <PlayCircleFilledWhiteOutlinedIcon />,
            isActive: pathname.includes("/simulation"),
            onClick: () => router.push("/simulation"),
        },
        {
            label: "Datenexport",
            icon: <FileDownloadOutlinedIcon />,
            isActive: pathname.includes("/export"),
            onClick: () => router.push("/export"),
        },
    ];

    const lowerButtons: NavigationButton[] = [
        // {
        //     label: "Einstellungen",
        //     icon: <SettingsOutlinedIcon />,
        //     onClick: () => router.push("/settings"),
        // },
        {
            label: "Seitenleiste zuklappen",
            icon: isOpen ? (
                <KeyboardDoubleArrowLeftOutlinedIcon />
            ) : (
                <KeyboardDoubleArrowRightOutlinedIcon />
            ),
            onClick: () => setIsOpen((prevState) => !prevState),
        },
    ];

    return (
        <SidebarWrapper>
            <SidebarContainer>
                <UpperButtonListContainer>
                    <ButtonListComponent
                        key={uuid()}
                        buttons={upperButtons}
                        showLabel={isOpen}
                    />
                    <Divider orientation={"horizontal"} />
                    {isOpen ?
                        <Typography level={"body-sm"} fontWeight={600} sx={{ pl: "var(--gap-1)"}}>
                            Verwaltung
                        </Typography>: null
                    }
                    <ButtonListComponent
                        key={uuid()}
                        buttons={middleButtons}
                        showLabel={isOpen}
                    />
                </UpperButtonListContainer>
                <ButtonListComponent
                    key={uuid()}
                    buttons={lowerButtons}
                    showLabel={isOpen}
                />
            </SidebarContainer>
            <Divider orientation={"vertical"} />
        </SidebarWrapper>
    );
};
type PropsButtonList = {
    buttons: NavigationButton[];
    showLabel: boolean;
};
const ButtonListComponent: React.FC<PropsButtonList> = (
    props: PropsButtonList,
) => {
    const { buttons, showLabel } = props;

    return (
        <List component={"aside"} size={"sm"}>
            {buttons.map((button, index) => (
                <ListItem
                    key={`${button.label}${index}`}
                    onClick={button.onClick}
                    endAction={button.endAction}
                >
                    <StyledListItemButton
                        selected={button.isActive}
                        color={button.isActive ? "primary" : "neutral"}
                    >
                        <ListItemDecorator
                            sx={{
                                ...(!showLabel ? {
                                    minInlineSize: "unset",
                                    "-webkit-margin-end": "unset",
                                    marginInlineEnd: "unset",
                                }: {}),
                            }}
                        >
                            {button.icon}
                        </ListItemDecorator>
                        {showLabel ? button.label : null}
                    </StyledListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default SidebarComponent;

const SidebarWrapper = styled(Box)`
    display: grid;
    grid-template-columns: 1fr max-content;
    height: 100%;
`;
const SidebarContainer = styled(Box)`
    display: grid;
    gap: var(--gap-1);
    grid-template-rows: 1fr max-content;
    padding: var(--gap-1);
    overflow-y: auto;
`;
const UpperButtonListContainer = styled(Box)`
    display: grid;
    gap: var(--gap-1);
    align-content: start;
    align-items: start;
`;
const StyledListItemButton = styled(ListItemButton)`
    border-radius: var(--border-small);
    padding: var(--gap-1);
`;
