import React from "react";

type buttonProps = {
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<buttonProps> = (props) => {
  return (
    <button
      {...props}
      className={`rounded-full bg-yellow-400 px-6 py-2 font-bold text-white duration-500 hover:bg-yellow-300 ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
