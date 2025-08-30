// footer.js
async function loadFooter() {
  try {
    const response = await fetch('footer.html', { cache: 'no-store' });
    if (!response.ok) throw new Error('Footer not found');
    const footerHTML = await response.text();
    document.getElementById('footer-container').innerHTML = footerHTML;
  } catch (error) {
    console.error('Error loading footer:', error);
    document.getElementById('footer-container').innerHTML = '<footer><p>Footer unavailable</p></footer>';
  }
}
loadFooter();
