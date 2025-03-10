import React from "react";

import banner1 from "@/assets/banner-images/banner3/banner-1.png";
import banner2 from "@/assets/banner-images/banner3/banner-2.png";
import banner3 from "@/assets/banner-images/banner3/banner-3.png";
import banner4 from "@/assets/banner-images/banner3/banner-4.png";
import banner5 from "@/assets/banner-images/banner3/banner-5.png";

const Banner3: React.FC = () => {
  return (
    <>
      <div className="banner3 section">
        <div className="container">
          <div className="banner-boxes">
            <div className="banner-box box-1">
              <div className="context">
                <h2 className="title">Quritgichli kir yuvish mashinasi</h2>
                <p className="desc">Hiberg</p>
              </div>
              <div className="right">
                <p className="price">
                  6,499,000 so‘m
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.4621 3.07697C19.3117 3.07697 20.0006 2.38817 20.0006 1.53849C20.0006 0.688804 19.3117 0 18.4621 0C17.6124 0 16.9236 0.688804 16.9236 1.53849C16.9236 2.38817 17.6124 3.07697 18.4621 3.07697ZM16.9226 6.92295C16.9226 8.30793 16.1906 9.52194 15.0923 10.1992C15.2829 10.8692 15.3849 11.5764 15.3849 12.3075C15.3849 16.5559 11.9408 20 7.69243 20C3.44402 20 0 16.5559 0 12.3075C0 8.05912 3.44402 4.6151 7.69243 4.6151C8.42323 4.6151 9.13022 4.71701 9.79998 4.90739C10.4772 3.80893 11.6913 3.07673 13.0764 3.07673C15.2006 3.07673 16.9226 4.79874 16.9226 6.92295Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </p>
                <img src={banner1} alt="" />
              </div>
            </div>
            <div className="banner-box box-2">
              <div className="context">
                <h2 className="title">Simsiz Drel</h2>
                <p className="desc">КМ АТОМ</p>
              </div>
              <div className="right">
                <p className="price">
                  449,000 so‘m
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.4621 3.07697C19.3117 3.07697 20.0006 2.38817 20.0006 1.53849C20.0006 0.688804 19.3117 0 18.4621 0C17.6124 0 16.9236 0.688804 16.9236 1.53849C16.9236 2.38817 17.6124 3.07697 18.4621 3.07697ZM16.9226 6.92295C16.9226 8.30793 16.1906 9.52194 15.0923 10.1992C15.2829 10.8692 15.3849 11.5764 15.3849 12.3075C15.3849 16.5559 11.9408 20 7.69243 20C3.44402 20 0 16.5559 0 12.3075C0 8.05912 3.44402 4.6151 7.69243 4.6151C8.42323 4.6151 9.13022 4.71701 9.79998 4.90739C10.4772 3.80893 11.6913 3.07673 13.0764 3.07673C15.2006 3.07673 16.9226 4.79874 16.9226 6.92295Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </p>
                <img src={banner2} alt="" />
              </div>
            </div>
            <div className="banner-box box-3">
              <div className="context">
                <h2 className="title">Yumshoq divan</h2>
                <p className="desc">NIJEGOROD</p>
              </div>
              <div className="right">
                <p className="price">
                  4,449,000 so‘m
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.4621 3.07697C19.3117 3.07697 20.0006 2.38817 20.0006 1.53849C20.0006 0.688804 19.3117 0 18.4621 0C17.6124 0 16.9236 0.688804 16.9236 1.53849C16.9236 2.38817 17.6124 3.07697 18.4621 3.07697ZM16.9226 6.92295C16.9226 8.30793 16.1906 9.52194 15.0923 10.1992C15.2829 10.8692 15.3849 11.5764 15.3849 12.3075C15.3849 16.5559 11.9408 20 7.69243 20C3.44402 20 0 16.5559 0 12.3075C0 8.05912 3.44402 4.6151 7.69243 4.6151C8.42323 4.6151 9.13022 4.71701 9.79998 4.90739C10.4772 3.80893 11.6913 3.07673 13.0764 3.07673C15.2006 3.07673 16.9226 4.79874 16.9226 6.92295Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </p>
                <img src={banner3} alt="" />
              </div>
            </div>
            <div className="banner-box box-4">
              <div className="context">
                <h2 className="title">To'qilmagan devor qog'ozi</h2>
                <p className="desc">OVK Design</p>
              </div>
              <div className="right">
                <p className="price">
                  299,000 so‘m
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.4621 3.07697C19.3117 3.07697 20.0006 2.38817 20.0006 1.53849C20.0006 0.688804 19.3117 0 18.4621 0C17.6124 0 16.9236 0.688804 16.9236 1.53849C16.9236 2.38817 17.6124 3.07697 18.4621 3.07697ZM16.9226 6.92295C16.9226 8.30793 16.1906 9.52194 15.0923 10.1992C15.2829 10.8692 15.3849 11.5764 15.3849 12.3075C15.3849 16.5559 11.9408 20 7.69243 20C3.44402 20 0 16.5559 0 12.3075C0 8.05912 3.44402 4.6151 7.69243 4.6151C8.42323 4.6151 9.13022 4.71701 9.79998 4.90739C10.4772 3.80893 11.6913 3.07673 13.0764 3.07673C15.2006 3.07673 16.9226 4.79874 16.9226 6.92295Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </p>
                <img src={banner4} alt="" />
              </div>
            </div>
            <div className="banner-box box-5">
              <div className="context">
                <h2 className="title">Bir qatorli parket taxtasi</h2>
                <p className="desc">AW Eman Vanil</p>
              </div>
              <div className="right">
                <p className="price">
                  239,000 so‘m
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.4621 3.07697C19.3117 3.07697 20.0006 2.38817 20.0006 1.53849C20.0006 0.688804 19.3117 0 18.4621 0C17.6124 0 16.9236 0.688804 16.9236 1.53849C16.9236 2.38817 17.6124 3.07697 18.4621 3.07697ZM16.9226 6.92295C16.9226 8.30793 16.1906 9.52194 15.0923 10.1992C15.2829 10.8692 15.3849 11.5764 15.3849 12.3075C15.3849 16.5559 11.9408 20 7.69243 20C3.44402 20 0 16.5559 0 12.3075C0 8.05912 3.44402 4.6151 7.69243 4.6151C8.42323 4.6151 9.13022 4.71701 9.79998 4.90739C10.4772 3.80893 11.6913 3.07673 13.0764 3.07673C15.2006 3.07673 16.9226 4.79874 16.9226 6.92295Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </p>
                <img src={banner5} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner3;
