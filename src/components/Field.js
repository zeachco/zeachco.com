import React from 'react';
// import {connect} from 'react-redux';
// import {Editor, EditorState} from 'draft-js';

export const Text = props => {
  return (
    <p>
      <input {...props.options} type="text" className="form-control" name={props.name} placeholder={props.label} defaultValue={props.value}/>
    </p>
  );
};

export const Number = props => (
  <p>
    <input {...props.options} type="number" className="form-control" name={props.name} placeholder={props.label} defaultValue={props.value}/>
  </p>
);
export const Area = props => (
  <p>
    <textarea {...props.options} className="form-control" name={props.name} placeholder={props.label} defaultValue={props.value}/>
  </p>
);
export const Check = props => (
  <p>
    <label>
      <input {...props.options} type="checkbox" name={props.name} checked={!!props.value}/>&nbsp;{props.label}
    </label>
  </p>
);
export const Select = props => (
  <p>
    <select {...props.options} className="form-control" name={props.name} defaultValue={props.value}>
      <option value="">-- {props.label} --</option>
      {props.options.map(o => (
        <option key={props.name + '_' + o.key} value={o.key}>{o.label}</option>
      ))}
    </select>
  </p>
);
