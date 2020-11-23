// Namespace object.
// Necessary to prevent polluting the global namespace
var Progress = {
  url: "/read/{{ id }}",
  announce: function() {
    fetch(url)
  },
  record: function() {
    let diff = document.documentElement.scrollHeight - document.documentElement.scrollTop
    if (diff === document.documentElement.clientHeight) {
      document.removeEventListener("scroll", Progress.record)
      Progress.announce()
    }
  }
}

window.addEventListener("pageshow", function() {
  document.addEventListener("scroll", Progress.record, false)
})
