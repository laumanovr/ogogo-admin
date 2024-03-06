import axios from "axios";

export const getPropertyValues = (data = {}) => {
  return axios({
    method: "POST",
    url: "/Marketplace/GetMarketplacePropertyValuePagedList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const createPropertyValues = (data = {}) => {
  return axios({
    method: "POST",
    url: "/Marketplace/CreateMarketplacePropertyValueList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const updatePropertyValues = (data = {}) => {
  return axios({
    method: "PUT",
    url: "/Marketplace/UpdateMarketplacePropertyValueList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const getPropertyById = (id: any) => {
  return axios({
    method: "GET",
    url: `/Marketplace/GetMarketplaceProperty?id=${id}`,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};
