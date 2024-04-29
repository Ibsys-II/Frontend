import React from 'react';
import {Box, Card, Table} from "@mui/joy";

type Props<T extends Record<string, unknown>> = {
    headers: string[];
    rows: Partial<T>[]
};

export const CustomTableComponent = <T extends Record<string, unknown>,>(props: Props<T>) => {
    const { headers, rows } = props;

    return (
        <Card sx={{ px: 0 }}>
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
                        <Box key={index} component={"tr"}>
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
