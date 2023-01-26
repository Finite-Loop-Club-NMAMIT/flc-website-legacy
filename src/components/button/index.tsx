import React from "react";

type buttonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<buttonProps> = (props) => {
  return (
    <button
      {...props}
      className="rounded bg-yellow-400 py-2 px-6 font-bold text-white duration-500 hover:scale-[1.03] hover:bg-yellow-300"
    >
      {props.children}
    </button>
  );
};

export default Button;
