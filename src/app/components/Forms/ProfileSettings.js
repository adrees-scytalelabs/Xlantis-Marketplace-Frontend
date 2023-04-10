

import React from 'react'

function ProfileSettingsForm({
       onSubmitHandleEvent,
       onChangePictureHandler,
       setMobileInput,
       setIsFieldChanged,
       check,handleSet2FAcheck,
       isSavingChanges,
    }) {



  return (
    <form onSubmit={onSubmitHandleEvent}>
    <div className="row form-row">
        <div className="col-12 col-md-12">
        <div className="form-group">
            <div className="change-avatar">
            <div className="profile-img">
                <div
                style={{
                    background: "#E9ECEF",
                    width: "100px",
                    height: "100px",
                }}
                >
                <p
                    style={{
                    color: "#00D0F1",
                    fontSize: "24px",
                    marginLeft: "35%",
                    paddingTop: "33%",
                    }}
                >
                </p>
                </div>
            </div>
            <div className="upload-img">
                <div
                className="change-photo-btn"
                style={{ backgroundColor: "rgb(167,0,0)" }}
                >
                <span>
                    <i className="fa fa-upload"></i>
                    Upload Photo
                </span>
                <input
                    name="sampleFile"
                    type="file"
                    className="upload"
                    accept=".png,.jpg,.jpeg,.gif"
                    onChange={onChangePictureHandler}
                />
                </div>
                <small className="form-text text-muted">
                Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                </small>
            </div>
            </div>
        </div>
        </div>
        <div className="col-12 col-md-6">
        <div className="form-group">
            <label>Name</label>
            <input
            disabled
            type="text"
            className="form-control"
            />
        </div>
        </div>
        <div className="col-12 col-md-6">
        <div className="form-group">
            <label>Email ID</label>
            <input
            disabled
            type="email"
            className="form-control"
            />
        </div>
        </div>
        <div className="col-12 col-md-6">
        <div className="form-group">
            <label>Mobile</label>
            <input
            type="text"
            className="form-control"
            onChange={(e) => {
                setMobileInput(e.target.value);
                setIsFieldChanged(true);
            }}
            required
            />
        </div>
        </div>
        <div className="col-12">
        <div className="form-group">
            <label>Two Factor Authentication</label>
            <Form.Check
            type="switch"
            id="custom-switch"
            label="If enabled, you will receive a security code for login!"
            checked={check}
            onChange={handleSet2FAcheck}
            />
        </div>
        </div>
    </div>
    <div className="submit-section">
        {isSavingChanges ? (
        <div className="text-center">
            <Spinner
            animation="border"
            role="status"
            style={{ color: "#00D0F1" }}
            >
            <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
        ) : (
        <div className="text-center">
            <button
            type="submit"
            className="btn submit-btn"
            >
            Save Changes
            </button>
        </div>
        )}
    </div>
    </form>

  )
}

export default ProfileSettingsForm;