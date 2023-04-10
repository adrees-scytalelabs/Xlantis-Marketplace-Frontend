import React from 'react'
import Tooltip from "@material-ui/core/Tooltip";

function AddNftQueue({
    NFTType,
    image,
    name,
    description,
    tokenSupply,
    collection,
    isUploadingData,
    handleAddClick
}) {
  return (
    <div>
          {NFTType === "1155" ? (
                  <div>
                    {image === "" ||
                      name === "" ||
                      description === "" ||
                      tokenSupply === "" ||
                      collection === "" ||
                      tokenSupply <= 0 ||
                      isUploadingData === true ? (
                      <Tooltip
                        title={
                          tokenSupply <= 0
                            ? "Token Supply Cannot Be Less Than 1"
                            : ""
                        }
                      >
                        <button
                          className="btn propsActionBtn"
                          type="submit"
                          disabled
                        >
                          <i className="fa fa-plus"></i> Add NFT to Queue
                        </button>
                      </Tooltip>
                    ) : (
                      <button
                        className="btn propsActionBtn"
                        type="button"
                        onClick={(e) => handleAddClick(e)}
                      >
                        <i className="fa fa-plus"></i> Add NFT to Queue
                      </button>
                    )}
                  </div>
                ) : null}
    </div>
  )
}

export default AddNftQueue