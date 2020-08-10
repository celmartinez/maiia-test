const initialState = {
    shoppingCart: [],
};

export const shoppingCartReducer = (
    state: CartState = initialState,
    action: Action
) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload],
            };
        }
        default:
            return state;
    }
};
