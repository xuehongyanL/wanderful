import React from 'react';
import {
  Button,
  ButtonGroup,
  Input,
  ListGroup,
  ListGroupItem,
  PopoverBody,
  UncontrolledPopover
} from 'reactstrap';
import i18n from 'i18next';
import {withTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLanguage} from '@fortawesome/free-solid-svg-icons';

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
    const {t} = this.props;
    return (
      <div className={'clearfix'}>
        <Input
          type="file"
          id="fileInput"
          ref={this.fileRef}
          onChange={this._onSelectFile.bind(this)}
          style={{display: 'none'}}
        />
        <Button
          size={'sm'}
          color="secondary"
          onClick={this._onImport.bind(this)}
          className={'float-left'}
        >{t('Import')}</Button>
        <Button
          size={'sm'}
          color="secondary"
          onClick={this._onExport.bind(this)}
          className={'float-left'}
        >{t('Export')}</Button>
        <Button
          id="changeLanguage"
          color="secondary"
          className={'float-right'}
          style={{padding: '0 0.5rem 0 0.5rem'}}
        >
          <FontAwesomeIcon icon={faLanguage} style={{fontSize: '1.8rem'}} />
        </Button>
        <UncontrolledPopover trigger="legacy" placement="bottom" target="changeLanguage">
          <PopoverBody
            style={{
              backgroundColor: 'var(--secondary)',
              borderRadius: '0.3rem',
              padding: '0.5rem'
            }}
          >
            <ListGroup>
              <ListGroupItem
                action
                onClick={() => {i18n.changeLanguage('en');}}
              >English</ListGroupItem>
              <ListGroupItem
                action
                onClick={() => {i18n.changeLanguage('zh-Hans');}}
              >简体中文</ListGroupItem>
            </ListGroup>
          </PopoverBody>
        </UncontrolledPopover>
      </div>
    );
  }
};

export default withTranslation()(RightUpToolbar);
export {RightUpToolbar as RightUpToolbarUnwrapped};