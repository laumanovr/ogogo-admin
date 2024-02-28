import axios from "axios";

export const getGroupProperties = (data={}) => {
    return axios({
        method: "POST",
        url: "/Marketplace/GetMarketplacePropertyGroupPagedList",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
};

export const createGroupProperties = (data: object) => {
    return axios({
        method: "POST",
        url: "/Marketplace/CreateMarketplacePropertyGroupList",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
};

export const updateGroupProperties = (data: object) => {
    return axios({
        method: "PUT",
        url: "/Marketplace/UpdateMarketplacePropertyGroupList",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
}

export default {
    createGroupProperties,
    getGroupProperties,
    updateGroupProperties
}