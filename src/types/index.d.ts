export type IFormOptionType = {
  title?: string;
  hint?: string;
  name?: string;
  label?: string;
};

export type selectOptionType = {
  id: string;
  title: string;
};

type PersonalQuestion = {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
};

export type UserInformation = {
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: {
    internalUse: boolean;
    show: boolean;
  };
  nationality: {
    internalUse: boolean;
    show: boolean;
  };
  currentResidence: {
    internalUse: boolean;
    show: boolean;
  };
  idNumber: {
    internalUse: boolean;
    show: boolean;
  };
  dateOfBirth: {
    internalUse: boolean;
    show: boolean;
  };
  gender: {
    internalUse: boolean;
    show: boolean;
  };
  personalQuestions: PersonalQuestion[];
};

export interface IpersonalQuestionsdata {
  id?: string;
  type?: string;
  question?: string;
  maxChoice?: number;
  disqualify?: boolean;
  other?: boolean;
  [key: string]: any;
}