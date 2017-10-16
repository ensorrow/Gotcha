import { Component } from 'react';
import moment from 'moment';

let timer = null;

class Progress extends Component{
    constructor(props) {
        super(props);
        this.state = {
            diffTime: 0            
        };
    }
    countDown() {
        timer = setInterval(() => {
          if (this.state.diffTime !== 0) {
            this.setState({
              diffTime: this.state.diffTime - 1,
            });
          } else {
            clearInterval(timer);
          }
        }, 1000);
    }
    componentDidMount() {
        this.setState({
            diffTime: parseInt((new Date(this.props.apply_date) - new Date()) / 1000),
        }, () => {
            this.countDown();
        });
    }
    componentWillUnmount() {
        clearInterval(timer);
        timer = null;
    }
    render(){
        const diffTime = this.state.diffTime;
        return <div className="progress">
            <span>报名中({`${this.props.users_count}/${this.props.volume}`})</span>
            <span>
            <i className="icon icon-clock"></i> 剩余时间：{moment.unix(diffTime).days()}天{moment.unix(diffTime).hours()}小时{moment.unix(diffTime).minutes()}分钟{moment.unix(diffTime).seconds()}秒
            </span>
        </div>
    }
}

export default Progress;