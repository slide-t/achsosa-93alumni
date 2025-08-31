async function loadComponent(containerId, filePath, fallback) {
  try {
    const response = await fetch(filePath, { cache: "no-store" });
    if (!response.ok) throw new Error(`${filePath} not found`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    document.getElementById(containerId).innerHTML = fallback;
  }
}

function loadLayout() {
  loadComponent("header-container", "header.html", "<header><p>Header unavailable</p></header>");
  loadComponent("footer-container", "footer.html", "<footer><p>Footer unavailable</p></footer>");
}

document.addEventListener("DOMContentLoaded", loadLayout);
