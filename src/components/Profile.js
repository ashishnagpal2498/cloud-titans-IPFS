import React, {Component} from 'react';
import '../css/profile.css'
import axios from 'axios'
class Profile extends Component {
    componentWillMount() {
        console.log('Props Id',this.props.match)
        axios.get(`http://localhost:2222/login/${this.props.match.params.id}`)
            .then((data) =>{
                console.log('User',data)
                this.setState({
                    user: data.data[0]
                })
            })
            .catch((err) => console.error('Error',err.response))
    }
    state = {
        user: {

        }
    }

    render() {
        return (
            <div className="profile-container">
                <div className="profile-avatar">
                    <img src={this.state.user.imageUrl ? this.state.user.imageUrl :"/assets/dummy_image.png"} alt="profile avatar" />
                </div>
                <div className="profile-details-container">
                    <div className="profile-details">
                        <div className="fx-b100 dFlexRow">
                            <h3 className="fx-b50">Name: </h3>
                            <p className="fx-b50"> {this.state.user.name}</p>
                        </div>
                        <div className="fx-b100 dFlexRow mt-5">
                            <h3 className="fx-b50">Email: </h3>
                            <p className="fx-b50"> {this.state.user.email}</p>
                        </div>
                        <div className="fx-b100 dFlexRow mt-5">
                            <h3 className="fx-b50">Number of files stored: </h3>
                            <p className="fx-b50">{this.state.user.filesStored}</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;