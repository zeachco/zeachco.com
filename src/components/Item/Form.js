import React, {Component} from 'react';
import {FormField, Uploader, Debug} from '..';
import actions from '../../store/actions';
const {createOrUpdate} = actions.items;
const {addToastMessage} = actions.notifications;

const FieldValidations = [
    {
        label: 'Nom',
        regex: v => (v + '').length > 0,
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
        force: v => v.replace(/[^A-Za-z0-9 \-_]+/g, ''),
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
        this.state = {
            ...this.props,
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

    fileUploaded(response) {
        this.setState({
            files: [
                ...this.state.files,
                response.filename
            ]
        });
        addToastMessage({message: `"${response.originalname}" a bien été téléchargée`, type: 'success'});
    }

    render() {
        return (
            <form
                onChange={this
                .handleChanges
                .bind(this)}
                onSubmit={this
                .submit
                .bind(this)}>
                <Uploader
                    url="/api/item/medias"
                    onSuccess={this
                    .fileUploaded
                    .bind(this)}/>
                <div className="form-group">
                    <label htmlFor="space-select">Select list:</label>
                    <select
                        id="space-select"
                        name="space"
                        className="form-control"
                        value={this.state.space}>
                        <option value="">-- Choisir --</option>
                        <option value="rockplusinc.com">RockPlus inc.</option>
                        <option value="gosensi.com">Gosensi</option>
                    </select>
                </div>
                {FieldValidations.map((f, i) => (<FormField {...f} key={i} value={this.state[f.key]}/>))}
                <button className="btn btn-primary" type="submit">{this.state._id
                        ? 'Enregistrer'
                        : 'Créer'}</button>
                <Debug object={this.state}/>
            </form>
        );
    }
}

export {ItemForm};
