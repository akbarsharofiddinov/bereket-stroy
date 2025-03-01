import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components";
import axios from "axios";
import { Switch } from "antd";

const FilterSidebar: React.FC = () => {
  const [extraDropDown, setExtraDropDown] = useState(false);
  const [brendsDropDown, setBrendsDropDown] = useState(true);
  const [countryDropDown, setCountryDropDown] = useState(true);
  const [priceDropDown, setPriceDropDown] = useState(true);

  const [brands, setBrands] = useState<IBrands[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([]);

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
        "https://bereket.webclub.uz/api/countries"
      );
      if (response.status === 200) setCountries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBrands();
    getCountries();
  }, []);

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
            Qo‘shimcha
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
            <Checkbox label="Chegirmalar" id="discounts" />
            <Checkbox label="Aksiyalar" id="promotion" />
            <Checkbox label="Tavsiyalar" id="suggestions" />
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
                    id={`${brand.id}-${brand.name.uz}`}
                    label={brand.name.uz}
                    key={index}
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
                    id={`${country.id}-${country.name.uz}`}
                    label={country.name.uz}
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
            <input type="text" placeholder="Dan" />
            <input type="text" placeholder="Gacha" />
            <div className="switch-item">
              <Switch />
              Sotuvda mavjud
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
