import { Component } from 'react';
import classnames from 'classnames';
import './Scroll.less';
import utils from '../../utils/utils';

let currentPage = 1;
let lock = false;
const iswx = utils.is_wx();

class Scroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        currentPage = this.props.pagination.current_page || 1;
    }
    componentWillReceiveProps(props){
        currentPage = props.pagination.current_page || 1;
    }
    loadMore(){
        const _this = this.refs.scroll;
        if(iswx){
            if(_this.scrollHeight - (_this.scrollTop+_this.clientHeight)<=5) {
                this.getMore();
            }
        }else{
            if(_this.scrollHeight === _this.scrollTop+_this.clientHeight) {
                this.getMore();
            }
        }
    }
    getMore(){
        if(lock) return;
        if(currentPage >= this.props.pagination.total_pages) return utils.show('已经到底啦');
        lock = true;
        currentPage+=1;        
        this.props.moreAction(currentPage);
        setTimeout(() => {
            lock = false;
        },500);
    }
    render(){
        const classes = classnames('_scrollView', this.props.className);
        return <div onScroll={() => this.loadMore()} ref="scroll" className={classes} >
            {this.props.children}
        </div>
    }
}

export default Scroll;