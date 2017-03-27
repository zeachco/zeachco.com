import React from 'react';
import ItemForm from '../components/Item/ItemForm'
import Base from './Base';

const EditItem = ({ params }) => (
    <Base>
        <ItemForm _id={params._id}/>
    </Base>
);

EditItem.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default EditItem
