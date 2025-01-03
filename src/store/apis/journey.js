import instance from ".";

export const getJourney = async (id) => {
    const response = await instance.get(`/journey/user/${id}`);
    return response.data;
};

export const createJourney = async (payload) => {
    const response = await instance.post("/journey", payload);
    return response;
};

export const updateJourney = async (payload) => {
    const response = await instance.patch(`/journey/${payload._id}`, payload);
    return response.data;
};

export const deleteJourney = async (id) => {
    const response = await instance.delete(`/journey/${id}`);
    return response.data;
};
