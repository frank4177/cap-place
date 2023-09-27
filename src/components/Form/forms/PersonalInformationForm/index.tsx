import {  useState } from "react";
import InputField from "../../formElement/InputField";
import AddQuestion from "../AddQuestionForm";
import { FormWrapper } from "../../../Layout/FromWrapper";
import { plus } from "../../../Icons";
import { optionData } from "../../../../utils/contants/data";
import CheckBox from "../../formElement/checkBox";
import Switch from "../../formElement/Switch";



const PersonalInformationForm = () => {
  const [personalInformationData, setPersonalInformationData] = useState<any>({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: {
      internalUse: false,
      show: true,
    },
    nationality: {
      internalUse: false,
      show: true,
    },
    currentResidence: {
      internalUse: false,
      show: true,
    },
    idNumber: {
      internalUse: false,
      show: true,
    },
    dateOfBirth: {
      internalUse: false,
      show: true,
    },
    gender: {
      internalUse: false,
      show: true,
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

  console.log(personalInformationData);

  // HANDLE INPUT FIELDS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, label?: string) => {
    const { name, value, type, checked } = event.target;
    setPersonalInformationData((prevData: any) => {
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
      }else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  // // HANDLE PERSONAL QUESTION
  //   const handlePersonalQuestion = () => {
  
  //   };

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
              <div key={item.name}>
                <div className="flex flex-row justify-between items-center h-[50px]">
                  <p className="text-[14px] font-bold">
                    {item?.title}{" "}
                    <span className="text-[11px] font-normal">
                      {item?.hint}
                    </span>
                  </p>
                  <div className="max-w-[200px] w-full flex flex-row justify-between items-center">
                    <CheckBox label={item?.label} item={item} handleChange={handleChange}/>
                    <Switch item={item} handleChange={handleChange}/>
                  </div>
                </div>
                <hr />
              </div>
            ))}

            {/* ADD QUESTION BUTTON */}
            <div className="flex flex-row items-center gap-3 cursor-pointer w-fit my-5">
              <img src={plus} alt="plus icon" className="h-5 w-5" />
              <span className="text-[14px]">Add a question</span>
            </div>

            <AddQuestion />
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default PersonalInformationForm;
