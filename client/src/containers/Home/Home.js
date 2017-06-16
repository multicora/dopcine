import React, {Component} from 'react'
import Auth from 'containers/Auth/Auth';
import Dialog from 'components/Dialog/Dialog';
import Header from './components/Header/Header';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggle } from 'modules/auth';
import { toggle as toggleDialog } from 'modules/dialog';

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    let token = nextProps.location.token;
    let {actions} = nextProps;
    if (token) {
      actions.toggleDialog({
        message: "Confirming email...",
        loaderIcon: "action.loaderIcon",
        onOpen: "confirmEmail",
        onOpenProps: {token}
      });
    }
  }

  render() {
    let {actions, children} = this.props;
    return (
      <div>
        <Header toggle={actions.toggle}/>
        <Auth />
        <Dialog />
        {children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
    toggle,
    toggleDialog
  }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Home)