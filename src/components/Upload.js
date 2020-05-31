import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import '../css/upload.css'

class Upload extends Component {
    constructor() {
        super();
        this.onDrop = (files) => {
            console.log(files);
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
                      isDragReject,
                    }) => (
                    <section className="dropZone-outer">
                        <h4>File Uploaded</h4>
                        <ul>{files}</ul>
                        <button type="button" className={"upload-button"} onClick={open} >File upload</button>
                        <div className="option">OR</div>
                        <div {...getRootProps({className: isDragAccept ? "dropZone isAccept" : isDragReject ? "dropZone isReject" :
                                isDragActive ? "dropZone isActive" : "dropZone"})}>
                            {console.log(isDragAccept)}
                            <input {...getInputProps()} />
                            <p className="dragText">Drag 'n' drop file here</p>
                            <div className="cloudIcon">
                                <i className="fa fa-cloud" />
                                <i className="fa fa-arrow-up arrowUp" />
                            </div>
                        </div>
                        <button className="upload-button">Upload</button>
                    </section>
                )}
            </Dropzone>
            </div>
        );
    }
}
export default Upload;