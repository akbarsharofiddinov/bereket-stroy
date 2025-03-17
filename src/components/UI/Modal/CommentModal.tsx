import React from "react";

interface IProps {
  product_id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentModal: React.FC<IProps> = ({ product_id, setModal }) => {
  return (
    <>
      <div className="comment-modal modal" onClick={() => setModal(false)}>
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <div className="top">
            <p className="title">Комментарий</p>
            <button className="close-btn" onClick={() => setModal(false)}>
              &times;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
