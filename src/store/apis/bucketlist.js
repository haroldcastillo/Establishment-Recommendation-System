import instance from ".";

export const addBucketList = async (payload) => {
    const response = await instance.post("/bucketlist", payload);
    return response.data;
};

export const getBucketList = async (type) => {
    const response = await instance.get(`/bucketlist/establishment/${type}`);
    return response.data;
};

export const checkEstablishmentBucketList = async (id, type) => {
    const response = await instance.get(`/bucketlist/check/${id}/${type}`);
    return response.data;
};

export const deleteBucketList = async (id) => {
    const response = await instance.delete(`/bucketlist/${id}`);
    return response.data;
};
