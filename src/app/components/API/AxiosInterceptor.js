import axios from "axios";
import { getAuthorizationSession } from "../Utils/sessions";
export const Axios = axios.create({
  baseURL: `https://raindrop-backend.herokuapp.com/`,
  // baseURL: `http://localhost:3000`,
});

//SETTING HEADER

Axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${getAuthorizationSession()}`;

//POST REQUESTS

export const userLoginThroughWallet = (body) => {
  return Axios.post(`/v2-wallet-login/user/auth/login`, body);
};

export const adminLoginThroughWallet = (body) => {
  return Axios.post(`/v2-wallet-login/user/auth/admin-login`, body);
};

export const adminLoginThroughSSO = (body) => {
  return Axios.post(`/v1-sso/user/auth/admin-login`, body);
};

export const superAdminLoginThroughSSO = (body) => {
  return Axios.post(`/v1-sso/user/auth/super-admin-login`, body);
};

export const userLoginThroughSSO = (body) => {
  return Axios.post(`/v1-sso/user/auth/user-login`, body);
};

export const uploadToS3 = (body) => {
  return Axios.post(`/upload/uploadtos3`, body);
};

export const uploadImage = (body) => {
  return Axios.post(`/upload/image`, body);
};

export const createNewAdminTemplates = (body) => {
  return Axios.post(`/nft-properties/admin/template`, body);
};

export const createNewSuperAdminTemplates = (body) => {
  return Axios.post(`/super-admin/template`, body);
};

export const topUpAmount = (body) => {
  return Axios.post(`/top-up/`, body);
};

export const createNewDrop = (body) => {
  return Axios.post(`/drop/`, body);
};

export const finalizeDrop = (body) => {
  return Axios.post(`/drop/finalize`, body);
};

export const sendBidData = (body) => {
  return Axios.post(`/auction/bid`, body);
};

export const sendBidDataVersioned = (version, body) => {
  return Axios.post(`/${version}/auction/bid`, body);
};

export const marketplaceBuyVersioned = (version, body) => {
  return Axios.post(`/${version}/order-listing/buy`, body);
};

export const marketplaceBuy = (body) => {
  return Axios.post(`/order-listing/buy`, body);
};

export const acceptAuctionBid = (body) => {
  return Axios.post(`/auction/bid/accept`, body);
};

export const createNewCollection = (body) => {
  return Axios.post(`/collection/`, body);
};

export const createNewBatch = (body) => {
  return Axios.post(`/batch-mint/`, body);
};

export const addNFTToBatch = (body) => {
  return Axios.post(`/batch-mint/nft`, body);
};

export const lazyMintNFTs = (body) => {
  return Axios.post(`/lazy-mint/NFT`, body);
};

export const createCollection = (body) => {
  return Axios.post(`/collection/createcollection`, body);
};

export const confirmUserPhoneNumber = (body) => {
  return Axios.post(`/api/v1/auth/user/confirmphonenumber`, body);
};

export const resendVerificationCode = (body) => {
  return Axios.post(`/api/v1/auth/user/resendverificationcode`, body);
};

export const userSignUp = (body) => {
  return Axios.post(`/v1-sso/user/auth/signup`, body);
};

export const setSuperAdminPlatformFee = (body) => {
  return Axios.post(`/platform-fee/super-admin`, body);
};

//PUT REQUESTS

export const superAdminTemplateUpdate = (body) => {
  return Axios.put(`/super-admin/template`, body);
};

export const updateDropStatus = (body) => {
  return Axios.put(`/drop/status/pending`, body);
};

export const updateDropTxHash = (body) => {
  return Axios.put(`/drop/txHash`, body);
};

export const addNFTToDrop = (body) => {
  return Axios.put(`/drop/nft`, body);
};

export const finalizeAuctionBid = (body) => {
  return Axios.put(`/auction/bid/finalize`, body);
};

export const approveCollection = (body) => {
  return Axios.put(`/collection/approve`, body);
};

export const mintBatchNFTs = (batchId, body) => {
  return Axios.put(`/batch-mint/minted/${batchId}`, body);
};

export const updateCollectionIdInBatch = (body) => {
  return Axios.put(`/batch-mint/collection`, body);
};

export const updateNFT = (nftId, body) => {
  return Axios.put(`/nft/${nftId}`, body);
};

export const updateUserProfileVersioned = (version, body) => {
  return Axios.put(`${version}/user/profile`, body);
};

export const updateAdminProfileSSO = (body) => {
  return Axios.put(`/v1-sso/user/admin/update-info`, body);
};

export const adminLoginAddInfoUsingRoute = (route, inputs, config) => {
  return Axios.put(route, inputs, config);
};

export const updateCollectionTxHash = (collectionId, body) => {
  return Axios.put(`/collection/txHash/${collectionId}`, body);
};

//PATCH REQUESTS

export const readNotifications = (body) => {
  return Axios.patch(`/notifications/hide`, body);
};

export const verifyAdminV1 = (body) => {
  return Axios.patch(`/super-admin/admin/verify?userType=v1`, body);
};

export const verifyAdminV2 = (body) => {
  return Axios.patch(`/super-admin/admin/verify?userType=v2`, body);
};

export const disbaleAdminV1 = (body) => {
  return Axios.patch(`/super-admin/disable?userType=v1`, body);
};

export const disbaleAdminV2 = (body) => {
  return Axios.patch(`/super-admin/disable?userType=v2`, body);
};

export const enableAdminV1 = (body) => {
  return Axios.patch(`/super-admin/enable?userType=v1`, body);
};

export const enableAdminV2 = (body) => {
  return Axios.patch(`/super-admin/enable?userType=v2`, body);
};

export const updateDropStartTime = (body) => {
  return Axios.patch(`/drop/start-time`, body);
};

export const sendVoucherForLazyMint = (body) => {
  return Axios.patch(`/lazy-mint/voucher`, body);
};

//GET REQUESTS

export const getMarketFixedPrice = (start, end, marketplaceId) => {
  return Axios.get(
    `/drop/saleType/fixed-price/${start}/${end}?marketplaceId=${marketplaceId}`
  );
};
export const getDropTxCostSummary = (dropId) => {
  return Axios.get(`/drop/${dropId}/tx-cost-summary`);
};

export const getDropTxCostSummarySSO = (dropId) => {
  return Axios.get(`/v1-sso/drop/${dropId}/tx-cost-summary`);
};

export const getBuyNFTTxCostSummarySSO = (dropId, nftId) => {
  return Axios.get(`v1-sso/marketplace/buy/tx-cost-summary/${dropId}/${nftId}`);
};

export const getBuyNFTTxCostSummary = (dropId, nftId) => {
  return Axios.get(`/marketplace/buy/tx-cost-summary/${dropId}/${nftId}`);
};

export const getNotifications = (start, end) => {
  return Axios.get(`/notifications/${start}/${end}`);
};

export const getIsAvailableTemplates = (name) => {
  return Axios.get(`/nft-properties/template/is-available/${name}`);
};

export const getCollections = (nftType, marketplaceId) => {
  return Axios.get(
    `/collection/collections/${nftType}?marketplaceId=${marketplaceId}`
  );
};

export const getNFTsThroughId = (id, marketplaceId) => {
  return Axios.get(`/nft/${id}?marketplaceId=${marketplaceId}`);
};

export const getMyNFTsPaginated = (start, end, marketPlaceId) => {
  return Axios.get(
    `/nft/myNFTs/${start}/${end}?marketplaceId=${marketPlaceId}`
  );
};

export const getSingleNFTDetail = (nftId) => {
  return Axios.get(`/nft/getSingleNFT/${nftId}`);
};
export const getTradeHistory = (nftId) => {
  return Axios.get(`/history/trade/${nftId}`);
};

export const getValidateAdminBalance = (dropId) => {
  return Axios.get(`/drop/validate-admin-balance/${dropId}`);
};

export const getNFTBidListPaginated = (nftId, start, end) => {
  return Axios.get(`/auction/bids/${nftId}/${start}/${end}`);
};

export const getDropDetails = (dropId) => {
  return Axios.get(`/drop/${dropId}`);
};

export const getNFTsFromSingleCollection = (collectionId) => {
  return Axios.get(`/collection/${collectionId}`);
};

export const getMyCollectionsPaginated = (start, end) => {
  return Axios.get(`/collection/myCollections/${start}/${end}`);
};

export const getMyCollectionsPaginatedMarketPlace = (
  start,
  end,
  marketplaceId
) => {
  return Axios.get(
    `/collection/myCollections/${start}/${end}?marketplaceId=${marketplaceId}`
  );
};

export const getAuctionAcceptBidTxSummary = () => {
  return Axios.get(`/auction/bid/accept/tx-cost-summary`);
};

export const getMyDropsPaginatedUsingStatus = (
  status,
  start,
  end,
  marketplaceId
) => {
  return Axios.get(
    `/drop/myDrops/${status}/${start}/${end}?marketplaceId=${marketplaceId}`
  );
};

export const getMyDropsPaginated = (start, end) => {
  return Axios.get(`/drop/mydrops/${start}/${end}`);
};

export const getDropsPaginated = (start, end) => {
  return Axios.get(`/drop/drops/${start}/${end}`);
};

export const getNFTsFromDropPaginated = (dropId, start, end, body) => {
  return Axios.get(`/drop/nfts/${dropId}/${start}/${end}`, body);
};

export const getNFTsFromDropPaginatedWOBody = (
  dropId,
  start,
  end,
  marketplaceId
) => {
  return Axios.get(
    `/drop/nfts/${dropId}/${start}/${end}?marketplaceId=${marketplaceId}`
  );
};

export const getNFTDetailInDrop = (nftId) => {
  return Axios.get(`/drop/nft/${nftId}`);
};

export const getNFTDetailInDropVersioned = (version, nftId) => {
  return Axios.get(`/${version}/drop/nft/${nftId}`);
};

export const getDropsInAuctionPaginated = (start, end) => {
  return Axios.get(`/drop/saleType/auction/${start}/${end}`);
};

export const getDropsInFixedPriceSalePaginated = (start, end) => {
  return Axios.get(`/drop/saleType/fixed-price/${start}/${end}`);
};

export const getSuperAdminTemplates = () => {
  return Axios.get(`/super-admin/template`);
};

export const getAdminProfileSSO = () => {
  return Axios.get(`/v1-sso/user/admin/profile`);
};

export const getUserProfileVersioned = (version) => {
  return Axios.get(`${version}/user/profile`);
};

export const getUnverifiedAdminsV1Paginated = (start, end) => {
  return Axios.get(
    `/super-admin/admins/unverified/${start}/${end}?userType=v1`
  );
};

export const getAllAdminsPaginated = (start, end, adminType) => {
  return Axios.get(`/super-admin/admins/${start}/${end}`, {
    params: {
      userType: adminType,
    },
  });
};

export const getUnverifiedAdminsV2Paginated = (start, end) => {
  return Axios.get(
    `/super-admin/admins/unverified/${start}/${end}?userType=v2`
  );
};

export const getVerifiedAdminsV1Paginated = (start, end) => {
  return Axios.get(`/super-admin/admins/verified/${start}/${end}?userType=v1`);
};

export const getVerifiedAdminsV2Paginated = (start, end) => {
  return Axios.get(`/super-admin/admins/verified/${start}/${end}?userType=v2`);
};

export const getAdminsV1Paginated = (start, end) => {
  return Axios.get(`/super-admin/admins/${start}/${end}?userType=v1`);
};

export const getAdminsV2Paginated = (start, end) => {
  return Axios.get(`/super-admin/admins/${start}/${end}?userType=v2`);
};

export const getEnabledAdminsV1 = () => {
  return Axios.get(`/super-admin/admins/enabled?userType=v1`);
};

export const getEnabledAdminsV2 = () => {
  return Axios.get(`/super-admin/admins/enabled?userType=v2`);
};

export const getDisabledAdminsV1 = () => {
  return Axios.get(`/super-admin/admins/disabled?userType=v1`);
};

export const getDisabledAdminsV2 = () => {
  return Axios.get(`/super-admin/admins/disabled?userType=v2`);
};

export const getAdminCountsV1 = () => {
  return Axios.get(`/super-admin/admins/counts?userType=v1`);
};

export const getAdminCountsV2 = () => {
  return Axios.get(`/super-admin/admins/counts?userType=v2`);
};

export const getUserEmailVerification = (email, token) => {
  return Axios.get(`/users/emailverification/${email}/${token}`);
};

export const getSuperAdminPlatformFee = () => {
  return Axios.get(`/super-admin/platform-fee`);
};

export const getAdminCountsVersioned = (version) => {
  return Axios.get(`${version}/user/getcounts`);
};

export const getSuperAdminBalance = () => {
  return Axios.get(`/super-admin/balance`);
};

export const getAdminsDefaultTemplates = () => {
  return Axios.get(`/nft-properties/admin/default`);
};

export const getStandardTemplate = (userType) => {
  return Axios.get(`/nft-properties/${userType}`);
};

export const getSavedTemplates = () => {
  return Axios.get(`/nft-properties/admin/`);
};

export const getTopUpHistoryOfAdmin = () => {
  return Axios.get(`/top-up/user/history`);
};

export const getTopUpHistoryOfUser = () => {
  return Axios.get(`/top-up/user/history`);
};

export const checkDomain = (params) => {
  return Axios.get(`/v1-sso/user/check-domain`, { params: params });
};

export const getMaticBalance = () => {
  return Axios.get(`/wallet-analytics/funds/`);
};

export const getDropCategories = () => {
  return Axios.get(`/drop/categories`);
};

export const getUserNFTS = (start, end) => {
  return Axios.get(`/nft/myNFTs/${start}/${end}`);
};

export const getMarketPlace = (start, end) => {
  return Axios.get(`/marketplace?start=0&end=100`);
};

export const getDropsByCategories = (category, start, end) => {
  return Axios.get(`/drop/category-drops/${category}`, {
    params: { start: start, end: end },
  });
};

export const getBalanceSpentHistory = () => {
  return Axios.get(`/balance-history/my-history`);
};

export const getAdminProfileDetails = () => {
  return Axios.get(`/v1-sso/user/admin/profile`);
};

export const getSuperAdminEarnings = () => {
  return Axios.get(`/earnings/super-admin`);
};

export const getAdminEarnings = () => {
  return Axios.get(`/earnings/admin`);
};

//DELETE REQUESTS

export const deleteBatch = (batchId) => {
  return Axios.delete(`/batch-mint/${batchId}`);
};

export const deleteNFTFromBatch = (nftId) => {
  return Axios.delete(`/batch-mint/nft/${nftId}`);
};

export const deleteNFTFromDrop = (nftId) => {
  return Axios.delete(`/drop/nft/${nftId}`);
};

export const deleteSuperAdminTemplate = (templateId) => {
  return Axios.delete(`/super-admin/template/${templateId}`);
};
