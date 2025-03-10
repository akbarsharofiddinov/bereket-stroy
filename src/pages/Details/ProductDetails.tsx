import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FaAngleRight, FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import {
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedSubSubCategory,
} from "@/store/categorySlice";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatCurrency } from "@/utils/currencyFormat";
import { Partners, Services, Suggestion } from "@/components";
import {
  addProductToCart,
  addToFavourites,
  removeFromFavourites,
  removeProductFromCart,
  setCartProducts,
} from "@/store/productSlice";

import noImage from "@/assets/no-image.webp";

const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<IProduct | undefined>(
    undefined
  );

  const [recommendations, setRecommendations] = useState<IProduct[]>([]);

  const [currentImage, setCurrentImage] = useState("");

  const { cart, allProducts, favorites } = useAppSelector(
    (state) => state.productSlice
  );

  const {
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory,
    allCategories,
  } = useAppSelector((state) => state.categorySlice);

  const params = useParams();
  const dispatch = useAppDispatch();

  function handleAddToFavorites() {
    if (productDetails) {
      if (!localStorage.getItem("favorites")) {
        const favorites = productDetails;
        localStorage.setItem("favorites", JSON.stringify([favorites]));
      } else {
        const favorites: IProduct[] = JSON.parse(
          localStorage.getItem("favorites") + ""
        );
        const findProduct = favorites.find(
          (product) => product.id === productDetails.id
        );
        if (!findProduct) {
          favorites.push(productDetails);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      }

      dispatch(addToFavourites(productDetails));
    }
  }

  function handleRemoveFromFavorites() {
    if (productDetails) {
      const favorites: IProduct[] = JSON.parse(
        localStorage.getItem("favorites") + ""
      );
      const newFavorites = favorites.filter(
        (product) => product.id !== productDetails.id
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      dispatch(removeFromFavourites(productDetails));
    }
  }

  async function getProductDetails(name: string) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products?slug=${name}`
      );
      if (response.status === 200) {
        setProductDetails(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddProductToCart() {
    if (productDetails) {
      if (!localStorage.getItem("cart")) {
        const cartProducts = productDetails;
        localStorage.setItem(
          "cart",
          JSON.stringify([{ product: cartProducts, quantity: 1 }])
        );
        dispatch(setCartProducts([{ product: cartProducts, quantity: 1 }]));
      } else {
        const cartProducts: { product: IProduct; quantity: number }[] =
          JSON.parse(localStorage.getItem("cart") + "");
        const findProduct = cartProducts.find(
          (product) => product.product.id === productDetails.id
        );
        if (!findProduct) {
          cartProducts.push({ product: productDetails, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cartProducts));
          dispatch(addProductToCart(productDetails));
        } else {
          findProduct.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cartProducts));
          dispatch(addProductToCart(productDetails));
        }
      }
    }
  }

  function handleRemoveProductFromCart() {
    if (productDetails) {
      const cartProducts: { product: IProduct; quantity: number }[] =
        JSON.parse(localStorage.getItem("cart") + "");
      const findProduct = cartProducts.find(
        (product) => product.product.id === productDetails.id
      );
      if (findProduct) {
        if (findProduct.quantity === 1) {
          const newCartProducts = cartProducts.filter(
            (product) => product.product.id !== productDetails.id
          );
          localStorage.setItem("cart", JSON.stringify(newCartProducts));
          dispatch(removeProductFromCart(productDetails));
        } else {
          findProduct.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(cartProducts));
          dispatch(removeProductFromCart(productDetails));
        }
      }
    }
  }

  function checkProductInCart(product: IProduct) {
    const findProduct = cart.find((item) => item.product.id === product.id);

    if (findProduct) return true;
    else return false;
  }

  function checkProductInFavourites() {
    if (productDetails) {
      if (favorites) {
        const findProduct = favorites.find(
          (product) => product.id === productDetails.id
        );
        if (findProduct) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  function getRecommendedProducts() {
    if (allProducts) {
      const categories = new Set(cart.map((item) => item.product.category_id));
      setRecommendations(
        allProducts.filter(
          (product) =>
            categories.has(product.category_id) &&
            !cart.some((cartItem) => cartItem.product.id === product.id)
        )
      );
    }
  }

  useEffect(() => {
    getProductDetails(params.product_slug!);
  }, [params]);

  useEffect(() => {
    if (productDetails) {
      if (productDetails.photos) setCurrentImage(productDetails.photos[0]);
      const findCategory = allCategories.find(
        (item) => item.id === productDetails.category_id
      );
      dispatch(setSelectedCategory(findCategory));

      if (findCategory) {
        const findSubCategory = findCategory.sub_category.find(
          (item) => item.id === productDetails.sub_category_id
        );

        dispatch(setSelectedSubCategory(findSubCategory));

        if (findSubCategory) {
          const findSubSubCategory = findSubCategory.sub_sub_category.find(
            (item) => item.id === productDetails.sub_sub_category_id
          );

          dispatch(setSelectedSubSubCategory(findSubSubCategory));
        }
      }

      getRecommendedProducts();
    }
  }, [productDetails]);

  return (
    <>
      <div className="product-details-page">
        <div className="container">
          <div className="navigations">
            <Link to={"/"}>Bosh sahifa</Link>
            <span>
              <FaAngleRight />
            </span>
            {selectedCategory && (
              <Link to={`/catalogs/${selectedCategory?.slug}`}>
                {selectedCategory.name.uz}
              </Link>
            )}
            <span>
              <FaAngleRight />
            </span>
            {selectedSubCategory && (
              <Link to={`/catalogs/${selectedSubCategory?.slug}`}>
                {selectedSubCategory.name.uz}
              </Link>
            )}
            <span>
              <FaAngleRight />
            </span>
            {selectedSubSubCategory && (
              <Link to={`/catalogs/${selectedSubSubCategory.slug}`}>
                {selectedSubSubCategory.name.uz}
              </Link>
            )}
          </div>

          {productDetails ? (
            <>
              <div className="product-details">
                <div className="images">
                  <Swiper
                    direction={"vertical"}
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    className="images-swiper"
                  >
                    {productDetails.photos &&
                      productDetails.photos.map((item, index) => (
                        <SwiperSlide
                          key={index}
                          onClick={() => setCurrentImage(item)}
                        >
                          <img
                            src={`http://bereket.webclub.uz/storage/${item}`}
                            alt=""
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div className="img-box">
                    {productDetails.photos ? (
                      <img
                        src={`http://bereket.webclub.uz/storage/${currentImage}`}
                        alt=""
                      />
                    ) : (
                      <img src={noImage} alt="" />
                    )}
                  </div>
                </div>
                <div className="info">
                  <div className="top">
                    <h2 className="title">
                      {productDetails.name.uz}
                      <button
                        onClick={() => {
                          if (checkProductInFavourites())
                            handleRemoveFromFavorites();
                          else handleAddToFavorites();
                        }}
                      >
                        {checkProductInFavourites() ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.22172 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                              fill="#E31E24"
                              stroke="#E31E24"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="22"
                            height="20"
                            viewBox="0 0 22 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.4626 1.99415C15.7809 0.349231 13.4404 1.01211 12.0344 2.06801C11.4578 2.50096 11.1696 2.71743 11 2.71743C10.8304 2.71743 10.5422 2.50096 9.9656 2.06801C8.55962 1.01211 6.21909 0.349231 3.53744 1.99415C0.0180688 4.15294 -0.77828 11.2749 7.33953 17.2834C8.88572 18.4278 9.6588 19 11 19C12.3412 19 13.1143 18.4278 14.6605 17.2834C22.7783 11.2749 21.9819 4.15294 18.4626 1.99415Z"
                              fill="black"
                              fillOpacity="0.5"
                              stroke="#E2E5EB"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </button>
                    </h2>
                    <div className="extra-info">
                      <p>{productDetails.id}</p>|
                      <p>
                        <span>
                          <FaStar />
                        </span>
                        <span>{`${productDetails.avg_rating} (${productDetails.count_rating})`}</span>
                      </p>
                      |
                      <p
                        className={
                          productDetails.is_sale ? "status active" : "status"
                        }
                      >
                        {productDetails.is_sale ? (
                          <span>
                            <svg
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.0410156 9.50032C0.0410156 14.4478 4.05179 18.4587 8.99938 18.4587C13.9469 18.4587 17.9577 14.4478 17.9577 9.50032C17.9577 7.74163 17.4509 6.10133 16.5754 4.71745C16.4549 4.52693 16.3946 4.43166 16.2874 4.41171C16.1801 4.39176 16.0892 4.45933 15.9073 4.59445C15.5401 4.86721 15.167 5.17955 14.7921 5.52393C13.8215 6.41573 12.8861 7.47825 12.0655 8.50882C11.2465 9.53732 10.552 10.5211 10.0619 11.2483C9.81722 11.6115 9.62422 11.9097 9.49297 12.116C9.42738 12.2192 9.3773 12.2994 9.34388 12.3532L9.30655 12.4137L9.29755 12.4284L9.29555 12.4317C9.14247 12.684 8.86697 12.8372 8.57188 12.8334C8.27672 12.8296 8.00563 12.6698 7.85913 12.4136C7.06812 11.0292 6.41465 10.406 6.02146 10.1307C5.82607 9.99399 5.69316 9.94174 5.6347 9.92315C5.6312 9.92199 5.62946 9.92149 5.62284 9.91974C5.61701 9.91824 5.60723 9.91615 5.60129 9.91515C5.59455 9.91407 5.58737 9.91324 5.57298 9.91165C5.15653 9.8654 4.83268 9.51224 4.83268 9.0834C4.83268 8.62324 5.20577 8.25007 5.66602 8.25007C5.73187 8.24282 5.91887 8.24957 6.14003 8.3349C6.36803 8.40749 6.65178 8.53749 6.97723 8.76532C7.4183 9.07407 7.9318 9.55924 8.49063 10.3202C8.53788 10.3845 8.63513 10.3832 8.67972 10.317C9.18697 9.56424 9.90788 8.54274 10.7616 7.47059C11.6138 6.40045 12.6085 5.26678 13.6645 4.29661C14.0054 3.98351 14.3576 3.68264 14.7184 3.40415C14.9485 3.22655 15.0635 3.13776 15.066 3.01811C15.0685 2.89847 14.9644 2.81111 14.7563 2.6364C13.1994 1.32921 11.1913 0.541962 8.99938 0.541962C4.05179 0.541962 0.0410156 4.55274 0.0410156 9.50032Z"
                                fill="#009846"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.00033 17.9583C4.05278 17.9583 0.0419922 13.9475 0.0419922 8.99996C0.0419922 4.05241 4.05278 0.041626 9.00033 0.041626C13.9479 0.041626 17.9587 4.05241 17.9587 8.99996C17.9587 13.9475 13.9479 17.9583 9.00033 17.9583ZM12.0896 7.08923C12.415 6.76381 12.415 6.23617 12.0896 5.91073C11.7642 5.58528 11.2366 5.58526 10.9111 5.91068L9.00016 7.82146L7.08956 5.91101C6.76412 5.58558 6.23647 5.5856 5.91105 5.91105C5.58563 6.2365 5.58564 6.76413 5.91109 7.08956L7.82158 8.99996L5.91109 10.9104C5.58564 11.2358 5.58563 11.7635 5.91105 12.0889C6.23647 12.4143 6.76412 12.4143 7.08956 12.0889L9.00016 10.1785L10.9111 12.0892C11.2366 12.4146 11.7642 12.4146 12.0896 12.0892C12.415 11.7637 12.415 11.2361 12.0896 10.9107L10.1787 8.99996L12.0896 7.08923Z"
                                fill="#E31E24"
                              />
                            </svg>
                          </span>
                        )}

                        {productDetails.is_sale ? "Sotuvda" : "Sotuvda yo’q"}
                      </p>
                    </div>
                  </div>
                  <div className="desc">
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          productDetails.description.uz
                            .split(" ")
                            .slice(0, 40)
                            .join(" ") + ` <a href="#description">batafsil</a>`,
                      }}
                    />{" "}
                  </div>
                  <div className="price">
                    <span className="discounted-price">
                      {formatCurrency(
                        parseFloat(productDetails.discounted_price)
                      )}
                    </span>
                    {productDetails.discount ? (
                      <>
                        <span className="original-price">
                          {formatCurrency(parseFloat(productDetails.price))}
                        </span>
                        <span className="discount">
                          {productDetails.discount
                            ? productDetails.discount_type === "%"
                              ? parseFloat(productDetails.discount + "") + "%"
                              : formatCurrency(
                                  parseFloat(productDetails.discount + "")
                                )
                            : ""}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {checkProductInCart(productDetails) ? (
                    <>
                      <div
                        className={
                          productDetails.is_sale
                            ? "count-box"
                            : "count-box disable"
                        }
                      >
                        <div className="count">
                          <button
                            onClick={() => {
                              if (productDetails.is_sale) {
                                handleRemoveProductFromCart();
                              }
                            }}
                          >
                            <FaMinus />
                          </button>
                          <span>
                            {
                              cart.find(
                                (item) => item.product.id === productDetails.id
                              )?.quantity
                            }
                          </span>
                          <button
                            onClick={() => {
                              if (productDetails.is_sale) {
                                handleAddProductToCart();
                              }
                            }}
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <Link
                          to={"/cart"}
                          className={
                            productDetails.is_sale
                              ? "addtocart"
                              : "addtocart disable"
                          }
                        >
                          Savatchaga
                          {productDetails.is_sale ? (
                            <span>
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.75 16L17.4701 15.2733C20.1986 15.046 20.8111 14.45 21.1135 11.7289L21.75 6"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M6.75 6H22.75"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M6.75 22C7.85457 22 8.75 21.1046 8.75 20C8.75 18.8954 7.85457 18 6.75 18C5.64543 18 4.75 18.8954 4.75 20C4.75 21.1046 5.64543 22 6.75 22Z"
                                  stroke="black"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M17.75 22C18.8546 22 19.75 21.1046 19.75 20C19.75 18.8954 18.8546 18 17.75 18C16.6454 18 15.75 18.8954 15.75 20C15.75 21.1046 16.6454 22 17.75 22Z"
                                  stroke="black"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M8.75 20H15.75"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M2.75 2H3.716C4.66068 2 5.48414 2.62459 5.71326 3.51493L8.68852 15.0765C8.83887 15.6608 8.7102 16.2797 8.33824 16.7616L7.38213 18"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span>
                              <svg
                                width="23"
                                height="22"
                                viewBox="0 0 23 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.25 15L15.9701 14.2733C18.6986 14.046 19.3111 13.45 19.6135 10.7289L20.25 5M5.25 5H7.25M21.25 5H17.75M9.75 2L12.75 5M12.75 5L15.75 8M12.75 5L9.75 8M12.75 5L15.75 2M7.25 19C7.25 20.1046 6.35457 21 5.25 21C4.14543 21 3.25 20.1046 3.25 19C3.25 17.8954 4.14543 17 5.25 17C6.35457 17 7.25 17.8954 7.25 19ZM7.25 19H14.25M14.25 19C14.25 20.1046 15.1454 21 16.25 21C17.3546 21 18.25 20.1046 18.25 19C18.25 17.8954 17.3546 17 16.25 17C15.1454 17 14.25 17.8954 14.25 19ZM1.25 1H2.216C3.16068 1 3.98414 1.62459 4.21326 2.51493L7.18852 14.0765C7.33887 14.6608 7.2102 15.2797 6.83824 15.7616L5.88213 17"
                                  stroke="black"
                                  stroke-opacity="0.5"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </span>
                          )}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div
                      className={
                        productDetails.is_sale
                          ? "addtocart"
                          : "addtocart disable"
                      }
                      onClick={(e) => {
                        if (productDetails.is_sale) {
                          handleAddProductToCart();
                        } else {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      Savatga solish
                      {productDetails.is_sale ? (
                        <span>
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.75 16L17.4701 15.2733C20.1986 15.046 20.8111 14.45 21.1135 11.7289L21.75 6"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M6.75 6H22.75"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M6.75 22C7.85457 22 8.75 21.1046 8.75 20C8.75 18.8954 7.85457 18 6.75 18C5.64543 18 4.75 18.8954 4.75 20C4.75 21.1046 5.64543 22 6.75 22Z"
                              stroke="black"
                              strokeWidth="2"
                            />
                            <path
                              d="M17.75 22C18.8546 22 19.75 21.1046 19.75 20C19.75 18.8954 18.8546 18 17.75 18C16.6454 18 15.75 18.8954 15.75 20C15.75 21.1046 16.6454 22 17.75 22Z"
                              stroke="black"
                              strokeWidth="2"
                            />
                            <path
                              d="M8.75 20H15.75"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M2.75 2H3.716C4.66068 2 5.48414 2.62459 5.71326 3.51493L8.68852 15.0765C8.83887 15.6608 8.7102 16.2797 8.33824 16.7616L7.38213 18"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span>
                          <svg
                            width="23"
                            height="22"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.25 15L15.9701 14.2733C18.6986 14.046 19.3111 13.45 19.6135 10.7289L20.25 5M5.25 5H7.25M21.25 5H17.75M9.75 2L12.75 5M12.75 5L15.75 8M12.75 5L9.75 8M12.75 5L15.75 2M7.25 19C7.25 20.1046 6.35457 21 5.25 21C4.14543 21 3.25 20.1046 3.25 19C3.25 17.8954 4.14543 17 5.25 17C6.35457 17 7.25 17.8954 7.25 19ZM7.25 19H14.25M14.25 19C14.25 20.1046 15.1454 21 16.25 21C17.3546 21 18.25 20.1046 18.25 19C18.25 17.8954 17.3546 17 16.25 17C15.1454 17 14.25 17.8954 14.25 19ZM1.25 1H2.216C3.16068 1 3.98414 1.62459 4.21326 2.51493L7.18852 14.0765C7.33887 14.6608 7.2102 15.2797 6.83824 15.7616L5.88213 17"
                              stroke="black"
                              stroke-opacity="0.5"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="productInfo-navbar"></div>
              <div className="product-description" id="description">
                <h2 className="title">Tavsif</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.description.uz!,
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}

          {recommendations.length ? (
            <Suggestion
              title="Tavsiya qilamiz"
              data={recommendations}
              link=""
            />
          ) : (
            ""
          )}
          <Partners />
          <Services />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
