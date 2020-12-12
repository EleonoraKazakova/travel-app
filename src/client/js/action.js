import {renderTrip} from './renderTrip'
import { createTrip, getSavedCityData } from './requests'

function action() {
  const city = document.getElementById('city').value
  const date = document.getElementById('date').value
  const dateEnd = document.getElementById('dateEnd').value

  createTrip({ city, date, dateEnd }).then(renderTrip)
}

getSavedCityData().then(renderTrip)

export { action }