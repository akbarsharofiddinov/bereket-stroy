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
  icon: string | null;
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
  country: string;
  sales_count: number;
  search?: string;
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
  point_array: number[] | null;
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
  branch: string;
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
  }[];
  region: string | null;
  status: string;
  total_amount: string;
  created_at: string;
}

interface ICart {
  product: IProduct;
  quantity: number;
  isSelected: boolean;
}

interface APIResponse<T> {
  data: T;
  status: string;
  message: string;
  pagination: {
    current_page: number;
    total_pages: number;
    total: number;
    per_page: number;
    links: {
      first: string;
      last: string;
      prev: null | string;
      next: null | string;
    };
  };
}

interface ISiteSetting {
  id: number;
  email: string;
  facebook: string;
  instagram: string;
  phone: string;
  telegram: string;
  youtube: string;
}

interface ICard {
  id: number;
  name: string;
  priority: number;
  products: IProduct[];
}

interface IComment {
  id: number;
  last_name: null | string;
  first_name: null | string;
  comment: string;
  rating: number;
  photo: string;
  created_at: string;
}

interface IBanner {
  id: number;
  banner_type: string;
  url: string;
  photo: string;
  header: string;
  text: string;
}

interface IDiscount {
  id: number;
  deadline: string;
  discount_amount: number | null;
  name: string;
  photo: string;
  slug: string;
  type: null;
}
