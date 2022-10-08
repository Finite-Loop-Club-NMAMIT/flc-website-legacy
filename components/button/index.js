import React from 'react';

const Button = (props) => {
  return (
    <button
      {...props}
      className="bg-yellow-400 font-bold text-white py-2 px-6 rounded hover:bg-yellow-300 duration-500 hover:scale-[1.03]"
    >
      {props.children}
    </button>
  );
};

export default Button;
