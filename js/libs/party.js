/**
 * Events management
 *
 * @type {Object}
 */
Party = {

  /**
   * Emit an event to the application
   *
   * @param  {String} name  The unique identifier of the event
   * @param  {Mixed} value Data to include with the event (optional)
   * @return {void}
   */
  sendEvent: function(name, value) {
    if (!value) value = null;
    document.dispatchEvent(new CustomEvent(name, { detail: value }));
  },

  /**
   * Bind a handler to an event
   *
   * @param  {String}   name The unique identifier of the event
   * @param  {Function} cb   The handler function
   * @return {void}
   */
  bindEvent: function(name, cb) {
    document.addEventListener(name, event => cb(event.detail));
  }
}
