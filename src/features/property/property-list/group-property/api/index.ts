import { API } from "@/shared/lib/plugins/axios";

export const getGroupProperties = (data={}) => {
    return API({
        method: "POST",
        url: "/Marketplace/GetMarketplacePropertyGroupPagedList",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
};

export const createGroupProperties = (data: object) => {
    return API({
        method: "POST",
        url: "/Marketplace/CreateMarketplacePropertyGroupList",
        data: data,
    }).then((response) => response.data.result).catch((err) => Promise.reject(err));
};

export const updateGroupProperties = (data: object) => {
    return API({
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