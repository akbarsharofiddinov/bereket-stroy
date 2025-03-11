type DataNames = {
  en: string;
  ru: string;
  uz: string;
  qr: string;
};

interface ICategory {
  id: number;
  name: string;
  photo: string | null;
  slug: string;
  sub_category: {
    id: number;
    name: string;
    photo: string | null;
    slug: string;
    sub_sub_category: {
      id: number;
      name: string;
      photo: string | null;
      slug: string;
    }[];
  }[];

  sub_sub_category?: {
    id: number;
    name: string;
    photo: string | null;
    slug: string;
  }[];
}

interface IProduct {
  id: number;
  name: string;
  slug: string;
  photos: string[];
  price: string;
  brand: string;
  status: string;
  discounted_price: string;
  discount: number;
  discount_type: null | string;
  discounted_price: string;
  is_sale: number;
  rating: number;
  category_id: number;
  sub_category_id: number;
  sub_sub_category_id: number;
  description: string;
  avg_rating: number;
  count_rating: number;
}

interface IBrands {
  id: number;
  icon: null | string;
  name: string;
}

interface ICountry {
  id: number;
  name: string;
}

interface IProfile {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  is_verified: number;
  is_legal: number;
  inn: string | null;
  company_name: string | null;
  birthday: string | null;
}

interface IDeliveryMethods {
  id: number;
  name: string;
}

interface IBranch {
  id: number;
  name: string;
  street: string;
  start_date: string;
  end_date: string;
  point_array: number[];
  days: { name: string }[];
}

interface IPaymanyMethod {
  id: number;
  name: string;
  photo: string;
  text: string;
  key: string;
}

interface IOrder {
  id: number;
  address: string | null;
  branch_id: number | null;
  delivery_method: string;
  district: string | null;
  latitude: string;
  longitude: string;
  order_id: string;
  receiver_comment: string | null;
  receiver_name: string | null;
  receiver_phone: string;
  products_count: number;
  products: {
    id: number;
    name: string;
    photos: string[];
    price: string;
    quantity: number;
  };
  region: string | null;
  status: string;
  total_amount: string;
}

interface ICart {
  product: IProduct;
  quantity: number;
  isSelected: boolean;
}
