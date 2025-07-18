import React from "react";

function Button({ title, disabled, onClick, variant }) {
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={
        variant === "inverse"
          ? (disabled ? "bg-[#2853A6]" : "bg-[#2853A6]") +
            " py-2 text-white w-full rounded-md "
          : (disabled ? "bg-[#2853A6]" : "bg-[#2853A6]") +
            " py-2 text-white w-full rounded-md"
      }
      disabled={disabled}
      type="button"
    >
      {title}
    </button>
  );
}

export default Button;