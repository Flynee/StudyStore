const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser'); // es6 => ast
const traverse = require('@babel/traverse').default; // ast => dependence graph
const babel = require('@babel/core');

let ID = 0;
function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    // 告诉解析器我们的代码是模块化代码
    const ast = parser.parse(content, {
        sourceType: 'module'
    });
    const dependencies = []; // 一个文件可能依赖多个文件
    // visitor 解析语法树，在关键节点下钩子, 解析图依赖图谱
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value);
        } 
    });
    // es6 => es5
    const {code} = babel.transformFromAstSync(ast, null, {
        presets: ['@babel/preset-env']
    });
    
    let id = ID++;

    return {
        id,
        filename,
        code,
        dependencies,
    };

}

// 构建依赖图
function createGraph(entry) {
    const mainAsset = createAsset(entry);
    const queue = [mainAsset];

    for (const asset of queue) {
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};
        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            const child = createAsset(absolutePath);
            asset.mapping[relativePath] = child.id;
            queue.push(child);
        });
    }
    
    return queue;
}
const result = createGraph('./src/index.js');
console.log(result);