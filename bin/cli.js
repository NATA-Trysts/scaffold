#! /usr/bin/env node

const { execSync } = require('child_process')
const path = require('node:path')
const fs = require('node:fs')
const yargs = require('yargs')
const { fileURLToPath } = require('node:url')

const serviceName = yargs.argv.name

const cdAndInstall = `cd ${serviceName} && npm i`
const gitInit = `cd ${serviceName} && git init && npm run add:husky`
const addHusky = `cd ${serviceName} && npx husky add .husky/pre-commit "npx lint-staged"`
const addHuskyToGit = `cd ${serviceName} && git add .husky/pre-commit`

const runCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Failed to execute ${command}`, error)
    return false
  }

  return true
}

const targetDir = serviceName

const root = path.join(process.cwd(), targetDir)
const template = 'basic'

const templateDir = path.resolve(__dirname, '../template', template)

const getAllFiles = function (dirPath, arrayOfFiles) {
  const templateDir = path.resolve(__dirname, '../template', dirPath)
  let files = fs.readdirSync(templateDir)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(path.join(templateDir, file)).isDirectory()) {
      const targetPath = path.join(process.cwd(), `${serviceName}/src/${file}`)

      fs.mkdirSync(targetPath, { recursive: true }, (err) => {
        if (err) throw err
      })
      arrayOfFiles = getAllFiles(path.resolve(templateDir + '/' + file), arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(templateDir, '/', file))
    }
  })

  return arrayOfFiles
}

const copyTemplateToTarget = (template) => {
  const filePath = getAllFiles(template)
  const a = filePath.map((fullPath) => {
    const originFilePath = fullPath

    const templateDir = path.resolve(__dirname, '../template', template)

    const name = fullPath.replace(templateDir, '')
    const destinationFilePath = path.join(process.cwd(), serviceName, name)

    let fileContent = fs.readFileSync(originFilePath, 'utf-8').toString()
    let adjustedProjectName = fileContent.replace(/\$PROJECT_NAME\$/gi, serviceName)

    fs.writeFileSync(destinationFilePath, adjustedProjectName)
  })
}

const postScaffold = () => {
  const cdAndInstallExec = runCommand(cdAndInstall)
  const gitInitExec = runCommand(gitInit)
  const addHuskyExec = runCommand(addHusky)
  const addHuskyToGitExec = runCommand(addHuskyToGit)

  if (!gitInitExec || !cdAndInstallExec || !addHuskyExec || !addHuskyToGitExec) process.exit(1)

  console.log('*****')
  console.log('The project is ready 🎉!')
  console.log(`To start: cd ${serviceName} && npm start`)
  console.log(`Using docker: cd ${serviceName} && docker compose up`)
}

const scaffoldTemplate = (template) => {
  copyTemplateToTarget(template)
  postScaffold()
}

if (yargs.argv.wMongo && !yargs.argv.wKafka) {
  console.log('Scaffold NodeJs /w Mongo template!')
  scaffoldTemplate('wMongo')
}

if (!yargs.argv.wMongo && yargs.argv.wKafka) {
  console.log('Scaffold NodeJs /w Kafka template!')
  scaffoldTemplate('wKafka')
}

if (yargs.argv.wKafka && yargs.argv.wMongo) {
  console.log('Scaffold NodeJs /w Mongo & Kafka template!')
  scaffoldTemplate('wMongoKafka')
}

if (!yargs.argv.wKafka && !yargs.argv.wMongo) {
  console.log('Scaffold NodeJs template!')
  scaffoldTemplate('basic')
}
