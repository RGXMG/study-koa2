const urlParamsToJSON = urlParams => {
  if (!urlParams) return new Error('urlParamsToJSON - urlParams is empty');
  const resJSON = {};
  const everyParams = urlParams.split('&');
  for (let i of everyParams) {
    const splitByi = i.split('=');
    resJSON[splitByi[0]] = splitByi[1];
  }
  return resJSON;
};
module.exports = {
  urlParamsToJSON,
};