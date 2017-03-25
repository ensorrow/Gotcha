import React from 'react';
import { connect } from 'dva';
import styles from './Liked.less';

import LikeCard from '../components/liked/Card';

function Liked() {
  return (
    <div className={styles.normal}>
      <LikeCard />
      <LikeCard isAuthor />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Liked);
