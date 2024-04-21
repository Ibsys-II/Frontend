import {useEffect, useState} from "react";

type FetcherType<T> = () => Promise<T | undefined>;

type Output = {
    setFetcher: <T>(fetcher: FetcherType<T>) => Promise<T | undefined>;
    isLoading: boolean;
    error: Error | undefined;
}
const useSubmitForm = (): Output => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        console.log("error: ", error);
        console.log("isLoading: ", isLoading);
    }, [error, isLoading]);
    const setFetcher = async <T>(fetcher: FetcherType<T>) => {
        setIsLoading(true);
        setError(undefined);
        try {
            const result = await fetcher();
            setIsLoading(false);
            return result;
        } catch (error) {
            setError(error as Error);
            setIsLoading(false);
        }
    };

    return {
        setFetcher,
        isLoading,
        error,
    };
};

export default useSubmitForm;