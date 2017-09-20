import moment from 'moment';
import './Ticket.less'

const TicketStatus = ['未分配', '待使用', '已过期', '已使用'];
const fmtDate = (m) => {
  return moment(m).format('YYYY年M月D日 HH:mm')
}

const Ticket = ({vm, lg}) => <div className={vm.status != 2 ? 'active ticket' : 'ticket'}>
  <div className="part1">
      <span className="name">{vm.event.title}</span>
      <span className="state">{TicketStatus[vm.status]}</span>
  </div>
  {lg ? <div className="code"><img></img></div> : null}
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
  {lg ? <div className="addr"><span className="icon"/>陕西省陕西省陕西省，陕西省陕西省陕西省</div> : null}
  {lg ? <div className="notes">
      <div className="label">注意事项</div>
      <div className="info">活动时记得带雨伞</div>
  </div> : null}
</div>

export default Ticket;