import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'dva';
import { Link } from 'dva/router';
import TextField from 'material-ui/TextField';
import './Login.less';
import appService from '../services/app';
import cookie from 'cookie';
import { routerRedux } from 'dva/router';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'normal',
            mobile: '',
            password: '',
            verify_code: ''
        }
    }
    componentDidMount(){
        const pre = window.location.hash.match(/pre=\/.+(?=&)/)[0].substring(4);
        this.setState({
            prePath: pre
        });
    }
    login(){
        appService.login({
            mobile: this.state.mobile,
            password: this.state.password
        }).then(({ res }) => {
            var tokenStr = cookie.serialize('token', res.token, {maxAge: 3600*72});
            document.cookie = tokenStr;
            this.props.dispatch(routerRedux.replace(this.state.prePath));            
        }).catch(({ err }) => {
            console.log(err);
        });
    }
    fastLogin(){
        appService.fastLogin({
            mobile: this.state.mobile,
            verify_code: this.state.verify_code
        }).then(({ res }) => {
            var tokenStr = cookie.serialize('token', res.token, {maxAge: 3600*72});
            document.cookie = tokenStr;
            this.props.dispatch(routerRedux.replace(this.state.prePath));
        }).catch(({ err }) => {
            console.log(err);
        });
    }
    sendCode(){
        if(!this.state.mobile) return console.log('检查手机号')
        appService.getVerify({
            mobile: this.state.mobile
        }).then(({ res }) => {
            console.log('验证码已发送')
        });
    }
    handleChange(value){
        this.setState({
            type: value
        });
    }
    render() {
        return <div className="m-login">
            <Tabs value={this.state.type} onChange={() => this.handleChange()} >
                <Tab value="normal" label="账号密码登录">
                    <div className="formArea" >
                        <div className="inputs">
                            <div className="input">
                                <div className="icon user_bu"/>
                                <input value={this.state.mobile} onChange={(e) => this.setState({mobile: e.target.value})} placeholder="请输入账号"/>
                                {this.state.type === 'fast' ? <div className="btn-code" onClick={this.sendCode}>发送验证码</div> : null}
                            </div>
                            <div className="input">
                                <div className="icon key_bu"/>
                                <input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} placeholder="请输入密码" />
                            </div>
                            <div className="btn btn-ok" onClick={() => this.login()}>登录</div>
                            <Link to="/find-pwd" className="btn btn2">忘记密码？</Link>
                        </div>
                    </div>
                </Tab>
                <Tab value="fast" label="手机号快速登录">
                    <div className="formArea " >
                        <div className="inputs">
                            <div className="input">
                                <div className="icon user_bu"/>
                                <input value={this.state.mobile} onChange={(e) => this.setState({mobile: e.target.value})} placeholder="请输入手机号"/>
                                <div className="btn-code" onClick={() => this.sendCode()}>发送验证码</div>
                            </div>
                            <div className="input">
                                <div className="icon key_bu"/>
                                <input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} placeholder="请输入验证码" />
                            </div>
                        </div>
                        <div className="btn btn-ok" onClick={() => this.fastLogin()}>登录</div>
                        <div className="tip">未注册Gotcha帐号的手机号，登录时将自动注册Gotcha帐号，且代表您已同样<span className="tip2" onClick={this.show}>《Gotcha用户协议》</span></div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    }
}

export default connect(function(state){
    return{
        
    }
})(Login);