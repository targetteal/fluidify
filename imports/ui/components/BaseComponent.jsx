import { Component } from 'react';
import i18n from 'meteor/universe:i18n';

class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      locale: i18n.getLocale(),
    };
    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  componentWillMount() {
    i18n.onChangeLocale(this.handleLocaleChange);
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.handleLocaleChange);
  }

  handleLocaleChange(locale) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ locale });
  }
}

export default BaseComponent;
