import React, {PropsWithChildren} from 'react';
import {Card, Divider, Sheet, Stack, Typography} from "@mui/joy";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type Props = PropsWithChildren;

export const InfoCardComponent: React.FC<Props> = (props) => {
    const { children } = props;

    return (
        <Card>
            <Stack direction="row" spacing="var(--gap-1)">
                <InfoOutlinedIcon />
                <Typography level="title-md">Information</Typography>
            </Stack>
            <Divider />
            <Sheet
                variant="soft"
                color="warning"
                sx={{ borderRadius: "sm", p: "var(--gap-1)" }}
            >
                <Typography level="body-sm">
                    Beachten Sie folgende Hinweise!
                </Typography>
            </Sheet>
            <Stack spacing="var(--gap-2)">
                {children}
            </Stack>
        </Card>
    );
};

