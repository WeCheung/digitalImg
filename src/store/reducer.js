import { GET_IMG, GET_GRAY_ARR } from "../constants";

const initState = {
  imgArr: [],
  grayArr: []
};

export default ( state = initState, action ) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch ( action.type ) {
    case GET_IMG:
      newState.imgArr = action.imgArr;
      return newState;
    case GET_GRAY_ARR:
      newState.grayArr = action.grayArr;
      return newState;
    default:
      return newState;
  }
}

