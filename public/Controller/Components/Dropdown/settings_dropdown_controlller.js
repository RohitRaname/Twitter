import settings_dropdown_view from "../../../View/Components/Dropdown/settings_dropdown_view.js";
import { show_customize_twitter_modal } from "../Modal/customize_twitter_modal_controller.js";

const settings_dropdown = document.querySelector('.dropdown[data-type="settings"]')

const control_dropdown = (action)=>{
  if(action===  "redirect-to-settings-page") location.assign('/settings');
   if(action=== "show-customize-twitter-modal") show_customize_twitter_modal();
}

if(settings_dropdown){
    const view= new settings_dropdown_view()
    view.addHandlerDropdown(control_dropdown)
}