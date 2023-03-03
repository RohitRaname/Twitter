export default class non_login_user_page_view{
    _parentel = document.querySelector('body[data-login-user="false"]')

    add_handler_page(handle){
        this._parentel.addEventListener('click',(e)=>{
            const target = e.target;

            const btn = target.closest('button')
            if(!btn) return;

            const {action} = btn.dataset;
            if(action==="login") handle('show-add-account-modal')
            if(action==="signup") handle('redirect-to-signup-page')
        })
    }
}