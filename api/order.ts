import {axiosClient} from "@/api/http-client";

export type Order = {
    id: number;
    idFromXml?: number;
    period: number;
    quantity?: number;
    mode?: number;
    amount?: number;
    time?: number;
    materialCosts?: number;
    orderCosts?: number;
    entireCosts?: number;
    pieceCosts?: number;
    item?: number;
    cost?: number;
    startTime?: number;
    finishTime?: number;
    cycleTimeMin?: number;
    cycleTimeFactor?: number;
    averageUnitCosts?: number;
    isInwardStockMovement?: boolean;
    isFutureInwardStockMovement?: boolean;
    isCompletedOrders?: boolean;
    isCycleTime?: boolean;
    articleId?: number;
};

export type OrderDto = Omit<Order, "id">;

export const getOrdersByPeriodApi = async (period: number): Promise<Order[]> => {
    const response = await axiosClient.get<Order[]>(`/orders?period=${period}`);
    return response.data;
};

export const getAppOrderByIsInwardStockMovementApi = async (): Promise<Order[]> => {
    const response = await axiosClient.get<Order[]>(`/orders?isInwardStockMovement=${true}`);
    return response.data;
};

export const createOrderApi = async (orderDto: OrderDto): Promise<void> => {
    const payload = JSON.stringify(orderDto);
    await axiosClient.post("/orders", payload);
};

export const createMultipleOrdersApi = async (orderDtoList: OrderDto[]): Promise<void> => {
    const payload = JSON.stringify(orderDtoList);
    await axiosClient.post("/orders/many", payload);
}