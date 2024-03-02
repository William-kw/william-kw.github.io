const toggleLinksMenu = document.querySelector(".nav .toggle-links"),
  navLinkElement = document.querySelector(".nav .links"),
  toggleContactRightBarMenu = document.querySelector(".nav .toggle-contact-right-bar"),
  navLinks = document.querySelectorAll(".nav .links .nav-link"),
  contactRightBar = document.querySelector(".contact-right-bar"),
  closeContact = document.querySelector(".contact-right-bar .close-contact"),
  contactOverlay = document.querySelector(".contact-overlay"),
  loading = document.querySelector(".loading"),
  content = document.querySelector(".content"),
  scrollIndicator = document.querySelector(".scroll");

// scroll incator
const obsever = new IntersectionObserver(handleIntersect)
obsever.observe(content)
function handleIntersect(entries) {
  const el = entries[0]
  if (el.isIntersecting) {
    window.addEventListener("scroll", indicatorAnimation)
  } else {
    window.removeEventListener("scroll", indicatorAnimation)
  }
}
function indicatorAnimation() {
  if (window.scrollY > content.offsetTop) {
    const percentage = ((window.scrollY - content.offsetTop) / content.scrollHeight * 100).toFixed(2)
    scrollIndicator.style.transform = `scaleX(${(percentage / 100)})`
  } else {
    scrollIndicator.style.transform = "scaleX(0)"
  }
}

// toggle nav links
toggleLinksMenu.addEventListener("click", toggleNav);
// navLinks
navLinks.forEach((link) => {
  link.addEventListener("click", toggleNav);
});
// open contact right bar
toggleContactRightBarMenu.addEventListener("click", toggleContact);
// close contact right bar in close btn
closeContact.addEventListener("click", toggleContact);
// close contact right bar in overlay
contactOverlay.addEventListener("click", toggleContact);

// toggle navbar
function toggleNav() {
  navLinkElement.classList.toggle("show-links");
  toggleLinksMenu.children[0].classList.toggle("bx-x");
}
// toggle contact right bar
function toggleContact() {
  contactRightBar.classList.toggle("show-contact");
  contactOverlay.classList.toggle("show");
}

// loading
window.addEventListener("load", () => {
  setTimeout(() => {
    loading.classList.toggle("hide");
  }, 1000);
});

// initialize AOS library
AOS.init();
