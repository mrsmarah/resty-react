import React from 'react';
import ReactJson from 'react-json-view';

function Result(props) {
  return (
    <>
      <ReactJson name='Headers' src={props.headers} />
      <ReactJson name='Response' src={props.response} />
    </>
  );
}

export default Result;