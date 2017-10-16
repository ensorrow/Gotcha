import { Component } from 'react';
import styles from './CountBtn.less';

let timer = null;

class CountBtn extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: 60,
            isCounting: false
        }
    }
    componentWillUnmount(){
        if(timer) clearInterval(timer);
        timer = null;
    }
    countDown(){
        timer = setInterval(()=>{
            if(this.state.count === 1) {
                clearInterval(timer);
                return this.setState({
                    isCounting: false,
                    count: 60
                });
            }
            this.setState({
                count: this.state.count-1
            });
        }, 1000);
    }
    emit(){
        this.props.onClick(() => {
            this.setState({ isCounting: true }, this.countDown);
        });
    }
    render(){
        return <div className={styles.btnCode} onClick={this.state.isCounting?null:() => this.emit()}>{this.state.isCounting ? this.state.count+'s' : '发送验证码'}</div>;
    }
}

export default CountBtn;