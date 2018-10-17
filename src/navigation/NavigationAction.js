//@flow
import { NavigationActions, StackActions } from "react-navigation";
export const BACK = "BACK";
export const REPLACE = "REPLACE";
export const RESET = "RESET";
export const GO_TO_SCREEN = "GO_TO_SCREEN";
export const GO_TO_HOME = "GO_TO_HOME";

export const navigationActionTypes = {
  BACK,
  GO_TO_HOME,
  REPLACE,
  RESET
};

let navigator;
export function setNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

export function resetTo(routeName, params?) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: routeName,
          params: params
        })
      ]
    })
  );
}

export function goBackTo(routeName, params?) {
  console.log("going back to" + routeName);
  navigator.dispatch(NavigationActions.back());
}

export function gotoHome() {
  navigator.dispatch(NavigationActions.navigate({ routeName: "Home" }));
}

export function goToScreen(routeName) {
  navigator.dispatch(NavigationActions.navigate({ routeName }));
}

export function goToRoute(flowType, uniqueID) {
  navigator.dispatch(
    StackActions.push({
      routeName: "Screen",
      params: {
        flowType: flowType,
        uniqueID: uniqueID
      }
    })
  );
}
