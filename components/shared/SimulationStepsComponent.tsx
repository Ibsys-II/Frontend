"use client";
import React from "react";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Chip from "@mui/joy/Chip";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import {SimulationStep} from "@/contexts/ApplicationContext";
import {Divider} from "@mui/joy";

type Props = {
    steps: SimulationStep[];
    activeStep?: SimulationStep | undefined;
};

export const SimulationStepsComponent: React.FC<Props> = (props) => {
    const { steps, activeStep } = props;

    const isStepActive = (step: SimulationStep): boolean => {
        return step.title === activeStep?.title;
    }

    return (
        <>
            <Stack sx={{ px: "var(--gap-2)" }}>
                <Typography level="title-md">Workflow</Typography>
            </Stack>
            <Divider />
            <Stepper orientation="vertical" sx={{ maxWidth: "350px", px: "var(--gap-2)" }}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        indicator={
                            <StepIndicator
                                variant={isStepActive(step) ? "solid" : undefined}
                                color={isStepActive(step) ? "primary" : undefined}
                            >
                                {index + 1}
                            </StepIndicator>
                        }
                    >
                        {isStepActive(step) ?
                            <>
                                <Typography>{step.title}</Typography>
                                <Stack spacing={1}>
                                    <Typography level="body-sm">{step.description}</Typography>
                                    <ButtonGroup variant="plain" spacing={1}>
                                        {step.onNext ?
                                            <Chip
                                                color="primary"
                                                variant="solid"
                                                size={"lg"}
                                                onClick={step.onNext}
                                            >
                                                Weiter
                                            </Chip> : null
                                        }
                                        {step.onPrevious ?
                                            <Chip
                                                color="neutral"
                                                variant="outlined"
                                                size={"lg"}
                                                onClick={step.onPrevious}
                                            >
                                                Zurück
                                            </Chip> : null
                                        }
                                    </ButtonGroup>
                                </Stack>
                            </>
                            :
                            <div>
                                <Typography level="title-sm">{step.title}</Typography>
                                <Typography level="body-xs">Ausstehend</Typography>
                            </div>
                        }
                    </Step>
                )}
            </Stepper>
        </>
    );
};

