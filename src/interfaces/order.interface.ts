export interface OrderAddress {
  firstName: string;
  lastName: string;
}

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
  transactionId: string | null;
  OrderAddress: OrderAddress | null;
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
  image?: string;
  slug?: string;
  title?: string;
  orderId?: string;
  productId?: string;
  product?: ProductOrder;
}
