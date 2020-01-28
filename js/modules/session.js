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

  this.platform = opts.platform || null;
  this.device = opts.device || null;
  this.appversion = opts.appversion || null;
  this.subscriptionstatus = opts.subscriptionstatus || null;
  this.subscriberid = opts.subscriberid || null;
  this.purchasemethod = opts.purchasemethod || null;
  this.brand = opts.brand || null;
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
    that[paramName] = Cookie.read(paramName);
  });

  Party.sendEvent('sessionsynced', this.getData());
};
