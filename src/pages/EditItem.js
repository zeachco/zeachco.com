import React from 'react';
import PropTypes from 'prop-types';
import ItemForm from '../components/Item/ItemForm'
import Base from './Base';

const EditItem = (props) => (
    <Base>
        <ItemForm _id={props.params._id} item={props.location.state} />
    </Base>
);

EditItem.propTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    item: PropTypes.object
};

export default EditItem
