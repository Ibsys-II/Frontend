import React, {ChangeEvent, useEffect, useState} from 'react';
import {Alert, Box, Button, IconButton, Stack, Typography} from "@mui/joy";
import {CustomStandardInputComponent} from "@/components/shared/CustomStandardInputComponent";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {ForecastDto} from "@/api/forecast";
import {InputField, PropertiesToString} from "@/contexts/ApplicationContext";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSubmitForm from "@/hooks/useSubmitForm";
import CircularProgress from "@mui/joy/CircularProgress";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PropsSimulationForm from "@/components/forms/formProps";

type ForecastDtoUpdateModel = PropertiesToString<ForecastDto>;

type Props = PropsSimulationForm;

export const ProductionProgrammFormComponent: React.FC<Props> = (props) => {
    const { onSubmit } = props;
    const appContext = useApplicationContext();
    const INITIAL_FORECAST_DTO_STATE: ForecastDtoUpdateModel = {
        p1: "",
        p2: "",
        p3: "",
        period: appContext.period as unknown as string,
    }
    const [forecastDto, setForecastDto] = useState<ForecastDtoUpdateModel>(INITIAL_FORECAST_DTO_STATE);
    const { setFetcher, isLoading, error } = useSubmitForm();

    useEffect(() => {
        setForecastDto(prevState => ({
            ...prevState,
            period: appContext.period as unknown as string,
        }))
    }, [appContext.period]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setForecastDto((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const fieldList: InputField[] = [
        {
            type: "number",
            name: "p1",
            value: forecastDto.p1,
            onChange: handleChange,
            label: "Prognose Produkt P1",
            placeholder: "Prognose Produkt P1",
            error: !forecastDto.p1,
        },
        {
            type: "number",
            name: "p2",
            value: forecastDto.p2,
            onChange: handleChange,
            label: "Prognose Produkt P2",
            placeholder: "Prognose Produkt P2",
            error: !forecastDto.p2,
        },
        {
            type: "number",
            name: "p3",
            value: forecastDto.p3,
            onChange: handleChange,
            label: "Prognose Produkt P3",
            placeholder: "Prognose Produkt P3",
            error: !forecastDto.p3,
        },
        {
            type: "number",
            name: "period",
            value: forecastDto.period,
            onChange: handleChange,
            label: "Periode",
            placeholder: "Periode",
            disabled: true,
            error: !forecastDto.period,
        },
    ];

    const isFormValid = fieldList.every(field => field.error);

    const handleSave = async () => {
        await setFetcher(async () => {
            await appContext.createForecast(forecastDto as unknown as ForecastDto);
            onSubmit();
        });
    };

    return (
        <PageSectionComponent
            title="Vertriebswunsch"
            subtitle="Geben Sie die Prognosen ein"
            endDecorator={<IconButton variant={"outlined"}><MoreHorizIcon /></IconButton>}
        >
            <Stack spacing={"var(--gap-2)"}>
                {fieldList.map((field, index) =>
                    <CustomStandardInputComponent {...field} key={index} />
                )}
                {error ?
                    <Alert color="danger">
                        <div>
                            <div>Ein Fehler ist aufgetreten</div>
                            <Typography color={"danger"} level={"body-sm"}>{error.toString()}</Typography>
                        </div>
                    </Alert> : null
                }
                <Button
                    onClick={handleSave}
                    disabled={isFormValid || isLoading}
                    startDecorator={isLoading ? <CircularProgress size={"sm"} /> : null}
                >
                    {isLoading ? "Ihr Vertriebswunsch wird gespeichert..." : "Speichern"}
                </Button>
            </Stack>
        </PageSectionComponent>
    );
};

