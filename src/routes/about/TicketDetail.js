import Ticket from '../../components/about/Ticket';
import './TicketDetail.less';

const tmpdetail = {
  status: 1,
  event: {
    title: '大唐芙蓉园',
    start_date: 1498104000000,
    end_date: 1498106000000,
  },
};
const TicketDetail = () => <div className="m-ticketDetail">
  <Ticket lg vm={tmpdetail} />
</div>;

export default TicketDetail;
