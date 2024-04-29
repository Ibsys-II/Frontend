"use client";
import React, {useMemo} from 'react';
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {PropertiesToString} from "@/contexts/ApplicationContext";
import {WarehouseStock} from "@/api/warehousestock";
import {CustomTableComponent} from "@/components/shared/CustomTableComponent";
import {Stack, Typography} from "@mui/joy";
import {Article} from "@/api/article";
import {StatsCardComponent} from "@/components/shared/StatsCardComponent";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";

type DataToShow = PropertiesToString<
    Partial<WarehouseStock> & {
    startAmount: number;
}>
const WarehousePage: React.FC = () => {
    const appContext = useApplicationContext();
    const period = appContext.period;

    const {
        data: warehouseStocks,
        isLoading: isLoadingWarehouseStocks,
        error: errorWarehouseStocks,
    } = useSWR<WarehouseStock[]>(`getWarehouseStocksByPeriod-${period}`, async () => await appContext.getWarehouseStocksByPeriod(period));

    const {
        data: articles,
        isLoading: isLoadingArticles,
        error: errorArticles,
    } = useSWR<Article[]>("getAllArticles", appContext.getArticles);

    const dataToShow: DataToShow[] = useMemo(() => {
        if (!warehouseStocks || !articles) return [];
        return warehouseStocks.map((w) => ({
            articleId: `${w.articleId}`,
            amount: `${w.amount}`,
            startAmount: `${articles.find((a) => a.id === w.articleId)!.startAmount}`,
            pct: `${w.pct.toFixed(2)} %`,
            price: `${w.price.toFixed(2)} €`,
            stockValue: `${w.stockValue.toFixed(2)}`,
        }));

    }, [warehouseStocks, articles]);

    const remainingArticlesInWareHouse: string = useMemo(() => {
        if (!warehouseStocks) return "0";
        return `# ${warehouseStocks.filter((w) => w.amount !== 0).length}`;
    }, [warehouseStocks]);

    const exhaustedArticlesInWareHouse: number = useMemo(() => {
        if (!warehouseStocks) return 0;
        return warehouseStocks.filter((w) => w.amount === 0).length;
    }, [warehouseStocks]);

    const articleWithHighestStockValue: string = useMemo(() => {
        if (!warehouseStocks) return "0";
        const result = warehouseStocks.reduce((acc: { article: number, value: number }, curr) =>
            curr.stockValue > acc.value ? {article: curr.articleId, value: curr.stockValue} : acc
            , { article: 0, value: 0 }
        );
        return `# ${result.article} ( ${result.value} € )`;
    }, [warehouseStocks]);

    const sumOfStockValue: string = useMemo(() => {
        if (!warehouseStocks) return "0";
        return warehouseStocks
            .reduce((acc, curr) => acc + curr.stockValue, 0)
            .toFixed(2)
            .concat(" €");
    }, [warehouseStocks]);


    if (isLoadingWarehouseStocks || isLoadingArticles || !warehouseStocks || !articles) return <div>Wird geladen</div>;

    if (errorWarehouseStocks) return <div>{`Fehler beim Laden: ${(errorWarehouseStocks as Error).toString()}`}</div>;

    if (errorArticles) return <div>{`Fehler beim Laden: ${(errorArticles as Error).toString()}`}</div>;

    return (
        <PageWrapperComponent title={"Lagerbestand"} showPeriod>
            {warehouseStocks.length > 0 ?
                <SectionListComponent>
                    <Stack direction={"row"} spacing={"var(--gap-3)"} justifyItems={"flex-start"} justifyContent={"flex-start"}>
                        <StatsCardComponent label={"Verbleibende Artikel im Lager"} value={remainingArticlesInWareHouse} />
                        <StatsCardComponent label={"Verbrauchte Artikel im Lager"} value={exhaustedArticlesInWareHouse} />
                        <StatsCardComponent label={"Artikel mit dem teuersten Lagerwert"} value={articleWithHighestStockValue} />
                        <StatsCardComponent label={"Summe Lagerwert"} value={sumOfStockValue} />
                    </Stack>
                    <CustomTableComponent
                        headers={["Artikel", "Menge (M)", "Startmenge (SM)", "Menge in % (M/SM)", "Preis/Einheit in €", "Lagerwert"]}
                        rows={dataToShow}
                    />
                </SectionListComponent> :
                <Typography>Es sind noch keine Daten vorhanden</Typography>
            }
        </PageWrapperComponent>
    );
};

export default WarehousePage;

