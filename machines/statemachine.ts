import { assign, createMachine } from "xstate";

const testApps = new Set([
  { name: 'App 1' }
]);

export const statemachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QGUwCcBu6A2dYAIBBAB2NgDoAZAewEMIBLAOyiNNgGIJqmxzmM1ANZ9UmHHjZkqdRiymwEA6gGNaAFwY8A2gAYAunv2JQxarAaaeJkAA9EAJgAsANnIBmAIwOArLoAcAOy6Xn4AnAA0IACeiD6BnuQO7mE+TrqBgfGe-j4AvnlRYlhouLAEJNI09MyslZzoaNRo5MTYGgBmzQC25MUS5QoyNfL1SkyCalZMRkY2ZhbTNvYIzm5evgHBobqRMY66uuRZh7oOgS45ui5OBUXoJWUV7FQMsOoKHCpoYBpgAHJgADucyQIAWli0TGWcRuHm8PhSYX87ncuk8e1iCCcTgc5BcPhcDk8iPcLhcIUCt0KIH6pUk9Ve70+sDAuBU6kqoNM5kh1jBK0JTnhviRKLRGKiWPibhJRLO-lcFIcLjutIeA2e0gAwj8-lIuDw+MoRH0NfTBozdb91GApONJhoobMDPNeUsBYgwjiPD5vWTUe4soqpYgnO4fPjAmFySjUqkvGq6U8htb9ZUOI1mq12uoumhesmGS807b7cops6DNzwe6oTCEN7hRH-S5A8GnKGEO5cccVT54mFAl5-P5VTSi5aXpV8AARMDqWgMbCcKDUABCtBUQgAKtRKG91DWIR7QCsY-58ekCSEbu5iZ4u1S8S2e4iHGFb9T7uILVqKAAomgTRoPgAAKtAwBwtjvH85C0B0tpoAAFA4pwAJQcJO-7kEBIHgZBYDHnW-JnogniHJGipBvEZyIocDhdv4iROGEbFsbiqJOMOYQFDSTDUBAcA2NhChuos9aeggAC0LhdrJ5CnOiyT+N6PiqYmE7mimjLVHIdTsOJfLQlJuJdoSiRhJ4lyeCkZJ+A4-hJtpxZVIeYlgieklkdiva4hiujXtZng4p2+wIH6eIxpcvgDii6mBM5v46SWeplpURmnnYiBUmEimBMxrG7IEySEl2TgYvihIOI5QYkv6+RaclrkUDO86Lsu8CeSRJk+Z4tl5Qihw3CFbZZE+aLHD2Pa6H6zHuCiSWPC1uHAc0BEwJl3nZQg-UpOQQ3XBVrg0V2EbCv4jl7USYTnJ4iV8UAA */
createMachine({
  id: "Serverless Apps",
  predictableActionArguments: true,

  tsTypes: {} as import("./statemachine.typegen").Typegen0,

  schema: {
    context: {
      allApps: [] as any,
      selectedApp: {},
    },
    services: {} as {
      loadApps: {
        data: any;
      };
      createApp: {
        data: void;
      };
    }
  },

  states: {
    "Loading Apps": {
      invoke: {
        src: 'loadApps',
        onDone: {
          target: 'List Apps',
          actions: "storeAppsInContext"
        },
        onError: {
          target: 'Error Page',
          actions: "setErrorMessage"
        },
      }
    },

    "List Apps": {
      on: {
        createNew: "Create App",

        selectApp: {
          target: "App Details",
          actions: "loadAppInContext"
        }
      }
    },

    "Create App": {
      invoke: {
        src: 'createApp',
        onDone: {
          target: 'App Details',
          actions: "loadAppInContext"
        },
        onError: {
          target: 'Error Page',
          actions: "setErrorMessage"
        },
      },
    },

    "App Details": {
      on: {
        goBackToList: "Loading Apps"
      }
    },

    "Error Page": {
      after: {
        "2000": "Loading Apps"
      }
    }
  },

  initial: "Loading Apps"
}, {
    actions: {
      loadAppInContext: assign((context, event) => {
        console.log('event', event);
        return {
          ...context,
        }
      }),
      setErrorMessage: () => {},
      storeAppsInContext: () => {},
    },
    services: {
      createApp: (context, event) => { return {} as any},
      loadApps: async (context, event) => {
        console.log({context, event});
        console.log('loading...');
        return {
          allApps: Array.from(testApps)
        }
      }
    }
});