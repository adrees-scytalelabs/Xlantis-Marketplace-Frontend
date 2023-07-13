import { create } from 'ipfs-http-client';

const projectId = '2EPV5Le3s2sosAm3u7pJekyoE0u'; 
const projectSecret = '238f5ea43aed9bd06186f54036a4e502'; 

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
   host: 'ipfs.infura.io',
   port: '5001',
   protocol: 'https',
   headers: {
       authorization: auth,
   },
});

export default ipfs;