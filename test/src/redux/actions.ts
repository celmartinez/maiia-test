export const addItem = (item: Product): ActionAdd => ({
    type: "ADD_TO_CART",
    payload: item,
});

export const removeItem = (items: Product[]): ActionRemove => ({
    type: "REMOVE_FROM_CART",
    payload: items,
});
