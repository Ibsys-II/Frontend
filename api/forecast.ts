import axios from "axios";
import {axiosClient} from "@/api/http-client";

export type Forecast = {
    id: string;
    p1: number;
    p2: number;
    p3: number;
    period: number;
}

export type ForecastDto = Omit<Forecast, "id">;

export const getForecastByPeriodApi = async (period: number): Promise<Forecast> => {
    const response = await axiosClient.get<Forecast>(`/forecast?period=${period}`);
    return response.data;
};

export const createForecastApi = async (forecastDto: ForecastDto): Promise<void> => {
    await axiosClient.post("/forecast", forecastDto);
}