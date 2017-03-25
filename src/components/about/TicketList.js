import styles from './TicketList.less';

const MiniTicket = ({ data }) => <div className="miniTicket">
	<h1>{data.title}</h1>
	<h2>{data.date}</h2>
</div>

const TicketList = ({ dataArr }) => <div className="ticketList">
	<div style={{width: dataArr.length*150+'px',overflow: 'auto'}}>{dataArr.map((item) => <MiniTicket data={item} />)}</div>
</div>

export default TicketList;