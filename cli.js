#!/usr/bin/env node
import { cac } from 'cac';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.join(__dirname, 'template');

const PLACEHOLDERS = {
  '{{name}}': 'name',
  '{{description}}': 'description',
  '{{license}}': 'license',
  '{{github-user}}': 'githubUser',
};

function replacePlaceholders(content, answers) {
  return content.replace(
    /{{name}}|{{description}}|{{license}}|{{github-user}}/g,
    (match) => {
      const key = PLACEHOLDERS[match];
      return answers[key] ?? match;
    },
  );
}

async function walkDir(dir, callback) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath, callback);
    } else {
      await callback(fullPath);
    }
  }
}

async function scaffoldTemplate(srcDir, destDir, answers) {
  await fs.copy(srcDir, destDir);

  // npm ignores .gitignore, rename it back after copy
  const gitignoreTxt = path.join(destDir, 'gitignore.txt');
  if (await fs.pathExists(gitignoreTxt)) {
    await fs.rename(gitignoreTxt, path.join(destDir, '.gitignore'));
  }

  await walkDir(destDir, async (filePath) => {
    const content = await fs.readFile(filePath, 'utf8');
    const replaced = replacePlaceholders(content, answers);
    await fs.outputFile(filePath, replaced, 'utf8');
  });
}

function prompt(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function runCommand(cmd, cwd) {
  try {
    execSync(cmd, { cwd, stdio: 'inherit' });
    return true;
  } catch {
    return false;
  }
}

async function run() {
  const cli = cac('{{name}}');

  cli
    .command('<project-directory>', 'Directory to scaffold the package into')
    .option('--name <name>', 'Package name (defaults to directory name)')
    .option('--description <description>', 'Package description')
    .option('--license <license>', 'License (e.g. MIT)')
    .option('--github-user <githubUser>', 'GitHub username for badges')
    .option('--no-git', 'Skip git initialization')
    .option('--no-install', 'Skip npm install');

  cli.help();
  const { args, options } = cli.parse();

  const [targetDir] = args;

  if (!targetDir) {
    cli.outputHelp();
    process.exit(1);
  }

  const destDir = path.resolve(targetDir);

  if (fs.existsSync(destDir)) {
    const files = fs.readdirSync(destDir);
    if (files.length > 0) {
      console.error(`Error: Directory "${destDir}" is not empty.`);
      process.exit(1);
    }
  }

  console.log('\n Scaffolding TypeScript package...\n');

  const answers = {
    name: options.name || path.basename(destDir),
    description: options.description || '',
    license: options.license || 'MIT',
    githubUser: options.githubUser || '',
    git: options.git !== false,
    install: options.install !== false,
  };

  if (!options.name && !options.description) {
    answers.description = await prompt('  Package description (optional): ');
  }

  if (!options.license) {
    answers.license = await prompt('  License (default: MIT): ') || 'MIT';
  }

  if (!options.githubUser) {
    answers.githubUser = await prompt('  GitHub username for badges (optional): ') || '';
  }

  console.log('\n  Creating project...\n');

  await scaffoldTemplate(TEMPLATE_DIR, destDir, answers);

  if (answers.install) {
    console.log('  Installing dependencies...\n');
    const ok = runCommand('npm install', destDir);
    if (ok) {
      console.log('\n  Dependencies installed.\n');
    } else {
      console.log('\n  npm install failed. Run `npm install` manually.\n');
    }
  }

  if (answers.git) {
    console.log('  Initializing git...\n');
    const ok = runCommand('git init', destDir);
    if (ok) {
      console.log('  Git initialized.\n');
    }
  }

  console.log('  All set! Next steps:\n');
  console.log(`    cd ${destDir}`);
  console.log('    npm run build');
  console.log('    npm run commit\n');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
