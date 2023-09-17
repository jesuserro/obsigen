# Obsigen

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/jesuserro/obsigen?style=for-the-badge&sort=semver)](https://github.com/jesuserro/obsigen/releases)
[![GitHub issues](https://img.shields.io/github/issues/jesuserro/obsigen?style=for-the-badge)](https://github.com/jesuserro/obsigen/issues)

Displaying your Obsidian notes in a year calendar view through icons. 
Use the yaml frontmatter to add the date and icon to your notes. The plugin will read the yaml and display the notes in the calendar view. The icon is defined on "tag" property.

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
 ┃ ┃ ┃ ┣ 📜CalendarIcon.tsx
 ┃ ┃ ┃ ┣ 📜CalendarMonth.tsx
 ┃ ┃ ┃ ┣ 📜CalendarTitle.tsx
 ┃ ┃ ┃ ┣ 📜CalendarView.ts
 ┃ ┃ ┃ ┗ 📜CalendarYear.tsx
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
## Installing the plugin
- Clone the plugin into your vault `VaultFolder/.obsidian/plugins/`.
## Funding
[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-orange?style=flat&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/jesuserro)