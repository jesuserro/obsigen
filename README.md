# Obsigen

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/jesuserro/obsigen?style=for-the-badge&sort=semver)](https://github.com/jesuserro/obsigen/releases)
[![GitHub issues](https://img.shields.io/github/issues/jesuserro/obsigen?style=for-the-badge)](https://github.com/jesuserro/obsigen/issues)
[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-orange?style=flat&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/jesuserro)

Just another customized Digital Garden based on Obsidian. (<https://obsidian.md>).

ObsiGen — aka "Obsidian Note Generator" — is a BETA plugin designed to enhance your note-taking experience within the Obsidian platform. With this plugin, you can create various types of notes, including daily notes, anniversary notes, memorable moments, and even capture content from platforms like Twitter and YouTube.

In the near future, I'm planning to introduce a monthly calendar view that will display all your events using descriptive icons. This calendar-like overview will provide a visual representation of your notes, offering a comprehensive and intuitive way to navigate and explore your daily events.

## Features

This project uses Typescript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

**Note:** The Obsidian API is still in early alpha and is subject to change at any time!

This sample plugin demonstrates some of the basic functionality the plugin API can do.

- Adds a ribbon icon, which shows a Notice when clicked.
- Adds a command "Open Sample Modal" which opens a Modal.
- Adds a plugin setting tab to the settings page.
- Registers a global click event and output 'click' to the console.
- Registers a global interval which logs 'setInterval' to the console.

## Commands

``` shell
-- install dependencies Rollup for compile plugin
npm install rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve
npm install rollup-plugin-copy

npx rollup -c
```

## First time developing plugins?

Quick starting guide for new plugin devs:

- Check if [someone already developed a plugin for what you want](https://obsidian.md/plugins)! There might be an existing plugin similar enough that you can partner up with.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then run `npm i` in the command line under your repo folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under your repo folder.

## Releasing new releases

- Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
- Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: <https://github.com/obsidianmd/obsidian-sample-plugin/releases>
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
- Publish the release.

> You can simplify the version bump process by running `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.
> The command will bump version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`

## Adding your plugin to the community plugin list

- Check <https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md>
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at <https://github.com/obsidianmd/obsidian-releases> to add your plugin.

## How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)

- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code.
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`

## Folder Structure
Following the DDD principles, the project is divided into three layers: core, adapters and shared.
```
obsigen
├─ .babelrc
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc
├─ .gitignore
├─ .npmrc
├─ README.md
├─ babel.config.js
├─ esbuild.config.mjs
├─ jest.config.js
├─ main.ts
├─ manifest.json
├─ package-lock.json
├─ package.json
├─ src
│  ├─ adapters
│  │  └─ Obsidian
│  │     ├─ MenuPrincipal.ts
│  │     ├─ PromptModal.ts
│  │     ├─ SampleModal.ts
│  │     └─ SampleSettingTab.ts
│  └─ core
│     ├─ notes
│     │  ├─ NoteGenerator.test.ts
│     │  ├─ NoteGenerator.ts
│     │  ├─ aniversario
│     │  │  ├─ Aniversario.test.ts
│     │  │  └─ Aniversario.ts
│     │  └─ momento
│     │     └─ Momento.ts
│     └─ shared
│        ├─ Subheader.ts
│        ├─ interface
│        │  ├─ MyPluginSettings.ts
│        │  └─ Yaml.ts
│        └─ templates
│           └─ Yaml.tsx
├─ styles.css
├─ tsconfig.json
├─ var
│  ├─ NoteGenerator.ts
│  ├─ NoteGeneratorAllInOne.ts
│  ├─ NoteGeneratorCaller.ts
│  └─ template.yaml
├─ version-bump.mjs
└─ versions.json

```

## API Documentation

See <https://github.com/obsidianmd/obsidian-api>

## Funding

[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-orange?style=flat&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/jesuserro)
