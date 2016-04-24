/**
 * Created by LamDo on 4/24/16.
 */
jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const KanbanBoard = require('../app/KanbanBoard.jsx');

describe('KanbanBoard', () => {
    var kanbanBoard = TestUtils.renderIntoDocument(<KanbanBoard cards={[]}/>);
    it('should have KanbanBoard instance', () => {
        expect(kanbanBoard).toBeDefined();
    });
});