const [major] = process.versions.node.split('.').map(Number);

if (Number.isNaN(major) || major < 22) {
  console.error(
    `\nThis project requires Node.js >= 22. Current version: ${process.version}.\nUse \`nvm use\` (or \`nvm use 22\`) and run install again.\n`,
  );
  process.exit(1);
}
