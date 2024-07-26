import { ParkingLot } from "../index";
import { expect } from "chai";
import sinon from "sinon";
import "mocha";

describe("ParkingLot", () => {
  let parkingLot: ParkingLot;

  beforeEach(() => {
    parkingLot = new ParkingLot(0);
  });

  it("should create parking lot with given capacity", () => {
    parkingLot.createParkingLot(6);
    expect(parkingLot["slots"].length).to.equal(6);
  });

  it("should park a car", () => {
    parkingLot.createParkingLot(1);
    const consoleSpy = sinon.spy(console, "log");
    parkingLot.park("KA-01-HH-1234");
    expect(parkingLot["slots"][0]).to.equal("KA-01-HH-1234");
    expect(consoleSpy.calledWith("Allocated slot number: 1")).to.be.true;
    consoleSpy.restore();
  });

  it("should not park a car if parking lot is full", () => {
    parkingLot.createParkingLot(1);
    parkingLot.park("KA-01-HH-1234");
    const consoleSpy = sinon.spy(console, "log");
    parkingLot.park("KA-01-HH-9999");
    expect(consoleSpy.calledWith("Sorry, parking lot is full")).to.be.true;
    consoleSpy.restore();
  });

  it("should leave a car and calculate charge", () => {
    parkingLot.createParkingLot(1);
    parkingLot.park("KA-01-HH-1234");
    const consoleSpy = sinon.spy(console, "log");
    parkingLot.leave("KA-01-HH-1234", 4);
    expect(parkingLot["slots"][0]).to.be.null;
    expect(parkingLot["charges"]["KA-01-HH-1234"]).to.equal(30);
    expect(
      consoleSpy.calledWith(
        "Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30"
      )
    ).to.be.true;
    consoleSpy.restore();
  });

  it("should display parking lot status", () => {
    parkingLot.createParkingLot(2);
    parkingLot.park("KA-01-HH-1234");
    parkingLot.park("KA-01-HH-9999");
    const consoleSpy = sinon.spy(console, "log");
    parkingLot.status();
    expect(consoleSpy.calledWith("Slot No.  Registration No.")).to.be.true;
    expect(consoleSpy.calledWith("1   KA-01-HH-1234")).to.be.true;
    expect(consoleSpy.calledWith("2   KA-01-HH-9999")).to.be.true;
    consoleSpy.restore();
  });

  it("should process commands from array", () => {
    const commands = [
      "create_parking_lot 2",
      "park KA-01-HH-1234",
      "park KA-01-HH-9999",
      "leave KA-01-HH-1234 4",
      "status",
    ];
    const consoleSpy = sinon.spy(console, "log");
    parkingLot.processCommands(commands);
    expect(parkingLot["slots"]).to.deep.equal([null, "KA-01-HH-9999"]);
    expect(parkingLot["charges"]["KA-01-HH-1234"]).to.equal(30);
    expect(consoleSpy.calledWith("Created parking lot with 2 slots")).to.be
      .true;
    expect(consoleSpy.calledWith("Allocated slot number: 1")).to.be.true;
    expect(consoleSpy.calledWith("Allocated slot number: 2")).to.be.true;
    expect(
      consoleSpy.calledWith(
        "Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30"
      )
    ).to.be.true;
    expect(consoleSpy.calledWith("Slot No.  Registration No.")).to.be.true;
    expect(consoleSpy.calledWith("2   KA-01-HH-9999")).to.be.true;
    consoleSpy.restore();
  });
});
