import React, {Component} from 'react';
import {FormField, Debug} from '..';
import actions from '../../store/actions';
const {createOrUpdate} = actions.items;

const DropzoneStyle = {
    padding: '1em',
    border: '2px dashed black'
};

const FieldValidations = [
    {
        label: 'Nom',
        regex: v => (v + '').length > 0,
        // force: v => v.replace(/[^a-z0-9 '"\(\)\-_\.]+/gi, '').toLowerCase(),
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

var Dropzone = require('react-dropzone');

class ItemForm extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            files: []
        };
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

    submit(e) {
        e.preventDefault();
        createOrUpdate(this.state);
    }

    onDrop(e) {
        this.setState({imgUrl: e.preview, imgData: e})
        console.log(e);
    }

    render() {
        return (
            <form onChange={this.handleChanges.bind(this)} onSubmit={this.submit.bind(this)}>
                <Dropzone style={DropzoneStyle} onDrop={this.onDrop.bind(this)}>
                    {this.state.files.map(file => (
                        <p>{JSON.stringify(this.state.imgData, null, 2).replace(/\n/, '<br/>')}</p>
                    ))}
                    {this.state.files.length === 0 && (
                        <p style={{
                            margin: 15
                        }}>Veuillez glisser une image...</p>
                    )}
                </Dropzone>
                {FieldValidations.map((f, i) => (<FormField {...f} key={i} value={this.state[f.key]}/>))}
                <button className="btn btn-primary" type="submit">Cr&eacute;er</button>
                <Debug object={this.state}/>
            </form>
        );
    }
}

export {ItemForm};
