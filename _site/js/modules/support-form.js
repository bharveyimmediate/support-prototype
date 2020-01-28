// Make the Party library available to the Vue component
Vue.prototype.Party = Party;

/**
 * Checks that a string is a valid email address
 *
 * @param  {String} email The value being tested
 * @return {Boolean}
 */
var isValidEmail = function(email) {
  return typeof email === 'string' && email.length && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Checks that a value is a string with more than one character
 *
 * @param  {String} text The value being tested
 * @return {Boolean}
 */
var isValidText = function(text) {
  return typeof text === 'string' && text.length;
};

var form = new Vue({
  el: '.form-component',
  data: function() {
    return {
      devicedatacaptured: false,
      validationErrorFieldNames: [],
      formValues: {
        name: '',
        email: '',
        platform: null,
        device: null,
        osversion: null,
        appversion: null,
        subscriptionstatus: null,
        subscriberid: null,
        purchasemethod: null,
        description: '',
        sendcopy: false,
      }
    }
  },
  methods: {

    /**
     * Validate the form to ensure required fields have suitable values
     *
     * @param  {Object} data Form field values as key -> value pairs
     * @return {Object}      Property stating if form is valid (Boolean)
     *                       Property with list of field names with errors (Array)
     */
    validate: function(formData) {

      var requiredFieldNames = ['name', 'email', 'description'];
      var fieldNamesWithErrors = [];

      if (!isValidText(formData.name)) {
        fieldNamesWithErrors.push('name');
      }

      if (!isValidEmail(formData.email)) {
        fieldNamesWithErrors.push('email');
      }

      if (!isValidText(formData.description)) {
        fieldNamesWithErrors.push('description');
      }

      return {
        isValid: !!!fieldNamesWithErrors.length,
        fieldNamesWithErrors: fieldNamesWithErrors,
      };
    },

    /**
     * Tell the application that a field has failed validation
     *
     * @param  {String} fieldName The name property of the field
     * @return {void}
     */
    validationFailField: function(fieldName) {

      var index = this.validationErrorFieldNames.indexOf(fieldName);

      if (index === -1) {
        this.validationErrorFieldNames.push(fieldName);
      }
    },

    /**
     * Tell the application that a field has passed validation
     *
     * @param  {String} fieldName The name property of the field
     * @return {void}
     */
    validationPassField: function(fieldName) {

      var index = this.validationErrorFieldNames.indexOf(fieldName);

      if (index > -1) {
        this.validationErrorFieldNames.splice(index, 1);
      }
    },

    /**
     * Handle the form being submitted
     *
     * - Check the form is valid
     * - Tell the application which fields have failed validation (if any)
     * - Perform an AJAX request to submit the form data if validation passed
     *
     * @param  {Object} event Form submit event
     * @return {void}
     */
    onSubmit: function(event) {

      var formData = this._data.formValues;
      var validation = this.validate(formData);
      var that = this;

      if (!validation.isValid) {

        // show validation errors
        validation.fieldNamesWithErrors.forEach(function(fieldName) {
          that.validationFailField(fieldName);
        });

      } else {

        // grab the target URL from the form
        var actionURL = this.$el.querySelector('form').getAttribute('action');

        // submit the form
        new HttpRequest({
          method: 'POST',
          url: actionURL,
          data: formData,
        })
        .then(function(response) {
          console.log('form submitted successfully', response);
        })
        .catch(function(err) {
          console.log('problem submitting the form', err);
        });
      }
    },

    /**
     * Pass a field if it no longer fails validation
     *
     * @param  {Object} event Field keyup event
     * @return {void}
     */
    checkFieldValid: function(event) {

      var fieldName = event.target.name;
      var fieldType = event.target.type;
      var validationFieldWasFailing = this.validationErrorFieldNames.indexOf(fieldName) > -1;

      // if this field is currently failing validation, check it again
      if (validationFieldWasFailing) {

        if ((fieldType === 'text' && isValidText(this.formValues[fieldName])) ||
            (fieldType === 'email' && isValidEmail(this.formValues[fieldName])) ||
            (fieldType === 'textarea' && isValidText(this.formValues[fieldName]))) {

          // state that the field has passed validation
          this.validationPassField(fieldName);
        }
      }
    },

    updateFromSession: function(sessionData) {

      this.formValues.platform = sessionData.platform;
      this.formValues.device = sessionData.device;
      this.formValues.osversion = sessionData.osversion;
      this.formValues.appversion = sessionData.appversion;
      this.formValues.subscriptionstatus = sessionData.subscriptionstatus;
      this.formValues.subscriberid = sessionData.subscriberid;
      this.formValues.purchasemethod = sessionData.purchasemethod;

      // state that the user's device data has been captured
      this.devicedatacaptured = true;
    },
  },

  /**
   * Vue component lifecycle method which is called when the component is created
   *
   * Fetches data captured from the device, if any is stored
   *
   * @return {void}
   */
  created: function() {

    // update when session data is available
    this.Party.bindEvent('sessionsynced', this.updateFromSession.bind(this));
    this.Party.bindEvent('sessionsaved', this.updateFromSession.bind(this));
  }
});
