import React from "react";
import styles from "./SelectItem.module.scss";

interface IProps {
  title: string;
  menu: string[];
  productsCount: number;
}

const SelectItem: React.FC<IProps> = ({ menu, title, productsCount }) => {
  return (
    <>
      <div className={styles.mySelect_item}>
        <h2 className={styles.selected}>
          {title}
          <span>{productsCount}</span>
          <span>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1.00003C9 1.00003 6.05407 5 5 5C3.94587 5 1 1 1 1"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </h2>
        <div className={styles.menu}>
          {menu.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectItem;
