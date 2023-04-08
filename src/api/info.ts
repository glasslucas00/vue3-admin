import request from "@/utils/request";

export enum Api {
    GET_Metro = "/metro",
    POST_MEAS_TABLE = "/meas/search",
    POST_MEAS_CHART = "/meas/searchChart",
    POST_MEAS_FILTER = "/meas/searchFilter",
    POST_ABNORM_SEARCH = "/abnorm/search",
    POST_ABNORM_SEARCH_S1 = "/abnorm/searchByAnchor",
    POST_ABNORM_SEARCH_S2 = "/abnorm/searchStatistics",
    POST_ABNORM_SEARCH_XG = "/abnorm/searchXG",
    POST_ABNORM_DELETE_XG = "/abnorm/delXG"
}

export const getMetroName = (data?: any) => request.get(Api.GET_Metro, data);

// meas api
export const searchMeasTable = (data?: any) => request.post(Api.POST_MEAS_TABLE, data, { successMessage: true });

export const searchMeasChart = (data?: any) => request.post(Api.POST_MEAS_CHART, data, { successMessage: true });

export const searchMeasFilter = (data?: any) => request.post(Api.POST_MEAS_FILTER, data, { successMessage: true });

// abnorm api
export const searchAbnormTable = (data?: any) => request.post(Api.POST_ABNORM_SEARCH, data, { successMessage: true });

export const searchAbnormS1 = (data?: any) => request.post(Api.POST_ABNORM_SEARCH_S1, data, { successMessage: true });

export const searchAbnormS2 = (data?: any) => request.post(Api.POST_ABNORM_SEARCH_S2, data, { successMessage: true });

export const searchAbnormXG = (data?: any) => request.post(Api.POST_ABNORM_SEARCH_XG, data, { successMessage: true });

export const deleteAbnormXG = (data?: any) => request.post(Api.POST_ABNORM_DELETE_XG, data, { successMessage: true });

// export const putTestApi = (data?: any) => request.put(Api.PUT_TEST, data);

// export const deleteTestApi = (data?: any) => request.delete(Api.DELETE_TEST, data, { errorMessage: false });

// export const sameTestApi = (data?: any) => request.get(Api.SAME_TEST, data, { cancelSame: true });

// export const retryApi = (data?: any) => request.get(Api.RETRY_TEST, data, { isRetry: true });
