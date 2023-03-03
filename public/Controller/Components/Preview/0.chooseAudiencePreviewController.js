import ChooseAudiencePreview from '../../../View/Components/Preview/1.ChooseAudiencePreview.js';
import { display_circle_modal } from '../Modal/twitterCircleModalController.js';

let View;

const choose_audience_preview_el = document.querySelector(
  '.preview[data-type="choose-audience"] '
);

export const update_circle_count = (circle_count) =>
  View.update_circle_count(circle_count);

export const increase_or_decrease_circle_count = (count)=>View.increase_or_decrease_circle_count(count)

export const set_tweet_choose_audience_btn_text_and_its_input_value = (
  value,
  tweet
) => View.set_choose_audience_btn_text_and_its_input_in_tweet(value, tweet);

const control_target_audience = async (action) => {
  if (action === 'show-circle-modal') display_circle_modal();
};

if (choose_audience_preview_el) {
  View = new ChooseAudiencePreview();
  View.addHandlerPreview(control_target_audience);
}
