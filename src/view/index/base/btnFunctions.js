// 引入对应的算法
import {gray} from "../../../api/gray";
import {median} from "../../../api/myMedianFilter";
import {thresholdTrans} from "../../../api/thresholdTrans";
import {contourDIB} from "../../../api/edgeDetection";
import {gradSharp} from "../../../api/gradSharp";
import {invert} from "../../../api/invert";
import {inteEqualize} from "../../../api/inteEqualize";

export function getGrayImg(arrData, cb) {
  if (arrData.length === 0) return;
  gray(arrData)
  cb(arrData);
}

export function getMedianFilter(arrData, lWidth, lHeight, cb) {
  if (!arrData) return;
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
  if (!arrData) return;
  const thresholdArr = thresholdTrans(arrData, bthre);
  cb(thresholdArr);
}

export function getEdgeDetection(data, lWidth, lHeight, cb) {
  if (!data) return;
  contourDIB(data, lWidth, lHeight);
  cb(data);
}

export function getGradSharp(arrData, lWidth, lHeight, bThre, cb) {
  if (!arrData) return;
  let resultArr = [];
  arrData.forEach((item, index) => {
    if (index !== 0 && index % 3 === 0) {
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

// export function counter(arrData, lWidth, lHeight) {
//   if (!arrData.length) return '统计个毛~';
//   const graph = new Graph();
//   let rowArr = [];
//   let lpSrc;
//   const filterArr = thresholdArrFilter(arrData);
//   console.log(filterArr);
//   console.log(lWidth, lHeight);
//   // 将数组转换成图数据结构
//   for (let j = 0; j < lHeight; j++) {
//     rowArr = [];
//     for (let i = 0; i < lWidth; i++) {
//       lpSrc = j * lWidth + i;
//       graph.addVertex(filterArr[lpSrc]);
//       if (i - 1 > 0) rowArr.push(1);
//       if (i + 1 < lWidth) rowArr.push(1);
//     }
//     graph.addEdge(rowArr);
//   }
//   console.log(graph.vertex);
//   console.log(graph.edgeList);
//   return '统计个毛~';
// }
// function thresholdArrFilter(arrData) {
//   let filterArr = [];
//   for (let i = 0; i < arrData.length; i += 4) {
//     filterArr.push(arrData[i]);
//   }
//   return filterArr;
// }
// class Graph {
//   constructor() {
//     // 存储的是所有的顶点
//     this.vertex = [];
//     // 存储全部的边
//     this.edgeList = [];
//   }
//
//   // 添加顶点
//   addVertex(v) {
//     // 顶点
//     this.vertex.push(v);
//   }
//
//   // 添加边
//   addEdge(arr) {
//     this.edgeList.push(arr);
//   }
// }

export function counter(dataArr, lWidth, lHeight) {
  let x, y, domain_num = 0, bufArr = [];
  let i, offset;
  let imageData = filterArr(dataArr, lWidth, lHeight);
  for (i = 0; i < lWidth * lHeight; i++) {
    bufArr[i] = 0;
  }
  i = 1;

  // 遍历图像的点
  for (y = 0; y < lHeight; y++) {
    for (x = 0; x < lWidth; x++) {
      offset = y * lWidth + x;

      // 先考虑边界条件
      if (y === 0) {
        if (x === 0) {  // 第零行第零个点
          bufArr[offset] = i;
          domain_num++;
        } else { // 第零行的其他点
          if (imageData[y][x - 1] === imageData[y][x]) {    //如果它的前一点有值，则将它归属到它的前一点的联通域
            i = bufArr[offset - 1]; //获取前一点的联通域序号，传给i
            bufArr[offset] = i; //将该点赋给i指定的联通域
          } else {  //如果它的前一点没有值，则将它归到另一个联通域
            domain_num++; //联通域数量增一
            i = domain_num;
            bufArr[offset] = i; //将它标记为i联通域
          }
        }
      } else if (x === 0 && y > 0) {  //如果是第一行下的行和第0列，则只检测其上方及其右上方的点
        if (imageData[y - 1][x] === imageData[y][x]) {
          i = bufArr[x + (y - 1) * lWidth];
          bufArr[offset] = i;
        } else if (imageData[y - 1][x + 1] === imageData[y][x]) { // 检查右上方的点
          i = bufArr[x + 1 + (y - 1) * lWidth];
          bufArr[offset] = i;
        } else {  // 如果上方和右上方的点都没有值，则设置另一个连通域
          domain_num++;
          i = domain_num;
          bufArr[offset] = i; // 将它标记为i连通域
        }
      } else if (x === (lWidth - 1) && y > 0) { // 靠右侧第0行以下的点
        if (imageData[y][x - 1] === imageData[y][x]) { // 检测前一点
          i = bufArr[offset - 1];
          bufArr[offset] = i;
        } else if (imageData[y - 1][x - 1] === imageData[y][x]) {  // 检测左上方
          i = bufArr[x - 1 + (y - 1) * lWidth];
          bufArr[offset] = i;
        } else if (imageData[y - 1][x] === imageData[y][x]) {  // 检测上方
          i = bufArr[x + (y - 1) * lWidth];
          bufArr[offset] = i;
        } else { // 其前方、左上方、上方都没有值，另设连通域
          domain_num++;
          i = domain_num;
          bufArr[offset] = i;
        }
      } else { // 其他正常点
        if (imageData[y][x - 1] === imageData[y][x]) {  // 若前一点有值，则将其归属到前一点的连通域
          i = bufArr[offset - 1];
          bufArr[offset] = i;

          if (imageData[y - 1][x] === imageData[y][x]) { // 继续检查上方，若上方有值

          } else if (imageData[y - 1][x + 1] === imageData[y][x]) {  // 右上方有值
            if (bufArr[x + 1 + (y - 1) * lWidth] < bufArr[offset]) {
              for (i = 0; i < lWidth * lHeight; i++) {
                if (bufArr[i] === bufArr[offset]) {
                  bufArr[i] = bufArr[x + 1 + (y - 1) * lWidth];
                } else if (bufArr[i] > bufArr[offset]) {
                  bufArr[i]--;
                }
              }
              domain_num--;
            } else if (bufArr[x + 1 + (y - 1) * lWidth] > bufArr[offset]) {
              for (i = 0; i < lWidth * lHeight; i++) {
                if (bufArr[i] === bufArr[x + 1 + (y - 1) * lWidth]) {
                  bufArr[i] = bufArr[offset];
                } else if (bufArr[i] > bufArr[x + 1 + (y - 1) * lWidth]) {
                  bufArr[i]--;
                }
              }
              domain_num--;
            }
          }
        } else if (imageData[y - 1][x - 1] === imageData[y][x]) {  // 左上方有值
          i = bufArr[x - 1 + (y - 1) * lWidth];
          bufArr[offset] = i;
          if (imageData[y - 1][x + 1] === imageData[y][x]) { // 检测右上方的值
            if (bufArr[x + 1 + (y - 1) * lWidth] < bufArr[offset]) {
              for (i = 0; i < lWidth * lHeight; i++) {
                if (bufArr[i] === bufArr[offset]) {
                  bufArr[i] = bufArr[x + 1 + (y - 1) * lWidth];
                } else if (bufArr[i] > bufArr[offset]) {
                  bufArr[i]--;
                }
              }
              domain_num--;
            } else if (bufArr[x + 1 + (y - 1) * lWidth] > bufArr[offset]) {
              for (i = 0; i < lWidth * lHeight; i++) {
                if (bufArr[i] === bufArr[x + 1 + (y - 1) * lWidth]) {
                  bufArr[i] = bufArr[offset];
                } else if (bufArr[i] > bufArr[x + 1 + (y - 1) * lWidth]) {
                  bufArr[i]--;
                }
              }
              domain_num--;
            }
          }
        } else if (imageData[y - 1][x] === imageData[y][x]) {  // 若上方有值
          i = bufArr[x + (y - 1) * lWidth];
          bufArr[offset] = i;
        } else if (imageData[y - 1][x + 1] === imageData[y][x]) {
          i = bufArr[x + 1 + (y - 1) * lWidth];
          bufArr[offset] = i;
        } else {
          domain_num++;
          i = domain_num;
          bufArr[offset] = i;
        }
      }
    }
  }
  return domain_num;
}

function filterArr(dataArr, width, height) {
  let resultArr = [], tempArr = [];

  for (let i = 0; i < height; i++) {
    tempArr = [];
    for (let j = 0; j < width; j++) {
      tempArr.push(dataArr[j + width * i]);
    }
    resultArr.push(tempArr);
  }
  return resultArr;
}
