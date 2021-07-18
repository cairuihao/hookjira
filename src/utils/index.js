import { callbackify } from "util";

export const isFalsy= (value) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
// export const cleanObject = (object) => {
//     const result = {...object};
//     Object.keys(result).forEach((key) => {
//         const value = result[key];
//         if(isFalsy(value)) {
//             delete result[key];
//         }
//     });
//     return result;
// }

export const useMount = (callback) => {
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

export const useDebounce = (value, delay) => {
    const [denounceValue, setDebounceValue] = useState(value);

    userEffect(() => {
        // 每次在value变化以后， 设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        // 每次在useeffect处理完以后再运行
        return () => clearTimeout(timeout);
    }, [value, delay])

    return denounceValue;
}