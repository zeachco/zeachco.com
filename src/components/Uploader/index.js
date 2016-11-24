import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '!style!css!sass!./style.scss';
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
        this.setState({uploading: true});
        var config = {
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.ceil(progressEvent.loaded / progressEvent.total * 100);
                this.setState({progress: percentCompleted});
            }
        };
        axios
            .post('/api/item/medias', data, config)
            .then(res => {
                this.setState({preview: res.data.preview});
                this
                    .props
                    .onSuccess(res.data);
                this.setState({uploading: false});
            });
    }

    getPercent() {
        const {progress} = this.state;
        return (
            <div className="mask">
                <div className="banner">{progress}%</div>
                <div className="progressContainer"><div className="progressView" style={{width: progress+'%'}}></div></div>
            </div>
        );
    }

    render() {
        const {uploading} = this.state;
        return (
            <Dropzone
                className="uploader"
                style={null}
                onDrop={this.onDrop.bind(this)}>
            {uploading && this.getPercent()}
            {this.props.children}

            </Dropzone>
        )
    }
}
