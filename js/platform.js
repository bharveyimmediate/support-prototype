Platform = {

  /**
   * Have we already detected the platform?
   * @return {[type]} [description]
   */
  alreadyDetected: function() {
    return !!Number(Cookie.read('platformdetected'));
  },

  setDetected: function() {
    Cookie.write('platformdetected', 1);
  },

  detect: function() {

    // check if we need to detect, bail if we don't
    if (Platform.alreadyDetected()) {
      return;
    }

    // try and read the platform from the cookie
    var c = Cookie.read('platform');

    if (c === 'ios' || c === 'android') {
      showArticles(c);
      return;
    }

    // if there's no cookie set, ask the user which platform they'd to view articles for
    Platform.askUser();
  },

  showArticles: function() {

    // state that we've determined the platform
    Platform.setDetected();

    // TODO: work out how we want to do this

  },

  askUser: function() {

  }
};
