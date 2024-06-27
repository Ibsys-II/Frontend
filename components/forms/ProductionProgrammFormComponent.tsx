"use client";
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Alert, Button, Card, IconButton, Stack, Typography} from "@mui/joy";
import {CustomStandardInputComponent} from "@/components/shared/CustomStandardInputComponent";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {GOOD_TO_PRODUCE, InputField} from "@/contexts/ApplicationContext";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSubmitForm from "@/hooks/useSubmitForm";
import CircularProgress from "@mui/joy/CircularProgress";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PropsSimulationForm from "@/components/forms/formProps";
import {SaleAndProductionProgram} from "@/api/neu/saleAndProductionProgram";

export const ProductionProgrammFormComponent: React.FC<PropsSimulationForm> = (props) => {
    const { onSubmit } = props;
    const appContext = useApplicationContext();

    const [saleAndProductionProgramForChildrenBike, setSaleAndProductionProgramForChildrenBike] = useState<SaleAndProductionProgram | undefined>(undefined);
    const [saleAndProductionProgramForWomenBike, setSaleAndProductionProgramForWomenBike] = useState<SaleAndProductionProgram | undefined>(undefined);
    const [saleAndProductionProgramForMenBike, setSaleAndProductionProgramForMenBike] = useState<SaleAndProductionProgram | undefined>(undefined);

    const { setFetcher, isLoading, error } = useSubmitForm();

    useEffect(() => {
        (async () => {
                const saleAndProductionProgram = await appContext.getAllSaleAndProductionProgram();
                const saleAndProductionForChildrenBike = saleAndProductionProgram.find((s) => s.article === GOOD_TO_PRODUCE.CHILDREN_BIKE);
                const saleAndProductionForWomenBike = saleAndProductionProgram.find((s) => s.article === GOOD_TO_PRODUCE.WOMEN_BIKE);
                const saleAndProductionForMenBike = saleAndProductionProgram.find((s) => s.article === GOOD_TO_PRODUCE.MEN_BIKE);

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

    const fieldListChildrenBike: InputField[] = !saleAndProductionProgramForChildrenBike ? [] : [
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
    const fieldListWomenBike: InputField[] = !saleAndProductionProgramForWomenBike ? [] : [
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
    const fieldListMenBike: InputField[] = !saleAndProductionProgramForMenBike ? [] : [
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

    const isFormChildrenBikeValid = fieldListChildrenBike.every(field => field.error);
    const isFormWomenBikeValid = fieldListWomenBike.every(field => field.error);
    const isFormMenBikeValid = fieldListMenBike.every(field => field.error);

    const handleSave = async () => {
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
            onSubmit && onSubmit();
        });
    };

    if (!saleAndProductionProgramForChildrenBike ||
        !saleAndProductionProgramForWomenBike ||
        !saleAndProductionProgramForMenBike) return <div>Wird geladen...</div>

    return (
        <PageSectionComponent
            title="Vertriebswunsch"
            subtitle="Geben Sie den Vertriebswunsch bei allen Produkten ein"
            endDecorator={<IconButton variant={"outlined"}><MoreHorizIcon /></IconButton>}
        >
            <Stack spacing={"var(--gap-3)"}>
                <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                    <Stack spacing={"var(--gap-2)"}>
                        <Typography level={"h4"}>Kinderfahrrad({GOOD_TO_PRODUCE.CHILDREN_BIKE})</Typography>
                        {fieldListChildrenBike.map((field, index) =>
                            <CustomStandardInputComponent {...field} key={index} />
                        )}
                    </Stack>
                </Card>
                <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                    <Stack spacing={"var(--gap-2)"}>
                        <Typography level={"h4"}>Damenfahrrad({GOOD_TO_PRODUCE.WOMEN_BIKE})</Typography>
                        {fieldListWomenBike.map((field, index) =>
                            <CustomStandardInputComponent {...field} key={index} />
                        )}
                    </Stack>
                </Card>
                <Card sx={{ px: "var(--gap-3)", py: "var(--gap-4)" }}>
                    <Stack spacing={"var(--gap-2)"}>
                        <Typography level={"h4"}>Herrenfahrrad({GOOD_TO_PRODUCE.MEN_BIKE})</Typography>
                        {fieldListMenBike.map((field, index) =>
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
                <Button
                    onClick={handleSave}
                    disabled={isFormChildrenBikeValid && isFormWomenBikeValid && isFormMenBikeValid || isLoading}
                    startDecorator={isLoading ? <CircularProgress size={"sm"} /> : null}
                >
                    {isLoading ? "Ihr Vertriebswunsch wird gespeichert..." : "Vertriebswunsch Speichern"}
                </Button>
            </Stack>
        </PageSectionComponent>
    );
};
