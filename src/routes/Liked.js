import React from 'react';
import { connect } from 'dva';
import styles from './Liked.less';

function Liked() {
  return (
    <div className={styles.normal}>
      Route Component: Liked
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Liked);
