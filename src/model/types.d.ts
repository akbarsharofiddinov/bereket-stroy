type DataNames = {
  en: string;
  ru: string;
  uz: string;
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
    };
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
  is_legar: number;
  first_name: string;
  last_name: string;
  phone: string;
  birthday: string | null;
  company_name: string | null;
  inn: string | null;
  is_verified: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}
