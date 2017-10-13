import { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import appService from '../../services/app';
import utils from '../../utils/utils';
import './Commend.less';

let first = true;

class Commend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.liked || false,
      count: props.count || 0
    };
  }
  componentWillReceiveProps(props) {
    if(!first) return;
    this.setState({
      liked: props.liked,
      count: props.count
    }, () => { first = false; });
  }
  like(id) {
    if(this.state.liked) return;
    appService.commend(id)
        .then(( {res, err} ) => {
            if(!err) this.setState({ liked: true, count: this.state.count+1  });
        });
  }
  render() {
    const btnClass = classnames(this.props.className, {
      _commend: true,
      _liked: this.state.liked,
    });
    const { id } = this.props;
    return <a style={{top: '16px'}} className={btnClass} onClick={ () => this.like(id)} >
      {this.state.count}
      {this.state.liked ? <i className="icon icon-liked"></i> : <i className="icon icon-like"></i>}
    </a>;
  }
}

export default Commend;
