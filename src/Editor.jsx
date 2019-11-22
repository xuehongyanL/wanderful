import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';
import emitter from './ev';
import {geojsonTransform} from './geojson';
import saveAs from 'file-saver';

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: '{\n' + '  "type": "FeatureCollection",\n' + '  "features": []\n' + '}'};
  }
  componentDidMount(){
    let self = this;
    emitter.on('text', (text) => {
      self.setState({value: text});
      self.props.onUpdate(text);
    });
    emitter.on('save', () => {
      let blob = new Blob([this.state.value], {type: 'text/json;charset=utf-8'});
      saveAs(blob, 'geo.json');
    });
  }
  _onChange(newValue){
    this.setState({value: newValue});
    this.props.onUpdate(newValue);
  }
  _onBlur(e){
    this._onChange(geojsonTransform(this.state.value));
  }
  render(){
    return (
      <AceEditor
        mode="json"
        theme="github"
        fontSize={15}
        height={'100%'}
        width={'100%'}
        value={this.state.value}
        onChange={this._onChange.bind(this)}
        onBlur={this._onBlur.bind(this)}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        editorProps={{
          $blockScrolling: Infinity
        }}
      />
    );
  }
}

export default Editor;