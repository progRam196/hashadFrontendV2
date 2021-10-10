import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { getUser } from "../../appRedux/actions/Auth";
import { PicRightOutlined, HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    console.log("SIDEBAR-PROPS", this.props)
    const { themeType, navStyle, pathname, token } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

      <SidebarLogo />
      <div className="gx-sidebar-content">
        {/* <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div> */}
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
            {token &&
              <Menu.Item key="ads">
                <Link to="/ads"><i className="icon icon-widgets" />
                  Listings
                  {/* <IntlMessages id="sidebar.samplePage"/> */}
                </Link>
              </Menu.Item>
            }
            {token &&
              <Menu.Item key="profile">
                <Link to="/profile"><UserOutlined />
                  Profile
                  {/* <IntlMessages id="sidebar.samplePage"/> */}
                </Link>
              </Menu.Item>
            }
            {!token &&
              <Menu.Item key="home">
                <Link to="/home"><HomeOutlined />
                  Home</Link>
              </Menu.Item>
            }
            <Menu.Item key="about-us">
              <Link to="/about-us"><PicRightOutlined />
                About Us</Link>
            </Menu.Item>
            {!token &&
              <Menu.Item key="signin">
                <Link to="/signin"><LoginOutlined />
                  Login</Link>
              </Menu.Item>
            }
            {!token &&
              <Menu.Item key="signup">
                <Link to="/signup"><UserAddOutlined />
                  Sign Up</Link>
              </Menu.Item>
            }


          </Menu>
        </CustomScrollbars>
      </div>
    </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings, auth }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  const { authUser, token, initURL } = auth;

  return { navStyle, themeType, locale, pathname, token }
};
export default connect(mapStateToProps, { getUser })(SidebarContent);

