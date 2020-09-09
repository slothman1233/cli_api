
// 1.相等断言
// toBe(value)： 比较数字、字符串
// toEqual(value)： 比较对象、数组
// toBeNull()
// toBeUndefined()

// 2.包含断言
// toHaveProperty(keyPath, value)： 是否有对应的属性
// toContain(item)： 是否包含对应的值，括号里写上数组、字符串
// toMatch(regexpOrString)： 括号里写上正则

// 3.逻辑断言
// toBeTruthy()
// toBeFalsy()
// 在JavaScript中，有六个falsy值：false，0，''，null， undefined，和NaN。其他一切都是Truthy。

// toBeGreaterThan(number)： 大于
// toBeLessThan(number)： 小于
// 4.not
// 取反  expect('123').not.toContain('4')  expect('123').not.toBe('4')

module.exports = {
    //设置识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
    //  testMatch: ['\*\*/\_\_tests\_\_/\*\*/\*.js?(x)', '\*\*/?(*.)(spec|test).js?(x)'],
    testMatch: ['<rootDir>/test/\*\*/\*\.(spec|test).(js|ts)?(x)'],
    //设置识别哪些文件是测试文件（正则形式），与testMatch互斥，不能同时写
    // testRegex: '(/\_\_tests\_\_).*|(\\\\.|/)(test|spec))\\\\.jsx?$',
    //测试环境，默认值是：jsdom，可修改为node
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['\\node_modules\\'],
    //默认值：当前目录，一般是package.json所在的目录。
    rootDir: '',
    //测试文件的类型
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts'],
    //需要覆盖的文件
    collectCoverageFrom: [
        '**/src/db/sequelize/mapping/**/*.{js,jsx,ts}',
        '**src/routes/**/*.{js,jsx,ts}',
        '**/src/controller/**/*.{js,jsx,ts}',
        '**/src/services/**/*.{js,jsx,ts}',
        '!**/node_modules/**'
    ],
    transform: {
        '^.+\\.(tsx|ts)?$': 'ts-jest'
    },
    setupTestFrameworkScriptFile: './jest.setup.js',
    //覆盖率报告的存储位置
    coverageDirectory: 'coverage'
}