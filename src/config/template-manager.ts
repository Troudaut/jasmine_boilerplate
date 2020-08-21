export enum Template {
    DEFAULT = 'DEFAULT',
    IMPORT = 'IMPORT'
}


export class TemplateManager {

    componentName = 'AppComponent';
    componentPath = './component';

    TEMPLATES = {
        DEFAULT: 
     `import { ${this.componentName} } from '${this.componentPath}';\

     describe('${this.componentName}', () => {

         it('should ...', () => {

         });

     });`,
         IMPORT: `import { ${this.componentName} } from '${this.componentPath}';`
     };

    constructor(componentName: string, componentPath: string) {
        this.componentName = componentName;
        this.componentPath = componentPath;
    }

    getTemplate(template: Template = Template.DEFAULT) {
        return this.TEMPLATES[template];
    }
}


