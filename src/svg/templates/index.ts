import { resolve } from 'path';
import { compile } from 'handlebars';
import { readFileSync, readdirSync } from 'fs';

const files = readdirSync(resolve(__dirname, './'), {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .filter(item => (/^.*\.hbs$/gi).test(item.name))
  .map(item => item.name)

const templates = files.reduce((acc, template) => {
  let content;
  try {
    const file = readFileSync(resolve(__dirname, template));
    content = file.toString();
  } catch (e) {
    console.error(e);
    content = 'Load error';
  }
  acc[template] = compile(content);
  return acc;
}, {})

export default function render(template, data) {
  return templates[`${template}.hbs`](data);
}