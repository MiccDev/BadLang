export type Base4Number = "0" | "1" | "2" | "3";

export type Concat<T extends string[]> = T extends [
	infer F extends string,
	...infer R extends string[]
]
	? `${F}${Concat<R>}`
	: "";
export type MemoryLike = Concat<
	[
		Base4Number,
		Base4Number,
		Base4Number,
		Base4Number,
		Base4Number,
		Base4Number,
		Base4Number,
		Base4Number
	]
>;

export type Register = "a" | "b" | "c";

export class Memory {
	private stack: MemoryLike[];
	private pointers: Map<string, number>;

	private registers: Record<Register, number>;

	constructor() {
		this.stack = [];
		this.pointers = new Map();

		const calculateRegisterIndex = (index: number) => index * 4 + 8;

		this.registers = {
			a: calculateRegisterIndex(1),
			b: calculateRegisterIndex(2),
			c: calculateRegisterIndex(3),
		};
	}

	fromBase(memory: MemoryLike): number {
		return parseInt(memory, 4);
	}

	fromNumeric(num: number): MemoryLike {
		return num.toString(4) as MemoryLike;
	}

	fromRegister(name: Register, value?: MemoryLike): MemoryLike {
		return this.fromStack(this.registers[name], value);
	}

	fromStack(address: number, value?: MemoryLike): MemoryLike {
		if (value) {
			this.stack[address] = value;
			return value;
		}
		return this.stack[address] ?? "00000000";
	}

	fromPointer(name: string, value?: MemoryLike): MemoryLike {
		const address = this.pointers.get(name);
		if (!address) return "00000000";

		if (value) {
			this.stack[address] = value;
			return value;
		}
		return this.stack[address] ?? "00000000";
	}

	pointer(name: string, pointsTo: number): MemoryLike {
		this.pointers.set(name, pointsTo);
		return this.stack[pointsTo] ?? "00000000";
	}
}
