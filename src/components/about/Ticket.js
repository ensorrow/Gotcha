import moment from 'moment';
import './Ticket.less';
import { routerRedux } from 'dva/router';
import { Component } from 'react';

const TicketStatus = ['未分配', '待使用', '已过期', '已使用'];
const fmtDate = (m) => {
  return moment(m).format('YYYY年M月D日 HH:mm');
};

class Ticket extends Component{
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(props){
    if(!props.lg) return;
    const qrcode = new QRCode(this.refs.qrWra, {
      width: 128,
      height: 128,
      text: props.vm.attend_code
    });
  }
  render(){
    const { vm, lg, dispatch } = this.props;
    
    if (vm) {
      return (<div
        className={vm.status != 2 ? 'active ticket' : 'ticket'} onClick={lg ? null : () => dispatch(routerRedux.push({
          pathname: `/about/ticketdetail?id=${vm.id}`,
        }))}
      >
        <div className="part1">
          <span className="name">{vm.event.title}</span>
          <span className="state">{TicketStatus[vm.status]}</span>
        </div>
        {lg ? <div ref="qrWra" className="code" style={{ width: '128px', height: '128px' }}></div> : null}
        <div className="part2">
          <div className="time">
            <span className="label">开始时间</span>
            <span>{fmtDate(vm.event.start_date)}</span>
          </div>
          <div className="time">
            <span className="label">结束时间</span>
            <span>{fmtDate(vm.event.end_date)}</span>
          </div>
        </div>
        {lg ? <div className="addr"><span className="icon" />{vm.event.place_name}</div> : null}
        {lg ? <div className="notes">
          <div className="label">注意事项</div>
          <div className="info">{vm.event.notice}</div>
        </div> : null}
      </div>);
    } else {
      return null;
    }
  }
}


export default Ticket;
