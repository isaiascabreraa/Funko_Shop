document.addEventListener('DOMContentLoaded', () => {
  // Sidebar móvil.
  const toggleBtn = document.getElementById('filterToggle')
  const sidebar = document.getElementById('mobileSidebar')

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('open')

      if (isOpen) {
        sidebar.classList.remove('open')
        setTimeout(() => {
          sidebar.style.display = 'none'
        }, 300)
      } else {
        sidebar.style.display = 'flex'
        setTimeout(() => {
          sidebar.classList.add('open')
        }, 10)
      }
    })

    // Cerrar Sidebar móvil hacer clic fuera.
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('open')
        setTimeout(() => {
          sidebar.style.display = 'none'
        }, 300)
      }
    })
  }

  // Clean Filters.
  document.getElementById('cleanFilter').addEventListener('click', () => {
    window.location.href = window.location.pathname
  })

  // Clean null paths.
  document.getElementById('shop_filters').addEventListener('submit', function (e) {
    e.preventDefault()
    const form = e.target
    const params = new URLSearchParams()

    Array.from(form.elements).forEach(el => {
      if (el.name && el.value.trim() !== '') {
        params.append(el.name, el.value.trim())
      }
    })

    window.location.href = `${form.action}?${params.toString()}`
  })
})
