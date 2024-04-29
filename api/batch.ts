import {axiosClient} from "@/api/http-client";

export type Batch = {
    id: number;
    period: number;
    amount: number;
    cycleTime: number;
    cost: number;
    itemNumber: number;
};

export type BatchDto = Omit<Batch, "id">;

export const getBatchesByItemNumberApi = async (itemNumber: number): Promise<Batch[]> => {
    const response = await axiosClient.get<Batch[]>(`/batches?itemNumber=${itemNumber}`);
    return response.data;
};

export const createBatchApi = async (batchDto: BatchDto): Promise<void> => {
    const payload = JSON.stringify(batchDto);
    await axiosClient.post("/batches", payload);
};

export const createMultipleBatchesApi = async (batchDtoList: BatchDto[]): Promise<void> => {
    const payload = JSON.stringify(batchDtoList);
    await axiosClient.post("/batches/many", payload);
};