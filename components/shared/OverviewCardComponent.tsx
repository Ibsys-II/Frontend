"use client";
import React from "react";
import {Box, Button, Sheet, Typography} from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {useRouter} from "next/navigation";

export const OverviewCardComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();
    const router = useRouter();

    return (
        <Sheet
            variant="solid"
            color="primary"
            invertedColors
            sx={{
                flexGrow: 1,
                display: "flex",
                bgcolor: "#042449",
                p: { xs: "36px", md: "70px" },
                pt: { xs: "24px", md: "60px" },
                borderRadius: "lg",
                overflow: "hidden",
                "& button": { borderRadius: "md" },
            }}
        >
            <Box sx={{ zIndex: 1, position: "relative" }}>
                <Typography level="h2" sx={{ maxWidth: isSmall ? "unset" : "700px" }}>
                    Entdecken Sie eine neue Dimension der Simulation Ihrer Produktionsprozesse
                </Typography>
                <Typography sx={{ mt: 0.5, mb: 2 }}>
                    Die einzige Lösung, um Ihre Produktion zu verbessern.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        maxWidth: "max-content",
                        "& > *": { flexGrow: 1, fontWeight: "lg" },
                    }}
                >
                    <Button
                        sx={{ minWidth: 120 }}
                        onClick={() => router.push("/upload-from-xml-file")}
                    >
                        Zum Datenimport
                    </Button>
                    <Button
                        variant="plain"
                        endDecorator={<ArrowForwardIcon fontSize="small" />}
                        sx={{
                            "&:hover": { "--Button-gap": "0.625rem" },
                            "& span": { transition: "0.15s" },
                        }}
                        onClick={() => {}}
                    >
                        Mehr erfahren
                    </Button>
                </Box>
            </Box>
            <Box
                component="img"
                alt="banner-partial-background"
                src={`${process.env.NEXT_PUBLIC_BASE_PATH!}/banner-partial-background.png`}
                sx={{ position: "absolute", height: "100%", top: 0, right: 0 }}
            />
            {isSmall ? null : (
                <Typography
                    sx={{
                        position: "absolute",
                        bottom: "1.5rem",
                        right: "2rem",
                        borderRadius: "50%",
                    }}
                >
                    {process.env.NEXT_PUBLIC_APPLICATION_NAME!}
                </Typography>
            )}
        </Sheet>
    );
};