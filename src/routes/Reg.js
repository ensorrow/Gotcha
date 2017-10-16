import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'dva';
import TextField from 'material-ui/TextField';
// import './Login.less';
import appService from '../services/app';
import cookie from 'cookie';
import { routerRedux, Link } from 'dva/router';
import Dialog from 'material-ui/Dialog';
import utils from '../utils/utils';
import auth from '../utils/auth';
import CountBtn from '../components/common/CountBtn';

class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'normal',
      mobile: '',
      verify_code: '',
      step: 1,
      password: '',
      verify_pwd: '',
      open: false,
    };
  }
  componentDidMount() {
    const pre = utils.getQuery('pre');
    this.setState({
      prePath: pre || '/',
    });
  }
  reg() {
    if (!this.state.mobile || !this.state.verify_code) return utils.show('请检查手机号和验证码是否填写完整');    
    appService.reg({
      mobile: this.state.mobile,
      verify_code: this.state.verify_code,
    }).then(({ res, err }) => {
      if (res) {
        const tokenStr = cookie.serialize('token', res.token, { maxAge: 3600 * 72 });
        document.cookie = tokenStr;
        auth.initToken();
        utils.show('验证成功！');
        this.setState({ step: 2 });
      } else {
        utils.show('验证码不正确');
      }
    });
  }
  setPwd() {
    if (this.state.password !== this.state.verify_pwd) {
      return utils.show('两次密码不一致');
    }
    appService.setPassword({ password: this.state.password })
            .then(({ res, err }) => {
              if (!err) {
                utils.show('密码设置成功');
                this.props.dispatch(routerRedux.replace('/about/profile?new=1'));
              }
            });
  }
  countDown() {
    const timer = setInterval(() => {
      this.setState({
        count: this.state.count-1
      }, () => {
        this.state.count === 0 ? clearInterval(timer) : this.setState({ codeSent: false, count: 60 })
      });
    }, 1000);
  }
  sendCode(cb) {
    if (!this.state.mobile) return utils.show('请检查手机号');
    appService.getVerifyReg({
      mobile: this.state.mobile,
    }).then(({ res, err }) => {
      if (res) {
        utils.show('验证码已发送');
        cb();
      }
      else if (err.status_code == 400) this.setState({ open: true });
    });
  }
  render() {
    const stepCnt = this.state.step === 1 ? (<div className="formArea" >
      <div className="inputs">
        <div className="input">
          <div className="icon user_bu" />
          <input value={this.state.mobile} onChange={e => this.setState({ mobile: e.target.value })} placeholder="请输入手机号" />
          <CountBtn onClick={() => this.sendCode()} />
        </div>
        <div className="input">
          <div className="icon key_bu" />
          <input value={this.state.verify_code} onChange={e => this.setState({ verify_code: e.target.value })} placeholder="请输入验证码" />
        </div>
        <div className="btn btn-ok" onClick={() => this.reg()}>注册</div>
      </div>
    </div>) : (<div className="formArea" >
      <div className="inputs">
        <div className="input">
          <div className="icon user_bu" />
          <input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="请输入密码" />
        </div>
        <div className="input">
          <div className="icon key_bu" />
          <input value={this.state.verify_pwd} onChange={e => this.setState({ verify_pwd: e.target.value })} placeholder="请再次输入密码" />
        </div>
        <div className="btn btn-ok" onClick={() => this.setPwd()}>提交</div>
      </div>
    </div>);
    return (<div className="m-login">
      { stepCnt }
      <Dialog title="该手机号已被注册" open={this.state.open} actions={<Link to={`/login?mobile=${this.state.mobile}`}>发送验证码</Link>} />
    </div>);
  }
}

export default connect((state) => {
  return {

  };
})(Reg);
