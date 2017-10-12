import styles from './TicketList.less';
import { Link } from 'dva/router';
import moment from 'moment';

const MiniTicket = ({ data, id }) => <div className="miniTicket">
  <Link to={`/about/ticketdetail?id=${id}`}>
    <h1>{data.title}</h1>
    <h2>{moment(data.start_date).format('M月d日')}</h2>
  </Link>
</div>;

const TicketList = ({ vm }) => <div className="ticketList">
  {!vm.length && '暂无入场券'}
  <div style={{ width: `${vm.length * 36.7}vw`, overflow: 'auto' }}>
    {vm.map((item, index) => <MiniTicket key={item.id} data={item.event} id={item.id} />)}
  </div>
</div>;

export default TicketList;
