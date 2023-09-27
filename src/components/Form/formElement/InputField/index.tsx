import React from "react";

interface IinputProp {
  item?: string
  title?: string;
  name?: string;
  border?: boolean;
  placeHolder?: string;
  index?: number | undefined | any
  type?: string
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = (prop: IinputProp) => {
  const { title, border, placeHolder, item, type,name, handleChange } = prop;

  const borderr = border ? "border-[1px]" : null;

  return (
    <>
      <div className="flex flex-col w-full">
        <p className="text-[14px] font-bold mb-1">{title}</p>
        <input
          type={type ? type : "text"}
          placeholder={placeHolder}
          name={name}
          className={`outline-none text-[12px] h-9 border-black rounded-[3px] px-1 box-border ${borderr}`}
          required
          onChange={(e)=> handleChange?.(e)}
          value={item}
        />
      </div>
    </>
  );
};

export default InputField;
