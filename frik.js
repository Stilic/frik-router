function setHTML(html, dest) {
  dest.innerHTML = "";
  let container = document.createElement("div");
  container.innerHTML = html;
  let scripts = container.querySelectorAll("script");
  let nodes = container.childNodes;
  for (let i = 0; i < nodes.length; i++)
    dest.appendChild(nodes[i].cloneNode(true));
  for (let i = 0; i < scripts.length; i++) {
    let script = document.createElement("script");
    script.type = scripts[i].type || "text/javascript";
    if (scripts[i].hasAttribute("src")) script.src = scripts[i].src;
    script.innerHTML = scripts[i].innerHTML;
    document.head.appendChild(script);
    document.head.removeChild(script);
  }
  return true;
}

class Frik {
  constructor(data) {
    this.data = data;
  }

  render(loc, data) {
    const page = document.querySelector("#frik-main");
    if (data["loadingHTML"]) {
      page.innerHTML = data["loadingHTML"];
    } else {
      page.innerHTML = "<p>Loading...</p>";
    }
    if (window.fetch) {
      if (!navigator.onLine) {
        page.innerHTML =
          "<p>It's see you are offline. Please reload your browser or try later...</p>";
      } else {
        if (loc == "" || loc == "#/") {
          fetch("./pages/main.html")
            .then(function(response) {
              return response.text();
            })
            .then(function(text) {
              var el = document.createElement("html");
              el.innerHTML = text;
              [...el.querySelectorAll("code")].forEach(function(c) {
                var tagsToReplace = {
                  "&": "&amp;",
                  "<": "&lt;",
                  ">": "&gt;"
                };
                c.innerHTML = c.innerHTML.replace(/[&<>]/g, function(tag) {
                  return tagsToReplace[tag] || tag;
                });
              });
              setHTML(el.innerHTML, page);
              if (data["afterRender"]) {
                if (data["afterRender-args"]) {
                  data["afterRender"](data["afterRender-args"]);
                } else {
                  data["afterRender"]();
                }
              }
              document.title = data["title"];
            });
        } else {
          fetch("./pages" + loc.substr(1) + ".html")
            .then(function(response) {
              return response.text();
            })
            .then(function(text) {
              var el = document.createElement("html");
              el.innerHTML = text;
              [...el.querySelectorAll("code")].forEach(function(c) {
                var tagsToReplace = {
                  "&": "&amp;",
                  "<": "&lt;",
                  ">": "&gt;"
                };
                c.innerHTML = c.innerHTML.replace(/[&<>]/g, function(tag) {
                  return tagsToReplace[tag] || tag;
                });
              });
              setHTML(el.innerHTML, page);
              if (data["afterRender"]) {
                if (data["aRargs"]) {
                  data["afterRender"](data["aRargs"]);
                } else {
                  data["afterRender"]();
                }
              }
            });
        }
      }
    } else {
      alert(
        "Your browser is depreciated! Please choose a another browser to go into this website!"
      );
      window.location.href = "https://zerosonesfun.github.io/IENOMORE";
    }
  }

  init() {
    const data = this.data;
    this.render(window.location.hash, data);

    document.addEventListener("click", event => {
      const isButton = event.target.nodeName === "BUTTON";
      if (!isButton) {
        return;
      }
      window.location.hash = event.target.dataset.href;
    });

    const render = this.render;
    window.onhashchange = function() {
      render(window.location.hash, data);
    };
  }
}
