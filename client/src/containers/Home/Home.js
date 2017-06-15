import React, {Component} from 'react'
import Header from './components/Header/Header.js';
import Auth from 'containers/Auth/Auth.js';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  toggle,
  confirmPassword
} from 'modules/auth';

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.token)  {
      nextProps.toggle();
      confirmPassword(nextProps.location.token)
    }
  }

  render() {
    return (
      <div>
        <Header toggle={this.props.toggle}/>
        <Auth />
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle,
  confirmPassword
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)