// SDK 51: configuração legada android.config.googleMaps.apiKey (sem gravar segredos no Git).
module.exports = ({ config }) => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  return {
    ...config,
    android: {
      ...config.android,
      ...(key ? { config: { ...config.android?.config, googleMaps: { apiKey: key } } } : {}),
    },
  };
};
