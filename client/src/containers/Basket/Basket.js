import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import BasketItem from "./components/BasketItem/BasketItem";
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Dialog from "material-ui/Dialog";

import styles from "./Basket.css"

import {
  toggle,
  removeItem,
  checkout,
  getBasket,
  selectors,
} from "modules/basket";

class Basket extends Component {

  componentDidMount() {
    typeof(this.props.actions.getBasket) === "function"
      && this.props.actions.getBasket();
  }

  render() {
    const { actions: { toggle, removeItem, checkout }, items, quantity, isOpen } = this.props;
    let totalPrice = items.reduce((sum, prev) => parseInt(sum, 10) + parseInt(prev.get("price"), 10), 0);

    const actions = [
      <FlatButton
        label="CONTINUE SHOPPING"
        onTouchTap={() => toggle({isOpen: false})}
      />,
      <RaisedButton
        className={styles.actionItem}
        label="CHECKOUT"
        primary={true}
        onTouchTap={checkout}
      />
    ];


    return (
      <div className={styles.iconContainer}>
        <span className={styles.qauntity}>{quantity}</span>
        <IconButton
          iconClassName="material-icons"
          onTouchTap={() => toggle({isOpen: true})}
        >
          shopping_cart
        </IconButton>
        <Dialog
          actionsContainerClassName={styles.actions}
          bodyClassName={styles.body}
          title={"Shopping Cart"}
          titleClassName={styles.title}
          actions={actions}
          open={isOpen}
          modal={false}
          onRequestClose={() => toggle({isOpen: false})}
        >
          <div>
            <div className={styles.subtitle}>Recently added items</div>
            {items && items.map((item) =>
              <BasketItem
                key={item.get("id")}
                id={item.get("id")}
                img={item.get("img")}
                name={item.get("name")}
                price={item.get("price")}
                currency={item.get("currency")}
                onRemove={removeItem} />
            )}
          </div>
          <div className={styles.total}>{`Total price: ${totalPrice}`}</div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const basket = state.get("basket");
  return({
    isOpen: basket.get("isOpen"),
    quantity: basket.get("quantity"),
    items: selectors.getBasketItemsState(state),
  })
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggle,
    removeItem,
    checkout,
    getBasket
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket);