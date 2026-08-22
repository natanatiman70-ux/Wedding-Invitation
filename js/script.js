/**
 * ============================================================
 * WEDDING INVITATION — EDIT THIS CONFIGURATION
 * ============================================================
 * Change names, date, venue, photos, quote, and EmailJS IDs here.
 * Do not scatter these values throughout the rest of the file.
 *
 * EmailJS dashboard setup:
 * 1. Create a service and template.
 * 2. Paste your PUBLIC key, service ID, and template ID below.
 * 3. Set the template "To Email" to the couple's inbox
 *    (default destination for this project: cliant@gmail.com).
 *    Keep that address in the EmailJS dashboard — it is never
 *    shown on the visible website.
 * ============================================================
 */
const weddingConfig = {
  brideName: "ሊዲያ",
  groomName: "ሙሉሀብት",
  brideInitial: "L",
  groomInitial: "M",
  brideAmharic: "ሊዲያ",
  groomAmharic: "ሙሉሀብት",
  namesAmharic: "ሊዲያ እና ሙሉሀብት",
  heroVerse: "ይሹሩን ሆይ፥ በሰማያት ላይ ለረድኤትህ፥ በደመናትም ላይ በታላቅነት እንደሚሄድ፡ እንደ እግዚአብሔር ያለ ማንም የለም።",
  heroVerseRef: "ዘዳግም 33:26",
  heroBottomScript: "Our forever begins here",
  heroBottomNote: "We would be honored to celebrate\nthis beautiful day with you.",
  invitationAmharic:
    "እንደ እግዚአብሄር ፍቃድ በ መስከረም 16-2019 ዓ.ም\nከምሽቱ 12 ሰዓት በ ሃያት ሬጀንሲ ባዘጋጀነው\nየእራት ግብዣ ላይ በመገኘት የደስታችን ተካፋይ\nይሆኑ ዘንድ በማክበር ጋብዘኖታል",
  closingMessage: "Thank you for being part of\nthis beautiful beginning.",

  weddingDay: "26",
  weddingMonth: "September",
  weddingYear: "2026",
  ethiopianDate: "16 መስከረም 2019 ዓ.ም",
  ethiopianDay: "16",
  ethiopianMonth: "መስከረም",
  ethiopianYear: "2019 ዓ.ም",
  gregorianDate: "September 26, 2026",
  weddingIso: "2026-09-26T16:00:00",
  locations: {
    church: {
      name: "Holy International Church",
      address: "Megenagna, Addis Ababa, Ethiopia",
      image: "",
      mapEmbedUrl: "https://maps.google.com/maps?q=2R94%2BW76%20Holy%20International%20Church%20Megenagna%20Addis%20Ababa&output=embed",
      directionsUrl: "https://maps.app.goo.gl/7KtiADEqBRWj5QaR9?g_st=it",
      directionsDestination: "",
      time: "9:00 AM – 11:00 AM"
    },
    venue: {
      name: "Hyatt Regency",
      address: "Addis Ababa, Ethiopia",
      image: "assets/images/venue.png",
      mapEmbedUrl: "https://maps.google.com/maps?q=Hyatt%20Regency%20Addis%20Ababa&output=embed",
      directionsDestination: "Hyatt Regency Addis Ababa",
      directionsUrl: "",
      time: "12:00 PM"
    }
  },

  heroImage: "assets/images/hero.png",
  audioSrc: "assets/audio/wedding-music.mp3",

  /* Replace these three values with your EmailJS credentials */
  emailjsPublicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  emailjsServiceId: "YOUR_EMAILJS_SERVICE_ID",
  emailjsTemplateId: "YOUR_EMAILJS_TEMPLATE_ID"
};

