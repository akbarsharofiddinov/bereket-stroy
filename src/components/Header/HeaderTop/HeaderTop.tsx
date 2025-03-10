import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiGlobe } from "react-icons/pi";
import { Link } from "react-router-dom";
import styles from "./HeaderTop.module.scss";

const HeaderTop: React.FC = () => {
  return (
    <>
      <div className={styles.headerTop}>
        <div className="container">
          <div className={styles.inner}>
            {/* Select Element */}
            <div className={styles.selectItem}>
              <div className={styles.selected}>
                <span>
                  <HiOutlineLocationMarker />
                </span>
                Nukus shahar
                <span>
                  <FaAngleDown />
                </span>
              </div>
            </div>

            <div className={styles.right}>
              {/* Discount button */}
              <button className={styles["discount-btn"]}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M11.711 2.29167C13.0499 2.29166 14.1072 2.29165 14.9491 2.38559C15.8122 2.4819 16.5212 2.68302 17.1311 3.13513C17.5504 3.44593 17.9133 3.83067 18.2045 4.2709C18.7422 5.08377 18.9007 6.06922 18.9573 7.37158C18.9843 7.99374 18.4602 8.4115 17.9458 8.4115C17.1692 8.4115 16.4798 9.08867 16.4798 10C16.4798 10.9113 17.1692 11.5885 17.9458 11.5885C18.4602 11.5885 18.9843 12.0063 18.9573 12.6284C18.9007 13.9307 18.7422 14.9163 18.2045 15.7291C17.9133 16.1693 17.5504 16.5541 17.1311 16.8648C16.5212 17.317 15.8122 17.5181 14.9491 17.6144C14.1072 17.7083 13.0499 17.7083 11.711 17.7083H8.28889C6.94997 17.7083 5.8926 17.7083 5.05073 17.6144C4.18764 17.5181 3.47867 17.317 2.86875 16.8648C2.44945 16.5541 2.08654 16.1693 1.79535 15.7291C1.25762 14.9162 1.09902 13.9306 1.0425 12.628C1.01552 12.0062 1.53932 11.5885 2.05351 11.5885C2.8301 11.5885 3.5195 10.9113 3.5195 10C3.5195 9.08867 2.8301 8.4115 2.05351 8.4115C1.53932 8.4115 1.01552 7.99383 1.0425 7.37202C1.09902 6.06944 1.25762 5.08387 1.79535 4.2709C2.08654 3.83067 2.44945 3.44593 2.86875 3.13513C3.47867 2.68302 4.18764 2.4819 5.05073 2.38559C5.8926 2.29165 6.94992 2.29166 8.28885 2.29167H11.711Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.6728 7.32741C12.9982 7.65285 12.9982 8.18048 12.6728 8.50592L8.50611 12.6726C8.18065 12.998 7.65301 12.998 7.32757 12.6726C7.00214 12.3472 7.00214 11.8195 7.32757 11.4941L11.4943 7.32741C11.8197 7.00198 12.3473 7.00198 12.6728 7.32741Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.0835 7.91667C7.0835 7.45643 7.4566 7.08333 7.91683 7.08333H7.92619C8.38645 7.08333 8.75953 7.45643 8.75953 7.91667C8.75953 8.37692 8.38645 8.75 7.92619 8.75H7.91683C7.4566 8.75 7.0835 8.37692 7.0835 7.91667ZM11.2408 12.0833C11.2408 11.6231 11.6139 11.25 12.0741 11.25H12.0835C12.5437 11.25 12.9169 11.6231 12.9169 12.0833C12.9169 12.5436 12.5437 12.9167 12.0835 12.9167H12.0741C11.6139 12.9167 11.2408 12.5436 11.2408 12.0833Z"
                    fill="white"
                  />
                </svg>
                Chegirmalar
              </button>

              {/* Header menu */}
              <ul className={styles["header-menu"]}>
                <li className={styles["header-menu_item"]}>
                  <Link to="#" className={styles["header-menu_item__link"]}>
                    Do‘kon manzillari
                  </Link>
                </li>
                <li className={styles["header-menu_item"]}>
                  <Link to="#" className={styles["header-menu_item__link"]}>
                    Sotuvchilar uchun
                  </Link>
                </li>
                <li className={styles["header-menu_item"]}>
                  <Link to="#" className={styles["header-menu_item__link"]}>
                    Biz bilan bog’lanish
                  </Link>
                </li>
                <li className={styles["header-menu_item"]}>
                  <Link to="#" className={styles["header-menu_item__link"]}>
                    Yordam
                  </Link>
                </li>
              </ul>

              {/* Select element - language */}
              <div className={`${styles.selectItem} ${styles.language}`}>
                <div className={styles.selected}>
                  <span>
                    <PiGlobe />
                  </span>
                  <p>O'zb</p>
                  <span>
                    <FaAngleDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
