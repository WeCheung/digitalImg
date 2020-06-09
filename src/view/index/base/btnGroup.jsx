import React, {Component} from 'react';
import {Button, message} from "antd";
import {connect} from 'react-redux';
import {
  GET_GRAY_ARR,
  GET_MEDIAN_FILTER,
  GET_THRESHOLD_ARR,
  GET_EDGE_DETECTION_ARR,
  GET_GRAD_SHARP_ARR,
  GET_INVERT_ARR,
  GET_EQUALIZE_ARR
} from "../../../constants";
import {
  getGrayImg,
  getMedianFilter,
  getThreshold,
  getEdgeDetection,
  getGradSharp,
  getInvertArr,
  getEqualizeArr,
  counter
} from "./btnFunctions";

class BtnGroup extends Component {
  constructor(props) {
    super(props);
    this.getGrayImg = getGrayImg.bind(this);
    this.getMedianFilter = getMedianFilter.bind(this);
    this.getThreshold = getThreshold.bind(this);
    this.getEdgeDetection = getEdgeDetection.bind(this);
    this.getGradSharp = getGradSharp.bind(this);
    this.getInvertArr = getInvertArr.bind(this);
    this.getEqualizeArr = getEqualizeArr.bind(this);
  }

  render() {
    // 引入仓库的已获取图片的变量
    const {imgArr, imgSize, grayArr, medianFilterArr, thresholdArr, gradSharpArr} = this.props;
    // 引入 dispatch 的方法
    const {getGrayArr, changeMedianFilter, getThresholdArr, getEdgeDetectionArr, getGradSharpArr, dispatchInvertArr, dispatchEqualizeArr} = this.props;

    return (
        <div className={'btn-group2'}>
          <div className="btn-box">
            <Button children={'灰度处理'} type={'primary'} onClick={() => {
              this.getGrayImg(imgArr, getGrayArr);
            }}/>
            <Button children={'梯度锐化'} type={'primary'} onClick={() => {
              this.getGradSharp(grayArr, imgSize.width, imgSize.height, 150, getGradSharpArr);
            }}/>
            <Button children={'直方图均衡'} type={'primary'} onClick={() => {
              this.getEqualizeArr(gradSharpArr, dispatchEqualizeArr);
            }}/>
            <Button children={'反色处理'} type={'primary'} onClick={() => {
              this.getInvertArr(gradSharpArr, dispatchInvertArr);
            }}/>
          </div>
          <div className="btn-box">
            <Button children={'中值滤波'} type={'primary'} onClick={() => {
              this.getMedianFilter(gradSharpArr, imgSize.width, imgSize.height, changeMedianFilter);
            }}/>
            <Button children={'灰度阈值变换'} type={'primary'} onClick={() => {
              this.getThreshold(medianFilterArr, 150, getThresholdArr);
            }}/>
            <Button children={'边缘检测'} type={'primary'} onClick={() => {
              this.getEdgeDetection(thresholdArr, imgSize.width, imgSize.height, getEdgeDetectionArr);
            }}/>
            <Button children={'统计'} type={'primary'} onClick={() => {
              message.success(counter(thresholdArr, imgSize.width, imgSize.height));
            }}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    imgArr: state.imgArr,
    grayArr: state.grayArr,
    imgSize: state.imgSize,
    medianFilterArr: state.medianFilterArr,
    thresholdArr: state.thresholdArr,
    gradSharpArr: state.gradSharpArr
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getGrayArr(grayArr) {
      // console.log(grayArr);
      const action = {
        type: GET_GRAY_ARR,
        grayArr
      }
      dispatch(action);
    },
    changeMedianFilter(medianFilterArr) {
      const action = {
        type: GET_MEDIAN_FILTER,
        medianFilterArr
      }
      dispatch(action);
    },
    getThresholdArr(thresholdArr) {
      // console.log(thresholdArr);
      const action = {
        type: GET_THRESHOLD_ARR,
        thresholdArr
      }
      dispatch(action);
    },
    getEdgeDetectionArr(edgeDetectionArr) {
      const action = {
        type: GET_EDGE_DETECTION_ARR,
        edgeDetectionArr
      };
      dispatch(action);
    },
    getGradSharpArr(gradSharpArr) {
      const action = {
        type: GET_GRAD_SHARP_ARR,
        gradSharpArr
      };
      dispatch(action);
    },
    dispatchInvertArr(invertArr) {
      const action = {
        type: GET_INVERT_ARR,
        invertArr
      };
      dispatch(action);
    },
    dispatchEqualizeArr(equalizeArr) {
      const action = {
        type: GET_EQUALIZE_ARR,
        equalizeArr
      };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BtnGroup);
