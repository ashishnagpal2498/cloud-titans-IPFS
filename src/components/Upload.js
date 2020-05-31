import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import '../css/upload.css'

class Upload extends Component {
    constructor() {
        super();
        this.onDrop = (files) => {
            this.setState({files})
        };
        this.state = {
            files: []
        };
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        return (
            <div className="upload-container">
                <h1 className="heading">Upload a file</h1>
            <Dropzone onDrop={this.onDrop} multiple={false} noClick={true} noKeyboard={true}>
                {({getRootProps, getInputProps,open,isDragActive,
                      isDragAccept,
                      isDragReject }) => (
                    <section className="dropZone-outer">
                        <button type="button" className={"upload-button"} onClick={open} >File upload</button>
                        <div className="option">OR</div>
                        <div {...getRootProps({className: isDragActive ? "dropZone isActive": isDragReject ? "dropZone isReject" :
                        isDragAccept ? "dropZone isAccept" : "dropZone"})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                )}
            </Dropzone>
            </div>
        );
    }
}
export default Upload;