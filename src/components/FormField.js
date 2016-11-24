import React from 'react';

export const FormField = ({
    attributes,
    label,
    force,
    type,
    regex,
    value,
    error
}) => {
    const onBlur = e => {
        e.target.value = force ?
            force(e.target.value) :
            e.target.value;
        if (regex && !regex(e.target.value)) {
            console.error(error);
        }
    };

    const field = React.createElement(type || 'input', {
        ...attributes,
        onBlur,
        key: attributes.name + '_field',
        placeholder: label,
        className: 'form-control',
        autoComplete: 'off',
        title: error,
        onChange: onBlur,
        value
    });

    return React.createElement('div', {
        className: 'form-group'
    }, [
        React.createElement('label', null, label),
        field
    ]);
};