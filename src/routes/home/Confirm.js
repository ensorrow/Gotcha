import { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import './Confirm.less';
import classnames from 'classnames';
import homeService from '../../services/home';
import appService from '../../services/app';
import utils from '../../utils/utils';

const Confirm = ({ vm, user, dispatch }) => {
    function applyFree(){
        dispatch({ type: 'app/applyEvent', payload: { event_id: vm.id } })
    }
    function applyPay(){
        if(!utils.is_wx()) return utils.show('请在微信浏览器中打开');
        homeService.applyPay(vm.id)
            .then(({ res, err }) => {
                if(res) {
                    appService.initWechatPay(res.data.id)
                        .then(( payInfo ) => {
                            if(payInfo.res) {
                                appService.getWechatSdk()
                                    .then((wxConfig) => {
                                        wxConfig.res.jsApiList.push('chooseWXPay');
                                        wx.config(wxConfig.res);
                                        wx.ready(() => {
                                            wx.checkJsApi({
                                                jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                                                success: function(res) {
                                                    // 以键值对的形式返回，可用的api值true，不可用为false
                                                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                                    console.log(res);
                                                }
                                            });
                                            wx.chooseWXPay({
                                                success(res) {
                                                     if(res.err_msg == "get_brand_wcpay_request：ok" ) {
                                                         utils.show('支付成功');
                                                         dispatch({ type: 'app/applyEvent', payload: { event_id: vm.id } });
                                                     }else{
                                                        utils.show('支付未成功！');
                                                        console.log(res);
                                                        return false;
                                                     }
                                                },
                                                fail(){

                                                },
                                                ...payInfo.res
                                            })
                                        })
                                    })
                            }
                        })
                }
            });
    }
    let content;
    if(!vm.has_apply) {
        content = <div>
            <ul className="user">
                <li><i className="icon icon-user"></i>{user.nickname || '未命名'}</li>
                <li><i className="icon icon-mob"></i>{user.mobile || '手机号为空'}</li>
            </ul>
            <ul className="org">
                <h1>{vm.title}</h1>
                <li><i className="icon icon-calbu"></i>{moment(vm.start_date).format('M月D日,HH:mm')}-{moment(vm.end_date).format('M月D日,HH:mm')}</li>
                <li className="sp"><i className="icon icon-addbu"></i><p>{vm.place_name}</p></li>
                <li><i className="icon icon-price"></i>{vm.is_fee ? vm.price : '免费'}</li>
                <li className="sp"><i className="icon icon-notice"></i><p>{vm.notice}</p></li>
            </ul>
            <div className="pay">
                <RadioButtonGroup name="shipSpeed" defaultSelected="wechat" labelPosition="left" className="selGroup">
                    <RadioButton
                        value="wechat"
                        label={<span><i className="icon icon-wechat"></i> 微信支付</span>}
                        style={{}}
                    />
                </RadioButtonGroup>
                <button className={classnames("btn", {free: !vm.is_fee})} onClick={ vm.is_fee ? applyPay : applyFree }>{vm.is_fee ? '确认支付': '免费报名'}</button>
            </div>
            <div className="plh"></div>
        </div>;
    } else {
        content = <div className="success">
            <img src={require('../../assets/images/achieve_bu.png')} alt="success"/>
            <h2>报名成功</h2>
            <h3>你可以在“我的”里查看您的电子券</h3>
        </div>
    }
    return <div className="m-confirm">
        {content}
    </div>
}

export default connect(({app, about}) => ({
    vm: app.event,
    user: about.myInfo
}))(Confirm);