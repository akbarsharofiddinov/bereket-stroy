import { setSelectedSubCategory } from '@/store/categorySlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import noImage from "@/assets/no-image.webp"
import { Partners, Products, Services } from '@/components'

const CategoryDetail: React.FC = () => {
  const { selectedCategory } = useAppSelector(state => state.categorySlice);
  const { totalProducts } = useAppSelector(state => state.productSlice)
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="catalog-page">
        <div className="container">
          <div className="navigations">
            <Link to={"/"}>Bosh sahifa</Link>
            <span>
              <FaAngleRight />
            </span>
            <Link to={""}>
              {selectedCategory ? selectedCategory.name : ""}
            </Link>
          </div>

          <div className="top">
            <h2 className="title">{selectedCategory?.name}</h2>
            <p>{totalProducts} ta mahsulot topildi</p>
          </div>

          <div className="sub-categories">
            {selectedCategory?.sub_category.map((sub_category, index) => (
              <Link
                to={`/catalogs/${selectedCategory.slug}/${sub_category.slug}`}
                key={index}
                onClick={() => dispatch(setSelectedSubCategory(sub_category))}
              >
                {sub_category.photo ? (
                  <img
                    src={`http://bereket.webclub.uz/storage/${sub_category.photo}`}
                  />
                ) : (
                  <img src={noImage} alt="" />
                )}
                <span>{sub_category.name}</span>
              </Link>
            ))}
          </div>

          <Products />
          <Partners />
          <Services />
        </div>
      </div>
    </>
  )
}

export default CategoryDetail