export type ProductId = number;

export interface Product {
  product_id: ProductId;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  thumbnail: string;
}

export interface CartItem {
  item_id: number;
  name: string;
  attributes: string;
  product_id: number;
  image: string;
  price: string;
  quantity: number;
  subtotal: string;
}

export interface ProductComplete extends Product {
  image: string;
  image_2: string;
  display: number;
}

export interface Review {
  name: string;
  review: string;
  rating: 5;
  created_on: Date;
}

export interface Attribute {
  attribute_name: string;
  attribute_value_id: number;
  attribute_value: string;
}

export interface Category {
  category_id: number;
  name: string;
  description: string;
  department_id: number;
}

export interface CartInput {
  cart_id: string;
  product_id: number;
  attributes: string;
}

export interface Customer {
  address_1: string;
  address_2: string;
  city: string;
  country: string;
  credit_card: string;
  customer_id: number;
  day_phone: string;
  email: string;
  eve_phone: string;
  mob_phone: string;
  name: string;
  postal_code: string;
  region: string;
  shipping_region_id: number;
}
