import React from 'react';
import {Button, ButtonGroup, Input} from 'reactstrap';

import emitter from '../../ev';

class RightUpToolbar extends React.Component {
  constructor(props){
    super(props);
    this.fileRef = React.createRef();
    this.reader = new FileReader();
    this.reader.onloadend = () => {
      emitter.emit('text', this.reader.result);
    };
  }
  _onImport(){
    document.getElementById('fileInput').click();
  }
  _onExport(){
    emitter.emit('save');
  }
  _onSelectFile(e){
    this.reader.readAsText(e.target.files[0]);
  }
  render(){
    return (
      <ButtonGroup size={'sm'}>
        <Input
          type="file"
          id="fileInput"
          ref={this.fileRef}
          onChange={this._onSelectFile.bind(this)}
          style={{display: 'none'}}
        />
        <Button
          color="secondary"
          onClick={this._onImport.bind(this)}
        >Import</Button>
        <Button
          color="secondary"
          onClick={this._onExport.bind(this)}
        >Export</Button>
      </ButtonGroup>
    );
  }
};

export default RightUpToolbar;