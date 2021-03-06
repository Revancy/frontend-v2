import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';

import Cards from './Cards';

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  }
};

@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool
  }

  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    // const display = item.id == 0 ? 'none' : 'block';
    const listId = item.id === -1 ? 'menu' : '';
    const style = item.id === -1 ? {
      backgroundImage: `url('images/menu.png')`,
      marginRight: `0`,
      paddingTop: '0',
      boxShadow: 'none'
    } : item.id === 0 ? {
      borderRadius: '0',
      boxShadow: 'none'
    } : {
      backgroundColor: '#191919',
      textAlign: 'center',
      border: 'none',
      boxShadow: 'none'
    };
    const isInbox = item.id === 0 ? { fontSize: '24px' } : {
      backgroundColor: item.color,
      fontSize: '24px',
      padding: '10px',
      display: 'inline-block',
      borderRadius: '0px 0px 9px 9px',
      boxShadow: '0 2px 8px -1px rgba(0, 0, 0, 0.3)'
    }

    const deskHeadStyles = item.id > 0 ? {
      padding: "0",
      boxShadow: '0 5dpx 50px 9px rgba(0, 0, 0, 0.3)'
    } : {
      padding: '30px',
      fontSize: '42px'
    }


    return connectDragSource(connectDropTarget(
      <div className="desk" style={style} id={listId}>
        {item.id != -1 ? (<div style={deskHeadStyles} className="desk-head">
          <div className="desk-name" style={isInbox}>{item.name}</div>
        </div>) : (<div></div>)
        }
        {item.id != -1 ? (<Cards
          moveCard={moveCard}
          x={x}
          cards={item.cards}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
        />) : (<div></div>)
      }
      </div>
    ));

  }
}
