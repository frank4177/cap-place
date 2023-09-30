import { useState } from "react";
import InputField from "../../formElement/InputField";
import AddQuestion from "../AddQuestionForm";
import { FormWrapper } from "../../../Layout/FromWrapper";
import { plus } from "../../../Icons";
import { optionData } from "../../../../utils/contants/data";
import CheckBox from "../../formElement/checkBox";
import Switch from "../../formElement/Switch";
import {
  IpersonalQuestionsdata,
  UserInformation,
  selectOptionType,
} from "../../../../types";
import ViewAddedQuestion from "../ViewAddedQuestion";


interface props{
  personalInformationData?: UserInformation | undefined
  setPersonalInformationData?: React.Dispatch<React.SetStateAction<UserInformation>> | undefined
}

const PersonalInformationForm = ({personalInformationData, setPersonalInformationData} :props) => {
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
  const [questionID, setQuestionID] = useState<string | undefined>();


  console.log("hyyy:", personalInformationData);

  // HANDLE SWITCH AND CHECKBOXES
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    label?: string
  ) => {
    const { name, value, type, checked } = event.target;
    setPersonalInformationData?.((prevData: any) => {
      if (type === "checkbox" && label === "Internal") {
        return {
          ...prevData,
          [name]: {
            ...prevData[name],
            internalUse: checked,
          },
        };
      } else if (type === "checkbox") {
        return {
          ...prevData,
          [name]: {
            ...prevData[name],
            show: checked,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  // HANDLE CHANGE FOR SELECT QUESTION
  const handleSelectChange = (param: selectOptionType) => {
    setselectedQuestionType(param);
    setInputData({ question: "", maxChoice: 0 });
    setCheckBoxData({ disqualify: false, other: false });
    setChoices([""]);
  };

  const handleAddQuestion = () => {
    setselectedQuestionType(Object);
    setInputData({ question: "", maxChoice: 0 });
    setCheckBoxData({ disqualify: false, other: false });
    setChoices([""]);
    setIsAddquestionMode(true);
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
        const data = { ...personalInformationData };
        const id = Math.random()

          const add:IpersonalQuestionsdata = {
            id: `${id}`,
            type: selectedQuestionType?.title,
            question: inputdata?.question,
            choices: choices,
            maxChoice: inputdata?.maxChoice,
            disqualify: checkBoxData?.disqualify,
            other: checkBoxData?.other,
          } 

          personalInformationData?.personalQuestions?.push(add);
        
        setPersonalInformationData?.(data);

        // Delay and hide form
        setTimeout(() => {
          setIsAddquestionMode?.(false);
        }, 50);
      } else {
        // ELSE IF IN EDIT MODE EDIT
        const data = { ...personalInformationData };
        const id = Math.random()

       const lo = personalInformationData?.personalQuestions?.map(
          (item: IpersonalQuestionsdata) => {
            return item.id === questionID
              ? {
                  ...item,
                  id: `${id}`,
                  type: selectedQuestionType?.title,
                  question: inputdata?.question,
                  choices: choices,
                  maxChoice: inputdata?.maxChoice,
                  disqualify: checkBoxData?.disqualify,
                  other: checkBoxData?.other,
                }
              : item;
          }
        );

        data["personalQuestions"] = lo
        
        setPersonalInformationData?.(data);

        // Delay and hide form
        setTimeout(() => {
          setIsEditquestionMode?.(false);
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
      const data = { ...personalInformationData };
      const deleteInfo = personalInformationData?.personalQuestions?.filter(
        (item: any) => {
          return item.id !== questionID;
        }
      );
      data["personalQuestions"] = deleteInfo;
      setPersonalInformationData?.(data);
      setQuestionID?.("");
    }
  };

  return (
    <>
      <div>
        <div>
          <FormWrapper title="Personal Information">
            <InputField
              title="First Name"
              name="firstName"
              placeHolder="Type here"
              handleChange={handleChange}
            />
            <hr />
            <InputField
              title="Last Name"
              name="lastName"
              placeHolder="Type here"
              handleChange={handleChange}
            />
            <hr />
            <InputField
              title="Email"
              name="emailId"
              type="email"
              placeHolder="Type here"
              handleChange={handleChange}
            />
            <hr />

            {/* CHECK BOX AND SWITCH FIELD */}
            {optionData.map((item) => (
              <div key={item.name} className="mb-6">
                <div className="flex flex-row justify-between items-center h-[50px]">
                  <p className="text-[14px] font-bold">
                    {item?.title}{" "}
                    <span className="text-[11px] font-normal">
                      {item?.hint}
                    </span>
                  </p>
                  <div className="max-w-[200px] w-full flex flex-row justify-between items-center">
                    <CheckBox
                      label={item?.label}
                      item={item}
                      handleChange={handleChange}
                    />
                    <Switch item={item} handleChange={handleChange} />
                  </div>
                </div>
                <hr />
              </div>
            ))}

            {/* ADD QUESTION BUTTON */}
            {!isAddquestionMode ? (
              <div
                className="flex flex-row items-center gap-3 cursor-pointer w-fit my-5"
                onClick={() => handleAddQuestion()}
              >
                <img src={plus} alt="plus icon" className="h-5 w-5" />
                <span className="text-[14px]">Add a question</span>
              </div>
            ) : null}

            {isAddquestionMode ? (
              <AddQuestion
                choices={choices}
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
              {personalInformationData?.personalQuestions?.map(
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
        </div>
      </div>
    </>
  );
};

export default PersonalInformationForm;
