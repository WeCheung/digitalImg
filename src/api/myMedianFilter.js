export function median(imgData, canvasWidth, canvasHeight) {
  let medianCounter = 0;
  let tmpPixelData = imgData,
      pixelData = imgData
  let size = 3;

  for (let i = 0; i < canvasHeight; i++) {
    for (let j = 0; j < canvasWidth; j++) {
      let tempR = [],
          tempG = [],
          tempB = [];
      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          let x = i + dx;
          let y = j + dy;
          let p = x * canvasWidth + y;
          tempR.push(tmpPixelData[p * 4])
          tempG.push(tmpPixelData[p * 4 + 1])
          tempB.push(tmpPixelData[p * 4 + 2])
        }
      }
      tempR.sort();
      tempG.sort();
      tempB.sort();
      let index = ~~((size * size) / 2);
      let p = i * canvasWidth + j;
      pixelData[p * 4] = tempR[index];
      pixelData[p * 4 + 1] = tempG[index];
      pixelData[p * 4 + 2] = tempB[index];
    }
  }
  imgData = pixelData;
  medianCounter++;
  //迭代次数
  if (medianCounter === 1) {
    return imgData;
  } else {
    return median(imgData, size)
  }
}
