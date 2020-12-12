const createTrip = async (data) => {
  const res = await fetch('/trip', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  try {
    const newData = await res.json()
    return newData
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * make request to backend
 */
const deleteTrip = async (id) => {
  const res = await fetch(`/delete/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  })

  try {
    return await res.json()
  } catch (error) {
    console.log('error', error)
  }
}

/**got data from backend*/
const getSavedCityData = async () => {
  const res = await fetch('/trip')
  try {
    return await res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export { createTrip, deleteTrip, getSavedCityData}