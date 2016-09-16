<img src="media/logo.png" width="200" alt="ReactShadow" />

> Utilise Shadow DOM in React with all the benefits of style encapsulation.

![Travis](http://img.shields.io/travis/Wildhoney/ReactShadow.svg?style=flat)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-orange.svg?style=flat)
&nbsp;
![Experimental](http://img.shields.io/badge/experimental-%E2%9C%93-blue.svg?style=flat)
* **npm**: `npm i react-shadow --save`
* **Heroku**: [http://react-shadow.herokuapp.com/](http://react-shadow.herokuapp.com/)

![Screenshot](media/screenshot.png)

---

## Getting Started

By using `ReactShadow` you have all the benefits of [Shadow DOM](https://www.w3.org/TR/shadow-dom/) in React.

```javascript
import ShadowDOM from 'react-shadow';

export default props => {

    return (
        <ShadowDOM include={['css/core/calendar.css', props.theme]}>
            <h1>Calendar for {props.date}</h1>
        </ShadowDOM>
    );

}
```

In the above example the `h1` element will become the host element with a shadow boundary &mdash; and the two defined CSS documents will be fetched and appended.

### Avoiding FOIC

As the CSS documents are being fetched over the network, the host element will have a `className` of `resolving` for you to avoid the dreaded [FOIC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content). Once **all** of the documents have been attached the `className` will change to `resolved`.

### Cached Documents

Where components share documents, only one instance will be fetched due to `memoize` of the [`fetchInclude`](https://github.com/Wildhoney/ReactShadow/blob/master/src/react-shadow.js#L23) function.

### Inlining Styles

Instead of defining external CSS documents to fetch, you could choose to add all of the component's styles to the component itself by simply embedding a `style` node in your component. Naturally all styles added this way will be encapsulated within the shadow boundary.

```javascript
export default props => {

    const styles = `:host { background-color: ${props.theme} }`;

    return (
        <ShadowDOM>
          <div>
            <h1>Calendar for {props.date}</h1>
            <style type="text/css">{styles}</style>
          </div>
        </ShadowDOM>
    );
}
```

It's worth noting that if you combine this approach with the loading of external CSS documents, you will have 2 `style` (*or more*) nodes in your component.
