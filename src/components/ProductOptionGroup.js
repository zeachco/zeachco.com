import React from 'react'
import {BSFormField, Translate} from '.'

export const ProductOptionGroup = props => {
    const renderGhost = () => (
        <a className="btn btn-info"
            onClick={e => {
            e.preventDefault();
            console.log('clicked!');
            props.onClick();
        }}><Translate content="add_option_group"/></a>
    );

    const renderList = () => {
        return (
            <div>...</div>
        )
    }

    return (
        <BSFormField>
            <div className="form-control2">

            {props.option
                ? renderList()
                    : renderGhost()}
                </div>
        </BSFormField>
    )

    // const {     name,     code,     options = [] } = props; return (     <div
    // title={JSON.stringify(props.option)}>         <select key={code} name={code}
    // className="form-control">             {options.map(o => (
    // <option value={o.code} key={`${code}_${o.code}`}>{o.label} {o.mod === 0
    //                   ? null                         : ` (${o.mod})`}</option>
    //          ))}         </select>         <span className="input-group-addon">
    //           {code}         </span>     </div> )
};