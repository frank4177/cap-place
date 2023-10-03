import { FormWrapper } from "../../../Layout/FromWrapper";
import { plus } from "../../../Icons";
import AddQuestion from "../AddQuestionForm";
import { useState } from "react";
import {
  CustomQuestions,
  IpersonalQuestionsdata,
  selectOptionType,
} from "../../../../types";
import ViewAddedQuestion from "../ViewAddedQuestion";

interface props {
  customQuestions?: CustomQuestions[] | undefined;
  setCustomQuestions?:
    | React.Dispatch<React.SetStateAction<CustomQuestions[] | undefined>>
    | undefined;
}

const AdditionalQuestionForm = ({
  customQuestions,
  setCustomQuestions,
}: props) => {
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

  const [isAddquestionMode, setIsAddquestionMode] = useState<boolean>(false);
  const [isEditquestionMode, setIsEditquestionMode] = useState<boolean>(false);
  const [questionID, setQuestionID] = useState<string>();

  // HANDLE CHANGE FOR SELECT QUESTION
  const handleSelectChange = (param: selectOptionType) => {
    setselectedQuestionType(param);
    setInputData({ question: "", maxChoice: 0 });
    setCheckBoxData({ disqualify: false, other: false });
    setChoices([""]);
  };

  // HANDLE CHANGE FOR CHOICES
  const handleChoiceChange = (
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
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedQuestionType) {
      // IF NOT IN EDIT MODE, SAVE(PUSH TO ARRAY)

      if (!isEditquestionMode) {
        const data = customQuestions;
        const id = Math.random();

        const add: CustomQuestions = {
          id: `${id}`,
          type: selectedQuestionType?.title,
          question: inputdata?.question,
          choices: choices,
          maxChoice: inputdata?.maxChoice,
          disqualify: checkBoxData?.disqualify,
          other: checkBoxData?.other,
        };

        customQuestions?.push(add);

        setCustomQuestions?.(data);

        // Delay and hide form
        setTimeout(() => {
          setIsAddquestionMode?.(false);
        }, 50);
      } else {
        // ELSE IF IN EDIT MODE EDIT

        const lo = customQuestions?.map((item: CustomQuestions) => {
          return item.id === questionID
            ? {
                ...item,
                question: inputdata?.question,
                choices: choices,
                maxChoice: inputdata?.maxChoice,
                disqualify: checkBoxData?.disqualify,
                other: checkBoxData?.other,
              }
            : item;
        });

        setCustomQuestions?.(lo);

        // Delay and hide form
        setTimeout(() => {
          setIsEditquestionMode?.(false);
          setQuestionID("")
        }, 50);
      }
    } else {
      setError("Please select question type and other fields");
    }
  };

  const handleDeleteQesution = () => {
    if (!isEditquestionMode) {
      // IF NOT IN EDIT MODE, CLOSE FORM
      setIsAddquestionMode?.(false);
    } else {
      // ELSE IF IN EDIT MODE, DELETE
      const deleteInfo = customQuestions?.filter((item: CustomQuestions) => {
        return item.id !== questionID;
      });

      setCustomQuestions?.(deleteInfo);
      setTimeout(() => {
        setIsEditquestionMode?.(false);
        setQuestionID("")
      }, 50);
    }
  };

  return (
    <>
      <FormWrapper title="Addtional Questions">
        {/* ADD QUESTION BUTTON */}
        {!isAddquestionMode ? (
          <div
            className="flex flex-row items-center gap-3 cursor-pointer w-fit my-5"
            onClick={() => setIsAddquestionMode(true)}
          >
            <img src={plus} alt="plus icon" className="h-5 w-5" />
            <span className="text-[14px]">Add a question</span>
          </div>
        ) : null}

        {isAddquestionMode ? (
          <AddQuestion
            choices={choices}
            isEditquestionMode={isEditquestionMode}
            selectedQuestionType={selectedQuestionType}
            error={error}
            checkBoxData={checkBoxData}
            handleSelectChange={handleSelectChange}
            handleChoiceChange={handleChoiceChange}
            handleAddChoice={handleAddChoice}
            handleRemoveChoice={handleRemoveChoice}
            handleInputs={handleInputs}
            handleCheckboxes={handleCheckboxes}
            handleSave={handleSave}
            handleDeleteQesution={handleDeleteQesution}
          />
        ) : null}

        <div className="flex flex-col">
          {customQuestions?.map(
            (item: IpersonalQuestionsdata, index: number) => (
              <div key={index}>
                <ViewAddedQuestion
                  item={item}
                  key={index}
                  setIsEditquestionMode={setIsEditquestionMode}
                  setQuestionID={setQuestionID}
                  questionID={questionID}
                />
                {questionID === item.id ? (
                  <AddQuestion
                    choices={choices}
                    isEditquestionMode={isEditquestionMode}
                    selectedQuestionType={selectedQuestionType}
                    error={error}
                    checkBoxData={checkBoxData}
                    handleSelectChange={handleSelectChange}
                    handleChoiceChange={handleChoiceChange}
                    handleAddChoice={handleAddChoice}
                    handleRemoveChoice={handleRemoveChoice}
                    handleInputs={handleInputs}
                    handleCheckboxes={handleCheckboxes}
                    handleSave={handleSave}
                    handleDeleteQesution={handleDeleteQesution}
                  />
                ) : null}
              </div>
            )
          )}
        </div>
      </FormWrapper>
    </>
  );
};

export default AdditionalQuestionForm;
