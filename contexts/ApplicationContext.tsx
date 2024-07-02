"use client";
import {createForecastApi, Forecast, ForecastDto, getForecastByPeriodApi} from "@/api/forecast";
import React, {createContext, PropsWithChildren, ReactNode, useState} from "react";
import {InputTypeMap} from "@mui/joy";
import {Article, getArticlesApi, getArticlesByNumberApi} from "@/api/article";
import {
    createMultipleOrdersApi,
    createOrderApi,
    getAppOrderByIsInwardStockMovementApi,
    getOrdersByPeriodApi,
    Order,
    OrderDto
} from "@/api/order";
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
    getWorkPlacesByPeriodAndIsIdleTimeCostsApi,
    getWorkPlacesByPeriodAndIsOrdersInWorkApi,
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
import {
    getAllSaleAndProductionProgramApi,
    SaleAndProductionProgram,
    updateSaleAndProductionProgramApi
} from "@/api/neu/saleAndProductionProgram";
import {getAllProductionOrderApi, ProductionOrder, updateProductionOrderApi} from "@/api/neu/productionOrder";
import {CapacityPlan, getAllCapacityPlanApi} from "@/api/neu/capacityPlan";
import {CapacityPlanSumUp, getAllCapacityPlanSumUpApi} from "@/api/neu/capacityPlanSumUp";
import {clearDbApi} from "@/api/neu/dbconfig";

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
    getAppOrderByIsInwardStockMovement: () => Promise<Order[]>;
    // WarehouseStocks
    getWarehouseStocksByPeriod: (period: number) => Promise<WarehouseStock[]>;
    createWarehouseStock: (warehouseStockDto: WarehouseStockDto) => Promise<void>;
    createMultipleWarehouseStocks: (warehouseStockDtoList: WarehouseStockDto[]) => Promise<void>;
    // Work places
    getWorkplacesByPeriod: (period: number) => Promise<Workplace[]>;
    createWorkplace: (workplaceDto: WorkplaceDto) => Promise<void>;
    createMultipleWorkplaces: (workplaceDtoList: WorkplaceDto[]) => Promise<void>;
    getWorkPlacesByPeriodAndIsIdleTimeCosts: (period: number) => Promise<Workplace[]>;
    getWorkPlacesByPeriodAndIsOrdersInWork: (period: number) => Promise<Workplace[]>;
    // Waiting lists
    getWaitingListByPeriod: (period: number) => Promise<WaitingList[]>;
    createWaitingList: (waitingListDto: WaitingListDto) => Promise<void>;
    createMultipleWaitingLists: (waitingListDtoList: WaitingListDto[]) => Promise<void>;
    // Batches
    getBatchesByItemNumber: (orderId: number) => Promise<Batch[]>;
    createBatch: (batchDto: BatchDto) => Promise<void>;
    createMultipleBatches: (batchDtoList: BatchDto[]) => Promise<void>;

    // New APIs
    // Sale and production program
    getAllSaleAndProductionProgram: () => Promise<SaleAndProductionProgram[]>;
    updateSaleAndProductionProgram: (saleAndProductionProgramList: SaleAndProductionProgram[]) => Promise<void>;
    getAllProductionOrder: () => Promise<ProductionOrder[]>;
    updateProductionOrder: (productionOrder: ProductionOrder) => Promise<void>;

    // Capacity plan
    getAllCapacityPlan: () => Promise<CapacityPlan[]>;

    // Capacity plan sum up
    getAllCapacityPlanSumUp: () => Promise<CapacityPlanSumUp[]>;

    // Clear Db
    clearDb: () => Promise<void>;
}

// @ts-ignore
export const ApplicationContext = createContext<ContextOutput>({});

export const ARTICLES_NAME_TO_PRODUCE = new Set<string>(["1P", "2P", "3P"]);

export enum GOOD_TO_PRODUCE {
    CHILDREN_BIKE = "P1",
    WOMEN_BIKE = "P2",
    MEN_BIKE = "P3",
}

type Props = Readonly<PropsWithChildren>;

export const ApplicationContextProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;

    const [period, setPeriod] = useState<number>(3);

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

    const getAppOrderByIsInwardStockMovement = async (): Promise<Order[]> => {
        return await getAppOrderByIsInwardStockMovementApi();
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

    const getWorkPlacesByPeriodAndIsOrdersInWork = async (period: number): Promise<Workplace[]> => {
        return await getWorkPlacesByPeriodAndIsOrdersInWorkApi(period);
    };

    const getWorkPlacesByPeriodAndIsIdleTimeCosts = async (period: number): Promise<Workplace[]> => {
        return await getWorkPlacesByPeriodAndIsIdleTimeCostsApi(period);
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

    const getBatchesByItemNumber = async (orderId: number): Promise<Batch[]> => {
        return await getBatchesByItemNumberApi(orderId);
    };

    const createBatch = async (batchDto: BatchDto): Promise<void> => {
        return await createBatch(batchDto);
    };

    const createMultipleBatches = async (batchDtoList: BatchDto[]): Promise<void> => {
        return await createMultipleBatchesApi(batchDtoList);
    };

    // New Apis
    // Sale and production program
    const getAllSaleAndProductionProgram = async (): Promise<SaleAndProductionProgram[]> => {
        return await getAllSaleAndProductionProgramApi();
    }

    const updateSaleAndProductionProgram = async (saleAndProductionProgramList: SaleAndProductionProgram[]): Promise<void> => {
        return await updateSaleAndProductionProgramApi(saleAndProductionProgramList);
    }

    const getAllProductionOrder = async (): Promise<ProductionOrder[]> => {
        return await getAllProductionOrderApi();
    }

    const updateProductionOrder = async (productionOrder: ProductionOrder): Promise<void> => {
        await updateProductionOrderApi(productionOrder);
    }

    const getAllCapacityPlan = async (): Promise<CapacityPlan[]> => {
        return await getAllCapacityPlanApi();
    }

    const getAllCapacityPlanSumUp = async (): Promise<CapacityPlanSumUp[]> => {
        return await getAllCapacityPlanSumUpApi();
    }

    const clearDb = async (): Promise<void> => {
        await clearDbApi();
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
            getOrdersByPeriod,
            createOrder,
            createMultipleOrders,
            getAppOrderByIsInwardStockMovement,
            getWarehouseStocksByPeriod,
            createWarehouseStock,
            createMultipleWarehouseStocks,
            getWorkplacesByPeriod,
            createWorkplace,
            getWorkPlacesByPeriodAndIsIdleTimeCosts,
            getWorkPlacesByPeriodAndIsOrdersInWork,
            createMultipleWorkplaces,
            getWaitingListByPeriod,
            createWaitingList,
            createMultipleWaitingLists,
            getBatchesByItemNumber,
            createBatch,
            createMultipleBatches,
            // New APIs
            getAllSaleAndProductionProgram,
            updateSaleAndProductionProgram,
            getAllProductionOrder,
            updateProductionOrder,
            getAllCapacityPlan,
            getAllCapacityPlanSumUp,
            clearDb,
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
    component: () => ReactNode;
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
