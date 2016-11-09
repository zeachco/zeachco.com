import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
const imgStyle = {
    display: 'block',
    width: '100%'
};
export class Uploader extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            preview: null,
            progress: 0
        };
    }
    onDrop(e) {
        var data = new FormData();
        // e.forEach(file => data.append(file))
        data.append('file', e[0]);
        var config = {
            onUploadProgress: progressEvent => {
                var percentCompleted = progressEvent.loaded / progressEvent.total;
                this.setState({progress: percentCompleted});
            }
        };
        axios.post('/api/item/medias', data, config).then(res => {
            this.setState({preview: res.data.preview});
            this.props.onSuccess(res.data);
        });
    }

    getPercent() {
        return Math.ceil(this.state.progress * 10000) / 100 + '%';
    }

    render() {
        const {progress, preview} = this.state;
        return (
            <Dropzone onDrop={this.onDrop.bind(this)}>
                {progress < 1
                    ? (
                        <p style={{
                            padding: 5
                        }}>{this.getPercent()}</p>
                    )
                    : <img style={imgStyle} src={preview}/>}

            </Dropzone>
        )
    }
}
