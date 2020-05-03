// /**
//  * 统计数据(针对灰度图像)
//  *   @param data 原始数据
//  *   @param strength 分份
//  *   @returns {Array}
//  */
// export function statistics(data, strength = 1) {
//   const statisticArr = [];
//   for (let i = 0, len = data.length; i < len; i += 4) {
//     const key = Math.round(data[i] / strength);
//     statisticArr[key] = statisticArr[key] || 0;
//     statisticArr[key]++;
//   }
//   return statisticArr;
// }
//
// /**
//  * 该函数用来对图像进行直方图均衡
//  *    @param data
//  */
// export function inteEqualize(data) {
//   // 灰度映射表
//   const bMap = new Array(256);
//   // 灰度映射表
//   const lCount = new Array(256);
//   for (let i = 0; i < 256; i++) {
//     // 清零
//     lCount[i] = 0;
//   }
//   // 计算各个灰度值的计数(只针对灰度图像)
//   for (let i = 0, len = data.length; i < len; i += 4) {
//     lCount[data[i]]++;
//   }
//   // 计算灰度映射表
//   for (let i = 0; i < 256; i++) {
//     let lTemp = 0;
//     for (let j = 0; j < i; j++) {
//       lTemp += lCount[j];
//     }
//     // 计算对应的新灰度值
//     bMap[i] = Math.round(lTemp * 255 / (data.length / 4));
//   }
//   // 赋值
//   for (let i = 0, len = data.length; i < len; i += 4) {
//     data[i] = bMap[data[i]];
//     data[i + 1] = bMap[data[i + 1]];
//     data[i + 2] = bMap[data[i + 2]];
//   }
// }
//
// /**
//  * 该函数用来对图像灰度
//  *    @param data
//  *    @param fA    线性变换的斜率
//  *    @param fB    线性变换的截距
//  */
// export function linerTrans(data, fA, fB) {
//   for (let i = 0, len = data.length; i < len; i += 4) {
//     // 针对RGB三个进行转换
//     for (let j = 0; j < 3; j++) {
//       let fTemp = fA * data[i + j] + fB;
//       if (fTemp > 255) {
//         fTemp = 255;
//       } else if (fTemp < 0) {
//         fTemp = 0;
//       } else {
//         fTemp = Math.round(fTemp);
//       }
//       data[i + j] = fTemp;
//     }
//   }
// }
//
// /**
//  * 该函数用来对图像进行阈值变换
//  *    @param data
//  *    @param bthre 阈值
//  */
// export function thresholdTrans(data, bthre) {
//   for (let i = 0, len = data.length; i < len; i += 4) {
//     // 针对RGB三个进行转换
//     for (let j = 0; j < 3; j++) {
//       if (data[i + j] < bthre) {
//         data[i + j] = 0;
//       } else {
//         data[i + j] = 255;
//       }
//     }
//   }
// }
//
// /**
//  * 该函数用来对图像进行窗口变换。只有在窗口范围内对灰度保持不变
//  *    @param data
//  *    @param bLow  下限
//  *    @param bUp   上限
//  */
// export function windowTrans(data, bLow, bUp) {
//   for (let i = 0, len = data.length; i < len; i += 4) {
//     // 针对RGB三个进行转换
//     for (let j = 0; j < 3; j++) {
//       if (data[i + j] < bLow) {
//         data[i + j] = 0;
//       } else if (data[i + j] > bUp) {
//         data[i + j] = 255;
//       }
//     }
//   }
// }
//
// /**
//  * 该函数用来对图像进行灰度拉伸
//  * 该函数的运算结果是将原图在x1和x2之间的灰度拉伸到y1和y2之间
//  *    @param data
//  *    @param bx1   灰度拉伸第一个点的X坐标
//  *    @param by1   灰度拉伸第一个点的Y坐标
//  *    @param bx2   灰度拉伸第二个点的X坐标
//  *    @param by2   灰度拉伸第二个点的Y坐标
//  */
// export function grayStretch(data, bx1, by1, bx2, by2) {
//   // 灰度映射表
//   const bMap = new Array(256);
//   for (let i = 0; i < bx1; i++) {
//     // 防止分母为0
//     if (bx1 > 0) {
//       // 线性变换
//       bMap[i] = Math.round(by1 * i / bx1);
//     } else {
//       bMap[i] = 0;
//     }
//   }
//   for (let i = bx1; i < bx2; i++) {
//     // 判断bx1是否等于bx2(防止分母为0)
//     if (bx2 !== bx1) {
//       bMap[i] = Math.round((by2 - by1) * (i - bx1) / (bx2 - bx1));
//     } else {
//       // 直接赋值为by1
//       bMap[i] = by1;
//     }
//   }
//   for (let i = bx2; i < 256; i++) {
//     // 判断bx2是否等于256(防止分母为0)
//     if (bx2 !== 255) {
//       // 线性变换
//       bMap[i] = by2 + Math.round((255 - by2) * (i - bx2) / (255 - bx2));
//     } else {
//       // 直接赋值为255
//       bMap[i] = 255;
//     }
//   }
//   for (let i = 0, len = data.length; i < len; i += 4) {
//     data[i] = bMap[data[i]];
//     data[i + 1] = bMap[data[i + 1]];
//     data[i + 2] = bMap[data[i + 2]];
//   }
// }
//
// /**
//  * 模版操作
//  *    @param data              数据
//  *    @param lWidth            图像宽度
//  *    @param lHeight           图像高度
//  *    @param tempObj           模版数据
//  *    @param tempObj.iTempW    模版宽度
//  *    @param tempObj.iTempH    模版高度
//  *    @param tempObj.iTempMX   模版中心元素X坐标
//  *    @param tempObj.iTempMY   模版中心元素Y坐标
//  *    @param tempObj.fpArray   模版数组
//  *    @param tempObj.fCoef     模版系数
//  */
// export function template(data, lWidth, lHeight, tempObj) {
//   const { iTempW, iTempH, iTempMX, iTempMY, fpArray, fCoef } = tempObj;
//   // 保存原始数据
//   const dataInit = [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     dataInit[i] = data[i];
//   }
//   // 行(除去边缘几行)
//   for (let i = iTempMY; i < lHeight - iTempMY - 1; i++) {
//     // 列(除去边缘几列)
//     for (let j = iTempMX; j < lWidth - iTempMX - 1; j++) {
//       const count = (i * lWidth + j) * 4;
//       const fResult = [0, 0, 0];
//       for (let k = 0; k < iTempH; k++) {
//         for (let l = 0; l < iTempW; l++) {
//           const weight = fpArray[k * iTempW + l];
//           const y = i - iTempMY + k;
//           const x = j - iTempMX + l;
//           const key = (y * lWidth + x) * 4;
//           // 保存像素值
//           for (let i = 0; i < 3; i++) {
//             fResult[i] += dataInit[key + i] * weight;
//           }
//         }
//       }
//       for (let i = 0; i < 3; i++) {
//         // 乘上系数
//         fResult[i] *= fCoef;
//         // 取绝对值
//         fResult[i] = Math.abs(fResult[i]);
//         fResult[i] = fResult[i] > 255 ? 255 : Math.ceil(fResult[i]);
//         // 将修改后的值放回去
//         data[count + i] = fResult[i];
//       }
//     }
//   }
// }
//
// /**
//  * 该函数用来对图像进行梯度锐化
//  * @param data          数据
//  * @param lWidth        宽度
//  * @param lHeight       高度
//  * @param bThre         阈值
//  */
// export function gradSharp(data, lWidth, lHeight, bThre) {
//   // 保存原始数据
//   const dataInit = [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     dataInit[i] = data[i];
//   }
//   for (let i = 0; i < lHeight - 1; i++) {
//     for (let j = 0; j < lWidth - 1; j++) {
//       const lpSrc = (i * lWidth + j) * 4;
//       const lpSrc1 = ((i + 1) * lWidth + j) * 4;
//       const lpSrc2 = (i * lWidth + j + 1) * 4;
//       for (let i = 0; i < 3; i++) {
//         const bTemp = Math.abs(dataInit[lpSrc + i] - dataInit[lpSrc1 + i]) +
//             Math.abs(dataInit[lpSrc + i] - dataInit[lpSrc2 + i]);
//         if (bTemp >= 255) {
//           data[lpSrc + i] = 255;
//           // 判断是否大于阈值，对于小于情况，灰度值不变
//         } else if (bTemp >= bThre) {
//           data[lpSrc + i] = bTemp;
//         }
//       }
//     }
//   }
// }
//
// /**
//  * 中值滤波
//  *    @param data                      数据
//  *    @param lWidth                    图像宽度
//  *    @param lHeight                   图像高度
//  *    @param filterObj                 模版数据
//  *    @param filterObj.iFilterW        模版宽度
//  *    @param filterObj.iFilterH        模版高度
//  *    @param filterObj.iFilterMX       模版中心元素X坐标
//  *    @param filterObj.iFilterMY       模版中心元素Y坐标
//  */
// export function medianFilter(data, lWidth, lHeight, filterObj) {
//   const { iFilterW, iFilterH, iFilterMX, iFilterMY } = filterObj;
//   // 保存原始数据
//   const dataInit = [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     dataInit[i] = data[i];
//   }
//   // 行(除去边缘几行)
//   for (let i = iFilterMY; i < lHeight - iFilterH - iFilterMY - 1; i++) {
//     for (let j = iFilterMX; j < lWidth - iFilterW - iFilterMX - 1; j++) {
//       const count = (i * lWidth + j) * 4;
//       const fResult = [[], [], []];
//       for (let k = 0; k < iFilterH; k++) {
//         for (let l = 0; l < iFilterW; l++) {
//           const y = i - iFilterMY + k;
//           const x = j - iFilterMX + l;
//           const key = (y * lWidth + x) * 4;
//           // 保存像素值
//           for (let i = 0; i < 3; i++) {
//             fResult[i].push(dataInit[key + i]);
//           }
//         }
//       }
//       // 将中值放回去
//       for (let w = 0; w < 3; w++) {
//         data[count + w] = getMedianNum(fResult[w]);
//       }
//     }
//   }
// }
// /**
//  * 将数组排序后获取中间的值
//  *    @param bArray
//  *    @returns {*|number}
//  */
// function getMedianNum(bArray) { // 改函数配合中值滤波函数使用
//   const len = bArray.length;
//   bArray.sort();
//   let bTemp = 0;
//   // 计算中值
//   if ((len % 2) > 0) {
//     bTemp = bArray[(len - 1) / 2];
//   } else {
//     bTemp = (bArray[len / 2] + bArray[len / 2 - 1]) / 2;
//   }
//   return bTemp;
// }
//
// /**
//  * 该函数用于对图像进行腐蚀运算。
//  * 结构元素为水平方向或垂直方向的三个点，中间点位于原点；
//  * 或者由用户自己定义3*3的结构元素。
//  * 要求目标图像为只有0和255两个灰度值的灰度图像
//  *    @param data          图像数据
//  *    @param lWidth        原图像宽度(像素数)
//  *    @param lHeight       原图像高度(像素数)
//  *    @param nMode         腐蚀方式，0表示水平方向，1表示垂直方向，2表示自定义结构元素
//  *    @param structure     自定义的3*3结构元素
//  */
// export function erosionDIB(data, lWidth, lHeight, nMode, structure) {
//   // 保存原始数据
//   const dataInit = [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     dataInit[i] = data[i];
//   }
//   if (nMode === 0) {
//     // 使用水平方向的结构元素进行腐蚀
//     for (let j = 0; j < lHeight; j++) {
//       // 由于使用1*3的结构元素，为防止越界，所以不处理最左边和最右边的两列像素
//       for (let i = 1; i < lWidth - 1; i++) {
//         const lpSrc = j * lWidth + i;
//         for (let k = 0; k < 3; k++) {
//           // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
//           for (let n = 0; n < 3; n++) {
//             const pixel = lpSrc + n - 1;
//             data[lpSrc * 4 + k] = 0;
//             if (dataInit[pixel * 4 + k] === 255) {
//               data[lpSrc * 4 + k] = 255;
//               break;
//             }
//           }
//         }
//       }
//     }
//   } else if (nMode === 1) {
//     // 使用垂直方向的结构元素进行腐蚀
//     // 由于使用1*3的结构元素，为防止越界，所以不处理最上边和最下边的两列像素
//     for (let j = 1; j < lHeight - 1; j++) {
//       for (let i = 0; i < lWidth; i++) {
//         const lpSrc = j * lWidth + i;
//         for (let k = 0; k < 3; k++) {
//           // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
//           for (let n = 0; n < 3; n++) {
//             const pixel = (j + n - 1) * lWidth + i;
//             data[lpSrc * 4 + k] = 0;
//             if (dataInit[pixel * 4] === 255) {
//               data[lpSrc * 4 + k] = 255;
//               break;
//             }
//           }
//         }
//       }
//     }
//   } else {
//     // 由于使用3*3的结构元素，为防止越界，所以不处理最左边和最右边的两列像素和最上边和最下边的两列元素
//     for (let j = 1; j < lHeight - 1; j++) {
//       for (let i = 1; i < lWidth - 1; i++) {
//         const lpSrc = j * lWidth + i;
//         for (let k = 0; k < 3; k++) {
//           data[lpSrc * 4 + k] = 0;
//           // 如果原图像中对应结构元素中为黑色的那些点中有一个不是黑色，则将目标图像中的当前点赋成白色
//           for (let m = 0; m < 3; m++) {
//             for (let n = 0; n < 3; n++) {
//               if (structure[m][n] === -1) {
//                 continue;
//               }
//               const pixel = lpSrc + ((2 - m) - 1) * lWidth + (n - 1);
//               if (dataInit[pixel * 4] === 255) {
//                 data[lpSrc * 4 + k] = 255;
//                 break;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
//
// /**
//  * 该函数用于对图像进行膨胀运算。
//  * 结构元素为水平方向或垂直方向的三个点，中间点位于原点；
//  * 或者由用户自己定义3*3的结构元素。
//  * 要求目标图像为只有0和255两个灰度值的灰度图像
//  *    @param data          图像数据
//  *    @param lWidth        原图像宽度(像素数)
//  *    @param lHeight       原图像高度(像素数)
//  *    @param nMode         腐蚀方式，0表示水平方向，1表示垂直方向，2表示自定义结构元素
//  *    @param structure     自定义的3*3结构元素
//  */
// export function dilationDIB(data, lWidth, lHeight, nMode, structure) {
//   // 保存原始数据
//   const dataInit = [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     dataInit[i] = data[i];
//   }
//   if (nMode === 0) {
//     // 使用水平方向的结构元素进行腐蚀
//     for (let j = 0; j < lHeight; j++) {
//       // 由于使用1*3的结构元素，为防止越界，所以不处理最左边和最右边的两列像素
//       for (let i = 1; i < lWidth - 1; i++) {
//         const lpSrc = j * lWidth + i;
//         for (let k = 0; k < 3; k++) {
//           // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
//           for (let n = 0; n < 3; n++) {
//             const pixel = lpSrc + n - 1;
//             data[lpSrc * 4 + k] = 255;
//             if (dataInit[pixel * 4 + k] === 0) {
//               data[lpSrc * 4 + k] = 0;
//               break;
//             }
//           }
//         }
//       }
//     }
//   } else if (nMode === 1) {
//     // 使用垂直方向的结构元素进行腐蚀
//     // 由于使用1*3的结构元素，为防止越界，所以不处理最上边和最下边的两列像素
//     for (let j = 1; j < lHeight - 1; j++) {
//       for (let i = 0; i < lWidth; i++) {
//         const lpSrc = j * lWidth + i;
//         for (let k = 0; k < 3; k++) {
//           // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
//           for (let n = 0; n < 3; n++) {
//             const pixel = (j + n - 1) * lWidth + i;
//             data[lpSrc * 4 + k] = 255;
//             if (dataInit[pixel * 4] === 0) {
//               data[lpSrc * 4 + k] = 0;
//               break;
//             }
//           }
//         }
//       }
//     }
//   } else {
//     // 由于使用3*3的结构元素，为防止越界，所以不处理最左边和最右边的两列像素和最上边和最下边的两列元素
//     for (let j = 1; j < lHeight - 1; j++) {
//       for (let i = 1; i < lWidth - 1; i++) {
//         const lpSrc = j * lWidth + i;
//         for (let k = 0; k < 3; k++) {
//           data[lpSrc * 4 + k] = 255;
//           // 如果原图像中对应结构元素中为黑色的那些点中有一个不是黑色，则将目标图像中的当前点赋成白色
//           for (let m = 0; m < 3; m++) {
//             for (let n = 0; n < 3; n++) {
//               if (structure[m][n] === -1) {
//                 continue;
//               }
//               const pixel = lpSrc + ((2 - m) - 1) * lWidth + (n - 1);
//               if (dataInit[pixel * 4] === 0) {
//                 data[lpSrc * 4 + k] = 0;
//                 break;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
//
// /**
//  * 该函数用于对图像进行细化运算
//  * 要求目标图像为只有0和255两个灰度值的灰度图像
//  *    @param data          图像数据
//  *    @param lWidth        原图像宽度(像素数)
//  *    @param lHeight       原图像高度(像素数)
//  */
// export function thinDIB(data, lWidth, lHeight) {
//   // 保存原始数据
//   const dataInit = [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     dataInit[i] = data[i];
//   }
//   let bModified = true;
//   const neighBour = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]
//   ];
//   while (bModified) {
//     bModified = false;
//     for (let j = 1; j < lHeight - 1; j++) {
//       for (let i = 1; i < lWidth - 1; i++) {
//         let bCondition1 = false;
//         let bCondition2 = false;
//         let bCondition3 = false;
//         let bCondition4 = false;
//         const lpSrc = j * lWidth + i;
//         // 如果原图像中当前点为白色，则跳过
//         if (dataInit[lpSrc * 4]) {
//           continue;
//         }
//         // 获取当前点相邻的3*3区域内像素值，0代表白色，1代表黑色
//         const bourLength = 3;
//         for (let m = 0; m < bourLength; m++) {
//           for (let n = 0; n < bourLength; n++) {
//             const pixel = lpSrc + ((2 - m) - 1) * lWidth + (n - 1);
//             neighBour[m][n] = (255 - dataInit[pixel * 4]) ? 1 : 0;
//           }
//         }
//         const borderArr = [neighBour[0][1], neighBour[0][0], neighBour[1][0], neighBour[2][0],
//           neighBour[2][1], neighBour[2][2], neighBour[1][2], neighBour[0][2]];
//         let nCount1 = 0;
//         let nCount2 = 0;
//         for (let i = 0, len = borderArr.length; i < len; i++) {
//           nCount1 += borderArr[i];
//           if (borderArr[i] === 0 && borderArr[(i + 1) % len] === 1) {
//             nCount2++;
//           }
//         }
//         // 判断 2<= NZ(P1)<=6
//         if (nCount1 >= 2 && nCount1 <= 6) {
//           bCondition1 = true;
//         }
//         // 判断Z0(P1) = 1
//         if (nCount2 === 1) {
//           bCondition2 = true;
//         }
//         // 判断P2*P4*P8=0
//         if (borderArr[0] * borderArr[2] * borderArr[6] === 0) {
//           bCondition3 = true;
//         }
//         // 判断P2*P4*P6=0
//         if (borderArr[0] * borderArr[2] * borderArr[4] === 0) {
//           bCondition4 = true;
//         }
//         for (let k = 0; k < 3; k++) {
//           if (bCondition1 && bCondition2 && bCondition3 && bCondition4) {
//             data[lpSrc * 4 + k] = 255;
//             bModified = true;
//           } else {
//             data[lpSrc * 4 + k] = 0;
//           }
//         }
//       }
//     }
//     if (bModified) {
//       for (let i = 0, len = data.length; i < len; i++) {
//         dataInit[i] = data[i];
//       }
//     }
//   }
// }
//
