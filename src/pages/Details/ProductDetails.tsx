import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FaAngleRight, FaStar } from "react-icons/fa6";
import {
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedSubSubCategory,
} from "@/store/categorySlice";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatCurrency } from "@/utils/currencyFormat";
import { Partners, Services, Suggestion } from "@/components";

const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<IProduct | undefined>(
    undefined
  );

  const { cart } = useAppSelector((state) => state.productSlice);

  const {
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory,
    allCategories,
  } = useAppSelector((state) => state.categorySlice);

  const params = useParams();
  const dispatch = useAppDispatch();

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

  function checkProductInCart(product: IProduct) {
    const findProduct = cart.find((item) => item.product.id === product.id);

    if (findProduct) return true;
    else return false;
  }

  useEffect(() => {
    getProductDetails(params.product_slug!);
  }, [params]);

  useEffect(() => {
    if (productDetails) {
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
                    {productDetails.photos.map((item, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`http://bereket.webclub.uz/storage/${item}`}
                          alt=""
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="img-box">
                    <img
                      src={`http://bereket.webclub.uz/storage/${productDetails.photos[0]}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="info">
                  <div className="top">
                    <h2 className="title">{productDetails.name.uz}</h2>
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
                            .join(" ") + ` <a href="#">batafsil</a>`,
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
                      <div className="count">countbox</div>
                      <button>cart button</button>
                    </>
                  ) : (
                    <div className="addtocart">Add to cart</div>
                  )}
                </div>
              </div>
              <div className="productInfo-navbar"></div>
            </>
          ) : (
            ""
          )}
          <Suggestion title="O'xshash mahsulotlar" link="" />
          <Partners />
          <Services />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
