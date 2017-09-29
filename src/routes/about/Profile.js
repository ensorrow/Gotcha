import { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'dva';
import './Profile.less';
import aboutService from '../../services/about';

class Profile extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        aboutService.getUserInfo()
            .then(({ res }) => {
                this.setState({
                    myInfo: res.data
                })
            }).catch(({ err }) => console.log(err));
    }
    render() {
        const myInfo = this.state.myInfo || {};
        console.log(myInfo)
        return <div className="m-profile">
            <List>
                <ListItem primaryText="用户名">
                    <span className="listRight">{myInfo.nickname}</span>
                </ListItem>
                <ListItem primaryText="头像" rightAvatar={<Avatar src="http://lvzheyang.top/images/avatar.jpg" />} >
                    
                </ListItem>
                <ListItem primaryText="个人介绍">
                    <span className="listRight">测试很长很长哈哈哈哈或或或或或</span>
                </ListItem>
                <ListItem primaryText="性别">
                    <span className="listRight">测试</span>
                </ListItem>
                <ListItem primaryText="生日">
                    <span className="listRight">测试</span>
                </ListItem>
                <ListItem primaryText="所在地">
                    <span className="listRight">测试</span>
                </ListItem>
                <ListItem primaryText="学校" secondaryText="在校生可以填写学校资料">
                    <span className="listRight">测试</span>
                </ListItem>
            </List>
        </div>
    }
}

export default connect(function(state) {
    return {

    }
})(Profile);