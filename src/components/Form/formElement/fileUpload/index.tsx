import { useState } from "react";
import { close, upload } from "../../../Icons";

const FileUpload = () => {
  const [preview, setPreview] = useState<any>();
  // const [file, setFile] = useState<File | undefined>(undefined);
  // const [error, setError] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target?.files?.[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
      // setFile(selected);
    } else {
      // setError(true);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    // setFile(undefined);
  };

  return (
    <>
      {preview ? (
        <div className="w-full h-[150px]">
          <img
            src={preview}
            alt="upload"
            className="object-contain w-full h-[130px]"
          />
          <div className="flex flex-row items-center gap-3 mt-3 cursor-pointer" onClick={()=> handleDelete()}>
            <img
              src={close}
              alt="close icon"
              className="w-5 h-5"
              
            />
            <p className="text-[11px] font-bold text-[#A80000]">
              Delete & re-upload
            </p>
          </div>
        </div>
      ) : (
        <>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
          <label htmlFor="file-upload" className="flex flex-row justify-center">
            <div className="border-[1px] p-3 rounded-[5px] border-black border-dotted h-[140px] max-w-[350px] w-full flex flex-col justify-center items-center gap-1 cursor-pointer">
              <img src={upload} alt="upload" className="h-5" />
              <p className="text-[13px] text-center">Upload cover image</p>
              <p className="text-[#979797] text-[11px] text-center">
                6:19 ratio is recommended. Max image size 1mb
              </p>
            </div>
          </label>
        </>
      )}
    </>
  );
};

export default FileUpload;
