import { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import './Toast.less';

let lock = false;

class Toast extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            content: '',
            load: true
        }
    }
    show(content){
        if(lock) return;
        lock = true;
        const duration = this.props.duration || 2000;
        this.setState({
            open: true,
            content,
            load: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    open: false,
                }, () => {lock=false;});
            }, duration);
        });
    }
    showLoading(){
        if(lock) return;
        lock = true;
        this.setState({
            open: true,
            load: true,
            content: '加载中'
        });
    }
    hideLoading(){
        this.setState({
            open: false,
        }, () => {lock=false;});
    }
    render(){
        return <div className={classnames("u-toast", { active: this.state.open, load: this.state.load })}>
            {this.state.load ? <i className="icon icon-load rotate"></i> : null}
            {this.state.content}
        </div>
    }
}

Toast.init = function(properties){
    let { container, ...props } = properties;
    container = container || document.body.appendChild(document.createElement('div'));
    const toast = ReactDOM.render(<Toast {...props} />, container);
    return {
        show(content){
            toast.show(content);
        },
        showLoading(){
            toast.showLoading();
        },
        hideLoading(){
            toast.hideLoading();
        }
    }
}

export default Toast;