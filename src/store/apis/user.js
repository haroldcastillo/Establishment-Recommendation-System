import instance from ".";
export const getUserLogin = async (id) => {
    try {
        const response = await instance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data ?? error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await instance.get("/users");
        return response.data.data;
    } catch (error) {
        throw error?.response?.data ?? error;
    }
};
export const updatePreferences = async (payload) => {
    try {
        const response = await instance.patch(
            `/users/preferences/${payload.id}`,
            {
                preferences: payload.preferences,
            }
        );
        return response.data;
    } catch (error) {
        throw error?.response?.data ?? error;
    }
};

export const updateUser = async (payload) => {
    try {
        const response = await instance.patch(`/users/${payload.id}`, {
            ...payload,
        });
        return response.data.data;
    } catch (error) {
        throw error?.response?.data ?? error;
    }
};

export const updatePassword = async (payload) => {
    try {
        const response = await instance.patch(`/users/password/${payload.id}`, {
            password: payload.password,
            newPassword: payload.newPassword,
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data ?? error;
    }
};

export const addRecentViewed = async (payload) => {
    try {
        const response = await instance.post(`/users/lastview/${payload.id}`, {
            establishmentId: payload.establishmentId,
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data ?? error;
    }
};
