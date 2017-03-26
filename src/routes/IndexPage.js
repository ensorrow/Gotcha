import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Slider from '../components/index/Carousel';
import ScrollTab from '../components/index/ScrollTab';
import IndexCard from '../components/index/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

function IndexPage({ dispatch }) {
	
  return (
    <div>
      <div className={styles.top}>
				<Slider />
				<ScrollTab />
				<Tabs>
          <Tab label="最受欢迎">
            <div>
              <IndexCard  dispatch={dispatch}/>
              <IndexCard dispatch={dispatch} />
            </div>
          </Tab>
          <Tab label="距离最近">
            <div>
              <IndexCard dispatch={dispatch} />
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

IndexPage.propTypes = {
};

export default connect()(IndexPage);
