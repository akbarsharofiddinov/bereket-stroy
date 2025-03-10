import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addProductToCart,
  addToFavourites,
  removeFromFavourites,
  removeProductFromCart,
  setCartProducts,
} from "@/store/productSlice";
import { formatCurrency } from "@/utils/currencyFormat";
import React from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import noImage from "@/assets/no-image.webp";

const ProductItem: React.FC<{ data: IProduct }> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { cart, favorites } = useAppSelector((state) => state.productSlice);

  function handleAddProductToCart() {
    if (!localStorage.getItem("cart")) {
      const cartProducts = data;
      localStorage.setItem(
        "cart",
        JSON.stringify([
          { product: cartProducts, isSelected: true, quantity: 1 },
        ])
      );
      dispatch(
        setCartProducts([
          { product: cartProducts, isSelected: true, quantity: 1 },
        ])
      );
    } else {
      const cartProducts: {
        product: IProduct;
        isSelected: boolean;
        quantity: number;
      }[] = JSON.parse(localStorage.getItem("cart") + "");
      const findProduct = cartProducts.find(
        (product) => product.product.id === data.id
      );
      if (!findProduct) {
        cartProducts.push({ product: data, isSelected: true, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        dispatch(addProductToCart(data));
      } else {
        findProduct.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        dispatch(addProductToCart(data));
      }
    }
  }

  function handleRemoveProductFromCart() {
    const cartProducts: { product: IProduct; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart") + ""
    );
    const findProduct = cartProducts.find(
      (product) => product.product.id === data.id
    );
    if (findProduct) {
      if (findProduct.quantity === 1) {
        const newCartProducts = cartProducts.filter(
          (product) => product.product.id !== data.id
        );
        localStorage.setItem("cart", JSON.stringify(newCartProducts));
        dispatch(removeProductFromCart(data));
      } else {
        findProduct.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        dispatch(removeProductFromCart(data));
      }
    }
  }

  function checkProductInCart() {
    if (cart) {
      const findProduct = cart.find(
        (product) => product.product.id === data.id
      );
      if (findProduct) {
        return true;
      }
    }
    return false;
  }

  function handleAddToFavorites() {
    if (!localStorage.getItem("favorites")) {
      const favorites = data;
      localStorage.setItem("favorites", JSON.stringify([favorites]));
    } else {
      const favorites: IProduct[] = JSON.parse(
        localStorage.getItem("favorites") + ""
      );
      const findProduct = favorites.find((product) => product.id === data.id);
      if (!findProduct) {
        favorites.push(data);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    }

    dispatch(addToFavourites(data));
  }

  function handleRemoveFromFavorites() {
    const favorites: IProduct[] = JSON.parse(
      localStorage.getItem("favorites") + ""
    );
    const newFavorites = favorites.filter((product) => product.id !== data.id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    dispatch(removeFromFavourites(data));
  }

  function checkProductInFavourites() {
    if (favorites) {
      const findProduct = favorites.find((product) => product.id === data.id);
      if (findProduct) {
        return true;
      }
    }
    return false;
  }

  const navigate = useNavigate();

  return (
    <>
      {data ? (
        <div
          className="product-item"
          onClick={() => navigate(`/details/${data.slug}`)}
        >
          <div className="img-box">
            {!data.is_sale ? <div className="not-sale">Tugagan</div> : ""}
            {data.status && <span className="status_new">{data.status}</span>}
            <span
              className="add-fav"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (checkProductInFavourites()) handleRemoveFromFavorites();
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
            </span>
            {data.photos ? (
              <img
                src={`https://bereket.webclub.uz/storage/${data.photos[0]}`}
                alt=""
              />
            ) : (
              <img src={noImage} alt="" />
            )}
          </div>
          <div className="body">
            <div className="extra-info">
              <p>
                {data.is_sale ? (
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.0415 10.0004C1.0415 14.9479 5.05228 18.9587 9.99987 18.9587C14.9474 18.9587 18.9582 14.9479 18.9582 10.0004C18.9582 8.24166 18.4514 6.60136 17.5759 5.21748C17.4554 5.02696 17.3951 4.93169 17.2879 4.91174C17.1806 4.89179 17.0897 4.95936 16.9078 5.09448C16.5405 5.36724 16.1675 5.67958 15.7926 6.02396C14.822 6.91576 13.8866 7.97828 13.066 9.00885C12.247 10.0374 11.5525 11.0211 11.0624 11.7484C10.8177 12.1115 10.6247 12.4097 10.4935 12.616C10.4279 12.7193 10.3778 12.7994 10.3444 12.8532L10.307 12.9138L10.298 12.9284L10.296 12.9317C10.143 13.184 9.86745 13.3373 9.57237 13.3334C9.2772 13.3296 9.00612 13.1699 8.85962 12.9136C8.0686 11.5293 7.41514 10.906 7.02195 10.6308C6.82656 10.494 6.69365 10.4418 6.63519 10.4232C6.63169 10.422 6.62995 10.4215 6.62333 10.4198C6.6175 10.4183 6.60772 10.4162 6.60178 10.4152C6.59504 10.4141 6.58785 10.4133 6.57347 10.4117C6.15702 10.3654 5.83317 10.0123 5.83317 9.58343C5.83317 9.12327 6.20626 8.7501 6.6665 8.7501C6.73235 8.74285 6.91935 8.7496 7.14052 8.83493C7.36852 8.90752 7.65227 9.03752 7.97772 9.26535C8.41879 9.5741 8.93229 10.0593 9.49112 10.8202C9.53837 10.8845 9.63562 10.8833 9.68021 10.817C10.1875 10.0643 10.9084 9.04277 11.7621 7.97062C12.6143 6.90048 13.609 5.76681 14.665 4.79664C15.0059 4.48354 15.3581 4.18267 15.7189 3.90418C15.949 3.72658 16.064 3.63779 16.0665 3.51814C16.069 3.3985 15.9649 3.31114 15.7568 3.13643C14.1999 1.82924 12.1918 1.04199 9.99987 1.04199C5.05228 1.04199 1.0415 5.05277 1.0415 10.0004Z"
                        fill="#009846"
                      />
                    </svg>
                    Sotuvda
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
                        d="M9.00008 17.9583C4.05253 17.9583 0.041748 13.9475 0.041748 8.99996C0.041748 4.05241 4.05253 0.041626 9.00008 0.041626C13.9477 0.041626 17.9584 4.05241 17.9584 8.99996C17.9584 13.9475 13.9477 17.9583 9.00008 17.9583ZM12.0893 7.08923C12.4147 6.76381 12.4147 6.23617 12.0893 5.91073C11.7639 5.58528 11.2363 5.58526 10.9108 5.91068L8.99991 7.82146L7.08931 5.91101C6.76387 5.58558 6.23623 5.5856 5.91081 5.91105C5.58538 6.2365 5.5854 6.76413 5.91085 7.08956L7.82133 8.99996L5.91085 10.9104C5.5854 11.2358 5.58538 11.7635 5.91081 12.0889C6.23623 12.4143 6.76387 12.4143 7.08931 12.0889L8.99991 10.1785L10.9108 12.0892C11.2363 12.4146 11.7639 12.4146 12.0893 12.0892C12.4147 11.7637 12.4147 11.2361 12.0893 10.9107L10.1785 8.99996L12.0893 7.08923Z"
                        fill="#E31E24"
                      />
                    </svg>
                    Sotuvda yo’q
                  </span>
                )}
              </p>
              <p>
                <span>
                  <FaStar />
                </span>
                sharhlar yo‘q
              </p>
            </div>
            <p className="product-name">
              {data.name.uz.slice(0, 68) +
                (data.name.uz.length > 70 ? "..." : "")}
            </p>
            <div className="price">
              {formatCurrency(parseInt(data.discounted_price))}
              <div className="discount-price">
                {data.discount ? (
                  data.discount_type === "%" ? (
                    <>
                      <p className="original-price">
                        {formatCurrency(parseFloat(data.price))}
                      </p>
                      <p className="discount">
                        {parseFloat(data.discount + "")}%
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="origianl-price">
                        {formatCurrency(parseFloat(data.price))}
                      </p>
                      <p className="discount">
                        {formatCurrency(data.discount)}
                      </p>
                    </>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <p className="monthly-price">15,400 so‘m / 24 oyga</p>
            <div className="count-box" onClick={(e) => e.stopPropagation()}>
              {checkProductInCart() ? (
                <>
                  <Link
                    to={"/cart"}
                    className={
                      data.is_sale
                        ? "add-cart_btn in-cart"
                        : "add-cart_btn in-cart disable"
                    }
                  >
                    Savatda
                    <span>
                      {data.is_sale ? (
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.25 16L16.9701 15.2733C19.6986 15.046 20.3111 14.45 20.6135 11.7289L21.25 6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.25 6H7.75M22.25 6H19.25"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10.75 7C10.75 7 11.75 7 12.75 9C12.75 9 15.9265 4 18.75 3"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.25 22C7.35457 22 8.25 21.1046 8.25 20C8.25 18.8954 7.35457 18 6.25 18C5.14543 18 4.25 18.8954 4.25 20C4.25 21.1046 5.14543 22 6.25 22Z"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <path
                            d="M17.25 22C18.3546 22 19.25 21.1046 19.25 20C19.25 18.8954 18.3546 18 17.25 18C16.1454 18 15.25 18.8954 15.25 20C15.25 21.1046 16.1454 22 17.25 22Z"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <path
                            d="M8.25 20H15.25"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.25 2H3.216C4.16068 2 4.98414 2.62459 5.21326 3.51493L8.18852 15.0765C8.33887 15.6608 8.2102 16.2797 7.83824 16.7616L6.88213 18"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 15L15.7201 14.2733C18.4486 14.046 19.0611 13.45 19.3635 10.7289L20 5M5 5H7M21 5H17.5M9.5 2L12.5 5M12.5 5L15.5 8M12.5 5L9.5 8M12.5 5L15.5 2M7 19C7 20.1046 6.10457 21 5 21C3.89543 21 3 20.1046 3 19C3 17.8954 3.89543 17 5 17C6.10457 17 7 17.8954 7 19ZM7 19H14M14 19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19C18 17.8954 17.1046 17 16 17C14.8954 17 14 17.8954 14 19ZM1 1H1.966C2.91068 1 3.73414 1.62459 3.96326 2.51493L6.93852 14.0765C7.08887 14.6608 6.9602 15.2797 6.58824 15.7616L5.63213 17"
                            stroke="black"
                            strokeOpacity="0.5"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                  </Link>
                  <div className={data.is_sale ? "" : "disable"}>
                    <button
                      onClick={(e) =>
                        data.is_sale
                          ? handleRemoveProductFromCart()
                          : () => {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                      }
                    >
                      <FaMinus />
                    </button>
                    <span>
                      {
                        cart.find((product) => product.product.id === data.id)
                          ?.quantity
                      }
                    </span>
                    <button
                      onClick={(e) =>
                        data.is_sale
                          ? handleAddProductToCart()
                          : () => {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className={
                    data.is_sale ? "add-cart_btn" : "add-cart_btn disable"
                  }
                  onClick={(e) => {
                    if (data.is_sale) handleAddProductToCart();
                    else {
                      e.stopPropagation();
                      e.preventDefault();
                    }
                  }}
                >
                  Savatga solish
                  <span>
                    {data.is_sale ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 6H22"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 22C7.10457 22 8 21.1046 8 20C8 18.8954 7.10457 18 6 18C4.89543 18 4 18.8954 4 20C4 21.1046 4.89543 22 6 22Z"
                          stroke="black"
                          strokeWidth="2"
                        />
                        <path
                          d="M17 22C18.1046 22 19 21.1046 19 20C19 18.8954 18.1046 18 17 18C15.8954 18 15 18.8954 15 20C15 21.1046 15.8954 22 17 22Z"
                          stroke="black"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 20H15"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 15L15.7201 14.2733C18.4486 14.046 19.0611 13.45 19.3635 10.7289L20 5M5 5H7M21 5H17.5M9.5 2L12.5 5M12.5 5L15.5 8M12.5 5L9.5 8M12.5 5L15.5 2M7 19C7 20.1046 6.10457 21 5 21C3.89543 21 3 20.1046 3 19C3 17.8954 3.89543 17 5 17C6.10457 17 7 17.8954 7 19ZM7 19H14M14 19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19C18 17.8954 17.1046 17 16 17C14.8954 17 14 17.8954 14 19ZM1 1H1.966C2.91068 1 3.73414 1.62459 3.96326 2.51493L6.93852 14.0765C7.08887 14.6608 6.9602 15.2797 6.58824 15.7616L5.63213 17"
                          stroke="black"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductItem;
