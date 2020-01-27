Cookie = {

  read: function(name) {

    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    return parts.length == 2 ? parts.pop().split(";").shift() : null;
  },

  write: function(key, value) {

    if (value !== null) {
      document.cookie = "" + key + "=" + value + ";path=/";
    }
  },

};
