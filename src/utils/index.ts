import { useEffect, useState } from "react";

export const isFalsy= (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value:unknown) => value === undefined || value === null || value === '';

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key:string]: unknown}) => {
    const result = {...object};
    Object.keys(result).forEach((key: string) => {
        const value = result[key];
        if(isVoid(value)) {
            delete result[key];
        }
    });
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(()=>{
        callback();
    },[])
}

// export const debounce = (func,delay) => {
//     let timeout;
//     return () => {
//         if(timeout){
//             clearTimeout(timeout);
//         }
//         timeout = setTimeout(function(){
//             func();
//         },delay)
//     }
// }

// 用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number): any => {
    const [denounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        // 每次在value变化以后， 设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        // 每次在useeffect处理完以后再运行
        return () => clearTimeout(timeout);
    }, [value, delay])

    return denounceValue;
}