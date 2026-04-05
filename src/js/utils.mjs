export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  return html;
}

export async function loadHeaderFooter() {
  // load templates
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  // get elements
  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");

  // render
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function alertMessage(message, scroll = true) {
  const existing = document.querySelector(".alert-message");
  if (existing) existing.remove();

  const alert = document.createElement("div");
  alert.classList.add("alert-message");
  alert.innerText = message;

  document.querySelector("main").prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}