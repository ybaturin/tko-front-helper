const path = require("path");
const fs = require("fs");

function getPath() {
    return getRoot(process.cwd());
}

function getRoot(dir) {
  if (dir === '/') {
    throw new Error('Can\'t find TKO app root');
  }

  const packagePath = path.join(dir, './package.json');
  if (fs.existsSync(packagePath)) {
    const source = fs.readFileSync(packagePath, 'utf8');
    const appName = JSON.parse(source).name;
    if (appName === 'tko') {
      return dir;
    }
  }

  return getRoot(path.join(dir, '..'));
}

module.exports = getPath();