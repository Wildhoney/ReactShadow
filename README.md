![Screenshot](media/screenshot.png)

![Travis](http://img.shields.io/travis/Wildhoney/ReactShadow.svg?style=flat)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-orange.svg?style=flat)
&nbsp;
![Experimental](http://img.shields.io/badge/experimental-%E2%9C%93-blue.svg?style=flat)
* **npm**: `npm i react-shadow --save`
* **Heroku**: [http://react-shadow.herokuapp.com/](http://react-shadow.herokuapp.com/)

---

## Getting Started

By using `ReactShadow` you can have all the benefits of [Shadow DOM](https://www.w3.org/TR/shadow-dom/) whilst still using the declarative style of React.

```javascript
import ShadowDOM from 'react-shadow';

export default props => {
    <ShadowDOM cssDocuments={['css/core/calendar.css', props.theme]}>
        <h1>Calendar</h1>
    </ShadowDOM>
}
```

In the above example the `h1` element will become the host element with a shadow boundary &mdash; and the two defined CSS documents will be fetched and appended.

### Avoiding FOIC

As the CSS documents are being fetched over the network the host element will have a `className` of `resolving` for you to avoid the dreaded [FOIC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content). Once **all** of the documents have been attached the `className` will change to `resolved`.

### Cached Documents

Where components share CSS documents, only one instance of the CSS document will be fetched due to [`memoize` of the `fetchStylesheets`](https://github.com/Wildhoney/ReactShadow/blob/react-15.0/src/react-shadow.js#L22) function.
