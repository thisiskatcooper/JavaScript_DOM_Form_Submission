import "./index.css";

/*
 Your solution here
 */

// create an event listener for "form submit"
const formSubmitListener = () => {
  const searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", formSubmitHandler);
};

// create an event handler for "formSubmitListener"
function formSubmitHandler(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  
  // validate search term
  if (validateForm(formData)) {
    const searchInput = formData.get("searchTerm");
    const articles = document.querySelectorAll("article");
    // perform a case insensitive search
    // of the innerHTML values of the h2 elements
    articles.forEach((article) => {
      if (
        article
          .querySelector("h2")
          .innerText.toLowerCase()
          .includes(searchInput.toLowerCase())
      ) {
        // display the article if any part
        // of the search term is a match
        article.style.display = "block";
      } else {
        // otherwise, hide the article(s)
        // by adding class "hidden"
        // to the article element
        article.classList.add("hidden")
        article.style.display = "none";
      }
    });
  } else return null;
}

// create function to verify that search term exists
function validateForm(formData) {
  // if there is no search term
  // or if the search field is only spaces
  // return an error element
  if (!formData.get("searchTerm") || !formData.get("searchTerm").trim()) {
    // create an error element (within a div tag)
    // to append to the end of the form
    const errorElement = document.createElement("div");
    // add error class
    errorElement.classList.add("error");
    // add attributes of error element:
    // an id of searchError
    errorElement.setAttribute("id", "searchError");
    // input "Please enter a search term"
    // as innerText of error div
    errorElement.innerText = "Please enter a search term";
    // append the error to the end of the form
    document.querySelector("form").appendChild(errorElement);
    // otherwise, return articles
  } else return true;
}

window.addEventListener("DOMContentLoaded", formSubmitListener);