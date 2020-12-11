import { isOld } from "../src/client/js/reqGeoname"

describe("Comparing dates", () => {
  test("Testing the isOld() function", () => {
    expect(isOld('2020-01-01')).toEqual(true)
    expect(isOld('2080-01-01')).toEqual(false)
  })
})