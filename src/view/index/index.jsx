import React, {Component} from 'react';
import './index.scss';
import Main from "./base/main";
import BtnGroup from "./base/btnGroup";
import SecondScreen from "./base/secondScreen";

class MainPage extends Component {
  render() {
    return (
        <div id={'main-page'}>
          <Main />
          <div className={'bottom-group'}>
            <BtnGroup />
            <SecondScreen />
          </div>
        </div>
    );
  }
}

export default MainPage;