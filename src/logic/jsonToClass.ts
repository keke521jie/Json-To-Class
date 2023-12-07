import { handleObjToClass } from "./handleObjToClass";
import { toUpperCaseFrist } from "./handleStr";

export interface ClassFile{
    className:string,
    classStr:string
}

/**
 * @param content 接受一个json字符串
 * @returns 返回 ClassFile 类的名称字符串 和 类的内容字符串
 */
export function jsonToClass(fileName: string, content: string):ClassFile {
  const className = toUpperCaseFrist(fileName.split(".")[0]);
  const jsonObj = JSON.parse(content);

  // 这个变量存储中间遇到的对象数组情况转换为类的字符串
  let classArr:string[] = []; 

  const classStr = handleObjToClass(className,jsonObj,classArr);
  classArr.push(classStr);

  let resStr = "";
  classArr.forEach(classStr => {
    resStr += '\n' + classStr;
  });

  return {
    className,
    classStr:resStr
  };
}


// 判断一个数据是否为object
export function isObject(value: any): boolean {
  return typeof value === "object" && value !== null && !(value instanceof Array);
}

