

import React from 'react'
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";


function AdminSSORedirectForm({
       handleSubmitDetails,
       inputs,
       handleChangeValues,
       success,
    }) {

    const indsutries = [
        { industry: "IT" },
        { industry: "Web Development" },
        { industry: "Computer Networking" },
        { industry: "Telecommunications" },
        { industry: "Software Development" },
        ];
  

  return (
    <form onSubmit={handleSubmitDetails} autoComplete="off">
        <div className="ssoDetailsInput-group">
        <h2>Finish Account Setup</h2>
        <div className="row no-gutters justify-content-center align-items-center w-100">
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <div className="form-group">
                
                <label htmlFor="fullName">Full Name</label>
                <div className="form-group newNftWrapper">
                    <input
                    id="fullName"
                    type="text"
                    value={inputs?.fullName || ""}
                    name="fullName"
                    required
                    placeholder="Full Name"
                    className="form-control-login -login newNftInput"
                    onChange={handleChangeValues}
                    />
                </div>
                <label htmlFor="industry">Industry</label>
                <div className="form-group newNftWrapper">
                    <select
                    id="industry"
                    name="industryType"
                    value={inputs?.industryType || ""}
                    required
                    className="form-control-login  newNftInput"
                    onChange={handleChangeValues}
                    >
                    <option value="Select Industry">
                        Select Industry
                    </option>
                    {indsutries.map((i, index) => (
                        <option value={i.industry} key={index}>
                        {i.industry}
                        </option>
                    ))}
                    </select>
                </div>
                <label htmlFor="story">
                    Why do you want to join Xmanna?
                </label>
                <div className="form-group newNftWrapper">
                    <textarea
                    id="reasonForInterest"
                    name="reasonForInterest"
                    required
                    value={inputs?.reasonForInterest || ""}
                    className="form-control-login -login newNftInput"
                    onChange={handleChangeValues}
                    rows="6"
                    cols="33"
                    minLength={10}
                    maxLength={500}
                    ></textarea>
                </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <label htmlFor="companyName">Company Name</label>
                <div className="form-group newNftWrapper">
                <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={inputs?.companyName || ""}
                    placeholder="Company Name"
                    className="form-control-login -login newNftInput"
                    onChange={handleChangeValues}
                />
                </div>
                <div className="form-group">
                <label htmlFor="designation">Designation</label>
                <div className="form-group newNftWrapper">
                    <input
                    id="designation"
                    name="designation"
                    type="text"
                    required
                    value={inputs?.designation || ""}
                    placeholder="Designation"
                    className="form-control-login -login newNftInput"
                    onChange={handleChangeValues}
                    />
                </div>
                <label htmlFor="domain">Domain</label>
                <div className="form-group newNftWrapper">
                    <input
                    id="domain"
                    name="domain"
                    type="text"
                    required
                    value={inputs?.domain || ""}
                    placeholder="Domain"
                    className="form-control-login -login newNftInput"
                    onChange={handleChangeValues}
                    />
                </div>
                </div>
                <div className="row no-gutters justify-content-center justify-content-md-end align-items-end w-100 mt-4 pt-md-3">
                <div className="col-12 col-md-8 col-lg-6">
                    <button className="signUpBtn-link" type="submit">
                    Save
                    </button>
                    {success && <Navigate to="/updatRequestSent" />}
                </div>
                </div>
            </Grid>
            </Grid>
        </div>
        </div>
    </form>

  )
}

export default AdminSSORedirectForm;