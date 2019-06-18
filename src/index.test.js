import React, { useState, createRef } from 'react';
import test from 'ava';
import { mount } from 'enzyme';
import sinon from 'sinon';
import root from './';

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
    const wrapper = mount(
        <root.todoApp styleSheets={['index.css', 'person.css']}>
            Hello Maria!
        </root.todoApp>,
    );
    t.deepEqual(wrapper.getDOMNode().shadowRoot.adoptedStyleSheets, [
        'index.css',
        'person.css',
    ]);
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
