"use client";
import {createForecastApi, Forecast, ForecastDto, getForecastByPeriodApi} from "@/api/forecast";
import React, {createContext, PropsWithChildren, ReactNode, useState} from "react";
import {InputTypeMap} from "@mui/joy";
import {Article, getArticlesApi, getArticlesByNumberApi} from "@/api/article";
import {createMultipleOrdersApi, createOrderApi, OrderDto} from "@/api/order";

type ContextOutput = {
    // Period
    period: number;
    setPeriod: (periode: number) => void;
    // Forecast
    getForecastByPeriod: (period: number) => Promise<Forecast>;
    createForecast: (forecastDto: ForecastDto) => Promise<void>;
    // Articles
    getArticles: () => Promise<Article[]>;
    getArticlesWithoutGoodToProduce: (goodsToProduce: Set<string>) => Promise<Article[]>;
    getArticlesByNumber: (numbers: Set<string>) => Promise<Article[]>;
    // Orders
    createOrder: (orderDto: OrderDto) => Promise<void>;
    createMultipleOrders: (orderDtoList: OrderDto[]) => Promise<void>;
}

// @ts-ignore
export const ApplicationContext = createContext<ContextOutput>({});

export const ARTICLES_NAME_TO_PRODUCE = new Set<string>(["1P", "2P", "3P"]);

type Props = Readonly<PropsWithChildren>;

export const ApplicationContextProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;

    const [period, setPeriod] = useState<number>(4);

    const getForecastByPeriod = async (period: number): Promise<Forecast> => {
        return await getForecastByPeriodApi(period);
    };

    const createForecast = async (forecastDto: ForecastDto): Promise<void> => {
        await createForecastApi(forecastDto);
    };

    const getArticles = async (): Promise<Article[]> => {
        return await getArticlesApi();
    };

    const getArticlesWithoutGoodToProduce = async (goodsToProduce: Set<string>): Promise<Article[]> => {
        const allArticles = await getArticles();
        const results: Article[] = [];

        allArticles.forEach((article) => {
            if (goodsToProduce.has(article.number)) return;
            results.push(article);
        });
        return results;
    };

    const getArticlesByNumber = async (numbers: Set<string>): Promise<Article[]> => {
        return await getArticlesByNumberApi(numbers);
    };

    const createOrder = async (orderDto: OrderDto): Promise<void> => {
        return await createOrderApi(orderDto);
    };

    const createMultipleOrders = async (orderDtoList: OrderDto[]): Promise<void> => {
        return await createMultipleOrdersApi(orderDtoList);
    }

    return (
        <ApplicationContext.Provider value={{
            period,
            setPeriod,
            getForecastByPeriod,
            createForecast,
            getArticles,
            getArticlesWithoutGoodToProduce,
            getArticlesByNumber,
            createOrder,
            createMultipleOrders,
        }}>
            {children}
        </ApplicationContext.Provider>
    )
};

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------
export type InputField = InputTypeMap["props"] & {
    label?: string | undefined;
    isDropdown?: boolean | undefined;
    options?: string[];
    isDynamicList?: boolean | undefined;
};

type ToString<T> = T extends Date
    ? string
    : T extends object
        ? PropertiesToString<T>
        : string

export type PropertiesToString<T> = {
    [K in keyof T]: ToString<T[K]>
}

export type SimulationStep = {
    title: ReactNode;
    description: ReactNode;
    component: ReactNode;
    onNext?: () => void;
    onPrevious?: () => void;
};
