# console-tag
Easier to see personal log in browser.

# Installation
```npm
npm i -S console-tag
```

# Usage
You need to install it before using it. `tag` config is required.
```javascript
        import consoleTag from '/dist/console-tag.bundle.js';
        consoleTag.install({
            enable: true, // false or true
            tag: {
                'test': {
                    tag: {
                        name: '[test-tag]',
                        style: 'color:white;background-color:#ecad9e;border-radius:4px;padding:2px 4px;font-size:12px;'
                    },
                    hook: () => {
                        console.log("I am a hook")
                    }
                }
            }
        });
        console.test('tag sth')
```
Tag Configuration supports customization.You can config your nickname and colorful tag.
```javascript 
        consoleTag.install({
            enable: true, // false or true
            tag: {
                'custom-name': { // terminate you want
                    tag: {
                        name: '[test-tag]', // tag show in console
                        style: 'color:white;background-color:#ecad9e;border-radius:4px;padding:2px 4px;font-size:12px;'
                    },
                    hook: () => {
                        console.log("I am a hook")
                    }
                }
            }
        });
```




# params 
```
install(config)
```
|  params        |  type        |   required |  description |
|  ----          |  ---        | ----          |  ---- |
| enable | boolean | false | It will take effect when the value is false, and supports configuration according to the environment.Example: dev debugging environment takes effect, production not `install({ enable: env === 'dev' ? true : false })` |
| tag | Object | true | Config commands what you want|
| &emsp;'customName'  | Object | true | 'customName' is the command u want. `console[customName]` | 
| &emsp;&emsp;tag | Object  | true | Tag style config | 
| &emsp;&emsp;&emsp;name | String | true | Tag context |
| &emsp;&emsp;&emsp;style | String | true | Tag style |
| &emsp;&emsp;hook | Function  | false | Hook function will be called before custom command. | 
