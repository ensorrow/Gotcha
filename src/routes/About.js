import React from 'react';
import { connect } from 'dva';
import styles from './About.less';
import NameCard from '../components/about/NameCard';

function About({ dispatch, about }) {
  return (
    <div>
      <NameCard isDetail={about.isDetail} dispatch={dispatch} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
  	about: state.about
  };
}

export default connect(mapStateToProps)(About);
