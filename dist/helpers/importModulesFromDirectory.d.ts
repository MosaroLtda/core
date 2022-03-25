interface IOptions {
    fileNameIncludes?: string;
    fileNameIgnore?: string;
}
export declare function importModulesFromDirectory<T = any>(pathModulesDirectory: string, options?: IOptions): T[];
export default importModulesFromDirectory;
