import {axiosClient} from "@/api/http-client";

export type Vertriebswunsch = {
    id: string;

    p1PNPlusOne: number;
    p1PNPlusTwo: number;
    p1PNPlusThree: number;

    p2PNPlusOne: number;
    p2PNPlusTwo: number;
    p2PNPlusThree: number;

    p3PNPlusOne: number;
    p3PNPlusTwo: number;
    p3PNPlusThree: number;
};

const ENDPOINT = "vertriebswunsch" as const;

export const getVertriebswunsch = async (): Promise<Vertriebswunsch> => {
    const response = await axiosClient.get<Vertriebswunsch>(ENDPOINT);
    return response.data;
}

export const updateVertriebswunsch = async (vertriebswunsch: Vertriebswunsch): Promise<void> => {
    const payload = JSON.stringify(vertriebswunsch);
    await axiosClient.put(ENDPOINT, payload);
};
