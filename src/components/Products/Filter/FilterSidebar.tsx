import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components";
import axios from "axios";
import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilteredProducts, setIsFilter } from "@/store/productSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FilterSidebar: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [extraDropDown, setExtraDropDown] = useState(false);
  const [brendsDropDown, setBrendsDropDown] = useState(true);
  const [countryDropDown, setCountryDropDown] = useState(true);
  const [priceDropDown, setPriceDropDown] = useState(true);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [brands, setBrands] = useState<IBrands[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([]);

  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const dispatch = useAppDispatch();

  const { allProducts } = useAppSelector((state) => state.productSlice);
  const { allCategories } = useAppSelector((state) => state.categorySlice);

  const { i18n } = useTranslation();

  async function getBrands() {
    try {
      const response = await axios.get("https://bereket.webclub.uz/api/brands");
      if (response.status === 200) setBrands(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCountries() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/countries",
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

  async function getFilterProductsByPrice(
    min_price: number,
    max_price: number
  ) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products${
          min_price ? `?min_price=${min_price}` : "?min_price=0"
        }${max_price ? `&max_price=${max_price}` : ""}`
      );

      if (response.status === 200)
        dispatch(setFilteredProducts(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  function handlePriceInputChanges(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "min_price") setMinValue(value);
    if (name === "max_price") setMaxValue(value);
  }

  useEffect(() => {
    getBrands();
    getCountries();
  }, []);

  useEffect(() => {
    if (minValue || maxValue) {
      const handler = setTimeout(() => {
        setDebouncedQuery(minValue ? minValue : maxValue ? maxValue : "");
      }, 500); // 500ms kechikish

      return () => clearTimeout(handler); // Eski taymerni tozalash
    } else {
      dispatch(setIsFilter(false));
      dispatch(setFilteredProducts([]));
    }
  }, [minValue, maxValue]);

  useEffect(() => {
    if (debouncedQuery) {
      getFilterProductsByPrice(parseFloat(minValue), parseFloat(maxValue));
    } else {
      dispatch(setIsFilter(false));
      dispatch(setFilteredProducts([]));
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const filteredproducts = allProducts.filter(
      (product) =>
        selectedBrands.includes(product.brand) ||
        selectedCountries.includes(product.country)
    );

    dispatch(setFilteredProducts(filteredproducts));
    dispatch(setIsFilter(true));
  }, [selectedBrands, selectedCountries]);

  return (
    <>
      <div className="filter-sidebar">
        {/* Qoshimcha filter box */}
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
                    setSelectedCountries={setSelectedCountries}
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
              type="text"
              name="min_price"
              onChange={(e) => handlePriceInputChanges(e)}
              placeholder="Dan"
            />
            <input
              type="text"
              name="max_price"
              onChange={(e) => handlePriceInputChanges(e)}
              placeholder="Gacha"
            />
            <div className="switch-item">
              <Switch
                onChange={(value) => {
                  if (value) {
                    dispatch(setIsFilter(true));
                    const filteredproducts = allProducts.filter(
                      (item) => item.is_sale === 1
                    );
                    dispatch(setFilteredProducts(filteredproducts));
                  } else {
                    dispatch(setIsFilter(false));
                    dispatch(setFilteredProducts([]));
                  }
                }}
              />
              Sotuvda mavjud
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
