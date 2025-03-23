import { useAppDispatch } from "@/store/hooks";
import { setAuthModal, setToken } from "@/store/projectSlice";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const Signup: React.FC<{
  setLoginType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setLoginType }) => {
  const [phone, setPhone] = React.useState("");
  // const [phoneValidation, setPhoneValidation] = React.useState(false);

  const [userName, setUsername] = React.useState("");
  // const [userNameValidation, setUserNameValidation] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [getSms, setGetSms] = React.useState(false);
  const [smsCode, setSmsCode] = React.useState("");

  const dispatch = useAppDispatch();

  async function getSMSCode() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("name", userName);
    try {
      const response = await axios.post(
        `https://bereket.webclub.uz/api/register`,
        formData
      );
      if (response.status === 200) {
        setGetSms(true);
        toast(`SMS kod +998${phone} raqamiga yuborildi`, { type: "success" });
      }
    } catch (error: any) {
      toast("Telefon raqam tizimdan ro'yxatdan o'tgan", { type: "error" });
      setGetSms(false);
    }
  }

  async function handleRegister() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("code", smsCode);

    try {
      const response = await axios.post(
        `https://bereket.webclub.uz/api/register-verify`,
        formData
      );
      if (response.status === 200) {
        toast("Muvafaqqiyatli ro'yxatdan o'tdingiz", { type: "success" });
        setPhone("");
        setUsername("");
        setSmsCode("");
        dispatch(setAuthModal(false));
        dispatch(setToken(response.data.token));
        localStorage.setItem("bereket_token", response.data.token);
      }
    } catch (error: any) {
      toast(error.response.data.message, { type: "error" });
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
                <span
                  onClick={() => {
                    setSmsCode("");
                    setGetSms(false);
                  }}
                >
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

              {getSms && (
                <div className="sms-input">
                  <input
                    type="text"
                    name="sms"
                    id="sms"
                    autoComplete="off"
                    value={smsCode}
                    onChange={(e) => {
                      setSmsCode(e.target.value);
                      if (e.target.value) setIsLoading(false);
                      else setIsLoading(true);
                    }}
                    placeholder="SMS kodni kiriting"
                  />
                </div>
              )}
            </div>

            <div className="actions">
              <button
                onClick={() => {
                  if (getSms) handleRegister();
                  else getSMSCode();
                }}
                className={isLoading ? "loading" : ""}
              >
                {getSms ? "Ro‘yhatdan o‘tish" : "SMS kodni olish"}
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
