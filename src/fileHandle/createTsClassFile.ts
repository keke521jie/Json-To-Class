import * as fs from 'fs';
import * as path from 'path';

/**
 * @param fileName 生成的文件名称
 * @param classStr 生成的文件内容
 * @param classStr 生成路径
 * @returns 返回 ClassFile 类的名称字符串 和 类的内容字符串
 */
export function createTsClassFile(
  fileName: string,
  classStr: string,
  createFilePath: string
): void {
  // 构建要生成的 TypeScript 文件的路径
  const tsClassFileName = `${fileName}.ts`;
  const tsFilePath = path.join(createFilePath, tsClassFileName);
  // 写入文件
  fs.writeFileSync(tsFilePath, classStr);
}
