import React, { useState } from "react";

interface IProps {
  label: string;
  id: string;
}

const Checkbox: React.FC<IProps> = ({ label, id }) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <label htmlFor={id} className="checkbox">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="checkmark">
          <span>
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4375 0.652411C15.6297 1.1702 15.3657 1.7457 14.8479 1.93782C13.7962 2.32801 12.6693 3.1399 11.5438 4.21544C10.4286 5.28114 9.3699 6.55194 8.4483 7.7861C7.5287 9.0176 6.7581 10.1958 6.2172 11.0669C5.9276 11.5332 5.6421 12.0027 5.3758 12.4829C5.2011 12.7993 4.8689 12.9976 4.5074 13.0002C4.1459 13.0029 3.8111 12.8103 3.6318 12.4964C2.68252 10.8352 1.89836 10.0873 1.42654 9.757C1.13674 9.5541 0.96606 9.5072 0.92605 9.4976C0.4083 9.4597 0 9.0277 0 8.5003C0 7.948 0.44772 7.5003 1 7.5003C1.56627 7.5042 2.12266 7.803 2.57346 8.1185C3.1234 8.5035 3.767 9.1168 4.4681 10.0925C5.0322 9.1802 5.8541 7.9175 6.8458 6.58946C7.8066 5.30277 8.9391 3.93815 10.1621 2.76948C11.3748 1.61064 12.7332 0.589201 14.1521 0.0627212C14.6699 -0.129389 15.2454 0.134621 15.4375 0.652411Z"
                fill="black"
              />
            </svg>
          </span>
        </div>
        {label && <span className="label">{label}</span>}
      </label>
    </>
  );
};

export default Checkbox;
