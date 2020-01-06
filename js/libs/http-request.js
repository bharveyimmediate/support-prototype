/**
 * HttpRequest class
 *
 * Perform an HTTP Request!
 *
 * @param  {Object} opts method, URL, data
 * @return {Promise}
 */
var HttpRequest = function(opts) {

  var that = this;

  this.method = opts.method;
  this.data = opts.data || {};
  this.url = opts.url;

  this.connection = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {

    var handleResponse = function() {
      if (that.connection.readyState === 4) {
          resolve(JSON.parse(that.connection.responseText));
      }
    };

    var handleError = function(err) {
      reject(err);
    };

    that.connection.addEventListener('load', handleResponse);
    that.connection.addEventListener('error', handleError);

    that.connection.open(that.method, that.url);

    switch (that.method) {

      case 'GET':
      case 'DELETE':
        that.connection.send();
        break;

      case 'POST':
        const params = Object.keys(that.data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(that.data[k]));
        that.connection.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        that.connection.send(params.join('&'));
        break;

      case 'PUT':
        that.connection.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        that.connection.send(JSON.stringify(that.data));
        break;
    }
  });
};
