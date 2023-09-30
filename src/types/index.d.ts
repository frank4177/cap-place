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


export interface IpersonalQuestionsdata {
  id?: string;
  type?: string;
  question?: string | undefined;
  choices?: string[];
  maxChoice?: number | undefined;
  disqualify?: boolean | undefined;
  other?: boolean | undefined;
  [key: string]: any;
}

export type UserInformation = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  emailId?: string | undefined;
  phoneNumber?: {
    internalUse: boolean;
    show: boolean;
  } | undefined;
  nationality?: {
    internalUse: boolean;
    show: boolean;
  } | undefined;
  currentResidence?: {
    internalUse: boolean;
    show: boolean;
  } | undefined;
  idNumber?: {
    internalUse: boolean;
    show: boolean;
  } | undefined;
  dateOfBirth?: {
    internalUse: boolean;
    show: boolean;
  } | undefined;
  gender?: {
    internalUse: boolean;
    show: boolean;
  } | undefined;
  personalQuestions?: IpersonalQuestionsdata[] | undefined;
};


export type ProfileInformation = {
  education?: {
    mandatory: boolean;
    show: boolean;
  } | undefined;
  experience?: {
    mandatory: boolean,
    show: boolean,
  } | undefined;
  resume?: {
    mandatory: boolean,
    show: boolean,
  } | undefined;
  profileQuestions?: IpersonalQuestionsdata[] | undefined;
};

export type CustomQuestions ={
    id: string;
    type: string;
    question: string;
    choices: string[];
    maxChoice: number;
    disqualify: boolean;
    other: boolean;
  
}

export type ApplicationForm = {
  data?: {
    id?: string;
    type: string;
    attributes: {
      coverImage: string | undefined;
      personalInformation: UserInformation;
      profile: ProfileInformation;
      customisedQuestions:CustomQuestions[] ;
    };
  };
};