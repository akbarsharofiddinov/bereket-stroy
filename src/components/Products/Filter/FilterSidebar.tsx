import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components";
import axios from "axios";
import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsInSalve } from "@/store/productSlice";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IProps {
  setBrandsQuery: React.Dispatch<React.SetStateAction<string>>;
  setCountriesQuery: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSidebar: React.FC<IProps> = ({
  setBrandsQuery,
  setCountriesQuery,
  setMaxPrice,
  setMinPrice,
}) => {
  const [extraDropDown, setExtraDropDown] = useState(false);
  const [brendsDropDown, setBrendsDropDown] = useState(true);
  const [countryDropDown, setCountryDropDown] = useState(true);
  const [priceDropDown, setPriceDropDown] = useState(true);

  const [brands, setBrands] = useState<IBrands[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([]);

  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);

  const [isWating, setIsWating] = useState(false);
  const [isWaitingCountry, setIsWaitingCountry] = useState(false);

  const dispatch = useAppDispatch();

  const { allCategories } = useAppSelector((state) => state.categorySlice);
  const { filterSideBar } = useAppSelector(state => state.productSlice)

  const { i18n } = useTranslation();

  const { catalog_slug, sub_catalog_slug } = useParams();

  async function getBrands() {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/brands${catalog_slug
          ? `?category_slug=${catalog_slug}`
          : sub_catalog_slug
            ? `?sub_category_slug=${sub_catalog_slug}`
            : ""
        }`
      );
      if (response.status === 200) setBrands(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCountries() {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/countries${catalog_slug
          ? `?category_slug=${catalog_slug}`
          : sub_catalog_slug
            ? `?sub_category_slug=${sub_catalog_slug}`
            : ""
        }`,
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      if (response.status === 200) setCountries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // async function getFilteredProducts() {
  //   if (brandQueryRef.current || countryQueryRef.current) {
  //     try {
  //       const response = await axios.get(
  //         `https://bereket.webclub.uz/api/products?${brandQueryRef.current}&${countryQueryRef.current}`
  //       );
  //       if (response.status === 200) {
  //         dispatch(setFilteredProducts(response.data.data));
  //       }

  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     dispatch(setFilteredProducts([]));
  //   }
  // }

  function handleInputChanges(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setTimeout(() => {
      if (name === "max_price") setMaxPrice(value);
      if (name === "min_price") setMinPrice(value);
    }, 1000);
  }

  useEffect(() => {
    getBrands();
    getCountries();
  }, [catalog_slug, sub_catalog_slug]);

  useEffect(() => {
    if (selectedBrands.length > 0) {
      setBrandsQuery(
        selectedBrands.map((item) => `brand_ids[]=${item}`).join("&")
      );
    } else {
      setBrandsQuery("");
    }
  }, [selectedBrands]);

  useEffect(() => {
    if (selectedCountries.length > 0) {
      setCountriesQuery(
        selectedCountries.map((item) => `country_ids[]=${item}`).join("&")
      );
    } else {
      setCountriesQuery("");
    }
  }, [selectedCountries]);

  useEffect(() => {
    if (filterSideBar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    }
  }, [filterSideBar])

  return (
    <>
      <div className={filterSideBar ? "filter-sidebar active" : "filter-sidebar"}>
        {/* Qoshimcha filter box */}
        <button className="close-filter">&times;</button>
        <div className={extraDropDown ? "select-item active" : "select-item"}>
          <div
            className="title"
            onClick={() => {
              setExtraDropDown((prev) => !prev);
            }}
          >
            Kategoriyalar
            <span>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <div className="menu">
            {allCategories.map((item, index) => (
              <Link to={`/catalogs/${item.slug}`} key={index}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Brendlar filter box */}
        <div className={brendsDropDown ? "select-item active" : "select-item"}>
          <div
            className="title"
            onClick={() => setBrendsDropDown((prev) => !prev)}
          >
            Brendlar
            <span>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="menu">
            <input type="text" placeholder="Qidirish..." />
            {brands.length
              ? brands.map((brand, index) => (
                <Checkbox
                  id={`${brand.id}-${brand.name}`}
                  label={brand.name}
                  key={index}
                  setSelectedBrands={setSelectedBrands}
                  isWaiting={isWating}
                  setIsWating={setIsWating}
                />
              ))
              : ""}
          </div>
        </div>

        {/* Country filter box */}
        <div className={countryDropDown ? "select-item active" : "select-item"}>
          <div
            className="title"
            onClick={() => setCountryDropDown((prev) => !prev)}
          >
            Mamlakat
            <span>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <div className="menu">
            <input type="text" placeholder="Qidirish..." />
            {countries.length
              ? countries.map((country, index) => (
                <Checkbox
                  key={index}
                  id={`${country.id}-${country.name}`}
                  label={country.name}
                  isWaiting={isWaitingCountry}
                  setSelectedCountries={setSelectedCountries}
                  setIsWating={setIsWaitingCountry}
                />
              ))
              : ""}
          </div>
        </div>

        {/* Price filter box */}
        <div className={priceDropDown ? "select-item active" : "select-item"}>
          <div
            className="title"
            onClick={() => setPriceDropDown((prev) => !prev)}
          >
            Narx
            <span>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="menu">
            <input
              type="number"
              name="min_price"
              onChange={(e) => handleInputChanges(e)}
              placeholder="Dan"
            />
            <input
              type="number"
              name="max_price"
              onChange={(e) => handleInputChanges(e)}
              placeholder="Gacha"
            />
            <div className="switch-item">
              <Switch onChange={(value) => dispatch(setIsInSalve(value))} />
              Sotuvda mavjud
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
