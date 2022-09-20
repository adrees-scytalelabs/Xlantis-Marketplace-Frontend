import { Button, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Card, Modal } from 'react-bootstrap';

const useStyles = makeStyles(() => ({
    media: {
        height: 0,
        paddingTop: '60%',
    }
}))

const NFTDetailModal = (props) => {
    const classes = useStyles();

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ props.nftDetail.title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <CardMedia
                        variant="outlined" style={{ height: "100%", border: props.nftDetail.rarity === "Mastercraft" ? '4px solid #ff0000' : props.nftDetail.rarity === "Legendary" ? '4px solid #FFD700' : props.nftDetail.rarity === "Epic" ? '4px solid #9400D3' : props.nftDetail.rarity === "Rare" ? '4px solid #0000FF' : props.nftDetail.rarity === "Uncommon" ? '4px solid #008000' : props.nftDetail.rarity === "Common" ? '4px solid #FFFFFF' : 'none' }}
                        className={classes.media}
                        image={props.nftDetail.nftImage}
                        title="NFT Image"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Description: </strong>{props.nftDetail.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Rarity: </strong>{props.nftDetail.rarity}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Token Supply: </strong>{props.nftDetail.tokensupply}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Collection: </strong>{props.nftDetail.collectiontitle}
                        </Typography>
                    </CardContent>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default NFTDetailModal;