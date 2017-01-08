import '!style!css!sass!./EditorImage.scss'
import React from 'react'

const preventDefault = callback => event => {
    event.preventDefault()
    callback()
}

export const EditorImage = ({src, alt, onDestroy, onPrimary}) => (
    <div className="editor-thumb">
        <div className="controls">
            {onPrimary && (<button onClick={preventDefault(onPrimary)} className="btn btn-primary btn-sm">Principale</button>)}
            {onDestroy && (<button onClick={preventDefault(onDestroy)} className="btn btn-danger btn-sm">Détruire</button>)}
        </div>
        <img src={src} alt={alt} />
    </div>
)

EditorImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  onDestroy: React.PropTypes.func.isRequired,
  onPrimary: React.PropTypes.func.isRequired
}