import React, { Component } from 'react';
import CheckList from './CheckList.jsx';
import marked from 'marked';

export default class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails : false
        };

        this.clickHandler = this.clickHandler.bind(this);

    }

    clickHandler(e) {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (<div className="card__details">
                <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                <CheckList cardId={this.props.id} tasks={this.props.tasks}/>
            </div>);
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };

        return (
            <div className="card">
                <div style={sideColor}/>
                <div
                    className={ this.state.showDetails? "card__title card__title--is-open" : "card__title"}
                     onClick={this.clickHandler}>
                    {this.props.title}
                </div>
                {cardDetails}
            </div> );
    }
}