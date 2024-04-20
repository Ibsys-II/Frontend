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
        <Stepper orientation="vertical" sx={{ maxWidth: "300px" }}>
            <Step
                indicator={
                    <StepIndicator variant="solid" color="primary">
                        1
                    </StepIndicator>
                }
            >
                <Typography>Produktionsplanung</Typography>

                <Stack spacing={1}>
                    <Typography level="body-sm">
                        Ron Swanson
                        14 Lakeshore Drive
                        Pawnee, IN 12345
                        United States
                        T: 555-555-5555
                    </Typography>
                    <ButtonGroup variant="plain" spacing={1}>
                        <Chip
                            color="primary"
                            variant="solid"
                            onClick={() => {
                                // do something...
                            }}
                        >
                            Next
                        </Chip>
                        <Chip
                            color="neutral"
                            variant="outlined"
                            onClick={() => {
                                // do something...
                            }}
                        >
                            Edit
                        </Chip>
                    </ButtonGroup>
                </Stack>
            </Step>
            <Step indicator={<StepIndicator>2</StepIndicator>}>
                <div>
                    <Typography level="title-sm">Stücklisten auflösen</Typography>
                    <Typography level="body-xs">Pending</Typography>
                </div>
            </Step>
            <Step indicator={<StepIndicator>3</StepIndicator>}>
                <div>
                    <Typography level="title-sm">Kapazitätsplanung</Typography>
                    <Typography level="body-xs">Pending</Typography>
                </div>
            </Step>
            <Step indicator={<StepIndicator>4</StepIndicator>}>
                <div>
                    <Typography level="title-sm">Teileverwendungsnachweis</Typography>
                    <Typography level="body-xs">Pending</Typography>
                </div>
            </Step>
            <Step indicator={<StepIndicator>5</StepIndicator>}>
                <div>
                    <Typography level="title-sm">Losgrößensplitting</Typography>
                    <Typography level="body-xs">Pending</Typography>
                </div>
            </Step>
            <Step indicator={<StepIndicator>6</StepIndicator>}>
                <div>
                    <Typography level="title-sm">Reihenfolgeplanung</Typography>
                    <Typography level="body-xs">Pending</Typography>
                </div>
            </Step>
            <Step indicator={<StepIndicator>7</StepIndicator>}>
                <div>
                    <Typography level="title-sm">Ergebnis</Typography>
                    <Typography level="body-xs">Pending</Typography>
                </div>
            </Step>
        </Stepper>
    );
};

