const IPFS = require('ipfs-api');
const projectId = '2EPV5Le3s2sosAm3u7pJekyoE0u';   // <---------- your Infura Project ID

const projectSecret = '238f5ea43aed9bd06186f54036a4e502';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');


const ipfs = IPFS({
    host: 'ipfs.infura.io', port: '5001', protocol: 'https', headers: {
        authorization: auth,
    },
});
export default ipfs