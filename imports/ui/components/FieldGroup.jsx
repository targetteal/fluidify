import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from './BaseComponent.jsx';

export default class FieldGroup extends BaseComponent {
  render() {
    const {
      id, label, error, inputRef, ...otherProps
    } = this.props;

    const validationState = error ? 'error' : null;

    return (
      <FormGroup validationState={validationState} controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          inputRef={inputRef}
          {...otherProps}
        />
        {error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    );
  }
}
