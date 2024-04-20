"use client";
import React, {ReactNode, useEffect, useState} from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import styled from "styled-components";
import {Box} from "@mui/joy";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import {usePathname, useRouter} from "next/navigation";
import {useMediaQuery} from "@/hooks/useMediaQuery";

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
export const SidebarComponent: React.FC = () => {
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
        {
            label: "Simulation",
            icon: <StyleOutlinedIcon />,
            isActive: pathname.includes("/buecher"),
            onClick: () => router.push("/buecher"),
        },
        {
            label: "Ergebnisse",
            icon: <AddOutlinedIcon />,
            isActive: pathname.includes("/anlegen"),
            onClick: () => router.push("/anlegen"),
        },
        {
            label: "Simulieren (XML-Datei)",
            icon: <BarChartOutlinedIcon />,
            isActive: pathname.includes("/analysen"),
            onClick: () => router.push("/analysen"),
        },
    ];

    const lowerButtons: NavigationButton[] = [
        {
            label: "An- & Abmelden",
            icon: <LoginOutlinedIcon />,
            isActive: pathname.includes("/login"),
            onClick: () => router.push("/login"),
        },
        {
            label: "Einstellungen",
            icon: <SettingsOutlinedIcon />,
            isActive: pathname.includes("/einstellungen"),
            onClick: () => router.push("/einstellungen"),
        },
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
        <SidebarContainer>
            <ButtonListComponent
                key={1}
                buttons={upperButtons}
                showLabel={isOpen}
            />
            <ButtonListComponent
                key={2}
                buttons={lowerButtons}
                showLabel={isOpen}
            />
        </SidebarContainer>
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
        <List>
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
                        <ListItemDecorator>{button.icon}</ListItemDecorator>
                        {showLabel ? button.label : null}
                    </StyledListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

const SidebarContainer = styled(Box)`
    display: grid;
    gap: var(--gap-1);
    grid-template-rows: 1fr max-content;
    height: 100%;
    padding: 0 var(--gap-1) var(--gap-1) var(--gap-1);
    border-right: 2px solid var(--color-divider);
`;
const StyledListItemButton = styled(ListItemButton)`
    border-radius: var(--border-medium);
    padding: var(--gap-1) var(--gap-1);
`;
