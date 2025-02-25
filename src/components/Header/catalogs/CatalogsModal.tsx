import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Link } from "react-router-dom";

const CatalogsModal: React.FC = () => {
  const catalogModal = useAppSelector(
    (state) => state.projectSlice.catalogModal
  );
  return (
    <>
      <div
        className={catalogModal ? "catalogs-modal active" : "catalogs-modal"}
      >
        <div className="container">
          <div className="inner">
            <div className="left">
              <Link to={""} className="active">
                Lorem ipsum dolor sit amet.
              </Link>
              <Link to={""}>Lorem ipsum dolor sit amet.</Link>
              <Link to={""}>Lorem ipsum dolor sit amet.</Link>
              <Link to={""}>Lorem ipsum dolor sit amet.</Link>
              <Link to={""}>Lorem ipsum dolor sit amet.</Link>
              <Link to={""}>Lorem ipsum dolor sit amet.</Link>
              <Link to={""}>Lorem ipsum dolor sit amet.</Link>
              <Link to={""}>Lorem ipsum dolor sit amet.</Link>
            </div>
            <div className="right">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim,
              magni. Reprehenderit modi libero error ea harum alias. At rerum
              corporis possimus consequuntur deserunt molestiae debitis
              incidunt, fugiat distinctio ad. Blanditiis?
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogsModal;
