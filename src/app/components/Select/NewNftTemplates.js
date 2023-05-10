import { Tooltip, Typography } from "@mui/material";
import React from "react";
function NewNftTemplates({
  setProperties,
  properties,
  standardTemplates,
  handleStandardSelectTemplate,
  handleSetProperties,
  setExtractedDataProps,
  extractedDataProps,
  setNewTemplateModalShow,
  setTemplate,
  template,
  templateData,
  defaultTemplates,
}) {
  const handleSelectTemplate = (e) => {
    setExtractedDataProps(null);
    //console.log(e.target.value, " Template selected!");
    if (templateData) {
      for (let i = 0; i < templateData.length; i++) {
        if (e.target.value === templateData[i].name) {
          handleSetProperties(templateData[i].properties);

          // console.log("values matched");
          let dynamicField = [];
          for (let p = 0; p < templateData[i].properties.length; p++) {
            dynamicField.push({
              key: templateData[i].properties[p].key,
              value: "",
              type: templateData[i].properties[p].type,
              id: templateData[i].properties[p]._id,
            });
            setExtractedDataProps(dynamicField);
          }
        }
      }
      if (e.target.value === "none") setExtractedDataProps(null);
    }
  };

  const handleTemplateChange = (e) => {
    setExtractedDataProps(null);
    //console.log(e.target.value, " template change");
    if (e.target.value === "new") handleNewTemplateModalOpen();
    setTemplate(e.target.value);
    if (e.target.value === "default") {
      handleSetProperties(defaultTemplates.properties);
    }
  };

  let handleNewTemplateModalOpen = () => {
    setNewTemplateModalShow(true);
  };

  const handleTemplatePropertyChange = (index, e) => {
    let data = [...properties];

    data[index].value = e.target.value;
    setProperties(data);
  };

  let handlePropertyChange = (index, event) => {
    let data = [...properties];
    data[index][event.target.name] = event.target.value;
    setProperties(data);
  };

  let handleRemoveProperty = (e, index) => {
    e.preventDefault();
    let data = [...properties];
    data.splice(index, 1);
    setProperties(data);
  };

  let handleAddProperty = (e) => {
    e.preventDefault();
    let newData = { key: "", value: "" };
    setProperties([...properties, newData]);
  };

  return (
    <div>
      <div>
        <label>Templates</label>
        <small style={{ marginLeft: "5px" }}>(optional)</small>
      </div>
      <div className="w-100 position-relative mb-4">
        <select
          name="templates"
          id="selectTemplate"
          className="templatesSelect"
          placeholder="Select a Template"
          onChange={handleTemplateChange}
          value={template}
        >
          <option value="default">Default</option>
          <option value="none">None</option>
          <option value="saved">Saved</option>
          <option value="standard">Standard</option>
          <option value="new">Create New</option>
        </select>
        {template === "default" ? (
          defaultTemplates !== null ? (
            <div className="w-100 my-3 row no-gutters justify-content-md-between">
              <div className="filter-widget col-12">
                <input
                  name={defaultTemplates.name}
                  type="text"
                  placeholder={defaultTemplates.name}
                  required
                  value={defaultTemplates.name}
                  className="newNftProps"
                  disabled
                  style={{
                    color: "#696969",
                    borderColor: "#626262",
                  }}
                />
              </div>
              {defaultTemplates.properties.map((p, index) => (
                <div className="col-12 col-md-5" key={index}>
                  <div className="w-100">
                    <label>{p.key}</label>
                    {p.type === "string" ? (
                      <div className="filter-widget">
                        <input
                          name={p.key}
                          type="text"
                          placeholder="value"
                          required
                          value={properties[index].value}
                          className="newNftProps"
                          onChange={(e) =>
                            handleTemplatePropertyChange(index, e)
                          }
                        />
                      </div>
                    ) : p.type === "number" ? (
                      <div className="filter-widget">
                        <input
                          name={p.key}
                          type="number"
                          placeholder="0"
                          required
                          className="newNftProps"
                          onChange={(e) =>
                            handleTemplatePropertyChange(index, e)
                          }
                        />
                      </div>
                    ) : (
                      <div className="filter-widget">
                        <input
                          name={p.key}
                          type="radio"
                          id="templateYes"
                          required
                          value={true}
                          className="newNftProps"
                          style={{
                            width: "auto",
                            margin: "0.5rem",
                          }}
                          onChange={(e) =>
                            handleTemplatePropertyChange(index, e)
                          }
                        />
                        <label
                          for="templateYes"
                          style={{
                            width: "calc(100% - 55px)",
                            fontFamily: "inter",
                            fontWeight: "normal",
                          }}
                        >
                          Yes
                        </label>
                        <input
                          name={p.key}
                          type="radio"
                          id="templateNo"
                          required
                          value={false}
                          className="newNftProps"
                          style={{
                            width: "auto",
                            margin: "0.5rem",
                          }}
                          onChange={(e) =>
                            handleTemplatePropertyChange(index, e)
                          }
                        />
                        <label
                          for="templateNo"
                          style={{
                            width: "calc(100% - 55px)",
                            fontFamily: "inter",
                            fontWeight: "normal",
                          }}
                        >
                          No
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 mb-4">
              <div
                className="alert alert-info"
                role="alert"
                style={{ fontFamily: "inter" }}
              >
                You have not set Default Template
              </div>
            </div>
          )
        ) : template === "none" ? (
          <div className="w-100 my-3">
            {properties.map((property, index) => {
              return (
                <div key={index}>
                  <div className="row no-gutters justify-content-md-between align-items-center">
                    <div className="col-12 col-md-5">
                      <div className="form-group w-100">
                        <label>Key</label>
                        <div className="filter-widget">
                          <input
                            name="key"
                            type="text"
                            placeholder="Enter key of the property"
                            required
                            value={property.key}
                            className="newNftProps"
                            onChange={(e) => handlePropertyChange(index, e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-5">
                      <div className="form-group w-100">
                        <label>Value</label>
                        <div className="filter-widget">
                          <input
                            name="value"
                            type="text"
                            placeholder="Enter Value of the property"
                            required
                            value={property.value}
                            className="newNftProps"
                            onChange={(e) => handlePropertyChange(index, e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-auto text-right">
                      <div className="form-group">
                        <label>Action</label>
                        <div className="filter-widget">
                          <Tooltip
                            title={
                              <Typography fontSize={16}>
                                Remove a property
                              </Typography>
                            }
                            placement="bottom"
                          >
                            <button
                              className="btn btn-submit btn-lg propsActionBtn"
                              onClick={(e) => handleRemoveProperty(e, index)}
                            >
                              -
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="row no-gutters align-items-center justify-content-end">
              <div className="col-auto">
                <Tooltip
                  title={<Typography fontSize={16}>Add a property </Typography>}
                  placement="right"
                >
                  <button
                    className="btn btn-submit btn-lg propsActionBtn mb-4"
                    onClick={(e) => handleAddProperty(e)}
                  >
                    +
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        ) : template === "saved" ? (
          templateData !== null ? (
            <div className="w-100 my-3">
              <select
                name="savedTemplate"
                id="savedTemplate"
                className="templatesSelect"
                onChange={handleSelectTemplate}
              >
                <option value="none" defaultValue>
                  None
                </option>
                {templateData.map((data, index) => (
                  <option value={data.name} id={data.id} key={index + 100}>
                    {data.name}
                  </option>
                ))}
              </select>
              <div className="w-100 my-3 row no-gutters justify-content-md-between">
                {extractedDataProps !== null ? (
                  extractedDataProps.map((p, index) => (
                    <div className="col-12 col-md-5" key={index + 200}>
                      <div className="w-100">
                        <label>{p.key}</label>
                        {p.type === "string" ? (
                          <div className="filter-widget">
                            <input
                              name={p.key}
                              type="text"
                              placeholder="value"
                              required
                              value={properties[index].value}
                              className="newNftProps"
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                          </div>
                        ) : p.type === "number" ? (
                          <div className="filter-widget">
                            <input
                              name={p.key}
                              type="number"
                              placeholder="0"
                              required
                              value={properties[index].value}
                              className="newNftProps"
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                          </div>
                        ) : (
                          <div className="filter-widget">
                            <input
                              name={p.key}
                              type="radio"
                              id="savedTemplateYes"
                              required
                              value={true}
                              style={{
                                width: "auto",
                                margin: "0.5rem",
                              }}
                              className="newNftProps"
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                            <label
                              for="savedTemplateYes"
                              style={{
                                width: "calc(100% - 55px)",
                                fontFamily: "inter",
                                fontWeight: "normal",
                              }}
                            >
                              Yes
                            </label>
                            <input
                              name={p.key}
                              type="radio"
                              id="savedTemplateNo"
                              required
                              value={false}
                              className="newNftProps"
                              style={{
                                width: "auto",
                                margin: "0.5rem",
                              }}
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                            <label
                              for="savedTemplateNo"
                              style={{
                                width: "calc(100% - 55px)",
                                fontFamily: "inter",
                                fontWeight: "normal",
                              }}
                            >
                              No
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-2 mb-4 w-100">
                    <div
                      className="alert alert-info"
                      role="alert"
                      style={{ fontFamily: "inter" }}
                    >
                      There are no Properties in this Template
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-2 mb-4">
              <div
                className="alert alert-info"
                role="alert"
                style={{ fontFamily: "inter" }}
              >
                You have not saved any Template
              </div>
            </div>
          )
        ) : (
          template === "standard" &&
          (standardTemplates !== null ? (
            <div className="w-100 my-3">
              <select
                name="savedTemplate"
                id="savedTemplate"
                className="templatesSelect"
                onChange={handleStandardSelectTemplate}
              >
                <option value="none" defaultValue>
                  None
                </option>
                {standardTemplates.map((data, index) => (
                  <option value={data.name} id={data.id} key={index + 300}>
                    {data.name}
                  </option>
                ))}
              </select>
              <div className="w-100 my-3 row no-gutters justify-content-md-between">
                {extractedDataProps !== null ? (
                  extractedDataProps.map((p, index) => (
                    <div className="col-12 col-md-5" key={index + 400}>
                      <div className="w-100">
                        <label>{p.key}</label>
                        {p.type === "string" ? (
                          <div className="filter-widget">
                            <input
                              name={p.key}
                              type="text"
                              placeholder="value"
                              required
                              value={properties[index].value}
                              className="newNftProps"
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                          </div>
                        ) : p.type === "number" ? (
                          <div className="filter-widget">
                            <input
                              name={p.key}
                              type="number"
                              placeholder="0"
                              required
                              value={properties[index].value}
                              className="newNftProps"
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                          </div>
                        ) : (
                          <div className="filter-widget">
                            <input
                              name={p.key}
                              type="radio"
                              id="standardTemplateYes"
                              required
                              value={true}
                              className="newNftProps"
                              style={{
                                width: "auto",
                                margin: "0.5rem",
                              }}
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                            <label
                              for="standardTemplateYes"
                              style={{
                                width: "calc(100% - 55px)",
                                fontFamily: "inter",
                                fontWeight: "normal",
                              }}
                            >
                              Yes
                            </label>
                            <input
                              name={p.key}
                              type="radio"
                              id="standardTemplateNo"
                              required
                              value={false}
                              className="newNftProps"
                              style={{
                                width: "auto",
                                margin: "0.5rem",
                              }}
                              onChange={(e) =>
                                handleTemplatePropertyChange(index, e)
                              }
                            />
                            <label
                              for="standardTemplateNo"
                              style={{
                                width: "calc(100% - 55px)",
                                fontFamily: "inter",
                                fontWeight: "normal",
                              }}
                            >
                              No
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-2 mb-4 w-100">
                    <div
                      className="alert alert-info"
                      role="alert"
                      style={{ fontFamily: "inter" }}
                    >
                      There are no Properties in this Template
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-2 mb-4">
              <div
                className="alert alert-info"
                role="alert"
                style={{ fontFamily: "inter" }}
              >
                Standard Properties not set
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewNftTemplates;
