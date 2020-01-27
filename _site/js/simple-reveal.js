var els = document.body.querySelectorAll('.simple-reveal');

function show(el) {
  el.classList.add('show');
}

function hide(el) {
  el.classList.remove('show');
}

function hideAll() {
  els.forEach(hide);
}

function isVisible(el) {
  return el.classList.contains('show');
}

function parentIsSimpleReveal(el) {

  if (el.parentNode.classList.contains('simple-reveal')) {
    return true;
  }

  if (el.tagName === 'BODY') {
    return false;
  }

  return parentIsSimpleReveal(el.parentNode);
}

els.forEach(function(el) {

  var btn = el.querySelector('.simple-reveal__btn');
  var closeBtn = el.querySelector('.simple-reveal__btn-close');

  btn.addEventListener('click', function(event) {
    event.preventDefault();

    if (isVisible(el)) {
      hide(el);
    } else {
      show(el);
    }
  });

  closeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    hide(el);
  });
});

// handle closing the panel
document.body.addEventListener('click', function(event) {

  // close the simple reveal components if you click away
  if (!parentIsSimpleReveal(event.target)) {
      hideAll();
  }
});
