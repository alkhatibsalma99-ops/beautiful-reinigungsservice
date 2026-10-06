"use strict";


/* ================= MOBILE MENU ================= */

const menuToggle =
  document.getElementById("menuToggle");

const mobileNav =
  document.getElementById("mobileNav");


if (menuToggle && mobileNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      mobileNav.classList.toggle("active");


    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  mobileNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

}



/* ================= MEHR ERFAHREN ================= */

document
  .querySelectorAll(".more-btn")
  .forEach(button => {

    button.addEventListener("click", () => {

      const moreText =
        button.nextElementSibling;


      if (
        !moreText ||
        !moreText.classList.contains("more-text")
      ) {
        return;
      }


      const isOpen =
        moreText.classList.toggle("active");


      button.textContent =
        isOpen
          ? "Weniger anzeigen ↑"
          : "Mehr erfahren →";

    });

  });



/* ================= SERVICE → FORM ================= */

document
  .querySelectorAll(".service-request")
  .forEach(button => {

    button.addEventListener("click", () => {

      const service =
        button.dataset.service;


      const select =
        document.getElementById("leistung");


      const kontakt =
        document.getElementById("kontakt");


      if (
        select &&
        service
      ) {

        const validOptions =
          Array.from(select.options)
            .map(option => option.value);


        if (
          validOptions.includes(service)
        ) {

          select.value = service;

        }

      }


      if (kontakt) {

        kontakt.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });



/* ================= FORM BASIC PROTECTION ================= */

const contactForm =
  document.querySelector(
    '.contact-box form'
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      const submitButton =
        contactForm.querySelector(
          'button[type="submit"]'
        );


      const honeypot =
        contactForm.querySelector(
          'input[name="_gotcha"]'
        );


      /*
        إذا البوت عبّى الحقل المخفي،
        منوقف الإرسال.
      */

      if (
        honeypot &&
        honeypot.value.trim() !== ""
      ) {

        event.preventDefault();

        return;
      }


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "Wird gesendet...";


        /*
          إذا صار فشل خارجي،
          منرجع نفعّل الزر بعد شوي.
        */

        setTimeout(() => {

          submitButton.disabled = false;

          submitButton.textContent =
            "Anfrage senden";

        }, 8000);

      }

    }
  );

}