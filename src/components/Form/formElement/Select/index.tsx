import { useState } from "react";
import styles from "./index.module.css";
import { arrowDown } from "../../../Icons";
import { selectOptionType } from "../../../../types";

interface IselectProp {
  options?: selectOptionType[];
  width?: string;
  placeHolder?: string;
  name?: string;
  title?: string;
  handleChange?: (param: selectOptionType) => void;
}

const Select = (props: IselectProp) => {
  const { options, title, placeHolder, handleChange } = props;
  const [openDrop, setOpenDrop] = useState(false);
  const [selected, setSelected] = useState<string>();

  const handleClick = (param: selectOptionType) => {
    setSelected(param.title);
    handleChange?.(param);
  };

  return (
    <>
      <div>
        <p className="text-[14px] font-bold mb-1">{title}</p>
        <div
          className={styles.dropDown}
          onClick={() => setOpenDrop(!openDrop)}
          onBlur={() => setOpenDrop(false)}
          tabIndex={0}
        >
          <div className={styles.titleWrap}>
            {/* IF AN OPTION HAS BEEN SELECTED, SHOW SELECTED OPTION; ELSE, SHOW PLACEHOLDER  */}
            {selected ? (
              <span className={styles.selectedText}>{selected}</span>
            ) : (
              <span className={styles.titlePlaceholder}>{placeHolder}</span>
            )}
            <img src={arrowDown} alt="arrow icon" className="w-2 h-2" />
          </div>

          {/* MAP THROUGH OPTIONS */}
          {openDrop && (
            <div className={styles.itemsWrap}>
              {options?.map((item) => (
                <div
                  key={item?.id}
                  className={styles.items}
                  onClick={() => handleClick(item)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Select;
