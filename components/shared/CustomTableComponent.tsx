"use client";
import React from 'react';
import {Box, Card, Table, useTheme} from "@mui/joy";

type Props<T extends Record<string, unknown>> = {
    headers: string[];
    rows: Partial<T>[]
};

export const CustomTableComponent = <T extends Record<string, unknown>,>(props: Props<T>) => {
    const { headers, rows } = props;
    const theme = useTheme();

    return (
        <Card sx={{ px: 0, pb: 1 }}>
            <Table variant="plain" size={"lg"}>
                <Box component={"thead"}>
                    <Box component={"tr"}>
                        {headers.map((h, index) =>
                            <Box key={index} component={"th"}>{h}</Box>
                        )}
                    </Box>
                </Box>
                <Box component={"tbody"}>
                    {rows.map((row, index) => (
                        <Box
                            key={index}
                            component={"tr"}
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.vars.palette.neutral.outlinedHoverBg,
                                }
                            }}
                        >
                            {Object.values(row).map((value, index) =>
                                <Box key={index} component={"td"}>{value as string}</Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </Table>
        </Card>
    );
};
