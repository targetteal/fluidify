import React from 'react';
import Message from '../components/Message.jsx';
import BaseComponent from '../components/BaseComponent.jsx';

class NotFoundPage extends BaseComponent {
  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <Message title="Sorry, we couldn't find the page you are requesting." />
      </div>
    );
  }
}

export default NotFoundPage;
