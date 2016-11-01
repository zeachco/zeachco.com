import React from 'react';

export const FormField = ({
    attributes,
    label,
    force,
    type,
    regex,
    error
}) => {
    const onBlur = e => {
        e.target.value = force
            ? force(e.target.value)
            : e.target.value;
        if (regex && !regex(e.target.value)) {
            console.error(error);
        }
    };

    const field = React.createElement(type || 'input', {
        onBlur,
        placeholder: label,
        className: 'form-control',
        autoComplete: 'off',
        title: error,
        ...attributes
    })

    return React.createElement('div', {
        className: 'form-group'
    }, [field]);
};
