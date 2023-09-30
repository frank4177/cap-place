import Layout from "../../components/Layout";
import StageTracker from "../../components/StageTracker";
import PersonalInformationForm from "../../components/Form/forms/PersonalInformationForm";
import UploadCoverImageForm from "../../components/Form/forms/UploadCoverImageForm";
import ProfileForm from "../../components/Form/forms/ProfileForm";
// import { useState } from "react";

const ApplicationPage = () => {
  // const [payload, setPayload] = useState({
  //   data: {
  //     id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  //     type: "applicationForm",
  //     attributes: {
  //       coverImage: "http://example.com",
  //       personalInformation: {},
  //       profile: {
  //         education: {
  //           mandatory: true,
  //           show: true,
  //         },
  //         experience: {
  //           mandatory: true,
  //           show: true,
  //         },
  //         resume: {
  //           mandatory: true,
  //           show: true,
  //         },
  //         profileQuestions: [
  //           {
  //             id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  //             type: "Paragraph",
  //             question: "string",
  //             choices: ["string"],
  //             maxChoice: 0,
  //             disqualify: false,
  //             other: false,
  //           },
  //         ],
  //       },
  //       customisedQuestions: [
  //         {
  //           id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  //           type: "Paragraph",
  //           question: "string",
  //           choices: ["string"],
  //           maxChoice: 0,
  //           disqualify: false,
  //           other: false,
  //         },
  //       ],
  //     },
  //   },
  // });


  return (
    <>
      <Layout>
        <div>
          <div className="flex flex-col justify-center h-[220px]">
            <StageTracker />
          </div>
          <div className="flex flex-col gap-20 px-10 py-[100px]">
          <UploadCoverImageForm />
          <PersonalInformationForm />
          <ProfileForm />
          </div>
         
        </div>
      </Layout>
    </>
  );
};

export default ApplicationPage;
