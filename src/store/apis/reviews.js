import instance from ".";

export const createReview = async (payload) => {
    const response = await instance.post("/reviews", payload);
    return response.data;
};

export const updateReview = async (id, payload) => {
    const response = await instance.patch(
        `/reviews/updateRating/${id}`,
        payload
    );
    return response.data;
};

export const getReviewsByEstablishment = async (id) => {
    const response = await instance.get(`/reviews/establishment/${id}`);
    return response.data;
};

export const getTotalReviewsByEstablishment = async (id) => {
    const response = await instance.get(`/reviews/totalReviews/${id}`);
    return response.data;
};

export const deleteReview = async (id) => {
    const response = await instance.delete(`/reviews/${id}`);
    return response.data;
};
