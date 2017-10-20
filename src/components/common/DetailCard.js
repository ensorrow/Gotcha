import { Component } from 'react';
import './DetailCard.less';
import classnames from 'classnames';

let timer = null;

function createMarkup(rawHtml) {
    return {__html: rawHtml};
}

function richDetail(rawHtml) {
    return <div className="rich" dangerouslySetInnerHTML={createMarkup(rawHtml)} />;
}

class DetailCard extends Component{
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
        const content = this.props.content;
        return <div className="u-detail">
            <h1 className="u-title"><i className={classnames('icon', this.props.iconClass)}></i>{this.props.title}</h1>
            { this.props.image_path && <div className="imgWra">
                <img src={this.props.image_path} />
            </div> }
            <div className={classnames('richWra', {'all': this.state.open})} >{ richDetail(content) }</div>
            <a className="u-more" onClick={() => this.toggle()}>{this.state.open?'收起':'查看更多'}</a>
        </div>
    }
}

export default DetailCard;