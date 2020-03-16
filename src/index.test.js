import React, { useState, createRef } from 'react';
import test from 'ava';
import styled from 'styled-components';
import { mount } from 'enzyme';
import * as R from 'ramda';
import sinon from 'sinon';
import root, { useShadowRoot } from './';

test('It should be able to create the shadow boundary;', t => {
    const wrapper = mount(<root.div>Hello Adam!</root.div>);
    t.truthy(wrapper.getDOMNode().shadowRoot);
    t.is(wrapper.getDOMNode().shadowRoot.innerHTML, 'Hello Adam!');
});

test('It should be able to create the shadow boundary with custom elements;', t => {
    const wrapper = mount(<root.todoApp>Hello Adam!</root.todoApp>);
    t.truthy(wrapper.getDOMNode().shadowRoot);
    t.is(wrapper.getDOMNode().nodeName.toLowerCase(), 'todo-app');
    t.is(wrapper.getDOMNode().shadowRoot.innerHTML, 'Hello Adam!');
});

test('It should be able to handle functional refs with the host element;', t => {
    const spies = { ref: sinon.spy() };
    mount(
        <>
            <root.div ref={spies.ref}>Hello Adam!</root.div>
        </>,
    );
    t.is(spies.ref.callCount, 1);
    t.true(spies.ref.firstCall.args[0] instanceof window.HTMLDivElement);
});

test('It should be able to handle obhect mutated refs with the host element;', t => {
    const ref = createRef(null);
    mount(
        <>
            <root.div ref={ref}>Hello Adam!</root.div>
        </>,
    );
    t.true(ref.current instanceof window.HTMLDivElement);
});

test('It should be able to attach stylesheets to the shadow boundary;', t => {
    const sheets = [
        new global.CSSStyleSheet('index.css'),
        new global.CSSStyleSheet('person.css'),
    ];

    const wrapper = mount(
        <root.todoApp styleSheets={sheets}>Hello Maria!</root.todoApp>,
    );
    t.deepEqual(wrapper.getDOMNode().shadowRoot.adoptedStyleSheets, sheets);
});

test('It should be able to pass options to the shadow boundary creation;', t => {
    sinon.spy(window.HTMLElement.prototype, 'attachShadow');

    mount(<root.todoApp>Hello Adam!</root.todoApp>);
    t.is(window.HTMLElement.prototype.attachShadow.callCount, 1);
    t.true(
        window.HTMLElement.prototype.attachShadow.calledWith({
            mode: 'open',
            delegatesFocus: false,
        }),
    );

    mount(
        <root.todoApp mode="closed" delegatesFocus>
            Hello Adam!
        </root.todoApp>,
    );
    t.is(window.HTMLElement.prototype.attachShadow.callCount, 2);
    t.true(
        window.HTMLElement.prototype.attachShadow.calledWith({
            mode: 'closed',
            delegatesFocus: true,
        }),
    );

    window.HTMLElement.prototype.attachShadow.restore();
});

test('It should be able to register events in the shadow boundary;', t => {
    const spies = { onClick: sinon.spy() };
    const wrapper = mount(
        <root.div>
            <div onClick={() => spies.onClick('Maria')}>Hello Maria</div>
        </root.div>,
    );
    const node = wrapper.getDOMNode().shadowRoot.querySelector('div');
    node.click();
    t.is(spies.onClick.callCount, 1);
    t.true(spies.onClick.calledWith('Maria'));
});

test('It should be able to apply styles to the shadow boundary components;', t => {
    const wrapper = mount(
        <root.div>
            Hello Adam!
            <style type="text/css">{`* { border: 1px solid red; }`}</style>
        </root.div>,
    );
    const node = wrapper.getDOMNode().shadowRoot.querySelector('style');
    t.is(node.innerHTML, '* { border: 1px solid red; }');
});

test('It should be able to access the shadow-root from client components;', t => {
    const Inner = () => {
        const shadowRoot = useShadowRoot();
        t.true(Boolean(shadowRoot), 'expected shadowroot to be truthy');
        return <>Hello/</>;
    };
    mount(
        <root.div>
            <Inner />
        </root.div>,
    );
});

test('It should be able re-render the component tree from the event handlers;', t => {
    function Name() {
        const [name, setName] = useState(null);
        return (
            <>
                {name && <div>Hello {name}!</div>}
                <root.section>
                    <button onClick={() => setName('Adam')}>Change Name</button>
                </root.section>
            </>
        );
    }

    const wrapper = mount(<Name />);
    const node = wrapper.getDOMNode().shadowRoot.querySelector('button');
    node.click();
    wrapper.update();
    t.is(wrapper.find('div').text(), 'Hello Adam!');
});

test('It should be able to encapsulate styled component styles in the boundary;', t => {
    const Name = styled.section`
        color: rebeccapurple;
    `;

    const wrapper = mount(
        <root.sayHello>
            <Name>Hello Adam!</Name>
        </root.sayHello>,
    );
    t.truthy(wrapper.getDOMNode().shadowRoot);
    t.is(wrapper.getDOMNode().nodeName.toLowerCase(), 'say-hello');
    t.is(wrapper.find(Name).text(), 'Hello Adam!');

    const className = R.last(
        wrapper
            .find('section')
            .props()
            .className.split(' '),
    );

    const styles = wrapper.getDOMNode().shadowRoot.querySelector('style');
    t.true(styles.hasAttribute('data-styled'));
    t.true(styles.innerHTML.includes('rebeccapurple'));
    t.true(styles.innerHTML.includes(className));
});
