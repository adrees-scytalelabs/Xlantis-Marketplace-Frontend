import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

function SuperAdminCreateTemplate(props) {
  return (
    <div className="row mt-3">
    <div className="col-12 col-md-4 col-lg-4 col-sm-12">
      <label>
        Key<span style={{ color: "#F64D04" }}>&#42;</span>
      </label>
      <div className="filter-widget">
        <input
          name="key"
          type="text"
          placeholder="Enter key of the property"
          required
          value={props.property.key}
          className="newNftProps"
          onChange={(e) => props.handlePropertyChange(props.index, e)}
        />
      </div>
    </div>

    <div className="col-12 col-md-2 col-lg-1 col-sm-12 ml-2">
      <label className="ml-lg-2 ml-md-2">
        Type<span style={{ color: "#F64D04" }}>&#42;</span>
      </label>
      <div className="position-relative">
        <select
          name="type"
          id="valueType"
          className="templatesSelect"
          placeholder="Select a Type"
          onChange={(e) => props.handlePropertyChange(props.index, e)}
          style={{ padding: "9px" }}
        >
          <option value="boolean" defaultValue>
            Boolean
          </option>
          <option value="string">String</option>
          <option value="number">Number</option>
        </select>
      </div>
    </div>

    <div className="col-12 col-md-5 col-lg-1 ml-lg-5 ml-md-5 ml-sm-2 ml-xs-2 mt-4 mt-md-0 ml-2 ml-md-0">
      <label>Action</label>
      <div className="filter-widget">
        <Tooltip title="Remove a property" placement="bottom">
          <button
            className="btn btn-submit btn-lg propsActionBtn"
            onClick={(e) => props.handleRemoveProperty(e, props.index)}
          >
            -
          </button>
        </Tooltip>
      </div>
    </div>
  </div>
  )
}

export default SuperAdminCreateTemplate