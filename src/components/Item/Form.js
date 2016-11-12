import React, {Component} from 'react';
import {FormField, Debug, Uploader} from '..';
import actions from '../../store/actions';
const {createOrUpdate} = actions.items;
const {addToastMessage} = actions.notifications;

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

    fileUploaded(response) {
      addToastMessage({message: `"${response.originalname}" a bien été téléchargée`, type: 'success'});
    }

    render() {
        return (
            <form onChange={this.handleChanges.bind(this)} onSubmit={this.submit.bind(this)}>
                <Uploader url="/api/item/medias" onSuccess={this.fileUploaded.bind(this)}/>
                {FieldValidations.map((f, i) => (<FormField {...f} key={i} value={this.state[f.key]}/>))}
                <button className="btn btn-primary" type="submit">Cr&eacute;er</button>
            </form>
        );
    }
}

export {ItemForm};
