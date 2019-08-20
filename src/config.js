module.exports = {
  api: {
    orderRequest: {
      requestCode: '5POrdReq',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V1/OrderRequest'
    },
    orderStatus: {
      requestCode: '5POrdStatus',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/OrderStatus'
    },
    userLogin: {
      requestCode: '5PLoginV2',
      url:
        'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V2/LoginRequestMobileNewbyEmail'
    },
    userMargin: {
      requestCode: '5PMarginV3',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V3/Margin'
    },
    userOrderBook: {
      requestCode: '5POrdBkV2',
      url: 'https://openapi.5paisa.com/VendorsAPI/Service1.svc/V2/OrderBook'
    },
    userPositions: {
      requestCode: '5PNPNWV1',
      url:
        'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V1/NetPositionNetWise'
    }
  },
  auth: {
    cookie: ''
  },
  clientCode: '',
  incrementalOrderId: 101,
  isLogged: false,
  lastRemoteOrderID: '',
  lastExchOrderID: 0,
  lastTradedQty: 0
}