weddingConfig.namesDisplay = `${weddingConfig.brideName} & ${weddingConfig.groomName}`;
weddingConfig.weddingDateDisplay = `${weddingConfig.weddingDay} ${weddingConfig.weddingMonth} ${weddingConfig.weddingYear}`;
weddingConfig.weddingDateLong = weddingConfig.gregorianDate;
weddingConfig.venue = weddingConfig.locations.venue.name;
weddingConfig.address = weddingConfig.locations.venue.address;
weddingConfig.weddingLocation = weddingConfig.locations.venue.directionsDestination;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyConfig() {
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    const value = weddingConfig[key];
    if (typeof value !== "string") return;
    if (el.tagName === "IMG") {
      el.src = value;
      return;
    }
    el.innerHTML = value.replace(/\n/g, "<br />");
  });

  document.title = `Wedding Invitation — ${weddingConfig.namesDisplay}`;

  const heroPhoto = document.querySelector(".hero-photo");
  if (heroPhoto) heroPhoto.src = weddingConfig.heroImage;

  document.querySelectorAll("[data-location-name]").forEach((el) => {
    el.textContent = weddingConfig.locations[el.dataset.locationName].name;
  });
  document.querySelectorAll("[data-location-address]").forEach((el) => {
    el.textContent = weddingConfig.locations[el.dataset.locationAddress].address;
  });
  document.querySelectorAll("[data-location-image]").forEach((image) => {
    const location = weddingConfig.locations[image.dataset.locationImage];
    if (!location.image) return;
    image.src = location.image;
    image.hidden = false;
    image.closest(".location-photo-wrap")?.querySelector("[data-location-image-missing]")?.setAttribute("hidden", "");
  });
  document.querySelectorAll("[data-location-directions]").forEach((link) => {
    const destination = weddingConfig.locations[link.dataset.locationDirections].directionsDestination;
    link.href = weddingConfig.locations[link.dataset.locationDirections].directionsUrl || (destination
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
      : "#");
  });

  const footerNames = document.getElementById("footer-names");
  if (footerNames) {
    footerNames.innerHTML = `${weddingConfig.brideAmharic} <span>&amp;</span> ${weddingConfig.groomAmharic}`;
  }

  const sealMonogram = document.querySelector(".seal-monogram");
  if (sealMonogram) {
    sealMonogram.innerHTML = `${weddingConfig.brideInitial}<span>&amp;</span>${weddingConfig.groomInitial}`;
  }
}

