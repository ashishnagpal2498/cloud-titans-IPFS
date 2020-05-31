import React, {Component} from 'react';
import '../css/profile.css'
class Profile extends Component {
    render() {
        return (
            <div className="profile-container">
                <div className="profile-avatar">
                    <img src="/assets/dummy_image.png" alt="profile avatar" />
                </div>
                <div className="profile-details-container">
                    <div className="profile-details">
                        <div className="fx-b100 dFlexRow">
                            <h3 className="fx-b50">Name: </h3>
                            <p className="fx-b50"> ABC</p>
                        </div>
                        <div className="fx-b100 dFlexRow mt-5">
                            <h3 className="fx-b50">Email: </h3>
                            <p className="fx-b50"> xyz@gmail.com</p>
                        </div>
                        <div className="fx-b100 dFlexRow mt-5">
                            <h3 className="fx-b50">Number of files stored: </h3>
                            <p className="fx-b50">2</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;