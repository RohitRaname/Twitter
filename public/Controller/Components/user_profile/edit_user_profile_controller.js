
import {patch} from "../../api/api.js"
import edit_user_profile_view from "../../../View/Components/user_profile/edit_user_profile_view.js";

const edit_user_profile_form = document.querySelector('.edit-profile')
let view;

const update_user_profile = async(action,data)=> {
    const res =await patch('users/me',data)
    view.update_user_inputel_in_modal(res.data.docs)


}


export const show_user_profile_modal = ()=> view.show()


if(edit_user_profile_form){
    view = new edit_user_profile_view()
    view.submitform(update_user_profile)
    


}