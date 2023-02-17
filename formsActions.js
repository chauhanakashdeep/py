
import fetcher from "../../utils/fetcher";
import {
    GET_INITIATE_APP_ERROR,
    GET_INITIATE_APP_SUCCESS,
    GET_INITIATE_APP_START,
} from "../constants/action-types";
import { showMessage } from "./showMessage";

export const getHospitalParentType = (payload) => (dispatch) => {
  dispatch({ type:  GET_INITIATE_APP_START});
  fetcher({
    method: "GET",
    request: `initiate-application`,
    payload,
  })
    .then((response) => {
      console.log("response1",response.data);
      dispatch({
        type: GET_INITIATE_APP_SUCCESS,
        payload: response.data,
      });
      console.log("response",response.data)
      if (
        response.data.status === true || response.data.statusCode === '200' ||
        response.data.status === "SUCCESS"
      ){
        dispatch(
          showMessage({
            title: "Saved Succesfully.",
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
        type: GET_INITIATE_APP_ERROR,
        payload: error,
      });
    });
};
