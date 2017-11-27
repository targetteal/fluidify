import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'react-bootstrap';

import BaseComponent from './BaseComponent.jsx';

export default class Message extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = Object.assign(this.state, { visible: true });
  }

  render() {
    return (
      <Alert bsStyle={this.props.type} onDismiss={this.handleDismiss}>
        { this.props.title ? <h4>{this.props.title}</h4> : '' }
        <p>{this.props.message}</p>
        { this.props.actionButton ?
          <p>
            <Button
              onClick={this.props.actionCallback}
              bsStyle={this.props.type}
            >
              {this.props.actionText}
            </Button>
            <span> or </span>
          </p>
          : ''}
      </Alert>
    );
  }
  handleDismiss() {
    this.setState({ visible: false });
  }
  handleShow() {
    this.setState({ visible: true });
  }
}

Message.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  actionText: PropTypes.string,
  actionCallback: PropTypes.func,
};

Message.defaultProps = {
  title: '',
  type: 'danger',
  message: '',
  actionText: '',
};
