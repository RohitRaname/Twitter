import {get} from "../api/api.js"
import { connect_people_view } from '../../View/Pages/connect_people_view.js';
import { control_sidebar_follow_container } from '../Layouts/sidebar_controller.js';
const connect_people_page = document.querySelector('.section-connect-people');


const control_load_docs = async(data)=>{
  const res =await get(`users/me/suggest-user-to-follow/${data.page}/12`)
  return res.data.docs;
}

if (connect_people_page) {
  const View = new connect_people_view();
  View.add_handler_page(control_sidebar_follow_container);
  View.add_handler_load_docs_on_scroll(control_load_docs)
}
