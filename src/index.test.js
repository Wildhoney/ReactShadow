import React, { useState } from 'react';
import test from 'ava';
import { mount } from 'enzyme';
import sinon from 'sinon';
import root from './';

test('It should be able to create the shadow boundary;', t => {
    const wrapper = mount(<root.div>Hello Adam!</root.div>);
    t.truthy(wrapper.getDOMNode().shadowRoot);
    t.is(wrapper.getDOMNode().shadowRoot.innerHTML, 'Hello Adam!');
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

test('It should be able to applie styles to the shadow boundary components;', t => {
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
