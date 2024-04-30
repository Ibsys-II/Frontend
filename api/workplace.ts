import {axiosClient} from "@/api/http-client";

export type Workplace = {
    id: number;
    idFromXml?: number;
    period?: number;
    setupEvents?: number;
    idleTime?: number;
    wageIdleTimeCosts?: number;
    wageCosts?: number;
    machineIdleTimeCosts?: number;
    timeNeed?: number;
    order?: number;
    batch?: number;
    item?: number;
    number: number;
    amount?: number;
    isMissingPart?: boolean;
    isIdleTimeCosts?: boolean;
    isWaitingListWorkStations?: boolean;
    isWaitingListStock?: boolean;
    isOrdersInWork?: boolean;
};

export type WorkplaceDto = Omit<Workplace, "id">;

export const getWorkplacesByPeriodApi = async (period: number): Promise<Workplace[]> => {
    const response = await axiosClient.get<Workplace[]>(`/workplaces?period=${period}`);
    return response.data;
};

export const getWorkPlacesByPeriodAndIsIdleTimeCostsApi = async (period: number): Promise<Workplace[]> => {
    const response = await axiosClient.get<Workplace[]>(`/workplaces?period=${period}&isIdleTimeCost=${true}`);
    return response.data.filter((w) => w.idleTime !== null);
};

export const getWorkPlacesByPeriodAndIsOrdersInWorkApi = async (period: number): Promise<Workplace[]> => {
    const response = await axiosClient.get<Workplace[]>(`/workplaces?period=${period}&isOrdersInWork=${true}`);
    return response.data;
};

export const createWorkplaceApi = async (workplaceDto: WorkplaceDto): Promise<void> => {
    const payload = JSON.stringify(workplaceDto);
    await axiosClient.post("/workplaces", payload);
};

export const createMultipleWorkplacesApi = async (workplaceDtoList: WorkplaceDto[]): Promise<void> => {
    const payload = JSON.stringify(workplaceDtoList);
    await axiosClient.post("/workplaces/many", payload);
};