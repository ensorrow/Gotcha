import { Component } from 'react';
import * as classnames from 'classnames';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class Dlg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title, open, close, done, children } = this.props;
    // const actions = [
    //   <FlatButton label="Cancel" primary onTouchTap={() => close()} />,
    //   <FlatButton label="Submit" primary keyboardFocused onTouchTap={() => done()} />,
    // ];
    const actions = [
      <FlatButton style={{minWidth: 0}} icon={<i className="icon icon-cancel"></i>} onTouchTap={() => close()} />,
      <FlatButton style={{minWidth: 0,marginLeft: '33px'}} icon={<i className="icon icon-confirm"></i>} onTouchTap={() => done()} />,
    ];
    return (<Dialog titleStyle={{padding: '20px 16px 20px', lineHeight: 1}} bodyStyle={{padding: '0 16px 20px'}} title={title} actions={actions} modal open={open} onRequestClose={() => close()}>
      {children}
    </Dialog>);
  }
}
