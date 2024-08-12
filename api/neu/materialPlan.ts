import {axiosClient} from "@/api/http-client";

export type MaterialPlan = {
    id: string;
    article: string;
    articleNumber: number;
    deliveryTime: number;
    deviation: number;
    usedInP1: number;
    usedInP2: number;
    usedInP3: number;
    discountQuantity: number;
    initialStockInPeriodN: number;
    grossRequirementBasedOnProductionProgramN: number;
    grossRequirementBasedOnProductionProgramNPlus1: number;
    grossRequirementBasedOnProductionProgramNPlus2: number;
    grossRequirementBasedOnProductionProgramNPlus3: number;
    quantity: number;
    orderType: string | null;
}

const ENDPOINT = "material-plan";

export const getAllMaterialPlanApi = async (): Promise<MaterialPlan[]> => {
    const response = await axiosClient.get<MaterialPlan[]>(`/${ENDPOINT}`);
    return response.data;
};

export const updateMaterialPlanApi = async (materialPlan: MaterialPlan): Promise<void> => {
    const payload = JSON.stringify(materialPlan);
    await axiosClient.put(`/${encodeURIComponent(ENDPOINT)}`, payload);
};
