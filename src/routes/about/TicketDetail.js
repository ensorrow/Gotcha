import Ticket from '../../components/about/Ticket';
import './TicketDetail.less';
import { connect } from 'dva';

const TicketDetail = ({ detail }) => <div className="m-ticketDetail">
  <Ticket lg vm={detail} />
</div>;

export default connect(({ about }) => ({ detail: about.activeTicket }))(TicketDetail);
