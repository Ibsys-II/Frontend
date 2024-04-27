"use client";
import React from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {Box, Card} from "@mui/joy";
import {Table} from "@mui/joy";
import useSWR from "swr";
import useApplicationContext from "@/hooks/useApplicationContext";
import {ARTICLES_NAME_TO_PRODUCE} from "@/contexts/ApplicationContext";

const GoodsPage: React.FC = () => {
    const appContext = useApplicationContext();
    const {
        data: goods,
        isLoading,
        error,
    } = useSWR("getArticlesByNumber", async () => await appContext.getArticlesByNumber(ARTICLES_NAME_TO_PRODUCE));

    if (isLoading || !goods) return <div>Wird geladen</div>

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>

    return (
        <PageWrapperComponent title={"Waren"}>
            <Card sx={{ px: 0 }}>
                <Table variant="plain" size={"lg"}>
                    <Box component={"thead"}>
                        <Box component={"tr"}>
                            <Box component={"th"}>Nummer</Box>
                            <Box component={"th"}>Beschreibung</Box>
                            <Box component={"th"}>Preis</Box>
                            <Box component={"th"}>Startmenge</Box>
                        </Box>
                    </Box>
                    <Box component={"tbody"}>
                        {goods.map((good) => (
                            <Box component={"tr"} key={good.id}>
                                <Box component={"td"}>{good.number}</Box>
                                <Box component={"td"}>{good.description}</Box>
                                <Box component={"td"}>{good.price}</Box>
                                <Box component={"td"}>{good.startAmount}</Box>
                            </Box>
                        ))}
                    </Box>
                </Table>
            </Card>
        </PageWrapperComponent>
    );
};

export default GoodsPage;

