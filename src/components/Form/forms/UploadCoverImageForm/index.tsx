import { FormWrapper } from "../../../Layout/FromWrapper";
import FileUpload from "../../formElement/fileUpload";

const UploadCoverImageForm = () => {
  return (
    <>
      <div>
        <FormWrapper title="Upload cover image">
          <FileUpload />
        </FormWrapper>
      </div>
    </>
  );
};

export default UploadCoverImageForm;
