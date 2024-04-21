import React from "react";
import {IconButton} from "@mui/joy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";

type Props = {
    onSubmit: () => void;
};

export const BillOfMaterialFormComponent: React.FC<Props> = (props) => {
    const { onSubmit } = props;

    return (
        <PageSectionComponent
            title="Stücklistenauflösung"
            subtitle="Geben Sie die Bestellungen ein"
            endDecorator={<IconButton variant={"outlined"}><MoreHorizIcon /></IconButton>}
        >
            TODO: Formular hier einfügen...
        </PageSectionComponent>
    );
};

