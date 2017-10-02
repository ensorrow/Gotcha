import Ticket from '../../components/about/Ticket';
import './Tickets.less';
import { connect } from 'dva';

const Tickets = ({ dispatch, tickets }) => <div className="m-tickets">
  {tickets.map((ticket, index) => <Ticket key={index} vm={ticket} dispatch={dispatch} />)}
</div>;

function mapStateToProps(state) {
  return {
    tickets: state.about.tickets
  };
}
export default connect(mapStateToProps)(Tickets);
