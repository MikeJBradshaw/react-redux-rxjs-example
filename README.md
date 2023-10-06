
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is an example of how a react app works with redux and rxjs.

# 0) BEFORE WE START
This is not intended to be an in depth review of redux/rxjs. We are not popping open the hood and looking in. This 
is not even a how to compose an observable and the different features of rxjs. This guide is to show how redux is used,
the basic setup of an app using redux/rxjs and how easy it is to use state and scale (just a little on the scale, it would
take a long time to write enterprise apps)

To __REALLY__ get the most out of this guide, I suggest opening the action, reducer, epic (if it exists) and component all
at once on your wide screen and look between them. It helps connect the dots.

THE FLOW OF WORK is actions, reducers, epics, component. ALWAYS. you cant write a component unless you know what data you want.
you cant get data without making epics. you cant make epics till you have a state to update, and you can have a state unless you
know what you want, what it should look like, and how you are going to tell your app what to do. HENCE....we start with actions.
Open up src/actions/exampleOne.ts

# 1) Overview of a project with all 3:

__actions__ - This is the messenger. This tells the app what to do and when to do it
__reducers__ - State management, this shows the state of the app any single moment in time. Reducers can also do synchronous data processing
__epics__ - This handles ASYNC data processing. Epics are comprised of many functions. These functions are called epics.
        the idea of an epic is simple, its takes a pipe, it takes 1) some data, 2) manipulates the data  and 3) returns some new data

If you `ll src/` you will see these 3 directories.

Each component gets _AT MOST_ 1 action file, 1 reducer file and 1 epic file, and these are __ALWAYS__ named after the parent 
component. So if your component is called `League.tsx`, you will have `actions/league.ts`, reducers/league.ts, and epics/league.ts

Ok with that basic knowledge, open up `App.tsx` and lets look at some examples. In `App.tsx`, you will see 3 components imported
but not used (yet). Starting with ExampleOne...

`exampleOne.ts` shows 2 actions. These are very basic but demonstrate the 2 basic types of state update. Actions with no payload
and actions with a payload. Lets look at the anatomy of an action:

The action name follows the same pattern. the variable name can be whatever you want (but make it match as closely as possible)
and the value is always componentName_actionName.

```
export const INIT = 'EXAMPLE_ONE_INIT' 
```

actionName follows the same patterns:
- UPDATE to update state
- FETCH to fetch data from the server
- INIT for when compoent does mount,
- UNMOUNT for component unmounting 
and (rarely) something declarative like 'validate' with the verb being very clear what it does.

The interface shows exactly what the action will look like when it flows through our app, notice the top action does not
have a payload, and the bottom one does:

```
export interface InitAction { type: typeof INIT }
export interface UpdateChoiceAction { type: typeof UPDATE_CHOICE, newNumber: number }
```

And last but not least, the factory method to create the action. Notice the naming, its named just like the interface EXCEPT
it does not have 'action' on the end.

```
export const init = (): InitAction => ({ type: INIT })
export const updateChoice = (newNumber: number): UpdateChoiceAction => ({ type: UPDATE_CHOICE, newNumber })
```

Now open the `src/reducers/exampleOne.ts` and lets see how actions influence the state of the app.

This is a very basic reducer, but in the essence, this is all that is needed to 1) give this app state, and 2) update state.
Starting from the top, we import the reducer type, then we import our action names and all the actions declared. Below that
we declare an interface for what the state will contain. after that we create our reducer and switch on the action types.

The concept of a reducer is simple. a reducer take the current state and an action, and creates a new state. One thing to note is
YOU DO NOT have to act on all the declared actions. Here we are, in other examples we will not. The actions you describe flow into
this reducer. We look at the action type, and that action type will determine how to update the state.

Look at the first example, `case INIT`. This action simply generates the random numbers to choose. In the case of UPDATE_RANDOM_NUMBER
this case sets your number choice and generates new numbers except for the last one, its the one you choose

Because this is all synchronous data, there does NOT need to be an epic. What we have created is all that is needed for a react app to work
with redux. Open up `src/views/ExampleOne.tsx` and lets see how state is used in a component.

## What We Learned:
- What actions look like, how to name
- What reducers look like, how actions are used in reducers
- How to set up a global state
- How state is used in a component
- A basic redux app is basic, no need to be scared of something new

# 2) Adding Some Complexity

