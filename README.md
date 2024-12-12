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
 ┣📦src
 ┣ 📂adapters
 ┃ ┗ 📂Obsidian
 ┃ ┃ ┣ 📜MenuPrincipal.ts
 ┃ ┃ ┣ 📜PromptModal.ts
 ┃ ┃ ┣ 📜SampleModal.ts
 ┃ ┃ ┗ 📜SampleSettingTab.ts
 ┣ 📂assets
 ┃ ┗ 📜church.js
 ┣ 📂core
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useApp.ts
 ┃ ┣ 📂notes
 ┃ ┃ ┣ 📂__mocks__
 ┃ ┃ ┃ ┗ 📜obsidian.ts
 ┃ ┃ ┣ 📂aniversario
 ┃ ┃ ┃ ┣ 📜Aniversario.test.ts
 ┃ ┃ ┃ ┗ 📜Aniversario.ts
 ┃ ┃ ┣ 📂biblia
 ┃ ┃ ┃ ┗ 📂versiculo
 ┃ ┃ ┣ 📂calendar
 ┃ ┃ ┃ ┣ 📜Calendar.ts
 ┃ ┃ ┃ ┣ 📜CalendarDay.scss
 ┃ ┃ ┃ ┣ 📜CalendarDay.tsx
 ┃ ┃ ┃ ┣ 📜CalendarEvent.scss
 ┃ ┃ ┃ ┣ 📜CalendarEvent.ts
 ┃ ┃ ┃ ┣ 📜CalendarIcon.scss
 ┃ ┃ ┃ ┣ 📜CalendarIcon.tsx
 ┃ ┃ ┃ ┣ 📜CalendarMonth.scss
 ┃ ┃ ┃ ┣ 📜CalendarMonth.tsx
 ┃ ┃ ┃ ┣ 📜CalendarTitle.tsx
 ┃ ┃ ┃ ┣ 📜CalendarView.ts
 ┃ ┃ ┃ ┣ 📜CalendarYear.scss
 ┃ ┃ ┃ ┣ 📜CalendarYear.tsx
 ┃ ┃ ┃ ┗ 📜calendar.scss
 ┃ ┃ ┣ 📂captureUrl
 ┃ ┃ ┃ ┣ 📜CaptureUrl.test.ts
 ┃ ┃ ┃ ┣ 📜CaptureUrl.ts
 ┃ ┃ ┃ ┣ 📜CaptureUrlModal.scss
 ┃ ┃ ┃ ┗ 📜CaptureUrlModal.ts
 ┃ ┃ ┣ 📂daily
 ┃ ┃ ┃ ┗ 📜Daily.ts
 ┃ ┃ ┣ 📂momento
 ┃ ┃ ┃ ┗ 📜Momento.ts
 ┃ ┃ ┣ 📜NoteGenerator.test.ts
 ┃ ┃ ┗ 📜NoteGenerator.ts
 ┃ ┗ 📂shared
 ┃ ┃ ┣ 📂interface
 ┃ ┃ ┃ ┣ 📜MyPluginSettings.ts
 ┃ ┃ ┃ ┗ 📜iYaml.ts
 ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┗ 📜Yaml.tsx
 ┃ ┃ ┗ 📜appContext.ts
 ┣ 📂ui
 ┃ ┗ 📜common.scss
 ┣ 📜main.ts
 ┣ 📜styles.css
 ┗ 📜styles.scss
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

## Installation

To install and set up the "Obsigen" project on a new environment using Ubuntu on WSL2, follow these steps:

### Step 1: Install Node.js and npm

```bash
# Update the system and repositories
sudo apt update
sudo apt upgrade

# Install Node.js (LTS version)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Verify the installation
node -v
npm -v
```

### Step 2: Clone the repository

```bash
# Navigate to your working directory
cd ~

# Clone the GitHub repository
git clone https://github.com/jesuserro/obsigen.git
cd obsigen
```

### Step 3: Install project dependencies

```bash
# Install all dependencies listed in package.json
npm install
```

### Step 4: Create the `dataurls.ts` file

To generate the `dataurls.ts` file in the `src/assets/icons` folder, run the following commands:

```bash
# Create the directory if it doesn't exist
mkdir -p src/assets/icons

# Create the dataurls.ts file
touch src/assets/icons/dataurls.ts

# Optional: Add an initial comment to the file
echo "// Placeholder for data URLs" > src/assets/icons/dataurls.ts
```

### Step 5: Configure the environment variables

Create a .env file in the root of your project by copying the provided .env.example:

```bash
cp .env.example .env

#Edit the .env file to set the output directory path:
OUTPUT_DIR=/mnt/c/Users/jesus/Documents/vault/.obsidian/plugins/obsigen
```

### Step 6: Install dotenv and create the tsconfig and copy scripts

Install dotenv:

```bash
npm install dotenv --save
```

### Step 7: Install missing dependencies

Ensure you have turndown and its type declarations installed:

```bash
# Install turndown and its type declarations
npm install turndown --save
npm install @types/turndown --save-dev
```

### Step 8: Clean and rebuild the project

Clean the cache and rebuild the project to ensure all dependencies are properly configured:

```bash
# Clean TypeScript cache and node_modules
rm -rf node_modules
rm -rf dist
npm install

# Rebuild the project
npm run build
```

### Step 9: Run the development environment

```bash
# Start the development environment
npm run dev
```

### (Optional) Update npm

```bash
# Update npm to the latest version
sudo npm install -g npm@latest
```

By following these steps, you should have your project configured and ready to use in your new environment. If you encounter any issues or need further assistance, feel free to consult the documentation or open an issue on the repository.

## Links

- [Use React in your plugin](https://docs.obsidian.md/Plugins/Getting+started/Use+React+in+your+plugin)

### Icons

- [Obsidian Icons](https://docs.obsidian.md/Plugins/User+interface/Icons)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Lucide](https://lucide.dev/icons/)
- [Hexadecimal Color Picker](https://www.google.com/search?q=hexadecimal+color+picker)

## Inspired by

- [Obsidian Full Calendar](https://github.com/davish/obsidian-full-calendar)
- [Full Calendar](https://github.com/fullcalendar/fullcalendar)
- [Full Calendar Demos](https://fullcalendar.io/demos)
- [ODIN - Obsidian Driven Information Network](https://github.com/memgraph/odin)

## Funding

[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-orange?style=flat&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/jesuserro)
