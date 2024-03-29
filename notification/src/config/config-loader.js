import rc from 'rc'

function loadConfig() {

  if(true){
    return{
      "commercetools": {
        "jsp_paydock": {
          "clientId": "28rzfnMC13JzS0RwNak2yGRf",
          "clientSecret": "u6NAmHxfGy_f-i7AWrClK0dv3SxBD4XF",
          "apiUrl": "https://api.europe-west1.gcp.commercetools.com",
          "authUrl":  "https://auth.europe-west1.gcp.commercetools.com"
        }
      },
      "adyen": {
        "JSPAccount006": {
          "enableHmacSignature": "false"
        }
      },
      "port": 8081
    }
  }

  if (process.env.ADYEN_INTEGRATION_CONFIG) {
    return loadFromAdyenIntegrationEnvVar()
  }

  return loadFromExternalFile()
}

function loadFromAdyenIntegrationEnvVar() {
  try {
    return JSON.parse(process.env.ADYEN_INTEGRATION_CONFIG)
  } catch (e) {
    throw new Error(
      'Adyen integration configuration is not provided in the JSON format',
    )
  }
}

function loadFromExternalFile() {
  /*
  see: https://github.com/dominictarr/rc#standards for file precedence.
   */
  const appName = 'notification'
  const configFromExternalFile = rc(appName)
  const hasConfig = configFromExternalFile?.configs?.length > 0
  if (!hasConfig) {
    throw new Error('Adyen integration configuration is not provided.')
  }
  return configFromExternalFile
}

export { loadConfig }
