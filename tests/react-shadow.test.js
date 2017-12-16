import test from 'ava';
import React, { Component } from 'react';
import ShadowDOM from '../src/react-shadow';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import delay from 'delay';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Spy and mock the attachShadow function.
const attachShadow = window.HTMLElement.prototype.attachShadow = spy(function() {

    const boundary = window.document.createElement('fake-boundary');
    this.appendChild(boundary);
    return boundary;

});

test.beforeEach(t => {

    t.context.mockAdapter = new MockAdapter(axios);
    t.context.dateNow = Date.now();

    t.context.create = (props, wrapped = true) => {

        const html = wrapped ? (
            <section className="simple-clock">
                <h1>Simple Clock</h1>
                <time>{t.context.dateNow}</time>
            </section>
        ) : (
            <section className="simple-clock">
                <h1>Simple Clock</h1>
            </section>
        );

        return () => <ShadowDOM {...props}>{html}</ShadowDOM>;

    };

    t.context.createChildComponent = (unMountSpy) => {

        class ChildComponent extends Component {
            componentWillUnmount() {
                unMountSpy()
            }
            render() {
                return (<div>hello, world</div>);
            }
        }

        return () => <ShadowDOM><div><ChildComponent/></div></ShadowDOM>;

    };

});

test('Should be able to create the shadow boundary;', t => {

    const { create, dateNow } = t.context;
    const Clock = create();

    const wrapper = mount(<Clock />);

    t.is(attachShadow.callCount, 1);
    t.true(attachShadow.calledWith({ mode: 'open', delegatesFocus: false }));

    const host = wrapper.find('section');
    t.true(host.hasClass('simple-clock'));
    t.true(host.hasClass('resolved'));

    const h1 = { text: () => host.instance().querySelector('fake-boundary span h1').innerHTML };
    t.is(h1.text(), 'Simple Clock');

    const time = { text: () => host.instance().querySelector('fake-boundary span time').innerHTML };
    t.is(time.text(), String(dateNow));

});

test('Should be able to change the boundary mode;', t => {

    const Clock = t.context.create({ boundaryMode: 'closed' });

    mount(<Clock />);
    t.true(attachShadow.calledWith({ mode: 'closed', delegatesFocus: false }));

});

test('Should be able to change the focus delegation;', t => {

    const Clock = t.context.create({ delegatesFocus: true });

    mount(<Clock />);
    t.true(attachShadow.calledWith({ mode: 'open', delegatesFocus: true }));

});

test('Should be able to change the nested node;', t => {

    const Clock = t.context.create({ nodeName: 'test-wrapper' });

    const wrapper = mount(<Clock />);
    const h1 = { text: () => wrapper.find('section').instance().querySelector('fake-boundary test-wrapper h1').innerHTML };
    t.is(h1.text(), 'Simple Clock');

});

test('Should be able to exclude wrapper if only single child;', t => {

    const Clock = t.context.create({}, false);

    const wrapper = mount(<Clock />);
    const h1 = { text: () => wrapper.find('section').instance().querySelector('fake-boundary > h1').innerHTML };
    t.is(h1.text(), 'Simple Clock');

});

test('Should be able to include external documents', t => {

    return new Promise(async resolve => {

        const firstStylesheet = '* { border: 1px solid red }';
        const firstJavaScript = 'console.log("Da comrade!")';
        const secondStylesheet = '* { background-color: orange }';

        t.context.mockAdapter.onGet('/first.css').reply(200, firstStylesheet);
        t.context.mockAdapter.onGet('/second.css').reply(200, secondStylesheet);
        t.context.mockAdapter.onGet('/first.js').reply(200, firstJavaScript);
        t.context.mockAdapter.onGet('/second.js').reply(404);

        const Clock = t.context.create({ include: ['/first.css', '/first.js', '/second.css', '/second.js'] });
        const wrapper = mount(<Clock />);

        const host = wrapper.find('section');
        t.true(host.hasClass('simple-clock'));
        t.true(host.hasClass('resolving'));

        await delay(100);

        const styles = Array.from(host.instance().querySelectorAll('style'));
        const style = { text: () => styles[0].innerHTML };
        t.is(styles.length, 1);
        t.is(style.text(), `${firstStylesheet} ${secondStylesheet}`);

        const scripts = Array.from(host.instance().querySelectorAll('script'));
        const script = { text: () => scripts[0].innerHTML };
        t.is(scripts.length, 1);
        t.is(script.text(), `${firstJavaScript}`);

        t.true(host.hasClass('simple-clock'));
        // t.true(host.hasClass('resolved'));

        resolve();

    });

});

test('Should be able to raise necessary exceptions for happier devs;', t => {

    // Prevent React from throwing errors it would otherwise throw with the below assertions.
    console.error = () => {};

    t.throws(() => {
        const Example = <div />;
        mount(<ShadowDOM><Example /></ShadowDOM>);
    }, 'ReactShadow: Immediate descendant of <ShadowDOM /> must be a HTML node, rather than a React component.');

    t.throws(() => {
        mount(<ShadowDOM><div /><div /></ShadowDOM>);
    }, 'ReactShadow: You must pass a single child rather than multiple children.');

    t.throws(() => {
        t.context.mockAdapter.onGet('/document.png').reply(200, 'data');
        mount(<ShadowDOM include="/document.png"><div><h1>Picture</h1></div></ShadowDOM>);
    }, 'ReactShadow: Files with extension of "png" are unsupported.');

});

test('Should call componentWillUnmount of child components', t => {
    const unmountSpy = spy();
    const Test = t.context.createChildComponent(unmountSpy);
    const wrapper = mount(<Test />);
    wrapper.unmount();
    t.is(unmountSpy.callCount, 1);
});
