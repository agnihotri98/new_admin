
import React from "react";
import Protected from './Protected/Protected'; 

import './App.css';
import './components/css/fontastic.css';
import './components/css/style.default.css';
import './components/vendor/bootstrap/css/bootstrap.min.css';
import './components/vendor/font-awesome/css/font-awesome.min.css';
import './components/vendor/bootstrap/css/bootstrap-grid.min.css';
// import './components/css/custom.css';
// import './components/css/style.blue.css';
// import './components/css/style.green.css';
// import './components/css/style.pink.css';
// import './components/css/style.red.css';
// import './components/css/style.sea.css';
// import './components/css/style.violet.css';
// import './components/icons-reference/styles.css';
// import './components/vendor/bootstrap/css/bootstrap-grid.css';
// import './components/vendor/bootstrap/css/bootstrap-reboot.css';
// import './components/vendor/bootstrap/css/bootstrap.css';
// import './components/vendor/bootstrap/css/bootstrap-reboot.min.css';

// import './components/vendor/chart.js/Chart.css';
// import './components/vendor/chart.js/Chart.min.css';

// import './components/vendor/font-awesome/css/font-awesome.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import login from './components/Login/login';
import Index from './components/Index/index';
import UserList from './components/User-list/user_list';
import Userview from './components/User-View/user_view';
import OrderList from './components/Order-list/Order_list';
import OrderDetail from './components/Order-View/Order_view';
import CategoriesList from './components/Categories/Category_list';
import ItemsList from './components/Categories/item_list';
import ReviewList from './components/Review-List/Review_list';
import SliderList from './components/Sliders/Slider_List';
import HistoryList from './components/History/History';
import PromotionList from './components/Promotion/promotion';
import TestimonialList from './components/Testimonial/Testimonials';
import BlogList from './components/Blog/Blog';
import Working from './components/Working-Hours/WorkingHours';
import Report from './components/Report/Report';
import Complaint from './components/Complaint/Complaint';
import ComplaintView from './components/Complaint/CompliantView';

import secondSlider from './components/Sliders/SecSlider_List';
import chamTeam from './components/Team/ChamTeam';

import forgotPassword from './components/ForgotPassword/ForgotPassword';
import newPassword from './components/ForgotPassword/NewPassword';

import header from './components/Header/header';
import sidebar from './components/Sidebar/sidebar'
import footer from './components/Footer/footer'; 
import logout from './components/logout/logout';

// import './components/css/style.css';
// import './components/css/renponsiv.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch >
          <Route exact path='/login' component={login} />
          <Route exact path='/logout' component={logout} />
          <Route path='/forgot-password' component={forgotPassword} />
          <Route path='/new-password' component={newPassword} />
          <Protected exact path='/' component={Index} />
          <Protected exact path="/User-list" component={UserList} />
          <Protected exact path="/User-view/:id?" component={Userview} />
          <Protected exact path="/Order-List" component={OrderList} />
          <Protected exact path="/Order-Detail/:id?" component={OrderDetail} />
          <Protected exact path="/Category-List" component={CategoriesList} />
          <Protected exact path="/Item-List" component={ItemsList} />
          <Protected exact path="/Review-List" component={ReviewList} />
          <Protected exact path="/Slider-List" component={SliderList} />
          <Protected exact path="/History-List" component={HistoryList} />
          <Protected exact path="/Promotion-List" component={PromotionList} />
          <Protected exact path="/Testimonial-List" component={TestimonialList} />
          <Protected exact path="/Blog-List" component={BlogList} />
          <Protected exact path="/Working-Hours" component={Working} />
          <Protected exact path="/Complaint-List" component={Complaint} />

          <Protected exact path="/Sec-Slider-List" component={secondSlider} />
          <Protected exact path="/Cham-Team" component={chamTeam} />

          <Protected exact path="/Complaint-view/:id?" component={ComplaintView} />
          <Route path="/Reports" component={Report} />

          {/* <Route exact path='/' component={Index} />
          <Route path='/login' component={login} /> */}
          <Protected exact path="/header" component={header} />
          <Protected exact path="/sidebar" component={sidebar} />
          <Protected exact path="/footer" component={footer} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
