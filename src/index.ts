import * as fs from "fs";
import * as path from "path";

export class ParkingLot {
  private capacity: number;
  private slots: (string | null)[];
  private charges: { [key: string]: number };

  constructor(capacity: number) {
    this.capacity = capacity;
    this.slots = Array(this.capacity).fill(null);
    this.charges = {};
  }

  createParkingLot(size: number): void {
    this.capacity = size;
    this.slots = Array(size).fill(null);
    console.log(`Created parking lot with ${size} slots`);
  }

  park(carNumber: string): void {
    const slotIndex = this.slots.findIndex((slot) => slot === null);
    if (slotIndex !== -1) {
      this.slots[slotIndex] = carNumber;
      console.log(`Allocated slot number: ${slotIndex + 1}`);
    } else {
      console.log("Sorry, parking lot is full");
    }
  }

  leave(carNumber: string, hours: number): void {
    const slotIndex = this.slots.findIndex((slot) => slot === carNumber);
    if (slotIndex !== -1) {
      this.slots[slotIndex] = null;
      const charge = 10 + (hours > 2 ? (hours - 2) * 10 : 0);
      this.charges[carNumber] = charge;
      console.log(
        `Registration number ${carNumber} with Slot Number ${
          slotIndex + 1
        } is free with Charge ${charge}`
      );
    } else {
      console.log(`Registration number ${carNumber} not found`);
    }
  }

  status(): void {
    console.log("Slot No.  Registration No.");
    this.slots.forEach((car, index) => {
      if (car !== null) {
        console.log(`${index + 1}   ${car}`);
      }
    });
  }

  processCommands(commands: string[]): void {
    commands.forEach((command) => {
      const parts = command.split(" ");
      switch (parts[0]) {
        case "create_parking_lot":
          this.createParkingLot(parseInt(parts[1], 10));
          break;
        case "park":
          this.park(parts[1]);
          break;
        case "leave":
          this.leave(parts[1], parseInt(parts[2], 10));
          break;
        case "status":
          this.status();
          break;
        default:
          console.log("Unknown command");
      }
    });
  }
}

if (require.main === module) {
  if (process.argv.length !== 3) {
    console.log("Usage: node index.js <input_file>");
    process.exit(1);
  }

  const inputFilePath = path.resolve(__dirname, "../", process.argv[2]);
  const commands = fs
    .readFileSync(inputFilePath, "utf-8")
    .split("\n")
    .filter(Boolean);

  const parkingLot = new ParkingLot(0);
  parkingLot.processCommands(commands);
}
