import React, { Component } from 'react';
import update from 'react-addons-update';
import KanbanBoard from '../components/kanbanboard';
import {throttle} from '../utils';

import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'// The Authorization is not needed for local server };
};

export default class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        }

        // Only call updateCardStatus when arguments change
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        // Call updateCardPosition at max every 500ms (or when arguments change)
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);

        this.toggleTask = this.toggleTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        let cardsList = [
            {
                id: 1,
                title: "Read the Book",
                description: "I should read the whole book",
                status: "in-progress",
                color: '#BD8D31',
                tasks: []
            },
            {
                id: 2,
                title: "Write some code",
                description: "Code along with the samples in the book.The complete source can be found at [github](https://github.com/pro-react)",
                status: "todo",
                color: '#3A7E28',
                tasks: [
                    {
                        id: 1,
                        name: "ContactList Example",
                        done: true
                    },
                    {
                        id: 2,
                        name: "Kanban Example",
                        done: false
                    },
                    {
                        id: 3,
                        name: "My own experiments",
                        done: false
                    }
                ]
            },
            {
                id: 3,
                title: "Update CV",
                description: "I should update my CV",
                status: "done",
                color: '#BD8D31',
                tasks: []
            }
        ];

        this.setState({cards: cardsList});

        /*   fetch(API_URL + '/cards', {headers: API_HEADERS})
         .then((response) => response.json())
         .then((responseData) => {
         this.setState({cards: responseData});
         })
         .catch((error) => {
         console.log('Error fetching and parsing data', error);
         }); */
    }

    render() {
       /* return <KanbanBoard
            cards={ this.state.cards }
            taskCallbacks= {
                { toggle: this.toggleTask.bind(this),
                  delete: this.deleteTask.bind(this),
                  add: this.addTask.bind(this) }
            }
            cardCallbacks= {
                {   updateStatus: this.updateCardStatus,
                    updatePosition: this.updateCardPosition }
            }/> */

        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
                cards: this.state.cards,
                taskCallbacks:{
                    toggle: this.toggleTask,
                    delete: this.deleteTask,
                    add: this.addTask
                },
                cardCallbacks:{
                    updateStatus: this.updateCardStatus,
                    updatePosition: this.updateCardPosition
                }
            });

        return kanbanBoard;
    }


    addTask(cardId, taskName) {
        //  let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });

        // set the component state to the mutated object
        this.setState({cards: nextState});
    }

    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        // Create a new object without the task
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });

        // set the component state to the mutated object
        this.setState({cards: nextState});
    }

    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let newDoneValue;
        // Using the $apply command, you will change the done value to its opposite,
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });

        this.setState({cards: nextState});
    }


    updateCardStatus(cardId, listId) {
        // Find the index of the card
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        // Get the current card
        let card = this.state.cards[cardIndex]
        // Only proceed if hovering over a different list
        if (card.status !== listId) {
            // set the component state to the mutated object
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId, afterId) {
        // Only proceed if hovering over a different card
        if (cardId !== afterId) {
            // Find the index of the card
            let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
            // Get the current card
            let card = this.state.cards[cardIndex]
            // Find the index of the card the user is hovering over
            let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
            // Use splice to remove the card and reinsert it a the new index
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }
}