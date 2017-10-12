import { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Dlg } from '../../components/about/Dlg';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import { connect } from 'dva';
import './Profile.less';
import aboutService from '../../services/about';
import { gender } from '../../utils/filters';
import moment from 'moment';
import Upload from 'rc-upload';
import auth from '../../utils/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myInfo: {},
      myInfo2: {},
      dlgName: false,
      dlgSubscribe: false,
      dlgUniversity: false,
      dlgSex: false,
      dlgBirth: false,
      dlgPlace: false,
      dlgAvatar: false,
    };
  }
  componentDidMount() {
    aboutService.getUserInfo()
            .then(({ res }) => {
              this.setState({
                myInfo: res.data,
              });
            }).catch(({ err }) => console.log(err));
  }
  render() {
    const myInfo = this.state.myInfo;
    const uploadProp = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.Gotcha api.v1+json',
        Authorization: `Bearer ${auth.token}`,
      },
      action: 'http://112.74.190.30:8800/api/images',
      name: 'image',
      onSuccess(result) {
        console.log(result);
        this.setState({ myInfo2: { avatar: result } });
      },
    };
    return (<div className="m-profile">
      <List style={{backgroundColor: '#fff'}}>
        <ListItem primaryText="用户名" onClick={() => this.setState({ dlgName: true })} >
          <span className="listRight">{myInfo.nickname || '未填写'}</span>
        </ListItem>
        <ListItem primaryText="头像" onClick={() => this.setState({ dlgAvatar: true })} rightAvatar={<Avatar style={{ top: '10px', backgroundColor: 'none' }} size={30} src={myInfo.avatar || require('../../assets/images/smile.png')} />} />
        <ListItem primaryText="个人介绍" onClick={() => this.setState({ dlgSubscribe: true })}>
          <span className="listRight">{myInfo.subscribe || '未填写'}</span>
        </ListItem>
        <ListItem primaryText="性别" onClick={() => this.setState({ dlgSex: true })}>
          <span className="listRight">{gender(+myInfo.sex) || '未填写'}</span>
        </ListItem>
        <ListItem primaryText="生日" onClick={() => this.setState({ dlgBirth: true })}>
          <span className="listRight">{myInfo.birthday || '未填写'}</span>
        </ListItem>
        <ListItem primaryText="所在地" onClick={() => this.setState({ dlgPlace: true })} >
          <span className="listRight">{myInfo.city || '未填写'}</span>
        </ListItem>
        <ListItem primaryText="学校" onClick={() => this.setState({ dlgUniversity: true })} secondaryText="在校生可以填写学校资料">
          <span className="listRight">{myInfo.university || '未填写'}</span>
        </ListItem>
      </List>
      <Dlg
        title="用户名：" open={this.state.dlgName} close={() => this.setState({ dlgName: false })}
        done={() => {
          myInfo.nickname = this.state.myInfo2.nickname;
          aboutService.putMyInfo({ data: { nickname: myInfo.nickname } }).then(({ res }) => this.setState({ myInfo: res.data, dlgName: false }));
        }}
      >
        <TextField id="nickname" defaultValue={myInfo.nickname} onChange={(e, v) => this.setState({ myInfo2: { nickname: v } })} />
      </Dlg>
      <Dlg
        title="头像：" open={this.state.dlgAvatar} close={() => this.setState({ dlgAvatar: false })}
        done={() => {
          myInfo.avatar = this.state.myInfo2.avatar;
          aboutService.putMyInfo({ data: { avatar: myInfo.avatar } }).then(({ res }) => this.setState({ myInfo: res.data, dlgAvatar: false }));
        }}
      >
        <Upload {...uploadProp} >点击上传</Upload>
      </Dlg>
      <Dlg
        title="个人介绍：" open={this.state.dlgSubscribe} close={() => this.setState({ dlgSubscribe: false })}
        done={() => {
          myInfo.subscribe = this.state.myInfo2.subscribe;
          aboutService.putMyInfo({ data: { subscribe: myInfo.subscribe } }).then(({ res }) => this.setState({ myInfo: res.data, dlgSubscribe: false }));
        }}
      >
        <TextField id="subscribe" multiLine defaultValue={myInfo.subscribe} onChange={(e, v) => this.setState({ myInfo2: { subscribe: v } })} />
      </Dlg>
      <Dlg
        title="性别：" open={this.state.dlgSex} close={() => this.setState({ dlgSex: false })}
        done={() => {
          myInfo.sex = this.state.myInfo2.sex;
          aboutService.putMyInfo({ data: { sex: myInfo.sex } }).then(({ res }) => this.setState({ myInfo: res.data, dlgSex: false }));
        }}
      >
        <RadioButtonGroup name="sex" defaultSelected={`${myInfo.sex}`} onChange={(e, v) => this.setState({ myInfo2: { sex: +v } })} >
          <RadioButton
            value="0"
            label="男"
          />
          <RadioButton
            value="1"
            label="女"
          />
        </RadioButtonGroup>
      </Dlg>
      <Dlg
        title="生日：" open={this.state.dlgBirth} close={() => this.setState({ dlgBirth: false })}
        done={() => {
          myInfo.birthday = this.state.myInfo2.birthday;
          aboutService.putMyInfo({ data: { birthday: myInfo.birthday } }).then(({ res }) => this.setState({ myInfo: res.data, dlgBirth: false }));
        }}
      >
        <DatePicker name="birthday" defaultDate={new Date(myInfo.birthday)} onChange={(e, v) => this.setState({ myInfo2: { birthday: moment(v).format('YYYY-MM-DD') } })} />
      </Dlg>
      <Dlg
        title="所在地：" open={this.state.dlgPlace} close={() => this.setState({ dlgPlace: false })}
        done={() => {
          myInfo.city = this.state.myInfo2.city;
          aboutService.putMyInfo({ data: { city: myInfo.city } }).then(({ res }) => this.setState({ myInfo: res.data, dlgPlace: false }));
        }}
      >
        <TextField id="city" defaultValue={myInfo.city} onChange={(e, v) => this.setState({ myInfo2: { city: v } })} />
      </Dlg>
      <Dlg
        title="学校：" open={this.state.dlgUniversity} close={() => this.setState({ dlgUniversity: false })}
        done={() => {
          myInfo.university = this.state.myInfo2.university;
          aboutService.putMyInfo({ data: { university: myInfo.university } }).then(({ res }) => this.setState({ myInfo: res.data, dlgUniversity: false }));
        }}
      >
        <TextField id="university" defaultValue={myInfo.university} onChange={(e, v) => this.setState({ myInfo2: { university: v } })} />
      </Dlg>
    </div>);
  }
}

export default connect((state) => {
  return {

  };
})(Profile);
