import React from 'react';
import { render } from 'react-dom';
import ready from 'document-ready-promise';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as duck from './duck';
import Layout from './components/Layout';

async function main() {
    await ready();

    const store = createStore(duck.reducer, applyMiddleware(thunk));
    const node = document.querySelector('section.container');

    node &&
        render(
            <Provider store={store}>
                <Layout />
            </Provider>,
            node,
        );
}

main();
