"use client";
import {createForecastApi, Forecast, ForecastDto, getForecastByPeriodApi} from "@/api/forecast";
import React, {createContext, PropsWithChildren, ReactNode, useState} from "react";
import {InputTypeMap} from "@mui/joy";
import {Article, getArticlesApi, getArticlesByNumberApi} from "@/api/article";
import {createMultipleOrdersApi, createOrderApi, getOrdersByPeriodApi, Order, OrderDto} from "@/api/order";
import {
    createMultipleWarehouseStocksApi,
    createWarehouseStockApi,
    getWarehouseStocksByPeriodApi,
    WarehouseStock,
    WarehouseStockDto
} from "@/api/warehousestock";
import {
    createMultipleWorkplacesApi,
    createWorkplaceApi,
    getWorkplacesByPeriodApi,
    Workplace,
    WorkplaceDto
} from "@/api/workplace";
import {
    createMultipleWaitingListsApi,
    createWaitingListApi,
    getWaitingListByPeriodApi,
    WaitingList,
    WaitingListDto
} from "@/api/waitingList";
import {Batch, BatchDto, createMultipleBatchesApi, getBatchesByItemNumberApi} from "@/api/batch";

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
    getOrdersByPeriod: (period: number) => Promise<Order[]>;
    createOrder: (orderDto: OrderDto) => Promise<void>;
    createMultipleOrders: (orderDtoList: OrderDto[]) => Promise<void>;
    // WarehouseStocks
    getWarehouseStocksByPeriod: (period: number) => Promise<WarehouseStock[]>;
    createWarehouseStock: (warehouseStockDto: WarehouseStockDto) => Promise<void>;
    createMultipleWarehouseStocks: (warehouseStockDtoList: WarehouseStockDto[]) => Promise<void>;
    // Work places
    getWorkplacesByPeriod: (period: number) => Promise<Workplace[]>;
    createWorkplace: (workplaceDto: WorkplaceDto) => Promise<void>;
    createMultipleWorkplaces: (workplaceDtoList: WorkplaceDto[]) => Promise<void>;
    // Waiting lists
    getWaitingListByPeriod: (period: number) => Promise<WaitingList[]>;
    createWaitingList: (waitingListDto: WaitingListDto) => Promise<void>;
    createMultipleWaitingLists: (waitingListDtoList: WaitingListDto[]) => Promise<void>;
    // Batches
    getBatchesByItemNumber: (orderId: number) => Promise<Batch[]>;
    createBatch: (batchDto: BatchDto) => Promise<void>;
    createMultipleBatches: (batchDtoList: BatchDto[]) => Promise<void>;

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

    const getOrdersByPeriod = async (period: number): Promise<Order[]> => {
        return await getOrdersByPeriodApi(period);
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
    };

    const getWarehouseStocksByPeriod = async (period: number): Promise<WarehouseStock[]> => {
        return await getWarehouseStocksByPeriodApi(period);
    };

    const createWarehouseStock = async (warehouseStockDto: WarehouseStockDto): Promise<void> => {
        return await createWarehouseStockApi(warehouseStockDto);
    };

    const createMultipleWarehouseStocks = async (warehouseStockDtoList: WarehouseStockDto[]): Promise<void> => {
        return await createMultipleWarehouseStocksApi(warehouseStockDtoList);
    };

    const getWorkplacesByPeriod = async (period: number): Promise<Workplace[]> => {
        return await getWorkplacesByPeriodApi(period);
    };

    const createWorkplace = async (workplaceDto: WorkplaceDto): Promise<void> => {
        return await createWorkplaceApi(workplaceDto);
    };

    const createMultipleWorkplaces = async (workplaceDtoList: WorkplaceDto[]): Promise<void> => {
        return await createMultipleWorkplacesApi(workplaceDtoList);
    };

    const getWaitingListByPeriod = async (period: number): Promise<WaitingList[]> => {
        return await getWaitingListByPeriodApi(period);
    };

    const createWaitingList = async (waitingListDto: WaitingListDto): Promise<void> => {
        return await createWaitingListApi(waitingListDto);
    };

    const createMultipleWaitingLists = async (waitingListDtoList: WaitingListDto[]): Promise<void> => {
        return await createMultipleWaitingListsApi(waitingListDtoList);
    };

    const getBatchesByOrderId = async (orderId: number): Promise<Batch[]> => {
        return await getBatchesByItemNumberApi(orderId);
    };

    const createBatch = async (batchDto: BatchDto): Promise<void> => {
        return await createBatch(batchDto);
    };

    const createMultipleBatches = async (batchDtoList: BatchDto[]): Promise<void> => {
        return await createMultipleBatchesApi(batchDtoList);
    };

    return (
        <ApplicationContext.Provider value={{
            period,
            setPeriod,
            getForecastByPeriod,
            createForecast,
            getArticles,
            getArticlesWithoutGoodToProduce,
            getArticlesByNumber,
            getOrdersByPeriod,
            createOrder,
            createMultipleOrders,
            getWarehouseStocksByPeriod,
            createWarehouseStock,
            createMultipleWarehouseStocks,
            getWorkplacesByPeriod,
            createWorkplace,
            createMultipleWorkplaces,
            getWaitingListByPeriod,
            createWaitingList,
            createMultipleWaitingLists,
            getBatchesByItemNumber: getBatchesByOrderId,
            createBatch,
            createMultipleBatches,
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

// Helpers
const resolveObjectWithSpecificProperties = <T extends Record<string, unknown>>(
    object: T,
    propertiesToReturn: (keyof T)[]
): Partial<T> => {

    return Object.fromEntries(
        Object.entries(object)
            .filter(([key, _value]) => propertiesToReturn.includes(key as string))
    ) as Partial<T>
}

export const resolveObjectWithSpecificPropertiesFromList = <T extends Record<string, unknown>>(
    objectList: T[],
    propertiesToReturn: (keyof T)[]
): Partial<T>[] => {
    return objectList.map((object) => resolveObjectWithSpecificProperties(object, propertiesToReturn));
}
