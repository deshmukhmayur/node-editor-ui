
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Serverless Apps.Create App:invocation[0]": { type: "done.invoke.Serverless Apps.Create App:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Serverless Apps.Loading Apps:invocation[0]": { type: "done.invoke.Serverless Apps.Loading Apps:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Serverless Apps.Create App:invocation[0]": { type: "error.platform.Serverless Apps.Create App:invocation[0]"; data: unknown };
"error.platform.Serverless Apps.Loading Apps:invocation[0]": { type: "error.platform.Serverless Apps.Loading Apps:invocation[0]"; data: unknown };
"xstate.after(2000)#Serverless Apps.Error Page": { type: "xstate.after(2000)#Serverless Apps.Error Page" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "createApp": "done.invoke.Serverless Apps.Create App:invocation[0]";
"loadApps": "done.invoke.Serverless Apps.Loading Apps:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "loadAppInContext": "done.invoke.Serverless Apps.Create App:invocation[0]" | "selectApp";
"setErrorMessage": "error.platform.Serverless Apps.Create App:invocation[0]" | "error.platform.Serverless Apps.Loading Apps:invocation[0]";
"storeAppsInContext": "done.invoke.Serverless Apps.Loading Apps:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "createApp": "createNew";
"loadApps": "goBackToList" | "xstate.after(2000)#Serverless Apps.Error Page" | "xstate.init";
        };
        matchesStates: "App Details" | "Create App" | "Error Page" | "List Apps" | "Loading Apps";
        tags: never;
      }
  