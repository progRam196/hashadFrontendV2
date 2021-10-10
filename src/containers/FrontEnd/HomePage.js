import React from "react";
import {Card, Col, Row} from "antd";
import IntlMessages from "util/IntlMessages";
import PostList from "../../components/wall/PostList/index";
import CustomScrollbars from "util/CustomScrollbars";
import ReactPlayer from 'react-player'

const HomePage = () => {

  let postList = [];
  let user = [];

  return (

      <div className="gx-main-content">
      <Row>
        <Col xl={6} lg={12} md={0} sm={24} xs={24} className="gx-d-none gx-d-sm-block">
          <img src={require('../../assets/images/homepage.png')} />
          <ReactPlayer width className="gx-img-fluids" playing={true} loop={true} controls={true} url="http://localhost:8000/Videos/homepage.mp4" alt="post"/>
        </Col>
        <Col xl={12} lg={12} md={24} sm={16} xs={24}>
          <CustomScrollbars className="gx-wall-scroll" >
            <div className="gx-wall-postlist">
               <PostList postList={postList} user={user}/>
            </div>
          </CustomScrollbars>
        </Col>
      </Row>
    </div>

  );
};

export default HomePage;
