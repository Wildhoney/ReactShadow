import 'webcomponents.js';
import React from 'react';
import { render } from 'react-dom';
import ready from 'document-ready-promise';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import Layout from './containers/layout';

ready().then(() => {

    const store = createStore(reducer, applyMiddleware(thunk));
    const mountNode = document.querySelector('section.container');

    mountNode && render(<Provider store={store}><Layout /></Provider>, mountNode);

});

