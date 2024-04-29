"use client";
import React from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {ARTICLES_NAME_TO_PRODUCE, resolveObjectWithSpecificPropertiesFromList} from "@/contexts/ApplicationContext";
import {CustomTableComponent} from "@/components/shared/CustomTableComponent";
import {Article} from "@/api/article";

const ArtikelsPage: React.FC = () => {
    const appContext = useApplicationContext();
    const {
        data: goods,
        isLoading,
        error,
    } = useSWR<Article[]>("getArticlesWithoutGoodToProduce", async () => await appContext.getArticlesWithoutGoodToProduce(ARTICLES_NAME_TO_PRODUCE));

    if (isLoading || !goods) return <div>Wird geladen</div>

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>

    return (
        <PageWrapperComponent title={"Bauteile"}>
            <CustomTableComponent
                headers={["Nummer", "Beschreibung", "Verwendet für", "Preis in €", "Startmenge"]}
                rows={resolveObjectWithSpecificPropertiesFromList(goods, ["number", "description", "usedFor", "price", "startAmount"])}
            />
        </PageWrapperComponent>
    );
};

export default ArtikelsPage;
