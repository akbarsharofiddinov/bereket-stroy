type DataNames = {
  en: string;
  ru: string;
  uz: string;
  qr: string;
};

interface ICategory {
  id: number;
  name: DataNames;
  photo: string | null;
  slug: string;
  sub_category: {
    id: number;
    name: DataNames;
    photo: string | null;
    slug: string;
    sub_sub_category: {
      id: number;
      name: DataNames;
      photo: string | null;
      slug: string;
    }[];
  }[];

  sub_sub_category?: {
    id: number;
    name: DataNames;
    photo: string | null;
    slug: string;
  }[];
}

interface IProduct {
  id: number;
  name: DataNames;
  slug: string;
  photos: string[];
  price: string;
  brand: DataNames;
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
  description: DataNames;
  avg_rating: number;
  count_rating: number;
}

interface IBrands {
  id: number;
  icons: null | string;
  name: DataNames;
}

interface ICountry {
  id: number;
  name: DataNames;
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
  name: DataNames;
}

interface IBranch {
  id: number;
  name: DataNames;
  street: DataNames;
  start_date: string;
  end_date: string;
  point_array: number[];
  days: DataNames[];
}

interface IPaymanyMethod {
  id: number;
  name: DataNames;
  photo: string;
  text: DataNames;
}
