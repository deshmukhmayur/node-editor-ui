import React from 'react';
import { useMachine } from "@xstate/react";
import { statemachine } from '../machines/statemachine';

export default function MachineComponent () {
  const [ state, send ] = useMachine(statemachine);

  return (<>
    <h1>State: <code>{ state.value.toString() }</code></h1>
    <pre>
      {JSON.stringify(state.context, null, 2)}
    </pre>

    <button onClick={() => send('createNew')}>Next</button>
  </>);
}