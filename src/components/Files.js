import React, {Component} from 'react';
import '../css/files.css'
import axios from 'axios'
import Modal from "./Modal";
class Files extends Component {
    state = {
        files: [],
        fileViewContent: "",
        viewFile: false
    };
    componentWillMount() {
        console.log('props ---- ID',this.props.match.params)
        axios.get(`http://localhost:2222/file/user/${this.props.match.params.id}`)
            .then((result) => {
            console.log('data',result.data.result);
            this.setState({
                files: result.data.result
            })
        }).catch((err) => console.error(err.response.data))
    }

    componentDidMount() {

    }
    viewFile = (fileIdIndex) => {
       this.setState({
           fileViewContent: this.state.files[fileIdIndex],
            viewFile: true
       })
    }
    closeModal = () =>{
        this.setState({
            viewFile: false
        })
    }
    render() {
        // Search - and sort -1
        const fileTypes = ["image","text","video"]
        const fileImage = (fileType) => {
           let fType = fileTypes.find((item) => fileType.toLowerCase().includes(item));
           console.log(fType)
           return `/assets/${fType}File.png`;
        };
        console.log(this.props.match)
        return (
            <div className="files-container">
                <h1 className="files-heading">Files</h1>
                <ul className="card-div">
                    {this.state.files.length <1 ? <li className="">
                        No Files Uploaded
                    </li>:
                        this.state.files.map((item,index) =>
                            <li className="card" key={index} onClick={() => this.viewFile(index)}>
                                <div className="card-image-outer">
                                    <img src={fileImage(item.type)} className="card-image" alt={"card-img"} />
                                </div>
                                <div className="card-detail">
                                    <h5>{item.name}</h5>
                                    <div><span>Size: {item.size} bytes</span></div>
                                </div>
                            </li>
                        )
                    }
                    {}
                </ul>
                {this.state.viewFile &&
                <Modal content = {this.state.fileViewContent} closeModal={this.closeModal} />
                }
            </div>
        );
    }
}

export default Files;