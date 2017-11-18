import React, {PropTypes} from 'react';
import {connect} from'react-redux';

import FormTextInput from './FormTextInput';
import FormToggleInput from './FormToggleInput';
import {updateForm} from '../store/actions';

export const FIELD_TYPE = {
    TEXT: FormTextInput,
    SELECT: FormTextInput,
    SELECT_MULTI: FormTextInput,
    TOGGLE: FormToggleInput,
    RICH_TEXT: FormTextInput
};

const FormContainer = ({
    name,
    formData,
    fields,
    children
}) => {
    const handleChange = e => {
        e.preventDefault();
        e.stopPropagation();
        updateForm(`${name}.${e.target.name}`, e.target.value);
    }

    return (
        <form onChange={handleChange}>
            {fields.map((Field, i) => (
                <div>
                    <Field.type key={i} {...Field} value={formData && formData.get(Field.name)} />
                    <br/>
                </div>
            ))}
            {children}
        </form>
    );
}

FormContainer.propTypes = {
    name: PropTypes.string.isRequired,
    formData: PropTypes.object,
    fields: PropTypes.array.isRequired
};

const mapStateToProps = (state, props) => ({
    formData: state.getIn(['forms', props.name])
});

export default connect(mapStateToProps)(FormContainer);
