import {patch } from "../../api/api.js"

import ChooseWhoCanReplyAudiencePreview from '../../../View/Components/Preview/2.chooseWhoCanReplyView.js';


let View;

const choose_who_can_reply_el = document.querySelector(
  '.preview[data-type="choose-who-can-reply"] '
);

export const set_reply_btn_text_And_value_in_tweet = (value,tweet)=>{
  View.set_who_can_reply_btn_text_And_value_in_tweet(value,tweet)

} 

const control_audience_can_reply = (action,data) => {
  if(action==="update-tweet") {
    const {tweet_id,update_tweet} = data;
    patch(`tweets/${tweet_id}`,update_tweet)

  }
};



if (choose_who_can_reply_el) {
  View = new ChooseWhoCanReplyAudiencePreview();
  View.add_handler_preview(control_audience_can_reply);
}
