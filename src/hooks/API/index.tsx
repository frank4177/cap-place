import { request } from "../../config/config";

  // APPLY
  export const useSubmitApplication = () => {
    async function sendRequest() {

      try {
        const res = await request.post("/kk");
        console.log(res);
        return res;
      } catch (err) {
        console.log(err)
        return err;
      }
    }
    return {  sendRequest };
  };