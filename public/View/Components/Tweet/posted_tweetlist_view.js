import ParentPostedView from '../../Common/posted_post_list.js';

class PostedTweetView extends ParentPostedView {
  _section = document.querySelector('.section');

  _topParentEl = document.querySelector('.postedTweet-list');
  _parentEl;

  _posted_tweetlist = this._topParentEl.querySelector('.posted-tweets');
  _pinned_tweetlist = this._topParentEl.querySelector('.pinned-tweets');

  _all_tweetlists = [...document.querySelectorAll('.postedTweet-list')];

  _tweetOptionsDropdown = document.querySelector(
    '.dropdown[data-type="post-options-dropdown"]'
  );
  _retweet_quote_tweet_Dropdown = document.querySelector(
    '.dropdown[data-type="retweet_quote_post"]'
  );

  _cur_user_data =
    document.querySelector('.section').dataset.curUser &&
    JSON.parse(document.querySelector('.section').dataset.curUser);

  _tweet_reply_modal = document.querySelector('.tweet-reply');

  // btn
  _tweet_reply_btn;
  _retweet_quote_tweet_btn;

  tweet_id;
  tweet_user_id;
  tweet_user_name;

  _generate_markUp(tweet_arr, tweet_group_type) {
    const tweets_html = tweet_arr
      .map((tweet) => {
        let { tweet_type, text, upload_imgs, ts_format, posted_tweet, pinned } =
          tweet;

        // check if we are in user profile and check same user is viewing its own profile
        const user_id = tweet.user_id || tweet.user._id;

        const is_section_user_profile = document.querySelector(
          '.section-user-profile'
        );
        const is_me = user_id === this._cur_user_data._id;

        const user = tweet.user_details || tweet.user;
        let { avatar, profilePic, name } = user;

        avatar = avatar.slice(1);

        text = tweet.text;
        upload_imgs = tweet.upload_imgs;
        let upload_imgs_exist = upload_imgs ? upload_imgs.length > 0 : false;

        // quote tweet
        const posted_tweet_img_exist =
          posted_tweet &&
          posted_tweet.upload_imgs &&
          posted_tweet.upload_imgs.length > 0;

        // format readable-time
        ts_format =
          tweet_type === 'retweet'
            ? `${Math.floor(
                (new Date() - new Date(tweet.posted_tweet.ts)) / (3600 * 1000)
              )}hr`
            : ts_format;
        if (!ts_format)
          ts_format = `${Math.floor(
            (new Date() - new Date(tweet.ts)) / (3600 * 1000)
          )}hr`;

        return `
    <div
        class="tweet postedTweet preview-item-container dropdown-details"
        data-post= '${JSON.stringify({
          _id: tweet._id,
          type: tweet.tweet_type,
          ts: tweet.ts,
          ts_format: ts_format,
          text: `${tweet.text}`,
          follow_by_cur_user: tweet.follow_by_cur_user,
          cur_user_can_reply: tweet.cur_user_can_reply,
          tweet_user_mute: tweet.tweet_user_mute,
          format: 'tweet',
          quote_tweet_parent_id_arr: tweet.quote_tweet_parent_id_arr,
          retweet_parent_id_arr: tweet.retweet_parent_id_arr,
          upload_imgs: tweet.upload_imgs,
          pinned: pinned,

          user: {
            _id: tweet.user_id,
            avatar: user.avatar,
            name: `${user.name}`,
            profilePic: user.profilePic,
          },
        })}'
        data-post-format="tweet"
        data-post-user-id=${tweet.user_id}
        data-post-id=${tweet._id}
        data-post-type=${tweet_type}
        data-retweet-parent-id=${
          tweet_type === 'retweet' ? tweet.retweet_parent_id : ''
        }
  >

  ${
    // set retweet type
    tweet_type === 'retweet' ||
    (is_section_user_profile && tweet_type === 'retweet' && !pinned)
      ? `
            <div class="f-sm f-3 tweet-retweet-title">
                <i class="fa fa-retweet"></i>
                <p class="p--lw">You Retweet</p>
            </div>
            `
      : ''
  }                                                   
  ${
    // if pinned tweet
    pinned && is_section_user_profile
      ? `
            <div class="f-sm f-3 tweet-retweet-title">
                <i class="fas fa-thumb-tack"></i>
                <p class="p--lw">Pinned Tweet</p>
            </div>
            `
      : ''
  }                                                   



      <div class="tweet-container" data-active="false">
        <a href="/users/${avatar}"
          ><img
            class="tweet-img img--md"
            src="/img/users/${profilePic}"
            onerror="this.src='/img/users/default.png'"
            data-preview-window-target-el="true"
        /></a>
        <div class="tweet-content">
          <div
            class="tweet-user__info preview-item"
            data-hover=""
            data-no-hover-change=""
            data-name="jdkjkjf"
            data-avatar="@rana"
            data-bio=""
            data-user-id="6334670cb0d772863c7ac1be"
            data-following_count=""
            data-followers_count=""
            data-user-detail-set="false"
          >
            <a
              class="tweet-user__name h-8 hover-underline"
              href="/users/${avatar}"
              data-preview-window-target-el="true"
              >${name}</a
            ><a
              class="tweet-user__verified"
              data-preview-window-target-el="true"
            ></a>
            <p
              class="tweet-user__email t--md"
              href="/users/${avatar}"
              data-preview-window-target-el="true"
            >
              ${avatar}
            </p>
            <p class="tweet-user__postTime t--md hover-underline">${ts_format}</p>
          </div>
          <button
            class="tweet-btn tweet-options-btn btn--icon-dim-primary"
            data-dropdown-btn=""
            data-dropdown-class="${
              is_me ? 'cur-user-post-options-dropdown' : 'post-options-dropdown'
            }"
            data-active="false"
          >
            <div class="icon-box">
              <i class="fas fa-ellipsis" aria-hidden="true"></i>
            </div>
          </button>

            
             <div class="tweet-message mg-lw p--md">${text || ''}</div>

            <div class="tweet-uploadImg__container mg-lw ${
              upload_imgs_exist ? '' : 'hidden'
            } ">
            <div class="tweet-uploadImg__content grid--collage" data-items=${
              upload_imgs_exist ? upload_imgs.length : 0
            }  >
    
            
            ${
              upload_imgs_exist
                ? upload_imgs
                    .map(
                      (img) => `
              <figure class="tweet-uploadImg__fig">
                  <img class="tweet-uploadImg" src="/img/tweets/${img}"
                  }  alt=""/>
              </figure>
                  `
                    )
                    .join('')
                : ''
            }
              </div>
              </div>


            ${
              tweet.posted_tweet && tweet.posted_tweet.text
                ? `      <article
              class="quotetweet-posted-tweet p-sm"
              data-tweet-id="${posted_tweet._id}"
              >
                  <img class="tweet-img img--lw" src="/img/users/${
                    posted_tweet.user.profilePic
                      ? posted_tweet.user.profilePic
                      : 'default.png'
                  }" />
                  <div class="tweet-content mg-sl">
                    <div class="tweet-user__info f-sl f-3">
                      <p class="tweet-user__name h-8 mg-0" href="">${
                        posted_tweet.user.name
                      }</p>
                      <p class="tweet-user__verified"></p>
                      <p class="tweet-user__email t--md" href="/">${
                        posted_tweet.user.avatar
                      }</p>
                      <p class="tweet-user__postTime t--md">${Math.floor(
                        (new Date() - new Date(posted_tweet.ts)) / (3600 * 1000)
                      )}hr</p>
                    </div>
                    <div class="tweet-message p--md">${
                      posted_tweet.text || ''
                    }</div>

                    <div class="tweet-uploadImg__container mg-lw ${
                      posted_tweet_img_exist ? '' : 'hidden'
                    }">
                      <div class="tweet-uploadImg__content grid--collage" data-items=${
                        (posted_tweet_img_exist &&
                          posted_tweet.upload_imgs.length) ||
                        0
                      }>
        
