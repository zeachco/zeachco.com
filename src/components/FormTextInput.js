import React, {PropTypes} from 'react';

import Translate from './Translate';

const FormTextInput = ({
    name,
    label,
    value = ''
}) => (
    <div className="input-group">
        <label className="input-group-addon" htmlFor={name}><Translate content={label} /></label>
        <input className="form-control" autoComplete="off" type="text" id={name} name={name} value={value}/>
    </div>
);

FormTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default FormTextInput;
