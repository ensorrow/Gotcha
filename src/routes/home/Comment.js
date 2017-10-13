import { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Comment.less';
import { connect } from 'dva';
import moment from 'moment';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  render() {
    const { vm, dispatch } = this.props;
    return (<div className="m-comment">
      <div className="baseInfo">
        <h1>{vm.title}</h1>
        <h2><i className="icon icon-cal"></i>{moment(vm.start_date).format('M月d日 HH:mm')}-{moment(vm.end_date).format('M月d日 HH:mm')}</h2>
        <h2><i className="icon icon-add"></i>{vm.place_name + vm.place_city + vm.place_district}</h2>
      </div>
      <div className="textWra">
        <TextField
          hintText="请填写你的评价"
          multiLine
          rows={4}
          rowsMax={8}
          onChange={(e, v) => this.setState({ content: v })}
          style={{ backgroundColor: '#f6fbfc',padding: '0 10px', boxSizing: 'border-box' }}
          hintStyle={{ top: '12px' }}
          fullWidth={true}
          underlineShow={false}
        />
        <button className="btn" onClick={() => dispatch({ type: 'app/comment', payload: { content: this.state.content } })} >提交</button>
      </div>
    </div>);
  }
}

export default connect(({ app }) => ({ vm: app.event }))(Comment);
