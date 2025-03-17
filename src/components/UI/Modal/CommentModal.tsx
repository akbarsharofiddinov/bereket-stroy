import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";

interface IProps {
  product_id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentModal: React.FC<IProps> = ({ product_id, setModal }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const { token } = useAppSelector((state) => state.projectSlice);

  async function handleCreateComment() {
    const formData = new FormData();
    formData.append("product_id", product_id + "");
    formData.append("comment", comment);
    formData.append("rating", rating + "");
    formData.append("photo", imageFile!);

    try {
      const response = await axios.post(
        "https://bereket.webclub.uz/api/comments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast("Sharh muvofaqqiyatli yuborildi", { type: "success" });
        setModal(false);
      }
    } catch (error) {
      toast("Xatolik yuz berdi iltimos tekshirib qayta urunib ko'ring", {
        type: "error",
      });
      setModal(false);
      console.log(error);
    }
  }

  return (
    <>
      <div className="comment-modal modal" onClick={() => setModal(false)}>
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <div className="top">
            <p className="title">Комментарий</p>
            <button className="close-btn" onClick={() => setModal(false)}>
              <span>&times;</span>
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="product_id_input input-box">
              <label htmlFor="product_id">Product ID:</label>
              <p>{product_id}</p>
            </div>
            <div className="rating_input input-box">
              <label>Baholang: </label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((item) => (
                  <button
                    key={item}
                    onMouseOver={() => setHover(item)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(item)}
                    className={item <= hover || item <= rating ? "active" : ""}
                  >
                    {item <= hover || item <= rating ? (
                      <FaStar />
                    ) : (
                      <FaRegStar />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {selectedImage ? (
              <div className="img-box">
                <img src={selectedImage!} alt="Selected" />
                <button onClick={removeImage}>&times;</button>
              </div>
            ) : (
              <>
                <div className="img-input-box input-box">
                  <p>Tovar rasmini yuboring {`(ixtiyoriy)`}</p>
                  <label className="img-input">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <span>
                      <CiSquarePlus />
                    </span>
                  </label>
                </div>
              </>
            )}
            <div className="comment-input_box input-box">
              <label>Sharh:</label>
              <textarea
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button
              className="submit-btn"
              onClick={() => handleCreateComment()}
            >
              Yuborish
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
