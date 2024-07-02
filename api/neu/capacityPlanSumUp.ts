import {axiosClient} from "@/api/http-client";

export type CapacityPlanSumUp = {
    id: string;
    capacityRequirement?: number | null;
    setupTime?: number | null;
    capacityRequirementBacklogPrevPeriod?: number | null;
    setupTimeBacklogPrevPeriod?: number | null;
    totalCapacityRequirements?: number | null;
    shifts?: number | null;
    overtimeWeek?: number | null;
    overtimeDay?: number | null;
    workPlaceNumber?: number | null;
};

const ENDPOINT = "capacity-plan-sum-up";

export const getAllCapacityPlanSumUpApi = async (): Promise<CapacityPlanSumUp[]> => {
    const response = await axiosClient.get<CapacityPlanSumUp[]>(ENDPOINT);
    return response.data;
}