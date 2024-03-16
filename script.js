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
  form = document.querySelector("form"),
  inputs = [...form.querySelectorAll("form .input")],
  btnSend = form.querySelector(".envoyer"),
  img = document.querySelector(".loading img");

// contact form check and send 
form.addEventListener("submit", (e) => {
  e.preventDefault()
  let vide = false
  let valide = true
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      input.classList.add("danger")
      vide = true
    } else {
      input.classList.remove("danger")
    }
    if (!vide && input === inputs[1] && !validerEmail(input.value)) {
      input.classList.add("danger")
      valide = false
    }
  })
  if (!vide && valide) {
    btnSend.classList.add("flex", "items-center", "gap-10", "fs-20")
    btnSend.innerHTML = "Envoie <i class='bx bx-loader-alt bx-spin f-25'></i>"
    let formdata = new FormData(form)
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "./php/send.php", true)
    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          btnSend.innerHTML = "Envoyé <i class='bx bx-check-double f-30'></i>"
          form.reset()
        }
      }
    }
    xhr.send(formdata)
  } else {
    btnSend.classList.add("flex", "items-center", "gap-10", "fs-20")
    btnSend.innerHTML = "<i class='bx bx-error f-30'></i>"
  }
})
const emailInput = inputs[1];

emailInput.addEventListener("input", () => {
  if (!validerEmail(emailInput.value.trim())) {
    emailInput.classList.add("danger");
  } else {
    emailInput.classList.remove("danger");
  }
});

function validerEmail(email) {
  let reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
  if (reg.test(email)) {
    return true
  } else {
    return false
  }
}

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
    let offset = section.offsetTop - 200
    let height = section.offsetHeight
    let id = section.getAttribute("id")
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active")
        document.querySelector(".navbar .nav .links a[href*=" + id + "]").classList.add("active")
      })
    }
  })

  // go to top 
  go.classList.toggle("show", window.scrollY > (banner.offsetHeight / 2))
}

// swipper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 150,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

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

// loading
window.addEventListener("load", () => {
  setTimeout(() => {
    loading.classList.toggle("hide");
  }, 3000);
});


// initialize AOS library
AOS.init();