                      ${
                        posted_tweet_img_exist > 0
                          ? posted_tweet.upload_imgs
                              .map(
                                (img) => `
                          <figure class="tweet-uploadImg__fig ">
                          <img class="tweet-uploadImg" src=${
                            typeof img === 'object'
                              ? URL.createObjectURL(img)
                              : `/img/tweets/${img}`
                          } alt="" />
                          </figure>`
                              )
                              .join(' ')
                          : ''
                      }
        
                      </div>
                      </div>
                  </div>


            </article>`
                : ''
            }
              <div class="tweet-btns">
              <button
                class="tweet-btn btn--icon-dim-primary"
                data-action="write-comment"
                data-active=${
                  Number(tweet.metadata?.comment_count) > 0 ? true : false
                }
              >
                <div class="icon-box">
                  <i class="fa fa-commenting${
                    tweet.like_by_cur_user ? '' : '-o'
                  }" aria-hidden="true"></i>
                </div>
                <span class="tweet-btn__value btn--icon-value">${
                  tweet.metadata?.comment_count || 0
                }</span></button
              ><button
                class="tweet-btn btn--icon-dim-secondary"
                data-action="retweet"
                data-dropdown-btn=""
                data-dropdown-class="retweet_quote_post"
                data-active=${
                  Number(tweet.metadata?.retweet_count) > 0 ? true : false
                }
              >
                <div class="icon-box">
                  <i class="fa fa-retweet" aria-hidden="true"></i>
                </div>
                <span class="tweet-btn__value btn--icon-value">${
                  tweet.metadata?.retweet_count || 0
                }</span></button
              ><button
                class="tweet-btn btn--icon-dim-tertiary"
                data-action="like"
                data-active=${tweet.like_by_cur_user}
              >
                <div class="icon-box">
                  <i class="fa fa-heart${
                    tweet.like_by_cur_user ? '' : '-o'
                  }" aria-hidden="true"></i>
                </div>
              
                <span class="tweet-btn__value btn--icon-dim-value">${
                  tweet.metadata?.like_count || 0
                }</span></button
              ><button
                class="tweet-btn btn--icon-dim-primary"
                data-action="bookmark"
                data-active=${tweet.bookmark_by_cur_user}
              >
              ${
                is_me
                  ? ''
                  : `
              <div class="icon-box">
              
