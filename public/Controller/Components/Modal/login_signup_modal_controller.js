import Login_signup_modal_view from "../../../View/Components/Modal/login_signup_modal_view.js";
import { control_non_login_user_page } from "../../Pages/non_login_user_page_controller.js"

let View;

const login_signup_modal = document.querySelector('.modal[data-modal="login-signup-modal"]')

export const update_login_signup_modal_content_and_show = (action_type,user_name)=>View.update_modal_text_content_and_show(action_type,user_name)

if(login_signup_modal){
    View= new Login_signup_modal_view()
    View.handleModal(control_non_login_user_page)
}