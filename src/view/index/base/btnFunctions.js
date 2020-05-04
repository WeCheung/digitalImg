// 引入对应的算法
import {
  gray
} from "../../../api/gray";

export function getGrayImg(arrData, cb) {
  if( arrData.length === 0 ) return;
  cb(gray(arrData));
}
