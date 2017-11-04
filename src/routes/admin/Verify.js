import { Component } from 'react';
import './Verify.less';
import auth from '../../utils/auth';
import utils from '../../utils/utils';
import appService from '../../services/app';

class Verify extends Component{
    constructor(props){
        super(props);
        this.state = {
            verified: false,
            success: false
        }
    }
    componentWillMount(){
        if(!auth.adminToken) {
            utils.show('需要登录');
            window.location.replace(window.location.origin+window.location.pathname+'#/admin/login');
        }
    }
    verify(){
        wx.scanQRCode({
            needResult: 1, 
            scanType: ["qrCode"], 
            success: function (res) {
                var result = res.resultStr;
                appService.checkTicket({ token: auth.adminToken, event_id: 4, attend_code: result })
                    .then(({ res, err }) => {
                        if(res) this.setState({
                            verified: true,
                            success: true
                        });
                        else {
                            if(err.message == '入场审核token错误') return window.location.replace(window.location.origin+window.location.pathname+'#/admin/login');
                            this.setState({
                                verified: true,
                                success: false
                            });
                        }
                    });
            }
        });
    }
    render(){
        return <div className="m-verify">
            <h1><i className="icon icon-logor"></i>入场审核系统</h1>
            <div className="main">
                { this.state.verified ? <div className="verified">{ this.state.success ? <div><i className="icon icon-laugh"></i>这位小伙伴有入场资格</div> : <div><i className="icon icon-wrong"></i>这位小伙伴好像走错了</div>  }</div>: <div className="not">请点击扫描</div> }
                <button className="btn" onClick={() => this.verify()}>扫描</button>
            </div>
        </div>
    }
}

export default Verify;