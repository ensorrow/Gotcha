import { Component } from 'react';
import { connect } from 'dva';
import FlatButton from 'material-ui/FlatButton';
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward';
import classnames from 'classnames';
import appService from '../../services/app';
import utils from '../../utils/utils';
import './LikeButton.less';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      liked: props.liked
    });
  }
  like(id) {
    if(this.state.liked) return;
    if (this.props.type === 'user') {
      appService.follow(id)
        .then(({ res, err }) => {
          if (!err) this.setState({ liked: true });
        });
    } else {
      appService.follow_org(id)
        .then(({ res, err }) => {
          if (!err) {
            if (utils.getPath() === '/detail') {
              this.setState({ liked: true });
              this.props.dispatch({ type: 'getDetail' });
            }
          } else console.log(err);
        });
    }
  }
  render() {
    const btnClass = classnames({
      likeBtn: true,
      liked: this.state.liked,
    });
    const { id } = this.props;
    return <FlatButton className={btnClass} onClick={() => this.like(id)} label={this.state.liked ? '已关注' : '关注'} icon={<ArrowRight />} />;
  }
}

export default connect(({}) => ({}))(LikeButton);
