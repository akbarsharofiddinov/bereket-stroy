import { useAppDispatch } from "@/store/hooks";
import { setAuthModal } from "@/store/projectSlice";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const Signup: React.FC<{
  setLoginType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setLoginType }) => {
  const [isIllegal, setIsIllegal] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [userName, setUsername] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [inn, setInn] = React.useState("");
  const [getSms, setGetSms] = React.useState(false);
  const [smsCode, setSmsCode] = React.useState("");

  const dispatch = useAppDispatch();

  async function getSMSCode() {
    const formData = new FormData();
    formData.append("is_legal", isIllegal ? "1" : "0");
    formData.append("phone", phone);
    formData.append("name", userName);
    if (isIllegal) {
      formData.append("company", company);
      formData.append("inn", inn);
    }
    try {
      const response = await axios.post(
        `https://bereket.webclub.uz/api/register`,
        formData
      );
      if (response.status === 200) {
        setGetSms(true);
      }
    } catch (error: any) {
      toast("Telefon raqam tizimdan ro'yxatdan o'tgan", { type: "error" });
      setGetSms(false);
    }
  }

  async function handleRegister() {
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("code", smsCode);

    try {
      const response = await axios.post(
        `https://bereket.webclub.uz/api/register-verify`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className="signup-modal login-modal"
        onClick={() => dispatch(setAuthModal(false))}
      >
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="title">
              {getSms ? (
                <span onClick={() => setGetSms(false)}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 11.9998H20"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.99997 17C8.99997 17 4.00002 13.3176 4 12C3.99999 10.6824 9 7 9 7"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                ""
              )}
              Ro‘yhatdan o‘tish
            </h2>
            {!getSms && (
              <div className="switch-user_type">
                <button
                  className={isIllegal ? "physical" : "physical active"}
                  onClick={(e) => {
                    setIsIllegal(false);
                    e.preventDefault();
                  }}
                >
                  Jismoniy shaxs
                </button>
                <button
                  className={isIllegal ? "legal active" : "legal"}
                  onClick={(e) => {
                    setIsIllegal(true);
                    e.preventDefault();
                  }}
                >
                  Yuridik shaxs
                </button>
              </div>
            )}
            <div className="inner-form">
              <div className="phone-input">
                <span>+998</span>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="00 000 00 00"
                  value={phone}
                  autoComplete="off"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="username-input">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Ismingiz"
                  value={userName}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {isIllegal ? (
                <>
                  <div className="company-input">
                    <span>*</span>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={company}
                      placeholder="Korxona nomi"
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="inn-input">
                    <span>*</span>
                    <input
                      type="text"
                      name="inn"
                      id="inn"
                      value={inn}
                      onChange={(e) => setInn(e.target.value)}
                      placeholder="INN"
                    />
                  </div>
                </>
              ) : (
                ""
              )}

              {getSms && (
                <div className="sms-input">
                  <input
                    type="text"
                    name="sms"
                    id="sms"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    placeholder="SMS kodni kiriting"
                  />
                </div>
              )}
            </div>

            <div className="actions">
              <button
                onClick={() => {
                  if (phone && userName) {
                    getSMSCode();
                  } else {
                    handleRegister();
                  }
                }}
              >
                Ro‘yhatdan o‘tish
              </button>
              <button onClick={() => setLoginType("login")}>
                Tizimga kirish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
