import { workspace } from 'vscode';
import { TestFileDirectory } from './test-file-directory.enum';

export namespace ConfigManager {
    const config = workspace.getConfiguration('jasmine-boilerplate');
    const defaultConfig = {
        testFileExtension: 'spec.ts',
        testFileDirectory: TestFileDirectory.WITH_COMPONENT,
        customTestFileDirectoryPath: ''
    };

    function getConfigValue(key: string, defaultValue: string): string {
        return config.get(key) || defaultValue;
    }

    export function getTestFileExtension(): string {
        return getConfigValue('testFileExtension', defaultConfig.testFileExtension);
    }

    export function getTestFileDirectory(): string {
        return getConfigValue('testFileDirectory', defaultConfig.testFileDirectory);
    }

    export function getCustomTestFileDirectoryPath(): string {
        return getConfigValue('customTestFileDirectoryPath', defaultConfig.customTestFileDirectoryPath);
    }

    function getTabSize(): number {
      return workspace.getConfiguration('editor').get('tabSize') ?? 4;
    }

    export function getTab(): string {
      return ' '.repeat(getTabSize());
    }
}
