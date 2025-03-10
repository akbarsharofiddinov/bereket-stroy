import { useAppSelector } from "@/store/hooks";
import { DatePicker, DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

const PrivateInfo: React.FC = () => {
  // const [birthDay, setBirthDay] = useState<Dayjs | null>(null);
  const [profileInfoState, setProfileInfoState] = useState<
    IProfile | undefined
  >(undefined);

  const [changed, setChanged] = useState(false);

  const { profileInfo } = useAppSelector((state) => state.projectSlice);

  const getChangedFields = (
    oldData: Record<string, any>,
    newData: Record<string, any>
  ) => {
    if (oldData && newData) {
      const changes: Record<string, any> = {};

      Object.keys(newData).forEach((key) => {
        if (oldData[key] !== newData[key]) {
          changes[key] = { oldValue: oldData[key], newValue: newData[key] };
        }
      });

      return changes;
    }
  };

  function handleInputChanges(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "first-name")
      setProfileInfoState((prev) => ({ ...prev!, first_name: value }));
    else if (name === "last-name")
      setProfileInfoState((prev) => ({ ...prev!, last_name: value }));
    else if (name === "phone")
      setProfileInfoState((prev) => ({ ...prev!, phone: value }));
  }

  const handleDatePicker: DatePickerProps<Dayjs>["onChange"] = (
    _,
    dateString
  ) => {
    console.log(dateString);
  };

  useEffect(() => {
    const changedFields = getChangedFields(profileInfo, profileInfoState!);
    if (JSON.stringify(changedFields) === "{}") setChanged(false);
    else setChanged(true);
  }, [profileInfoState]);

  useEffect(() => {
    if (profileInfo) {
      setProfileInfoState({ ...profileInfo });
    }
  }, [profileInfo]);

  return (
    <>
      <div className="private-info">
        <h2 className="title">Shaxsiy ma’lumotlar</h2>

        <div className="inputs-grid">
          <div className="firtName-input_box input-box">
            <input
              type="text"
              name="first-name"
              placeholder="Ismingiz"
              value={profileInfoState?.first_name}
              onChange={(e) => handleInputChanges(e)}
            />
          </div>

          <div className="lastName-input_box input-box">
            <input
              type="text"
              name="last-name"
              placeholder="Familyangiz"
              value={profileInfoState?.last_name}
              onChange={(e) => handleInputChanges(e)}
            />
          </div>

          <div className="phone-input_box input-box">
            <span>+998</span>
            <input
              type="number"
              value={profileInfoState?.phone}
              placeholder="00 000 00 00"
              onChange={(e) => handleInputChanges(e)}
            />
          </div>
          <div className="birthDay-input_box input-box">
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="kk.oo.yyyy"
              onChange={handleDatePicker}
            />
          </div>
        </div>

        <div className="actions">
          <button className="log-out">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
                  stroke="black"
                  stroke-opacity="0.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                  stroke="black"
                  stroke-opacity="0.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Profildan chiqish
          </button>
          {changed ? <button className="save-btn">Saqlash</button> : ""}
        </div>
      </div>
    </>
  );
};

export default PrivateInfo;
