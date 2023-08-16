import {createStackNavigator} from 'react-navigation-stack';

import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';
import Booking from '../screens/Booking';
import Order_Details from '../screens/Order_Details';
import Order_Status from '../screens/Order_Status';
import Route from '../screens/Route';
import Setting from '../screens/Setting';
import Payment from '../screens/Payment';
import RegisterCustomer from '../screens/RegisterCustomer'
import AssignBag from '../screens/AssignBag'
import ReadBagDetails from '../screens/ReadBagDetails'

export default createStackNavigator(
  {
    Login,
    Dashboard,
    Profile,
    Booking,
    Order_Details,
    Order_Status,
    Route,
    Setting,
    Payment,
    RegisterCustomer,
    AssignBag,
    ReadBagDetails
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
