export const initialImageState = {
    selectedImageIndex: 0,
    openAddImage: false,
};

export const SET_SELECTED_IMAGE_INDEX = "SET_SELECTED_IMAGE_INDEX";
export const SET_OPEN_ADD_IMAGE = "SET_OPEN_ADD_IMAGE";

export const imageListReducer = (state, action) => {
    switch (action.type) {
        case SET_OPEN_ADD_IMAGE:
            return { ...state, openAddImage: action.payload };
        case SET_SELECTED_IMAGE_INDEX:
            return { ...state, selectedImageIndex: action.payload };
        default:
            return state;
    }
};