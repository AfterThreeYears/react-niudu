import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MarkDown.css';

export default class MarkDown extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    classnames: PropTypes.string,
  }
  static defaultProps = {
    content: '',
    classnames: '',
  }
  render() {
    const { content, classnames } = this.props;
    return (
      <section
        className={`markdown-body uiMarkdown ${classnames}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}