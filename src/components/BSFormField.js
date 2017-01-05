import React from 'react'

export const BSFormField = ({
    label,
    children,
    message,
    state,
    icon = 'pencil'
}) => (
    <div className="form-group">
        <label className="col-md-3 control-label">{label}</label>
        <div className="col-md-9 inputGroupContainer">
            <div className="input-group">
                <span className="input-group-addon">
                    <i className={"glyphicon glyphicon-" + icon}></i>
                </span>
                {children}
            </div>
            {message === undefined
                ? null
                : (
                    <small className="help-block">
                        <div className={`alert alert-${state}`}>{message}</div>
                    </small>
                )}
        </div>
    </div>
)
