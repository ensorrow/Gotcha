import './AddTicket.less';
import IconCheck from 'material-ui/svg-icons/navigation/check';
import Ticket from '../../components/about/Ticket';
import { Component } from 'react';
import aboutService from '../../services/about';

class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      code: '',
    };
  }
  addTicket() {
    aboutService.addTicket(this.state.code)
      .then(({ res, err }) => {
        if (!err) this.setState({ success: true });
      });
  }
  render() {
    const success = this.state.success;
    if (!success) {
      return (<div className="add-ticket">
        <div className="step1">
          <div className="title">
              输入入场券代码
              <span className="barcode" />
          </div>
          <div className="wrap">
            <input onChange={e => this.setState({ code: e.target.value })} />
          </div>
          <IconCheck onClick={() => this.addTicket()} className="btn" style={{ color: '#fff', display: 'block' }} />
        </div>
      </div>);
    } else {
      return (<div className="add-ticket">
        <div className="step2">
          <div className="msg">您成功获得一张免费入场券</div>
          <div style={{ padding: '0 12px' }}><Ticket active={1} /></div>
          <div className="btn">我知道了</div>
        </div>
      </div>);
    }
  }
}

export default AddTicket;
