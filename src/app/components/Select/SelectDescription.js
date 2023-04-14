import React from 'react'

function SelectDescription({
        label,
        values,
        placeholder,
        setDescription,
    }) {

    

  return (
    <div>
        <div>
        <label>{label}</label>
        <small style={{ marginLeft: "5px" }}></small>
        </div>

        <div className="form-group newNftWrapper">
        <textarea
            type="text"
            required
            rows="4"
            value={values}
            placeholder={placeholder}
            className="form-control newNftInput"
            onChange={(e) => {
            setDescription(e.target.value)
            }}
        />
        </div>
    </div>
  )
}

export default SelectDescription;