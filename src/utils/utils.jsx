// export const refreshTokenSetup = (res) => {
//     // Timing to renew access token
//     let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  
//     const refreshToken = async () => {
//       const newAuthRes = await res.reloadAuthResponse();
//       refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
//       console.log('newAuthRes:', newAuthRes);
//       // saveUserToken(newAuthRes.access_token); 
//       localStorage.setItem('authToken', newAuthRes.id_token);
  
//       // Setup the other timer after the first one
//       setTimeout(refreshToken, refreshTiming);
//     };
  
//     // Setup first refresh timer
//     setTimeout(refreshToken, refreshTiming);
//   };

/**-- EMAIL VALIDATION --*/
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};