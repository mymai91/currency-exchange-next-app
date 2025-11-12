import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosClient } from "./axios";

export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.get<T>(url, config);
    },

    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.post<T>(url, data, config);
    },

    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.put<T>(url, data, config);
    },

    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.patch<T>(url, data, config);
    },

    delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.delete<T>(url, config);
    },
}