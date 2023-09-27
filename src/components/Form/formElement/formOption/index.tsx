import { IFormOptionType } from "../../../../types";
import Switch from "../Switch";
import CheckBox from "../checkBox";

interface IoptionProp {
  item?: IFormOptionType;
}

const FormOption = ({item}: IoptionProp) => {

  return (
    <>
      <div className="flex flex-row justify-between items-center h-[50px]">
        <p className="text-[14px] font-bold">
          {item?.title} <span className="text-[11px] font-normal">{item?.hint}</span>
        </p>
        <div className="max-w-[200px] w-full flex flex-row justify-between items-center">
          <CheckBox label={item?.label}/>
          <Switch />
        </div>
      </div>
    </>
  );
};

export default FormOption;
