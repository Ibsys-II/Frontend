"use client";
import React from "react";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Chip from "@mui/joy/Chip";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

type Props = {};

export const SimulationStepsComponent: React.FC<Props> = (props) => {
    return (
        <Stack spacing={"var(--gap-3)"}>
            <Typography level={"title-lg"}>Workflow</Typography>
            <Stepper orientation="vertical" sx={{ maxWidth: "300px" }}>
                <Step
                    indicator={
                        <StepIndicator variant="solid" color="primary">
                            1
                        </StepIndicator>
                    }
                >
                    <Typography>Vertriebswunsch</Typography>

                    <Stack spacing={1}>
                        <Typography level="body-sm">
                            Wenn in der Vorperiode nicht die volle Liefertreue erreicht wurde, so wird der reduzierte
                            Vertriebswunsch automatisch berechnet!
                        </Typography>
                        <ButtonGroup variant="plain" spacing={1}>
                            <Chip
                                color="primary"
                                variant="solid"
                                size={"lg"}
                                onClick={() => {
                                    // do something...
                                }}
                            >
                                Weiter
                            </Chip>
                            <Chip
                                color="neutral"
                                variant="outlined"
                                size={"lg"}
                                onClick={() => {
                                    // do something...
                                }}
                            >
                                Abbrechen
                            </Chip>
                        </ButtonGroup>
                    </Stack>
                </Step>
                <Step indicator={<StepIndicator>2</StepIndicator>}>
                    <div>
                        <Typography level="title-sm">Stücklisten auflösen</Typography>
                        <Typography level="body-xs">Ausstehend</Typography>
                    </div>
                </Step>
                <Step indicator={<StepIndicator>3</StepIndicator>}>
                    <div>
                        <Typography level="title-sm">Kapazitätsplanung</Typography>
                        <Typography level="body-xs">Ausstehend</Typography>
                    </div>
                </Step>
                <Step indicator={<StepIndicator>4</StepIndicator>}>
                    <div>
                        <Typography level="title-sm">Teileverwendungsnachweis</Typography>
                        <Typography level="body-xs">Ausstehend</Typography>
                    </div>
                </Step>
                <Step indicator={<StepIndicator>5</StepIndicator>}>
                    <div>
                        <Typography level="title-sm">Losgrößensplitting</Typography>
                        <Typography level="body-xs">Ausstehend</Typography>
                    </div>
                </Step>
                <Step indicator={<StepIndicator>6</StepIndicator>}>
                    <div>
                        <Typography level="title-sm">Reihenfolgeplanung</Typography>
                        <Typography level="body-xs">Ausstehend</Typography>
                    </div>
                </Step>
                <Step indicator={<StepIndicator>7</StepIndicator>}>
                    <div>
                        <Typography level="title-sm">Ergebnis</Typography>
                        <Typography level="body-xs">Ausstehend</Typography>
                    </div>
                </Step>
            </Stepper>
        </Stack>
    );
};

