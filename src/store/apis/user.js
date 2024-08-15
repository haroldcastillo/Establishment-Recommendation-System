import instance from ".";
export const getUserLogin = async (id) => {
	try {
		const response = await instance.get(`/users/${id}`);
		return response.data;
	} catch (error) {
		throw error?.response?.data ?? error;
	}
};

export const updatePreferences = async (payload) => {
  try {
    const response = await instance.patch(`/users/preferences/${payload.id}`, {
      preferences: payload.preferences,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data ?? error;
  }
}