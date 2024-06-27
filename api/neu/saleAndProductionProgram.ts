import {axiosClient} from "@/api/http-client";

export type SaleAndProductionProgram = {
    id: string;
    pN: number;
    pNPlusOne: number;
    pNPlusTwo: number;
    pNPlusThree: number;
    article: string;
}

export type SaleAndProductionProgramDto = Omit<SaleAndProductionProgram, "id">;

const ENDPOINT = "sale-and-production-program";

export const getAllSaleAndProductionProgramApi = async (): Promise<SaleAndProductionProgram[]> => {
    const response = await axiosClient.get<SaleAndProductionProgram[]>(`/${encodeURIComponent(ENDPOINT)}`);
    return response.data;
};

export const updateSaleAndProductionProgramApi = async (saleAndProductionProgramList: SaleAndProductionProgram[]): Promise<void> => {
    const payload = JSON.stringify(saleAndProductionProgramList);
    await axiosClient.put(`/${encodeURIComponent(ENDPOINT)}`, payload);
}
