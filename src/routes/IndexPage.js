import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Slider from '../components/index/Carousel';
import ScrollTab from '../components/index/ScrollTab';
import IndexCard from '../components/index/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

function renderContent(dataArr, dispatch) {
  if(!dataArr) return null;
  else return <div>
    {dataArr.map((data) => <IndexCard data={data} dispatch={dispatch} />)}
  </div>;
}

function IndexPage({ dispatch, home }) {
	
  return (
    <div>
      <div className={styles.top}>
				<Slider />
				<ScrollTab />
				<Tabs>
          <Tab label="最受欢迎" onActive={() => dispatch({type: 'home/getList', payload: {page:1,size: 10}})}>
            <div>
              <IndexCard dispatch={dispatch} />
              <IndexCard dispatch={dispatch} />
              <IndexCard dispatch={dispatch} />
            </div>
          </Tab>
          <Tab label="距离最近">
            <div>
              {home.dataList.nearest.map((item) => <IndexCard data={item} dispatch={dispatch} />)}
            </div>
          </Tab>
          <Tab label="只看周末">
            <div>
              <IndexCard dispatch={dispatch} />
              <IndexCard dispatch={dispatch} />
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

export default connect(mapStateToProps)(IndexPage);
