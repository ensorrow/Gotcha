import ActivityCard from '../../components/index/ActivityCard';
import './MoreEvent.less';
import classnames from 'classnames';
import { Component } from 'react';

class MoreEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    toggle(){
        this.setState({
            open: !this.state.open
        });
    }
    render(){
        const events = this.props.events || [];
        return <div className="activityRecommend">
            <h1 className="u-title"><i className={classnames('icon', this.props.iconClass)}></i>{this.props.title}</h1>
            <div className={classnames('content', {all: this.state.open})}>
                {events.length ? events.map(event => <ActivityCard vm={event} key={event.id} />) : '暂无其他活动'}
            </div>
            { events.length>3 && <a className="u-more" onClick={() => this.toggle()}>{this.state.open?'收起':'查看更多'}</a> }
        </div>
    }
}

export default MoreEvent;