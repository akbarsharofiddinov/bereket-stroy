import { useAppDispatch } from "@/store/hooks";
import { setAuthModal, setToken } from "@/store/projectSlice";
import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Login: React.FC<{
  setLoginType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setLoginType }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [phone, setPhone] = React.useState("");
  const [phoneValidation, setPhoneValidation] = React.useState(false);

  const [sms, setSms] = React.useState("");

  const [timerStart, setTimerStart] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(120);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  function startTimer() {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 1) clearInterval(timer);
  }

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
            type: "success",
          });
          setTimerStart(true);
          startTimer();
        }
      } catch (error: any) {
        toast("Telefon raqam tizimda mavjud emas", { type: "error" });
        setIsLoading(false);
      }
    } else {
      toast("Iltimos telefon raqamingizni kiriting", { type: "error" });
      setPhoneValidation(true);
      setIsLoading(false);
    }
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
        dispatch(setAuthModal(false));
        localStorage.setItem("bereket_token", response.data.token);
        dispatch(setToken(response.data.token));
      }
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message, { type: "error" });
    }
  }

  return (
    <div className="login-modal" onClick={() => dispatch(setAuthModal(false))}>
      <div className="inner" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h2 className="title">{t("login_title")}</h2>

          <div className="inner-form">
            <div
              className={phoneValidation ? "phone-input error" : "phone-input"}
            >
              <span>+998</span>
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="off"
                placeholder="00 000 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

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
              {timerStart ? (
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
                      getVerificationCode();
                    }
                  }}
                  className={isLoading && timeLeft > 0 ? "loading" : ""}
                >
                  {t("get_sms_code")}
                </button>
              )}
            </div>
          </div>

          <div className="actions">
            <button
              onClick={() => {
                if (sms) handleLogin();
              }}
              className={isLoading ? "loading" : ""}
            >
              {t("login")}
            </button>
            <button onClick={() => setLoginType("signup")}>
              Ro‘yhatdan o‘tish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
