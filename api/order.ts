import {axiosClient} from "@/api/http-client";

export type Order = {
    id: number;
    period: number;
    quantity: number;
    mode: number;
    articleId: number;
};

export type OrderDto = Omit<Order, "id">;

export const createOrderApi = async (orderDto: OrderDto): Promise<void> => {
    return await axiosClient.post("/orders", orderDto);
};

export const createMultipleOrdersApi = async (orderDtoList: OrderDto[]): Promise<void> => {
    return await axiosClient.post("/orders", orderDtoList);
}