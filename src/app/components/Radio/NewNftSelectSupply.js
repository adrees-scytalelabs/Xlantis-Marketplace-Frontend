import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Tooltip from "@material-ui/core/Tooltip";


function NewNftSelectSupply({
    NFTType,
    classes,
    setSupplyType,
    setTokenSupply,
    supplyType,
    tokenSupply
}) {

    const SupplyTypeText =
    "Single supply in ERC-1155 refers to a collection of NFTs that have a predetermined, only one copy of NFTs available, while variable supply allows for the creation of multiple and identical NFTs copies, depending on demand.";

  return (
    <div>
         {NFTType === "1155" ? (
                    <div>
                      <FormControl component="fieldset">
                        <Tooltip
                          title={SupplyTypeText}
                          classes={{ tooltip: classes.tooltip }}
                          placement="top-start"
                          arrow={true}
                        >
                          <label
                            component="legend"
                            style={{
                              fontWeight: "bold",
                              fontFamily: "poppins",
                            }}
                          >
                            Select Supply Type{" "}
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            ></i>
                          </label>
                        </Tooltip>
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue="top"
                        >
                          <FormControlLabel
                            style={{ color: "black" }}
                            value="Single"
                            onChange={() => {
                              setSupplyType("Single");
                              setTokenSupply(1);
                            }}
                            checked={supplyType === "Single"}
                            control={<Radio color="secondary" />}
                            label={
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "poppins",
                                }}
                              >
                                Single
                              </span>
                            }
                          />
                          <FormControlLabel
                            style={{ color: "black" }}
                            value="Variable Supply"
                            onChange={() => {
                              setSupplyType("Variable");
                              setTokenSupply(1);
                            }}
                            checked={supplyType === "Variable"}
                            control={<Radio color="secondary" />}
                            label={
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "poppins",
                                }}
                              >
                                Variable Supply
                              </span>
                            }
                          />
                        </RadioGroup>
                      </FormControl>

                      {supplyType === "Single" ? (
                        <div className="form-group">
                          <label
                            style={{
                              fontWeight: "bold",
                              fontFamily: "poppins",
                            }}
                          >
                            Token Supply
                          </label>
                          <div className="filter-widget">
                            <input
                              type="number"
                              required
                              value={tokenSupply}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="form-group">
                          <label
                            style={{
                              fontWeight: "bold",
                              fontFamily: "poppins",
                            }}
                          >
                            Token Supply
                          </label>
                          <div className="filter-widget">
                            <input
                              type="number"
                              placeholder="Enter Token price(USD)"
                              required
                              value={tokenSupply}
                              className="form-control"
                              onChange={(e) => {
                                setTokenSupply(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
    </div>
  )
}

export default NewNftSelectSupply