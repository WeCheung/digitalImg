// 引入对应的算法
import { gray } from "../../../api/gray";
import { median } from "../../../api/myMedianFilter";
import { thresholdTrans } from "../../../api/thresholdTrans";
import { contourDIB } from "../../../api/edgeDetection";

export function getGrayImg(arrData, cb) {
  if( arrData.length === 0 ) return;
  cb(gray(arrData));
}

export function getMedianFilter(arrData, lWidth, lHeight, cb) {
  // medianFilter(arrData, lWidth, lHeight, filterObj);
  let resultArr = [];
  arrData.forEach((item, index) => {
    if( index !== 0 && index % 3 === 0 ){
      resultArr.push(255);
    }
    resultArr.push(item);
  });
  resultArr.push(255);
  median(resultArr, lWidth, lHeight)
  console.log(resultArr);
  cb(resultArr);
}

export function getThreshold(arrData, bthre, cb) {
  const thresholdArr = thresholdTrans(arrData, bthre);
  cb(thresholdArr);
}

export function getEdgeDetection(data, lWidth, lHeight, cb) {
  contourDIB(data, lWidth, lHeight);
  cb(data);
}
