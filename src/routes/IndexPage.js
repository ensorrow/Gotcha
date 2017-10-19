import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Slider from '../components/index/Carousel';
import ScrollTab from '../components/index/ScrollTab';
import IndexCard from '../components/index/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import utils from '../utils/utils';
import Scroll from '../components/common/Scroll';
import appService from '../services/app';

function IndexPage({ home, getFavi, getNear, getWeek, getByTag, moreActionFavi,  moreActionWeekend}) {
  const faviPagi = home.favorite.meta.pagination;
  const weekPagi = home.weekend.meta.pagination;
  return (
    <div className="m-home">
      <div>
        <Slider imgs={home.carousel} />
        <ScrollTab tabs={home.tags} onTab={getByTag} active={home.activeTag} />
        <Tabs className="m-tabs">
          <Tab label="最受欢迎" onActive={getFavi}>
            <div>
              { home.favorite.data.length ? home.favorite.data.map(item => <IndexCard vm={item} key={item.id} />) : ''}
              { faviPagi.current_page<faviPagi.total_pages ? <button className="loadMore" onClick={moreActionFavi.bind(null, faviPagi.current_page+1)}>加载更多</button> : null }
            </div>
          </Tab>
          <Tab label="距离最近" onActive={getNear}>
            <div>
              {home.nearest.data && home.nearest.data.map(item => <IndexCard vm={item} key={item.id} />)}
            </div>
          </Tab>
          <Tab label="只看周末" onActive={getWeek}>
            <div>
              {home.weekend.data && home.weekend.data.map(item => <IndexCard vm={item} key={item.id} />)}
            </div>
            { weekPagi.current_page<weekPagi.total_pages ? <button className="loadMore" onClick={moreActionWeekend.bind(null, weekPagi.current_page+1)}>加载更多</button> : null }
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
      if(utils.is_wx()){ appService.initWechatSdk('http://www.gotcha.net.cn')
        .then(( { res, err } ) => {
          if(res) {
            appService.getWechatSdk()
              .then(result => {
                if(result.res) {
                  delete result.res.url;
                  wx.config(result.res);
                  wx.ready(function() {
                    wx.getLocation({
                      type: 'wgs84', 
                      success: function (pos) {
                        const latitude = pos.latitude; // 纬度，浮点数，范围为90 ~ -90
                        const longitude = pos.longitude; // 经度，浮点数，范围为180 ~ -180。
                        utils.show('位置信息获取成功');
                        dispatch({ type: 'home/getNear', payload: { position: { latitude, longitude } } });
                      },
                      cancel: function () {
                        utils.show('用户取消');
                      }
                    });
                  });
                  wx.error(function(err){
                    utils.show('微信权限信息获取错误')
                    console.log(err);
                  });
                }
              })
          }
        });
      }
      else if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(pos){
          dispatch({ type: 'home/getNear', payload: { position: pos.coords } });
        }, function(err) {
          switch(err.code){
            case 1: utils.show('没有位置信息权限');break;
            case 2: utils.show('位置获取出错');break;
            case 3: utils.show('获取位置信息超时');break;
            default: utils.show('地理位置暂不可用');
          };
        }, { timeout: 5000 });
      } else {
        utils.show("浏览器不支持地理位置");
      }
    },
    getWeek: () => dispatch({ type: 'home/getWeek' }),
    getByTag: tag => dispatch({ type: 'home/getByTag', payload: { tag } }),
    moreActionFavi: (page) => dispatch({ type: 'home/getFavi', payload: {page} }),
    moreActionWeekend: (page) => dispatch({ type: 'home/getWeek', payload: {page} })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
