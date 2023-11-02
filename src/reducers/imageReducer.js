export const initialImageState = {
    images: [],
    imageloading: true,
    imageId: null,
    selectedImageIndex: 0,
    // openAddimage: false,
    showCarouselModal: false,
    searchTerm: '',
};

export const SET_IMAGE_LOADING = "SET_IMAGE_LOADING";
export const SET_IMAGES = "SET_IMAGES";
export const SET_SELECTED_IMAGE_INDEX = "SET_SELECTED_IMAGE_INDEX";
export const SET_OPEN_ADD_IMAGE = "SET_OPEN_ADD_IMAGE";
export const SET_SHOW_CAROUSEL_MODAL = "SET_SHOW_CAROUSEL_MODAL";
export const SET_IMAGE_ID = "SET_IMAGE_ID";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const imageListReducer = (state, action) => {
    switch (action.type) {
        case SET_IMAGES:
            return { ...state, images: action.payload };
        case SET_IMAGE_LOADING:
            return { ...state, imageloading: action.payload };
        // case SET_OPEN_ADD_IMAGE:
        //     return { ...state, openAddimage: action.payload };
        case SET_SELECTED_IMAGE_INDEX:
            return { ...state, selectedImageIndex: action.payload };
        case SET_SHOW_CAROUSEL_MODAL:
            return { ...state, showCarouselModal: action.payload };
        case SET_IMAGE_ID:
            return { ...state, imageId: action.payload };
        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
        default:
            return state;
    }
};