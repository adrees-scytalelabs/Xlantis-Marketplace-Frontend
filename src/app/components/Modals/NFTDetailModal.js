import { Button, CardContent, CardMedia, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Modal, Row, Table } from 'react-bootstrap';
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import TypographyText from '../TypographyText/TypographyTextText';

const useStyles = makeStyles(() => ({
    media: {
        height: 0,
        paddingTop: '60%',
    }
}))

const NFTDetailModal = (props) => {
    const classes = useStyles();

    useEffect(() => {
       // console.log("NFT detail props are: ", props);
        // if (props.nftDetail.properties.length > 0 ) {
        //     setIsProperties(true);
        // }
        // console.log("Properties object is: ", props.nftDetail.properties);
        // let keys = Object.keys(props.nftDetail.properties);
        // console.log("Keys are: ", keys);
    },[props.show])

    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg" >
            <Modal.Header closeButton>
                <Modal.Title>{ props.nftDetail.title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <div style={{display: 'flex',margin: "10px", justifyContent: 'center', alignItems: 'center'}} >
                        {props.nftDetail.previewImageURI !== "" ? (
                            (props.nftDetail.nftFormat === "mp3" ) ? (
                            <div>
                                <AudioPlayer
                                    style={{ width: "420px",  borderRadius: "1rem" }}
                                    // style={{ borderRadius: "1rem" }}
                                    autoPlay = {false}
                                    layout="horizontal"
                                    src={props.nftDetail.nftURI}
                                    onPlay={(e) =>
                                    console.log("nft uri ", props.nftDetail.nftURI) }
                                    showSkipControls={false}
                                    showJumpControls={false}
                                    header={`Now playing: ${props.nftDetail.title}`}
                                    showDownloadProgress
                                    // onClickPrevious={handleClickPrevious}
                                    // onClickNext={handleClickNext}
                                    // onEnded={handleClickNext}
                                    // other props here
                                />
                            </div>) : (
                            
                            <GLTFModel src={props.nftDetail.nftURI} width={250} height={250} >
                                <AmbientLight color={0xffffff} />
                                <AmbientLight color={0xffffff} />
                                <AmbientLight color={0xffffff} />
                                <AmbientLight color={0xffffff} />
                                {/* <AmbientLight color={0xffffff} />
                                <AmbientLight color={0xffffff} />
                                <AmbientLight color={0xffffff} /> */}
                                <DirectionLight
                                    color={0xffffff}
                                    position={{ x: 100, y: 200, z: 100 }}
                                />
                                <DirectionLight
                                    color={0xffffff}
                                    position={{ x: 50, y: 200, z: 100 }}
                                />
                                <DirectionLight
                                    color={0xffffff}
                                    position={{ x: 0, y: 0, z: 0 }}
                                />
                                <DirectionLight
                                    color={0xffffff}
                                    position={{ x: 0, y: 100, z: 200 }}
                                />
                                <DirectionLight
                                    color={0xffffff}
                                    position={{ x: -100, y: 200, z: -100}}
                                />
                            </GLTFModel>
                        )) : (null)}
                    </div>
                    <Row>
                        <Col>
                            <Paper elevation={10} >
                                <CardMedia
                                    variant="outlined" style={{ height: "100%", border: props.nftDetail.rarity === "Mastercraft" ? '4px solid #ff0000' : props.nftDetail.rarity === "Legendary" ? '4px solid #FFD700' : props.nftDetail.rarity === "Epic" ? '4px solid #9400D3' : props.nftDetail.rarity === "Rare" ? '4px solid #0000FF' : props.nftDetail.rarity === "Uncommon" ? '4px solid #008000' : props.nftDetail.rarity === "Common" ? '4px solid #FFFFFF' : 'none' }}
                                    className={classes.media}
                                    image={props.nftDetail.previewImageURI === "" ? props.nftDetail.nftURI : props.nftDetail.previewImageURI}
                                    title="NFT Image"
                                />
                            </Paper>
                        </Col>
                        <Col>
                            <CardContent>
                                <Row style={{marginBottom:"5px"}} >
                                    <Col>
                                        <TypographyText key = "Description: " component="p" variant="body2" isSpan = {false}></TypographyText>
                                        
                                    </Col>
                                    <Col style={{justifyContent:'right'}}>
                                        <TypographyText key = {props.nftDetail.description} component="p" variant="body2" isSpan = {false}></TypographyText>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:"5px"}} >
                                    <Col>
                                        <TypographyText key = "Rarity: " component="p" variant="body2" isSpan = {false}></TypographyText>
                                    </Col>
                                    <Col>
                                        <TypographyText key = {props.nftDetail.rarity} component="p" variant="body2" isSpan = {false}></TypographyText>   
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:"5px"}} >
                                    <Col>
                                        <TypographyText key = "Token Supply: " component="p" variant="body2" isSpan = {false}></TypographyText>
                                    </Col>
                                    <Col className='align-self-end'>
                                        <TypographyText key = {props.nftDetail.tokensupply} component="p" variant="body2" isSpan = {false}></TypographyText>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:"5px"}} >
                                    <Col>
                                        <TypographyText key = "Collection: " component="p" variant="body2" isSpan = {false}></TypographyText>
                                    </Col>
                                    <Col>
                                        <TypographyText key = {props.nftDetail.collectiontitle} component="p" variant="body2" isSpan = {false}></TypographyText>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TypographyText key = "Properties: " component="p" variant="body2" isSpan = {false}></TypographyText>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Table striped bordered hover >
                                            <thead>
                                                <tr>
                                                    <th>Key</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.nftDetail.properties?.map((i, index) => (
                                                    <tr key={index}>
                                                        <td>{i.key}</td>
                                                        <td>{i.value}</td>
                                                    </tr>
                                                ))
                                                }   
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Col>
                    </Row>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleEdit} >
                    Edit Details
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default NFTDetailModal;