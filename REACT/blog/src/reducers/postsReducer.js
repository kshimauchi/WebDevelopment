export default (state=[], action) => {
  
  switch(action.type){
    case 'FETCH_POSTS':
      return action.payload;
    default: 
      return state;

}
  
};
//(1) must always return a value besides 'undefined'
//(2) return state or data to be used inside of your app using only previous state and the action
//(3) undefined, action#1 first time a reducer is called initialization two arguments, arg1 und, arg1 action1
// take the two arguments and return a state value v1
// someReducer(undefined, {type: 'unknown'}) <- initally, this is why we need default value as null on 1st argument
//(4) next call to reducer call the first argument will become the value of the previous state change state v2
// cyclic...or recursive where the first argument is passing in the previous state value,
//(5) Must not return or reach 'out of itself' to decide what value to return(reducers need to be pure)
/* 
reducers should not be doing anything else like making an api request, it should only be looking at previous state
should never return some result from anything else...just deals with two arguments various plus state + action only!
(6)Lastly, reducers must not mutate its input 'state'argument Mutatations in js.
*/
/*Notes */
// Mutation
// const colors = ['red','white','blue]
// colors.push['yellow']
// can't change the contents of the array, adding removing or updating an array

// const profile ={name: 'Alex'}
// we can not change add, remove or update the object
// profile.name ='mutation'

// number or string we dont have to worry about mutations, but with arrays and objects you do.
// recall === on arrays is checking references to the memory, not content
// Mutate misleading terminology, the truth is you can mutate it all day and not see any errors!
// redux will never give you an error, so why its easier to tell begineers dont mutate state ever than to tell
// them when they can can't (corner case)


/* 
we are not going to mutate state ever
I want to understand the behind the scenes o this rule to help you better understand Redux
github.com/reduxjs/redux/

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const actionType = action && action.type
        throw new Error(
          `When called with an action of type ${
            actionType ? `"${String(actionType)}"` : '(unknown type)'
          }, the slice reducer for key "${key}" returned undefined. ` +
            `To ignore an action, you must explicitly return the previous state. ` +
            `If you want this reducer to hold no value, you can return null instead of undefined.`
        )
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}
if you return the state argument with the same value no update will occur
*/