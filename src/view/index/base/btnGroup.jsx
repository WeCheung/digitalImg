import React from 'react';
import { Button } from "antd";

function BtnGroup() {
  return (
      <div className={'btn-group2'}>
        <div className="btn-box">
          <Button children={'灰度直方图'} type={'primary'}/>
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

export default BtnGroup;