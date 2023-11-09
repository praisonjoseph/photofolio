export const initialImageState = {
    images: [],
    imageloading: true,
};

export const SET_IMAGE_LOADING = "SET_IMAGE_LOADING";
export const SET_IMAGES = "SET_IMAGES";
export const ADD_IMAGE = "ADD_IMAGE";
export const EDIT_IMAGE = "EDIT_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";

export const imageListReducer = (state, action) => {
    switch (action.type) {
        case SET_IMAGES:
            return { ...state, images: action.payload };
        case SET_IMAGE_LOADING:
            return { ...state, imageloading: action.payload };
        case ADD_IMAGE:
            return { ...state, images: [...state.images, action.payload] };
        case EDIT_IMAGE:
            return {
                ...state,
                images: state.images.map((image) =>
                    image.id === action.payload.id ? action.payload : image
                ),
            };
        case DELETE_IMAGE:
            return {
                ...state,
                images: state.images.filter((image) => image.id !== action.payload),
            };
        default:
            return state;
    }
};