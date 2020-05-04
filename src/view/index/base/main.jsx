import React, {Component} from 'react';
import {Button, Upload, message} from "antd";
import { connect } from 'react-redux';
import {GET_IMG} from "../../../constants";

class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this); // 处理上传方法
    this.putImage2Canvas = this.putImage2Canvas.bind(this); // 将上传图片投影到 canvas 中
    this.myCanvas = React.createRef();
    this.state = {
      img: ''
    };
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
            <Button children={'保存图片'} type={"primary"}/>
          </div>
          <canvas ref={this.myCanvas} id={'my-canvas'}/>
        </div>
    )
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
    const { getImgArr } = this.props;
    const img = new Image();
    img.src = imgSrc
    img.onload = () => {
      this.myCanvas.current.width = img.width;
      this.myCanvas.current.height = img.height;
      const context = this.myCanvas.current.getContext('2d');
      context.drawImage(img, 0, 0);
      const imgData = context.getImageData(0, 0, img.width, img.height).data;  // 获得 RGBA 的像素对象矩阵
      // 处理imgData  去除 A 通道
      let imgArr = [];
      for (let i = 0; i < imgData.length; i += 4) {
        imgArr.push(imgData[i], imgData[i + 1], imgData[i + 2])
      }
      getImgArr(imgArr);
      console.log(imgArr);
    }
  }
}

const mapStateToProps = state => ({
  imgArr: state.imgArr
})

const mapDispatchToProps = dispatch => ({
  // 改变仓库中的像素矩阵
  getImgArr(imgArr){
    const action = {
      type: GET_IMG,
      imgArr
    }
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
