import React, {ReactNode} from 'react';
import {Box, Table} from "@mui/joy";

type Props = {
    headerCells: ReactNode[]
    rows: ReactNode
    firstColWidth?: string;
};

export const CustomTableSimple: React.FC<Props> = (props) => {
    const { headerCells, rows, firstColWidth } = props;

    return (
        <Table variant="plain" borderAxis="both" size="lg">
            <Box component={"thead"}>
                <Box component={"tr"}>
                    {headerCells.map((h, index) =>
                        <Box
                            key={index}
                            component={"th"}
                            width={index === 0 ? firstColWidth ? firstColWidth : "70px" : "unset"}
                            //scope="row"
                        >
                            {h}
                        </Box>
                    )}
                </Box>
            </Box>
            <Box component={"tbody"}>
                {rows}
            </Box>
        </Table>
    );
};
