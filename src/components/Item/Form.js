import React, {Component} from 'react';
import {FormField, Debug} from '..';

const FieldValidations = [
    {
        label: 'Image',
        error: 'Une image est necessaire',
        attributes: {
            name: 'image',
            type: 'file'
        }
    }, {
        label: 'Nom',
        regex: v => (v + '').length > 0,
        force: v => v.replace(/[^a-z0-9 \-_\.]+/i, '').toLowerCase(),
        error: 'Ce champs ne peut être vide',
        attributes: {
            name: 'name'
        }
    }, {
        label: 'Prix',
        regex: v => /[0-9]+(\.[0-9]{1,2})^/.test(v),
        force: v => String(Number(v) || 0),
        error: 'Le prix doit être sous un des deux formats suivants: 1234.56 ou 1234',
        attributes: {
            name: 'price',
            type: 'number',
            step: 0.01
        }
    }, {
        label: 'Notes courtes',
        force: v => v.replace(/[^a-z0-9 \-_]+/g, ''),
        attributes: {
            name: 'notes'
        }
    }, {
        label: 'Description',
        type: 'textarea',
        attributes: {
            name: 'description'
        }
    }
];

class ItemForm extends Component {
    constructor(...args) {
        super(...args);
        this.state = {};
    }

    willReceiveProps(newProps) {
        this.setState(newProps);
    }

    handleChanges(ev) {
        ev.preventDefault();
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {
        return (
            <form onChange={this.handleChanges.bind(this)}>
                {FieldValidations.map(f => (<FormField {...f} key={f.name} value={this.state[f.key]}/>))}
                <button className="btn btn-primary" type="submit">Cr&eacute;er</button>
                <Debug object={this.state}/>
            </form>
        );
    }
}

export {ItemForm};
