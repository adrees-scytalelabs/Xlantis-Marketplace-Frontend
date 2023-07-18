import { Tooltip } from '@mui/material';
import React from 'react';
import { Col, Row } from "react-bootstrap";


function BuyButton({
    isSold,
    startTime,
    endTime,
    versionB,
    handleOpenModal,
    handleBuy,

}) {
    return (
        <div>
            {isSold === false &&
                new Date() >= new Date(startTime) &&
                new Date() < new Date(endTime) ? (
                <Row>
                    <Col
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                versionB === "v1-sso"
                                    ? handleOpenModal(e)
                                    : handleBuy(e);
                            }}
                            className="bidBtn"
                        >
                            Buy
                        </button>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <div data-tip data-for="registerTip">
                            <Tooltip title={isSold ===
                                true ? "NFT Is Sold" : new Date() < new Date(startTime) ? "Sale Has Not Started Yet" : new Date() > new Date(endTime) ? "Sale Has Ended" : null} placement="top" arrow>
                                <button
                                    type="button"
                                    data-tip
                                    data-for="registerTip"
                                    disabled
                                    onClick={(e) => handleBuy(e)}
                                    className="bidBtn"
                                >
                                    Buy
                                </button>
                            </Tooltip>

                        </div>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default BuyButton