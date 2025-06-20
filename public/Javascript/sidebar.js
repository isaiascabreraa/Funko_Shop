document.addEventListener('DOMContentLoaded', () => {
  // Sidebar móvil.
  const toggleBtn = document.getElementById('filterToggle')
  const sidebar = document.getElementById('mobileSidebar')
  const cleanFilterBtn = document.getElementById('cleanFilter')
  const shopFiltersForm = document.getElementById('shop_filters')

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', toggleSidebar)
    document.addEventListener('click', handleClickOutside)
  }

  if (cleanFilterBtn) {
    cleanFilterBtn.addEventListener('click', () => {
      window.location.href = window.location.pathname
    })
  }

  if (shopFiltersForm) {
    shopFiltersForm.addEventListener('submit', handleFilterSubmit)
  }

  function toggleSidebar () {
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
  }

  function handleClickOutside (e) {
    if (
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      sidebar.classList.remove('open')
      setTimeout(() => {
        sidebar.style.display = 'none'
      }, 300)
    }
  }

  function handleFilterSubmit (e) {
    e.preventDefault()
    const form = e.target
    const params = new URLSearchParams()

    Array.from(form.elements).forEach(el => {
      if (el.name && el.value.trim() !== '') {
        params.append(el.name, el.value.trim())
      }
    })

    window.location.href = `${form.action}?${params.toString()}`
  }
})
