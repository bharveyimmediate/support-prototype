SupportQueryDataHandler = {

  /**
   * Parse the URL query string and store the data for the session
   *
   * @return void
   */
  storeDeviceData: function() {

    // fetch the parameters passed via URL
    var urlParams = new URLSearchParams(window.location.search);

    // instantiate a new session
    var sesh = new Session({
      platform: urlParams.get('platform'),
      device: urlParams.get('device'),
      appversion: urlParams.get('appversion'),
      subscriptionstatus: urlParams.get('subscriptionstatus'),
      subscriberid: urlParams.get('subscriberid'),
      purchasemethod: urlParams.get('purchasemethod'),
    });

    // save the session data
    sesh.save();
  },

  /**
   * Fetch the stored user data so it can be used by the support form
   */
  fetchDeviceData: function() {

    var sesh = new Session();

    sesh.sync();

    return sesh;
  },
};
