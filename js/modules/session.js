/**
 * Session management
 *
 * Manage client side variables, stored as cookies
 *
 * @param       {Object} opts New session data
 * @constructor
 */
function Session(opts) {

  if (!opts) {
    opts = {};
  }

  // fetch existing values stored earlier in the session
  this.sync();

  // update the session values with new data, if any new data is provided
  this.platform = opts.platform || this.platform;
  this.device = opts.device || this.device;
  this.appversion = opts.appversion || this.appversion;
  this.subscriptionstatus = opts.subscriptionstatus || this.subscriptionstatus;
  this.subscriberid = opts.subscriberid || this.subscriberid;
  this.purchasemethod = opts.purchasemethod || this.purchasemethod;
  this.brand = opts.brand || this.brand;
  this.osversion = opts.osversion || this.osversion;

  // save the session data
  this.save();
}

/**
 * Retrieve all of the variable values used by this application
 *
 * @return {Object}
 */
Session.prototype.getData = function() {

  return {
    platform: this.platform,
    device: this.device,
    appversion: this.appversion,
    subscriptionstatus: this.subscriptionstatus,
    subscriberid: this.subscriberid,
    purchasemethod: this.purchasemethod,
    brand: this.brand,
    osversion: this.osversion,
  }
};

/**
 * Variables used in this application
 *
 * @type {Array}
 */
Session.prototype.allowedVariables = [
  'platform',
  'device',
  'appversion',
  'subscriptionstatus',
  'subscriberid',
  'purchasemethod',
  'brand',
  'osversion',
];

/**
 * Save session variable values as cookies
 *
 * Depends on the Cookie and Party modules
 *
 * Triggers a 'sessionsaved' event on completion
 *
 * @return {void}
 */
Session.prototype.save = function() {

  var that = this;

  this.allowedVariables.forEach(function(paramName) {

    // only save the value if it's not null, to avoid data being wiped out
    // when no url params are present
    if (that[paramName] !== null) {
      Cookie.write(paramName, that[paramName]);
    }
  });

  Party.sendEvent('sessionsaved', this.getData());
};

/**
 * Retrieve values from cookies and store against the instance
 *
 * Triggers a 'sessionsynced' event on completion
 *
 * @return {void}
 */
Session.prototype.sync = function() {

  var that = this;

  this.allowedVariables.forEach(function(paramName) {
    var cookieValue = Cookie.read(paramName);

    if (cookieValue !== null) {
      that[paramName] = cookieValue;
    }
  });

  Party.sendEvent('sessionsynced', this.getData());
};
