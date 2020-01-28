Accessibility = {

  themes: [
    'default',
    'blackyellow',
    'blackcreme'
  ],

  cookieName: 'accessibility-theme',

  themeSelector: null,

  formatThemeName: function(name) {
    return 'theme-' + name;
  },

  removeThemes: function() {

    Accessibility.themes.forEach(function(name) {
      document.body.classList.remove(Accessibility.formatThemeName(name));
    });
  },

  applyTheme: function(name) {

    if (!name) {
      return;
    }

    Accessibility.removeThemes();

    // body class
    document.body.classList.add(Accessibility.formatThemeName(name));

    // cookie
    Cookie.write(Accessibility.cookieName, name);
  },

  readTheme: function() {

  },

  handlers: {
    handleThemeSelection: function(event) {

      var themeName = event.target.value;

      Accessibility.applyTheme(themeName);
    },
  },

  init: function() {

    var previouslyAppliedTheme = Cookie.read(Accessibility.cookieName);

    Accessibility.applyTheme(previouslyAppliedTheme);

    Accessibility.themeSelector = document.querySelector('.accessibility-controls__theme-selector');
    Accessibility.themeSelector.addEventListener('change', Accessibility.handlers.handleThemeSelection);

    Accessibility.themeSelector.value = previouslyAppliedTheme;
  }
};
