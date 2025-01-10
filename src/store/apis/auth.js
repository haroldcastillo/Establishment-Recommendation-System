import instance from ".";
export const login = async (payload) => {
    const response = await instance.post("/auth/login", payload);
    return response.data;
};
export const register = async (payload) => {
    const response = await instance.post("/auth/register", payload);
    return response.data;
};

export const logout = async () => {
    const response = await instance.get("/auth/logout");
    return response.data;
};

export const checkstatus = async () => {
    const response = await instance.get("/auth/status");
    return response.data;
};

export const verify = async (payload) => {
    const response = await instance.get(`/auth/verify/${payload}`);
    return response.data;
};

export const resend = async (payload) => {
    const response = await instance.post("/auth/forgot-password", payload);
    return response.data;
};

export const resetPassword = async (payload, id) => {
    const response = await instance.post(`/auth/reset-password/${id}`, payload);
    return response.data;
};
