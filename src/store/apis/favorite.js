import instance from ".";

export const getFavoriteByUser = async (id) => {
  const response = await instance.get(`/favorites/user/${id}`);
  return response.data; 
}

export const getFavoritesEstablishment = async (id) => {
  const response = await instance.get(`/favorites/establishment/${id}`);
  return response.data;
}

export const addFavorite = async (payload) => {
  const response = await instance.post("/favorites", payload);
  return response.data;
}

export const removeFavorite = async (id) => {
  const response = await instance.delete(`/favorites/${id}`);
  return response.data;
}

export const getMyFavorites = async (id) => {
  const response = await instance.get(`/favorites/myfavorites/${id}`);
  return response.data;
}

