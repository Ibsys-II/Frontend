import * as React from 'react';
import {ReactNode} from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

type Props = {
    label: ReactNode;
    value: ReactNode;
}
export const StatsCardComponent: React.FC<Props> = (props: Props) => {
    const { label, value } = props;

    return (
        <Card sx={{ minWidth: "300px", maxWidth: "300px" }}>
            <CardContent orientation="horizontal">
                <CardContent>
                    <Typography level="h4">{value}</Typography>
                    <Typography level="body-sm">{label}</Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
}