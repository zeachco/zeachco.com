import React from 'react';
const style = {
  background: '#222',
  color: 'white',
  position: 'fixed',
  right: 10,
  bottom: 10
};

export const Debug = props => (<pre style={style} className="dark">{JSON.stringify(props.object, null, 2)}</pre>);
