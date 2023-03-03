class ParentView {
    _parentEl;
  
    render(arr, render = true, clearHTML = true) {
      clearHTML ? this._clear() : "";
      const html = this._generateMarkUpList(arr);
  
      //   return html
      if (!render) return html;
      this._parentEl.insertAdjacentHTML("afterBegin", html);
  
    }
  
  
    _generateMarkUpList(arr) {
      return arr.map((mov) => this._generateMarkUpItem(mov)).join("");
    }
  
    _generateMarkUpItem(mov) {
      return "mov";
    }
  
    _clear(parentEl) {
      if (parentEl) parentEl.innerHTML = "";
      else this._parentEl.innerHTML = "";
    }
  }
  
  export default ParentView;
  