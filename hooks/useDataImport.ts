import {useState, useCallback, useEffect} from "react";
import axios, {AxiosRequestConfig} from "axios";
// @ts-ignore
import {X2jOptions, XMLParser} from "fast-xml-parser";
import {axiosClient} from "@/api/http-client";

const importDataUrl = "/import";

type ParsedJson = { results: { inwardstockmovement: { order: any; }; futureinwardstockmovement: { order: any; }; waitingliststock: any[]; waitinglistworkstations: { workplace: any; }; ordersinwork: { workplace: any; }; completedorders: { order: any; }; }; }
const useDataImport = () => {
    const [outputData, setOutputData] = useState<any>(null);

    const isAlwaysArrayKeys = [
        "results.warehousestock.article",
        "results.inwardstockmovement.order",
        "results.inwardstockmovement.order.batch",
        "results.futureinwardstockmovement.order",
        "results.futureinwardstockmovement.order.batch",
        "results.idletimecosts.workplace",
        "results.idletimecosts.workplace.waitinglist",
        "results.waitinglistworkstations.workplace",
        "results.waitinglistworkstations.workplace.waitinglist",
        "results.waitingliststock",
        "results.waitingliststock.missingpart.workplace",
        "results.waitingliststock.missingpart.workplace.waitinglist",
        "results.ordersinwork.workplace",
        "results.completedorders.order",
        "results.completedorders.order.batch",
        "results.cycletimes.order",
        "results.cycletimes.order.batch"
    ];

    const fastXMLParserOptions: X2jOptions = {
        allowBooleanAttributes: false,
        alwaysCreateTextNode: false,
        attributeNamePrefix: "",
        ignoreAttributes: false,
        ignoreDeclaration: true,
        isArray: (_: any, jPath: string) => isAlwaysArrayKeys.indexOf(jPath) !== -1,
        parseAttributeValue: false,
        parseTagValue: false,
        preserveOrder: false
    };

    const parseXmlToJson = useCallback((xml: string | Buffer) => {
        const parser = new XMLParser(fastXMLParserOptions);
        return parser.parse(xml);
    }, []);

    const resolveJsonObjects = useCallback((parsedJson: ParsedJson) => {
        let inputJson = JSON.parse(JSON.stringify(parsedJson.results));

        inputJson.inwardstockmovement = parsedJson.results.inwardstockmovement.order;
        inputJson.futureinwardstockmovement = parsedJson.results.futureinwardstockmovement.order;

        inputJson.waitingliststock = parsedJson.results.waitingliststock
            .map(item => item.missingpart)
            .filter(item => item != null);

        inputJson.waitinglistworkstations = parsedJson.results.waitinglistworkstations.workplace;
        inputJson.ordersinwork = parsedJson.results.ordersinwork.workplace;
        inputJson.completedorders = parsedJson.results.completedorders.order;

        return inputJson;
    }, []);

    const importXmlDataToServer = useCallback(async (xml: any) => {
        try {
            let parsedJSON = parseXmlToJson(xml);
            let outputJsonData = resolveJsonObjects(parsedJSON);
            const requestOptions: AxiosRequestConfig = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            console.log("outputJsonData: ", outputJsonData);
            await axiosClient.post(importDataUrl, outputJsonData, requestOptions);
            const computedOutput = {
                ...outputJsonData,
                warehousestock: {
                    ...outputJsonData.warehousestock,
                    article: outputJsonData.warehousestock.article.map((a: any) => ({...a, number: a.id }))
                },
                inwardstockmovement: outputJsonData.inwardstockmovement ?? null
            };
            return computedOutput;
        } catch (error) {
            console.error(error);
        }
    }, []);

    return {
        importXmlDataToServer,
    };
};

export default useDataImport;