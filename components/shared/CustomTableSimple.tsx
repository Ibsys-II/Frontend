import React, {ReactNode} from 'react';
import {Box, Table} from "@mui/joy";

type Props = {
    headerCellsMainRow: ReactNode[];
    headerCellsOtherRows?: ReactNode;
    rows: ReactNode;
    firstColWidth?: string;
};

export const CustomTableSimple: React.FC<Props> = (props) => {
    const { headerCellsMainRow, headerCellsOtherRows, rows, firstColWidth } = props;

    return (
        <Table variant="plain" borderAxis="both" size="lg">
            <Box component={"thead"}>
                {headerCellsOtherRows}
                <Box component={"tr"}>
                    {headerCellsMainRow.map((h, index) =>
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