              <i class="fa fa-bookmark${
                tweet.bookmark_by_cur_user ? '' : '-o'
              }" aria-hidden="true"></i>
              </div>
              `
              }
              </button>
            </div>
      </div>
  </div>
  </div>

    `;
      })
      .join('');

    return `<div class="postedTweet-group" data-tweets-count=${tweet_group_type}>${tweets_html}</div>`;
  }

  generate_markup_for_new_tweets_added(tweets) {
    const tweet_arr = Array.isArray(tweets) ? tweets : [tweets];
    const tweet_group_type = tweet_arr.length > 1 ? 'multiple' : 'single';
    return this._generate_markUp(tweet_arr, tweet_group_type);
  }

  generate_markup_for_page_tweets(tweet_arr) {
    const tweet_key_arr = Object.keys(tweet_arr);
    return tweet_key_arr
      .map((key) => {
        if (tweet_arr[key].length > 1)
          return this._generate_markUp(tweet_arr[key], 'multiple');
        return this._generate_markUp(tweet_arr[key], 'single');
      })
      .join('');
  }

  // render use for => new tweets are added
  render(tweets, page_tweets = false, return_html = false) {
    // if section is user-profile we dont want cur_user to insert tweet into other profile user

    if (
      this._section.dataset.section === 'user-profile' &&
      this._section.dataset.isMe === 'false' &&
      !page_tweets
    )
      return;

    const html = page_tweets
      ? this.generate_markup_for_page_tweets(tweets)
      : this.generate_markup_for_new_tweets_added(tweets);

    if (return_html) return html;

    // check section -> if comment page no need to put tweet in comment posted_tweet-list
    if (document.querySelector('.section-comment')) return;

    if (!Array.isArray(tweets) && tweets.pinned) {
      this._pinned_tweetlist.insertAdjacentHTML('afterbegin', html);
    } else
      this._posted_tweetlist.insertAdjacentHTML(
        page_tweets ? 'beforeend' : 'afterbegin',
        html
      );
  }

  return_single_tweet_markup(tweet_arr) {
    return tweet_arr
      .map((tweet) => this._generate_markUp([tweet], 'single'))
      .join('');
  }

  _get_tweetlist_allitems() {
    return [...this._topParentEl.querySelectorAll('.postedTweet')];
  }

  remove_tweet_item_from_postedtweetlist(tweet_el, optional_tweet_id) {
    const tweet_itemel = tweet_el
      ? tweet_el
      : this._topParentEl.querySelector(
          `.tweet[data-post-id="${optional_tweet_id}"]`
        );
    const tweet_groupel = tweet_itemel.closest('.postedTweet-group');

    const groupel_type = tweet_groupel.getAttribute('data-tweets-count');
    const total_tweets = Number(
      tweet_groupel.getAttribute('data-total-tweets')
    );

    if (groupel_type === 'multiple') {
      tweet_itemel.remove();
      if (total_tweets === 2)
        tweet_groupel.setAttribute('data-tweets-count', 'single');
      return;
    }

    tweet_groupel.remove();
  }

  remove_retweet_item_from_list(retweet_id) {
    const tweet_el = this._topParentEl.querySelector(
      `.postedTweet[data-retweet-parent-id="${retweet_id}"]`
    );
    this.remove_tweet_item_from_postedtweetlist(tweet_el);
  }

  // MULTIPLE TWEETS => update all user specific tweets for(follow and mute options) || block-tweets || block-user
  update_dom_posted_tweet_el_dataset_post_attr(
    user_id,
    field,
    value,
    tweet_id
  ) {
    // this func should be inside the posted tweet list
    const tweet_items = [...this._topParentEl.querySelectorAll('.postedTweet')];

    tweet_items.forEach((tweet_item) => {
      const user_id_match =
        tweet_item.getAttribute('data-post-user-id') === user_id;
      const tweetid_match = tweet_item.dataset.postId === tweet_id;

      // block-tweet -------
      if (tweetid_match && field === 'block-tweet')
        this.remove_tweet_item_from_postedtweetlist(tweet_item);

      // {
      //   const tweet_group_el = tweet_item.closest('.postedTweet-group');

      //   const total_tweet_in_group = [
      //     ...tweet_group_el.querySelectorAll('.postedTweet'),
      //   ].length;

      //   const tweet_group_el_type =
      //   tweet_group_el.getAttribute('data-tweets-count');

      //   // if groupel has more than one tweet (so remove tweet item only)
      //   if (tweet_group_el_type === 'multiple' && total_tweet_in_group > 1)
      //   return tweet_item.remove();

      //   // if groupel has only one tweet (so remove groupel whole)
      //   else if (
      //     tweet_group_el_type === 'multiple' &&
      //     total_tweet_in_group === 1
      //   )
      //     tweet_group_el.remove();

      //     // if single groupel so remove whole group el
      //   else return tweet_item.closest('.postedTweet-group').remove();
      // }

      // block-user
      if (user_id_match && field === 'block-user') {
        tweet_item.closest('.postedTweet-group').remove();
      }

      // other-update-field
      else if (
        user_id_match &&
        (field === 'follow_by_cur_user' ||
          field === 'mute_by_cur_user' ||
          field === 'block_by_cur_user')
      ) {
        const post = JSON.parse(tweet_item.dataset.post);
        post[field] = value;
        tweet_item.dataset.post = JSON.stringify(post);
      }
    });
  }

  // SINGLE TWEET
  update_single_tweet_item_data_attr(tweet_id, field, value) {
    const tweet_item = this._topParentEl.querySelector(
      `.postedTweet[data-post-id="${tweet_id}"]`
    );
    const post = JSON.parse(tweet_item.dataset.post);
    post[field] = value;
    tweet_item.dataset.post = JSON.stringify(post);
  }

  _handle_post_options_dropdown(target, handle) {
    // 1.set tweet id and tweet user id in dropdown
    // 2.set tweet user name in list item span el

    const btn = target.closest('.tweet-options-btn');
    if (!btn) return;

    const post_options_dropdown_classname = btn.dataset.dropdownClass;

    handle(`display-${post_options_dropdown_classname}`, this.post_data);
  }

  addHandlerPostedTweet(handle) {
    this._all_tweetlists.forEach((list) =>
      list.addEventListener('click', this.handle_post.bind(this, handle))
    );
  }
}

export default PostedTweetView;

// i will never again no matter how many dogs how many pitbull i am strong ...
