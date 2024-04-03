const yaml = require('js-yaml');
const fs = require('fs');

try {
  const spec = yaml.load(fs.readFileSync('spec.yml', 'utf8'));
  fs.writeFileSync('spec.json', JSON.stringify(spec, null, 2));
} catch (e) {
  console.log(e);
}
