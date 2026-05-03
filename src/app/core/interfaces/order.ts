export interface OrderItemDTO {
    productId: number;
    quantity: number;
}

export interface OrderRequestDTO{
    items: OrderItemDTO[];
}

export interface OrderItemResponseDTO{
    productName: String;
    quantity: number;
    price: number;
}


export interface OrderResponseDTO{
    productName: String;
    quantity: number;
    price: number;
}

export interface OrderResponseDTO{
    orderId: number;
    username: String;
    orderDate: String;
    total: number;
    message: String;
    items:OrderItemResponseDTO[];
}
