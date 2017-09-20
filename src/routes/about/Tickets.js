import Ticket from '../../components/about/Ticket';
import './Tickets.less';

const tmptics = [
  {
    status: 1,
    event: {
      title: '大唐芙蓉园',
      start_date: 1498104000000,
      end_date: 1498106000000
    }
  },
  {
    status: 1,
    event: {
      title: '大唐芙蓉园',
      start_date: 1498104000000,
      end_date: 1498106000000
    }
  },
  {
    status: 2,
    event: {
      title: '大唐芙蓉园',
      start_date: 1498104000000,
      end_date: 1498106000000
    }
  },
];
const Tickets = () => <div className="m-tickets">
  {tmptics.map((ticket, index) => <Ticket key={index} vm={ticket} />)}
</div>

export default Tickets;