## BEFORE WE START....
Lets talk some ideas and terminology:
- pipe: A pipe is just that, a pipe for data to flow. good ways to think about this is a pipe being a water pipe and the data being
water.... starts at one end, something might be done to that water, and it comes out the other end. always. you never have water just
chilling. ANOTHER example (and my personal favorite) is a christmas conveyor belt at the north pole. raw materials are dropped on it at
one side, these parts are used, and end of the belt is a toy.

- operators: Using the example about christmas conveyor belt, the operators are the elves. they ...wait for it... operate 
in some way on the data, transform it, and put it back onto the conveyor belt for the next operator to use. after all the
elves (operators) get done doing their small part, what comes out the end is a toy.

(another real world example for these two is an auto plant. The pipe is the line, the start of the pipe is raw materials, the end 
of the pipe is a car and workers operate on the line to turn metal and plastic into a hot ford truck)

And finally... lets talk about the overall flow of a react app with redux and rxjs.
without epics: action dispactch --> reducers --> state change --> component rerenders
with epics: action dispatch --> reducers --> (MAYBE A STATE CHANGE) --> epics --> reducers --> STATE CHANGE -- component rerenders

This is ALWAYS the case. ALWAYS. One of the real powerful things of redux is you ALWAYS know what state your app is in. Its never a guess,
and there is never a black box. It makes debugging very simple.

## Ok, Lets See The Complexity
_BECAUSE WE ALWAYS START WTIH ACTIONS_, look at `src/actions/exampleTwo.ts`. We added two new actions, FETCH_TIMESTAMP and UPDATE_TIMESTAMP. This is
our first chance to use an epic (more about that later), but for right now, notice the naming convention between the types, the interface and
the factory method.

_BECAUSE AFTER ACTIONS WE ALWAYS OPEN THE REDUCER_, Lets open `src/reducers/exampleTwo.ts`. Notice that of the two new actions we
have declared, only one is in here, `UPDATE_TIMESTAMP`. We can see this action indeed does update a new, not optional field of
timestamp, but we dont see (yet) where this comes from. Also look at the newly declared initState. Notice that we START with
a timestamp, this is not optional and look how we use the `initState`, its the default value for our reducer.

_BECAUSE AFTER ACTIONS AND REDUCERS WE ALWAYS OPEN THE EPICS_, Lets open `src/epics/exampleTwo.ts`. OUR FIRST EPIC!
This epic is basic....very basic. this epic is triggered by the `FETCH_TIMESTAP` action and updates our
state with the new timestamp. Lets take it from the top and see what goes into epics.

First we see the import of redux/redux-observable/rxjs stuff.

Walking down, we see `generateTimestapEpic`, a function that takes an observable and returns a new observable. We see `ofType(FETCH_TIMESTAMP)`. This filters
out all non `FETCH_TIMESTAMP` actions from proceeeding. You wont have other actions triggering this epic. 
We also see a map emitting the updateTimestamp action. There you go, with absolutely no magic, we get a timestamp. That 
action flows into the reducer, who then updates state and the component is rerendered.

_BECAUSE AFTER THE ACTIONS, REDUCERS AND EPICS WE OPEN THE COMPONENT_, Lets open `src/views/ExampleTwo.tsx`. This is very much
the same thing as before EXCEPT we now have a field is that is timestamp and a button to tell the epic to generate. 
Really not much else to see here, in `App.tsx`, replace `<ExampleOne />` with ``<ExampleTwo />`` and see how the app works.

## What We Learned:
- EVERY epic has 1) and action that triggers it, and 2) at least one action it returns
- Epics are for async data
- Epics return an action
- Epics are defined as: a function that takes an observable and optionally a state, and returns a new observable

# 3) A Quick Look To See How State Is Managed In Multiple Components

This isnt a long section. Actions, reducers, and epics havent changed much. The epic is now a timer that spits out
timestamps on an interval basis and also can be canceled when `STOP_TIMESTAMP` is emitted. We also added a child component. 
So here, we are going to break protocol. This time and this time only, you dont have to open ACTIONS THEN REDUCERS THEN 
EPICS THEN THE COMPONENTS, instead just open `src/views/ExampleThree.tsx` and `src/utils/Timestamp.tsx`

Notice that `Timestamp.tsx` DOES NOT have actions/reducers/epic files associated with it. Instead, all of its data is supplied
by its parent. In Vanilla react, timestamp would be passed in as props. In redux, we just connect it to the store and use
the data however we want. Switch out to `ExampleThree.tsx` and give it a whirl

## WHAT WE LEARNED:
- not every component needs actions much less reducers or epics
- to use ANY data from the state, just hook up the component up to the store and go nuts
