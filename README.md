# Obsigen

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/jesuserro/obsigen?style=for-the-badge&sort=semver)](https://github.com/jesuserro/obsigen/releases)
[![GitHub issues](https://img.shields.io/github/issues/jesuserro/obsigen?style=for-the-badge)](https://github.com/jesuserro/obsigen/issues)

Just another customized Digital Garden based on Obsidian. (<https://obsidian.md>).

ObsiGen — aka "Obsidian Note Generator" — is a BETA plugin designed to enhance your note-taking experience within the Obsidian platform. With this plugin, you can create various types of notes, including daily notes, anniversary notes, memorable moments, and even capture content from platforms like Twitter and YouTube.

In the near future, I'm planning to introduce a monthly calendar view that will display all your events using descriptive icons. This calendar-like overview will provide a visual representation of your notes, offering a comprehensive and intuitive way to navigate and explore your daily events.

## Folder Structure
Following the DDD principles, the project is divided into three layers: core, adapters and shared.
```
📦src
 ┣ 📂adapters
 ┃ ┗ 📂Obsidian
 ┃ ┃ ┣ 📜MenuPrincipal.ts
 ┃ ┃ ┣ 📜PromptModal.ts
 ┃ ┃ ┣ 📜SampleModal.ts
 ┃ ┃ ┗ 📜SampleSettingTab.ts
 ┣ 📂assets
 ┃ ┗ 📜church.js
 ┣ 📂core
 ┃ ┣ 📂notes
 ┃ ┃ ┣ 📂__mocks__
 ┃ ┃ ┃ ┗ 📜obsidian.ts
 ┃ ┃ ┣ 📂aniversario
 ┃ ┃ ┃ ┣ 📜Aniversario.test.ts
 ┃ ┃ ┃ ┣ 📜Aniversario.ts
 ┃ ┃ ┃ ┣ 📜AniversarioSubheader.ts
 ┃ ┃ ┃ ┗ 📜AniversarioYaml.tsx
 ┃ ┃ ┣ 📂biblia
 ┃ ┃ ┃ ┗ 📂versiculo
 ┃ ┃ ┣ 📂calendar
 ┃ ┃ ┃ ┣ 📜Calendar.ts
 ┃ ┃ ┃ ┣ 📜CalendarDay.tsx
 ┃ ┃ ┃ ┣ 📜CalendarMonth.tsx
 ┃ ┃ ┃ ┣ 📜CalendarTitle.tsx
 ┃ ┃ ┃ ┗ 📜CalendarView.ts
 ┃ ┃ ┣ 📂captureUrl
 ┃ ┃ ┃ ┣ 📜CaptureUrl.test.ts
 ┃ ┃ ┃ ┣ 📜CaptureUrl.ts
 ┃ ┃ ┃ ┣ 📜CaptureUrlModal.ts
 ┃ ┃ ┃ ┣ 📜CaptureUrlSubheader.ts
 ┃ ┃ ┃ ┣ 📜CaptureUrlYaml.tsx
 ┃ ┃ ┃ ┗ 📜captureUrlModal.module.css
 ┃ ┃ ┣ 📂daily
 ┃ ┃ ┃ ┣ 📜Daily.ts
 ┃ ┃ ┃ ┣ 📜DailySubheader.ts
 ┃ ┃ ┃ ┗ 📜DailyYaml.tsx
 ┃ ┃ ┣ 📂momento
 ┃ ┃ ┃ ┣ 📜Momento.ts
 ┃ ┃ ┃ ┣ 📜MomentoSubheader.ts
 ┃ ┃ ┃ ┗ 📜MomentoYaml.tsx
 ┃ ┃ ┣ 📜NoteGenerator.test.ts
 ┃ ┃ ┗ 📜NoteGenerator.ts
 ┃ ┗ 📂shared
 ┃ ┃ ┣ 📂interface
 ┃ ┃ ┃ ┣ 📜MyPluginSettings.ts
 ┃ ┃ ┃ ┗ 📜iYaml.ts
 ┃ ┃ ┗ 📂templates
 ┃ ┃ ┃ ┗ 📜Yaml.tsx
 ┗ 📜styles.scss
 ┗ 📜main.ts
 ┗ 📜manifest.json
 ┗ 📜esbuild.config.mjs
 ┗ 📜package.json
 ┗ 📜tsconfig.json
 ┗ 📜versions.json
```

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
## Installing the plugin
- Clone the plugin into your vault `VaultFolder/.obsidian/plugins/`.
## Funding
[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-orange?style=flat&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/jesuserro)