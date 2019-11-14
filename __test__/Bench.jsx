import React from 'react';

import MapComponent from '../src/Map';
import Editor from '../src/Editor';
import Control from '../src/Controller';

class Bench extends React.Component {
  render(){
    return (
      <div>
        <MapComponent data={Control.json} test={true} />
        <Editor onUpdate={Control.updateJSON.bind(Control)} />
      </div>
    );
  }
}

export default Bench;