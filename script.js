const nav = document.querySelector("nav");

[...nav.querySelectorAll("button")].forEach(function(btn) {
  btn.addEventListener("click", function() {
    if (!btn.classList.contains("active")) {
      btn.classList.add("active");
    }
  });
});
[...nav.querySelectorAll("button")].forEach(function(btn) {
  btn.classList.remove("active");
});
[...nav.querySelectorAll("button")].forEach(function(btn) {
  if (btn.dataset.href == window.location.hash.substr(1)) {
    btn.classList.add("active");
  } else if (btn.dataset.href == "/" && window.location.hash == "") {
    btn.classList.add("active");
  }
});

window.addEventListener("hashchange", function() {
  [...nav.querySelectorAll("button")].forEach(function(btn) {
    btn.classList.remove("active");
  });
  [...nav.querySelectorAll("button")].forEach(function(btn) {
    if (btn.dataset.href == window.location.hash.substr(1)) {
      btn.classList.add("active");
    } else if (btn.dataset.href == "/" && window.location.hash == "") {
      btn.classList.add("active");
    }
  });
});
