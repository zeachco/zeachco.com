import React from 'react';
import {ItemForm} from '../components';
import {Base} from '.';

export const EditItem = ({params}) => (
    <Base>
        <ItemForm _id={params._id}/>
    </Base>
);
