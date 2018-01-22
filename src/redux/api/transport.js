import axios from 'axios'
import axiosRetry from 'axios-retry'

const transport = axios.create()
transport.defaults.timeout = 10000

const retryCondition = error =>
  axiosRetry.isNetworkOrIdempotentRequestError(error) ||
  error.code === 'ECONNABORTED' // Allow retrying after timeouts

axiosRetry(transport, { retries: 3, retryCondition })

function setBaseUrl(url) {
  transport.defaults.baseURL = url
}

function getBaseUrl() {
  return transport.defaults.baseURL
}

function disableTransport() {
  const errorFunc = (...args) => {
    throw new Error(
      `Oops, you tried to make an API call: ${JSON.stringify(args)}`,
    )
  }
  transport.get = errorFunc
  transport.post = errorFunc
  transport.patch = errorFunc
  transport.delete = errorFunc
}

// TODO: Remove this separate URL when we use the API Gateway for all calls
let apiGatewayUrl
function setApiGatewayUrl(url) {
  apiGatewayUrl = url
}

function getApiGatewayUrl() {
  return apiGatewayUrl
}

function setAuthToken(token) {
  transport.defaults.headers.common.Authorization = `Bearer ${token}`
}

function useAdapter(adapter) {
  transport.defaults.adapter = adapter
}

export {
  disableTransport,
  setBaseUrl,
  getBaseUrl,
  setAuthToken,
  setApiGatewayUrl,
  getApiGatewayUrl,
  useAdapter,
}

export default transport
