import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./screens/SigninScreen";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={SigninScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
