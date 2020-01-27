var Branding = {

  apply: function() {

    // read the branding value from the cookie
    var brand = Cookie.read('brand');

    // if the cookie doesn't exist, bail
    if (!brand) {
      return;
    }

    // add the body class for the brand
    document.body.classList.add('brand-' + brand);
  },
};
