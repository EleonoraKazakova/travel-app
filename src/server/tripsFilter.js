const tripsFilter = (trips) => {
  let dateLong = trips.filter(a => new Date(a.date).getTime() >= new Date().getTime())
  let dateShort = trips.filter(a => new Date(a.date).getTime() < new Date().getTime())
  return dateLong.concat(dateShort)
}

module.exports = { tripsFilter }