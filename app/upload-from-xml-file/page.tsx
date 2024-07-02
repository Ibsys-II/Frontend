"use client";
import React, {ChangeEvent, Ref, useEffect, useRef, useState} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {Button, Card, Divider, Stack, Typography} from "@mui/joy";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import xmlFormat from "xml-formatter";
import useDataImport from "@/hooks/useDataImport";
import {useRouter} from "next/navigation";

const SimulationFromXmlFilePage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>();
    const { importXmlDataToServer } = useDataImport();
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [fileContent, setFileContent] = useState<string | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.onload = handleFileRead;
        reader.readAsText(selectedFile, "utf-8");

        return () => {
            reader.abort();
        }
    }, [selectedFile]);

    useEffect(() => {
        if (!fileContent) return;
        importXmlDataToServer(fileContent);
    }, [fileContent]);

    const openFileDialog = () => {
        if (!inputRef.current) return;
        inputRef.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSelectedFile((event.target.files as unknown as File[])[0]);
    }

    const handleFileRead = (event: any) => {
        setFileContent(event.target.result);
    }

    return (
        <PageWrapperComponent title={"Aus XML-Datei simulieren"}>
            <Button onClick={openFileDialog}>
                Wähle eine Datei aus
                <input
                    ref={inputRef as Ref<HTMLInputElement>}
                    type="file"
                    hidden
                    multiple={false}
                    onChange={handleFileChange}
                />
            </Button>
            {selectedFile ?
                <Stack spacing={"var(--gap-2)"} sx={{ mt: "var(--gap-4)" }}>
                    <Typography>{`Dateinname: ${selectedFile.name}`}</Typography>
                    <Typography>{`Größe: ${(selectedFile.size / 1000).toFixed(2)} KB`}</Typography>
                </Stack> : null}

            {fileContent ?
                <Card sx={{ mt: "var(--gap-3)" }}>
                    <Stack
                        direction="row" spacing="var(--gap-3)"
                        justifyContent={"space-between"}
                        justifyItems={"space-between"}
                        alignItems={"center"}
                        alignContent={"center"}
                    >
                        <Stack direction="row" spacing="var(--gap-1)">
                            <InsertDriveFileOutlinedIcon />
                            <Typography level="title-md">Inhalt der Datei</Typography>
                        </Stack>
                        <Button onClick={() => router.push("/simulation")}>Jetzt simulieren</Button>
                    </Stack>
                    <Divider />
                    <Stack>
                        <pre>{xmlFormat(fileContent)}</pre>
                    </Stack>
                </Card> : null}
        </PageWrapperComponent>
    );
};

export default SimulationFromXmlFilePage;
