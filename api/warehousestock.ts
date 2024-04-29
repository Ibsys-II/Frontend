import {axiosClient} from "@/api/http-client";

export type WarehouseStock = {
    id: number;
    amount: number;
    pct: number;
    price: number;
    stockValue: number;
    period: number;
    articleId: number;
};

export type WarehouseStockDto = Omit<WarehouseStock, "id">;

export const getWarehouseStocksByPeriodApi = async (period: number): Promise<WarehouseStock[]> => {
    const response = await axiosClient.get<WarehouseStock[]>(`/warehousestocks?period=${period}`)
    return response.data;
}

export const createWarehouseStockApi = async (warehouseStockDto: WarehouseStockDto): Promise<void> => {
    const payload = JSON.stringify(warehouseStockDto);
    await axiosClient.post("/warehousestocks", payload);
}

export const createMultipleWarehouseStocksApi = async (warehouseStockDtoList: WarehouseStockDto[]): Promise<void> => {
    const payload = JSON.stringify(warehouseStockDtoList);
    await axiosClient.post("/warehousestocks/many", payload);
}