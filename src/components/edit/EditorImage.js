import './EditorImage.scss'
import React from 'react'

const preventDefault = callback => event => {
    event.preventDefault()
    callback()
}

const EditorImage = ({src, alt, onDestroy, onPrimary}) => (
    <div className="editor-thumb">
        <div className="controls">
            {onPrimary && (<a onClick={preventDefault(onPrimary)} className="btn btn-primary btn-sm">Principale</a>)}
            {onDestroy && (<a onClick={preventDefault(onDestroy)} className="btn btn-danger btn-sm">Détruire</a>)}
        </div>
        <img src={src} alt={alt} />
    </div>
)

EditorImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  onDestroy: React.PropTypes.func,
  onPrimary: React.PropTypes.func
};

export default EditorImage
