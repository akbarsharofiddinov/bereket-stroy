import { useAppDispatch } from "@/store/hooks";
import {
  setAuthorization,
  setProfileInfo,
  setToken,
} from "@/store/projectSlice";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Authorization: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [sms, setSms] = React.useState("");
  const [smsSent, setSmsSent] = useState(false);

  const [phone, setPhone] = React.useState("");
  const [phoneValidation, setPhoneValidation] = React.useState(false);

  const [userName, setUsername] = React.useState("");
  const [timerStart, setTimerStart] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(120);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function startTimer() {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 0) clearInterval(timer);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 9) setPhone(value);
  }

  const navigate = useNavigate();

  async function getVerificationCode() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("phone", phone);
    if (phone) {
      try {
        const response = await axios.post(
          "https://bereket.webclub.uz/api/login",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast(`Tasdiqlash kodi ${phone} raqamiga yuborildi`, {
            type: "info",
          });
          setTimerStart(true);
          setSmsSent(true);
          startTimer();
        }
      } catch (error: any) {
        const message = error.response.data.message.ru;
        toast(message, { type: "warning" });
        setIsLoading(false);
      }
    } else {
      toast("Iltimos telefon raqamingizni kiriting", { type: "error" });
      setPhoneValidation(true);
      setIsLoading(false);
    }

    setTimerStart(true);
    setSmsSent(true);
    startTimer();
  }

  async function handleLogin() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("code", sms);
    try {
      const response = await axios.post(
        "https://bereket.webclub.uz/api/login-verify",
        formData
      );

      if (response.status === 200) {
        toast("Tizimga muvaffaqiyatli kirdingiz", { type: "success" });
        localStorage.setItem("token", response.data.token);
        dispatch(setToken(response.data.token));
        navigate("/checkout");
        dispatch(setAuthorization(false));
        dispatch(setProfileInfo(response.data.customer));
      }
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message, { type: "error" });
      dispatch(setAuthorization(false));
    }
  }

  return (
    <>
      <div
        className="auth-modal login-modal"
        onClick={() => dispatch(setAuthorization(false))}
      >
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="title">{t("login_title")}</h2>

            <div className="inner-form">
              <div
                className={
                  phoneValidation ? "phone-input error" : "phone-input"
                }
              >
                <span>+998</span>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  placeholder="00 000 00 00"
                  value={phone}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="username-input">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  placeholder="Ismingiz"
                  value={userName}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              {smsSent ? (
                <div className="sms-input">
                  <input
                    type="text"
                    name="sms"
                    id="sms"
                    autoComplete="off"
                    placeholder={t("sms_code")}
                    value={sms}
                    onChange={(e) => {
                      setSms(e.target.value);
                      if (sms.length) setIsLoading(false);
                    }}
                  />
                  {timerStart && timeLeft > 0 ? (
                    <p className="desc">
                      Agar kod kelmasa, siz {timeLeft} soniyadan so'ng yangi kod
                      olishingiz mumkin
                    </p>
                  ) : (
                    <button
                      onClick={(e) => {
                        if (isLoading && timeLeft >= 0) {
                          e.stopPropagation();
                          e.preventDefault();
                        } else {
                          setTimeLeft(60);
                        }
                      }}
                      className={isLoading && timeLeft > 0 ? "loading" : ""}
                    >
                      {t("get_sms_code")}
                    </button>
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="actions">
                {smsSent ? (
                  <button onClick={handleLogin}>Tasdiqlash</button>
                ) : (
                  <button
                    className={isLoading ? "loading" : ""}
                    onClick={getVerificationCode}
                  >
                    SMS kodni olish
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Authorization;
