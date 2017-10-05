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

class Reg extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'normal',
            mobile: '',
            verify_code: '',
            step: 1,
            password: '',
            verify_pwd: '',
            open: false
        }
    }
    componentDidMount(){
        const pre = utils.getQuery('pre');        
        this.setState({
            prePath: pre || '/'
        });
    }
    reg(){
        appService.reg({
            mobile: this.state.mobile,
            verify_code: this.state.verify_code
        }).then(({ res, err }) => {
            if(res) {
                var tokenStr = cookie.serialize('token', res.token, {maxAge: 3600*72});
                document.cookie = tokenStr;
                auth.initToken();
                console.log('验证成功！');
                this.setState({step: 2});
            }else{
                this.props.dispatch({type: 'app/dialog', payload: {content: '验证码错误！'}});
            }
        });
    }
    setPwd(){
        if(this.state.password !== this.state.verify_pwd) {
            return console.log('两次密码不一致')
        }
        appService.setPassword({password: this.state.password})
            .then(({ res, err }) => {
                if(!err) {
                    console.log('密码设置成功');
                    this.props.dispatch(routerRedux.replace('/about/profile?new=1'));
                }
            })
    }
    sendCode(){
        if(!this.state.mobile) return console.log('检查手机号')
        appService.getVerifyReg({
            mobile: this.state.mobile
        }).then(({ res, err }) => {
            if(res) console.log('验证码已发送');
            else if(err.response.status === 400 ) this.setState({open: true})
        });
    }
    render() {
        const stepCnt = this.state.step ===1 ? <div className="formArea" >
        <div className="inputs">
            <div className="input">
                <div className="icon user_bu"/>
                <input value={this.state.mobile} onChange={(e) => this.setState({mobile: e.target.value})} placeholder="请输入手机号"/>
                <div className="btn-code" onClick={() => this.sendCode()}>发送验证码</div>
            </div>
            <div className="input">
                <div className="icon key_bu"/>
                <input value={this.state.verify_code} onChange={(e) => this.setState({verify_code: e.target.value})} placeholder="请输入验证码" />
            </div>
            <div className="btn btn-ok" onClick={() => this.reg()}>注册</div>
        </div>
        </div> : <div className="formArea" >
            <div className="inputs">
                <div className="input">
                    <div className="icon user_bu"/>
                    <input value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} placeholder="请输入密码"/>
                </div>
                <div className="input">
                    <div className="icon key_bu"/>
                    <input value={this.state.verify_pwd} onChange={(e) => this.setState({verify_pwd: e.target.value})} placeholder="请再次输入密码" />
                </div>
                <div className="btn btn-ok" onClick={() => this.setPwd()}>提交</div>
            </div>
        </div>
        return <div className="m-login">
            { stepCnt }
            <Dialog title="该手机号已被注册" open={this.state.open} actions={ <Link to={"/login?mobile="+this.state.mobile}>发送验证码</Link> } />
        </div>
    }
}

export default connect(function(state){
    return{
        
    }
})(Reg);