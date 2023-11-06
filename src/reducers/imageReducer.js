export const initialImageState = {
    images: [],
    imageloading: true,
    searchTerm: '',
};

export const SET_IMAGE_LOADING = "SET_IMAGE_LOADING";
export const SET_IMAGES = "SET_IMAGES";

export const imageListReducer = (state, action) => {
    switch (action.type) {
        case SET_IMAGES:
            return { ...state, images: action.payload };
        case SET_IMAGE_LOADING:
            return { ...state, imageloading: action.payload };
        default:
            return state;
    }
};