import { IpersonalQuestionsdata } from "../../../../types";
import { edit } from "../../../Icons";

interface viewProp{
    item?: IpersonalQuestionsdata
    setIsEditquestionMode?: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestionID?: React.Dispatch<React.SetStateAction<string | undefined>>
    questionID?: string | undefined
}


const ViewAddedQuestion = ({item, setIsEditquestionMode, setQuestionID, questionID}: viewProp) => {

  const handleEdit = (param: string | undefined)=>{
    setIsEditquestionMode?.(true)
    setQuestionID?.(param)
  }
  return (
    <>
      <div>
        <p className="text-[12px] mb-1 text-gray-500">{item?.type}</p>
        <div className="flex flex-row justify-between gap-3 mb-2">
          <p className="text-[14px] font-bold">
            {item?.question}
          </p>
          {questionID !== item?.id ? <img src={edit} alt="edit" className="w-4 h-4 cursor-pointer" onClick={()=> handleEdit(item?.id)}/> : null}
        </div>
        <hr />
      </div>
    </>
  );
};

export default ViewAddedQuestion;
