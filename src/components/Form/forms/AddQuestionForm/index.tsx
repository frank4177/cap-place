import React, {  useState } from "react";
import Select from "../../formElement/Select";
import {
  IpersonalQuestionsdata,
  selectOptionType,
} from "../../../../types";
import { FormWrapper } from "../../../Layout/FromWrapper";
import InputField from "../../formElement/InputField";
import { bar, close, plus } from "../../../Icons";
import CheckBox from "../../formElement/checkBox";
import Button from "../../../Button";
import { unique_id } from "../../../../utils/uuid";
import { useDispatch } from "react-redux";
import { personalQtnStore } from "../../../../services/redux/features/apiSlice";

const selectOPtionData: selectOptionType[] = [
  { id: "1", title: "Paragraph" },
  { id: "2", title: "Short answer" },
  { id: "3", title: "Yes/No" },
  { id: "4", title: "Dropdown" },
  { id: "5", title: "Multiple choice" },
  { id: "6", title: "Date" },
  { id: "7", title: "Number" },
  { id: "8", title: "File upload" },
  { id: "9", title: "Video question" },
];
interface questionProp {
  setIsAddquestionMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuestion = ({ setIsAddquestionMode }: questionProp) => {
  const dispatch = useDispatch();

  const [choices, setChoices] = useState([""]);
  const [error, setError] = useState<string>("");
  const [selectedQuestionType, setselectedQuestionType] =
    useState<selectOptionType>();
  const [inputdata, setInputData] = useState<IpersonalQuestionsdata>({
    question: "",
    maxChoice: 0,
  });
  const [checkBoxData, setCheckBoxData] = useState<IpersonalQuestionsdata>({
    disqualify: false,
    other: false,
  });

  // HANDLE CHANGE FOR SELECT QUESTION
  const handleSelectChange = (param: selectOptionType) => {
    setselectedQuestionType(param);
    setInputData({ question: "", maxChoice: 0 });
    setCheckBoxData({ disqualify: false, other: false });
    setChoices([""]);
  };

  // HANDLE CHANGE FOR CHOICES
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const list = [...choices];
    list[index] = value;
    setChoices(list);
  };


  // HANDLE ADD CHOICES
  const handleAddChoice = () => {
    setChoices((current) => [...current, ""]);
  };

  // HANDLE REMOVE CHOICE
  const handleRemoveChoice = (index: number) => {
    console.log(index);
    const list = [...choices];
    list.splice(index, 1);
    setChoices(list);
  };

  // HANDLE CHANGE FOR INPUT FIELDS
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dat = { ...inputdata };
    const { name, value } = e.target;
    dat[name] = value;
    setInputData(dat);
  };

  // HANDLE CHANGE FOR CHECKBOXES
  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log(name);
    const dat = { ...checkBoxData };
    dat[name] = checked;
    setCheckBoxData(dat);
  };

  // HANDLE SAVE DATA
  const handleSave = () => {
    if (selectOPtionData) {
      dispatch(personalQtnStore({
        id: unique_id,
        type: selectedQuestionType?.title,
        question: inputdata?.question,
        choices: choices,
        maxChoice: inputdata?.maxChoice,
        disqualify: checkBoxData?.disqualify,
        other: checkBoxData?.other,
      }));
       setTimeout(() => {
        setIsAddquestionMode?.(false);
      }, 50);
    }else{
      setError("please select a question")
    }

    
  };


  return (
    <>
      <FormWrapper title="Questions">
        <div className="flex flex-col gap-5">
          {/* SELECT QUESTION TYPE */}
          <Select
            options={selectOPtionData}
            handleChange={handleSelectChange}
            placeHolder="Select"
            title="Type"
          />

          {/* QUESTION BOX */}
          <InputField
            border={true}
            title="Question"
            placeHolder="Type here"
            handleChange={handleInputs}
            name="question"
          />

          {/* CHOICE */}
          {selectedQuestionType?.title === "Multiple choice" ||
          selectedQuestionType?.title === "Dropdown" ? (
            <div className="w-full mt-3">
              <p className="text-[13px] ml-7">Choice</p>
              <div className="flex flex-row gap-3">
                <div className="flex flex-col w-full gap-4">
                  {choices.map((item, index) => (
                    <div
                      className="flex flex-row items-center gap-3"
                      key={index}
                    >
                      {choices.length > 1 ? (
                        <span
                          onClick={() => handleRemoveChoice(index)}
                          className="border-[2px] w-4 border-black cursor-pointer"
                        ></span>
                      ) : (
                        <img src={bar} alt="icon" className="w-4 h-3" />
                      )}
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          placeholder="Type here"
                          name="question"
                          className={`outline-none text-[12px] h-9 border-black rounded-[3px] px-1 box-border border-[1px]`}
                          required
                          onChange={(e) => handleChange(e, index)}
                          value={item}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <img
                  src={plus}
                  alt="icon"
                  className="w-3 h-3 mt-3 cursor-pointer"
                  onClick={() => handleAddChoice()}
                />
              </div>
            </div>
          ) : null}

          {/* MAX CHOICE */}
          {selectedQuestionType?.title === "Multiple choice" ? (
            <InputField
              border={true}
              title="Max choice allowed"
              placeHolder="Enter number of choice allowed here"
              type="number"
              handleChange={handleInputs}
              name="maxChoice"
            />
          ) : null}

          {/* CHECKBOX ENABLE OTHER OPTIONS */}
          {selectedQuestionType?.title === "Multiple choice" ||
          selectedQuestionType?.title === "Dropdown" ? (
            <div className="mt-3">
              <CheckBox
                label="Enable “Other” option "
                handleChange={handleCheckboxes}
                item={{ name: "other" }}
                checked={checkBoxData?.other}
              />
            </div>
          ) : null}

          {/* CHECKBOX DISQUALIFY */}
          {selectedQuestionType?.title === "Yes/No" ? (
            <div className="mt-3">
              <CheckBox
                label="Disqualify candidate if the answer is no"
                handleChange={handleCheckboxes}
                item={{ name: "disqualify" }}
                checked={checkBoxData?.disqualify}
              />
            </div>
          ) : null}

          {/* DELETE AND SAVE BUTTON */}
          <div className="flex flex-row justify-between items-center">
            <div
              className="flex flex-row items-center gap-3 mt-3 cursor-pointer"
              onClick={() => setIsAddquestionMode?.(false)}
            >
              <img
                src={close}
                alt="close icon"
                className="w-5 h-5 cursor-pointer"
              />
              <p className="text-[11px] font-bold text-[#A80000]">
                Delete question
              </p>
            </div>

            {/* SAVE */}
            <Button handleClick={handleSave} />
          </div>
          {!selectedQuestionType ? (
            <span className="text-pink-600">{error}</span>
          ) : null}
        </div>
      </FormWrapper>
    </>
  );
};

export default AddQuestion;
