import instance from ".";
export const getUserLogin = async (id) => {
	try {
		const response = await instance.get(`/users/${id}`);
		return response.data;
	} catch (error) {
		throw error?.response?.data ?? error;
	}
};
