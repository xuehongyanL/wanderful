import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import i18n from 'i18next';
import {withTranslation} from 'react-i18next';

import emitter from '../../ev';

class LeftDownToolbar extends React.Component {
  render(){
    const {t} = this.props;
    return (
      <FormGroup>
        <Input
          type="select"
          style={{padding: 0, height: '30.8px'}}
          onChange={(e) => {emitter.emit('map', e.target.value);}}
        >
          <option value={'map-OSM'}>{t('map-OSM')}</option>
          <option value={'map-Google'}>{t('map-Google')}</option>
          <option value={'map-Gaode'}>{t('map-Gaode')}</option>
        </Input>
      </FormGroup>
    );
  }
}

export default withTranslation()(LeftDownToolbar);
export {LeftDownToolbar as LeftDownBarUnwrapped};