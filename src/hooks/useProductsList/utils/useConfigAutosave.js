import React from 'react'

function useConfigAutosave(saveFn) {
  React.useEffect(() => makeSaveOnUnmount(saveFn), [])

  React.useEffect(() => {
    const saveOnPageClose = makeSaveOnPageClose(saveFn)
    window.addEventListener('beforeunload', saveOnPageClose)
    return () => {
      window.removeEventListener('beforeunload', saveOnPageClose)
    }
  }, [])

  React.useEffect(() => {
    const saveOnTabUnfocus = makeSaveOnTabUnfocus(saveFn)
    document.addEventListener('visibilitychange', saveOnTabUnfocus)
    return () => {
      document.removeEventListener('visibilitychange', saveOnTabUnfocus)
    }
  }, [])
}

function makeSaveOnUnmount(save) {
  return function () {
    save()
  }
}

function makeSaveOnPageClose(save) {
  // TODO: raise prompt only once (save then allow close)
  return function (e) {
    // if tab has focus will ask confirmation to close
    // e.preventDefault()
    // e.returnValue = ''
    save()
  }
}

function makeSaveOnTabUnfocus(save) {
  return function () {
    if (document.visibilityState == 'hidden') {
      save()
    }
  }
}

export default useConfigAutosave
