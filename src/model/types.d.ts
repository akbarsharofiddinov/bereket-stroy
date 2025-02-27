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
}
