import { toUpperCaseFrist } from "./handleStr";
import { isObject } from "./jsonToClass";

export function handleObjToClass(
  objName: string,
  obj: any,
  classArr: Array<string>
): string {
  let className = toUpperCaseFrist(objName);
  let classStr = `export class ${className}{\n`;
  for (let key in obj) {
    const value = obj[key];
    if (typeof value === "number") {
      classStr += `public ${key}?:number;\n`;
    } else if (typeof value === "boolean") {
      classStr += `public ${key}?:boolean;\n`;
    } else if (typeof value === "string") {
      classStr += `public ${key}?:string;\n`;
    } else if (isObject(value)) {
      // 执行对象处理函数
      const type = toUpperCaseFrist(key);
      classStr += `public ${key}?:${type};\n`;
      classArr.push(handleObjToClass(key, obj[key], classArr));
    } else {
      classStr += `public ${key}?:unknow;\n`;
    }
  }
  classStr += `}`;
  return classStr;
}
