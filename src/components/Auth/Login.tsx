import { useAppDispatch } from "@/store/hooks";
import { setAuthModal } from "@/store/projectSlice";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC<{
  setLoginType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setLoginType }) => {
  const [isIllegal, setIsIllegal] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [sms, setSms] = React.useState("");

  const dispatch = useAppDispatch();

  async function getVerificationCode() {
    const formData = new FormData();
    formData.append("is_legal", isIllegal ? "1" : "0");
    formData.append("phone", phone);
    try {
      const response = await axios.post(
        "https://bereket.webclub.uz/api/login",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogin() {
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
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-modal" onClick={() => dispatch(setAuthModal(false))}>
      <div className="inner" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h2 className="title">Tizimga kirish</h2>
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

          <div className="inner-form">
            {isIllegal ? (
              <div className="inn-input">
                <span>*</span>
                <input type="text" name="inn" id="inn" placeholder="INN" />
              </div>
            ) : (
              ""
            )}
            <div className="phone-input">
              <span>+998</span>
              <input
                type="text"
                name="phone"
                id="phone"
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
                placeholder="SMS kod"
                value={sms}
                onChange={(e) => setSms(e.target.value)}
              />
              <Link to={""} onClick={getVerificationCode}>
                Tasdiqlash kodni olish
              </Link>
            </div>
          </div>

          <div className="actions">
            <button onClick={handleLogin}>Tizimga kirish</button>
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
