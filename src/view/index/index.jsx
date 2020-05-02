import React, {Component} from 'react';
import './index.scss';
import Main from "./base/main";
import BtnGroup from "./base/btnGroup";

class MainPage extends Component {
  render() {
    return (
        <div id={'main-page'}>
          <Main />
          <BtnGroup />
        </div>
    );
  }
}

export default MainPage;