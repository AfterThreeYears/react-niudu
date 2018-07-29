import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import V2EX from '@/components/V2EX/V2EX';
import CNode from '@/components/CNode/CNode';
import V2EXDetail from '@/components/V2EXDetail';
import SideBar from '@/components/SideBar/SideBar';
import SubSideBar from '@/components/SubSideBar/SubSideBar';
import Indicator from '@/components/Indicator/Indicator';
import { handleSetGlobalInfo } from '@/redux/actions';

import styles from '@/styles/index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const height = document.body.offsetHeight - this.SideBar.wrap.offsetHeight - this.SubSideBar.swiperWrap.offsetHeight;
    this.props.handleSetGlobalInfo({ height });
  }
  render() {
    const { isFetching } = this.props;
    return (
      <Router>
        <div className={styles.content }>
          <Indicator isFetching={isFetching} />
          <SideBar getInstance={ref => this.SideBar = ref}  />
          <SubSideBar getInstance={ref => this.SubSideBar = ref}  />
          <Route path="/v2ex" component={V2EX} />
          <Route path="/v2ex/detail/:id"  component={V2EXDetail} />
          <Route path="/cnode" component={CNode} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ globalInfo }) {
  return globalInfo;
}

export default connect(mapStateToProps, {
  handleSetGlobalInfo,
})((App));