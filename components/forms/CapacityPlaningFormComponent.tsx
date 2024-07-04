import React from "react";
import PropsSimulationForm from "@/components/forms/formProps";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {Box, Card, Divider, Typography, useTheme} from "@mui/joy";
import styled from "styled-components";
import {CapacityPlan} from "@/api/neu/capacityPlan";
import {CustomTableSimple} from "@/components/shared/CustomTableSimple";
import {CapacityPlanSumUp} from "@/api/neu/capacityPlanSumUp";

type Props = PropsSimulationForm;
export const CapacityPlaningFormComponent: React.FC<Props> = (props) => {
    const { onSubmit } = props;
    const appContext = useApplicationContext();
    const theme = useTheme();
    const {
        data: capacityPlanList,
        isLoading: isLoadingCapacityPlanList,
        error: errorCapacityPlanList,
    } = useSWR<CapacityPlan[]>("getAllCapacityPlan", appContext.getAllCapacityPlan);

    const {
        data: capacityPlanSumUpList,
        isLoading: isLoadingCapacityPlanSumUpList,
        error: errorCapacityPlanSumUpList,
    } = useSWR<CapacityPlanSumUp[]>("getAllCapacityPlanSumUp", appContext.getAllCapacityPlanSumUp);

    const headerCells = [
        <Typography key={1} level={"body-sm"}>Artikel</Typography>,
        <Typography key={2} level={"body-sm"}>Menge</Typography>,
        ...Array.from(Array(14).keys()).map((i) =>
            <Typography key={i + 2} level={"body-sm"}>{i}</Typography>
        )
    ];

    const sumRows = [
        <Box
            key={1}
            component={"tr"}
            sx={{
                "&:hover": {
                    backgroundColor: theme.vars.palette.primary["500"],
                    "& *": {
                        color: "white"
                    }
                }
            }}
        >
            <Box component={"td"} fontWeight={600}>
                <Typography level={"body-sm"} fontWeight={600}>Kapazitätsbedarf</Typography>
            </Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 1)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 2)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 3)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 4)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 6)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 7)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 8)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 9)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 10)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 11)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 12)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 13)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 14)?.capacityRequirement}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 15)?.capacityRequirement}</Box>
        </Box>,
        <Box
            key={2}
            component={"tr"}
            sx={{
                "&:hover": {
                    backgroundColor: theme.vars.palette.primary["500"],
                    "& *": {
                        color: "white"
                    }
                }
            }}
        >
            <Box component={"td"} fontWeight={600}>
                <Typography level={"body-sm"} fontWeight={600}>Rüstzeit</Typography>
            </Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 1)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 2)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 3)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 4)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 6)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 7)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 8)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 9)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 10)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 11)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 12)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 13)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 14)?.setupTime}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 15)?.setupTime}</Box>
        </Box>,
        <Box
            key={3}
            component={"tr"}
            sx={{
                "&:hover": {
                    backgroundColor: theme.vars.palette.primary["500"],
                    "& *": {
                        color: "white"
                    }
                }
            }}
        >
            <Box component={"td"} fontWeight={600}>
                <Typography level={"body-sm"} fontWeight={600}>Kapazitätsbedarf (Rückstand Vorperiode)</Typography>
            </Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 1)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 2)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 3)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 4)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 6)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 7)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 8)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 9)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 10)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 11)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 12)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 13)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 14)?.capacityRequirementBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 15)?.capacityRequirementBacklogPrevPeriod}</Box>
        </Box>,
        <Box
            key={4}
            component={"tr"}
            sx={{
                "&:hover": {
                    backgroundColor: theme.vars.palette.primary["500"],
                    "& *": {
                        color: "white"
                    }
                }
            }}
        >
            <Box component={"td"} fontWeight={600}>
                <Typography level={"body-sm"} fontWeight={600}>Rüstzeit (Rückstand Vorperiode)</Typography>
            </Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 1)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 2)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 3)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 4)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 6)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 7)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 8)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 9)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 10)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 11)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 12)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 13)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 14)?.setupTimeBacklogPrevPeriod}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 15)?.setupTimeBacklogPrevPeriod}</Box>
        </Box>,
        <Box
            key={5}
            component={"tr"}
            sx={{
                "&:hover": {
                    backgroundColor: theme.vars.palette.primary["500"],
                    "& *": {
                        color: "white"
                    }
                }
            }}
        >
            <Box component={"td"} fontWeight={600}>
                <Typography level={"body-sm"} fontWeight={600}>Gesamt-Kapzitätsbedarf</Typography>
            </Box>

            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 1)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 2)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 3)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 4)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 6)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 7)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 8)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 9)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 10)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 11)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 12)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 13)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 14)?.totalCapacityRequirements}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 15)?.totalCapacityRequirements}</Box>
        </Box>,
        <Box
            key={6}
            component={"tr"}
            sx={{
                "&:hover": {
                    backgroundColor: theme.vars.palette.primary["500"],
                    "& *": {
                        color: "white"
                    }
                }
            }}
        >
            <Box component={"td"} fontWeight={600}>
                <Typography level={"body-sm"} fontWeight={600}>Überstunden (In Wochen)</Typography>
            </Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 1)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 2)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 3)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 4)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 6)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 7)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 8)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 9)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 10)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 11)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 12)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 13)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 14)?.overtimeWeek}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 15)?.overtimeWeek}</Box>
        </Box>,
        <Box
            key={7}
            component={"tr"}
            sx={{
                "&:hover": {
                    backgroundColor: theme.vars.palette.primary["500"],
                    "& *": {
                        color: "white"
                    }
                }
            }}
        >
            <Box component={"td"} fontWeight={600}>
                <Typography level={"body-sm"} fontWeight={600}>Überstunden (In Tagen)</Typography>
            </Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 1)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 2)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 3)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 4)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 6)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 7)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 8)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 9)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 10)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 11)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 12)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 13)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 14)?.overtimeDay}</Box>
            <Box component={"td"}>{capacityPlanSumUpList?.find(c => c.workPlaceNumber === 15)?.overtimeDay}</Box>
        </Box>,
    ];

    if (isLoadingCapacityPlanList ||
        isLoadingCapacityPlanSumUpList ||
        !capacityPlanList ||
        !capacityPlanSumUpList
    ) return <div>Wird geladen</div>

    if (errorCapacityPlanList) return <div>{`Fehler beim Laden: ${(errorCapacityPlanList as Error).toString()}`}</div>
    if (errorCapacityPlanSumUpList) return <div>{`Fehler beim Laden: ${(errorCapacityPlanSumUpList as Error).toString()}`}</div>

    return (
        <PageSectionComponent
            title="Kapazitätsplanung"
            subtitle="Planen Sie die Disposition Eigenfertigung"
        >
            <FormGroupContainer>
                <CustomTableSimple
                    firstColWidth={"170px"}
                    headerCells={headerCells}
                    rows={sortCapacityPlanList(capacityPlanList).map((c, index) => (
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
                            <Box component={"td"} fontWeight={600}>{c.article}</Box>
                            <Box component={"td"}>{c.quantity}</Box>
                            <Box component={"td"}>{c.workplace1}</Box>
                            <Box component={"td"}>{c.workplace2}</Box>
                            <Box component={"td"}>{c.workplace3}</Box>
                            <Box component={"td"}>{c.workplace4}</Box>
                            <Box component={"td"}>{c.workplace6}</Box>
                            <Box component={"td"}>{c.workplace7}</Box>
                            <Box component={"td"}>{c.workplace8}</Box>
                            <Box component={"td"}>{c.workplace9}</Box>
                            <Box component={"td"}>{c.workplace10}</Box>
                            <Box component={"td"}>{c.workplace11}</Box>
                            <Box component={"td"}>{c.workplace12}</Box>
                            <Box component={"td"}>{c.workplace13}</Box>
                            <Box component={"td"}>{c.workplace14}</Box>
                            <Box component={"td"}>{c.workplace15}</Box>
                        </Box>
                    ))}
                />
            </FormGroupContainer>
            <FormGroupContainer>
                <Box>
                    <Typography level={"title-md"} fontWeight={600}>Summen</Typography>
                </Box>
                <Divider />
                <CustomTableSimple
                    firstColWidth={"250px"}
                    headerCells={[
                        <Typography key={1} level={"body-sm"}></Typography>,
                        ...Array.from(Array(14).keys()).map((i) =>
                            <Typography key={i + 1} level={"body-sm"}>{i}</Typography>
                        )
                    ]}
                    rows={sumRows}
                />
            </FormGroupContainer>
        </PageSectionComponent>
    );
};

