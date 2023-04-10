import React from 'react'

function ProfileDetailInput({
    label,
    placeholder,
    set,
    value,
    disabled,
    row,
    type
}) {
  return (
    <div>
        <label>{label}</label>
                    <div className="form-group">
                      <input
                        type={type}
                        required
                        disabled={disabled}
                        value={value}
                        placeholder={placeholder}
                        className="form-control"
                        rows={row}
                        onChange={(e) => {
                          set(e.target.value);
                        }}
                      />
                    </div>
    </div>
  )
}

export default ProfileDetailInput