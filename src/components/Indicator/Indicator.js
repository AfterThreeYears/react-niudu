import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from 'react-activity/lib/Spinner';

import 'react-activity/lib/Spinner/Spinner.css';
import styles from './Indicator.css';

export default class Indicator extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    isFetching: false,
  }
  render() {
    const { isFetching } = this.props;
    return (
      <div
        className={classnames({
          [styles.hide]: !isFetching,
          [styles.mask]: true,
        })}
      >
        <Spinner
          color="#000"
          size={'1rem'}
          speed={1}
          animating={true}
        />
      </div >
    );
  }
}