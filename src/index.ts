import { Client } from "discord.js";

export class DisposableClient<
	Ready extends boolean = boolean,
> extends Client<Ready> {
	async [Symbol.asyncDispose]() {
		await this.destroy();
	}
}
