interface Product {
    id: number;
    title: "string";
    url: "string";
    thumbnailUrl: "string";
}

interface CartState {
    shoppingCart: Product[];
}

interface SearchBarProps {
    setToSearch: function;
}

interface ActionAdd {
    type: "ADD_TO_CART";
    payload: Product;
}

interface ActionRemove {
    type: "REMOVE_FROM_CART";
    payload: Product[];
}

type Action = ActionAdd | ActionRemove;
