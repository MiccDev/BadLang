import { Memory } from "./Memory";

export class VirtualMachine {
	readonly memory: Memory;

	constructor() {
		this.memory = new Memory();
	}
}
