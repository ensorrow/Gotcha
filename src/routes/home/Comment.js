import { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Comment.less';
import { connect } from 'dva';

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }
    render(){
        const { vm, dispatch } = this.props;
        return <div className="m-comment">
            <div className="baseInfo">
                <h1>{vm.title}</h1>
                <h3>{vm.start_date}-{vm.end_date}</h3>
                <h3>{vm.place_name + vm.place_city + vm.place_district}</h3>
            </div>
            <div className="textWra">
                <TextField
                    hintText="请填写你的评价"
                    multiLine={true}
                    rows={4}
                    rowsMax={8}
                    onChange={(e,v) => this.setState({content: v})}
                    style={{backgroundColor: '#fff'}}
                />
                <RaisedButton
                    label="提交"
                    primary={true}
                    style={{ display: 'block' }}
                    onClick={() => dispatch({ type: 'app/comment', payload: {content: this.state.content} })}
                />
            </div>
        </div>
    }
}

export default connect(({app}) => ({vm: app.event}))(Comment);