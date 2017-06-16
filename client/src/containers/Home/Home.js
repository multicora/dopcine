import React, {Component} from 'react'
import Header from './components/Header/Header.js';
import Auth from 'containers/Auth/Auth.js';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  toggle
} from 'modules/auth';

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    let token = nextProps.location.token;
    if (token) {
      nextProps.toggle({token});
    }
  }

  render() {
    return (
      <div>
        <Header toggle={this.props.toggle}/>
        <Auth />
        <PreloadingOvelay />
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)