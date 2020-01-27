var Branding = {

  getCurrent: function() {

    // read the branding value from the cookie
    return Cookie.read('brand');
  },

  apply: function() {

    var brand = Branding.getCurrent();

    // if the cookie doesn't exist, bail
    if (!brand) {
      return;
    }

    // add the body class for the brand
    document.body.classList.add('brand-' + brand);
  },
};
