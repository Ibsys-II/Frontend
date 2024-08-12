import React from "react";
import PropsSimulationForm from "@/components/forms/formProps";
import useApplicationContext from "@/hooks/useApplicationContext";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {Box, Card, Divider, Stack, Typography, useTheme} from "@mui/joy";
import {CustomTableSimple} from "@/components/shared/CustomTableSimple";
import useSWR from "swr";
import {MaterialPlan} from "@/api/neu/materialPlan";
import {SaleAndProductionProgram} from "@/api/neu/saleAndProductionProgram";

const MaterialPlanningFormComponent: React.FC<PropsSimulationForm> = (props) => {
    const appContext = useApplicationContext();
    const theme = useTheme();

    const {
        data: materialPlanList,
        isLoading: isLoadingMaterialPlanList,
        error: errorMaterialPlanList,
    } = useSWR<MaterialPlan[]>("materialplan", appContext.getAllMaterialPlan);

    const {
        data: saleAndProductionProgramList,
        isLoading: isLoadingSaleAndProductionProgramList,
        error: errorSaleAndProductionProgramList,
    } = useSWR<SaleAndProductionProgram[]>(
        "getAllSaleAndProductionPrograms",
        appContext.getAllSaleAndProductionProgram
    );

    const headerCells = [
        <Typography key={1} level={"body-sm"}>Kaufteil</Typography>,
        <Typography key={2} level={"body-sm"}>Lieferfrist</Typography>,
        <Typography key={3} level={"body-sm"}>Abweichung</Typography>,
        <Typography key={4} level={"body-sm"} textAlign="center">
            <div>Verwendung</div>
            <div>P1</div>
        </Typography>,
        <Typography key={5} level={"body-sm"} textAlign="center">
            <div>Verwendung</div>
            <div>P2</div>
        </Typography>,
        <Typography key={6} level={"body-sm"} textAlign="center">
            <div>Verwendung</div>
            <div>P3</div>
        </Typography>,
        <Typography key={7} level={"body-sm"}>Diskontmenge</Typography>,
        <Typography key={8} level={"body-sm"}>
            <div>Anfangsbestand</div>
            <div>in Periode N</div>
        </Typography>,
        <Typography key={9} level={"body-sm"}>
            <div>Bruttobedarf</div>
            <div>g. PP. N</div>
        </Typography>,
        <Typography key={10} level={"body-sm"}>
            <div>Bruttobedarf</div>
            <div>g. PP. N+1</div>
        </Typography>,
        <Typography key={11} level={"body-sm"}>
            <div>Bruttobedarf</div>
            <div>g. PP. N+2</div>
        </Typography>,
        <Typography key={12} level={"body-sm"}>
            <div>Bruttobedarf</div>
            <div>g. PP. N+3</div>
        </Typography>,
        <Typography key={13} level={"body-sm"}>DVM</Typography>,
        <Typography key={13} level={"body-sm"}>Menge</Typography>,
        <Typography key={14} level={"body-sm"}>Bestellart</Typography>,
    ];

    const p1 = (saleAndProductionProgramList ?? []).find((s) => s.article === "P1");
    const p2 = (saleAndProductionProgramList ?? []).find((s) => s.article === "P2");
    const p3 = (saleAndProductionProgramList ?? []).find((s) => s.article === "P3");

    console.table(materialPlanList);

    if (isLoadingMaterialPlanList ||
        isLoadingSaleAndProductionProgramList ||
        !materialPlanList ||
        !saleAndProductionProgramList
    ) return <div>Wird geladen</div>;

    if (errorMaterialPlanList) return <div>{`Fehler beim Laden: ${(errorMaterialPlanList as Error).toString()}`}</div>;

    if (errorSaleAndProductionProgramList) return <div>{`Fehler beim Laden: ${(errorSaleAndProductionProgramList as Error).toString()}`}</div>;

    return (
        <PageSectionComponent
            title="Materialplanung"
            subtitle="Materialplanung für eingekaufte Produkte"
        >
            <Card>
                <Stack direction="row">
                    <Typography level={"title-md"} fontWeight={600} sx={{ flexGrow: 1 }}>
                        Produktionsprogramm
                    </Typography>
                </Stack>
                <Divider />
                <CustomTableSimple
                    firstColWidth={"250px"}
                    headerCellsMainRow={[
                        <Typography key={1} level={"body-sm"}>Periode</Typography>,
                        <Typography key={1} level={"body-sm"}>N</Typography>,
                        <Typography key={1} level={"body-sm"}>N+1</Typography>,
                        <Typography key={1} level={"body-sm"}>N+2</Typography>,
                        <Typography key={1} level={"body-sm"}>N+3</Typography>,
                    ]}
                    rows={saleAndProductionProgramList
                        .sort((a, b) => a.article.localeCompare(b.article))
                        .map((p, index) =>
                            <Box
                                key={index}
                                component={"tr"}
                                sx={{
                                    "&:hover": {
                                        //backgroundColor: theme.vars.palette.neutral.outlinedHoverBg,
                                        backgroundColor: theme.vars.palette.primary["500"],
                                        "& *": {
                                            color: "white"
                                        },
                                    }
                                }}
                            >
                                <Box component={"td"} fontWeight={600}>{p.article}</Box>
                                <Box component={"td"}>{p.pN}</Box>
                                <Box component={"td"}>{p.pNPlusOne}</Box>
                                <Box component={"td"}>{p.pNPlusTwo}</Box>
                                <Box component={"td"}>{p.pNPlusThree}</Box>
                            </Box>
                        )}
                />
            </Card>
            <Card>
                <Stack component="div" spacing="var(--gap-2)">
                    <CustomTableSimple
                        headerCellsMainRow={headerCells}
                        rows={materialPlanList
                            .sort((a, b) => a.articleNumber - b.articleNumber)
                            .map((m, index) => {
                                const average = (
                                    (m.usedInP1 * (p1?.pN ?? 0)) + (m.usedInP2 * (p2?.pN ?? 0)) + (m.usedInP3 * (p3?.pN ?? 0)) +
                                    (m.usedInP1 * (p1?.pNPlusOne ?? 0)) + (m.usedInP2 * (p2?.pNPlusOne ?? 0)) + (m.usedInP3 * (p3?.pNPlusOne ?? 0)) +
                                    (m.usedInP1 * (p1?.pNPlusTwo ?? 0)) + (m.usedInP2 * (p2?.pNPlusTwo ?? 0)) + (m.usedInP3 * (p3?.pNPlusTwo ?? 0)) +
                                    (m.usedInP1 * (p1?.pNPlusThree ?? 0)) + (m.usedInP2 * (p2?.pNPlusThree ?? 0)) + (m.usedInP3 * (p3?.pNPlusThree ?? 0))
                                ) / 4;

                                const resolveOrderType = (): string => {
                                    const warehouseAndAverageQuotient = m.initialStockInPeriodN / average;
                                    const reichweiteLieferzeitQuotient = warehouseAndAverageQuotient / m.deliveryTime
                                    if (reichweiteLieferzeitQuotient < 1) return "Eil";
                                    if (reichweiteLieferzeitQuotient >= 1) return "Normal";
                                    if (reichweiteLieferzeitQuotient >= m.deliveryTime) return "Keine Bestellung";
                                    return "";
                                }

                                    return (
                                        <Box
                                            key={index}
                                            component={"tr"}
                                            sx={{
                                                "&:hover": {
                                                    //backgroundColor: theme.vars.palette.neutral.outlinedHoverBg,
                                                    backgroundColor: theme.vars.palette.primary["500"],
                                                    "& *": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                        >
                                            <Box component={"td"} fontWeight={600}>{m.articleNumber}</Box>
                                            <Box component={"td"}>{m.deliveryTime}</Box>
                                            <Box component={"td"}>{m.deviation}</Box>
                                            <Box component={"td"}>{m.usedInP1}</Box>
                                            <Box component={"td"}>{m.usedInP2}</Box>
                                            <Box component={"td"}>{m.usedInP3}</Box>
                                            <Box component={"td"}>{m.discountQuantity}</Box>
                                            <Box component={"td"}>{m.initialStockInPeriodN}</Box>
                                            <Box component={"td"}>{(m.usedInP1 * (p1?.pN ?? 0)) + (m.usedInP2 * (p2?.pN ?? 0)) + (m.usedInP3 * (p3?.pN ?? 0))}</Box>
                                            <Box component={"td"}>{(m.usedInP1 * (p1?.pNPlusOne ?? 0)) + (m.usedInP2 * (p2?.pNPlusOne ?? 0)) + (m.usedInP3 * (p3?.pNPlusOne ?? 0))}</Box>
                                            <Box component={"td"}>{(m.usedInP1 * (p1?.pNPlusTwo ?? 0)) + (m.usedInP2 * (p2?.pNPlusTwo ?? 0)) + (m.usedInP3 * (p3?.pNPlusTwo ?? 0))}</Box>
                                            <Box component={"td"}>{(m.usedInP1 * (p1?.pNPlusThree ?? 0)) + (m.usedInP2 * (p2?.pNPlusThree ?? 0)) + (m.usedInP3 * (p3?.pNPlusThree ?? 0))}</Box>
                                            <Box component={"td"}>{average}</Box>
                                            <Box component={"td"}>{m.initialStockInPeriodN - average}</Box>
                                            <Box component={"td"}>{resolveOrderType()}</Box>
                                        </Box>
                                    )
                                }
                            )}
                    />
                </Stack>
            </Card>
        </PageSectionComponent>
    )
};

export default MaterialPlanningFormComponent;
