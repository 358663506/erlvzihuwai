export declare type Pipe =
	| "number"
	| "string"
	| "split"
	| "join"
	| "boolean"
	| "booleanNumber"
	| "datetimerange"
	| Array<Pipe>
	| Function;

declare interface Fn {
	bind?: Pipe;
	submit?: Pipe;
}

export declare type FormHook = string | Fn;
