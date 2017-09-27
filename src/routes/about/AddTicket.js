import './AddTicket.less';
import IconCheck from 'material-ui/svg-icons/navigation/check';
import Ticket from '../../components/about/Ticket';
import { connect } from 'dva';

const AddTicket = () => <div className="add-ticket">
  <div className="step1">
    <div className="title">
          输入入场券代码
          <span className="barcode" />
    </div>
    <div className="wrap">
      <input />
    </div>
    <IconCheck className="btn" style={{ color: '#fff', display: 'block' }} />
  </div>
  <div className="step2">
    <div className="msg">您成功获得一张免费入场券</div>
    <div style={{ padding: '0 12px' }}><Ticket active={1} /></div>
    <div className="btn">我知道了</div>
  </div>
</div>;

function mapStateToProps(state) {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  return {

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTicket);
