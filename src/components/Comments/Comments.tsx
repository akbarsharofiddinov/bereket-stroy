import { dateTransform } from "@/utils/dateTransform";
import { t } from "i18next";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import PhotoModal from "./PhotoModal";

interface IProps {
  data: IComment[];
  rating_count: number;
  avg_rating: number;
}

const Comments: React.FC<IProps> = ({ data, avg_rating, rating_count }) => {
  const [selectedPhoto, setSelectedPhoto] = useState("");
  return (
    <>
      <div className="comments">
        <div className="top">
          <h2 className="title">{t('comments')}</h2>
        </div>
        <div className="content">
          <div className="left">
            <div>
              <p>{avg_rating}</p>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((item, index) =>
                  item <= Math.round(avg_rating) ? (
                    <span key={index}>
                      <FaStar />
                    </span>
                  ) : (
                    <span key={index}>
                      <FaRegStar />
                    </span>
                  )
                )}
              </div>
            </div>
            <p>
              {t('scores')}: <span>{rating_count}</span>
            </p>
            <p>
              {t('comments')}: <span>{data.length}</span>
            </p>
          </div>

          <div className="right">
            {data.map((item, index) => (
              <div className="comment-box" key={index}>
                <div className="top">
                  <div className="user-info">
                    <span>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="48" height="48" rx="10" fill="#F4F7FA" />
                        <path
                          d="M18.5776 27.4816C17.1628 28.324 13.4534 30.0441 15.7127 32.1966C16.8163 33.248 18.0455 34 19.5909 34H28.4091C29.9545 34 31.1837 33.248 32.2873 32.1966C34.5466 30.0441 30.8372 28.324 29.4224 27.4816C26.1048 25.5061 21.8952 25.5061 18.5776 27.4816Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M28.5 18.5C28.5 20.9853 26.4853 23 24 23C21.5147 23 19.5 20.9853 19.5 18.5C19.5 16.0147 21.5147 14 24 14C26.4853 14 28.5 16.0147 28.5 18.5Z"
                          stroke="black"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    <div>
                      <p>{item.first_name}</p>
                      <p className="stars">
                        {[1, 2, 3, 4, 5].map((number, index) => (
                          <span key={index}>
                            {number <= item.rating ? <FaStar /> : <FaRegStar />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <p className="date">
                    {dateTransform(new Date(item.created_at)
                      .toLocaleString())}
                  </p>
                </div>
                <div className="comment-text">{item.comment}</div>
                <div className="images">
                  {item.photo ? <img src={item.photo} onClick={() => setSelectedPhoto(item.photo)} alt="" /> : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPhoto ? (
        <PhotoModal setSelectedPhoto={setSelectedPhoto}>
          <img src={selectedPhoto} alt="" />
        </PhotoModal>
      ) : ""}
    </>
  );
};

export default Comments;
