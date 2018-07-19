import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import V2EX from '@/components/V2EX';
import V2EXDetail from '@/components/V2EXDetail';
import SideBar from '@/components/SideBar/SideBar';
import SubSideBar from '@/components/SubSideBar/SubSideBar';
import styles from '@/styles/index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.content }>
          <SideBar />
          <SubSideBar />
          <Route path="/v2ex" component={V2EX} />
          <Route path="/v2ex/detail/:id"  component={V2EXDetail} />
          {/* <Route path="/cnode" component={CNode} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
