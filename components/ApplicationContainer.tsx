import React, {PropsWithChildren} from 'react';
import ThemeRegistry from "@/app/themeRegistry";
import {LayoutComponent} from "@/components/LayoutComponent";

type Props = PropsWithChildren;
export const ApplicationContainer: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <ThemeRegistry options={{ key: "joy" }}>
            <LayoutComponent>{children}</LayoutComponent>
        </ThemeRegistry>
    );
};

