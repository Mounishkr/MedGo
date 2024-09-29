document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById('hero');
  const website = document.getElementById('website');
  const getStartedButton = document.querySelector('.btn');
  const homeButton = document.querySelector('.navbar .nav-link[href="#"]');
  let heroExited = false;  // Flag to track if hero has been exited
  let isThrottled = false; // Throttling flag to prevent disturbance
  let isScrolling = false; // To prevent conflict with smooth scrolling

  // Disable scrolling on page load
  document.body.classList.add('locked');

  // Smooth scroll to website section when "Get Started" is clicked
  getStartedButton.addEventListener('click', () => {
    // Unlock the body scrolling
    document.body.classList.remove('locked');
    isScrolling = true;  // Set a flag to avoid interference with the scroll event
    // Scroll smoothly to the website section
    website.scrollIntoView({ behavior: 'smooth' });
    heroExited = true;  // Mark hero as exited

    // Disable the scrolling lock for 1 second to allow smooth scroll to complete
    setTimeout(() => {
      isScrolling = false;
    }, 1000);  // Adjust the timeout based on the scroll duration
  });

  // Handle navigation back to the hero section via the Home button
  homeButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    document.body.classList.add('locked'); // Lock scrolling again
    isScrolling = true; // Avoid interference with the scroll event
    hero.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to hero section
    heroExited = false;  // Reset the flag

    // Disable the scroll lock for 1 second to allow smooth scroll
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });

  // Throttle function to limit how often scroll event fires
  function throttleScrollEvent(callback, limit) {
    if (!isThrottled) {
      callback();
      isThrottled = true;
      setTimeout(() => isThrottled = false, limit);
    }
  }

  // Adjust scroll position when the user scrolls back up
  window.addEventListener('scroll', () => {
    // Avoid interfering with the scroll while it's happening smoothly
    if (isScrolling) return;

    throttleScrollEvent(() => {
      if (heroExited && window.scrollY < website.offsetTop) {
        window.scrollTo({ top: website.offsetTop, behavior: 'auto' });  // Snap scroll position
      }
    }, 200);  // Throttle every 200ms for smoother control
  });

  // Sliding content on scroll for other sections
  const sections = document.querySelectorAll('.section_1, .section_2');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const content = entry.target.querySelector('.content_1, .content_2');
        const pic = entry.target.querySelector('.pic_1, .pic_2');

        // Add class to make it visible
        content.classList.add('show');
        pic.classList.add('show');
      } else {
        entry.target.querySelector('.content_1, .content_2').classList.remove('show');
        entry.target.querySelector('.pic_1, .pic_2').classList.remove('show');
      }
    });
  }, { threshold: 0.1 });

  // Attach observer to each section
  sections.forEach(section => observer.observe(section));
});
// For mobile smooth scrolling, ensure that scroll events are not delayed
window.addEventListener('scroll', function() {
  // Detect mobile viewport width and apply specific behavior
  if (window.innerWidth <= 768) {
    // Reduce scroll speed or animation time for smaller screens if needed
    document.querySelectorAll('.section_1').forEach(section => {
      // Modify the threshold for mobile scroll reveal
      observer.observe(section);
    });
  }
});



