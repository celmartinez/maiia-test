interface Product {
    id: number;
    title: "string";
    url: "string";
    thumbnailUrl: "string";
}

interface CartState {
    shoppingCart: Product[];
}

type Action = { type: "ADD_TO_CART"; payload: Product };
