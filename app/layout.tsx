import type {Metadata} from "next";
import "./globals.css";
import "@fontsource/inter";
import React, {PropsWithChildren} from "react";
import {ApplicationContainer} from "@/components/ApplicationContainer";

export const metadata: Metadata = {
    title: "IBSYS 2 - SCS",
    description: "IBSYS 2 - Simulation Software",
    icons: "./favicon.ico",
};

type Props = Readonly<PropsWithChildren>;
const RootLayout: React.FC<Props> = (props: Props) => {
    const { children } = props;

    return (
        <html lang="de">
        <body>
        <ApplicationContainer>{children}</ApplicationContainer>
        </body>
        </html>
    );
}

export default RootLayout;
