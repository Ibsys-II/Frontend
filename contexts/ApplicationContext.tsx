"use client";
import {createForecastApi, Forecast, ForecastDto, getForecastByPeriodApi} from "@/api/forecast";
import React, {createContext, PropsWithChildren} from "react";
import {InputTypeMap} from "@mui/joy";

type ContextOutput = {
    // Forecast
    getForecastByPeriod: (period: number) => Promise<Forecast>;
    createForecast: (forecastDto: ForecastDto) => Promise<void>;
}

// @ts-ignore
export const ApplicationContext = createContext<ContextOutput>({});

type Props = Readonly<PropsWithChildren>;

export const ApplicationContextProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;

    const getForecastByPeriod = async (period: number): Promise<Forecast> => {
        return await getForecastByPeriodApi(period);
    };

    const createForecast = async (forecastDto: ForecastDto): Promise<void> => {
        await createForecastApi(forecastDto);
    };

    return (
        <ApplicationContext.Provider value={{
            getForecastByPeriod,
            createForecast,
        }}>
            {children}
        </ApplicationContext.Provider>
    )
};

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------
export type InputField = InputTypeMap["props"] & {
    label?: string | undefined;
    isDropdown?: boolean | undefined;
    options?: string[];
    isDynamicList?: boolean | undefined;
};

type ToString<T> = T extends Date
    ? string
    : T extends object
        ? PropertiesToString<T>
        : string

export type PropertiesToString<T> = {
    [K in keyof T]: ToString<T[K]>
}
