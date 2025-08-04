import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import config from './tailwind.scan.config.js'
import { generateUtilitiesCSS } from './generateUtilitiesCSS.js'

const TEMP_DIR = './.temp-tailwind-input'
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true })
if (!fs.existsSync(config.outputDir)) fs.mkdirSync(config.outputDir, { recursive: true })

for (const [sectionName, filePaths] of Object.entries(config.sections)) {
  const inputPath = path.join(TEMP_DIR, `${sectionName}.css`)
  const outputPath = path.join(config.outputDir, `${sectionName}.min.css`)

  const utilitiesCSS = generateUtilitiesCSS(config.customUtilities)

  const inputContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Utilities */
${utilitiesCSS}
  `

  fs.writeFileSync(inputPath, inputContent)

  const cmd = `npx tailwindcss -i ${inputPath} -o ${outputPath} --minify --content ${filePaths.join(',')}`

  console.log(`🛠 Building ${sectionName} CSS...`)
  execSync(cmd, { stdio: 'inherit' })
}

console.log("✅ All stylesheets built successfully.");
