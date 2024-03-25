type Config = {
    enable: boolean; // can judge by different enviroment.
    tag: ConfigTag
}

type ConfigTag = {
    [key: string]: {
        tag: {
            name: string,
            style: string,
        },
        hook?: (...args: unknown[]) => void
    }
}

const defaultStyle = {
    mention: "color:white;background-color:#6c98c6;border-radius:4px;padding:2px 4px;font-size:12px;"
}

function generate(config: Config) {
    const styleMention = defaultStyle.mention;
    console.log("%c colorful console start installing",styleMention)
    const __console = window.console;
    const configTabMap = objectToMap(config.tag)
    const proxy = new Proxy(window.console, {
        get: function (target, key, receiver) {
            if(target.hasOwnProperty(key)) return Reflect.get(target, key, receiver);

            if(!configTabMap.get(key)) return Reflect.get(target, key, receiver);

            if(config.enable === false) return () => {};

            const personConfig = configTabMap.get(key);

            if(!personConfig.tag) {
                __console.warn(`[console-tag] config.tag [${String(key)}] config is invalid!`)
                return () => {};
            }

            const { tag: {name, style}, hook } = personConfig;

            return (...restArgs: unknown[]) => {
                hook?.(...restArgs);
                Reflect.get(target, 'log').apply(receiver, [`%c${name}`,style,...restArgs])
            }
        }
    })
    //@ts-ignore
    window.__console = __console
    window.console = proxy;
}

function objectToMap(object: ConfigTag) {
    const map = new Map();

    Object.keys(object).forEach(key => !map.get(key) && map.set(key,object[key]))

    return map;
}

function install(config: Config) {
    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
    if(!isBrowser) {
        console.warn('[console-tag] cannot run in non-browser environment!' )
        return 
    }

    if(window.console && Object.prototype.toString.call(window.console) === '[object Proxy]'){
        console.warn('[console-tag] has been already installed!' )
        return;
    }


    if(!config.tag) {
        console.warn('[console-tag] config.tag should be config!' )
        return 
    }

    generate(config)
}

export default {
    install
}