import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import '../css/upload.css'
import axios from 'axios'
import Modal from "./Modal";
class Upload extends Component {
    constructor() {
        super();
        this.onDrop = (files) => {
            this.setState({file: files[0],fileError: false})
        };
        this.state = {
            file: {},
            fileError: false,
            upload: false,
            modalType: "",
            modal: false
        };
    }
    uploadFile = () => {
        console.log('this.props.match',this.props.match.params.id);
        if(!(Object.keys(this.state.file).length)){
            this.setState({
                fileError: true
            })
            return;
        }
        this.setState({upload: true})
        const formData = new FormData();
        formData.append('file-value',this.state.file,this.state.file.name)
        axios.post(`http://localhost:2222/upload/${this.props.match.params.id}`,formData,{
            contentType: "multipart/form-data"
        }).then((data)=>{
            console.log('Data',data);
            if(data.error) {
            }
            else{
                this.setState({
                    modal: true,
                    modalType: "success",
                    file: {},
                    upload: false
                })
            }
        })
    };
    closeModal = () => {
      this.setState({modal:false,modalType:""})
    };
    render() {
        const files =
            <li key={this.state.file.name}>
                {this.state.file.name} - {this.state.file.size} bytes
            </li>

        return (
            <div className="upload-container">
                <h1 className="heading">Upload a file</h1>
            <Dropzone onDrop={this.onDrop} multiple={false} noClick={true} noKeyboard={true}>
                {({getRootProps, getInputProps,open,isDragActive,
                      isDragAccept,
                      isDragReject,
                    }) => (
                    <section className="dropZone-outer">
                        {this.state.upload ?
                            <div className="uploading dropZone">
                                <span>Uploading </span>
                                <span className="dots"/>
                                <span className="dots"/>
                                <span className="dots"/>
                                <span className="dots"/>
                            </div> :
                            <React.Fragment>
                        <div {...getRootProps({className: isDragAccept ? "dropZone isAccept" : isDragReject ? "dropZone isReject" :
                                isDragActive ? "dropZone isActive" : "dropZone"})}>
                            <input {...getInputProps()} />
                            <button type="button" className="btn fileUploadBtn" onClick={open} >File upload</button>
                            <div className="option">OR</div>
                            <p className="dragText">Drag 'n' drop file here</p>
                            <div className="cloudIcon">
                                <i className="fa fa-cloud" />
                                <i className="fa fa-arrow-up arrowUp" />
                            </div>
                        </div>
                                <h4>File Uploaded</h4>
                                <ul>{files}</ul>
                        <button className="upload-button" onClick={this.uploadFile}>Upload</button>
                            </React.Fragment>
                        }
                    </section>
                )}
            </Dropzone>
                {this.state.modal &&
                <Modal closeModal={this.closeModal} type ={this.state.modalType} />}
            </div>
        );
    }
}
export default Upload;