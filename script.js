const toggleLinksMenu = document.querySelector(".nav .toggle-links"),
  navLinkElement = document.querySelector(".nav .links"),
  toggleContactRightBarMenu = document.querySelector(".nav .toggle-contact-right-bar"),
  navLinks = document.querySelectorAll(".nav .links a"),
  sections = document.querySelectorAll("section"),
  contactRightBar = document.querySelector(".contact-right-bar"),
  closeContact = document.querySelector(".contact-right-bar .close-contact"),
  contactOverlay = document.querySelector(".contact-overlay"),
  loading = document.querySelector(".loading"),
  content = document.querySelector(".content"),
  scrollIndicator = document.querySelector(".scroll"),
  go = document.querySelector(".totop .go"),
  banner = document.querySelector(".banner"),
  form = document.querySelector(".form"),
  inputs = [...form.querySelectorAll(".input")],
  btnSend = form.querySelector(".envoyer");

// contact form check and send 
form.addEventListener("submit", (e) => {
  e.preventDefault()
  btnSend.onclick = () => {
    let formdata = new FormData(form)
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/send.php", true)
    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let data = xhr.response
          console.log(data)
          // if (data === "succes") {
          //   btnSend.classList.add("flex", "items-center")
          //   btnSend.innerHTML = "Mail envoyé <i class='bx bx-check-double f-40'></i>"
          // } else {
          //   input.classList.toggle("danger")
          // }
        }
      }
    }
    xhr.send(formdata)
  }
})

// btnSend.disabled = true
// inputs.forEach(input => {
//   input.addEventListener("input", checkValue)
// })
// function checkValue() {
//   const empty = inputs.every(input => input.value !== "")
//   btnSend.disabled = !empty
// }

// scroll incator
const obseveur = new IntersectionObserver(handleIntersect)
obseveur.observe(content)
function handleIntersect(entree) {
  const el = entree[0]
  if (el.isIntersecting) {
    window.addEventListener("scroll", indicatorAnimation)
  } else {
    window.removeEventListener("scroll", indicatorAnimation)
  }
}
function indicatorAnimation() {
  if (window.scrollY > content.offsetTop) {
    const pourcentage = ((window.scrollY - content.offsetTop) / content.scrollHeight * 100).toFixed(2)
    scrollIndicator.style.transform = `scaleX(${(pourcentage / 100)})`
  } else {
    scrollIndicator.style.transform = "scaleX(0)"
  }
}

// go to top and change links
window.onscroll = () => {
  // change links 
  sections.forEach(section => {
    let top = window.scrollY
    let offset = section.offsetTop - 300
    let height = section.offsetHeight
    let id = section.getAttribute("id")
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active")
        let a = document.querySelector(".navbar .nav .links a[href*=" + id + "]")
        a.classList.add("active")
      })
    }
  })

  // go to top 
  go.classList.toggle("show", window.scrollY > (banner.offsetHeight / 2))
}

// toggle nav links
toggleLinksMenu.addEventListener("click", toggleNav);

// navLinks
navLinks.forEach((link) => {
  link.addEventListener("click", toggleNav);
});

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
