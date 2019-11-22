import React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import emitter from '../../ev';

class RightUpToolbar extends React.Component {
  toggle(){}
  render(){
    return (
      <ButtonGroup size={'sm'}>
        <Button color="secondary">Import</Button>
        <Button color="secondary" onClick={()=>{emitter.emit('save');}}>Export</Button>
      </ButtonGroup>
    );
  }
};

export default RightUpToolbar;