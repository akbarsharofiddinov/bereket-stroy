import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrivateInfo from "./PrivateInfo";
import Locations from "./Locations";
import { useAppSelector } from "@/store/hooks";

const Profile: React.FC = () => {
  const { menu_slug } = useParams();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.projectSlice);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  return (
    <>
      <div className="profile-page">
        <div className="container">
          <div className="page-inner">
            <div className="menu">
              <Link
                to={"/profile/private-info"}
                className={menu_slug === "private-info" ? "active" : ""}
              >
                Shaxsiy ma’lumotlar
              </Link>
              <Link
                to={"/profile/locations"}
                className={menu_slug === "locations" ? "active" : ""}
              >
                Manzillar
              </Link>
              <Link
                to={"/orders"}
                className={menu_slug === "orders" ? "active" : ""}
              >
                Buyurtmalar
              </Link>
              <Link
                to={"/favorites"}
                className={menu_slug === "favourites" ? "active" : ""}
              >
                Sevimlilar
              </Link>
            </div>

            <div className="content">
              {menu_slug === "private-info" ? (
                <PrivateInfo />
              ) : menu_slug === "locations" ? (
                <Locations />
              ) : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
