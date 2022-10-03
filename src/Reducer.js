
export const initialState = {
    banner: null
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_BANNER":
            return {
                ...state,
                banner: action.banner
            }
        default:
            return state
    }    
     
}

export default reducer;

