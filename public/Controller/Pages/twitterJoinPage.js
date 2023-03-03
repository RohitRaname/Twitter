import { findEl } from '../utils/domHelper.js';
import TwitterJoinPageView from '../../View/Pages/1.twitterJoinPageView.js';

const twitterJoinUpPage = findEl('twitter__joinPage');
if (twitterJoinUpPage) {
  const View = new TwitterJoinPageView();
  View.handlePage();
}
