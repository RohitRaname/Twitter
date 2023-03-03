export class load_docs_on_scroll_view {
  // same
  scroll_el;
  docs_insert_list;

  // change
  page;
  docs_loading;
  no_more_docs;

  generate_doc_markup(doc) {
    return ``;
  }

  insert_docs(docs) {
    const html = docs.map((doc) => this.generate_doc_markup(doc)).join('');
    this.docs_insert_list.insertAdjacentHTML('beforeend', html);
  }

  set_data_to_query_docs(data) {
    return data;
  }

  add_handler_load_docs_on_scroll(handle) {
    this.scroll_el.addEventListener('scroll', async () => {
      const { no_more_docs, docs_loading, page } =
        this.docs_insert_list.dataset;

      if (docs_loading === 'true' || no_more_docs === 'true') return;

      //   const profile_user = JSON.parse(section_home.dataset.profileUser);

      if (
        this.docs_insert_list.scrollTop +
          this.docs_insert_list.clientHeight +
          10 >
        this.docs_insert_list.scrollHeight
      ) {
        this.docs_insert_list.dataset.docs_loading = 'true';

        this.docs_insert_list.dataset.page = Number(page) + 1;

        let data={};
        data.page = this.docs_insert_list.dataset.page;
        data = this.set_data_to_query_docs(data);

        // data insert html then document.documentElement will update
        const docs = await handle(data);

        if (!docs || docs.length === 0)
          this.docs_insert_list.dataset.no_more_docs = 'true';

        this.docs_insert_list.dataset.docs_loading = 'false';
      }
    });
  }
}
