(function () {
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get("slug");
  const data   = window.PROJECTS[slug];

  if (!data) {
    document.body.innerHTML =
      '<div style="padding:80px;text-align:center;font-family:sans-serif">' +
      '<h1>Project not found</h1>' +
      '<p>Unknown slug: <code>' + (slug || "(none)") + '</code></p>' +
      '<a href="projects.html">&larr; Back to Projects</a></div>';
    return;
  }

  
  document.title = data.title + " — Samunaber Engineering";
  document.getElementById("project-category").textContent = data.category.toUpperCase();
  document.getElementById("project-title").textContent    = data.title;
  document.getElementById("project-client").textContent   = "Client: " + data.client;

  
  document.getElementById("project-overview-text").textContent = data.overview;

  
  const ul = document.getElementById("project-highlights");
  data.highlights.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = '<span class="arrow">&rarr;</span> ' + item;
    ul.appendChild(li);
  });

  
  const gal = document.getElementById("project-gallery");
  data.gallery.forEach((photo, i) => {
    const card = document.createElement("figure");
    card.className = "gallery-card";
    card.innerHTML =
      '<img src="' + photo.src + '" alt="' + photo.caption + '" data-index="' + i + '" />' +
      '<figcaption>' + photo.caption + '</figcaption>';
    gal.appendChild(card);
  });
  window.CURRENT_GALLERY = data.gallery;

  // OTHER PROJECTS
  const other = document.getElementById("other-projects");
  Object.keys(window.PROJECTS)
    .filter(s => s !== slug)
    .forEach(s => {
      const p = window.PROJECTS[s];
      const a = document.createElement("a");
      a.className = "other-card";
      a.href      = "project.html?slug=" + s;
      a.innerHTML =
        '<p class="eyebrow">' + p.category.toUpperCase() + '</p>' +
        '<h3>' + p.title + '</h3>' +
        '<span class="view-details">View Details &rarr;</span>';
      other.appendChild(a);
    });
})();
