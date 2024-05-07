export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  count?:number;
  qty:number;
  reviews:any;

}

export interface ProductScreenTypes {
  data: ProductType;
  isLoading: boolean;
  refetch:any;
  error: any;
}
export interface ScreenTypes {
  data: any;
  isLoading: boolean;
  error: any | null;
}
export interface MessageProps {
  type: "success" | "info" | "warning" | "error";
  message: string | null;
  children?: JSX.Element;
}
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  qty?: number;
}

export interface CartState {
  cartItems: CartItem[];
  paymentMethod:any;
  shippingAddress: any;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}
