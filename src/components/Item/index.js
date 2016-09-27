import React from 'react'
import './style.css';

export * from './Inline';
export * from './Editor';

export const Item = ({
  space,
  name,
  imgThumb,
  onClick,
  ...attrs
}) => (
  <tr title={JSON.stringify(attrs, null, 2)} onClick={onClick}>
    <th className="inline-image" style={{
        backgroundImage: `url(${imgThumb})`
      }}>
    </th>
    <td>{name}</td>
    <td>{space}</td>
  </tr>
);

// export class User extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       opened: false
//     };
//   }
//
//   toggle() {
//     this.setState({
//       opened: !this.state.opened
//     })
//   }
//
//   checkbox(attrName, value, label) {
//     return (
//       <label><input readOnly={true} type="checkbox" checked={value} value={attrName}/>&nbsp;{label}</label>
//     );
//   }
//
//   renderDetails() {
//     const {_id, firstName, lastName, email} = this.props;
//     const {spaces} = store.getState().session;
//     return (
//       <div className="well">
//         <small style={{
//           float: 'right',
//           color: '#888'
//         }}>{_id}</small>
//         <h4>{firstName + ' ' + lastName}</h4>
//         <p>{email}</p>
//
//         <div className="form-group">
//           <label htmlFor="space" className="control-label">Espace</label>
//           <select className="form-control" name="space">
//             {spaces.map(space => (
//               <option key={space} value={space}>{space}</option>
//             ))}
//           </select>
//         </div>
//         <div>{this.checkbox('images', true, 'Peut voir les images')}</div>
//         <div>{this.checkbox('prices', true, 'Peut voir les prix')}</div>
//         <hr/>
//         <button className="btn btn-danger" onClick={e => actions.users.destroy(_id)}>Détruire</button>
//       </div>
//     );
//   }
//
//   render() {
//     const {username, space} = this.props;
//     return (
//       <div>
//         <div onClick={this.toggle.bind(this)} className="user_row">
//           <h3>{username}</h3>
//           <span className="label label-default">{space}</span>
//         </div>
//         {this.state.opened && this.renderDetails()}
//       </div>
//     )
//   }
// }
