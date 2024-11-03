import React from 'react';
import {Dropdown} from 'semantic-ui-react';

const state = [
  {key: 'af', value: 'af', text: 'Afghanistan'},
  {key: 'ax', value: 'ax', text: 'Aland Islands'},
  {key: 'al', value: 'al', text: 'Albania'},
  {key: 'dz', value: 'dz', text: 'Algeria'},
  {key: 'as', value: 'as', text: 'American Samoa'},
  {key: 'ad', value: 'ad', text: 'Andorra'},
  {key: 'ao', value: 'ao', text: 'Angola'},
  {key: 'ai', value: 'ai', text: 'Anguilla'},
  {key: 'ag', value: 'ag', text: 'Antigua'},
  {key: 'ar', value: 'ar', text: 'Argentina'},
];

export default function MultipleSearch() {
  return (
    // <div className="w-1/2 ">
    <div>
      {/* 가로 크기를 50%로 설정 */}
      <Dropdown
        className="z-50"
        placeholder="State"
        fluid
        multiple
        search
        selection
        options={state}
      />
    </div>
  );
}