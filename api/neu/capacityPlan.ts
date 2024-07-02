import {axiosClient} from "@/api/http-client";
export type CapacityPlan = {
    id: string;
    articleNumber: number;
    article: string;
    quantity: number;
    workplace1: number;
    workplace2: number;
    workplace3: number;
    workplace4: number;
    workplace6: number;
    workplace7: number;
    workplace8: number;
    workplace9: number;
    workplace10: number;
    workplace11: number;
    workplace12: number;
    workplace13: number;
    workplace14: number;
    workplace15: number;
};

const ENDPOINT = "capacity-plan";

export const getAllCapacityPlanApi = async (): Promise<CapacityPlan[]> => {
    const response = await axiosClient.get<CapacityPlan[]>(ENDPOINT);
    return response.data;
}