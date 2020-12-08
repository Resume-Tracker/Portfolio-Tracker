// Namespace object.
// Necessary to prevent polluting the global namespace
var Progress = {
  url: "{{ base_name }}/read/{{ id }}",
  announce: function() {
    fetch(Progress.url)
  },
  record: function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      document.removeEventListener("scroll", Progress.record)
      Progress.announce()
    }
  }
}

window.addEventListener("pageshow", function() {
  document.addEventListener("scroll", Progress.record, false)
})
