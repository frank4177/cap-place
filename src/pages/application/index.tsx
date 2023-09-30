import Layout from "../../components/Layout";
import StageTracker from "../../components/StageTracker";
import PersonalInformationForm from "../../components/Form/forms/PersonalInformationForm";
import UploadCoverImageForm from "../../components/Form/forms/UploadCoverImageForm";
import ProfileForm from "../../components/Form/forms/ProfileForm";
import { useSubmitApplication } from "../../hooks/API";
import Button from "../../components/Button";
import { useState } from "react";
import {
  CustomQuestions,
  ProfileInformation,
  UserInformation,
} from "../../types";
// import { useState } from "react";

const ApplicationPage = () => {
  const { sendRequest } = useSubmitApplication();

  const [image, setImage] = useState<string | undefined>()

  const [personalInformationData, setPersonalInformationData] = useState<UserInformation>({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: {
      internalUse: false,
      show: false,
    },
    nationality: {
      internalUse: false,
      show: false,
    },
    currentResidence: {
      internalUse: false,
      show: false,
    },
    idNumber: {
      internalUse: false,
      show: false,
    },
    dateOfBirth: {
      internalUse: false,
      show: false,
    },
    gender: {
      internalUse: false,
      show: false,
    },
    personalQuestions: [],
  });

  // 
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
    profileQuestions: [],
  });

  const [customQuestions, ] = useState<CustomQuestions[]>([]);



  const handleSubmitForm = () => {
    sendRequest({
      data: {
        id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        type: "applicationForm",
        attributes: {
          coverImage: image,
          personalInformation: personalInformationData,
          profile: profile,
          customisedQuestions: customQuestions,
        },
      },
    });

    console.log({
      data: {
        id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        type: "applicationForm",
        attributes: {
          coverImage: image,
          personalInformation: personalInformationData,
          profile: profile,
          customisedQuestions: customQuestions,
        },
      },
    })
  };

  return (
    <>
      <Layout>
        <div>
          <div className="flex flex-col justify-center h-[220px]">
            <StageTracker />
          </div>
          <div className="flex flex-col gap-20 px-10 py-[100px]">
            <UploadCoverImageForm image={image} setImage={setImage}/>
            <PersonalInformationForm
              personalInformationData={personalInformationData}
              setPersonalInformationData={setPersonalInformationData}
            />
            <ProfileForm profile={profile} setprofile={setprofile}/>
            <div className="ml-[20%]">
              <Button title="Submit" handleClick={handleSubmitForm}/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ApplicationPage;
