// common.js

// Function to add the common header to a page
function addHeader() {
  const header = `
      <header>
          <h1>Brendan Gorman || Greedy Goblins || ITIS 3135</h1>
          <div class="header-right">
              <nav>
                  <a href="./">Homepage</a> ||
                  <a href="introduction.html">Introduction</a> ||
                  <a href="contract.html">Contract</a> ||
                  <a href="forms.html">Forms</a> ||
                  <a href="tables.html">Tables</a> ||
                  <a href="/">Back to Main Site</a>
              </nav>
          </div>
      </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', header);
}

// Function to add the common footer to a page
function addFooter() {
  const footer = `
      <footer>
          <nav>
              <a href="https://webpages.charlotte.edu/bgorman3">CLT Web</a> ||
              <a href="https://github.com/bgorman3">Github</a> ||
              <a href="https://github.com/bgorman3/bgorman3.github.io/tree/main">Github.io</a> ||
              <a href="http://bgorman3.github.io">itis3135.io</a> ||
              <a href="https://www.freecodecamp.org/bgorman3">FreeCodeCamp</a> ||
              <a href="https://www.codecademy.com/profiles/bgorman3">Codecademy</a> ||
              <a href="http://linkedin.com/in/brendan-gorman-0a0021279">Linkedin</a> 
          </nav>
          <nav>
              <p>Page Built by <a href="gormotechventures.net">Gormo Tech Ventures</a> &copy; 2023</p>
              <div class="image-container">
                  <a href="https://validator.w3.org/check?uri=referer">
                      <img style="border:0;width:88px;height:31px"
                      src="https://upload.wikimedia.org/wikipedia/commons/b/bb/W3C_HTML5_certified.png" alt="Valid HTML!">
                  </a>
                  <a href="https://jigsaw.w3.org/css-validator/check/referer">
                      <img style="border:0;width:88px;height:31px"
                      src="https://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS!">
                  </a>
              </div>
          </nav>
      </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footer);
}
