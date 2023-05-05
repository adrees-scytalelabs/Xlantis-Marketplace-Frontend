import React from 'react'
import { Col, Row, Table } from "react-bootstrap";
import ReactTooltip from "react-tooltip";


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
        { isSold=== false &&
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
                {isSold ===
                true ? (
                <ReactTooltip
                    id="registerTip"
                    place="top"
                    effect="solid"
                >
                    NFT Is Sold
                </ReactTooltip>
                ) : new Date() < new Date(startTime) ? (
                <ReactTooltip
                    id="registerTip"
                    place="top"
                    effect="solid"
                    style={{ color: "white" }}
                >
                    Sale Has Not Started Yet
                </ReactTooltip>
                ) : new Date() > new Date(endTime) ? (
                <ReactTooltip
                    id="registerTip"
                    place="top"
                    effect="solid"
                >
                    Sale Has Ended
                </ReactTooltip>
                ) : null}
            </div>
            </Col>
        </Row>
        )}
    </div>
  )
}

export default BuyButton