import React from "react";
import {Box, Button, Card, IconButton, Input, Typography} from "@mui/joy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import styled from "styled-components";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {ARTICLES_NAME_TO_PRODUCE, GOOD_TO_PRODUCE} from "@/contexts/ApplicationContext";
import PropsSimulationForm from "@/components/forms/formProps";
import CircularProgress from "@mui/joy/CircularProgress";

export const ProductionOrderTableComponent: React.FC<PropsSimulationForm> = (props) => {
    const { onSubmit } = props;
    const appContext = useApplicationContext();
    const {
        data: goods,
        isLoading,
        error,
    } = useSWR("getArticlesWithoutGoodToProduce", async () => await appContext.getArticlesWithoutGoodToProduce(ARTICLES_NAME_TO_PRODUCE));

    if (isLoading || !goods) return <div>Wird geladen</div>

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>

    return (
        <PageSectionComponent
            title="Stücklistenauflösung"
            subtitle="Stücklisten auflösen"
            endDecorator={<IconButton variant={"outlined"}><MoreHorizIcon /></IconButton>}
        >
            <FormGroupContainer>
                <Typography level={"h4"}>Kinderfahrrad({GOOD_TO_PRODUCE.CHILDREN_BIKE})</Typography>
                <FormGroupHeaderContainer>
                    <Typography>Artikel</Typography>
                    <Typography>Vertriebswunsch</Typography>
                    <Typography>Warteschlange</Typography>
                    <Typography>Geplanter Sicherheitsbestand</Typography>
                    <Typography>Lagerbestand Vorperiode</Typography>
                    <Typography>Aufträge noch in Warteschlange</Typography>
                    <Typography>Aufträge in Bearbeitung</Typography>
                    <Typography>Produktionsauftrag</Typography>
                </FormGroupHeaderContainer>
                <OrderRowContainer>
                    {Array.from(Array(15).keys()).map((_row, index) =>
                        <React.Fragment key={index}>
                            {/*<Autocomplete*/}
                            {/*    placeholder={"Artikel auswählen"}*/}
                            {/*    options={goods.map((g) => g.number)}*/}
                            {/*/>*/}
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Input
                                placeholder={"Menge eingeben"}
                            />
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                        </React.Fragment>
                    )}
                </OrderRowContainer>
            </FormGroupContainer>

            <FormGroupContainer>
                <Typography level={"h4"}>Damenfahrrad({GOOD_TO_PRODUCE.WOMEN_BIKE})</Typography>
                <FormGroupHeaderContainer>
                    <Typography>Artikel</Typography>
                    <Typography>Vertriebswunsch</Typography>
                    <Typography>Warteschlange</Typography>
                    <Typography>Geplanter Sicherheitsbestand</Typography>
                    <Typography>Lagerbestand Vorperiode</Typography>
                    <Typography>Aufträge noch in Warteschlange</Typography>
                    <Typography>Aufträge in Bearbeitung</Typography>
                    <Typography>Produktionsauftrag</Typography>
                </FormGroupHeaderContainer>
                <OrderRowContainer>
                    {Array.from(Array(15).keys()).map((_row, index) =>
                        <React.Fragment key={index}>
                            {/*<Autocomplete*/}
                            {/*    placeholder={"Artikel auswählen"}*/}
                            {/*    options={goods.map((g) => g.number)}*/}
                            {/*/>*/}
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Input
                                placeholder={"Menge eingeben"}
                            />
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                        </React.Fragment>
                    )}
                </OrderRowContainer>
            </FormGroupContainer>

            <FormGroupContainer>
                <Typography level={"h4"}>Herrenfahrrad({GOOD_TO_PRODUCE.MEN_BIKE})</Typography>
                <FormGroupHeaderContainer>
                    <Typography>Artikel</Typography>
                    <Typography>Vertriebswunsch</Typography>
                    <Typography>Warteschlange</Typography>
                    <Typography>Geplanter Sicherheitsbestand</Typography>
                    <Typography>Lagerbestand Vorperiode</Typography>
                    <Typography>Aufträge noch in Warteschlange</Typography>
                    <Typography>Aufträge in Bearbeitung</Typography>
                    <Typography>Produktionsauftrag</Typography>
                </FormGroupHeaderContainer>
                <OrderRowContainer>
                    {Array.from(Array(15).keys()).map((_row, index) =>
                        <React.Fragment key={index}>
                            {/*<Autocomplete*/}
                            {/*    placeholder={"Artikel auswählen"}*/}
                            {/*    options={goods.map((g) => g.number)}*/}
                            {/*/>*/}
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Input
                                placeholder={"Menge eingeben"}
                            />
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                            <Typography>0</Typography>
                        </React.Fragment>
                    )}
                </OrderRowContainer>
            </FormGroupContainer>
            <Button
                disabled={isLoading}
                startDecorator={isLoading ? <CircularProgress size={"sm"} /> : null}
            >
                {isLoading ? "Ihre Stücklistenauflösung wird gespeichert..." : "Speichern"}
            </Button>
        </PageSectionComponent>
    );
};

const FormGroupContainer = styled(Card)`
    display: grid;
    grid-gap: var(--gap-2);
    padding: var(--gap-3) var(--gap-4);
`;
const FormGroupHeaderContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: var(--gap-1);
`;
const OrderRowContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: var(--gap-1);
    
    //& * {
    //    border-bottom: 1px solid grey;
    //}
`;
