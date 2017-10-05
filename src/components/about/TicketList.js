import styles from './TicketList.less';
import { Link } from 'dva/router';

const MiniTicket = ({ data, id }) => <div className="miniTicket">
  <Link to={`/about/ticketdetail?id=${id}`}>
    <h1>{data.title}</h1>
    <h2>{data.start_date}</h2>
  </Link>
</div>;

const TicketList = ({ dataArr }) => <div className="ticketList">
  <div style={{ width: `${dataArr.length * 150}px`, overflow: 'auto' }}>{dataArr.map((item, index) => <MiniTicket key={item.id} data={item.event} id={item.id} />)}</div>
</div>;

export default TicketList;
