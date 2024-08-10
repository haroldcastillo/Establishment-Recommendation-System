import instance from ".";
export const getUserList = async () => {
	try {
		const response = await instance.get("/users");
		return response.data;
	} catch (error) {
		throw error?.response?.data ?? error;
	}
};
export const createUser = async (payload) => {
  const response = await instance.post("/users", payload);
  return response.data;
};

export const updateUser = async (payload) => {
  const response = await instance.patch(`/users/${payload.id}`, payload);
  return response.data;
};
export const deleteUser = async (payload) => {
  const response = await instance.delete(`/users/${payload.id}`);
  return response.data;
}


