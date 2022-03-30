// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext
const CountContext = React.createContext()

// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider
function CountProvider({ children }) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  )
}


// // Exercise
// function CountDisplay() {
//   // 🐨 get the count from useContext with the CountContext
//   // const count = 0

//   const [count] = React.useContext(CountContext)
//   return <div>{`The current count is ${count}`}</div>
// }

// // Exercise
// function Counter() {
//   // 🐨 get the setCount from useContext with the CountContext
//   // const setCount = () => {}

//   // Note how to destructure the last one without previous
//   const [, setCount] = React.useContext(CountContext)
//   const increment = () => setCount(c => c + 1)
//   return <button onClick={increment}>Increment count</button>
// }

// // Exercise
// function App() {
//   return (
//     <div>
//       {/*
//         🐨 wrap these two components in the CountProvider so they can access
//         the CountContext value
//       */}
//       <CountProvider>
//         <CountDisplay />
//         <Counter />
//       </CountProvider>
//     </div>
//   )
// }


// Extra 1
function useCount() {
  const context = React.useContext(CountContext)

  // When a component try to use context outside the provider, the return will be undefined
  if (!context) {
    throw new Error('useCount must be used within the CountProvider')
  }

  return context
}

// Extra 1
function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

// Extra 1
function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

// Extra 1
function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
      </CountProvider>
      <Counter />
    </div>
  )
}


export default App
