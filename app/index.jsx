import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer.jsx';
import './css/main.css';




main();

function main() {
    let app = document.createElement('div');
    document.body.appendChild(app);
  //  ReactDOM.render(<KanbanBoard cards={cardsList}/>, app);
    ReactDOM.render(<KanbanBoardContainer />, app);
}