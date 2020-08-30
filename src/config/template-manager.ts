import { ConfigManager } from './config-manager';

export enum Template {
    DEFAULT = 'DEFAULT',
    IMPORT = 'IMPORT'
}

export class TemplateManager {

    tab: string;
    constructor() {
        this.tab = ConfigManager.getTab();
    }

    getTemplate(template: Template = Template.DEFAULT, componentName: string, componentPath: string) {
        switch (template) {
            case Template.DEFAULT:
                return this.getDefaultTemplate(componentName, componentPath);
            case Template.IMPORT:
                return this.getImportTemplate(componentName, componentPath);
        }
    }

    private getImportTemplate(componentName: string, componentPath: string) {
        return `import { ${componentName} } from '${componentPath}';`;
    }

    private getDefaultTemplate(componentName: string, componentPath: string) {
        const imports = this.getImportTemplate(componentName, componentPath);
        const it = this.getItTemplate();
        const describe = this.getDescribeTemplate(componentName, it); 
        return [imports, describe].join('\n\n');
    };

    private getDescribeTemplate(name: string, otherTemplate: string): string {
        return `describe('${name}', () => {\n\n${otherTemplate}\n\n});\n`;
    }

    private getItTemplate(): string {
        return `${this.tab}it('should ...', () => {\n\n${this.tab}});`;
    }

}