const sortCapacityPlanList = (capacityPlanList: CapacityPlan[]): CapacityPlan[] => {
    return [
        capacityPlanList.find((c) => c.articleNumber === 4)!,
        capacityPlanList.find((c) => c.articleNumber === 5)!,
        capacityPlanList.find((c) => c.articleNumber === 6)!,
        capacityPlanList.find((c) => c.articleNumber === 7)!,
        capacityPlanList.find((c) => c.articleNumber === 8)!,
        capacityPlanList.find((c) => c.articleNumber === 9)!,
        capacityPlanList.find((c) => c.articleNumber === 10)!,
        capacityPlanList.find((c) => c.articleNumber === 11)!,
        capacityPlanList.find((c) => c.articleNumber === 12)!,
        capacityPlanList.find((c) => c.articleNumber === 13)!,
        capacityPlanList.find((c) => c.articleNumber === 14)!,
        capacityPlanList.find((c) => c.articleNumber === 15)!,
        capacityPlanList.find((c) => c.articleNumber === 16)!,
        capacityPlanList.find((c) => c.articleNumber === 17)!,
        capacityPlanList.find((c) => c.articleNumber === 18)!,
        capacityPlanList.find((c) => c.articleNumber === 19)!,
        capacityPlanList.find((c) => c.articleNumber === 20)!,
        capacityPlanList.find((c) => c.articleNumber === 26)!,
        capacityPlanList.find((c) => c.articleNumber === 49)!,
        capacityPlanList.find((c) => c.articleNumber === 54)!,
        capacityPlanList.find((c) => c.articleNumber === 29)!,
        capacityPlanList.find((c) => c.articleNumber === 50)!,
        capacityPlanList.find((c) => c.articleNumber === 55)!,
        capacityPlanList.find((c) => c.articleNumber === 30)!,
        capacityPlanList.find((c) => c.articleNumber === 51)!,
        capacityPlanList.find((c) => c.articleNumber === 56)!,
        capacityPlanList.find((c) => c.articleNumber === 31)!,
        capacityPlanList.find((c) => c.articleNumber === 1)!,
        capacityPlanList.find((c) => c.articleNumber === 2)!,
        capacityPlanList.find((c) => c.articleNumber === 3)!,
    ];
};

const FormGroupContainer = styled(Card)`
    display: grid;
    grid-gap: var(--gap-2);
`;
