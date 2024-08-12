"use client";
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Alert, Box, Button, Card, IconButton, Stack, Typography} from "@mui/joy";
import {CustomStandardInputComponent} from "@/components/shared/CustomStandardInputComponent";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {GOOD_TO_PRODUCE, InputField} from "@/contexts/ApplicationContext";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSubmitForm from "@/hooks/useSubmitForm";
import CircularProgress from "@mui/joy/CircularProgress";
import PropsSimulationForm from "@/components/forms/formProps";
import {SaleAndProductionProgram} from "@/api/neu/saleAndProductionProgram";
import {Forecast} from "@/api/forecast";
import {axiosClient} from "@/api/http-client";
import {getVertriebswunsch, updateVertriebswunsch, Vertriebswunsch} from "@/api/neu/vertriebswunsch";

export const ProductionProgrammFormComponent: React.FC<PropsSimulationForm> = (props) => {
    const { onSubmit } = props;
    const appContext = useApplicationContext();

    const [saleAndProductionProgramForChildrenBike, setSaleAndProductionProgramForChildrenBike] = useState<SaleAndProductionProgram | undefined>(undefined);
    const [saleAndProductionProgramForWomenBike, setSaleAndProductionProgramForWomenBike] = useState<SaleAndProductionProgram | undefined>(undefined);
    const [saleAndProductionProgramForMenBike, setSaleAndProductionProgramForMenBike] = useState<SaleAndProductionProgram | undefined>(undefined);

    const [vertriebswunsch, setVertriebswunsch] = useState<Vertriebswunsch | undefined>(undefined);

    const [forecast, setForecast] = useState<Forecast | undefined>(undefined);

    const { setFetcher, isLoading, error } = useSubmitForm();

    useEffect(() => {
        (async () => {
                const saleAndProductionProgram = await appContext.getAllSaleAndProductionProgram();
                const saleAndProductionForChildrenBike = saleAndProductionProgram.find((s) => s.article === GOOD_TO_PRODUCE.CHILDREN_BIKE);
                const saleAndProductionForWomenBike = saleAndProductionProgram.find((s) => s.article === GOOD_TO_PRODUCE.WOMEN_BIKE);
                const saleAndProductionForMenBike = saleAndProductionProgram.find((s) => s.article === GOOD_TO_PRODUCE.MEN_BIKE);

                const forecastResponse = await axiosClient.get<Forecast>("/forecast/findone");
                const vertriebswunschResponse = await getVertriebswunsch();

                setForecast(forecastResponse.data);
                setVertriebswunsch(vertriebswunschResponse);

                setSaleAndProductionProgramForChildrenBike(saleAndProductionForChildrenBike!);
                setSaleAndProductionProgramForWomenBike(saleAndProductionForWomenBike!);
                setSaleAndProductionProgramForMenBike(saleAndProductionForMenBike!);
            }
        )();
    }, [appContext]);

    const handleChangeForChildrenBikeInput = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setSaleAndProductionProgramForChildrenBike((prevState) => {
            if (!prevState) return;
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const handleChangeForVertriebswunschChildrenBikeInput = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setVertriebswunsch((prevState) => {
            if (!prevState) return;
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const handleChangeForWomenBikeInput = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setSaleAndProductionProgramForWomenBike((prevState) => {
            if (!prevState) return;
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const handleChangeVertriebswunschForWomenBikeInput = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setVertriebswunsch((prevState) => {
            if (!prevState) return;
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const handleChangeForMenBikeInput = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setSaleAndProductionProgramForMenBike((prevState) => {
            if (!prevState) return;
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const handleChangeVertriebswunschForMenBikeInput = (event: ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault();
        setVertriebswunsch((prevState) => {
            if (!prevState) return;
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };


    const fieldListProduktionsProgramChildrenBike: InputField[] = !saleAndProductionProgramForChildrenBike ? [] : [
        {
            type: "number",
            name: "pN",
            value: saleAndProductionProgramForChildrenBike.pN,
            onChange: handleChangeForChildrenBikeInput,
            label: "Aktuelle Periode (Periode N)",
            placeholder: "Aktuelle Periode (Periode N)",
            error: !saleAndProductionProgramForChildrenBike.pN,
        },
        {
            type: "number",
            name: "pNPlusOne",
            value: saleAndProductionProgramForChildrenBike.pNPlusOne,
            onChange: handleChangeForChildrenBikeInput,
            label: "Periode N+1",
            placeholder: "Periode N+1",
            error: !saleAndProductionProgramForChildrenBike.pNPlusOne,
        },
        {
            type: "number",
            name: "pNPlusTwo",
            value: saleAndProductionProgramForChildrenBike.pNPlusTwo,
            onChange: handleChangeForChildrenBikeInput,
            label: "Periode N+2",
            placeholder: "Periode N+2",
            error: !saleAndProductionProgramForChildrenBike.pNPlusTwo,
        },
        {
            type: "number",
            name: "pNPlusThree",
            value: saleAndProductionProgramForChildrenBike.pNPlusThree,
            onChange: handleChangeForChildrenBikeInput,
            label: "Periode N+3",
            placeholder: "Periode N+3",
            error: !saleAndProductionProgramForChildrenBike.pNPlusThree,
        },
    ];

    const fieldListVertriebswunschChildrenBike: InputField[] = !vertriebswunsch ? [] : [
        {
            type: "number",
            //name: "pN",
            value: forecast?.p1,
            disabled: true,
            //onChange: handleChangeForChildrenBikeInput,
            label: "Aus der Vorperiode",
            //placeholder: "Aktuelle Periode (Periode N)",
            //error: !saleAndProductionProgramForChildrenBike.pN,
        },
        {
            type: "number",
            name: "p1PNPlusOne",
            value: vertriebswunsch.p1PNPlusOne,
            onChange: handleChangeForVertriebswunschChildrenBikeInput,
            label: "Periode N+1",
            placeholder: "Periode N+1",
            error: !vertriebswunsch.p1PNPlusOne,
        },
        {
            type: "number",
            name: "p1PNPlusTwo",
            value: vertriebswunsch.p1PNPlusTwo,
            onChange: handleChangeForVertriebswunschChildrenBikeInput,
            label: "Periode N+2",
            placeholder: "Periode N+2",
            error: !vertriebswunsch.p1PNPlusTwo,
        },
        {
            type: "number",
            name: "p1PNPlusThree",
            value: vertriebswunsch.p1PNPlusThree,
            onChange: handleChangeForVertriebswunschChildrenBikeInput,
            label: "Periode N+3",
            placeholder: "Periode N+3",
            error: !vertriebswunsch.p1PNPlusThree,
        },
    ];

    const fieldListProduktionsProgramWomenBike: InputField[] = !saleAndProductionProgramForWomenBike ? [] : [
        {
            type: "number",
            name: "pN",
            value: saleAndProductionProgramForWomenBike.pN,
            onChange: handleChangeForWomenBikeInput,
            label: "Aktuelle Periode (Periode N)",
            placeholder: "Aktuelle Periode (Periode N)",
            error: !saleAndProductionProgramForWomenBike.pN,
        },
        {
            type: "number",
            name: "pNPlusOne",
            value: saleAndProductionProgramForWomenBike.pNPlusOne,
            onChange: handleChangeForWomenBikeInput,
            label: "Periode N+1",
            placeholder: "Periode N+1",
            error: !saleAndProductionProgramForWomenBike.pNPlusOne,
        },
        {
            type: "number",
            name: "pNPlusTwo",
            value: saleAndProductionProgramForWomenBike.pNPlusTwo,
            onChange: handleChangeForWomenBikeInput,
            label: "Periode N+2",
            placeholder: "Periode N+2",
            error: !saleAndProductionProgramForWomenBike.pNPlusTwo,
        },
        {
            type: "number",
            name: "pNPlusThree",
            value: saleAndProductionProgramForWomenBike.pNPlusThree,
            onChange: handleChangeForWomenBikeInput,
            label: "Periode N+3",
            placeholder: "Periode N+3",
            error: !saleAndProductionProgramForWomenBike.pNPlusThree,
        },
    ];

    const fieldListVertriebswunschWomenBike: InputField[] = !vertriebswunsch ? [] : [
        {
            type: "number",
            //name: "pN",
            value: forecast?.p2,
            disabled: true,
            //onChange: handleChangeForChildrenBikeInput,
            label: "Aus der Vorperiode",
            //placeholder: "Aktuelle Periode (Periode N)",
            //error: !saleAndProductionProgramForChildrenBike.pN,
        },
        {
            type: "number",
            name: "p2PNPlusOne",
            value: vertriebswunsch.p2PNPlusOne,
            onChange: handleChangeVertriebswunschForWomenBikeInput,
            label: "Periode N+1",
            placeholder: "Periode N+1",
            error: !vertriebswunsch.p2PNPlusOne,
        },
        {
            type: "number",
            name: "p2PNPlusTwo",
            value: vertriebswunsch.p2PNPlusTwo,
            onChange: handleChangeVertriebswunschForWomenBikeInput,
            label: "Periode N+2",
            placeholder: "Periode N+2",
            error: !vertriebswunsch.p2PNPlusTwo,
        },
        {
            type: "number",
            name: "p2PNPlusThree",
            value: vertriebswunsch.p2PNPlusThree,
            onChange: handleChangeVertriebswunschForWomenBikeInput,
            label: "Periode N+3",
            placeholder: "Periode N+3",
            error: !vertriebswunsch.p2PNPlusThree,
        },
    ];

    const fieldListProduktionsProgramMenBike: InputField[] = !saleAndProductionProgramForMenBike ? [] : [
        {
            type: "number",
            name: "pN",
            value: saleAndProductionProgramForMenBike.pN,
            onChange: handleChangeForMenBikeInput,
            label: "Aktuelle Periode (Periode N)",
            placeholder: "Aktuelle Periode (Periode N)",
            error: !saleAndProductionProgramForMenBike.pN,
        },
        {
            type: "number",
            name: "pNPlusOne",
            value: saleAndProductionProgramForMenBike.pNPlusOne,
            onChange: handleChangeForMenBikeInput,
            label: "Periode N+1",
            placeholder: "Periode N+1",
            error: !saleAndProductionProgramForMenBike.pNPlusOne,
        },
        {
            type: "number",
            name: "pNPlusTwo",
            value: saleAndProductionProgramForMenBike.pNPlusTwo,
            onChange: handleChangeForMenBikeInput,
            label: "Periode N+2",
            placeholder: "Periode N+2",
            error: !saleAndProductionProgramForMenBike.pNPlusTwo,
        },
        {
            type: "number",
            name: "pNPlusThree",
            value: saleAndProductionProgramForMenBike.pNPlusThree,
            onChange: handleChangeForMenBikeInput,
            label: "Periode N+3",
            placeholder: "Periode N+3",
            error: !saleAndProductionProgramForMenBike.pNPlusThree,
        },
    ];

    const fieldListVertriebswunschMenBike: InputField[] = !vertriebswunsch ? [] : [
        {
            type: "number",
            //name: "pN",
            value: forecast?.p3,
            disabled: true,
            //onChange: handleChangeForChildrenBikeInput,
            label: "Aus der Vorperiode",
            //placeholder: "Aktuelle Periode (Periode N)",
            //error: !saleAndProductionProgramForChildrenBike.pN,
        },
        {
            type: "number",
            name: "p3PNPlusOne",
            value: vertriebswunsch.p3PNPlusOne,
            onChange: handleChangeVertriebswunschForMenBikeInput,
            label: "Periode N+1",
            placeholder: "Periode N+1",
            error: !vertriebswunsch.p3PNPlusOne,
        },
        {
            type: "number",
            name: "p3PNPlusTwo",
            value: vertriebswunsch.p3PNPlusTwo,
            onChange: handleChangeVertriebswunschForMenBikeInput,
            label: "Periode N+2",
            placeholder: "Periode N+2",
            error: !vertriebswunsch.p3PNPlusTwo,
        },
        {
            type: "number",
            name: "p3PNPlusThree",
            value: vertriebswunsch.p3PNPlusThree,
            onChange: handleChangeVertriebswunschForMenBikeInput,
            label: "Periode N+3",
            placeholder: "Periode N+3",
            error: !vertriebswunsch.p3PNPlusThree,
        },
    ];

    const isFormChildrenBikeValid = fieldListProduktionsProgramChildrenBike.every(field => field.error);
    const isFormWomenBikeValid = fieldListProduktionsProgramWomenBike.every(field => field.error);
    const isFormMenBikeValid = fieldListProduktionsProgramMenBike.every(field => field.error);

    const handleSaveProductionProgram = async () => {
        await setFetcher(async () => {
            if (!saleAndProductionProgramForChildrenBike ||
                !saleAndProductionProgramForWomenBike ||
                !saleAndProductionProgramForMenBike) return;

            const dataToUpdate = [
                saleAndProductionProgramForChildrenBike,
                saleAndProductionProgramForWomenBike,
                saleAndProductionProgramForMenBike,
            ];

            await appContext.updateSaleAndProductionProgram(dataToUpdate);
            //onSubmit && onSubmit();
        });
    };

    const handleSaveVertriebswunsch = async () => {
        if (!vertriebswunsch) return;
        await updateVertriebswunsch(vertriebswunsch);
        //onSubmit && onSubmit();
    }

    if (!saleAndProductionProgramForChildrenBike ||
        !saleAndProductionProgramForWomenBike ||
        !saleAndProductionProgramForMenBike
    ) return <div>Wird geladen...</div>

    return (
        <PageSectionComponent
            title="Produktionsprogramm"
            subtitle="Geben Sie das Produktionsprogramm bei allen Produkten ein"
            //endDecorator={<IconButton variant={"outlined"}><MoreHorizIcon /></IconButton>}
        >
            <Box
                component={"div"}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--gap-3)"
                }}
            >
                <Stack spacing={"var(--gap-3)"}>
                    <Typography level={"title-lg"}>Produktionsprogramm</Typography>
                    <Box component={"div"}>
                        <Stack spacing={"var(--gap-3)"}>
                            <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                                <Stack spacing={"var(--gap-2)"}>
                                    <Typography level={"h4"}>Kinderfahrrad({GOOD_TO_PRODUCE.CHILDREN_BIKE})</Typography>
                                    {fieldListProduktionsProgramChildrenBike.map((field, index) =>
                                        <CustomStandardInputComponent {...field} key={index} />
                                    )}
                                </Stack>
                            </Card>
                            <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                                <Stack spacing={"var(--gap-2)"}>
                                    <Typography level={"h4"}>Damenfahrrad({GOOD_TO_PRODUCE.WOMEN_BIKE})</Typography>
                                    {fieldListProduktionsProgramWomenBike.map((field, index) =>
                                        <CustomStandardInputComponent {...field} key={index} />
                                    )}
                                </Stack>
                            </Card>
                            <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                                <Stack spacing={"var(--gap-2)"}>
                                    <Typography level={"h4"}>Herrenfahrrad({GOOD_TO_PRODUCE.MEN_BIKE})</Typography>
                                    {fieldListProduktionsProgramMenBike.map((field, index) =>
                                        <CustomStandardInputComponent {...field} key={index} />
                                    )}
                                </Stack>
                            </Card>
                            {error ?
                                <Alert color="danger">
                                    <div>
                                        <div>Ein Fehler ist aufgetreten</div>
                                        <Typography color={"danger"} level={"body-sm"}>{error.toString()}</Typography>
                                    </div>
                                </Alert> : null
                            }
                            <div>
                                <Button
                                    onClick={handleSaveProductionProgram}
                                    disabled={isFormChildrenBikeValid && isFormWomenBikeValid && isFormMenBikeValid || isLoading}
                                    startDecorator={isLoading ? <CircularProgress size={"sm"} /> : null}
                                    sx={{ justifySelf: "start" }}
                                >
                                    {isLoading ? "Ihr Produktionsprogramm wird gespeichert..." : "Produktionsprogramm Speichern"}
                                </Button>
                            </div>
                        </Stack>
                    </Box>
                </Stack>
                <Stack spacing={"var(--gap-3)"}>
                    <Typography level={"title-lg"}>Vertriebswunsch</Typography>
                    <Box component="div">
                        <Stack spacing={"var(--gap-3)"}>
                            <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                                <Stack spacing={"var(--gap-2)"}>
                                    <Typography level={"h4"}>Kinderfahrrad({GOOD_TO_PRODUCE.CHILDREN_BIKE})</Typography>
                                    {fieldListVertriebswunschChildrenBike.map((field, index) =>
                                        <CustomStandardInputComponent {...field} key={index} />
                                    )}
                                </Stack>
                            </Card>
                            <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                                <Stack spacing={"var(--gap-2)"}>
                                    <Typography level={"h4"}>Damenfahrrad({GOOD_TO_PRODUCE.WOMEN_BIKE})</Typography>
                                    {fieldListVertriebswunschWomenBike.map((field, index) =>
                                        <CustomStandardInputComponent {...field} key={index} />
                                    )}
                                </Stack>
                            </Card>
                            <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                                <Stack spacing={"var(--gap-2)"}>
                                    <Typography level={"h4"}>Herrenfahrrad({GOOD_TO_PRODUCE.MEN_BIKE})</Typography>
                                    {fieldListVertriebswunschMenBike.map((field, index) =>
                                        <CustomStandardInputComponent {...field} key={index} />
                                    )}
                                </Stack>
                            </Card>
                            {error ?
                                <Alert color="danger">
                                    <div>
                                        <div>Ein Fehler ist aufgetreten</div>
                                        <Typography color={"danger"} level={"body-sm"}>{error.toString()}</Typography>
                                    </div>
                                </Alert> : null
                            }
                            <div>
                                <Button
                                    onClick={handleSaveVertriebswunsch}
                                    //disabled={isFormChildrenBikeValid && isFormWomenBikeValid && isFormMenBikeValid || isLoading}
                                    //startDecorator={isLoading ? <CircularProgress size={"sm"} /> : null}
                                    sx={{ justifySelf: "start" }}
                                >
                                    Vertriebswunsch Speichern
                                </Button>
                            </div>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </PageSectionComponent>
    );
};
