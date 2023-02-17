import fetcher from "../../utils/fetcher";
import {
  MANDATORY_FIELD_ERROR,
  MANDATORY_FIELD_SUCCESS,
  MANDATORY_FIELD_START,
} from "../constants/action-types";
import { showMessage } from "./showMessage";

export const mandatoryaction = (payload) => (dispatch) => {
  dispatch({ type: MANDATORY_FIELD_START });
  fetcher({
    method: "POST",
    request: `uploadDocuments`,
    payload,
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: MANDATORY_FIELD_SUCCESS,
        payload: response.data,
      });
      console.log("response", response.data);
      if (
        response.data.status === true || response.data.statusCode === '200' ||
        response.data.status === "SUCCESS"
      ){
        dispatch(
          showMessage({
            title: "Document Saved Succesfully.",
            variant: "success",
          })
        );
        
      }else if(response.data.statusCode===400){
        dispatch(
          showMessage({
            title: response.data.message,
            variant: "error",
          }));
      }
    })
    .catch((error) => {
      dispatch({
        type: MANDATORY_FIELD_ERROR,
        payload: error,
      });
    });
};
