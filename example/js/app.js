import React from 'react';
import { render } from 'react-dom';
import ready from 'document-ready-promise';
import Weather from './weather';

ready().then(() => render(<Weather />, document.querySelector('section.container')));
