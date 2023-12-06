import * as vscode from "vscode";

export interface ClassFile{
    className:string,
    classStr:string
}

/**
 * @param content 接受一个json字符串
 * @returns 返回 ClassFile 类的名称字符串 和 类的内容字符串
 */
export function jsonToClass(fileName: string, content: string):ClassFile {
  const className =
    fileName.split(".")[0].charAt(0).toUpperCase() +
    fileName.split(".")[0].slice(1);
  const jsonObj = JSON.parse(content);

  let classStr = `class ${className}{\n`;

  for (let key in jsonObj) {
    const value = jsonObj[key]
    if (typeof value === "number") {
      classStr += `public ${key}?:number;\n`;
    } else if (typeof value === "boolean") {
      classStr += `public ${key}?:boolean;\n`;
    } else if (typeof value === "string") {
      classStr += `public ${key}?:string;\n`;
    }else if(isObject(value)){
        // 执行对象处理函数
    }else{
        classStr += `public ${key}?:unknow;\n`;
    }
  }

  classStr += `}`;

  return {
    className,
    classStr
  };
}



// 判断一个数据是否为object
function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}
