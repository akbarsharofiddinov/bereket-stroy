import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface IProps {
  data: IComment[];
  rating_count: number;
  avg_rating: number;
}

const Comments: React.FC<IProps> = ({ data, avg_rating, rating_count }) => {
  return (
    <>
      <div className="comments">
        <div className="top">
          <h2 className="title">Sharhlar</h2>
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
              Baholar: <span>{rating_count}</span>
            </p>
            <p>
              Sharhlar: <span>{data.length}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
