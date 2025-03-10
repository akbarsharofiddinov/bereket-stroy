import { setSelectedCategory } from "@/store/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCatalogModal } from "@/store/projectSlice";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CatalogsModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const catalogModal = useAppSelector(
    (state) => state.projectSlice.catalogModal
  );

  const { allCategories, selectedCategory } = useAppSelector(
    (state) => state.categorySlice
  );

  useEffect(() => {
    if (allCategories.length) {
      dispatch(setSelectedCategory(allCategories[0]));
    }
  }, [allCategories.length]);

  return (
    <>
      <div
        className={catalogModal ? "catalogs-modal active" : "catalogs-modal"}
      >
        <div className="container">
          <div className="inner">
            <div className="left">
              {allCategories.length
                ? allCategories.map((category, index) => (
                    <Link
                      to={`catalogs/${category.slug}`}
                      key={index}
                      className={
                        selectedCategory?.id === category.id ? "active" : ""
                      }
                      onMouseOver={() => {
                        dispatch(setSelectedCategory(category));
                      }}
                      onClick={() => {
                        dispatch(setCatalogModal(false));
                        dispatch(setSelectedCategory(category));
                      }}
                    >
                      {category.name.uz}
                    </Link>
                  ))
                : ""}
            </div>
            <div className="right">
              {selectedCategory ? (
                <>
                  <h2 className="title">{selectedCategory.name.uz}</h2>
                  <div className="sub-categories">
                    {selectedCategory.sub_category.map(
                      (sub_category, index) => (
                        <Link
                          to={`catalogs/${selectedCategory.slug}/${sub_category.slug}`}
                          onClick={() => dispatch(setCatalogModal(false))}
                          key={index}
                        >
                          {sub_category.name.uz}
                        </Link>
                      )
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogsModal;
