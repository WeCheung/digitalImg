import React, { Component } from 'react';
import { Button } from "antd";
import { connect } from 'react-redux';
import { GET_GRAY_ARR } from "../../../constants";
import {
  getGrayImg
} from "./btnFunctions";


class BtnGroup extends Component {
  constructor(props) {
    super(props);
    this.getGrayImg = getGrayImg.bind(this);
  }

  render() {
    // 引入仓库的已获取图片的变量
    const { imgArr, grayArr } = this.props;
    // 引入 dispatch 的方法
    const { getGrayArr } = this.props;

    return (
        <div className={'btn-group2'}>
          <div className="btn-box">
            <Button children={'灰度处理'} type={'primary'} onClick={()=>{this.getGrayImg(imgArr, getGrayArr)}}/>
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
            <Button children={'中值滤波'} type={'primary'}/>
            <Button children={'腐蚀和膨胀'} type={'primary'}/>
            <Button children={'细化'} type={'primary'}/>
            <Button children={'细化'} type={'primary'}/>
          </div>
        </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    imgArr: state.imgArr
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getGrayArr(grayArr){
      console.log(grayArr);
      const action = {
        type: GET_GRAY_ARR,
        grayArr
      }
      dispatch(action);
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BtnGroup);
