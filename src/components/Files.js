import React, {Component} from 'react';
import '../css/files.css'
import axios from 'axios'
class Files extends Component {

    componentDidMount() {
        axios.get(`http:localhost:2222/files/${this.props.id}`,(data) => {
            console.log('data');
        })
    }

    render() {
        // Search - and sort -1
        return (
            <div className="files-container">
                <h1 className="files-heading">Files</h1>
                <ul className="card-div">
                    {[1,2,3,4,5,6].map((item,index) =>
                        <li className="card" key={index}>
                            <div className="card-image-outer">
                                <img src="/assets/videoFile.png" className="card-image" alt={"card-img"} />
                            </div>
                            <div className="card-detail">
                                <h3>Name of file</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Files;