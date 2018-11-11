import faker from 'faker';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';

export function getLists(quantity) {
  return dispatch => {
    dispatch({ type: GET_LISTS_START, quantity });
    setTimeout(() => {
      // const lists = [];
      // let count = 0;
      // for (let i = 0; i < quantity; i++) {
      //   const cards = [];
      //   const randomQuantity = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
      //   for (let ic = 0; ic < randomQuantity; ic++) {
      //     cards.push({
      //       id: count,
      //       firstName: faker.name.firstName(),
      //       lastName: faker.name.lastName(),
      //       title: faker.name.jobTitle()
      //     });
      //     count = count + 1;
      //   }
      //   lists.push({
      //     id: i,
      //     name: faker.commerce.productName(),
      //     cards
      //   });
      // }

      const lists = [
        {
          id: -1,
          name: 'Menu',
        }
      ]

      fetch('http://172.31.131.62:8000/api/v1/getheaders?page=1')
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          const mihail = myJson.filter(el => el.fromName.includes('Mihail'));
          let rest = myJson.filter(el => !(el.fromName.includes('Mihail')));
          const work = rest.filter(el => el.fromMail.includes('utm.'));
          rest = rest.filter(el => !(el.fromMail.includes('utm.')));
          const inbox = {
            id: 0,
            name: 'Inbox',
            cards: rest
          }
          lists.push(inbox);
          lists.push({
            id: 1,
            name: 'Personal',
            color: '#7efdd1',
            cards: []
          });
          lists.push({
            id: 2,
            name: 'Work',
            color: '#fd7e7e',
            cards: work
          });
          lists.push({
            id: 3,
            name: 'Due 14.11.2018',
            color: '#fdcc7e',
            cards: []
          });
          lists.push({
            id: 4,
            name: 'Mihail Gavrilita',
            color: '#fafd7e',
            cards: mihail
          });

          console.log(lists);
          dispatch({ type: GET_LISTS, lists, isFetching: true });
        });


      // const lists = [
      //   {
      //     id: -1,
      //     name: 'Menu',
      //   },
      //   {
      //     id: 0,
      //     name: 'Inbox',
      //     cards: [
      //       {
      //         id: 0,
      //         firstName: 'Dragos',
      //         lastName: 'Strainu',
      //         title: 'Full-time Hackathoner',
      //         subject: 'Help: mail automatisation'
      //       },
      //       {
      //         id: 1,
      //         firstName: 'Stanislav',
      //         lastName: 'Spatari',
      //         title: 'WebScrapper',
      //         subject: 'Salut, cum la tine'
      //       }
      //     ]
      //   },
      //   {
      //     id: 1,
      //     name: 'Personal',
      //     color: '#7efdd1',
      //     cards: [
      //       {
      //         id: 2,
      //         firstName: 'Vasile',
      //         lastName: 'Drumea',
      //         title: 'Unity',
      //         subject: '[FAF-151][PAD] Lab2'
      //       },
      //       {
      //         id: 3,
      //         firstName: 'Mihai',
      //         lastName: 'Lungu',
      //         title: 'Tester',
      //         subject: '[FAF-151][PAD] Lab2'
      //       }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     name: 'Work',
      //     color: '#FDCD7F',
      //     cards: [
      //       {
      //         id: 4,
      //         firstName: 'Vasile',
      //         lastName: 'Drumea',
      //         title: 'Unity',
      //         subject: 'Hi'
      //       },
      //       {
      //         id: 5,
      //         firstName: 'Mihai',
      //         lastName: 'Lungu',
      //         title: 'Tester',
      //         subject: 'Nice to meet you!'
      //       }
      //     ]
      //   },
      //   {
      //     id: 3,
      //     name: 'Due 14.11.2018',
      //     color: '#D2FD7E',
      //     cards: []
      //   }
      // ]

    }, 1000); // fake delay
    dispatch({ type: GET_LISTS_START, isFetching: false });
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}
