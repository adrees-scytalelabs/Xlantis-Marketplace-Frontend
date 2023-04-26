import React from 'react'

function Select({
        label,
        values,
        placeholder,
        setValue,
    }) {

    

  return (
    <div>
        <label>{label}</label>
        <div className="form-group newNftWrapper">
            <input
                type="text"
                required
                value={values}
                placeholder={placeholder}
                className="form-control newNftInput"
                onChange={(e) => {
                    setValue(e.target.value);
                    console.log(e.target.value);
                }}
            />
        </div>
    </div>
  )
}

export default Select;