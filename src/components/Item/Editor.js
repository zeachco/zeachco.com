import React, {Component} from 'react';
import {connect} from 'react-redux';

import Field from '../Field';

class ItemEditor extends Component {
  constructor(props) {
    super(props);
    this.state = props.item;
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.item);
  }

  validate(e) {
    let val = e.target.value;
    if (e.target.type === 'checkbox') {
      val = e.target.checked;
    }
    this.setState({
      [e.target.name]: val
    });
  }

  submit(e) {
    e.preventDefault();
  }

  delete(e) {
    e.preventDefault();
  }

  render() {
    const item = this.state;
    if (!item) {
      return (
        <p>Invalid item</p>
      );
    }
    const sites = (this.props.session.sites || []).map(site => ({key: site._id, label: site.name}));
    const categories = [
      {
        sites: [null],
        key: 'cat-a',
        label: 'Category A'
      }, {
        sites: [null],
        key: 'cat-b',
        label: 'Category B'
      }
    ].filter(cat => cat.sites.indexOf(item.site));
    return (
      <form onSubmit={this.submit.bind(this)} onChange={this.validate.bind(this)}>
        <div className="panel panel-default">
          <div className="panel-body">
            <label href="#" className="thumbnail btn">
              <img src={item.imgThumb} alt={item.code}/>
              <input style={{
                display: 'none'
              }} type="file"/>
            </label>
            <div className="caption">
              <Field.Text label="Nom" name="name" value={item.name}/>
              <Field.Text label="Code" name="code" value={item.code}/>
              <Field.Area label="Description" name="description" value={item.description} options={{
                rows: 6
              }}/>
            </div>
            <Field.Select label="Site" name="site" value={item.site} options={sites}/>
            <Field.Select label="Catégorie" name="category" value={item.category} options={categories}/>
            <Field.Text label="Prix" name="price" value={item.price}/>
            <Field.Check label="Hors inventaire" name="backorder" value={item.backorder}/>
            <Field.Check label="Nouveau" name="new" value={item.new}/>
            <Field.Check label="Nouveau Prix" name="newPrice" value={item.newPrice}/>
          </div>
          <div>
            <button type="reset" onClick={this.delete.bind(this)} className="btn btn-default">Détruire</button>&nbsp;
            <button type="reset" className="btn btn-default">Variation</button>&nbsp;
            <button type="submit" className="btn btn-primary">Sauver</button>
          </div>
        </div>
      </form>
    );
  }
}

ItemEditor.propTypes = {
  session: React.PropTypes.object.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isAuth: React.PropTypes.bool.isRequired,
  item: React.PropTypes.object.isRequired
}

const mapStatetoProps = (store) => ({
  isAuth: store.get('old').session.isAuth,
  isLoading: store.get('old').session.isLoading,
  session: store.get('old').session
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  save: () => dispatch({type: 'ITEM_SAVE', payload: ownProps})
});

export default connect(mapStatetoProps, mapDispatchToProps)(ItemEditor);
