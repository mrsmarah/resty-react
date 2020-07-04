import React from 'react';
import { If, Then } from '../if/if';
import ReactJson from 'react-json-view';

function Result(props) {
  return (
    <>
      <If condition={props.response.data}>
        <Then>
          <ReactJson name='Headers' src={props.headers} />
          <ReactJson name='Response' src={props.response} />
        </Then>
      </If>
    </>
  );
}

export default Result;