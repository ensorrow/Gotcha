import { Component } from 'react';
import * as classnames from 'classnames'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class Dlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { title, open, close, done, children } = this.props
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={() => close()} />,
            <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={() => done()} />,
        ];

        return <Dialog title={title} actions={actions} modal={true} open={open} onRequestClose={() => close()}>
            {children}
        </Dialog>
    }
}
