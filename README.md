<h1 align="center">Disposable Discord Client</h1>

<p align="center">An extension to the discord.js `Client` class with `[Symbol.asyncDispose]` added. 🚮</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="All Contributors: 1 👪" src="https://img.shields.io/badge/all_contributors-1_👪-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/disposable-discord-client/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
	<a href="https://github.com/JoshuaKGoldberg/disposable-discord-client/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/disposable-discord-client?color=21bb42"></a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
	<img alt="npm package version" src="https://img.shields.io/npm/v/disposable-discord-client?color=21bb42" />
</p>

## Usage

```shell
npm i disposable-discord-client
```

```ts
import { DisposableClient } from "disposable-discord-client";

await using client = new DisposableClient(/* ... */);

await client.login();
```

`DisposableClient` takes all the same type and value parameters as `Client`.

In fact, its implementation is small enough to fit here!

```ts
import { Client } from "discord.js";

export class DisposableClient<
	Ready extends boolean = boolean,
> extends Client<Ready> {
	async [Symbol.asyncDispose]() {
		await this.destroy();
	}
}
```

## What?

[Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management) is a TC39 proposal to add explicit syntax for situations where a resource should have some method called upon disposal.
It's stage 3 now and [supported in TypeScript >=5.2](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management).

The [discord.js `Client` class](https://discord.js.org/docs/packages/discord.js/main/Client:Class) is a good example of a disposable resource.
When a `Client` instance is no longer needed, its [`destroy()`](https://discord.js.org/docs/packages/discord.js/main/Client:Class#destroy) should generally be called:

```ts
try {
	const client = new Client(/* ... */);
	await client.login();
} finally {
	await client.destroy();
}
```

One gotcha is that if the `( use the client)` bit throws, the `await client.destroy()` won't run - unless you `try`/`catch` or `try`/(`catch`/)`finally`). This is a common gotcha in async code.

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/disposable-discord-client/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/disposable-discord-client/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app).
