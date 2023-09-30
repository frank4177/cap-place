import React from "react";
import Select from "../../formElement/Select";
import { IpersonalQuestionsdata, selectOptionType } from "../../../../types";
import { FormWrapper } from "../../../Layout/FromWrapper";
import InputField from "../../formElement/InputField";
import { bar, close, plus } from "../../../Icons";
import CheckBox from "../../formElement/checkBox";
import Button from "../../../Button";
// import { unique_id } from "../../../../utils/uuid";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../services/redux/store";

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

  choices?: string[];
  error?: string;
  selectedQuestionType?: selectOptionType | undefined
  checkBoxData?: IpersonalQuestionsdata
  handleSelectChange?: (param: selectOptionType) => void
  handleChoiceChange?: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleAddChoice?: () => void
  handleRemoveChoice?: (index: number) => void
  handleInputs?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckboxes?:  (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSave?: (e: React.FormEvent<HTMLFormElement>) => void
  handleDeleteQesution?: () => void
}

const AddQuestion = ({
  choices,
  error,
  selectedQuestionType,
  checkBoxData,
  handleSelectChange,
  handleChoiceChange,
  handleAddChoice,
  handleRemoveChoice,
  handleInputs,
  handleCheckboxes,
  handleSave,
  handleDeleteQesution
}: questionProp) => {


  return (
    <>
      <FormWrapper title="Questions">
        <form className="flex flex-col gap-5" onSubmit={(e) => handleSave?.(e)}>
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
                  {choices?.map((item, index) => (
                    <div
                      className="flex flex-row items-center gap-3"
                      key={index}
                    >
                      {choices?.length > 1 ? (
                        <span
                          onClick={() => handleRemoveChoice?.(index)}
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
                          onChange={(e) => handleChoiceChange?.(e, index)}
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
                  onClick={() => handleAddChoice?.()}
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
              onClick={() => handleDeleteQesution?.()}
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
            <Button/>
          </div>
          {!selectedQuestionType ? (
            <span className="text-pink-600 text-[12px]">{error}</span>
          ) : null}
        </form>
      </FormWrapper>
    </>
  );
};

export default AddQuestion;
