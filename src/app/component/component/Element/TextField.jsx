"use client";
import React from "react";

function InputField({
  label,
  placeholder,
  value,
  setValue,
  error,
  className,
  disabled,
}) {
  return (
    <div className={`flex-column space-y-2 ${className && className}`}>
      <label htmlFor={label} className="capitalize font-rubikMedium">
        {label}<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        id={label}
        className={
          (error && error !== ""
            ? "border-red-500 focus:border-red-500 "
            : "") +
          `w-full p-2 border border-base-black focus:border-weave-primary focus:outline-none rounded-md font-rubikRegular `
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      {error && error !== "" && <p className="text-red-400">{error}</p>}
    </div>
  );
}

export default InputField;
