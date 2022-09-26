import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const ChangeCollectionConfirmationModal = (props) => {

    let [collection, setCollection] = useState({});
    let [collections, setCollections] = useState([]);
    let [collectionName, setCollectionName] = useState("");

    useEffect(() => {
        setCollections(props.collectionDetails);
        // let collectionList = [...props.collectionDetails];
        // collectionList.splice(0, 1);
        // setCollections(collectionList);
    })

    return ( 
        <Modal show={props.show} onHide={props.handleClose} >
            <Modal.Header closeButton>
                <Modal.Title> Change Collection? </Modal.Title>
            </Modal.Header>
            {/* <Modal.Body className="text-center"> <i className="fas fa-times-circle fa-10x"></i></Modal.Body> */}
            <Modal.Body>Are you sure you want to change <strong>Collection?</strong></Modal.Body>
            <Modal.Body>It will change collection among all <strong>NFTs.</strong></Modal.Body>
            <Modal.Body>
                <div className="form-group">
                    <label>Select Collection</label>
                    <div className="filter-widget">
                        <Autocomplete
                            id="combo-dox-demo"
                            options={collections}
                            // disabled={isDisabledImporter}
                            getOptionLabel={(option) =>
                                option.name
                            }
                            onChange={(event, value) => {
                                if (value == null) setCollectionName("");
                                else {
                                        console.log(value);
                                        setCollectionName(value.name);
                                        setCollection(value);
                                        console.log("Value: ", value);
                                    }
                                }
                            }
                            inputValue = {collectionName}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Collections"
                                    variant="outlined"
                                />
                            )}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose} >
                    Cancle
                </Button>
                <button type='button' className="btn btn-submit" onClick={() => props.updateChangeCollection(collection)} >
                    Change
                </button>
            </Modal.Footer>
        </Modal>
        
    );
}
 
export default ChangeCollectionConfirmationModal;