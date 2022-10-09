import React, { useEffect } from 'react';

const MarketPlace = (props) => {

    useEffect(() => {
        props.setActiveTab({
            dashboard: "",
            totalUserAccount: "",
            pendingUserAccount: "",
            newCube: "",
            myNFTs: "",
            newCollection: "",
            mySeason: "",
            tradeListOrders: "",
            myDrops: "",
            myCubes: "",
            referralEarnings: "",
            disputedOrders: "",
            resolvedDisputedOrders: "",
            settings: "",
            changePassword: "",
            newRandomDrop: "",
            marketPlace: "active"
        });// eslint-disable-next-line
    }, []);
    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Market Palce</li>
            </ul>
        </div >
    );
}
 
export default MarketPlace;