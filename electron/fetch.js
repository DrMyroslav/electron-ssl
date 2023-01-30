const { session, app } = require('electron');
const fetch = require('electron-fetch').default;
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { createRootCaVerifier } = require('electron-root-ssl-pinning')

const importCertificate = () => {
	return new Promise((resolve, reject) => {
		// const pathCert = path.resolve(__dirname, '../../../ssl_cert/ssl_postman/cert/client/client.pfx');
		// console.log(pathCert)
		// app.importCertificate({ 
		// 	certificate: pathCert,
		// 	password: 'test',
		// }, (result) => { 
		// 	console.log('result import => ', result);
			resolve();
		// })
	}); 
};

const getRequestOptions = async session => {
	// await importCertificate();
	const caPath = path.resolve(__dirname, '../../../ssl_cert/ssl_postman/cert/ca/CA.pem');
	// const file = fs.readFileSync(caPath);
	
	const verifier = createRootCaVerifier(caPath);
  session.setCertificateVerifyProc(async (request, callback) => {
    console.log('set certificate verify => ', request.verificationResult);
		const result = await verifier(request);
		console.log('result verifier => ', result);
		callback(0);
		// if (result === 0) {
		// 	callback(0);
		// } else {
		// 	callback(-3);
		// }
  });

  return {
    session,
  };
};

const httpFetch = async () => {
  try {
    const requestOptions = await getRequestOptions(session.defaultSession);
		console.log('http fetch =>')
		return await fetch('https://localhost:4000', requestOptions);
  } catch (error) {
    console.log('fetch main error =>', error);
  }
};

const setRequestOptions = async () => {
	try {
    const requestOptions = await getRequestOptions(session.defaultSession);
		return;
  } catch (error) {
    console.log('set request options error =>', error);
  }
};

module.exports = {
  httpFetch,
	setRequestOptions,
};
