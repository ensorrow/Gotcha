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
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={() => close()} />,
      <FlatButton label="Submit" primary keyboardFocused onTouchTap={() => done()} />,
    ];

    return (<Dialog title={title} actions={actions} modal open={open} onRequestClose={() => close()}>
      {children}
    </Dialog>);
  }
}
