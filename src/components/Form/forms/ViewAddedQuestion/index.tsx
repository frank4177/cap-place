import { IpersonalQuestionsdata } from "../../../../types";
import { edit } from "../../../Icons";

interface viewProp{
    item?: IpersonalQuestionsdata
}

const ViewAddedQuestion = ({item}: viewProp) => {
  return (
    <>
      <div>
        <p className="text-[12px] mb-1 text-gray-500">{item?.type}</p>
        <div className="flex flex-row justify-between gap-3 mb-2">
          <p className="text-[14px] font-bold">
            {item?.question}
          </p>
          <img src={edit} alt="edit" className="w-4 h-4 cursor-pointer" />
        </div>
        <hr />
      </div>
    </>
  );
};

export default ViewAddedQuestion;
