import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Slider from '../components/index/Carousel';
import ScrollTab from '../components/index/ScrollTab';
import IndexCard from '../components/index/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import utils from '../utils/utils';

function IndexPage({ home, getFavi, getNear, getWeek, getByTag }) {
  return (
    <div>
      <div className={styles.top}>
        <Slider imgs={home.carousel} />
        <ScrollTab tabs={home.tags} onTab={getByTag} active={home.activeTag} />
        <Tabs className="m-tabs">
          <Tab label="最受欢迎" onActive={getFavi}>
            <div>
              { home.favorite.dataList.length ? home.favorite.dataList.map(item => <IndexCard vm={item} key={item.id} />) : ''}
            </div>
          </Tab>
          <Tab label="距离最近" onActive={getNear}>
            <div>
              {home.nearest.dataList && home.nearest.dataList.map(item => <IndexCard vm={item} key={item.id} />)}
            </div>
          </Tab>
          <Tab label="只看周末" onActive={getWeek}>
            <div>
              {home.weekend.dataList && home.weekend.dataList.map(item => <IndexCard vm={item} key={item.id} />)}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    getFavi: () => dispatch({ type: 'home/getFavi' }),
    getNear: () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(pos){
          dispatch({ type: 'home/getNear', payload: { position: pos.coords } });
        }, function(err) {
          console.log(err);
          utils.show("地理位置暂不可用");
        });
      } else {
        utils.show("地理位置暂不可用");
      }
    },
    getWeek: () => dispatch({ type: 'home/getWeek' }),
    getByTag: tag => dispatch({ type: 'home/getByTag', payload: { tag } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
