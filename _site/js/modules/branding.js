/**
 * Handle changes to the application that are brand specific
 *
 * - Update the logo in the masthead
 * - Apply the CSS theme
 *
 * @type {Object}
 */
var Branding = {

  /**
   * Remove any branding-specific classes from the body tag
   *
   * @return {void}
   */
  clearBodyClasses: function() {
    var bodyClasses = document.body.className.split(' ');
    var regex = RegExp('^brand-');
    for (var c = 0; c < bodyClasses.length; c += 1) {
      if (regex.test(bodyClasses[c])) {
        document.body.classList.remove(bodyClasses[c]);
      }
    }
  },

  /**
   * Apply the brand-specific changes to the application
   *
   * @param  {String} brand Identifier of the brand e.g. 'gw' for Gardeners' World
   * @return {void}
   */
  apply: function(brand) {

    // if the cookie doesn't exist, bail
    if (!brand) {
      return;
    }

    // clear any previous branding classes from the body tag
    Branding.clearBodyClasses();

    // add the body class for the brand
    document.body.classList.add('brand-' + brand);

    // swap out the masthead logo for the branded version
    if (brand in window.brandLogos) {
      var mastheadLogo = document.querySelector('.masthead__logo');
      mastheadLogo.src = window.brandLogos[brand];
    }
  },

  /**
   * Handler for when the application tells this module that the branding should
   * be applied
   *
   * @param  {Object} sessionData Session variables used by the application
   * @return {void}
   */
  handleReady: function(sessionData) {

    Branding.apply(sessionData.brand);
  },

  /**
   * Initialise the module
   *
   * Binds handlers to events that are triggered by the application
   *
   * @return {void}
   */
  init: function() {
    Party.bindEvent('sessionsaved', Branding.handleReady);
    Party.bindEvent('sessionsynced', Branding.handleReady);
  }
};
