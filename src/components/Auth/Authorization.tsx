import { useAppDispatch } from "@/store/hooks";
import {
  setAuthorization,
  setProfileInfo,
  setToken,
} from "@/store/projectSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Authorization: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sms, setSms] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [userName, setUsername] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [timerActive, setTimerActive] = useState(false);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerActive, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 9) setPhone(value);
  };

  const getVerificationCode = async () => {
    if (!phone) {
      toast("Iltimos, telefon raqamingizni kiriting", { type: "error" });
      setPhoneValidation(true);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("name", userName);
    try {
      const response = await axios.post(
        "https://bereket.webclub.uz/api/login",
        formData
      );
      if (response.status === 200) {
        toast(`Tasdiqlash kodi ${phone} raqamiga yuborildi`, { type: "info" });
        setSmsSent(true);
        setTimerActive(true);
        setTimeLeft(120);
      }

      
    } catch (error: any) {
      console.log(error)
      toast(error.response?.data?.message?.ru || "Xatolik yuz berdi", {
        type: "warning",
      });
      if(error.status === 429) setSmsSent(true)
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
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
        dispatch(setAuthorization(false));
        dispatch(setProfileInfo(response.data.customer));
        if (location.pathname.includes("cart")) navigate("/checkout");
      }
    } catch (error: any) {
      toast(error.response?.data?.message || "Kirishda xatolik yuz berdi", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="auth-modal login-modal"
      onClick={() => {
        dispatch(setAuthorization(false))
        setSmsSent(false)
      }}
    >
      <div className="inner" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h2 className="title">{t("login_title")}</h2>
          <div className="inner-form">
            <div className={`phone-input ${phoneValidation ? "error" : ""}`}>
              <span>+998</span>
              <input
                type="text"
                name="phone"
                placeholder="00 000 00 00"
                value={phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="username-input">
              <input
                type="text"
                name="username"
                placeholder="Ismingiz"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {smsSent && (
              <div className="sms-input">
                <input
                  type="text"
                  name="sms"
                  placeholder={t("sms_code")}
                  value={sms}
                  onChange={(e) => setSms(e.target.value)}
                />
                {timerActive && timeLeft > 0 ? (
                  <p className="desc">
                    Agar kod kelmasa, siz {timeLeft} soniyadan so'ng yangi kod
                    olishingiz mumkin
                  </p>
                ) : (
                  <button onClick={getVerificationCode} disabled={isLoading}>
                    {t("get_sms_code")}
                  </button>
                )}
              </div>
            )}
            <div className="actions">
              {smsSent ? (
                <button onClick={handleLogin} disabled={isLoading}>
                  Tasdiqlash
                </button>
              ) : (
                <button onClick={getVerificationCode} disabled={isLoading}>
                  SMS kodni olish
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authorization;
