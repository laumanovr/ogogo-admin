import axios from "axios";

export const getSubGroupProperties = (data={}) => {
    return axios({
        method: "POST",
        url: "/Marketplace/GetMarketplacePropertyGroupAutocomplete",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
};

export const getProperties = (data={}) => {
    return axios({
        method: "POST",
        url: "/Marketplace/GetMarketplacePropertyPagedList",
        data: data,
    }).then((response: any) => response.data.result).catch((err) => Promise.reject(err));
};

export const createProperties = (data={}) => {
    return axios({
        method: "POST",
        url: "/Marketplace/CreateMarketplacePropertyList",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
};

export const updateProperties = (data={}) => {
    return axios({
        method: "PUT",
        url: "/Marketplace/UpdateMarketplacePropertyList",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
};