function initLocations() {
  const map = document.getElementById("location-map");
  const directions = document.getElementById("directions-btn");
  const tabs = document.querySelectorAll("[data-location-tab]");
  if (!map || !tabs.length) return;

  const selectLocation = (key) => {
    const location = weddingConfig.locations[key];
    tabs.forEach((tab) => {
      const active = tab.dataset.locationTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    document.querySelectorAll("[data-location-panel]").forEach((panel) => {
      const active = panel.dataset.locationPanel === key;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
    map.src = location.mapEmbedUrl || "about:blank";
    map.title = `Map of the ${location.name.toLowerCase()}`;
    if (directions) directions.href = location.directionsUrl || (location.directionsDestination
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.directionsDestination)}`
      : "#");
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => selectLocation(tab.dataset.locationTab)));
  selectLocation("venue");
}

function initReveals() {
  const nodes = document.querySelectorAll(".scroll-up, .scroll-left, .scroll-right");
  if (prefersReducedMotion) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -30px 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initCountdown() {
  const daysEl = document.getElementById("count-days");
  const hoursEl = document.getElementById("count-hours");
  const minsEl = document.getElementById("count-mins");
  const secsEl = document.getElementById("count-secs");
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const target = new Date(weddingConfig.weddingIso).getTime();

  const tick = () => {
    const remaining = Math.max(0, target - Date.now());
    daysEl.textContent = String(Math.floor(remaining / 86400000)).padStart(2, "0");
    hoursEl.textContent = String(Math.floor((remaining / 3600000) % 24)).padStart(2, "0");
    minsEl.textContent = String(Math.floor((remaining / 60000) % 60)).padStart(2, "0");
    secsEl.textContent = String(Math.floor((remaining / 1000) % 60)).padStart(2, "0");
  };

  tick();
  window.setInterval(tick, 1000);
}

function paintScratchCover(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#8fa3b0");
  gradient.addColorStop(0.5, "#718897");
  gradient.addColorStop(1, "#9cabb4");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.font = '12px "Libre Baskerville", serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SCRATCH", width / 2, height / 2);
}

function scratchedRatio(ctx, width, height) {
  const sample = ctx.getImageData(0, 0, width, height).data;
  let transparent = 0;
  const step = 16;
  let counted = 0;
  for (let i = 3; i < sample.length; i += step) {
    counted += 1;
    if (sample[i] < 40) transparent += 1;
  }
  return transparent / counted;
}

function initScratch() {
  const cards = document.querySelectorAll("[data-scratch-card]");
  const countdown = document.getElementById("revealedCountdown");
  const hint = document.getElementById("scratchHint");
  const live = document.getElementById("date-live");
  const revealBtn = document.getElementById("reveal-date-btn");
  if (!cards.length) return;

  let completedScratchCards = 0;
  let allRevealed = false;

  const finishAll = () => {
    if (allRevealed) return;
    allRevealed = true;
    completedScratchCards = cards.length;

    cards.forEach((card) => {
      const canvas = card.querySelector(".scratch-canvas");
      if (!canvas) return;
      canvas.style.transition = "opacity .55s ease";
      canvas.style.opacity = "0";
      canvas.style.pointerEvents = "none";
    });

    if (hint) hint.textContent = weddingConfig.gregorianDate;
    if (live) live.textContent = `The wedding date is ${weddingConfig.ethiopianDate}, ${weddingConfig.gregorianDate}.`;

    window.setTimeout(() => {
      countdown?.classList.add("is-visible");
    }, 350);
  };

  cards.forEach((card) => {
    const canvas = card.querySelector(".scratch-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let drawing = false;
    let completed = false;

    const resize = () => {
      const rect = card.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!completed && !allRevealed) paintScratchCover(ctx, rect.width, rect.height);
    };

    const scratchAt = (clientX, clientY) => {
      if (completed || allRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const checkProgress = () => {
      if (completed || allRevealed) return;
      if (scratchedRatio(ctx, canvas.width, canvas.height) < 0.48) return;
      completed = true;
      canvas.style.transition = "opacity .55s ease";
      canvas.style.opacity = "0";
      canvas.style.pointerEvents = "none";
      completedScratchCards += 1;
      if (completedScratchCards === cards.length) finishAll();
    };

    canvas.addEventListener("pointerdown", (event) => {
      drawing = true;
      canvas.setPointerCapture(event.pointerId);
      scratchAt(event.clientX, event.clientY);
      event.preventDefault();
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!drawing) return;
      scratchAt(event.clientX, event.clientY);
      event.preventDefault();
    });

    canvas.addEventListener("pointerup", () => {
      drawing = false;
      checkProgress();
    });

    canvas.addEventListener("pointercancel", () => {
      drawing = false;
      checkProgress();
    });

    resize();
    window.addEventListener("load", resize);
    window.addEventListener("resize", () => {
      if (!completed && !allRevealed) resize();
    });
  });

  if (revealBtn) revealBtn.addEventListener("click", finishAll);
  if (prefersReducedMotion) finishAll();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setStatus(message, type) {
  const status = document.getElementById("form-status");
  if (!status) return;
  status.textContent = message;
  status.classList.remove("is-success", "is-error");
  if (type) status.classList.add(type);
}

function credentialsReady() {
  const { emailjsPublicKey, emailjsServiceId, emailjsTemplateId } = weddingConfig;
  const placeholders = ["YOUR_EMAILJS_PUBLIC_KEY", "YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID"];
  return (
    emailjsPublicKey &&
    emailjsServiceId &&
    emailjsTemplateId &&
    !placeholders.includes(emailjsPublicKey) &&
    !placeholders.includes(emailjsServiceId) &&
    !placeholders.includes(emailjsTemplateId)
  );
}

function initForm() {
  const form = document.getElementById("rsvp-form");
  const submitBtn = document.getElementById("submit-btn");
  if (!form || !submitBtn) return;

  if (!credentialsReady()) {
    console.warn(
      "EmailJS is not configured yet. Replace YOUR_EMAILJS_PUBLIC_KEY, YOUR_EMAILJS_SERVICE_ID, and YOUR_EMAILJS_TEMPLATE_ID in js/script.js. Set the template recipient in the EmailJS dashboard."
    );
  } else if (window.emailjs) {
    window.emailjs.init({ publicKey: weddingConfig.emailjsPublicKey });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const honeypot = form.elements.website;
    if (honeypot && honeypot.value) return;

    const guestName = form.elements.guest_name.value.trim();
    const guestEmail = form.elements.guest_email.value.trim();
    const message = form.elements.message.value.trim();
    const attendingInput = form.querySelector('input[name="attending"]:checked');
    const attending = attendingInput ? attendingInput.value : "";
    const guestCount = form.elements.guest_count.value;

    if (guestName.length < 2) {
      setStatus("Please enter your name.", "is-error");
      form.elements.guest_name.focus();
      return;
    }
    if (!isValidEmail(guestEmail)) {
      setStatus("Please enter a valid email address.", "is-error");
      form.elements.guest_email.focus();
      return;
    }
    if (!attending) {
      setStatus("Please choose whether you will attend.", "is-error");
      return;
    }
    if (message.length < 4) {
      setStatus("Please share a short message.", "is-error");
      form.elements.message.focus();
      return;
    }

    if (!window.emailjs || !credentialsReady()) {
      setStatus("Your message could not be sent. Please try again.", "is-error");
      console.error("EmailJS SDK missing or credentials not configured.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Sending…";
    setStatus("Sending your note…");

    try {
      await window.emailjs.send(weddingConfig.emailjsServiceId, weddingConfig.emailjsTemplateId, {
        guest_name: guestName,
        guest_email: guestEmail,
        message,
        attending,
        guest_count: guestCount,
        wedding_date: weddingConfig.weddingDateDisplay,
        wedding_location: weddingConfig.weddingLocation
      });
      form.reset();
      form.elements.guest_count.value = "1";
      setStatus("Thank you. Your message has been received.", "is-success");
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("Your message could not be sent. Please try again.", "is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector("span").textContent = "Send RSVP";
    }
  });
}

function initMusic() {
  const audio = document.getElementById("wedding-audio");
  const toggle = document.getElementById("music-toggle");
  if (!audio || !toggle) return;

  audio.src = weddingConfig.audioSrc;
  audio.volume = 0.4;
  audio.loop = true;

  let userPaused = false;
  let waitingForGesture = false;

  const setPlayingUI = (playing) => {
    toggle.classList.toggle("is-playing", playing);
    toggle.setAttribute("aria-pressed", playing ? "true" : "false");
    toggle.setAttribute("aria-label", playing ? "Pause wedding music" : "Play wedding music");
  };

  const playMusic = () =>
    audio.play().then(() => {
      waitingForGesture = false;
      setPlayingUI(true);
    }).catch(() => {
      waitingForGesture = true;
      setPlayingUI(false);
    });

  const pauseMusic = () => {
    audio.pause();
    userPaused = true;
    waitingForGesture = false;
    setPlayingUI(false);
  };

  const onFirstGesture = () => {
    if (userPaused || !audio.paused) return;
    playMusic();
  };

  toggle.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (audio.paused) {
      userPaused = false;
      playMusic();
    } else {
      pauseMusic();
    }
  });

  /*
   * The opening envelope provides the first user gesture.
   * Expose the player so the opening screen can start the music
   * without changing the existing music-toggle behavior.
   */
  window.startWeddingMusic = () => {
    if (userPaused) userPaused = false;
    return playMusic();
  };

  /*
   * Keep the existing toggle working after the invitation opens.
   * Do not force autoplay here; browsers commonly block audible
   * autoplay until the visitor interacts with the page.
   */
}

function initOpeningScreen() {
  const opening = document.getElementById("invitation-opening");
  const openButton = document.getElementById("open-invitation");
  if (!opening || !openButton) return;

  let opened = false;

  const openInvitation = () => {
    if (opened) return;
    opened = true;

    /*
     * The click/tap is a valid user gesture, so this is the best
     * moment to attempt to start the wedding music.
     */
    if (typeof window.startWeddingMusic === "function") {
      window.startWeddingMusic().catch(() => {
        /* The invitation still opens if the browser blocks audio. */
      });
    }

    // Start the physical opening sequence before revealing the invitation.
    opening.classList.add("is-opening");
    document.body.classList.add("invitation-unlocked");

    // Let the flap/seams open first, then remove the overlay and unlock scrolling.
    window.setTimeout(() => {
      document.body.classList.remove("invitation-locked");
      openButton.blur();
    }, 1350);
  };

  openButton.addEventListener("click", openInvitation);

  if (prefersReducedMotion) {
    opening.style.transition = "opacity .2s ease, visibility 0s linear .2s";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initReveals();
  initCountdown();
  initScratch();
  initForm();
  initMusic();
  initLocations();
  initOpeningScreen();
});
