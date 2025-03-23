import { useAppSelector } from '@/store/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

const SubCategory: React.FC = () => {
  const [data, setData] = useState<ICategory[]>([]);

  const { selectedCategory } = useAppSelector(state => state.categorySlice)
  const { catalog_slug, sub_catalog_slug } = useParams();

  async function getSubCategories() {
    if (catalog_slug) {
      try {
        const response = await axios.get(`https://bereket.webclub.uz/api/sub_categories?category_slug=${catalog_slug}`);
        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(() => {
    getSubCategories();
  }, [catalog_slug]);

  return (
    <>
      {sub_catalog_slug ? (
        <Outlet />
      ) : (
        <>
          <h2 className="title">{selectedCategory?.name}</h2>
          <div className="sub-categories">
            {data.length ? (
              data.map((item, index) => (
                <Link to={`/catalogs/${selectedCategory?.slug}/${item.slug}`} key={index}>
                  {item.name}
                </Link>
              ))
            ) : ""}
          </div>
        </>
      )}
    </>
  )
}

export default SubCategory