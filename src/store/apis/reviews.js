import instance from ".";

export const createReview = async (payload) => {
    const response = await instance.post("/reviews", payload);
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
