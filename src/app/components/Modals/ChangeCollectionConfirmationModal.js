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
    })

    return ( 
        <Modal show={props.show} onHide={props.handleClose} size="lg" >
            <Modal.Header closeButton>
                <Modal.Title> Change Collection? </Modal.Title>
            </Modal.Header>
            <Modal.Body>It will change collection for all <strong>NFTs.</strong> Are you sure you want to change <strong>Collection?</strong></Modal.Body>
            <Modal.Body>
                <div className="form-group">
                    <label>Select Collection</label>
                    <div className="filter-widget">
                        <Autocomplete
                            id="combo-dox-demo"
                            options={collections}
                            
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
                <Button 
                    variant="primary" 
                    onClick={() => {
                        setCollection({});
                        setCollectionName("");
                        props.handleClose();
                    }} 
                >
                    Cancle
                </Button>
                <button 
                    type='button' 
                    className="btn btn-submit" 
                    onClick={() => {
                        setCollection({});
                        setCollectionName("");
                        props.updateChangeCollection(collection)
                    }} 
                >
                    Change
                </button>
            </Modal.Footer>
        </Modal>
        
    );
}
 
export default ChangeCollectionConfirmationModal;