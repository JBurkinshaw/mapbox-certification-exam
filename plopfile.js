module.exports = function(plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
        templateFile: 'src/components/__template__/component.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.js',
        templateFile: 'src/components/__template__/componentIndex.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.js',
        templateFile: 'src/components/__template__/componentSpec.js.hbs',
      },
      {
        type: 'append',
        path: 'src/components/index.js',
        template: `export { default as {{pascalCase name}} } from './{{pascalCase name}}'`,
      },
    ],
  })
}
