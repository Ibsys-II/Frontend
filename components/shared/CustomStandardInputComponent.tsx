import React from "react";
import { InputField } from "@/contexts/ApplicationContext";
import FormLabel from "@mui/joy/FormLabel";
import { FormHelperText, Input, Stack, Typography } from "@mui/joy";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControl from "@mui/joy/FormControl";

type Props = InputField
export const CustomStandardInputComponent: React.FC<Props> = (props) => {
    const { label, ...rest } = props;
    return (
        <FormControl key={props.name} error={props.error}>
            <FormLabel
                sx={{
                    color: props.error ? "var(--color-error)" : "unset",
                }}
            >
                {label}
            </FormLabel>
            <Input
                {...rest}
                placeholder=""
                size="lg"
                variant={props.disabled ? "solid" : "outlined"}
                endDecorator={
                    props.disabled ? (
                        <Stack
                            direction="row"
                            spacing="var(--gap-1)"
                            alignItems="center"
                            alignContent="center"
                        >
                            <Typography level="body-sm">
                                Nicht änderbar
                            </Typography>
                            <DoNotDisturbAltIcon color="error" />
                        </Stack>
                    ) : null
                }
            />
            {props.error ? (
                <FormHelperText>
                    <InfoOutlinedIcon fontSize="small" />
                    Dieser Wert ist ungültig
                </FormHelperText>
            ) : null}
        </FormControl>
    );
};
