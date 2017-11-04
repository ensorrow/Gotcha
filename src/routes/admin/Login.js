import { Component } from 'react';
import auth from '../../utils/auth';
import utils from '../../utils/utils';
import appService from '../../services/app';
import cookie from 'cookie';

class AdminLogin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        second_password: ''
      };
    }
    login() {
        const email = this.state.email;
        const second_password = this.state.second_password;
        if(!email || !second_password) return utils.show('请检查表单是否填写完整');
        appService.adminLogin({ email, second_password })
            .then(({ res }) => {
                if(res) {
                    const tokenStr = cookie.serialize('adminToken', res.token, { maxAge: 3600 * 72 });
                    document.cookie = tokenStr;
                    auth.initAdminToken();
                    window.location.replace(window.location.origin+window.location.pathname+'#/admin');
                }
            });
    }
    render(){
        return <div className="m-login m-verify">
            <h1><i className="icon icon-logor"></i>入场审核系统</h1>
            <div className="formArea" style={{marginTop: 12}}>
                <div className="inputs">
                    <div className="input">
                        <div className="icon user_bu" />
                        <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="请输入账号" />
                    </div>
                    <div className="input">
                        <div className="icon key_bu" />
                        <input type="password" value={this.state.second_password} onChange={e => this.setState({ second_password: e.target.value })} placeholder="请输入密码" />
                    </div>
                    <div className="btn btn-ok" onClick={() => this.login()}>登录</div>
                </div>
            </div>
        </div>
        
    }
}

export default AdminLogin;