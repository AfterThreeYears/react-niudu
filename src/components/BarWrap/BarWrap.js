import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from '@/components/SideBar/SideBar';
import SubSideBar from '@/components/SubSideBar/SubSideBar';
import { handleSetGlobalInfo } from '@/redux/actions';

@withRouter
@connect(({ globalInfo }) => globalInfo, { handleSetGlobalInfo })
export default class BarWrap extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const height = document.body.offsetHeight - this.SideBar.wrap.offsetHeight - this.SubSideBar.swiperWrap.offsetHeight;
    this.props.handleSetGlobalInfo({ height });
  }
  render() {
    return (
      <div>
        <SideBar getInstance={ref => this.SideBar = ref} {...this.props} />
        <SubSideBar getInstance={ref => this.SubSideBar = ref} {...this.props} />
      </div>
    );
  }
}
