/**
 * Selfless
 *
 * @format
 * @flow
 */

import * as React from "react";
import { createStackNavigator } from "react-navigation";

import { CameraScreen } from "App/view/app/camera";
import { HomeScreen } from "App/view/app/index";

const AppStack = createStackNavigator({
  home: HomeScreen,
  camera: CameraScreen,
});

export class App extends React.Component<{}> {
  public render() {
    return <AppStack />;
  }
}
