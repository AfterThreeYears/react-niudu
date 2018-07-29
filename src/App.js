import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import V2EX from '@/components/V2EX/V2EX';
import CNode from '@/components/CNode/CNode';
import V2EXDetail from '@/components/V2EXDetail/V2EXDetail';
import CNodeDetail from '@/components/CNodeDetail/CNodeDetail';
import Indicator from '@/components/Indicator/Indicator';
import { handleSetGlobalInfo } from '@/redux/actions';
import BarWrap from '@/components/BarWrap/BarWrap';

import styles from '@/styles/index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isFetching } = this.props;
    return (
      <BrowserRouter>
        <div className={styles.content}>
          <Indicator isFetching={isFetching} />
          <Switch>
            <Route path="/" exact render={props => (
              <div>
                <BarWrap />
                <V2EX {...props}/>
              </div>
            )} />
            <Route path="/v2ex" exact render={props => (
              <div>
                <BarWrap />
                <V2EX {...props}/>
              </div>
            )} />
            <Route path="/v2ex/detail/:id" exact component={V2EXDetail} />
            <Route path="/cnode" exact render={props => (
              <div>
                <BarWrap />
                <CNode {...props}/>
              </div>
            )} />
            <Route path="/cnode/detail/:id" exact component={CNodeDetail} />
          </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ globalInfo }) {
  return globalInfo;
}

export default connect(mapStateToProps, { handleSetGlobalInfo })(App);
