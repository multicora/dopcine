import React from "react";
import IconButton from 'material-ui/IconButton';

import styles from "./BasketItem.css";

export default ({id, img, name, price, currency, onRemove}) =>
  (<div className={styles.item}>
    <div className={styles.imgContainer}>
      <img className={styles.img} alt="thum" src={img} />
    </div>
    <div className={styles.body}>
      <div className={styles.itemName}>{name}</div>
      <div className={styles.itemPrice}>{`${price} ${currency}`}</div>
    </div>
    <div className={styles.delete}>
      <IconButton
        onTouchTap={() => {onRemove({id})}}
        iconClassName={`material-icons ${styles.deleteIcon}`}
        tooltip="Remove item"
        tooltipPosition="top-center"
      >
        delete
      </IconButton>
    </div>
  </div>);