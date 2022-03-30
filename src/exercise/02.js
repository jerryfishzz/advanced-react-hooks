// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'


/* 
// 🐨 this is going to be our generic asyncReducer
function pokemonInfoReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'pending', pokemon: null, error: null}
    }
    case 'resolved': {
      // 🐨 replace "pokemon" with "data" (in the action too!)
      return {status: 'resolved', pokemon: action.pokemon, error: null}
    }
    case 'rejected': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'rejected', pokemon: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
 */


function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      // 🐨 replace "pokemon" with "data" (in the action too!)
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}


// function PokemonInfo({pokemonName}) {
//   // 🐨 move all the code between the lines into a new useAsync function.
//   // 💰 look below to see how the useAsync hook is supposed to be called
//   // 💰 If you want some help, here's the function signature (or delete this
//   // comment really quick if you don't want the spoiler)!
//   // function useAsync(asyncCallback, dependencies) {/* code in here */}

//   // -------------------------- start --------------------------

//   const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
//     status: pokemonName ? 'pending' : 'idle',
//     // 🐨 this will need to be "data" instead of "pokemon"
//     pokemon: null,
//     error: null,
//   })

//   React.useEffect(() => {
//     // 💰 this first early-exit bit is a little tricky, so let me give you a hint:
//     // const promise = asyncCallback()
//     // if (!promise) {
//     //   return
//     // }
//     // then you can dispatch and handle the promise etc...
//     if (!pokemonName) {
//       return
//     }
//     dispatch({type: 'pending'})
//     fetchPokemon(pokemonName).then(
//       pokemon => {
//         dispatch({type: 'resolved', pokemon})
//       },
//       error => {
//         dispatch({type: 'rejected', error})
//       },
//     )
//     // 🐨 you'll accept dependencies as an array and pass that here.
//     // 🐨 because of limitations with ESLint, you'll need to ignore
//     // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
//   }, [pokemonName])
//   // --------------------------- end ---------------------------

//   // 🐨 here's how you'll use the new useAsync hook you're writing:
//   // const state = useAsync(() => {
//   //   if (!pokemonName) {
//   //     return
//   //   }
//   //   return fetchPokemon(pokemonName)
//   // }, [pokemonName])
//   // 🐨 this will change from "pokemon" to "data"
//   const {pokemon, status, error} = state

//   switch (status) {
//     case 'idle':
//       return <span>Submit a pokemon</span>
//     case 'pending':
//       return <PokemonInfoFallback name={pokemonName} />
//     case 'rejected':
//       throw error
//     case 'resolved':
//       return <PokemonDataView pokemon={pokemon} />
//     default:
//       throw new Error('This should be impossible')
//   }
// }


/* 
// Exercise
// Note, how to use initialState in tutorial as the following shows
function useAsync(asyncCallback, initialState, dependencies) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState
  })

  // The tutorial doesn't use useMemo.
  // useMemo cannot be called inside a callback,
  // for example, inside useEffect callback,
  // but need to be directly under a function component
  // or a custom hook.
  // Note, the way to use dependencies.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promise = React.useMemo(asyncCallback, dependencies)

  React.useEffect(() => {
    if (!promise) {
      return
    }

    dispatch({type: 'pending'})
  
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [promise])

  return state
}

// Exercise
function PokemonInfo({pokemonName}) {
  // 🐨 move all the code between the lines into a new useAsync function.
  // 💰 look below to see how the useAsync hook is supposed to be called
  // 💰 If you want some help, here's the function signature (or delete this
  // comment really quick if you don't want the spoiler)!
  

  // -------------------------- start --------------------------

  // const [state, dispatch] = React.useReducer(asyncReducer, {
  //   status: pokemonName ? 'pending' : 'idle',
  //   // 🐨 this will need to be "data" instead of "pokemon"
  //   pokemon: null,
  //   error: null,
  // })

  // React.useEffect(() => {
  //   // 💰 this first early-exit bit is a little tricky, so let me give you a hint:
  //   // const promise = asyncCallback()
  //   // if (!promise) {
  //   //   return
  //   // }
  //   // then you can dispatch and handle the promise etc...
  //   if (!pokemonName) {
  //     return
  //   }
  //   dispatch({type: 'pending'})
  //   fetchPokemon(pokemonName).then(
  //     pokemon => {
  //       dispatch({type: 'resolved', data: pokemon})
  //     },
  //     error => {
  //       dispatch({type: 'rejected', error})
  //     },
  //   )
  //   // 🐨 you'll accept dependencies as an array and pass that here.
  //   // 🐨 because of limitations with ESLint, you'll need to ignore
  //   // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
  // }, [pokemonName])
  // --------------------------- end ---------------------------

  // 🐨 here's how you'll use the new useAsync hook you're writing:
  const state = useAsync(
    () => {
      if (!pokemonName) {
        return
      }
      return fetchPokemon(pokemonName)
    }, 
    { 
      status: pokemonName ? 'pending' : 'idle' 
    },
    [pokemonName]
  )

  // 🐨 this will change from "pokemon" to "data"
  const {data: pokemon, status, error} = state

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}
 */


/* 
// Extra 1
function useAsync(asyncCallback, initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState
  })

  React.useEffect(() => {
    const promise = asyncCallback()

    if (!promise) {
      return
    }

    dispatch({type: 'pending'})
  
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [asyncCallback])

  return state
}

// Extra 1
function PokemonInfo({pokemonName}) {
  const asyncCallback = React.useCallback(() => {
    if (!pokemonName) {
      return
    }
    return fetchPokemon(pokemonName)
  }, [pokemonName])

  const state = useAsync( 
    asyncCallback,
    { status: pokemonName ? 'pending' : 'idle' }
  )

  const {data: pokemon, status, error} = state

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}
 */


/* 
// Extra 2
function useAsync(initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState
  })

  const run = React.useCallback(promise => {
    if (!promise) {
      return
    }

    dispatch({type: 'pending'})
  
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [])
  
  return { ...state, run }
}

// Extra 2
function PokemonInfo({pokemonName}) {
  // 💰 destructuring this here now because it just felt weird to call this
  // "state" still when it's also returning a function called "run" 🙃
  const {data: pokemon, status, error, run} = useAsync({ status: pokemonName ? 'pending' : 'idle' })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    // 💰 note the absence of `await` here. We're literally passing the promise
    // to `run` so `useAsync` can attach it's own `.then` handler on it to keep
    // track of the state of the promise.
    const pokemonPromise = fetchPokemon(pokemonName)
    run(pokemonPromise)
  }, [pokemonName, run])

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}
 */


// Extra 3
function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false)

  React.useEffect(() => {
    // When mounted
    mountedRef.current = true

    // When unmounted
    return () => {
      mountedRef.current = false
    }
  }, [])

  return React.useCallback((...args) => {
    if (mountedRef.current) {
      dispatch(...args)
    }
  }, [dispatch])
}

// Extra 3
function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const run = React.useCallback(promise => {
    if (!promise) {
      return
    }

    dispatch({type: 'pending'})
  
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [dispatch])
  
  return { ...state, run }
}

// Extra 3
function PokemonInfo({pokemonName}) {
  const {data: pokemon, status, error, run} = useAsync({ status: pokemonName ? 'pending' : 'idle' })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    
    const pokemonPromise = fetchPokemon(pokemonName)
    run(pokemonPromise)
  }, [pokemonName, run])

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}


function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
