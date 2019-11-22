import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import MapComponent from './Map';
import Editor from './Editor';
import Control from './Controller';
import RightUpToolbar from './components/Toolbar/RightUpToolbar';
import geojsonParse from './geojson/parser';

ReactDOM.render((<MapComponent parser={geojsonParse} />), document.getElementById('leftMiddle'));
ReactDOM.render((<Editor onUpdate={Control.updateJSON.bind(Control)} />), document.getElementById('rightMiddle'));
ReactDOM.render((<RightUpToolbar />), document.getElementById('rightUp'));