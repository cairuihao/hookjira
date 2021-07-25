import { useState } from "react"

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
  }

  const defaultInitialState: State<null> =  {
    stat: 'idle',
    data: null,
    error: null
  }

  const defaultConfig = {
      throwOnError: false
  }

  export const useAsync = <D>(initailState?:State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig};
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initailState
    });

    const setData = (data:D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    const run = async (promise: Promise<D>) => {
        if(!promise || !promise.then) {
            throw new Error('请传递promise类型');
        }
        setState({...state,stat: 'loading'})
        try {
            const data = await promise;
            setData(data);
            return data;
        } catch (error) {
            setError(error);
            if(config.throwOnError) return await Promise.reject(error);
        }
    }

    return {
      isIdle: state.stat === 'idle',
      isLoading: state.stat === 'loading',
      isError: state.stat === 'error',
      isSuccess: state.stat === 'success',
      run,
      setData,
      setError,
      ...state
    }
  }

  

  
