//@flow
import Home from "../home/HomeComponent";
import { createStackNavigator } from "react-navigation";
import { Easing, Animated } from "react-native";
import { navigationActionTypes } from "./NavigationAction";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene, scenes, index } = sceneProps;
      // console.log(sceneProps)
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
      const height = layout.initHeight;
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });
      const pushOnTop = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      });
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });
      const lastSceneIndex = scenes[scenes.length - 1].index;
      const slideFromRight = { transform: [{ translateX }] };
      const slideFromBottom = { transform: [{ translateY: pushOnTop }] };
      const slideDownBottom = { transform: [{ translateY }] };
      if (lastSceneIndex - index > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === index) return;
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) return { opacity: 0 };
        // Slide top screen down
        return slideDownBottom;
      }
      if (
        scenes[scenes.length - 1].route.params &&
        scenes[scenes.length - 1].route.params.isPushed
      ) {
        return slideFromBottom;
      } else {
        return slideFromRight;
      }
    }
  };
};

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    headerMode: "none",
    transitionConfig,
    cardStyle: { shadowColor: "transparent" }
  }
);

const defaultGetStateForAction = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === navigationActionTypes.BACK) {
    let backRouteIndex = null;
    let routes, backRoute;
    if (action.key) {
      backRoute = state.routes.find(
        (route: *) => route.routeName === action.key
      );
      backRouteIndex = state.routes.indexOf(backRoute);
    }
    if (backRouteIndex == null) {
      backRouteIndex = -1;
    }
    console.log("index bck", backRouteIndex);
    if (backRouteIndex !== -1) {
      routes = state.routes.slice(0, backRouteIndex + 1);
    } else {
      routes = state.routes.slice(0, backRouteIndex);
    }
    console.log("routes", routes);
    if (action.params) {
      backRoute = routes[routes.length - 1];
      const params = {
        ...backRoute.params,
        ...action.params
      };

      routes[routes.length - 1] = {
        ...backRoute,
        params
      };
    }
    return {
      ...state,
      routes: routes,
      index: routes.length - 1
    };
  }
  if (state && action.type === navigationActionTypes.REPLACE) {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }
  return defaultGetStateForAction(action, state);
};

export default AppNavigator;
