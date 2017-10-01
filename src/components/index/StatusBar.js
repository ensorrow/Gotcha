import RaisedButton from 'material-ui/RaisedButton';
import utils from '../../utils/utils';
import moment from 'moment';
import Favorite_b from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
import './StatusBar.less';
import { Component } from 'react';

class StatusBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            diffTime: 0
        }
    }
    countDown(){
        setInterval(() => {
            if(this.state.diffTime!==0){
                this.setState({
                    diffTime: this.state.diffTime-1
                });
            }
        }, 1000);
    }
    componentWillReceiveProps(props){
        const {start_date, end_date, apply_date} = props.vm;
        if(utils.compareTime(start_date, end_date, apply_date) === 1){
            this.setState({
                diffTime: parseInt((new Date(apply_date)-new Date())/1000)
            }, () => {
                this.countDown();
            });
        }
    }
    render(){
        let { id, start_date, end_date, apply_date,  status, has_collect, has_apply, has_comment, volume, over_can_enroll, users_count, price } = this.props.vm;

        if(!start_date) return <footer></footer>;
    
        const timeStatus = utils.compareTime(start_date, end_date, apply_date);
        if( timeStatus === 0) {
            return <footer>
                <span>{moment(apply_date).format('YYYY年 MM月DD日 HH:mm 开始报名')}</span>
                {has_collect ? <Favorite color="#e1274c" /> : <Favorite_b color="#e1274c" />}
            </footer>
        }
        if(timeStatus === 1) {
            return <footer>
                <span>{moment(apply_date).format('H')}点开始报名，还有<i>{moment.unix(this.state.diffTime).minutes()}</i>分<i>{moment.unix(this.state.diffTime).seconds()}</i>秒</span>
                {has_collect ? <Favorite color="#e1274c" /> : <Favorite_b color="#e1274c" />}
            </footer>
        }
        if(timeStatus === 2) {
            if(!has_apply) {
                if(volume<=users_count && !over_can_enroll) {
                    return <footer>
                        <span>没有名额了</span>
                        <RaisedButton
                            label="报名"
                            disabled={true}
                            style={{ float: 'right', right: '20px' }}
                        />
                        {has_collect ? <Favorite /> : <Favorite_b />}
                    </footer>
                } else{
                    return <footer>
                        <span>报名中</span>
                        <RaisedButton
                            label={"报名 ￥"+price}
                            primary={true}
                            style={{ float: 'right', right: '20px' }}
                        />
                    </footer>
                }
            }else{
                return <footer>
                    <span>已成功报名！</span>
                </footer>
            }
        }
        if(timeStatus === 3) {
            if(!has_apply) {
                return <footer>
                    <span>活动已经结束啦，下次早点来哦</span>
                    {has_collect ? <Favorite /> : <Favorite_b />}                
                </footer>
            }else{
                if(has_comment) {
                    return <footer>
                        <span>活动已结束</span>
                        <RaisedButton
                            label="去评价"
                            primary={true}
                            style={{ float: 'right', right: '20px' }}
                        />
                    </footer>
                }else {
                    return <footer>
                        <span>已评价</span>
                        <RaisedButton
                            label="修改评价"
                            primary={true}
                            style={{ float: 'right', right: '20px' }}
                        />
                    </footer>
                }
            }
        }
    }
}

export default StatusBar;