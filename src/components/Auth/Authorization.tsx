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

interface IProps {
  propUsername?: string;
  propPhone?: string;
}

const Authorization: React.FC<IProps> = ({ propPhone, propUsername }) => {
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
  const { t, i18n } = useTranslation();
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

  const getVerificationCodeProps = async () => {

    console.log(propPhone, propUsername)

    // if (propPhone && propUsername) {
    const formData = new FormData();
    formData.append("phone", propPhone!);
    formData.append("name", propUsername!);

    try {
      const response = await axios.post("https://bereket.webclub.uz/api/login", formData);
      if (response.status === 200) {
        toast(`${t('varification_code')} ${phone} ${t('sent_to_the_number')}`, { type: "info" });
        setSmsSent(true);
        setTimerActive(true);
        setTimeLeft(120);
      }
    } catch (error: any) {
      toast(error.response.data.message[`${i18n.language}`], { type: "error" })
    }

  }

  const getVerificationCode = async () => {

    if (!phone) {
      toast(t('place_enter_your_number'), { type: "error" });
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
        toast(`${t('varification_code')} ${phone} ${t('sent_to_the_number')}`, { type: "info" });
        setSmsSent(true);
        setTimerActive(true);
        setTimeLeft(120);
      }


    } catch (error: any) {
      console.log(error)
      toast(error.response?.data?.message?.[i18n.language] || t('an_error_occured'), {
        type: "warning",
      });
      if (error.status === 429) setSmsSent(true)
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
        toast(t('login_success'), { type: "success" });
        localStorage.setItem("bereket_token", response.data.token);
        dispatch(setToken(response.data.token));
        dispatch(setAuthorization(false));
        dispatch(setProfileInfo(response.data.customer));
        if (location.pathname.includes("cart")) navigate("/checkout");
        window.location.reload()
      }
    } catch (error: any) {
      toast(error.response?.data?.message || t('an_error_occured'), {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    getVerificationCodeProps();
    if (propPhone && propUsername) {
      setPhone(propPhone);
      setUsername(propUsername)
    }
  }, [propPhone, propUsername]);

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
                placeholder={t('your_name')}
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
                    {t('if_code_didnt_come')}, {t('you')} {timeLeft} {t('try_later')}
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
                  {t('confirm')}
                </button>
              ) : (
                <button onClick={getVerificationCode} disabled={isLoading}>
                  {t('get_sms_code')}
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
