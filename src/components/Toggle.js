import React from "react";

const active = "w-16 py-1 bg-white rounded-full font-semibold";
const inActive = "w-16 py-1 text-white";

function Toggle(props) {
  const { title, option1, option2, selected, handleChange } = props;

  return (
    <div className="my-4 md:mt-12">
      <h1 className="text-white">{title}</h1>
      <button className="flex mt-2 p-1 bg-blue-400 rounded-full" onClick={handleChange}>
        <span className={!selected ? active : inActive}>{option1}</span>
        <span className={selected ? active : inActive}>{option2}</span>
      </button>
    </div>
  );
}

export default Toggle;
