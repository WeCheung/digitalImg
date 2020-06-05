// 引入对应的算法
import { gray } from "../../../api/gray";
import { median } from "../../../api/myMedianFilter";
import { thresholdTrans } from "../../../api/thresholdTrans";
import { contourDIB } from "../../../api/edgeDetection";
import {gradSharp} from "../../../api/gradSharp";
import {invert} from "../../../api/invert";
import {inteEqualize} from "../../../api/inteEqualize";

export function getGrayImg(arrData, cb) {
  if( arrData.length === 0 ) return;
  gray(arrData)
  cb(arrData);
}

export function getMedianFilter(arrData, lWidth, lHeight, cb) {
  if(!arrData) return;
  // let resultArr = [];
  // arrData.forEach((item, index) => {
  //   if( index !== 0 && index % 3 === 0 ){
  //     resultArr.push(255);
  //   }
  //   resultArr.push(item);
  // });
  // resultArr.push(255);
  median(arrData, lWidth, lHeight);
  console.log(arrData);
  cb(arrData);
}

export function getThreshold(arrData, bthre, cb) {
  if(!arrData) return;
  const thresholdArr = thresholdTrans(arrData, bthre);
  cb(thresholdArr);
}

export function getEdgeDetection(data, lWidth, lHeight, cb) {
  if(!data) return;
  contourDIB(data, lWidth, lHeight);
  cb(data);
}

export function getGradSharp(arrData, lWidth, lHeight, bThre, cb) {
  if(!arrData) return;
  let resultArr = [];
  arrData.forEach((item, index) => {
    if( index !== 0 && index % 3 === 0 ){
      resultArr.push(255);
    }
    resultArr.push(item);
  });
  resultArr.push(255);
  gradSharp(resultArr, lWidth, lHeight, bThre);
  cb(resultArr);
}

export function getInvertArr(arrData, cb) {
  invert(arrData);
  cb(arrData);
}

export function getEqualizeArr(arrData, cb) {
  inteEqualize(arrData);
  cb(arrData);
}
