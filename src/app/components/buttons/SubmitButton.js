import React from 'react'
import WhiteSpinner from '../Spinners/WhiteSpinner';


function SubmitButton({
    label,
    isSaving,
    version,
    handleSubmitEvent,
    handleSubmitEventMetamask
}) {
  return (
    <div>
        {isSaving ? (
          <WhiteSpinner />
        ) : (
          <div className="submit-section">
            <button
              type="button"
              onClick={(e) => {
                version === "v1-sso"
                  ? handleSubmitEvent(e)
                  : handleSubmitEventMetamask(e);
              }}
              className="btn submit-btn propsActionBtn"
            >
              {label}
            </button>
          </div>
        )}
    </div>
  )
}

export default SubmitButton