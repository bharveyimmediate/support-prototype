/**
 * Read and write cookies
 *
 * @type {Object}
 */
Cookie = {

  /**
   * Read a cookie
   *
   * @param  {String} name The unique identifier of the cookie
   * @return {Mixed}       Returns the value of the cookie if it exists, or
   * null if it doesn't
   */
  read: function(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    return parts.length == 2 ? parts.pop().split(";").shift() : null;
  },

  /**
   * Write a cookie
   *
   * @param  {String} key   The unique identifier of the cookie
   * @param  {Mixed} value  The value to be stored as a cookie. Will always be
   * cast to a string by the browser
   * @return {void}
   */
  write: function(key, value) {
    document.cookie = "" + key + "=" + value + ";path=/";
  },

};
