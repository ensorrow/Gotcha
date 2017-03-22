import React from 'react';
import { connect } from 'dva';
import styles from './About.less';

function About() {
  return (
    <div className={styles.normal}>
      Route Component: About
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(About);
