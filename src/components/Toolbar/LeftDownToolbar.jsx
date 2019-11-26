import React from 'react';
import {FormGroup, Input} from 'reactstrap';

import emitter from '../../ev';

class LeftDownToolbar extends React.Component {
  render(){
    return (
      <FormGroup>
        <Input
          type="select"
          style={{padding: 0, height: '30.8px'}}
          onChange={(e) => {emitter.emit('map',e.target.value);}}
        >
          <option>OpenStreetMap</option>
          <option>GoogleMap</option>
          <option>GaodeMap</option>
        </Input>
      </FormGroup>
    );
  }
}

export default LeftDownToolbar;
export {LeftDownToolbar as LeftDownBarUnwrapped};