import {axiosClient} from "@/api/http-client";

export type WaitingList = {
    id: number;
    period: number;
    order: number;
    firstBatch: number;
    lastBatch: number;
    item: number;
    amount: number;
    timeNeed: number;
    workPlaceId: number;
}

export type WaitingListDto = Omit<WaitingList, "id">;

export const getWaitingListByPeriodApi = async (period: number): Promise<WaitingList[]> => {
    const response = await axiosClient.get<WaitingList[]>(`/waitinglists?period=${period}`);
    return response.data;
};

export const createWaitingListApi = async (waitingListDto: WaitingListDto): Promise<void> => {
    const payload = JSON.stringify(waitingListDto);
    await axiosClient.post("/waitinglists", payload);
};

export const createMultipleWaitingListsApi = async (waitingListDtoList: WaitingListDto[]): Promise<void> => {
    const payload = JSON.stringify(waitingListDtoList);
    await axiosClient.post("/waitinglists/many", payload);
};