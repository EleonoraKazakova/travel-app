import { tripsFilter } from "../src/server/tripsFilter"

describe("Filter dates", () => {
  test("Testing the tripsFilter() function", () => {
    expect(tripsFilter ( [{'date': '2020-01-01'}, {'date': '2080-01-01'}] ) ).toEqual([{'date': '2080-01-01'}, {'date': '2020-01-01'}])
  })
})