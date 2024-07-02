import {axiosClient} from "@/api/http-client";

const ENDPOINT = "db-config/clear-db";

/**
 * Löscht alle Daten aus der gesamten Datenbank.
 */
export const clearDbApi = async (): Promise<void> => {
    await axiosClient.get(ENDPOINT);
}