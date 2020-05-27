import {
  GET_IMG,
  GET_GRAY_ARR,
  GET_MEDIAN_FILTER,
  GET_IMG_SIZE,
  GET_THRESHOLD_ARR,
  GET_EDGE_DETECTION_ARR
} from "../constants";

const initState = {
  imgArr: [],
  grayArr: [],
  medianFilterArr: [],
  thresholdArr: [],
  edgeDetectionArr: [],
  imgSize: {},
  renderType: ''
};

export default (state = initState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_IMG:
      newState.imgArr = action.imgArr;
      return newState;
    case GET_GRAY_ARR:
      newState.grayArr = action.grayArr;
      return newState;
    case GET_MEDIAN_FILTER:
      newState.renderType = GET_MEDIAN_FILTER;
      newState.medianFilterArr = action.medianFilterArr;
      return newState;
    case GET_IMG_SIZE:
      newState.imgSize = action.imgSize;
      return newState;
    case GET_THRESHOLD_ARR:
      newState.renderType = GET_THRESHOLD_ARR;
      newState.thresholdArr = action.thresholdArr;
      return newState;
    case GET_EDGE_DETECTION_ARR:
      newState.renderType = GET_EDGE_DETECTION_ARR;
      newState.edgeDetectionArr = action.edgeDetectionArr;
      return newState;
    default:
      return newState;
  }
}

