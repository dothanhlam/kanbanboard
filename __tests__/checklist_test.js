/**
 * Created by LamDo on 4/24/16.
 */
jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const CheckList = require('../app/components/CheckList.jsx');

describe('CheckList', () => {
    var checkList = TestUtils.renderIntoDocument(<CheckList tasks = {[]}/>);
    it('should have CheckList instance', () => {
        expect(checkList).toBeDefined();
    });
});