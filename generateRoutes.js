const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'src', 'docs');
const outputFilePath = path.join(__dirname, 'public', 'routes.json');

function generateRoutes(dir, basePath = '/docs') {
  const routes = [];

  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const routePath = `${basePath}/${file}`;

    if (fs.statSync(fullPath).isDirectory()) {
      routes.push(...generateRoutes(fullPath, routePath));
    } else if (file.endsWith('.md')) {
      routes.push({
        path: routePath.replace('.md', ''),
        file: fullPath.replace(path.join(__dirname, 'src', 'docs'), '').replace(/\\/g, '/')
      });
    }
  });

  return routes;
}

const routes = generateRoutes(docsDir);

fs.writeFileSync(outputFilePath, JSON.stringify(routes, null, 2));
console.log('Routes generated:', routes);
