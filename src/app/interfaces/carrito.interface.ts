export interface ItemCart {
    cant: Number;
    product: {
        name: string,
        price: Number,
        status: boolean,
        _id: string,
        img_path: string
    },
    subtotal: Number;
}