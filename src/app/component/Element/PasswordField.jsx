import React, { useState } from "react";

function PasswordField({ label, placeholder, value, setValue, error }) {
  let [isVisible, setIsVisible] = useState(false);
  return (
    <div className="flex-column space-y-2 relative">
      <label htmlFor={label} className="capitalize font-rubikMedium">
        {label}
      </label>
      <input
        type={isVisible ? "text" : "password"}
        id={label}
        placeholder={placeholder}
        className={
          (error && error !== ""
            ? "border-red-500 focus:border-red-500 "
            : "focus:border-weave-primary ") +
          "w-full p-2 border border-base-black  focus:outline-none rounded-md font-rubikRegular"
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="absolute right-5 top-7"
        type="button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? (
          <i className="fa fa-eye"></i>
        ) : (
          <i className="fa fa-eye-slash"></i>
        )}
      </button>
      {error && error !== "" && (
        <p className="text-red-400">
          <i className="fa fa-info-circle mr-2"></i>
          {error}
        </p>
      )}
    </div>
  );
}

export default PasswordField;
