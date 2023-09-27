import React from "react";
import { IFormOptionType } from "../../../../types";

interface checkboxProp{
  label?: string
  item?: IFormOptionType
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>, label?: string) => void
}

const CheckBox = ({item, label, handleChange} : checkboxProp) => {


  return (
    <>
    <div className="flex flex-row items-center gap-3">
    <input name={item?.name} type="checkbox" className="accent-[#087B2F] h-4 w-4" onChange={(e)=> handleChange?.(e, label)}/>
    <span className="text-[12px]">{label}</span>
    </div>
      
    </>
  );
};

export default CheckBox;
