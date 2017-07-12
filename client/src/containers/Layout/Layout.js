import React from "react";
import { connect } from "react-redux";
import pagesConfig from 'helpers/pagesConfig';

const Layout = ({ breakpoint, children, location }) => {
  // should be defined as config somewhere
  const layoutStyles = {
    marginLeft: (pagesConfig[location.pathname] && pagesConfig[location.pathname].docked)
      ? !~(pagesConfig[location.pathname].docked.breakpoints || []).indexOf(breakpoint)
        ? `${pagesConfig[location.pathname].docked.width}px`
        : 0
      : 0
  };

  console.log(!(pagesConfig[location.pathname] && pagesConfig[location.pathname].docked
       && !!~(pagesConfig[location.pathname].docked.breakpoints || []).indexOf(breakpoint)))

  return (
    <div>
      <div style={ layoutStyles }>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const layout = state.get("layout");
  return ({
    breakpoint: layout.get("breakpoint")
  })
};

export default connect(
  mapStateToProps
)(Layout);