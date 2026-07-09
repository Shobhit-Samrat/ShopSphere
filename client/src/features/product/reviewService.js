import API from "../../services/api";

// ======================================
// Add Review
// ======================================

export const addReview = async (
    productId,
    reviewData
) => {

    const response = await API.post(
        `/products/${productId}/review`,
        reviewData
    );

    return response.data;

};

// ======================================
// Delete Review
// ======================================

export const deleteReview = async (
    productId,
    reviewId
) => {

    const response = await API.delete(
        `/products/${productId}/review/${reviewId}`
    );

    return response.data;

};