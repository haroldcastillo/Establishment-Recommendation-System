import instance from ".";
export const getEstablishments = async (payload) => {
    const response = await instance.post(
        "/establishments/recommendation",
        payload
    );
    return response.data;
};

export const getAllEstablishments = async () => {
    const response = await instance.get("/establishments");
    return response.data.data;
};

export const getEstablishment = async (id) => {
    const response = await instance.get(`/establishments/${id}`);
    return response.data;
};

export const createEstablishment = async (payload) => {
    const response = await instance.post("/establishments", payload);
    return response.data;
};

export const getEstablishmentByUser = async (id) => {
    const response = await instance.get(`/establishments/owner/${id}`);
    return response.data;
};

export const addViews = async (id) => {
    const response = await instance.get(`establishments/addView/${id}`);
    return response.data;
};

export const updateEstablishment = async (payload) => {
    const response = await instance.patch(
        `/establishments/${payload._id}`,
        payload
    );
    return response.data;
};

export const deleteEstablishment = async (id) => {
    const response = await instance.delete(`/establishments/${id}`);
    return response.data;
};

export const verifyEstablishment = async (id) => {
    const response = await instance.patch(`/establishments/verify/${id}`);
    return response.data;
};
