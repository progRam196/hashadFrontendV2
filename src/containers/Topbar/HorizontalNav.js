import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { PicRightOutlined, HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import { getUser } from "../../appRedux/actions/Auth";


const SubMenu = Menu.SubMenu;

class HorizontalNav extends Component {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    }
  };

  render() {
    const { pathname, navStyle, token } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (

      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">
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
          <Menu.Item key="signup">
            <Link to="/signup"><UserAddOutlined />
              Create New Account</Link>
          </Menu.Item>
        }
       {!token &&
          <Menu.Item key="signin">
            <Link to="/signin"><LoginOutlined />
              Already User</Link>
          </Menu.Item>
        }
      </Menu>


    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({ settings, auth }) => {
  const { authUser, token, initURL } = auth;
  const { themeType, navStyle, pathname, locale } = settings;
  return { themeType, navStyle, pathname, locale, token }
};
export default connect(mapStateToProps, { getUser })(HorizontalNav);

