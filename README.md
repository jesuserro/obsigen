# Obsigen

[![react](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![styledcomponents](https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)](https://styled-components.com/)
[![obsidian](https://img.shields.io/badge/obsidian-7C3AED?style=for-the-badge&logo=obsidian&logoColor=white)](https://obsidian.md/)
[![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/jesuserro/obsigen?style=for-the-badge&sort=semver)](https://github.com/jesuserro/obsigen/releases/)
[![GitHub issues](https://img.shields.io/github/issues/jesuserro/obsigen?style=for-the-badge)](https://github.com/jesuserro/obsigen/issues/)

Displaying your Obsidian notes in a year calendar view through icons. 
Use the yaml frontmatter to add the date and icon to your notes. The plugin will read the yaml and display the notes in the calendar view. The icon is defined on "tag" property.

## Folder Structure
Following the DDD principles, the project is divided into three layers: core, adapters and shared.
```
📦obsigen
 ┣ 📂src
 ┃ ┣ 📂adapters
 ┃ ┃ ┗ 📂Obsidian
 ┃ ┃ ┃ ┣ 📜MenuPrincipal.ts
 ┃ ┃ ┃ ┣ 📜PromptModal.ts
 ┃ ┃ ┃ ┣ 📜SampleModal.ts
 ┃ ┃ ┃ ┗ 📜SampleSettingTab.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📜church.js
 ┃ ┣ 📂core
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┗ 📜useApp.ts
 ┃ ┃ ┣ 📂notes
 ┃ ┃ ┃ ┣ 📂__mocks__
 ┃ ┃ ┃ ┃ ┗ 📜obsidian.ts
 ┃ ┃ ┃ ┣ 📂aniversario
 ┃ ┃ ┃ ┃ ┣ 📜Aniversario.test.ts
 ┃ ┃ ┃ ┃ ┗ 📜Aniversario.ts
 ┃ ┃ ┃ ┣ 📂biblia
 ┃ ┃ ┃ ┃ ┗ 📂versiculo
 ┃ ┃ ┃ ┣ 📂calendar
 ┃ ┃ ┃ ┃ ┣ 📜Calendar.ts
 ┃ ┃ ┃ ┃ ┣ 📜CalendarDay.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CalendarIcon.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CalendarMonth.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CalendarTitle.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CalendarView.ts
 ┃ ┃ ┃ ┃ ┗ 📜CalendarYear.tsx
 ┃ ┃ ┃ ┣ 📂captureUrl
 ┃ ┃ ┃ ┃ ┣ 📜CaptureUrl.test.ts
 ┃ ┃ ┃ ┃ ┣ 📜CaptureUrl.ts
 ┃ ┃ ┃ ┃ ┣ 📜CaptureUrlModal.ts
 ┃ ┃ ┃ ┃ ┗ 📜captureUrlModal.module.css
 ┃ ┃ ┃ ┣ 📂daily
 ┃ ┃ ┃ ┃ ┗ 📜Daily.ts
 ┃ ┃ ┃ ┣ 📂momento
 ┃ ┃ ┃ ┃ ┗ 📜Momento.ts
 ┃ ┃ ┃ ┣ 📜NoteGenerator.test.ts
 ┃ ┃ ┃ ┗ 📜NoteGenerator.ts
 ┃ ┃ ┗ 📂shared
 ┃ ┃ ┃ ┣ 📂interface
 ┃ ┃ ┃ ┃ ┣ 📜MyPluginSettings.ts
 ┃ ┃ ┃ ┃ ┗ 📜iYaml.ts
 ┃ ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┃ ┗ 📜Yaml.tsx
 ┃ ┃ ┃ ┗ 📜appContext.ts
 ┃ ┣ 📜main.ts
 ┃ ┣ 📜styles.css
 ┃ ┗ 📜styles.scss
 ┣ 📂var
 ┃ ┣ 📜MonthView.ts
 ┃ ┣ 📜NoteGenerator.ts
 ┃ ┣ 📜NoteGeneratorAllInOne.ts
 ┃ ┣ 📜NoteGeneratorCaller.ts
 ┃ ┗ 📜template.yaml
 ┣ 📜.babelrc
 ┣ 📜.editorconfig
 ┣ 📜.eslintignore
 ┣ 📜.eslintrc
 ┣ 📜.gitignore
 ┣ 📜.npmrc
 ┣ 📜README.md
 ┣ 📜babel.config.js
 ┣ 📜esbuild.config.mjs
 ┣ 📜jest.config.js
 ┣ 📜manifest.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┣ 📜version-bump.mjs
 ┗ 📜versions.json
```
## Installing the plugin
- Clone the plugin into your vault `VaultFolder/.obsidian/plugins/`.
## Links
- [Use React in your plugin](https://docs.obsidian.md/Plugins/Getting+started/Use+React+in+your+plugin)
## Inspired by
- [Obsidian Full Calendar](https://github.com/davish/obsidian-full-calendar)
- [Full Calendar](https://github.com/fullcalendar/fullcalendar)
- [ODIN - Obsidian Driven Information Network](https://github.com/memgraph/odin)
## Funding
[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-orange?style=flat&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/jesuserro)