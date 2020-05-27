import React, {Component} from 'react';
import {Button} from "antd";
import {connect} from 'react-redux';
import {GET_GRAY_ARR, GET_MEDIAN_FILTER, GET_THRESHOLD_ARR, GET_EDGE_DETECTION_ARR} from "../../../constants";
import {
  getGrayImg,
  getMedianFilter,
  getThreshold,
  getEdgeDetection
} from "./btnFunctions";

class BtnGroup extends Component {
  constructor(props) {
    super(props);
    this.getGrayImg = getGrayImg.bind(this);
    this.getMedianFilter = getMedianFilter.bind(this);
    this.getThreshold = getThreshold.bind(this);
    this.getEdgeDetection = getEdgeDetection.bind(this);
  }

  render() {
    // 引入仓库的已获取图片的变量
    const {imgArr, imgSize, medianFilterArr, thresholdArr} = this.props;
    // 引入 dispatch 的方法
    const {getGrayArr, changeMedianFilter, getThresholdArr, getEdgeDetectionArr} = this.props;

    return (
        <div className={'btn-group2'}>
          <div className="btn-box">
            <Button children={'灰度处理'} type={'primary'} onClick={() => {
              this.getGrayImg(imgArr, getGrayArr);
            }}/>
            <Button children={'直方图均衡化'} type={'primary'}/>
            <Button children={'灰度的线性变换'} type={'primary'}/>
            <Button children={'灰度的阈值变换'} type={'primary'}/>
          </div>
          <div className="btn-box">
            <Button children={'灰度的窗口变换'} type={'primary'}/>
            <Button children={'灰度拉伸变换'} type={'primary'}/>
            <Button children={'模版操作'} type={'primary'}/>
            <Button children={'梯度锐化'} type={'primary'}/>
          </div>
          <div className="btn-box">
            <Button children={'中值滤波'} type={'primary'} onClick={() => {
              this.getMedianFilter(imgArr, imgSize.width, imgSize.height, changeMedianFilter);
            }}/>
            <Button children={'灰度阈值变换'} type={'primary'} onClick={() => {
              this.getThreshold(medianFilterArr, 150, getThresholdArr);
            }}/>
            <Button children={'边缘检测'} type={'primary'} onClick={() => {
              this.getEdgeDetection(thresholdArr, imgSize.width, imgSize.height, getEdgeDetectionArr)
            }}/>
            <Button children={'细化'} type={'primary'}/>
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
    thresholdArr: state.thresholdArr
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
    getEdgeDetectionArr(edgeDetectionArr){
      const action = {
        type: GET_EDGE_DETECTION_ARR,
        edgeDetectionArr
      };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BtnGroup);
