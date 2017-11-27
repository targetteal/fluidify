import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HTree extends Component {
  constructor(props) {
    super(props);

    this.toggleHidden = this.toggleHidden.bind(this);

    this.state = {
      hidden: false,
    };
  }

  toggleHidden(event) {
    event.preventDefault();
    const currentlyHidden = this.state.hidden;
    this.setState({
      hidden: !currentlyHidden,
    });
  }

  renderProperties() {
    function preparePropertyList(property) {
      const rows = [];
      property.map(item => rows.push(<li>{item}</li>));
      return <ul>{rows}</ul>;
    }

    const { properties } = this.props.drop;

    return Object.keys(properties).map((key) => {
      const isPropertyArray = Array.isArray(properties[key]);
      return (
        <div className="property">
          <strong className="property-name">{key}</strong>:&nbsp;
          {
            isPropertyArray ? preparePropertyList(properties[key]) :
            <span className="property-value">{properties[key]}</span>
          }
        </div>
      );
    });
  }

  renderChildren() {
    return this.props.drop.children().map(child => (
      <HTree key={child._id} drop={child} />
    ));
  }

  render() {
    const { drop } = this.props;
    const { hidden } = this.state;
    const hiddenStateChar = hidden ? '▶' : '▼';
    const typeClassName = `type type-${drop.type}`;
    const typeString = drop.type ? drop.type.toUpperCase() : '';

    return (
      <div className="htree-level">
        <div className="level-name-box">
          <button className="level-name" onClick={this.toggleHidden}>
            {hiddenStateChar}
            &nbsp;&nbsp;&nbsp;
            {drop.name}
          </button>
          <div className={typeClassName}>{typeString}</div>
        </div>
        { !this.state.hidden ?
          <div>
            <div className="level-properties">
              {drop.properties ? this.renderProperties() : ''}
            </div>
            <div className="level-children">
              {drop.hasChildren() ? this.renderChildren() : ''}
            </div>
          </div>
           : ''
        }
      </div>
    );
  }
}

HTree.propTypes = {
  drop: PropTypes.shape({
    name: PropTypes.string,
    properties: PropTypes.object,
    children: PropTypes.function,
    hasChildren: PropTypes.function,
  }).isRequired,
};
