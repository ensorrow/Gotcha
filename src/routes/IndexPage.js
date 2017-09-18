import React, {Component} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Slider from '../components/index/Carousel';
import ScrollTab from '../components/index/ScrollTab';
import IndexCard from '../components/index/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

function IndexPage({ home, getFavi, getNear, getWeek }) {
	
  return (
    <div>
      <div className={styles.top}>
				<Slider imgs={home.carousel} />
				<ScrollTab />
				<Tabs>
          <Tab label="最受欢迎" onActive={getFavi}>
            <div>
              <IndexCard />
              <IndexCard />
              <IndexCard />
            </div>
          </Tab>
          <Tab label="距离最近" onActive={getNear}>
            <div>
              {home.nearest.dataList.map((item) => <IndexCard data={item} />)}
            </div>
          </Tab>
          <Tab label="只看周末" onActive={getWeek}>
            <div>
              <IndexCard />
              <IndexCard />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    home: state.home
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getFavi: () => dispatch({type: 'home/getFavi'}),
    getNear: () => dispatch({type: 'home/getNear'}),
    getWeek: () => dispatch({type: 'home/getWeek'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
