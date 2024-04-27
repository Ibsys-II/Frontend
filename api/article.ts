import {axiosClient} from "@/api/http-client";

export type Article = {
    id: number,
    amount: number,
    number: string,
    description: string,
    usedFor: string,
    pct: number,
    price: number,
    startAmount: number,
    stockValue: number,
};

export type ArticleDto = Omit<Article, "id">;

export const getArticlesApi = async (): Promise<Article[]> => {
    const response = await axiosClient.get<Article[]>("/articles");
    return response.data;
};

export const getArticlesByNumberApi = async (numbers: Set<string>): Promise<Article[]> => {
    const endpoint = Array.from(numbers)
        .reduce((acc, curr) => `${acc},${curr}`, "/articles?numbers=");
    const response = await axiosClient.get<Article[]>(endpoint);
    return response.data;
}