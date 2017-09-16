import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import AutoBind from 'auto-bind';

import Translate from '../Translate';
import Uploader from '../Uploader';
import EditorImage from '../edit/EditorImage';
import BSFormField from '../BSFormField';
import Checkbox from '../Checkbox';
import RichTextArea from '../RichTextArea';
import { Price } from 'cms-core/src/components/Price/Price';
import { formula, getSpaces } from '../../core/utils';
import { ItemOptions } from '../../core/converter';
import { createOrUpdate } from '../../store/actions/items';
import { addToastMessage } from '../../store/actions/notifications';

const fieldHandlers = {
    optionString: function (value) {
        this.setState({
            optionString: value,
            options: ItemOptions.toObject(value)
        });
    }
};

class ItemForm extends Component {
    constructor(args) {
        super(args)
        this.state = {
            files: [],
            ...this.props
        };
        AutoBind(this);
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

    fetchItem() {
        const {_id} = this.props;
        if (_id) {
            axios.get('/api/admin/item/' + _id).then(xhr => {
                this.setState(this.mapItemIn(xhr.data));
            });
        }
    }

    deleteItem(e) {
        e.preventDefault();
        const { _id } = this.props;
        const proceed = confirm('are you sure?'); // eslint-disable-line no-alert
        if(proceed) {
            axios
            .delete('/api/admin/item/' + _id)
            .then(() => addToastMessage({
                message: 'item have been deleted',
                type: 'success'
            }))
            .catch(err => addToastMessage({
                message: JSON.stringify(err),
                type: 'danger'
            }));
        }
    }

    mapItemIn(get) {
        return {
            ...get,
            labels: Array.isArray(get.labels) ? get.labels.join(', ') : get.labels,
            optionString: ItemOptions.toString(get.options)
        };
    }

    mapItemOut(post) {
        delete post.__v
        delete post.optionString
        post.labels = post.labels.split(/[ ,]/g).filter(l => !!l)
        return Object.assign({}, post);
    }

    handleChanges(ev) {
        ev.preventDefault();
        const key = ev.target.name;
        let value = ev.target.value;
        if (fieldHandlers[key]) {
            fieldHandlers[key].call(this, value);
        } else {
            this.setState({[key]: value});
        }
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
        addToastMessage({
            message: (
                <Translate
                    content="image_uploaded_success"
                    data={{
                    file: response.originalname
                    }}
                />
            ), type: 'success'
        });
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
        const spaces = getSpaces();
        const {
            space,
            code,
            name,
            visible,
            shortDescription,
            description,
            price = 0,
            labels = [],
            options = [],
            optionString = '',
            width,
            height,
            depth,
            weight,
            files = [],
            customOptions = {}
        } = this.state;

        const evalContext = {};
        options.forEach(og => {
            evalContext[og.code] = +customOptions[og.code] || 0;
        });
        const formulaEval = formula(price, evalContext);
        const formulaState = formulaEval.isValid
            ? 'info'
            : 'warning';


        let actions = (
            <Row>
                <Col sm={7} md={8} lg={6}>
                    <BSFormField icon="save">
                        <button className="btn btn-primary" type="submit">
                            <Translate content="create_item"/>
                        </button>
                    </BSFormField>
                </Col>
            </Row>
        );
        if(this.state._id) {
            actions = (
                <Row>
                    <Col sm={7} md={8} lg={6}>
                        <BSFormField icon="save">
                            <button className="btn btn-primary" type="submit">
                                <Translate content="save_item"/>
                            </button>
                            <button className="btn btn-danger" onClick={this.deleteItem}>
                                <Translate content="delete"/>
                            </button>
                        </BSFormField>
                    </Col>
                </Row>
            );
        }
        return (
            <form
                className="form-horizontal well"
                onChange={this.handleChanges}
                onSubmit={this.submit}>
                <fieldset>
                    <legend
                        style={{
                        textAlign: 'center'
                        }}>
                        <Checkbox
                            className="published_checkbox"
                            checked={!!visible}
                            onChange={ bol => this.setState({ visible: bol}) } >
                            <strong>
                                <Translate content="item_field_published" />
                            </strong>
                        </Checkbox>
                        <br/>
                        {_id
                            ? (
                                <h2>
                                    <Translate content="item_modification"/><br/>
                                    <small>{name || code || _id}</small>
                                </h2>
                            )
                            : (<Translate content="create_item" />)}
                    </legend>
                    <Row className="show-grid">
                        <Col sm={7} md={8} lg={6}>
                            <BSFormField label={(<Translate content="space_name"/>)} icon="globe">
                                <select name="space" className="form-control" value={space}>
                                    <option value="">{Translate.content("select_space")}</option>
                                    {spaces.map(s => (
                                        <option value={s} key={s}>{s}</option>
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
                                    name="shortDescription"
                                    placeholder="Shirt with a unicorn design"
                                    className="form-control"
                                    value={shortDescription}
                                    type="text"/>
                            </BSFormField>
                            <BSFormField label={(<Translate content="item_full_description"/>)}>
                                <RichTextArea
                                    className="form-control"
                                    name="description"
                                    placeholder="This shirt is made of 97% coton and 4% magic"
                                    onChange={ html => this.setState({description: html}) }
                                    rows={12}
                                    value={description} />
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
                                <textarea
                                    name="optionString"
                                    className="form-control"
                                    value={optionString}
                                    rows="3"></textarea>
                            </BSFormField>
                            <p>
                                <b>Example</b>
                                <code>size: small, medium, large, xlarge=2</code>
                                would define an option named
                                <code>size</code>
                                that can be used in the price field and his value would be
                                <code>0</code>
                                or what's is specified after the
                                <code>=</code>
                                sign.
                            </p>
                            <p>A line can be jumped for a new option group</p>
                            <hr/> {options.map(og => {
                                return (
                                    <BSFormField label={og.code} icon="th-list">
                                        <select
                                            name={og.code}
                                            className="form-control"
                                            onChange={e => {
                                                const value = e.target.value;
                                                this.setState(state => ({
                                                    customOptions: {
                                                        ...state.customOptions,
                                                        [og.code]: value
                                                    }
                                                }))
                                            } }>
                                                <option>Choose an option to test</option>
                                                {og
                                                .options
                                                .map(o => (
                                                    <option value={o.value} title={o.value}>{o.code}</option>
                                                ))}</select>
                                    </BSFormField>
                                )
                            })}
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
                                    value={price} />
                                    <span className="input-group-addon" ><Price value={formulaEval.value} /></span>
                            </BSFormField>
                        </Col>
                        <Col sm={5} md={4} lg={6}>
                            <div className="editor-images">
                                <img className="col-xs-12" src={files[0]} alt="Primary"/>
                                <div>
                                    {files.map((src, index) => (<EditorImage
                                        key={'image' + src}
                                        onDestroy={this.deleteImage(index)}
                                        onPrimary={index > 0
                                        ? this.setPrimaryImage(index)
                                        : null}
                                        alt={this.state.name}
                                        src={src}/>))}
                                </div>
                            </div>
                            <Uploader url="/api/item/medias" onSuccess={this.fileUploaded}>
                                <div className="mask">
                                    <div className="banner"><Translate content="drop_image_here"/></div>
                                </div>
                            </Uploader>
                        </Col>
                    </Row>
                    {actions}
                </fieldset>
            </form>
        );
    }
}

ItemForm.propTypes = {
    _id: React.PropTypes.string.isRequired
};

export default ItemForm;
