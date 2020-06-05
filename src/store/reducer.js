import {
  GET_IMG,
  GET_GRAY_ARR,
  GET_MEDIAN_FILTER,
  GET_IMG_SIZE,
  GET_THRESHOLD_ARR,
  GET_EDGE_DETECTION_ARR,
  GET_GRAD_SHARP_ARR,
  GET_INVERT_ARR,
  GET_EQUALIZE_ARR
} from "../constants";

const initState = {
  imgArr: [],
  grayArr: [],
  gradSharpArr: [],
  equalizeArr: [],
  medianFilterArr: [],
  thresholdArr: [],
  edgeDetectionArr: [],
  invertArr: [],
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
      newState.renderType = GET_GRAY_ARR;
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
    case GET_GRAD_SHARP_ARR:
      newState.renderType = GET_GRAD_SHARP_ARR;
      newState.gradSharpArr = action.gradSharpArr;
      return newState;
    case GET_INVERT_ARR:
      newState.renderType = GET_INVERT_ARR;
      newState.invertArr = action.invertArr;
      return newState;
    case GET_EQUALIZE_ARR:
      newState.renderType = GET_EQUALIZE_ARR;
      newState.equalizeArr = action.equalizeArr;
      return newState;
    default:
      return newState;
  }
}

