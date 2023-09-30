import React from "react";
import { IFormOptionType } from "../../../../types";

interface checkboxProp{
  label?: string
  item?: IFormOptionType
  checked?:boolean
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>, label?: string) => void
}

const CheckBox = ({item, label, checked, handleChange} : checkboxProp) => {


  return (
    <>
    <div className="flex flex-row items-center gap-3">
    <input checked={checked} name={item?.name} type="checkbox" className="accent-[#087B2F] h-4 w-4" onChange={(e)=> handleChange?.(e, label)} required/>
    <span className="text-[12px]">{label}</span>
    </div>
      
    </>
  );
};

export default CheckBox;
