import { toUpperCaseFrist } from "./handleStr";
import { isObject } from "./jsonToClass";

/**
 * @description 给一个对象递归生成类字符串的方法
 * @param objName 对象名称（会根据该名称生成类名）
 * @param obj 对象
 * @param classArr 生成的对象字符串会存放在该类字符串数组中
 * @returns 返回一个类字符串数组
 */
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
    } else if (Array.isArray(value)) {
      const arrClassStr = handleArrayToClass(key,value,classArr);
      classStr += arrClassStr;
    } else {
      classStr += `public ${key}?:unknow;\n`;
    }
  }
  classStr += `}`;
  return classStr;
}


/**
 * @description 处理数据为数组的函数
 * @param className 成员名称
 * @param arr 处理的数组
 * @param classArr 存放生成类字符串的数组
 * @returns  返回类的成员字符串
 */
export function handleArrayToClass(className:string,arr:Array<any>,classArr:Array<string>){
  const arrItem = arr[0];
  if (isObject(arrItem)) {
    const type = toUpperCaseFrist(className);
    const ClassName = type + "Child";
    classArr.push(handleObjToClass(ClassName, arrItem, classArr));
    return `public ${className}?:Array<${ClassName}>;\n`;
  }else if(typeof arrItem === "number"){
    return `public ${className}?:Array<number>;\n`;
  }else if(typeof arrItem === "string"){
    return `public ${className}?:Array<string>;\n`;
  }else if(typeof arrItem === "boolean"){
    return `public ${className}?:Array<boolean>;\n`;
  }else {
    return `public ${className}?:unknow;\n`;
  }
} 
