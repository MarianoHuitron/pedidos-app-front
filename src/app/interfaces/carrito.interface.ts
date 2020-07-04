export interface ItemCart {
    cant: number;
    product: {
        name: string,
        price: number,
        status: boolean,
        _id: string,
        img_path: string
    },
    subtotal: number;
}