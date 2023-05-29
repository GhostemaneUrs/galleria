function showInstallPrompt() {
  const deferredPrompt = window.deferredPrompt

  if (deferredPrompt) {
    deferredPrompt.prompt()

    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario ha aceptado instalar la aplicación.')
      } else {
        console.log('El usuario ha rechazado la instalación de la aplicación.')
      }
      window.deferredPrompt = null
    })
  }
}

window.addEventListener('beforeinstallprompt', event => {
  // Prevenir que se muestre el prompt nativo
  event.preventDefault()

  // Guardar el prompt diferido para usarlo más tarde
  window.deferredPrompt = event
})
