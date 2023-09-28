import { request } from "../../config/config";

  // APPLY
  export const useSubmitApplication = () => {
    async function sendRequest() {

      try {
        const res = await request.post("/kk");
   
        return res;
      } catch (err) {
  
        return err;
      }
    }
    return {  sendRequest };
  };