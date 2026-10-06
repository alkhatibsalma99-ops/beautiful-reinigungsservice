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


      if (select && service) {

        const validOptions =
          Array.from(select.options)
            .map(option => option.value);


        if (validOptions.includes(service)) {

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



/* ================= FORMSPREE AJAX ================= */

const contactForm =
  document.getElementById("contactForm");

const submitButton =
  document.getElementById("submitButton");

const formStatus =
  document.getElementById("formStatus");


if (
  contactForm &&
  submitButton &&
  formStatus
) {

  contactForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      /* Honeypot prüfen */

      const honeypot =
        contactForm.querySelector(
          'input[name="_gotcha"]'
        );


      if (
        honeypot &&
        honeypot.value.trim() !== ""
      ) {

        return;

      }


      /* Browser-Validierung */

      if (!contactForm.checkValidity()) {

        contactForm.reportValidity();

        return;

      }


      submitButton.disabled = true;

      submitButton.textContent =
        "Wird gesendet...";


      formStatus.className =
        "form-status";

      formStatus.textContent = "";


      try {

        const formData =
          new FormData(contactForm);


        const response =
          await fetch(
            contactForm.action,
            {
              method: "POST",
              body: formData,

              headers: {
                "Accept": "application/json"
              }
            }
          );


        if (response.ok) {

          formStatus.className =
            "form-status success";

          formStatus.textContent =
            "Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei Ihnen.";


          contactForm.reset();


          /*
            بعد النجاح منرجّع المستخدم
            لبداية رسالة النجاح
          */

          formStatus.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        } else {

          let message =
            "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.";


          try {

            const data =
              await response.json();


            if (
              data.errors &&
              data.errors.length > 0
            ) {

              message =
                data.errors
                  .map(error => error.message)
                  .join(" ");

            }

          } catch {
            /* JSON غير متوفر */
          }


          formStatus.className =
            "form-status error";

          formStatus.textContent =
            message;

        }

      } catch (error) {

        formStatus.className =
          "form-status error";

        formStatus.textContent =
          "Die Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Internetverbindung oder kontaktieren Sie uns telefonisch.";

      } finally {

        submitButton.disabled = false;

        submitButton.textContent =
          "Anfrage senden";

      }

    }
  );

}