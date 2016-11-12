import React from 'react';
import {ItemForm} from '../components';
import {Base} from '.';

export const EditItem = props => {
    const {_id} = props.params;
    return (
        <Base>
            <h3>
                {_id
                    ? (
                        <div>Modifier l'article<br/>
                            <small>{_id}</small>
                        </div>
                    )
                    : 'Création d\'un article'}
            </h3>
            <ItemForm _id={_id}/>
        </Base>
    );
}
