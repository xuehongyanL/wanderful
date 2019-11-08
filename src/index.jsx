import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import MapComponent from './Map';
import Editor from './Editor';

import Controller from './Controller';
let Control = new Controller();

ReactDOM.render((<MapComponent data={Control.json} />), document.getElementById('leftMiddle'));
ReactDOM.render((<Editor onUpdate={Control.updateJSON.bind(Control)} />), document.getElementById('rightMiddle'));
