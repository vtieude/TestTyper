import { expect } from "chai";
import { ValidateFlight } from "../util/validation"; // Assuming your math functions are in a file named math.ts inside the src directory
import { FlightInput } from "../models/flight";
import { ReorderFlight } from "../util/helper";
import _ from "lodash";

describe("Validate flight list functions", () => {
  it("Should return empty list", () => {
    expect(ValidateFlight([])).to.equal("Empty flight");
  });

  it("shoul return invalid input flight", () => {
    expect(
      ValidateFlight([
        {
          from: "A",
          to: "",
        },
      ])
    ).to.equal("Invalid flight input");
  });
  const flightInput = [];
  flightInput.push({
    from: "A",
    to: "B",
  });
  flightInput.push({
    from: "C",
    to: "D",
  });
  it("should return Orphan flight", () => {
    expect(ValidateFlight(flightInput)).to.equal("Orphan flight");
  });

  it("should return Orphan flight when length equal 1", () => {
    expect(ValidateFlight([{ from: "C", to: "D" }])).to.equal("Orphan flight");
  });

  it("should return douple destination flight", () => {
    expect(
      ValidateFlight([
        {
          from: "A",
          to: "B",
        },
        {
          from: "B",
          to: "C",
        },
        {
          from: "C",
          to: "D",
        },
        {
          from: "D",
          to: "C",
        },
      ])
    ).to.equal("Douple destination flight");
  });

  const correctOrder = [
    {
      from: "A",
      to: "B",
    },
    {
      from: "B",
      to: "C",
    },
    {
      from: "C",
      to: "D",
    },
    {
      from: "D",
      to: "E",
    },
    {
      from: "E",
      to: "G",
    },
  ];

  it("should return order v1", () => {
    const orderedArray = ReorderFlight([
      {
        from: "A",
        to: "B",
      },
      {
        from: "B",
        to: "C",
      },
      {
        from: "E",
        to: "G",
      },
      {
        from: "C",
        to: "D",
      },
      {
        from: "D",
        to: "E",
      },
    ]);
    expect(checkTheSameObjectFlight(orderedArray, correctOrder)).to.equal(true);
  });
});

function checkTheSameObjectFlight(list1: FlightInput[], list2: FlightInput[]) {
  if (list1.length !== list2.length) {
    return false;
  }
  for (let i = 0; i < list1.length; i++) {
    if (!_.isEqual(list1[i], list2[i])) {
      return false;
    }
  }
  return true;
}
