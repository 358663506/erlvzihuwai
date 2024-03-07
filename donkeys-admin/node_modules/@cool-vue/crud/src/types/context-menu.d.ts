export declare interface ContextMenuItem {
	label: string;
	icon?: string;
	"prefix-icon"?: string;
	"suffix-icon"?: string;
	ellipsis?: boolean;
	disabled?: boolean;
	hidden?: boolean;
	children?: Array<ContextMenuItem>;
	showChildren?: boolean;
	callback?(item: ContextMenuItem, done: Function): void;
}

export declare interface ContextMenuOptions {
	list?: ContextMenuItem[];
}

export declare interface ClContextMenu {
	open(e: any, options: ContextMenuOptions): ClContextMenu;
	close(): void;
}
