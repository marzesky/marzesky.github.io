//////////GLITCH ANIMATION LOGIC

// Define the alphabet arrays outside the function
const lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersLower = "abcdefghijklmnopqrstuvwxyz";

// Define a helper function to animate an element
function animateElement(element) {
  // Use a Promise to wait for the animation to complete
  return new Promise(resolve => {
    let iteration = 0;
    const letters = element.tagName.toLowerCase() === 'h2' ? lettersLower : lettersUpper;
    const interval = setInterval(() => {
      element.innerText = element.dataset.value
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return element.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");
      if(iteration >= element.dataset.value.length){ 
        clearInterval(interval);
        resolve();
      }
      iteration += 1 / 2;
    }, 30);
  });
}

// Use an async function to execute the code after the page loads
window.addEventListener('load', async () => {
  const h1 = document.querySelector('h1');
  const h2Elements = document.querySelectorAll('h2');

  // Start the animation for the h1 element
  await animateElement(h1);

  // Start the animation for the h2 elements sequentially using a for...of loop
  for (const h2 of h2Elements) {
    await animateElement(h2);
  }

  // Add event listeners for mouseover events on the h1 and h2 elements
  h1.addEventListener('mouseover', () => animateElement(h1));
  h2Elements.forEach(h2 => {
    h2.addEventListener('mouseover', () => animateElement(h2));
  });
});

//////////PAGE LOGIC

// get references to the h2 elements
var about = document.getElementById("about");
var projects = document.getElementById("projects");
var contact = document.getElementById("contact"); 
var microfighters = document.getElementById("Microfighters");
var poubot = document.getElementById("PouBot"); 

// add click event listeners to the h2 elements
about.addEventListener("click", function() {
  // navigate to about.html
  window.location.href = "about.html";
});

projects.addEventListener("click", function() {
  // navigate to projects.html
  window.location.href = "projects.html";
});

contact.addEventListener("click", function() {
  // navigate to contact.html
  window.location.href = "contact.html";
});

microfighters.addEventListener("click", function() {
  // navigate to contact.html
  window.location.href = "Microfighters.html";
});

poubot.addEventListener("click", function() {
  // navigate to contact.html
  window.location.href = "PouBot.html";
});

