import { FormWrapper } from "../../../Layout/FromWrapper";
import FileUpload from "../../formElement/fileUpload";

interface props{
  image?: string | undefined
  setImage?:React.Dispatch<React.SetStateAction<string | undefined>>
}

const UploadCoverImageForm = ({ setImage}: props) => {


  return (
    <>
      <div>
        <FormWrapper title="Upload cover image">
          <FileUpload setImage={setImage}/>
        </FormWrapper>
      </div>
    </>
  );
};

export default UploadCoverImageForm;
