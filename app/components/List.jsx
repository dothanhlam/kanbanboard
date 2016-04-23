import React, { Component } from 'react';
import Card from './Card.jsx';
export default class List extends Component { render() {
    var cards = this.props.cards.map((card) => {
        return <Card id={card.id}
          title={card.title}
          color={card.color}
          description={card.description}
          tasks={card.tasks} />
    });
    return (
        <div className="list">
            <h1>{this.props.title}</h1>
            {cards} </div>
    ); }
}