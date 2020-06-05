import React, {Component} from 'react';
import {Button, Upload, message} from "antd";
import {connect} from 'react-redux';
import {
  GET_IMG,
  GET_IMG_SIZE,
  GET_MEDIAN_FILTER,
  GET_THRESHOLD_ARR,
  GET_EDGE_DETECTION_ARR,
  GET_GRAD_SHARP_ARR,
  GET_INVERT_ARR,
  GET_EQUALIZE_ARR
} from "../../../constants";
import {getMedianFilter} from "./btnFunctions";

class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this); // 处理上传方法
    this.putImage2Canvas = this.putImage2Canvas.bind(this); // 将上传图片投影到 canvas 中
    this.getMedianFilter = getMedianFilter.bind(this);
    this.myCanvas = React.createRef();
    this.state = {
      count: 1
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {renderType} = this.props;
    switch (renderType) {
      case GET_MEDIAN_FILTER:
        this.renderData(GET_MEDIAN_FILTER);
        return;
      case GET_THRESHOLD_ARR:
        this.renderData(GET_THRESHOLD_ARR);
        return;
      case GET_EDGE_DETECTION_ARR:
        this.renderData(GET_EDGE_DETECTION_ARR);
        return;
      case GET_GRAD_SHARP_ARR:
        this.renderData(GET_GRAD_SHARP_ARR);
        return;
      case GET_INVERT_ARR:
        this.renderData(GET_INVERT_ARR);
        return;
      case GET_EQUALIZE_ARR:
        this.renderData(GET_EQUALIZE_ARR);
        return;
      default:
        return;
    }
  }

  componentDidMount() {
    const {getImgSize} = this.props;
    const myCanvas = this.myCanvas.current;
    const imgSize = {
      width: parseInt(getComputedStyle(myCanvas).width),
      height: parseInt(getComputedStyle(myCanvas).height),
      originWidth: myCanvas.width,
      originHeight: myCanvas.height
    }
    getImgSize(imgSize);
  }

  render() {
    const uploadProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      beforeUpload: this.beforeUpload,
      customRequest: this.customRequest
    };

    return (
        <div className="main-box">
          <div className="btn-group1">
            <Upload {...uploadProps}>
              <Button children={'上传图片'} type={"primary"}/>
            </Upload>
            <Button children={'保存图片'} type={"primary"} onClick={() => {
              this.saveImage();
            }}/>
          </div>
          <canvas ref={this.myCanvas} id={'my-canvas'}/>
        </div>
    )
  }

  // 保存图片
  saveImage = () => {
    const myCanvas = document.getElementById('my-canvas');
    let count = this.state.count;
    let base64 = myCanvas.toDataURL('image/png');
    base64 = base64.replace('image/png', 'image/octest-stream');

    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);

    const link = document.createElement('a');
    link.href = base64;
    link.download = `img${count}.png`
    link.dispatchEvent(event);

    count++;
    this.setState(() => ({
      count
    }))
  }

  // 上传图片
  customRequest = (option) => {
    const formData = new FormData();
    formData.append("files[]", option.file);
    const reader = new FileReader();
    reader.readAsDataURL(option.file);
    reader.onloadend = (e) => {
      // console.log(e.target.result);// 打印图片的base64
      this.putImage2Canvas(e.target.result);
      this.setState(() => ({
        img: e.target.result
      }))
      if (e && e.target && e.target.result) {
        option.onSuccess();
      }
    }
  }
  beforeUpload = (file, fileList) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传JPG或PNG文件!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小需小于2MB!");
      return false;
    }
    return isJpgOrPng && isLt2M;
    // return false;
  }

  putImage2Canvas(imgSrc) {
    const {getImgArr, imgSize} = this.props;
    const img = new Image();
    img.src = imgSrc
    img.onload = () => {
      this.myCanvas.current.width = img.width;
      this.myCanvas.current.height = img.height;
      const context = this.myCanvas.current.getContext('2d');
      context.drawImage(img, 0, 0);
      // const imgData = context.getImageData(0, 0, img.width, img.height).data;  // 获得 RGBA 的像素对象矩阵
      const imgData = context.getImageData(0, 0, imgSize.width, imgSize.height).data;  // 获得 RGBA 的像素对象矩阵
      console.log(imgData);
      // 处理imgData  去除 A 通道
      let imgArr = [];
      for (let i = 0; i < imgData.length; i += 4) {
        imgArr.push(imgData[i], imgData[i + 1], imgData[i + 2]);
      }
      getImgArr(imgArr);
      // console.log(imgArr);
    }
  }

  // 渲染函数
  renderData(type) {
    const myCanvas = this.myCanvas.current;
    const {
      thresholdArr,
      medianFilterArr,
      edgeDetectionArr,
      imgSize,
      gradSharpArr,
      invertArr,
      equalizeArr
    } = this.props;
    const context = myCanvas.getContext('2d');
    const imgData = context.createImageData(imgSize.width, imgSize.height);
    if (type === GET_MEDIAN_FILTER && medianFilterArr.length) { // 中值滤波渲染
      medianFilterArr.forEach((item, index) => {
        imgData.data[index] = medianFilterArr[index];
      });
      context.putImageData(imgData, 0, 0, 0, 0, imgSize.width, imgSize.height);
    } else if (type === GET_THRESHOLD_ARR && thresholdArr.length) {  // 二值图像渲染
      console.log(thresholdArr);
      thresholdArr.forEach((item, index) => {
        imgData.data[index] = thresholdArr[index];
      });
      context.putImageData(imgData, 0, 0, 0, 0, imgSize.width, imgSize.height);
    } else if (type === GET_EDGE_DETECTION_ARR && edgeDetectionArr.length) {  // 边缘检测
      console.log(edgeDetectionArr);
      edgeDetectionArr.forEach((item, index) => {
        imgData.data[index] = thresholdArr[index];
      });
      context.putImageData(imgData, 0, 0, 0, 0, imgSize.width, imgSize.height);
    } else if (type === GET_GRAD_SHARP_ARR && gradSharpArr.length) {  // 灰度锐化
      console.log(gradSharpArr);
      gradSharpArr.forEach((item, index) => {
        imgData.data[index] = gradSharpArr[index];
      });
      context.putImageData(imgData, 0, 0, 0, 0, imgSize.width, imgSize.height);
    } else if (type === GET_INVERT_ARR && invertArr.length) { // 反色处理
      console.log(invertArr);
      invertArr.forEach((item, index) => {
        imgData.data[index] = invertArr[index];
      });
    } else if (type === GET_EQUALIZE_ARR && equalizeArr.length) {
      console.log(equalizeArr);
      equalizeArr.forEach((item, index) => {
        imgData.data[index] = equalizeArr[index];
      });
    }
  }
}

const mapStateToProps = state => ({
  imgArr: state.imgArr,
  imgSize: state.imgSize,
  grayArr: state.grayArr,
  medianFilterArr: state.medianFilterArr,
  thresholdArr: state.thresholdArr,
  edgeDetectionArr: state.edgeDetectionArr,
  renderType: state.renderType,
  gradSharpArr: state.gradSharpArr,
  invertArr: state.invertArr,
  equalizeArr: state.equalizeArr
});

const mapDispatchToProps = dispatch => ({
  // 改变仓库中的像素矩阵
  getImgArr(imgArr) {
    const action = {
      type: GET_IMG,
      imgArr
    }
    dispatch(action);
  },
  // 随时测量图片大小
  getImgSize(sizeObj) {
    const action = {
      type: GET_IMG_SIZE,
      imgSize: sizeObj
    }
    dispatch(action);
  },
  changeMedianFilter(medianFilterArr) {
    const action = {
      type: GET_MEDIAN_FILTER,
      medianFilterArr
    }
    dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
