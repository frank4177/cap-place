import React, { useState } from "react";
import styles from "./index.module.css";
import { IFormOptionType } from "../../../../types";

interface checkboxProp{
  label?: string
  item?: IFormOptionType
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Switch = ({item,handleChange} : checkboxProp) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setIsShow(e.target.checked)
    handleChange?.(e)
  }


  return (
    <>
      <div className="flex flex-row items-center gap-3">
        <label className={styles.switch}>
          <input name={item?.name} type="checkbox" onChange={(e)=> onChange(e)}/>
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <span className="text-[12px]">{isShow ? "Show": "Hide"}</span>
      </div>
    </>
  );
};

export default Switch;
