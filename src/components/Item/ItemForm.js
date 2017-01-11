import React, {Component} from 'react'
import {Uploader, EditorImage, Translate, BSFormField, ProductOptionGroup} from '..'
import actions from '../../store/actions'
import store from '../../store'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap';
import {bind, formula} from '../../core/utils';

const {createOrUpdate} = actions.items;
const {addToastMessage} = actions.notifications
const fieldHandlers = {
    options: input => ([])
};

export class ItemForm extends Component {
    constructor(args) {
        super(args)
        this.state = {
            files: [],
            ...this.props
        };
        bind(this, 'handleChanges', 'submit', 'fileUploaded', 'fetchItem', 'addOption', 'removeOption', 'setPrimaryImage', 'deleteImage');
        this.fetchItem();
    }

    willReceiveProps(newProps) {
        this.setState({
            name: 'Loading...',
            files: [],
            ...newProps
        });
        this.fetchItem();
    }

    fetchItem(props) {
        const {_id} = this.props;
        if (_id) {
            axios
                .get('/api/admin/item/' + _id)
                .then(xhr => {
                    this.setState(this.mapItemIn(xhr.data));
                });
        }
    }

    mapItemIn(get) {
        const item = {
            ...get,
            labels: get.labels.length ? get.labels.join(', ') : get.labels
        };
        return item;
    }

    mapItemOut(post) {
        const item = {
            ...post,
            labels: post.labels.split(/[ ,]/g)
        };
        return item;
    }

    handleChanges(ev) {
        ev.preventDefault();
        const key = ev.target.name;
        const value = fieldHandlers[key] ? fieldHandlers[key](ev.target.value) : ev.target.value;
        this.setState({
            [key]: value
        });
    }

    submit(e) {
        e.preventDefault();
        createOrUpdate(this.mapItemOut(this.state));
    }

    fileUploaded(response) {
        this.setState({
            files: [
                ...this.state.files,
                '/api/medias/' + response.filename
            ]
        });
        addToastMessage({message: (<Translate
            content="image_uploaded_success"
            data={{
            file: response.originalname
        }}/>), type: 'success'});
    }

    getSpaces() {
        const {session} = store.getState();
        return session.spaces || [];
    }

    addOption(e) {
        this.setState(state => ({
            options: [
                ...state.options, {}
            ]
        }));
    }

    removeOption(index) {
        this
            .state
            .options
            .splice(index, 1);
    }

    deleteImage(index) {
        return () => {
            this.setState(state => {
                const files = [...state.files];
                files.splice(index, 1);
                return {files: files};
            });
        }
    }

    setPrimaryImage(index) {
        return () => {
            this.setState(state => {
                const files = [...state.files];
                files.splice(index, 1);
                files.unshift(state.files[index]);
                return {files: files};
            });
        }
    }

    render() {
        const {_id} = this.props;
        const spaces = this.getSpaces();
        const formulaEval = formula(this.state.price, {});
        const formulaState = formulaEval.isValid
            ? 'info'
            : 'warning';
        const {
            space,
            code,
            name,
            shortDescription,
            description,
            price = 0,
            labels = [],
            options = [],
            width,
            height,
            depth,
            weight,
            files = []
        } = this.state;
        return (
            <form
                className="form-horizontal well"
                onChange={this.handleChanges}
                onSubmit={this.submit}>
                <fieldset>
                    <legend
                        style={{
                        textAlign: 'center'
                    }}>{_id
                            ? (
                                <h2>
                                    <Translate content="item_modification"/><br/>
                                    <small>{name || code || _id}</small>
                                </h2>
                            )
                            : (<Translate content="create_item"/>)}</legend>
                    <Row className="show-grid">
                        <Col sm={7} md={8} lg={6}>
                            <BSFormField label={(<Translate content="space_name"/>)} icon="globe">
                                <select name="space" className="form-control" value={space}>
                                    <option value="">{Translate.content("select_space")}</option>
                                    {spaces.map(space => (
                                        <option value={space} key={space}>{space}</option>
                                    ))}
                                </select>
                            </BSFormField>
                            <BSFormField label={(<Translate content="item_code"/>)} icon="file">
                                <input
                                    name="code"
                                    placeholder="SK123456789"
                                    className="form-control"
                                    value={code}
                                    type="text"/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="item_name"/>)}>
                                <input
                                    name="name"
                                    placeholder="Blue shirt"
                                    className="form-control"
                                    value={name}
                                    type="text"/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="labels"/>)} icon="tags">
                                <input
                                    name="labels"
                                    placeholder="men, clothes, summer"
                                    className="form-control"
                                    type="text"
                                    value={labels}/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="item_short_description"/>)}>
                                <input
                                    name="short_description"
                                    placeholder="Shirt with a unicorn design"
                                    className="form-control"
                                    value={shortDescription}
                                    type="text"/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="item_full_description"/>)}>
                                <textarea
                                    className="form-control"
                                    name="long_description"
                                    placeholder="This shirt is made of 97% coton and 4% magic"
                                    rows={12}
                                    value={description}></textarea>
                            </BSFormField>
                            <BSFormField label={(<Translate content="width"/>)} icon="resize-horizontal">
                                <input
                                    name="width"
                                    placeholder="10cm"
                                    className="form-control"
                                    type="number"
                                    value={width}/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="height"/>)} icon="resize-vertical">
                                <input
                                    name="height"
                                    placeholder="10cm"
                                    className="form-control"
                                    type="number"
                                    value={height}/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="depth"/>)} icon="export">
                                <input
                                    name="depth"
                                    placeholder="10cm"
                                    className="form-control"
                                    type="number"
                                    value={depth}/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="weight"/>)} icon="scale">
                                <input
                                    name="weight"
                                    placeholder="300g"
                                    className="form-control"
                                    type="number"
                                    value={weight}/>
                            </BSFormField>
                            <hr/>
                            <BSFormField label={(<Translate content="option_group"/>)} icon="th-list">
                                {options.map((opt, index) => (<ProductOptionGroup onChange={e => console.log(e)} option={opt}/>))}
                                <ProductOptionGroup onClick={this.addOption}/>
                            </BSFormField>
                            <hr/>
                            <BSFormField
                                label={(<Translate content="price"/>)}
                                icon="usd"
                                message={formulaEval.error}
                                state={formulaState}>
                                <input
                                    name="price"
                                    placeholder="(10.15 + size) + qty"
                                    className="form-control "
                                    type="text"
                                    value={price}/>
                            </BSFormField>
                        </Col>
                        <Col sm={5} md={4} lg={6}>
                            <div className="editor-images">
                                <img className="col-xs-12" src={files[0]} alt="Primary"/> {files.map((src, index) => (<EditorImage
                                    key={'image' + src}
                                    onDestroy={this.deleteImage(index)}
                                    onPrimary={index > 0
                                    ? this.setPrimaryImage(index)
                                    : null}
                                    alt={this.state.name}
                                    src={src}/>))}
                            </div>
                            <Uploader url="/api/item/medias" onSuccess={this.fileUploaded}>
                                <div className="mask">
                                    <div className="banner"><Translate content="drop_image_here"/></div>
                                </div>
                            </Uploader>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7} md={8} lg={6}>
                            <BSFormField icon="save">
                                <button className="btn btn-primary" type="submit">{this.state._id
                                        ? (<Translate content="save_item"/>)
                                        : (<Translate content="create_item"/>)}</button>
                            </BSFormField>
                        </Col>
                    </Row>
                </fieldset>
            </form>
        );
    }
}
