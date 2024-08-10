import instance from ".";
export const getEstablishments = async (payload) => {
  const response = await instance.post("/establishments/recommendation", payload);
  return response.data;
}
