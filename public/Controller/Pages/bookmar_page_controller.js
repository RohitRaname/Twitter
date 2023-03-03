import {del} from "../api/api.js"

import section_bookmark_view from "../../View/Pages/bookmark_page_view.js"
const section_bookmark = document.querySelector('.section-bookmark')

const control_clear_bookmarks = (action)=>{
    if(action==="clear-all-bookmarks") del("users/bookmark-tweets/remove-all")
}

if(section_bookmark){
    const view = new section_bookmark_view()
    view.add_handler_click_on_clear_bookmark_btns_box(control_clear_bookmarks)

}

