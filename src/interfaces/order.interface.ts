export interface Order {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface ProductOrderImage {
  url: string;
}

interface ProductOrder {
  title: string;
  ProductImage: ProductOrderImage[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size: string;
  orderId: string;
  productId: string;
  product: ProductOrder;
}
