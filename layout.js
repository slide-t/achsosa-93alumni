async function loadHeader() {
  try {
    const response = await fetch("header.html", { cache: "no-store" });
    if (!response.ok) throw new Error("Header not found");
    const headerHTML = await response.text();
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // highlight active link
    const current = window.location.pathname.split("/").pop();
    document.querySelectorAll("#navLinks a").forEach(link => {
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  } catch (error) {
    console.error("Error loading header:", error);
  }
}

loadHeader();
