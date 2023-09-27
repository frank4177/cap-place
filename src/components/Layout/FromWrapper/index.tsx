import { ReactNode } from "react";


type Props = {
    children: ReactNode;
    title: string;
  };


// Form component layout wrapper
export const FormWrapper = ({ children, title }: Props) => {
    return (
      <div className="shadow-bs max-w-[550px] flex flex-col items-center rounded-[10px] box-border">
        <div className="bg-[#D0F7FA] w-full h-[50px] rounded-t-[10px] flex flex-row items-center pl-[20px] text-[14px] font-bold">
          <p>{title}</p>
        </div>
        <div className="p-[20px] w-full box-border">{children}</div>
      </div>
    );
  };