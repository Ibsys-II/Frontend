import {axiosClient} from "@/api/http-client";

export type ProductionOrder = {
    id: string;
    article: string;
    articleNumber: number;
    saleOrder: number;
    waitingQueue: number;
    plannedSafetyStock: number;
    warehousePreviousPeriod: number;
    ordersInWaitingQueue: number;
    workInProgress: number;
    productionOrder: number;
    usedFor: "P1" | "P2" | "P3";
};

const ENDPOINT = "production-orders";
export const getAllProductionOrderApi = async (): Promise<ProductionOrder[]> => {
    const response = await axiosClient.get<ProductionOrder[]>(`/${encodeURIComponent(ENDPOINT)}`);
    return response.data;
};

export const updateProductionOrderApi = async (productionOrder: ProductionOrder): Promise<void> => {
    const payload = JSON.stringify(productionOrder);
    await axiosClient.put(`/${encodeURIComponent(ENDPOINT)}`, payload);
}