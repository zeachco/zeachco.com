import React from 'react';
import {Editor, EditorState} from 'draft-js';

class DescriptionEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => this.setState({editorState});
    }
    render() {
        return (
            <div>
                <h4>Description</h4>
                <Editor editorState={this.state.editorState} onChange={this.onChange} />
            </div>
        );
    }
}

export default DescriptionEditor
