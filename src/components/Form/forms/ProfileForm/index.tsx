import { FormWrapper } from "../../../Layout/FromWrapper";
import FormOption from "../../formElement/formOption";
import { plus } from "../../../Icons";
import AddQuestion from "../AddQuestionForm";
import { profileOptionData } from "../../../../utils/contants/data";


const ProfileForm = () => {
  return (
    <>
      <FormWrapper title="Profile">
        {profileOptionData.map((item) => (
          <div key={item.name}>
            <FormOption item={item} />
            <hr />
          </div>
        ))}

        {/* ADD QUESTION BUTTON*/}
        <div className="flex flex-row items-center gap-3 cursor-pointer w-fit my-5">
          <img src={plus} alt="plus icon" className="h-5 w-5" />
          <span className="text-[14px]">Add a question</span>
        </div>
        <AddQuestion/>
      </FormWrapper>
    </>
  );
};

export default ProfileForm;
