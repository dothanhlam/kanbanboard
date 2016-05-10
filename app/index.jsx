/*import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer.jsx';
import './css/main.css';




main();

function main() {
    let app = document.createElement('div');
    document.body.appendChild(app);
  //  ReactDOM.render(<KanbanBoard cards={cardsList}/>, app);
    ReactDOM.render(<KanbanBoardContainer />, app);
} */


import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import KanbanBoardContainer from './kanbanboardcontainer';
import KanbanBoard from './kanbanboard';
import EditCard from './components/editcard';
import NewCard from './components/newcard';

import './css/main.css';
import './css/card-form.css';

main()

function main() {
    let app = document.createElement('div');
    document.body.appendChild(app);
    render((
        <Router history={createBrowserHistory()}>
            <Route component={KanbanBoardContainer}>
                <Route path="/" component={KanbanBoard}>
                    <Route path="new" component={NewCard}/>
                    <Route path="edit/:card_id" component={EditCard}/>
                </Route>
            </Route>
        </Router>
    ), app);
}