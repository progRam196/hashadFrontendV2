import React, {Component} from "react";
import {Layout} from "antd";

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";

import Topbar from "../Topbar/index";
import {footerText} from "util/config";
import App from "routes/index";
import {connect} from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import {getUser} from "../../appRedux/actions/Auth";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";

const {Content, Footer} = Layout;

export class MainApp extends Component {

  getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default :
        return ""
    }
  };
  getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL :
        return <HorizontalDefault/>;
      case NAV_STYLE_DARK_HORIZONTAL :
        return <HorizontalDark/>;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
        return <InsideHeader/>;
      case NAV_STYLE_ABOVE_HEADER :
        return <AboveHeader/>;
      case NAV_STYLE_BELOW_HEADER :
        return <BelowHeader/>;
      case NAV_STYLE_FIXED :
        return <Topbar/>;
      case NAV_STYLE_DRAWER :
        return <Topbar/>;
      case NAV_STYLE_MINI_SIDEBAR :
        return <Topbar/>;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
        return <NoHeaderNotification/>;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR :
        return <NoHeaderNotification/>;
      default :
        return null;
    }
  };

  getSidebar = (navStyle, width, token) => {
    console.log("getSidebar",token)
    if (width < TAB_SIZE) {
      return <Sidebar token={token}/>;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED :
        return <Sidebar token={token}/>;
      case NAV_STYLE_DRAWER :
        return <Sidebar token={token}/>;
      case NAV_STYLE_MINI_SIDEBAR :
        return <Sidebar token={token}/>;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
        return <Sidebar token={token}/>;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar token={token}/>;
      default :
        return null;
    }
  };

  render() {
    console.log("MAIN-APP PROPS",this.props)
    const {match, width, navStyle, token} = this.props;

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width, token)}
        <Layout>
          {this.getNavStyles(navStyle, token)}
          <Content className={`gx-layout-content ${ this.getContainerClass(navStyle)} `}>
            <App match={match}/>
            <Footer>
              <div className="gx-layout-footer-content">
                {footerText}
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = ({settings,auth}) => {
  const {width, navStyle} = settings;
  const {authUser, token, initURL} = auth;

  return {width, navStyle, token}
};
export default connect(mapStateToProps,{getUser})(MainApp);

