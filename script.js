// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const nav = document.querySelector('.flex-nav');

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    mobileMenuButton.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
}

// Handle browser back button and page visibility
window.addEventListener('popstate', function(event) {
  document.body.style.opacity = '1';
});

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    document.body.style.opacity = '1';
  }
});

// Ensure page is visible when loaded
window.addEventListener('pageshow', function(event) {
  document.body.style.opacity = '1';
});

// Dynamically load the menu and handle active section
document.addEventListener("DOMContentLoaded", function () {
  // Create scroll indicator HTML
  const scrollIndicatorHTML = `
    <div class="scroll-indicator-bottom">
      <p class="scroll-text">Faites défiler pour en découvrir plus</p>
      <div class="scroll-icon">
        <svg class="mouse-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="3" width="12" height="18" rx="6"></rect>
          <line x1="12" y1="7" x2="12" y2="11"></line>
        </svg>
        <svg class="smile-icon hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </div>
    </div>
  `;
  
  // Add to the page
  document.body.insertAdjacentHTML('beforeend', scrollIndicatorHTML);
  
  // Initialize the scroll indicator
  initScrollIndicator();

  fetch("menu.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("menu-placeholder").innerHTML = data;
      
      // Set active section based on current page
      const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
      const navItems = document.querySelectorAll('.nav-div');
      navItems.forEach(item => {
        if (item.getAttribute('data-page') === currentPage) {
          item.classList.add('active');
        }
      });

      // Reattach event listeners after loading the menu
      const mobileMenuButton = document.querySelector('.mobile-menu-button');
      const nav = document.querySelector('.flex-nav');
      const about = document.getElementById("about");
      const projects = document.getElementById("projects");
      const contact = document.getElementById("contact");
      const portfoliodapprentissage = document.getElementById("portfoliodapprentissage");

      if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
          nav.classList.toggle('nav-active');
          mobileMenuButton.classList.toggle('active');
          document.body.classList.toggle('menu-open');
        });
      }

      // Add smooth navigation
      const navigate = (url, isAbout = false) => {
        document.body.style.opacity = '0';
        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
          nav.classList.remove('nav-active');
          mobileMenuButton.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        setTimeout(() => {
          if (isAbout) {
            window.location.href = './index.html';
          } else {
            window.location.href = url;
          }
        }, 300);
      };

      about?.addEventListener("click", (e) => {
        e.preventDefault();
        navigate('index.html', true);
      });
      projects?.addEventListener("click", () => navigate("projects.html"));
      contact?.addEventListener("click", () => navigate("contact.html"));
      portfoliodapprentissage?.addEventListener("click", () => navigate("portfoliodapprentissage.html"));

      // Initialize glitch effect only for hero h1
      const heroTitle = document.querySelector('.hero-section h1[data-value]');
      if (heroTitle) {
        initGlitchEffect(heroTitle);
      }

      // Add click handlers for project listings
      const projectListings = document.querySelectorAll('.project-listing');
      projectListings.forEach(project => {
        project.addEventListener('click', () => {
          const projectUrl = project.getAttribute('data-project-url');
          if (projectUrl) {
            navigate(projectUrl);
          }
        });
      });

      // Initialize moving background
      initMovingBackground();
    });

  // Show the page
  document.body.style.opacity = '1';
});

// Moving background effect
function initMovingBackground() {
  const background = document.querySelector('.animated-background');
  const gradientElements = [
    background.querySelector('::before'),
    background.querySelector('::after'),
    ...background.querySelectorAll('.gradient-circle')
  ];
  
  if (!background) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    targetX = (x - 0.5) * 60;
    targetY = (y - 0.5) * 60;
  });

  function animate() {
    const dx = targetX - mouseX;
    const dy = targetY - mouseY;
    
    mouseX += dx * 0.1;
    mouseY += dy * 0.1;
    
    const baseTransform = `translate(${mouseX}px, ${mouseY}px)`;
    background.style.transform = `${baseTransform} scale(${1 + Math.abs(mouseX) * 0.001 + Math.abs(mouseY) * 0.001})`;
    
    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });
}

// Glitch effect for text
function initGlitchEffect(element) {
  // Store the original text
  const originalText = element.dataset.value;
  
  // Add mouseover event
  element.addEventListener('mouseover', () => glitchAnimation(element, originalText));
}

function glitchAnimation(element, originalText) {
  // Don't start a new animation if one is already running
  if (element.isAnimating) return;
  element.isAnimating = true;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let iterations = 0;
  
  const interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");
    
    iterations += 1/3;
    
    if (iterations >= originalText.length) {
      clearInterval(interval);
      element.innerText = originalText;
      element.isAnimating = false;
    }
  }, 30);
}

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

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

// Add scroll indicator to the page
document.addEventListener("DOMContentLoaded", function () {
  // Create scroll indicator HTML
  const scrollIndicatorHTML = `
    <div class="scroll-indicator-bottom">
      <p class="scroll-text">Faites défiler pour en découvrir plus</p>
      <div class="scroll-icon">
        <svg class="mouse-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="3" width="12" height="18" rx="6"></rect>
          <line x1="12" y1="7" x2="12" y2="11"></line>
        </svg>
        <svg class="smile-icon hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </div>
    </div>
  `;
  
  // Add to the page
  document.body.insertAdjacentHTML('beforeend', scrollIndicatorHTML);
  
  // Initialize the scroll indicator
  initScrollIndicator();
});

function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator-bottom');
  const scrollText = scrollIndicator?.querySelector('.scroll-text');
  const mouseIcon = scrollIndicator?.querySelector('.mouse-icon');
  const smileIcon = scrollIndicator?.querySelector('.smile-icon');
  
  if (!scrollIndicator || !scrollText || !mouseIcon || !smileIcon) return;

  // Check if we're at the bottom of the page
  function isAtBottom() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const buffer = 50; // Buffer of 50px from bottom
    
    return documentHeight - (scrollTop + windowHeight) <= buffer;
  }

  // Update scroll indicator content
  function updateScrollIndicator() {
    if (isAtBottom()) {
      scrollText.textContent = "N'hésitez pas à consulter les autres pages !";
      mouseIcon.classList.add('hidden');
      mouseIcon.style.animation = 'none';
      smileIcon.classList.remove('hidden');
    } else {
      scrollText.textContent = "Faites défiler pour en découvrir plus";
      mouseIcon.classList.remove('hidden');
      mouseIcon.style.animation = 'scrollAnimation 2s 2';
      smileIcon.classList.add('hidden');
    }
  }

  // Initial check
  updateScrollIndicator();

  // Add scroll event listener with throttling
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollIndicator();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Update on window resize with debouncing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateScrollIndicator, 100);
  });
}

