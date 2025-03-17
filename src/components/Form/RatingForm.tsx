import { useState } from "react";
import { FaRegStar } from "react-icons/fa6";

interface RatingProps {
  onRate: (rating: number) => void;
}

const RatingForm: React.FC<RatingProps> = ({ onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="rating-form">
      <div className="buttons">
        {[1, 2, 3, 4, 5].map((star) => (
          <button>
            <FaRegStar />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingForm;
