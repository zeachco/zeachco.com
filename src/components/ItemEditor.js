import React, {Component} from 'react';
import {connect} from 'react-redux';
import Field from '../components/Field';

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
    console.log(this.state);
  }

  delete(e) {
    e.preventDefault();
    console.log(e);
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
            <div className="col-sm-12 col-md-12"></div>
            <div className="col-sm-6 col-md-4">
              <label href="#" className="thumbnail btn">
                <img src={`//rockplusinc.com/img/full/_${item.code}.png`} alt={item.code}/>
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
            </div>

            <div className="col-sm-6 col-md-8">
              <Field.Select label="Site" name="site" value={item.site} options={sites}/>
              <Field.Select label="Catégorie" name="category" value={item.category} options={categories}/>
              <Field.Text label="Prix" name="price" value={item.price}/>
              <Field.Check label="Hors inventaire" name="backorder" value={item.backorder}/>
              <Field.Check label="Nouveau" name="new" value={item.new}/>
              <Field.Check label="Nouveau Prix" name="newPrice" value={item.newPrice}/>
            </div>
            <div className="col-sm-12 col-md-12 row">
              <button type="reset" onClick={this.delete.bind(this)} className="btn btn-default">Détruire</button>&nbsp;
              <button type="reset" className="btn btn-default">Variation</button>&nbsp;
              <button type="submit" className="btn btn-primary">Sauver</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ItemEditor;

const mapStatetoProps = (store, ownProps) => ({isAuth: store.session.isAuth, isLoading: store.session.isLoading, session: store.session});

const mapDispatchToProps = (dispatch, ownProps) => ({
  save: () => dispatch({type: 'ITEM_SAVE', payload: ownProps})
});

export default connect(mapStatetoProps, mapDispatchToProps)(ItemEditor);
