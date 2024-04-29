"use client";
import React from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import useSWR from "swr";
import useApplicationContext from "@/hooks/useApplicationContext";
import {
    ARTICLES_NAME_TO_PRODUCE,
    resolveObjectWithSpecificPropertiesFromList
} from "@/contexts/ApplicationContext";
import {CustomTableComponent} from "@/components/shared/CustomTableComponent";
import {Article} from "@/api/article";

const GoodsPage: React.FC = () => {
    const appContext = useApplicationContext();
    const {
        data: goods,
        isLoading,
        error,
    } = useSWR<Article[]>("getArticlesByNumber", async () => await appContext.getArticlesByNumber(ARTICLES_NAME_TO_PRODUCE));

    if (isLoading || !goods) return <div>Wird geladen</div>

    if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>

    return (
        <PageWrapperComponent title={"Waren"}>
            <CustomTableComponent
                headers={["Nummer", "Beschreibung", "Preis in €", "Startmenge"]}
                rows={resolveObjectWithSpecificPropertiesFromList(goods, ["number", "description", "price", "startAmount"])}
            />
        </PageWrapperComponent>
    );
};

export default GoodsPage;

