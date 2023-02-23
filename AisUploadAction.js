import fetcher from "../../utils/fetcher";
import {
  AIS_UPLOAD_ERROR,
  AIS_UPLOAD_START,
  AIS_UPLOAD_SUCCESS
} from "../constants/action-types";
import { showMessage } from "./showMessage";


export const upploadAISdocs = (payload) => (dispatch) => {
  dispatch({ type: AIS_UPLOAD_START });
  fetcher({
    method: "POST",
    request: `save-docs`,
    payload,
   
  })
  .then((response) => {
   
    console.log("response1",response.data);
    dispatch({
      type: AIS_UPLOAD_SUCCESS,
      payload: response.data,
    });
    console.log("response",response.data)
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
    else if(response.data.statusCode===204){
      dispatch(
        showMessage({
          title: "Files limit exceeded",
          variant: "error",
        }));
    }
  })
    .catch((error) => {
      dispatch({
        type: AIS_UPLOAD_ERROR,
        payload: error,
      });
      dispatch(
        showMessage({
          title: error.data.message,
          variant: "error",
        }));
    });
};