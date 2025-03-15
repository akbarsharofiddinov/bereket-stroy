import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchModal } from "@/store/projectSlice";
import React from "react";
import { Link } from "react-router-dom";

const highlightText = (text: string, highlight: string) => {
  if (!highlight) return text;
  const regex = new RegExp(`(${highlight})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-transparent text-black font-bold">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const SearchModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchModal = useAppSelector((state) => state.projectSlice.searchModal);

  const { allCategories } = useAppSelector((state) => state.categorySlice);
  const { allProducts, searchedProducts, searchValue } = useAppSelector(
    (state) => state.productSlice
  );

  return (
    <>
      <div
        className={searchModal ? "search-modal active" : "search-modal"}
        onClick={() => dispatch(setSearchModal(false))}
      >
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <div className="container">
            <div className="most-searched">
              <h2 className="title">Ko'pincha qidiriladi</h2>
              <div>
                {searchedProducts.length
                  ? searchedProducts.map((item, index) =>
                      index <= 3 ? (
                        <Link
                          to={`/details/${item.slug}`}
                          onClick={() => dispatch(setSearchModal(false))}
                          key={index}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_246_5305)">
                              <path
                                d="M14.5833 14.5833L18.3333 18.3333"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.6667 9.16667C16.6667 5.02454 13.3089 1.66667 9.16675 1.66667C5.02461 1.66667 1.66675 5.02454 1.66675 9.16667C1.66675 13.3088 5.02461 16.6667 9.16675 16.6667C13.3089 16.6667 16.6667 13.3088 16.6667 9.16667Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_246_5305">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          {highlightText(item.name, searchValue)}
                        </Link>
                      ) : (
                        ""
                      )
                    )
                  : allProducts.length
                  ? allProducts.map((item, index) =>
                      index <= 3 ? (
                        <Link
                          to={`/details/${item.slug}`}
                          onClick={() => dispatch(setSearchModal(false))}
                          key={index}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_246_5305)">
                              <path
                                d="M14.5833 14.5833L18.3333 18.3333"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.6667 9.16667C16.6667 5.02454 13.3089 1.66667 9.16675 1.66667C5.02461 1.66667 1.66675 5.02454 1.66675 9.16667C1.66675 13.3088 5.02461 16.6667 9.16675 16.6667C13.3089 16.6667 16.6667 13.3088 16.6667 9.16667Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_246_5305">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>

                          {item.name}
                        </Link>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
            </div>
            <div className="popular-categories">
              <h2 className="title">Mashhur kategoriyalar</h2>
              <div>
                {allCategories.length
                  ? allCategories.map((item, index) => (
                      <Link
                        to={`/catalogs/${item.slug}`}
                        onClick={() => dispatch(setSearchModal(false))}
                        key={index}
                      >
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_248_5651)">
                              <path
                                d="M1.66675 15C1.66675 13.7163 1.66675 13.0744 1.95569 12.6029C2.11736 12.339 2.33919 12.1172 2.60302 11.9555C3.07453 11.6666 3.71638 11.6666 5.00008 11.6666C6.28378 11.6666 6.92563 11.6666 7.39714 11.9555C7.66097 12.1172 7.8828 12.339 8.04447 12.6029C8.33341 13.0744 8.33341 13.7163 8.33341 15C8.33341 16.2836 8.33341 16.9255 8.04447 17.397C7.8828 17.6609 7.66097 17.8827 7.39714 18.0444C6.92563 18.3333 6.28378 18.3333 5.00008 18.3333C3.71638 18.3333 3.07453 18.3333 2.60302 18.0444C2.33919 17.8827 2.11736 17.6609 1.95569 17.397C1.66675 16.9255 1.66675 16.2836 1.66675 15Z"
                                stroke="black"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M11.6667 15C11.6667 13.7163 11.6667 13.0744 11.9557 12.6029C12.1173 12.339 12.3392 12.1172 12.603 11.9555C13.0745 11.6666 13.7164 11.6666 15.0001 11.6666C16.2837 11.6666 16.9257 11.6666 17.3972 11.9555C17.661 12.1172 17.8828 12.339 18.0445 12.6029C18.3334 13.0744 18.3334 13.7163 18.3334 15C18.3334 16.2836 18.3334 16.9255 18.0445 17.397C17.8828 17.6609 17.661 17.8827 17.3972 18.0444C16.9257 18.3333 16.2837 18.3333 15.0001 18.3333C13.7164 18.3333 13.0745 18.3333 12.603 18.0444C12.3392 17.8827 12.1173 17.6609 11.9557 17.397C11.6667 16.9255 11.6667 16.2836 11.6667 15Z"
                                stroke="black"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M1.66675 4.99996C1.66675 3.71626 1.66675 3.07441 1.95569 2.6029C2.11736 2.33907 2.33919 2.11724 2.60302 1.95557C3.07453 1.66663 3.71638 1.66663 5.00008 1.66663C6.28378 1.66663 6.92563 1.66663 7.39714 1.95557C7.66097 2.11724 7.8828 2.33907 8.04447 2.6029C8.33341 3.07441 8.33341 3.71626 8.33341 4.99996C8.33341 6.28366 8.33341 6.92551 8.04447 7.39702C7.8828 7.66085 7.66097 7.88267 7.39714 8.04435C6.92563 8.33329 6.28378 8.33329 5.00008 8.33329C3.71638 8.33329 3.07453 8.33329 2.60302 8.04435C2.33919 7.88267 2.11736 7.66085 1.95569 7.39702C1.66675 6.92551 1.66675 6.28366 1.66675 4.99996Z"
                                stroke="black"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M11.6667 4.99996C11.6667 3.71626 11.6667 3.07441 11.9557 2.6029C12.1173 2.33907 12.3392 2.11724 12.603 1.95557C13.0745 1.66663 13.7164 1.66663 15.0001 1.66663C16.2837 1.66663 16.9257 1.66663 17.3972 1.95557C17.661 2.11724 17.8828 2.33907 18.0445 2.6029C18.3334 3.07441 18.3334 3.71626 18.3334 4.99996C18.3334 6.28366 18.3334 6.92551 18.0445 7.39702C17.8828 7.66085 17.661 7.88267 17.3972 8.04435C16.9257 8.33329 16.2837 8.33329 15.0001 8.33329C13.7164 8.33329 13.0745 8.33329 12.603 8.04435C12.3392 7.88267 12.1173 7.66085 11.9557 7.39702C11.6667 6.92551 11.6667 6.28366 11.6667 4.99996Z"
                                stroke="black"
                                strokeWidth="1.5"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_248_5651">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        {item.name}
                      </Link>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
