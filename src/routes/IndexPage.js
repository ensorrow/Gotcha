import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Slider from '../components/index/Carousel';
import ScrollTab from '../components/index/ScrollTab';
import IndexCard from '../components/index/Card';

function IndexPage() {
	
  return (
    <div>
      <div className={styles.top}>
				<Slider />
				<ScrollTab />
				<IndexCard />
				<IndexCard />
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
