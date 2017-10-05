import moment from 'moment';
import './Ticket.less';
import { routerRedux } from 'dva/router';

const TicketStatus = ['未分配', '待使用', '已过期', '已使用'];
const fmtDate = (m) => {
  return moment(m).format('YYYY年M月D日 HH:mm');
};

const Ticket = ({ vm, lg, dispatch }) => {
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
      {lg ? <div className="code"><img /></div> : null}
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
};

export default Ticket;
