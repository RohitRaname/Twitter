import ParentPostedTwet from '../../Common/posted_post_list.js';
import { readable_time } from '../../utils/helper.js';

class posted_comment_list_view extends ParentPostedTwet {
  _topParentEl = document.querySelector('.comment');
  _section = document.querySelector('.section-comment');
  _cur_user = JSON.parse(document.querySelector('.section').dataset.curUser);

  _all_comment_list = [...document.querySelectorAll('.comment-list')];
  _comment_list = document.querySelector('.comment-list-footer');

  _cur_comment_list;

  tweet_id;
  tweet_user_id;
  tweet_user_name;
  commentId;

  // tweet display in header el
  _top_main_comment_or_tweet = document
    .querySelector('.section-comment')
    ?.querySelector('.comment-tweet');

  // comment-box > comment-group > comment-item

  _generate_comment_item_markUp(comment) {
    const author = comment.author;
    const reply_to = comment.reply_to;

    const { like_by_cur_user, comment_by_cur_user, bookmark_by_cur_user } =
      comment;

    const mine_comment =
      comment.author._id.toString() === this._cur_user._id.toString();
    const child_comment_count = Number(comment.child_comments_count);

    const ts_format = readable_time(comment.ts);

    // const child_comment_exist = child_comment_count > 0;

    const upload_imgs = comment.upload_imgs;
    let upload_imgs_exist = upload_imgs ? upload_imgs.length > 0 : false;
    return `  <div
    class="comment-item tweet p-sm"
    data-post='${JSON.stringify({
      _id: comment._id,
      tweet_id: comment.tweet_id,
      type: 'comment',
      ts: comment.ts,
      ts_format: ts_format,
      text: comment.text,
      upload_imgs: comment.upload_imgs,
      reply_to: reply_to,
      format: 'comment',
      author: author,
    })}'

    data-post-id=${comment._id}
    data-post-type="comment" 
    data-post-reply-to=reply_to
    data-post-avatar=${author.avatar}
    data-post-format="comment" 
  >
    <div
      class="preview-item preview-item-container"
      data-hover=""
      data-no-hover-change=""
      data-name="${author.name}"
      data-avatar="${author.avatar}"
      data-bio=""
      data-user-id=${author._id}
      data-following_count=""
      data-followers_count=""
      data-user-detail-set="false"
    >
      <img
        class="preview-img img--lg"
        src="/img/users/${author.profilePic || 'default.png'}"
        data-preview-window-target-el="true"
      />
      <div class="preview-details">
        <f-sm class="f-3 mg-sl"
          ><span class="preview-title" data-preview-window-target-el="true"
            >${author.name}</span
          ><span class="t--md" data-preview-window-target-el="true"
            >${author.avatar}</span
          ><span class="dot"></span><span class="t--md">${ts_format}</span></f-sm
        ><span class="preview-extra"
          ><div class="comment-replying t--md">
            Replying to <span class="blue">${reply_to.join(' ')}</span>
          </div></span
        >
      </div>
      <div class="preview-state">
        <button
          class="tweet-btn tweet-options-btn btn--icon-dim-primary"
          data-dropdown-btn=""
          data-dropdown-class="post-options-dropdown"
          data-active="false"
        >
          <div class="icon-box">
            <i class="fas fa-ellipsis" aria-hidden="true"></i>
          </div>
        </button>
      </div>
      </div>


    <div class="comment-item-content">
        <div class="comment-text  mg-sm word-break">${comment.text || ''}</div>

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
              <img class="tweet-uploadImg" src="/img/comments/${img}"
              }  alt=""/>
          </figure>
              `
                )
                .join('')
            : ''
        }
          </div>
          </div>


        <div class="tweet-btns f-s-a mg-sl">
          <button
            class="tweet-btn btn--icon-dim-primary"
            data-action="write-comment" data-active="${comment_by_cur_user}"
          >
            <div class="icon-box">
              <i class="fa fa-commenting${
                comment_by_cur_user ? '' : '-o'
              }" aria-hidden="true"></i>
            </div>
            <span class="tweet-btn__value btn--icon-value">${
              comment.child_comments_count
            }</span></button
          ><button class="tweet-btn btn--icon-dim-tertiary" data-action="like" data-active="${like_by_cur_user}">
            <div class="icon-box">
              <i class="fa fa-heart${
                like_by_cur_user ? '' : '-o'
              }" aria-hidden="true"></i>
            </div>
            <div class="icon-box hidden">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
            <span class="tweet-btn__value btn--icon-dim-value">${
              comment.metadata.like_count
            }</span></button
          >
          <button
            class="tweet-btn btn--icon-dim-primary"
            data-action="bookmark"
            data-active="${bookmark_by_cur_user}"
            >
            ${
              mine_comment
                ? ''
                : `
            <div class="icon-box">
              <i class="fa fa-bookmark${
                bookmark_by_cur_user ? '' : '-o'
              }" aria-hidden="true"></i>
            </div>
          
            `
            }
          </button>
        </div>

    </div>
    
  </div>`;
  }

  _generate_comment_box_markUp(comment) {
    // const author = comment.author;
    // const reply_to = comment.reply_to;
    const child_comment_count = Number(comment.child_comments_count);
    const child_comment_exist = child_comment_count > 0;

    // const upload_imgs = comment.upload_imgs;
    // let upload_imgs_exist = upload_imgs ? upload_imgs.length > 0 : false;

    //   const parent_comment_html = `  <div
    //   class="comment-item tweet p-sm"
    //   data-post='${JSON.stringify({
    //     _id: comment._id,
    //     tweet_id: comment.tweet_id,
    //     type: 'comment',
    //     ts: comment.ts,
    //     ts_format: comment.ts_format,
    //     text: comment.text,
    //     upload_imgs: comment.upload_imgs,
    //     reply_to: reply_to,
    //     format: 'comment',
    //     author: author,
    //   })}'

    //   data-post-id=${comment._id}
    //   data-post-type="comment"
    //   data-post-reply-to=reply_to
    //   data-post-avatar=${author.avatar}
    //   data-post-format="comment"
    // >
    //   <div
    //     class="preview-item preview-item-container"
    //     data-hover=""
    //     data-no-hover-change=""
    //     data-name="${author.name}"
    //     data-avatar="${author.avatar}"
    //     data-bio=""
    //     data-user-id=${author._id}
    //     data-following_count=""
    //     data-followers_count=""
    //     data-user-detail-set="false"
    //   >
    //     <img
    //       class="preview-img img--lg"
    //       src="/img/users/${author.profilePic || 'default.png'}"
    //       data-preview-window-target-el="true"
    //     />
    //     <div class="preview-details">
    //       <f-sm class="f-3 mg-sl"
    //         ><span class="preview-title" data-preview-window-target-el="true"
    //           >${author.name}</span
    //         ><span class="t--md" data-preview-window-target-el="true"
    //           >${author.avatar}</span
    //         ><span class="dot"></span><span class="t--md">0m</span></f-sm
    //       ><span class="preview-extra"
    //         ><div class="comment-replying t--md">
    //           Replying to <span class="blue">${reply_to.join(' ')}</span>
    //         </div></span
    //       >
    //     </div>
    //     <div class="preview-state">
    //       <button
    //         class="tweet-btn tweet-options-btn btn--icon-dim-primary"
    //         data-dropdown-btn=""
    //         data-dropdown-class="post-options-dropdown"
    //         data-active="false"
    //       >
    //         <div class="icon-box">
    //           <i class="fas fa-ellipsis" aria-hidden="true"></i>
    //         </div>
    //       </button>
    //     </div>
    //     </div>

    //   <div class="comment-item-content">
    //       <div class="comment-text mg-sm"><p>${comment.text || ''}</p></div>

    //       <div class="tweet-uploadImg__container mg-lw ${
    //         upload_imgs_exist ? '' : 'hidden'
    //       } ">
    //       <div class="tweet-uploadImg__content grid--collage" data-items=${
    //         upload_imgs_exist ? upload_imgs.length : 0
    //       }  >

    //       ${
    //         upload_imgs_exist
    //           ? upload_imgs
    //               .map(
    //                 (img) => `
    //         <figure class="tweet-uploadImg__fig">
    //             <img class="tweet-uploadImg" src="/img/comments/${img}"
    //             }  alt=""/>
    //         </figure>
    //             `
    //               )
    //               .join('')
    //           : ''
    //       }
    //         </div>
    //         </div>

    //       <div class="tweet-btns f-s-a mg-sl">
    //         <button
    //           class="tweet-btn btn--icon-dim-primary"
    //           data-action="write-comment" data-active="false"
    //         >
    //           <div class="icon-box">
    //             <i class="fa fa-commenting-o" aria-hidden="true"></i>
    //           </div>
    //           <span class="tweet-btn__value btn--icon-value">${
    //             comment.child_comments_count
    //           }</span></button
    //         ><button class="tweet-btn btn--icon-dim-tertiary" data-action="like" data-active="false">
    //           <div class="icon-box">
    //             <i class="fa fa-heart-o" aria-hidden="true"></i>
    //           </div>
    //           <div class="icon-box hidden">
    //             <i class="fa fa-heart" aria-hidden="true"></i>
    //           </div>
    //           <span class="tweet-btn__value btn--icon-dim-value">${
    //             comment.metadata.like_count
    //           }</span></button
    //         ><button
    //           class="tweet-btn btn--icon-dim-primary"
    //           data-action="bookmark"
    //         >
    //           <div class="icon-box">
    //             <i class="fa fa-bookmark-o" aria-hidden="true"></i>
    //           </div>
    //           <div class="icon-box hidden">
    //             <i class="fa fa-bookmark" aria-hidden="true"></i>
    //           </div>
    //         </button>
    //       </div>

    //   </div>

    // </div>`;

    const parent_comment_html = this._generate_comment_item_markUp(comment);

    if (!child_comment_exist)
      return `
      <div class="comment-box">
      <div class="comment-group" data-items-count="single">${parent_comment_html}</div>
      </div>
      `;

    parent_comment_html;
    const child_comment = comment.reply;

    //     const child_comment_html = `  <div
    //   class="comment-item tweet p-sm"
    //   data-post='${JSON.stringify({
    //     _id: child_comment._id,
    //     tweet_id: child_comment.tweet_id,
    //     type: 'comment',
    //     ts: child_comment.ts,
    //     ts_format: child_comment.ts_format,
    //     text: child_comment.text,
    //     upload_imgs: child_comment.upload_imgs,
    //     reply_to: reply_to,
    //     format: 'comment',
    //     author: author,
    //   })}'

    //   data-post-id=${child_comment._id}
    //   data-post-type="comment"
    //   data-post-reply-to=reply_to
    //   data-post-avatar=${author.avatar}
    //   data-post-format="comment"
    // >
    //   <div
    //     class="preview-item preview-item-container"
    //     data-hover=""
    //     data-no-hover-change=""
    //     data-name="${author.name}"
    //     data-avatar="${author.avatar}"
    //     data-bio=""
    //     data-user-id=${author._id}
    //     data-following_count=""
    //     data-followers_count=""
    //     data-user-detail-set="false"
    //   >
    //     <img
    //       class="preview-img img--lg"
    //       src="/img/users/${author.profilePic || 'default.png'}"
    //       data-preview-window-target-el="true"
    //     />
    //     <div class="preview-details">
    //       <f-sm class="f-3 mg-sl"
    //         ><span class="preview-title" data-preview-window-target-el="true"
    //           >${author.name}</span
    //         ><span class="t--md" data-preview-window-target-el="true"
    //           >${author.avatar}</span
    //         ><span class="dot"></span><span class="t--md">0m</span></f-sm
    //       ><span class="preview-extra"
    //         ><div class="comment-replying t--md">
    //           Replying to <span class="blue">${reply_to.join(' ')}</span>
    //         </div></span
    //       >
    //     </div>
    //     <div class="preview-state">
    //       <button
    //         class="tweet-btn tweet-options-btn btn--icon-dim-primary"
    //         data-dropdown-btn=""
    //         data-dropdown-class="post-options-dropdown"
    //         data-active="false"
    //       >
    //         <div class="icon-box">
    //           <i class="fas fa-ellipsis" aria-hidden="true"></i>
    //         </div>
    //       </button>
    //     </div>
    //     </div>

    //   <div class="comment-item-content">
    //       <div class="comment-text mg-sm"><p>${child_comment.text || ''}</p></div>

    //       <div class="tweet-uploadImg__container mg-lw ${
    //         upload_imgs_exist ? '' : 'hidden'
    //       } ">
    //       <div class="tweet-uploadImg__content grid--collage" data-items=${
    //         upload_imgs_exist ? upload_imgs.length : 0
    //       }  >

    //       ${
    //         upload_imgs_exist
    //           ? upload_imgs
    //               .map(
    //                 (img) => `
    //         <figure class="tweet-uploadImg__fig">
    //             <img class="tweet-uploadImg" src="/img/comments/${img}"
    //             }  alt=""/>
    //         </figure>
    //             `
    //               )
    //               .join('')
    //           : ''
    //       }
    //         </div>
    //         </div>

    //       <div class="tweet-btns f-s-a mg-sl">
    //         <button
    //           class="tweet-btn btn--icon-dim-primary"
    //           data-action="write-comment" data-active="false"
    //         >
    //           <div class="icon-box">
    //             <i class="fa fa-commenting-o" aria-hidden="true"></i>
    //           </div>
    //           <span class="tweet-btn__value btn--icon-value">${
    //             child_comment.child_comments_count
    //           }</span></button
    //         ><button class="tweet-btn btn--icon-dim-tertiary" data-action="like" data-active="false">
    //           <div class="icon-box">
    //             <i class="fa fa-heart-o" aria-hidden="true"></i>
    //           </div>
    //           <div class="icon-box hidden">
    //             <i class="fa fa-heart" aria-hidden="true"></i>
    //           </div>
    //           <span class="tweet-btn__value btn--icon-dim-value">${
    //             child_comment.metadata.like_count
    //           }</span></button
    //         ><button
    //           class="tweet-btn btn--icon-dim-primary"
    //           data-action="bookmark"
    //         >
    //           <div class="icon-box">
    //             <i class="fa fa-bookmark-o" aria-hidden="true"></i>
    //           </div>
    //           <div class="icon-box hidden">
    //             <i class="fa fa-bookmark" aria-hidden="true"></i>
    //           </div>
    //         </button>
    //         </div>

    //         </div>
    //         ${
    //           Number(child_comment.child_comments_count) > 0
    //             ? "<button class='btn--text-left show-comment-replies'>Show Replies</button>"
    //             : ''
    //         }
    //         </div>

    //         `;

    const child_comment_html =
      this._generate_comment_item_markUp(child_comment);
    return `
    <div class="comment-box">
      <div class="comment-group" data-items-count="multiple">${
        parent_comment_html + child_comment_html
      }</div>
      </div>
      
      `;
  }

  insert_comment_in_comment_list(comment) {
    const comment_html = this._generate_comment_box_markUp(comment);
    this._comment_list.insertAdjacentHTML('afterbegin', comment_html);
  }

  insert_multiple_comment_in_comment_group(present_comment_id, comment_arr) {
    const comment_group_el = this._comment_list
      .querySelector(`.comment-item[data-post-id="${present_comment_id}"]`)
      .closest('.comment-group');

    const comments_html = comment_arr
      .map((comment) => this._generate_comment_item_markUp(comment))
      .join('');

    comment_group_el.insertAdjacentHTML('beforeend', comments_html);
  }

  render_comments(comment_arr, return_html) {
    const comments_html = comment_arr
      .map((comment) => this._generate_comment_box_markUp(comment))
      .join('');

    if (return_html) return comments_html;

    this._comment_list.insertAdjacentHTML('beforeend', comments_html);
  }

  remove_comment_from_comment_list(comment_id) {
    this._comment_list
      .querySelector(`.comment-item[data-post-id=${comment_id}]`)
      .closest('.comment-box')
      .remove();
  }

  // comment-count,retweet-count,like-count
  update_top_main_comment_or_tweet_stat_count(type, value) {
    if (!this._top_main_comment_or_tweet) return;
    console.log(type, value);
    const tweet_stat = this._top_main_comment_or_tweet
      .querySelector(`button[data-action="${type}"]`)
      .querySelector('span');
    tweet_stat.textContent = Number(tweet_stat.textContent) + value;
  }

  // comment-count,like-count
  update_posted_comment_stats_count(comment_id, type, value) {
    const comment_stat = this._cur_comment_list
      .querySelector(`.comment-item[data-post-id="${comment_id}"]`)
      .querySelector(`.${type}_count`);
    if (!comment_stat) return;
    comment_stat.textContent = Number(comment_stat.textContent) + value;
  }

  _setDOMSElsAndDataAttrs(target) {
    // set post dropdown attribute from tweet detail attribute
    this._parentEl = target.closest('.comment-item');
    if (!this._parentEl) return;

    this.post_data = JSON.parse(this._parentEl.dataset.post);
    const post_user = this.post_data.author;

    this._cur_comment_list = this._parentEl.closest('.comment-list');
    this.page_type = this._cur_comment_list.dataset.pageType;

    this.post_id = this.post_data._id;
    this.post_user_id = post_user._id;
    this.post_type = this.post_data.type;
    this.post_user_avatar = post_user.avatar;
    this.post_user_name = post_user.name;
    this.post_format = this.post_data.format;

    this._tweet_reply_btn = this._parentEl.querySelector(
      'button[data-action="write-comment"]'
    );
    // this._retweet_quote_tweet_btn = this._parentEl.querySelector(
    //   'button[data-action="retweet"]'
    // );
  }
  _handle_reply_to_post(target, handle) {
    const btn = target.closest('button[data-action="write-comment"]');
    if (!btn) return;
    const comment = JSON.parse(this._parentEl.dataset.post);
    (comment.post_user_name = comment.author.name),
      (comment.action = 'comment'),
      handle('add-reply-to-comment', comment, this.page_type);
  }

  _handle_show_comment_replies_below_comment(target, handle) {
    const btn = target.closest('.show-comment-replies');
    if (!btn) return;

    handle('load-comment-replies', {
      comment_id: this.post_id,
    });
  }

  _handle_click_on_list_item_el(target, handle) {
    if (target.closest('.show-comment-replies')) return;

    // name or img or avatar
    if (
      target.closest('.tweet-img') ||
      target.closest('.tweet-user_name') ||
      target.closest('.tweet-user__email') ||
      target.closest('.comment-replying a')
    ) {
      handle('redirect-to-user', { avatar: this.post_user_avatar });
    } else {
      if (
        (!target.closest('button') && !target.closest('.comment-tweet')) ||
        target.closest('.show-comment-replies')
      ) {
        let show_comment_with_gallery;
        if (target.closest('.tweet-uploadImg'))
          show_comment_with_gallery = 'gallery';
        else show_comment_with_gallery = 'normal';
        handle('redirect-to-post', {
          post_type: this.post_type,
          post_id: this.post_id,
          show_comment_with_gallery,
        });
      }
    }
  }

  additional_funcs(target, handle) {
    this._handle_show_comment_replies_below_comment(target, handle);
  }

  add_handler_comments(handle) {
    this._all_comment_list.forEach((list) =>
      list.addEventListener('click', this.handle_post.bind(this, handle))
    );
  }
}

export default posted_comment_list_view;
