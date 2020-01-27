// make the brand logo data available to Vue
Vue.prototype.brandLogos = window.brandLogos;

// make other libraries available to Vue
Vue.prototype.Branding = Branding;

Masthead = {

  component: null,

  render: function() {

    Masthead.component = new Vue({
      el: '.masthead',
      data: function() {
        return {
          brand: null,
        }
      },
      methods: {
        getLogoURL: function() {

          if (!this.brand) {
            return brandLogos.default;
          } else {
            return brandLogos[this.brand];
          }
        }
      },
      mounted: function() {
        this.brand = Branding.getCurrent();
      }
    });
  }
};
