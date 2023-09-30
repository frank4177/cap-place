import { request } from "../../config/config";
import { ApplicationForm } from "../../types";

  // APPLY
  export const useSubmitApplication = () => {
    async function sendRequest(arg: ApplicationForm) {

      try {
        const res = await request.put("/817.4093221589212/programs/placeat/application-form", arg);
        console.log(res);
        return res;
      } catch (err) {
        console.log(err)
        return err;
      }
    }
    return {  sendRequest };
  };