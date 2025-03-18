import { useGetSiteSettingsQuery } from "@/store/API/RTKQuery";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const { isSuccess, data } = useGetSiteSettingsQuery();

  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="inner">
            <div className="footer-menu">
              <ul className="columns column-1">
                <li className="column-item">Katalog</li>
                <li className="column-item">
                  <Link to={"/catalogs"}>Chegirmalar</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Xizmatlar</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Brendlar</Link>
                </li>
              </ul>
              <ul className="columns column-2">
                <li className="column-item">Kompaniya</li>
                <li className="column-item">
                  <Link to={""}>Biz haqimizda</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Do‘kon manzillari</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Hamkorlarimiz</Link>
                </li>
              </ul>
              <ul className="columns column-3">
                <li className="column-item">Ma’lumot</li>
                <li className="column-item">
                  <Link to={""}>To‘lov usullari</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Yetkazish xizmaati</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Mahsulot kafolati</Link>
                </li>
              </ul>
              <ul className="columns column-4">
                <li className="column-item">Yordam</li>
                <li className="column-item">
                  <Link to={""}>To‘lov bilan bog’liq yordam</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Qisqa savol-javoblar</Link>
                </li>
                <li className="column-item">
                  <Link to={""}>Biz bilan bog’lanish</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              {isSuccess ? (
                <>
                  <a href={`tel:+${data.data.phone.replace("+", "").trim()}`}>
                    {formatPhoneNumber(data.data.phone)}
                  </a>
                  <a href="mailto:bereketsawda@info.com" className="email">
                    {data.data.email}
                  </a>
                  <ul>
                    <li>
                      <a href={data.data.telegram}>
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.9854 13.4083L14.2268 17.0936C15.4277 18.4589 16.0282 19.1416 16.6567 18.9754C17.2852 18.8092 17.5008 17.9108 17.9318 16.1138L20.3229 6.1459C20.9868 3.37832 21.3187 1.99454 20.5808 1.312C19.843 0.629468 18.564 1.13725 16.0061 2.15282L4.13876 6.86449C2.09293 7.67674 1.07001 8.0829 1.00507 8.7808C0.998421 8.8522 0.998311 8.9241 1.00474 8.9955C1.06754 9.6937 2.08921 10.1033 4.13255 10.9223C5.05838 11.2934 5.5213 11.479 5.8532 11.8344C5.89052 11.8743 5.9264 11.9157 5.96078 11.9584C6.26658 12.3384 6.39709 12.8371 6.65808 13.8344L7.14653 15.701C7.4005 16.6715 7.52749 17.1568 7.86008 17.223C8.19267 17.2891 8.48225 16.8867 9.0614 16.0819L10.9854 13.4083ZM10.9854 13.4083L10.6676 13.0771C10.3059 12.7001 10.1251 12.5117 10.1251 12.2775C10.1251 12.0433 10.3059 11.8548 10.6676 11.4778L14.2406 7.75409"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href={data.data.instagram}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                            stroke="black"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M17.5078 6.5H17.4988"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href={data.data.facebook}>
                        <svg
                          width="16"
                          height="22"
                          viewBox="0 0 16 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.18182 9.3333C1.20406 9.3333 1 9.5252 1 10.4444V12.1111C1 13.0304 1.20406 13.2222 2.18182 13.2222H4.54545V19.8889C4.54545 20.8081 4.74951 21 5.72727 21H8.0909C9.0687 21 9.2727 20.8081 9.2727 19.8889V13.2222H11.9267C12.6683 13.2222 12.8594 13.0867 13.0631 12.4164L13.5696 10.7497C13.9185 9.6014 13.7035 9.3333 12.4332 9.3333H9.2727V6.55556C9.2727 5.94191 9.8018 5.44444 10.4545 5.44444H13.8182C14.7959 5.44444 15 5.25259 15 4.33333V2.11111C15 1.19185 14.7959 1 13.8182 1H10.4545C7.191 1 4.54545 3.48731 4.54545 6.55556V9.3333H2.18182Z"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href={data.data.youtube}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z"
                            stroke="black"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="inner">
              <p>
                «2025© ООО «Bereket Sawda». ИНН 123456789. Все права защищены»
              </p>

              <div>
                <p>Ommaviy offerta</p>
                <p>Foydalanuvchi kelishuvi</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
