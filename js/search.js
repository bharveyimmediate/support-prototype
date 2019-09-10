var Search = function() {

  this.component = document.querySelector('.component-search');

  // bail if the component isn't on the page
  if (!this.component) {
    return;
  }

  this.form = this.component.querySelector('form');
  this.resultsContainer = this.component.querySelector('.search-results');

  // build the index
  this.idx = lunr(function () {
    this.ref('title');
    this.field('title');
    this.field('content');

    window.posts.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  // bind the form submit event to a handler that submits the query
  const handleSubmit = (event) => {
    event.preventDefault();

    const query = this.form.elements.query.value;

    this.fetch(query);
  };

  this.form.addEventListener('submit', handleSubmit);

  // clear the search results container and render the new results whenever a query is performed
  this.Events.bindEvent('resultsfetched', response => {
    this.clear();
    this.render(response);
  });

  this.boosted = [
    'subscription',
    'download',
    'downloaded',
    'won\'t',
    'can\'t'
  ];
};

Search.prototype.Events = {
  sendEvent: function(name, value) {
    document.dispatchEvent(new CustomEvent(name, { detail: value }));
  },
  bindEvent: function(name, cb) {
    document.addEventListener(name, event => cb(event.detail));
  },
};

Search.prototype.clear = function() {
  this.resultsContainer.innerHTML = '';
};

Search.prototype.render = function(data) {

  // render the number of results found
  this.resultsContainer.innerHTML += '<p class="search-results-count">' + data.length + ' results found</p>';

  // re-sort the posts so the most popular ones are at the top
  window.posts.sort(function(a,b) {
    return a.popular === true && -1 || b.popular === true && 1 || 0;
  });

  // loop through the global list of posts
  window.posts.forEach(post => {

    // if the post is included in the results
    if (data.some(result => result.ref === post.title)) {

      // render the result
      this.resultsContainer.innerHTML += "\
        <a href=\"" + post.url + "\">\
          <article class=\"search-result\">\
            <header>" + post.title + "</header>\
          </article>\
        </a>\
        <hr />";
    }
  });
};

Search.prototype.fetch = function(phrase) {

  // boost words within the query
  var query = phrase.toLowerCase().split(' ').map(w => this.boosted.indexOf(w) > -1 ? w + '^10' : w).join(' ');

  const results = this.idx.search(query);

  // trigger an event to state that data has been fetched
  this.Events.sendEvent('resultsfetched', results);
};

new Search();
