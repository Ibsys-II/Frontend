"use client";
import React from "react";
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {OverviewCardComponent} from "@/components/shared/OverviewCardComponent";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {Box, Card, Typography} from "@mui/joy";
import {useRouter} from "next/navigation";

type Tipp = {
    title: string,
    description: string,
    onClick?: () => void,
};
const Home: React.FC = () => {
    const router = useRouter();

    const tipps: Tipp[] = [
        {
            title: "Importieren Sie erst Daten aus der XML-Datei",
            description: "Laden Sie Ihre XML-Daten ein, um sie zu importieren.",
            onClick: () => router.push("/upload-from-xml-file"),
        },
        {
            title: "Simulieren Sie Ihre Prozesse",
            description: "Erstellen Sie Kapazitätsplanungen und legen Sie los !!!.",
            onClick: () => router.push("/simulation"),
        },
        {
            title: "Ausgabe",
            description: "Kontrolieren Sie die Ausgabe",
        }
    ];

    return (
        <PageWrapperComponent>
            <SectionListComponent>
                <OverviewCardComponent />
                <PageSectionComponent
                    title={"Wie funktioniert das Tool ?"}
                    subtitle={"So geht das!"}
                >
                    <Box
                        component="div"
                        sx={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${tipps.length}, 1fr)`,
                            gap: "var(--gap-3)",
                        }}
                    >
                        {tipps.map((tipp, index) =>
                            <Card
                                key={index}
                                sx={{
                                    display: "grid",
                                    justifyContent: "center",
                                    justifyItems: "center",
                                    alignItem: "center",
                                    alignContent: "center",
                                    textAlign: "center",
                                    minHeight: "350px",
                                    padding: "30px",
                                    "&:hover": {
                                        border: theme => `3px solid ${theme.vars.palette.primary["500"]}`,
                                        cursor: tipp.onClick ? "pointer" : "unset",
                                    },
                                }}
                                onClick={tipp.onClick}
                            >
                                <Typography level={"h1"} sx={{ mb: 1 }}>{index + 1}</Typography>
                                <Box>
                                    <Typography level={"h4"}>{tipp.title}</Typography>
                                    <Typography level={"body-lg"}>{tipp.description}</Typography>
                                </Box>
                            </Card>
                        )}
                    </Box>
                </PageSectionComponent>
            </SectionListComponent>
        </PageWrapperComponent>
    );
}

export default Home;
