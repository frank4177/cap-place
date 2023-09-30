import { FormWrapper } from "../../../Layout/FromWrapper";
import { plus } from "../../../Icons";
import AddQuestion from "../AddQuestionForm";
import { profileOptionData } from "../../../../utils/contants/data";
import CheckBox from "../../formElement/checkBox";
import Switch from "../../formElement/Switch";
import { useState } from "react";
import { IpersonalQuestionsdata, ProfileInformation, selectOptionType } from "../../../../types";
import ViewAddedQuestion from "../ViewAddedQuestion";

const ProfileForm = () => {
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
  const [perso, setPerso] = useState<undefined | IpersonalQuestionsdata[]>([]);
  const [questionID, setQuestionID] = useState<number>();
  const [profile, setprofile] = useState<ProfileInformation>({
    education: {
      mandatory: false,
      show: false,
    },
    experience: {
      mandatory: false,
      show: false,
    },
    resume: {
      mandatory: false,
      show: false,
    },
    personalQuestions: [
      {
        id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        type: "Paragraph",
        question: "string",
        choices: ["string"],
        maxChoice: 0,
        disqualify: false,
        other: false,
      },
    ],
  });

  console.log(profile);

  // HANDLE INPUT FIELDS
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    label?: string
  ) => {
    const { name, value, type, checked } = event.target;
    setprofile((prevData: any) => {
      if (type === "checkbox" && label === "Mandatory") {
        return {
          ...prevData,
          [name]: {
            ...prevData[name],
            mandatory: checked,
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
      if (!isEditquestionMode) {
        const lo = (current: any) => [
          ...current,
          {
            id: Math.random(),
            type: selectedQuestionType?.title,
            question: inputdata?.question,
            choices: choices,
            maxChoice: inputdata?.maxChoice,
            disqualify: checkBoxData?.disqualify,
            other: checkBoxData?.other,
          },
        ];

        setTimeout(() => {
          setIsAddquestionMode?.(false);
        }, 50);

        setPerso?.(lo);
      } else {
        // setError("please select a question")
        setPerso?.(
          perso?.map((item: IpersonalQuestionsdata) => {
            return item.id === questionID
              ? {
                  ...item,
                  id: Math.random(),
                  type: selectedQuestionType?.title,
                  question: inputdata?.question,
                  choices: choices,
                  maxChoice: inputdata?.maxChoice,
                  disqualify: checkBoxData?.disqualify,
                  other: checkBoxData?.other,
                }
              : item;
          })
        );
        setTimeout(() => {
          setIsEditquestionMode?.(false);
        }, 50);
        // setselectedQuestionType(Object)
      }
    } else {
      setError("Please select question type and other fields");
    }
  };

  const handleDeleteQesution = () => {
    if (!isEditquestionMode) {
      setIsAddquestionMode?.(false);
    } else {
      // setIsEditquestionMode?.(false)
      const findid = perso?.filter((item: any) => {
        return item.id !== questionID;
      });
      setPerso?.(findid);
      setQuestionID?.(0);
    }
  };

  return (
    <>
      <FormWrapper title="Profile">

        {/* CHECK BOX AND SWITCH FIELD */}
        {profileOptionData.map((item) => (
          <div key={item.name} className="mb-6">
            <div className="flex flex-row justify-between items-center h-[50px]">
              <p className="text-[14px] font-bold">
                {item?.title}{" "}
                {/* <span className="text-[11px] font-normal">{item?.hint}</span> */}
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
            onClick={() => setIsAddquestionMode(true)}
          >
            <img src={plus} alt="plus icon" className="h-5 w-5" />
            <span className="text-[14px]">Add a question</span>
          </div>
        ) : null}

        {isAddquestionMode ? (
          <AddQuestion
            choices={choices}
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
          {perso?.map((item: IpersonalQuestionsdata, index: number) => (
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
          ))}
        </div>
      </FormWrapper>
    </>
  );
};

export default ProfileForm;
