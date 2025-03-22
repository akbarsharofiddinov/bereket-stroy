import React from "react";
import { useNavigate } from "react-router-dom";

type SortOption = "popular" | "price" | "-price" | "rating" | "";

interface IProps {
  activeSort: SortOption;
  setActiveSort: React.Dispatch<React.SetStateAction<SortOption>>;
}

const TopFilterBox: React.FC<IProps> = ({ activeSort, setActiveSort }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="top-filter_box">
        <p>Saralash:</p>
        <button
          className={activeSort === "popular" ? "active" : ""}
          onClick={() => {
            if (activeSort === "popular") {
              setActiveSort("");
              navigate("");
            } else {
              setActiveSort("popular");
              navigate(`?sort_by=popular`);
            }
          }}
        >
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7731 9.22687L9 15M14.7731 9.22687C14.2678 8.72156 11.8846 9.21665 11.1649 9.22687M14.7731 9.22687C15.2784 9.73219 14.7834 12.1154 14.7731 12.8351"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </span>
          Avval ommaboplari
        </button>
        <button
          className={
            activeSort === "price" || activeSort === "-price" ? "active" : ""
          }
          onClick={() => {
            if (activeSort === "price") {
              setActiveSort("-price");
              navigate("?sort_by=-price");
            } else if (activeSort === "-price") {
              setActiveSort("");
              navigate("");
            } else {
              setActiveSort("price");
              navigate(`?sort_by=price`);
            }
          }}
        >
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 12L19 11.9999"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 8H16"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 4H14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 16H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 21V3M5.5 21C4.79977 21 3.49153 19.0057 3 18.5M5.5 21C6.20023 21 7.50847 19.0057 8 18.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Narxlar
          {activeSort === "price"
            ? " : arzonroq"
            : activeSort === "-price"
              ? " : qimmatroq"
              : ""}
        </button>
        <button
          className={activeSort === "rating" ? "active" : ""}
          onClick={() => {
            if (activeSort === "rating") {
              setActiveSort("");
              navigate("");
            } else {
              setActiveSort("rating");
              navigate(`?sort_by=rating`);
            }
          }}
        >
          <span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05143L19.0969 7.58575C21.1367 7.92853 21.6167 9.4206 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1271 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01827 20.4296C4.8785 21.71 3.57865 20.7522 4.13859 18.3125L4.84851 15.2175C4.97849 14.6327 4.74852 13.8161 4.32856 13.3927L1.84884 10.8925C0.388999 9.4206 0.85895 7.92853 2.89872 7.58575L6.08837 7.05143C6.61831 6.9607 7.25824 6.48687 7.49821 5.99288L9.258 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Yuqori reyting
        </button>

        <div className="menu">
          <button
            className={activeSort === "popular" ? "active" : ""}
            onClick={() => {
              if (activeSort === "popular") {
                setActiveSort("");
                navigate("");
              } else {
                setActiveSort("popular");
                navigate(`?sort_by=popular`);
              }
            }}
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7731 9.22687L9 15M14.7731 9.22687C14.2678 8.72156 11.8846 9.21665 11.1649 9.22687M14.7731 9.22687C15.2784 9.73219 14.7834 12.1154 14.7731 12.8351"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </span>
            Avval ommaboplari
          </button>
          <button
            className={
              activeSort === "price" || activeSort === "-price" ? "active" : ""
            }
            onClick={() => {
              if (activeSort === "price") {
                setActiveSort("-price");
                navigate("?sort_by=-price");
              } else if (activeSort === "-price") {
                setActiveSort("");
                navigate("");
              } else {
                setActiveSort("price");
                navigate(`?sort_by=price`);
              }
            }}
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 12L19 11.9999"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 8H16"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 4H14"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 16H21"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 21V3M5.5 21C4.79977 21 3.49153 19.0057 3 18.5M5.5 21C6.20023 21 7.50847 19.0057 8 18.5"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Narxlar
            {activeSort === "price"
              ? " : arzonroq"
              : activeSort === "-price"
                ? " : qimmatroq"
                : ""}
          </button>
          <button
            className={activeSort === "rating" ? "active" : ""}
            onClick={() => {
              if (activeSort === "rating") {
                setActiveSort("");
                navigate("");
              } else {
                setActiveSort("rating");
                navigate(`?sort_by=rating`);
              }
            }}
          >
            <span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05143L19.0969 7.58575C21.1367 7.92853 21.6167 9.4206 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1271 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01827 20.4296C4.8785 21.71 3.57865 20.7522 4.13859 18.3125L4.84851 15.2175C4.97849 14.6327 4.74852 13.8161 4.32856 13.3927L1.84884 10.8925C0.388999 9.4206 0.85895 7.92853 2.89872 7.58575L6.08837 7.05143C6.61831 6.9607 7.25824 6.48687 7.49821 5.99288L9.258 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Yuqori reyting
          </button>
        </div>
      </div>
    </>
  );
};

export default TopFilterBox;
