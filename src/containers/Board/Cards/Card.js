import React, { PropTypes } from 'react';

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const galPng = require('../../../assets/images/gal.png');
const delPng = require('../../../assets/images/del.png');


const Card = (props) => {
  const { style, item } = props;

  const styles = !item.read ? {
    boxShadow: '0 2px 15px -1px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#CCAAAA'
  } : {
    boxShadow: '0 2px 15px -1px rgba(0, 0, 0, 0.3)',
  }

  return (
    <div style={styles} className="item" id={style ? item.id : null}>
      <div className="item-container">
        <div className="item-content">
          <div className="item-author">{`${item.fromName} ${item.fromMail}`}</div>
          <p>{item.subject}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
