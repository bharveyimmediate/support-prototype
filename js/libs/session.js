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

Session.prototype.allowedParams = [
  'platform',
  'device',
  'appversion',
  'subscriptionstatus',
  'subscriberid',
  'purchasemethod',
  'brand',
];

Session.prototype.save = function() {

  var that = this;

  this.allowedParams.forEach(function(paramName) {
    Cookie.write(paramName, that[paramName]);
  });
};

Session.prototype.sync = function() {

  var that = this;

  this.allowedParams.forEach(function(paramName) {
    that[paramName] = Cookie.read(paramName);
  });
};
