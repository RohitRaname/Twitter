// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Controller/utils/domHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClass = exports.setActiveElInArr = exports.replaceClass = exports.removeClass = exports.removeArrAllElClass = exports.removeAllActiveElClassInArr = exports.findEl = exports.findActiveElInArr = exports.contains = exports.closest = exports.addClassToArrAllEl = exports.addClass = void 0;

var findEl = function findEl(className) {
  return document.querySelector(".".concat(className));
};

exports.findEl = findEl;

var contains = function contains(target, className) {
  return target.classList.contains(className);
};

exports.contains = contains;

var closest = function closest(target, className) {
  return target.closest(".".concat(className));
};

exports.closest = closest;

var addClass = function addClass(target, className) {
  target.classList.add(className);
};

exports.addClass = addClass;

var removeClass = function removeClass(target, className) {
  target.classList.remove(className);
};

exports.removeClass = removeClass;

var replaceClass = function replaceClass(target, class1, class2) {
  target.classList.replace(class1, class2);
};

exports.replaceClass = replaceClass;

var removeArrAllElClass = function removeArrAllElClass(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
};

exports.removeArrAllElClass = removeArrAllElClass;

var addClassToArrAllEl = function addClassToArrAllEl(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.add(className);
  });
};

exports.addClassToArrAllEl = addClassToArrAllEl;

var toggleClass = function toggleClass(target, className) {
  target.classList.toggle(className);
};

exports.toggleClass = toggleClass;

var setActiveElInArr = function setActiveElInArr(elementArr, target, className) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
  target.classList.add(className);
};

exports.setActiveElInArr = setActiveElInArr;

var findActiveElInArr = function findActiveElInArr(arr, activeClass) {
  return arr.find(function (mov) {
    return contains(mov, activeClass);
  });
};

exports.findActiveElInArr = findActiveElInArr;

var removeAllActiveElClassInArr = function removeAllActiveElClassInArr(elementArr, activeClass) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(activeClass);
  });
};

exports.removeAllActiveElClassInArr = removeAllActiveElClassInArr;
},{}],"View/utils/domHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClass = exports.setActiveElInArr = exports.replaceClass = exports.removeClass = exports.removeArrAllElClass = exports.removeAllActiveElClassInArr = exports.findEl = exports.findActiveElInArr = exports.contains = exports.closest = exports.addClassToArrAllEl = exports.addClass = void 0;

var findEl = function findEl(className) {
  return document.querySelector(".".concat(className));
};

exports.findEl = findEl;

var contains = function contains(target, className) {
  return target.classList.contains(className);
};

exports.contains = contains;

var closest = function closest(target, className) {
  return target.closest(".".concat(className));
};

exports.closest = closest;

var addClass = function addClass(target, className) {
  target.classList.add(className);
};

exports.addClass = addClass;

var removeClass = function removeClass(target, className) {
  target.classList.remove(className);
};

exports.removeClass = removeClass;

var replaceClass = function replaceClass(target, class1, class2) {
  target.classList.replace(class1, class2);
};

exports.replaceClass = replaceClass;

var removeArrAllElClass = function removeArrAllElClass(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
};

exports.removeArrAllElClass = removeArrAllElClass;

var addClassToArrAllEl = function addClassToArrAllEl(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.add(className);
  });
};

exports.addClassToArrAllEl = addClassToArrAllEl;

var toggleClass = function toggleClass(target, className) {
  target.classList.toggle(className);
};

exports.toggleClass = toggleClass;

var setActiveElInArr = function setActiveElInArr(elementArr, target, className) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
  target.classList.add(className);
};

exports.setActiveElInArr = setActiveElInArr;

var findActiveElInArr = function findActiveElInArr(arr, activeClass) {
  return arr.find(function (mov) {
    return contains(mov, activeClass);
  });
};

exports.findActiveElInArr = findActiveElInArr;

var removeAllActiveElClassInArr = function removeAllActiveElClassInArr(elementArr, activeClass) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(activeClass);
  });
};

exports.removeAllActiveElClassInArr = removeAllActiveElClassInArr;
},{}],"View/Pages/1.twitterJoinPageView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domHelper = require("../utils/domHelper.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TwitterJoinPage = /*#__PURE__*/function () {
  function TwitterJoinPage() {
    _classCallCheck(this, TwitterJoinPage);

    _defineProperty(this, "_parentEl", (0, _domHelper.findEl)('twitter__joinPage'));

    _defineProperty(this, "_signUpForm", this._parentEl.querySelector('.form--signUp'));

    _defineProperty(this, "_loginForm", this._parentEl.querySelector('.form--login'));
  }

  _createClass(TwitterJoinPage, [{
    key: "handlePage",
    value: function handlePage() {
      var _this = this;

      this._parentEl.addEventListener('click', function (e) {
        var target = e.target;
        if ((0, _domHelper.contains)(target, 'twitter__joinPage-signUpBtn')) (0, _domHelper.removeClass)(_this._signUpForm, 'hidden');
        if ((0, _domHelper.contains)(target, 'twitter__joinPage-signInBtn')) (0, _domHelper.removeClass)(_this._loginForm, 'hidden');
      });
    }
  }]);

  return TwitterJoinPage;
}();

var _default = TwitterJoinPage;
exports.default = _default;
},{"../utils/domHelper.js":"View/utils/domHelper.js"}],"Controller/Pages/twitterJoinPage.js":[function(require,module,exports) {
"use strict";

var _domHelper = require("../utils/domHelper.js");

var _twitterJoinPageView = _interopRequireDefault(require("../../View/Pages/1.twitterJoinPageView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var twitterJoinUpPage = (0, _domHelper.findEl)('twitter__joinPage');

if (twitterJoinUpPage) {
  var View = new _twitterJoinPageView.default();
  View.handlePage();
}
},{"../utils/domHelper.js":"Controller/utils/domHelper.js","../../View/Pages/1.twitterJoinPageView.js":"View/Pages/1.twitterJoinPageView.js"}],"View/Common/FormView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domHelper = require("../utils/domHelper.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormView = /*#__PURE__*/function () {
  function FormView() {
    _classCallCheck(this, FormView);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_redirectToWhenFormClosed", '/join');
  }

  _createClass(FormView, [{
    key: "_hide",
    value: function _hide() {
      (0, _domHelper.replaceClass)(this._parentEl, 'view', 'hidden');

      this._reset();
    }
  }, {
    key: "_hideWithoutClearInputValues",
    value: function _hideWithoutClearInputValues() {
      (0, _domHelper.replaceClass)(this._parentEl, 'view', 'hidden');
    }
  }, {
    key: "show",
    value: function show() {
      (0, _domHelper.replaceClass)(this._parentEl, 'hidden', 'view');
    }
  }, {
    key: "_clearAllInputElValue",
    value: function _clearAllInputElValue() {
      var allInputEls = _toConsumableArray(this._parentEl.querySelectorAll('input'));

      allInputEls.forEach(function (mov) {
        return mov.value = '';
      });
    }
  }, {
    key: "_getGroupEls",
    value: function _getGroupEls() {
      return _toConsumableArray(this._parentEl.querySelectorAll('.form-group'));
    }
  }, {
    key: "_getInputEls",
    value: function _getInputEls() {
      return _toConsumableArray(this._parentEl.querySelectorAll('input'));
    }
  }, {
    key: "_getNonHiddenInputEls",
    value: function _getNonHiddenInputEls() {
      return _toConsumableArray(this._parentEl.querySelectorAll('input')).filter(function (el) {
        return !(0, _domHelper.contains)(el.closest('.form-group'), 'hidden');
      });
    }
  }, {
    key: "_activeGroupEl",
    value: function _activeGroupEl(formGroupEl, active) {
      var groupEls = this._getGroupEls(); // changed


      if (groupEls === []) return; //- changed

      var _iterator = _createForOfIteratorHelper(groupEls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          el.dataset.active = 'false';
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      active = active === 'false' ? 'true' : 'false';
      formGroupEl.dataset.active = active;
    }
  }, {
    key: "_unActiveAllGroupEls",
    value: function _unActiveAllGroupEls() {
      var groupEls = this._getGroupEls(this._parentEl); // changed


      if (groupEls === []) return; // -changed

      groupEls.forEach(function (el) {
        el.dataset.active = 'false';
      });
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._unActiveAllGroupEls();

      this._clearAllInputElValue();
    } // if input are filled then let the group el label move to top

  }, {
    key: "_adjustCSSWhenInputFieldFilled",
    value: function _adjustCSSWhenInputFieldFilled() {
      // Handle 1 ***************************************
      var inputEls = this._getInputEls();

      inputEls.forEach(function (inputEl) {
        if (!inputEl.closest('.form-group')) return;
        var value = inputEl.value;
        if (value.length === 0) return inputEl.closest('.form-group').dataset.inputFilled = false;
        inputEl.closest('.form-group').dataset.inputFilled = true;
      });
    } // Handle 2

  }, {
    key: "_handleSelectActiveGroupEl",
    value: function _handleSelectActiveGroupEl(target) {
      var formGroupEl = (0, _domHelper.closest)(target, 'form-group');

      if (!formGroupEl || formGroupEl.dataset.type === 'date') {
        this._unActiveAllGroupEls(this._parentEl);

        this._adjustCSSWhenInputFieldFilled();

        return;
      }

      var input = formGroupEl.querySelector('.form-input'); // let { active, type } = formGroupEl.dataset;

      if (input) input.focus();

      this._activeGroupEl(formGroupEl, 'false');
    } // Handle 3

  }, {
    key: "handleCloseForm",
    value: function handleCloseForm(target) {
      if (!(0, _domHelper.closest)(target, 'form-closeBtn')) return; // changed

      if (this._redirectToWhenFormClosed === 'current') return this._hide();
      if (this._redirectToWhenFormClosed) return location.assign(this._redirectToWhenFormClosed); // changed
      // this._reset();

      this._hide();
    } // Handle 5

  }, {
    key: "_handleSetClickDropdownValueInInput",
    value: function _handleSetClickDropdownValueInInput(target) {
      var groupEl = (0, _domHelper.closest)(target, 'form-group');
      if (!groupEl) return;
      var dropDownItem = (0, _domHelper.closest)(target, 'dropDown-item');
      if (!dropDownItem) return;
      var value = dropDownItem.textContent.trim();
      var groupInputEl = target.closest('.form-group').querySelector('.form-input');
      groupInputEl.value = value;
      groupEl.dataset.active = false; // this._adjustCSSWhenInputFieldFilled();
    } // handle 6

  }, {
    key: "_enableSubmitBtnWhenAllInputsValid",
    value: function _enableSubmitBtnWhenAllInputsValid() {
      if (this._parentEl.dataset.optional === 'true') return this._parentEl.querySelector('.form-submitBtn').disabled = false;

      var inputEls = this._getNonHiddenInputEls();

      var valid = true;
      inputEls.forEach(function (inputEl) {
        if (inputEl.value.trim().length === 0 || inputEl.closest('.form-group').dataset.error === 'true') valid = false;
      });
      console.log(valid); // console.log(valid);

      this._parentEl.dataset.allInputFieldsValid = valid;

      var submitBtn = this._parentEl.querySelector('.form-submitBtn'); // valid ? submitBtn.removeAtrribute('disabled') : (submitBtn.disabled = true);


      submitBtn.disabled = valid ? false : true;
    } // handle 7

  }, {
    key: "_closeFormWhenOverlayClicked",
    value: function _closeFormWhenOverlayClicked(target) {
      var overlay = target.closest('.overlay');
      if (!overlay) return;

      this._hide();
    } // Main function

  }, {
    key: "_basicFormClickAndInputEvent",
    value: function _basicFormClickAndInputEvent(e) {
      var target = e.target; // if all inputs are valid then set allInputFieldsValid attribute in form El
      // handle active input and label(blue color) when clicked

      this._handleSelectActiveGroupEl(target); // handle close form when close btn clicked


      this.handleCloseForm(target); // handle option selected in group El dropdown

      this._handleSetClickDropdownValueInInput(target); // make group look as they have been filled by using css


      this._adjustCSSWhenInputFieldFilled();

      this._enableSubmitBtnWhenAllInputsValid(); //  CSS


      this._closeFormWhenOverlayClicked(target);
    } // PUBLIC FUNCTION *********************************

  }, {
    key: "handleFormBasicFunctionality",
    value: function handleFormBasicFunctionality() {
      this._parentEl.addEventListener('click', this._basicFormClickAndInputEvent.bind(this));

      this._parentEl.addEventListener('input', this._enableSubmitBtnWhenAllInputsValid.bind(this));
    } // get All Input Value as formData

  }, {
    key: "getAllNonHiddenInputValueAsFormData",
    value: function getAllNonHiddenInputValueAsFormData() {
      var unHiddenInputs = this._getNonHiddenInputEls();

      var formData = new FormData();
      unHiddenInputs.forEach(function (inputEl) {
        return formData.append(inputEl.name, inputEl.value.trim());
      });
      console.log(Object.fromEntries(formData));
      return formData;
    }
  }, {
    key: "getAllNonHiddenInputValueAsObj",
    value: function getAllNonHiddenInputValueAsObj() {
      var unHiddenInputs = this._getNonHiddenInputEls();

      var formData = {};
      unHiddenInputs.forEach(function (inputEl) {
        return formData[inputEl.name] = inputEl.value.trim();
      });
      return formData;
    }
  }, {
    key: "getAllInputValueAsFormData",
    value: function getAllInputValueAsFormData() {
      var unHiddenInputs = this._getInputEls();

      var formData = new FormData();
      unHiddenInputs.forEach(function (inputEl) {
        return formData.append(inputEl.name, inputEl.value.trim());
      });
      console.log(Object.fromEntries(formData));
    }
  }, {
    key: "autoIncreaseTextareaHeight",
    value: function autoIncreaseTextareaHeight(textAreaEl) {
      textAreaEl.addEventListener('scroll', function () {
        this.style.height = this.clientHeight + this.scrollTop + 'px';
      });
    }
  }, {
    key: "_updateInputWordCount",
    value: function _updateInputWordCount(inputEl, countEl) {
      inputEl.addEventListener('input', function (e) {
        var count = e.target.value.trim().length;
        countEl.textContent = count;
      });
    }
  }, {
    key: "enableUserToSeePasswordTyped",
    value: function enableUserToSeePasswordTyped(seePasswordBtn, passwordInput) {
      seePasswordBtn.addEventListener('click', function () {
        var active = seePasswordBtn.dataset.active;
        active = active === 'false' ? true : false;
        seePasswordBtn.dataset.active = active;
        active === true ? passwordInput.setAttribute('type', 'text') : passwordInput.setAttribute('type', 'password');
      });
    }
  }, {
    key: "handleCheckBox",
    value: function handleCheckBox(checkBoxBtn, submitBtn) {
      var _this = this;

      checkBoxBtn.addEventListener('click', function () {
        var checked = checkBoxBtn.dataset.checked;
        checked = checked === 'true' ? false : true;
        console.log(submitBtn);
        checkBoxBtn.dataset.checked = checked;
        !checked === true ? submitBtn.removeAttribute('disabled') : submitBtn.removeAttribute('disabled', true);
        _this._parentEl.dataset.allInputFieldsValid = checked;
      });
    }
  }, {
    key: "checkIfNewPasswordMeetMinRequirements",
    value: function checkIfNewPasswordMeetMinRequirements(passwordInput, passwordGroupEl) {
      passwordInput.addEventListener('input', function () {
        var length = passwordInput.value.trim().length;
        passwordGroupEl.dataset.error = length < 8 ? true : false;
      });
    }
  }]);

  return FormView;
}();

var _default = FormView;
exports.default = _default;
},{"../utils/domHelper.js":"View/utils/domHelper.js"}],"View/Form/SignUp/0.CreateAccountView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

var _domHelper = require("../../utils/domHelper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreateAccountView = /*#__PURE__*/function (_FormView) {
  _inherits(CreateAccountView, _FormView);

  var _super = _createSuper(CreateAccountView);

  // _phoneGroupEl = this._parentEl.querySelector(
  //   '.form-group[data-field="phone"]'
  // );
  // _inputPhoneEl = this._phoneGroupEl.querySelector('#phone');
  // _inputPhoneErrorEl = this._phoneGroupEl.querySelector('.form-error');
  function CreateAccountView() {
    var _this;

    _classCallCheck(this, CreateAccountView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--signUp[data-action="create-account"]'));

    _defineProperty(_assertThisInitialized(_this), "_emailGroupEl", _this._parentEl.querySelector('.form-group[data-field="email"]'));

    _defineProperty(_assertThisInitialized(_this), "_inputEmailEl", _this._emailGroupEl.querySelector('#email'));

    _defineProperty(_assertThisInitialized(_this), "_inputEmailErrorEl", _this._emailGroupEl.querySelector('.form-error'));

    _defineProperty(_assertThisInitialized(_this), "_nameGroupEl", _this._parentEl.querySelector('.form-group[data-field="name"]'));

    _defineProperty(_assertThisInitialized(_this), "_inputNameEl", _this._nameGroupEl.querySelector('#name'));

    _defineProperty(_assertThisInitialized(_this), "_inputNameCountEl", _this._parentEl.querySelector('.form-hint span'));

    _defineProperty(_assertThisInitialized(_this), "_inputNameErrorEl", _this._nameGroupEl.querySelector('.form-error'));

    _defineProperty(_assertThisInitialized(_this), "_switchBetweenPhoneAndEmailBtn", _this._parentEl.querySelector('button[data-switch-between="true"]'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _this.handleFormBasicFunctionality();

    _this._updateNameInputWordCount(); // this._checkPhoneNumber();


    _this._checkName();

    _this._checkEmail(); // this._switchBetweenPhoneAndEmail();
    // this._clearAllInputElValue();
    // this._addHandlerSubmitForm();


    return _this;
  } // in right side corner of input there is a indicator => 0/50 we need to update this


  _createClass(CreateAccountView, [{
    key: "_updateNameInputWordCount",
    value: function _updateNameInputWordCount() {
      this._updateInputWordCount(this._inputNameEl, this._inputNameCountEl);
    } // _checkPhoneNumber() {
    //   this._inputPhoneEl.addEventListener('input', (e) => {
    //     const checker =
    //       /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    //     const value = e.target.value.trim();
    //     if (value.length === 0) return (this._phoneGroupEl.dataset.error = false);
    //     const isValid = checker.test(value);
    //     if (isValid) return (this._phoneGroupEl.dataset.error = false);
    //     this._phoneGroupEl.dataset.error = true;
    //   });
    // }

  }, {
    key: "_checkName",
    value: function _checkName() {
      var _this2 = this;

      this._inputNameEl.addEventListener('input', function (e) {
        var value = e.target.value.trim();
        if (value.length === 0) return _this2._nameGroupEl.dataset.error = true;
        if (value.length > 0) return _this2._nameGroupEl.dataset.error = false;
      });
    }
  }, {
    key: "_checkEmail",
    value: function _checkEmail() {
      var _this3 = this;

      this._inputEmailEl.addEventListener('input', function (e) {
        var value = e.target.value.trim();
        if (value.length === 0) return _this3._emailGroupEl.dataset.error = false;
        if (!value.includes('@gmail.com' || '.io' || '.com')) return _this3._emailGroupEl.dataset.error = true;
        _this3._emailGroupEl.dataset.error = false;
      });
    } // _switchBetweenPhoneAndEmail() {
    //   this._switchBetweenPhoneAndEmailBtn.addEventListener('click', (e) => {
    //     const { switchTo } = e.target.dataset;
    //     if (switchTo === 'email') {
    //       removeClass(this._emailGroupEl, 'hidden');
    //       addClass(this._phoneGroupEl, 'hidden');
    //       this._switchBetweenPhoneAndEmailBtn.dataset.switchTo = 'phone';
    //       this._switchBetweenPhoneAndEmailBtn.textContent = 'Use Phone instead';
    //       return;
    //     }
    //     addClass(this._emailGroupEl, 'hidden');
    //     removeClass(this._phoneGroupEl, 'hidden');
    //     this._switchBetweenPhoneAndEmailBtn.dataset.switchTo = 'email';
    //     this._switchBetweenPhoneAndEmailBtn.textContent = 'Use Email instead';
    //   });
    // }
    // API ***********************************************

  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this4 = this;

      this._formSubmitBtn.addEventListener('click', function () {
        var inputObj = _this4.getAllNonHiddenInputValueAsObj();

        var year = inputObj.year,
            month = inputObj.month,
            day = inputObj.day;
        var birth_date = "".concat(day, "/").concat(month, "/").concat(year);
        delete inputObj.year;
        delete inputObj.month;
        delete inputObj.day;
        inputObj.birthDate = birth_date;
        handle(inputObj);
      });
    }
  }]);

  return CreateAccountView;
}(_FormView2.default);

var _default = CreateAccountView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js","../../utils/domHelper.js":"View/utils/domHelper.js"}],"View/Common/AlertView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domHelper = require("../utils/domHelper.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageView = /*#__PURE__*/function () {
  function MessageView() {
    _classCallCheck(this, MessageView);

    _defineProperty(this, "_parentEl", void 0);
  }

  _createClass(MessageView, [{
    key: "render",
    value: function render(message) {
      this._clear();

      var html = this._generateMarkUp(message);

      this._parentEl.insertAdjacentHTML('afterbegin', html);

      (0, _domHelper.removeClass)(this._parentEl, 'hidden');

      this._removeMessageFromDOM();
    }
  }, {
    key: "_clear",
    value: function _clear() {
      this._parentEl.innerHTML = '';
    }
  }, {
    key: "_removeMessageFromDOM",
    value: function _removeMessageFromDOM() {
      var _this = this;

      setTimeout(function () {
        _this._clear();

        (0, _domHelper.addClass)(_this._parentEl, 'hidden');
      }, 5000);
    }
  }]);

  return MessageView;
}();

var _default = MessageView;
exports.default = _default;
},{"../utils/domHelper.js":"View/utils/domHelper.js"}],"View/Components/Alert/AlertView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AlertView = _interopRequireDefault(require("../../Common/AlertView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlertView = /*#__PURE__*/function (_MessageView) {
  _inherits(AlertView, _MessageView);

  var _super = _createSuper(AlertView);

  function AlertView() {
    var _this;

    _classCallCheck(this, AlertView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.alert-content'));

    return _this;
  }

  _createClass(AlertView, [{
    key: "_generateMarkUp",
    value: function _generateMarkUp(message) {
      return " \n            <p class=\"text error-message\">\n            ".concat(message, "\n            </p>\n              ");
    }
  }]);

  return AlertView;
}(_AlertView.default);

var _default = AlertView;
exports.default = _default;
},{"../../Common/AlertView.js":"View/Common/AlertView.js"}],"Controller/Components/Alert/alertController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successAlert = exports.alertError = void 0;

var _AlertView = _interopRequireDefault(require("../../../View/Components/Alert/AlertView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alertError = function alertError(res) {
  var errorMessage = res.response.data.err.message;
  var View = new _AlertView.default();
  View.render(errorMessage, 'alert');
};

exports.alertError = alertError;

var successAlert = function successAlert(res) {
  var errorMessage = res.response.data.err.message;
  var View = new _AlertView.default();
  View.render(errorMessage, 'alert');
};

exports.successAlert = successAlert;
},{"../../../View/Components/Alert/AlertView.js":"View/Components/Alert/AlertView.js"}],"Controller/api/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.patch = exports.get_view_req = exports.get = exports.del = void 0;

var _alertController = require("../Components/Alert/alertController.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var api = 'http://localhost:3000/api/v1/';
var api_view = 'http://localhost:3000/';

var makeReq = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(method, route) {
    var body,
        redirectTo,
        view,
        req,
        _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = _args.length > 2 && _args[2] !== undefined ? _args[2] : undefined;
            redirectTo = _args.length > 3 ? _args[3] : undefined;
            view = _args.length > 4 && _args[4] !== undefined ? _args[4] : false;
            _context.prev = 3;
            _context.next = 6;
            return axios({
              method: method,
              url: view ? "".concat(api_view).concat(route) : "".concat(api).concat(route),
              data: body
            });

          case 6:
            req = _context.sent;

            if (!redirectTo) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", setTimeout(function () {
              return location.assign(redirectTo);
            }, 1000));

          case 9:
            return _context.abrupt("return", req);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0);
            (0, _alertController.alertError)(_context.t0);
            return _context.abrupt("return", false);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));

  return function makeReq(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var get = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(route, redirectTo) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return makeReq('GET', route, null, redirectTo);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function get(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.get = get;

var post = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(route, body, redirectTo) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return makeReq('POST', route, body, redirectTo);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function post(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.post = post;

var patch = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(route, body, redirectTo) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return makeReq('PATCH', route, body, redirectTo);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function patch(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.patch = patch;

var del = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(route, body, redirectTo) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return makeReq('DELETE', route, body, redirectTo);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function del(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.del = del;

var get_view_req = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(route, data, redirectTo) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return makeReq('GET', route, data, redirectTo, true);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function get_view_req(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}(); // export const delete = async (route) => await makeReq("DELETE",route);


exports.get_view_req = get_view_req;
},{"../Components/Alert/alertController.js":"Controller/Components/Alert/alertController.js"}],"Controller/Components/Form/SignUp/0.CreateAccountController.js":[function(require,module,exports) {
"use strict";

var _CreateAccountView = _interopRequireDefault(require("../../../../View/Form/SignUp/0.CreateAccountView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createAccountForm = document.querySelector('.form--signUp[data-action="create-account"]');

var controlCreateAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data);
            _context.next = 3;
            return (0, _api.post)('auth/signUpCreateAccount', data, "/signUp/1?email=".concat(data.email));

          case 3:
            res = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlCreateAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (createAccountForm) {
  var View = new _CreateAccountView.default();
  View.addHandlerSubmitForm(controlCreateAccount);
}
},{"../../../../View/Form/SignUp/0.CreateAccountView.js":"View/Form/SignUp/0.CreateAccountView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/SignUp/1.CustomiseExperienceView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomiseUserExperienceView = /*#__PURE__*/function (_FormView) {
  _inherits(CustomiseUserExperienceView, _FormView);

  var _super = _createSuper(CustomiseUserExperienceView);

  function CustomiseUserExperienceView() {
    var _this;

    _classCallCheck(this, CustomiseUserExperienceView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--signUp[data-action="customise-experience"]'));

    _defineProperty(_assertThisInitialized(_this), "_checkBoxBtn", _this._parentEl.querySelector('.btn--checkbox'));

    _defineProperty(_assertThisInitialized(_this), "_checkBoxInput", _this._parentEl.querySelector('.checkbox-value'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _this.handleCheckBox(_this._checkBoxBtn, _this._formSubmitBtn);

    return _this;
  }

  _createClass(CustomiseUserExperienceView, [{
    key: "_getCheckBoxValue",
    value: function _getCheckBoxValue() {
      return this._checkBoxInput.name;
    } // API ***********************************************

  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._formSubmitBtn.addEventListener('click', function () {
        // const formData = this.getAllNonHiddenInputValueAsObj();
        console.log(_this2._parentEl.dataset.email);
        var formData = {};

        var userGivePermission = _this2._getCheckBoxValue();

        formData[userGivePermission] = true;
        handle(formData);
      });
    }
  }]);

  return CustomiseUserExperienceView;
}(_FormView2.default);

var _default = CustomiseUserExperienceView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/SignUp/1.CustomiseExperienceViewController.js":[function(require,module,exports) {
"use strict";

var _CustomiseExperienceView = _interopRequireDefault(require("../../../../View/Form/SignUp/1.CustomiseExperienceView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CustomerExperienceForm = document.querySelector('.form--signUp[data-action="customise-experience"]');

var controlCustomiseExperience = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var email, res, _res$data, name, birthDate;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data);
            email = location.search.split('?')[1].split('=')[1];
            _context.next = 4;
            return (0, _api.post)("auth/signUpCustomiseUserExperience?email=".concat(email), data);

          case 4:
            res = _context.sent;

            if (res) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            _res$data = res.data, name = _res$data.name, birthDate = _res$data.birthDate;
            location.assign("/signUp/2?email=".concat(email, "&name=").concat(name, "&birthDate=").concat(birthDate)); // `/join/signUp/2?email=${email}`

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlCustomiseExperience(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (CustomerExperienceForm) {
  var View = new _CustomiseExperienceView.default();
  View.addHandlerSubmitForm(controlCustomiseExperience);
}
},{"../../../../View/Form/SignUp/1.CustomiseExperienceView.js":"View/Form/SignUp/1.CustomiseExperienceView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/SignUp/2.ConfirmAccountCredentialsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfirmAccountCredentialsView = /*#__PURE__*/function (_FormView) {
  _inherits(ConfirmAccountCredentialsView, _FormView);

  var _super = _createSuper(ConfirmAccountCredentialsView);

  function ConfirmAccountCredentialsView() {
    var _this;

    _classCallCheck(this, ConfirmAccountCredentialsView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--signUp[data-action="confirm-account-credentials"]'));

    _defineProperty(_assertThisInitialized(_this), "_formGroupParentEl", _this._parentEl.querySelector('.form-groups'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _this.handleFormBasicFunctionality();

    return _this;
  } // Go back to the first page Create you account then start from the first


  _createClass(ConfirmAccountCredentialsView, [{
    key: "addHanlderResetSignUp",
    value: function addHanlderResetSignUp(handle) {
      this._formGroupParentEl.addEventListener('click', function (e) {
        if (e.target.closest('input')) handle();
      });
    } // API ***********************************************

  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._formSubmitBtn.addEventListener('click', function () {
        var formData = _this2.getAllNonHiddenInputValueAsObj();

        console.log(formData);
        handle(formData);
      });
    }
  }]);

  return ConfirmAccountCredentialsView;
}(_FormView2.default);

var _default = ConfirmAccountCredentialsView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/SignUp/2.ConfirmAccountCredentialsController.js":[function(require,module,exports) {
"use strict";

var _ConfirmAccountCredentialsView = _interopRequireDefault(require("../../../../View/Form/SignUp/2.ConfirmAccountCredentialsView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var confirmAccountCredentialsForm = document.querySelector('.form--signUp[data-action="confirm-account-credentials"]');

var controlSendAccountVerificationToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data);
            _context.next = 3;
            return (0, _api.get)("auth/signUpSendVerificationCode?email=".concat(data.email), "/signUp/3?email=".concat(data.email));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlSendAccountVerificationToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlResetSignUp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _api.get)("auth/signUpResetUserCredentials?email=".concat(location.search.split('&')[0].split('email=')[1]));

          case 2:
            location.assign('/join');

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function controlResetSignUp() {
    return _ref2.apply(this, arguments);
  };
}();

if (confirmAccountCredentialsForm) {
  var View = new _ConfirmAccountCredentialsView.default(); // handler

  View.addHandlerSubmitForm(controlSendAccountVerificationToken);
  View.addHanlderResetSignUp(controlResetSignUp);
}
},{"../../../../View/Form/SignUp/2.ConfirmAccountCredentialsView.js":"View/Form/SignUp/2.ConfirmAccountCredentialsView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/SignUp/3.SignUpVerificationView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SignUpVerificationView = /*#__PURE__*/function (_FormView) {
  _inherits(SignUpVerificationView, _FormView);

  var _super = _createSuper(SignUpVerificationView);

  function SignUpVerificationView() {
    var _this;

    _classCallCheck(this, SignUpVerificationView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--signUp[data-action="signUp-verification"]'));

    _defineProperty(_assertThisInitialized(_this), "_reRequestTokenBtn", _this._parentEl.querySelector('.form-reRequestToken'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _this.handleFormBasicFunctionality();

    return _this;
  } // API ***********************************************


  _createClass(SignUpVerificationView, [{
    key: "addHandlerRequestNewVerificationToken",
    value: function addHandlerRequestNewVerificationToken(handle) {
      this._reRequestTokenBtn.addEventListener('click', function () {
        // api call
        handle();
      });
    }
  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._formSubmitBtn.addEventListener('click', function () {
        var formData = _this2.getAllNonHiddenInputValueAsObj();

        handle(formData);
      });
    }
  }]);

  return SignUpVerificationView;
}(_FormView2.default);

var _default = SignUpVerificationView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/SignUp/3.SignUpVerificationController.js":[function(require,module,exports) {
"use strict";

var _SignUpVerificationView = _interopRequireDefault(require("../../../../View/Form/SignUp/3.SignUpVerificationView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUpVerificationForm = document.querySelector('.form--signUp[data-action="signUp-verification"]');

var controlVerifyAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(token);
            _context.next = 3;
            return (0, _api.post)("auth/signUpVerifyUser", token, "/signUp/4?email=".concat(location.search.split('&')[0].split('email=')[1]));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlVerifyAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlResendVerificationToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _api.get)("auth/signUpSendVerificationCode?email=".concat(location.search.split('&')[0].split('email=')[1]));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function controlResendVerificationToken() {
    return _ref2.apply(this, arguments);
  };
}();

if (signUpVerificationForm) {
  var View = new _SignUpVerificationView.default(); // handler

  View.addHandlerSubmitForm(controlVerifyAccount);
  View.addHandlerRequestNewVerificationToken(controlResendVerificationToken);
}
},{"../../../../View/Form/SignUp/3.SignUpVerificationView.js":"View/Form/SignUp/3.SignUpVerificationView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/SignUp/4.SetPasswordView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SetPasswordView = /*#__PURE__*/function (_FormView) {
  _inherits(SetPasswordView, _FormView);

  var _super = _createSuper(SetPasswordView);

  function SetPasswordView() {
    var _this;

    _classCallCheck(this, SetPasswordView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--signUp[data-action="set-password"]'));

    _defineProperty(_assertThisInitialized(_this), "_reRequestTokenBtn", _this._parentEl.querySelector('.form-reRequestToken'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _defineProperty(_assertThisInitialized(_this), "_passwordGroupEl", _this._parentEl.querySelector('.form-group[data-field="password"]'));

    _defineProperty(_assertThisInitialized(_this), "_passwordInput", _this._passwordGroupEl.querySelector('#password'));

    _defineProperty(_assertThisInitialized(_this), "_seePasswordBtn", _this._passwordGroupEl.querySelector('.form-hint--seePassword'));

    _this.handleFormBasicFunctionality();

    _this._checkPasswordMeetRequirements(); // this._enableUserToSeePassword();


    _this.enableUserToSeePasswordTyped(_this._seePasswordBtn, _this._passwordInput);

    return _this;
  }

  _createClass(SetPasswordView, [{
    key: "_checkPasswordMeetRequirements",
    value: function _checkPasswordMeetRequirements() {
      var _this2 = this;

      this._passwordInput.addEventListener('input', function () {
        var length = _this2._passwordInput.value.trim().length;

        _this2._passwordGroupEl.dataset.error = length < 8 ? true : false;
      });
    } // _enableUserToSeePassword() {
    //   this._seePasswordBtn.addEventListener('click', () => {
    //     let { active } = this._seePasswordBtn.dataset;
    //     active = active === 'false' ? true : false;
    //     this._seePasswordBtn.dataset.active = active;
    //     active === true
    //       ? this._passwordInput.setAttribute('type', 'text')
    //       : this._passwordInput.setAttribute('type', 'password');
    //   });
    // }
    // API ***********************************************

  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this3 = this;

      this._formSubmitBtn.addEventListener('click', function () {
        var formData = {};
        formData[_this3._passwordInput.name] = _this3._passwordInput.value;
        handle(formData);
      });
    }
  }]);

  return SetPasswordView;
}(_FormView2.default);

var _default = SetPasswordView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/SignUp/4.SetPasswordController.js":[function(require,module,exports) {
"use strict";

var _SetPasswordView = _interopRequireDefault(require("../../../../View/Form/SignUp/4.SetPasswordView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUpSetPassword = document.querySelector('.form--signUp[data-action="set-password"]');

var controlSetPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var email;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = location.search.split('&')[0].split('email=')[1];
            _context.next = 3;
            return (0, _api.post)("auth/signUpSetPassword?email=".concat(email), data, "/signUp/5?email=".concat(email));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlSetPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (signUpSetPassword) {
  var View = new _SetPasswordView.default(); // handler

  View.addHandlerSubmitForm(controlSetPassword);
}
},{"../../../../View/Form/SignUp/4.SetPasswordView.js":"View/Form/SignUp/4.SetPasswordView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/SignUp/5.SetProfileView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SetProfileView = /*#__PURE__*/function (_FormView) {
  _inherits(SetProfileView, _FormView);

  var _super = _createSuper(SetProfileView);

  function SetProfileView() {
    var _this;

    _classCallCheck(this, SetProfileView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--signUp[data-action="set-profile"]'));

    _defineProperty(_assertThisInitialized(_this), "_imgInputEl", _this._parentEl.querySelector('#profilePic'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _this.handleFormBasicFunctionality();

    return _this;
  }

  _createClass(SetProfileView, [{
    key: "addHandlerUploadProfile",
    value: function addHandlerUploadProfile(handle) {
      var _this2 = this;

      this._imgInputEl.addEventListener('change', function () {
        console.log(_this2._imgInputEl.files);
        var formData = new FormData();
        formData.append('profilePic', _this2._imgInputEl.files[0]);
        console.log(Object.fromEntries(formData));
        handle(formData);
      });
    } // API ***********************************************

  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      this._formSubmitBtn.addEventListener('click', function () {
        handle();
      });
    }
  }]);

  return SetProfileView;
}(_FormView2.default);

var _default = SetProfileView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/SignUp/5.SetProfileController.js":[function(require,module,exports) {
"use strict";

var _SetProfileView = _interopRequireDefault(require("../../../../View/Form/SignUp/5.SetProfileView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var setProfileForm = document.querySelector('.form--signUp[data-action="set-profile"]');

var controlSetProfile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var email;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data);
            email = location.search.split('&')[0].split('email=')[1];
            _context.next = 4;
            return (0, _api.patch)("users/me?email=".concat(email), data, "/signUp/6?email=".concat(email));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlSetProfile(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlSkipToNextPage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var email;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = location.search.split('&')[0].split('email=')[1];
            location.assign("/signUp/6?email=".concat(email));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function controlSkipToNextPage() {
    return _ref2.apply(this, arguments);
  };
}();

if (setProfileForm) {
  var View = new _SetProfileView.default(); // handler

  View.addHandlerUploadProfile(controlSetProfile);
  View.addHandlerSubmitForm(controlSkipToNextPage);
}
},{"../../../../View/Form/SignUp/5.SetProfileView.js":"View/Form/SignUp/5.SetProfileView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/SignUp/6.SetBioView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SetBioView = /*#__PURE__*/function (_FormView) {
  _inherits(SetBioView, _FormView);

  var _super = _createSuper(SetBioView);

  function SetBioView() {
    var _this;

    _classCallCheck(this, SetBioView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--signUp[data-action="set-bio"]'));

    _defineProperty(_assertThisInitialized(_this), "_textAreaEl", _this._parentEl.querySelector('#bio'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _defineProperty(_assertThisInitialized(_this), "_textAreaCountEl", _this._parentEl.querySelector('.form-count span'));

    _this.handleFormBasicFunctionality();

    _this.autoIncreaseTextareaHeight(_this._textAreaEl);

    _this._updateBioTextareaCount();

    return _this;
  }

  _createClass(SetBioView, [{
    key: "_updateBioTextareaCount",
    value: function _updateBioTextareaCount() {
      this._updateInputWordCount(this._textAreaEl, this._textAreaCountEl);
    } // API ***********************************************

  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._formSubmitBtn.addEventListener('click', function () {
        var bioValue = _this2._textAreaEl.value;
        if (!bioValue || bioValue.length === 0) return handle('skip');
        bioValue = bioValue.trim();
        handle({
          bio: bioValue
        }); // update user bio
        // then go to next page
      });
    }
  }]);

  return SetBioView;
}(_FormView2.default);

var _default = SetBioView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/SignUp/6.SetBioController.js":[function(require,module,exports) {
"use strict";

var _SetBioView = _interopRequireDefault(require("../../../../View/Form/SignUp/6.SetBioView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var setProfileForm = document.querySelector('.form--signUp[data-action="set-bio"]');

var controlSetBio = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var email;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data);

            if (!(data === 'skip')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", location.assign('/'));

          case 3:
            email = location.search.split('&')[0].split('email=')[1];
            _context.next = 6;
            return (0, _api.patch)("users/me?email=".concat(email), data, '/');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlSetBio(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (setProfileForm) {
  var View = new _SetBioView.default(); // handler

  View.addHandlerSubmitForm(controlSetBio);
}
},{"../../../../View/Form/SignUp/6.SetBioView.js":"View/Form/SignUp/6.SetBioView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/Login/0.IdentifyUserView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IdentifyUser = /*#__PURE__*/function (_FormView) {
  _inherits(IdentifyUser, _FormView);

  var _super = _createSuper(IdentifyUser);

  function IdentifyUser() {
    var _this;

    _classCallCheck(this, IdentifyUser);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--login[data-action="login-with-email-or-name"]'));

    _defineProperty(_assertThisInitialized(_this), "_nextBtn", _this._parentEl.querySelector('button[data-action="next"]'));

    _defineProperty(_assertThisInitialized(_this), "_forgotPasswordBtn", _this._parentEl.querySelector('button[data-action="forgot-password"]'));

    _this.handleFormBasicFunctionality();

    return _this;
  } // API ***********************************************
  // send email or name for further login


  _createClass(IdentifyUser, [{
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._nextBtn.addEventListener('click', function () {
        var formdata = _this2.getAllNonHiddenInputValueAsObj();

        handle(formdata);
      });
    }
  }, {
    key: "addHandlerForgotPasswordBtn",
    value: function addHandlerForgotPasswordBtn(handle) {
      this._forgotPasswordBtn.addEventListener('click', function () {
        handle();
      });
    }
  }]);

  return IdentifyUser;
}(_FormView2.default);

var _default = IdentifyUser;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/login/0.identifyUserController.js":[function(require,module,exports) {
"use strict";

var _IdentifyUserView = _interopRequireDefault(require("../../../../View/Form/Login/0.IdentifyUserView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var IdentifyUserForm = document.querySelector('.form--login[data-action="login-with-email-or-name"]');

var controlIdentifyUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data); //   const email = location.search.split('&')[0].split('email=')[1];

            _context.next = 3;
            return (0, _api.post)("auth/loginIdentifyUser", data);

          case 3:
            res = _context.sent;
            console.log(data, res.data);
            location.assign("/login/confirmUser?q=".concat(res.data.doc.nameOrEmail));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlIdentifyUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlForgotPassword = function controlForgotPassword() {
  location.assign('/forgotPassword/0');
};

if (IdentifyUserForm) {
  var View = new _IdentifyUserView.default(); // handler

  View.addHandlerSubmitForm(controlIdentifyUser);
  View.addHandlerForgotPasswordBtn(controlForgotPassword);
}
},{"../../../../View/Form/Login/0.IdentifyUserView.js":"View/Form/Login/0.IdentifyUserView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/Login/1.ConfirmUserView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfirmLoginView = /*#__PURE__*/function (_FormView) {
  _inherits(ConfirmLoginView, _FormView);

  var _super = _createSuper(ConfirmLoginView);

  function ConfirmLoginView() {
    var _this;

    _classCallCheck(this, ConfirmLoginView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--login[data-action="enter-password"]'));

    _defineProperty(_assertThisInitialized(_this), "_loginBtn", _this._parentEl.querySelector('button[data-action="login"]'));

    _defineProperty(_assertThisInitialized(_this), "_forgotPasswordBtn", _this._parentEl.querySelector('button[data-action="forgot-password"]'));

    _defineProperty(_assertThisInitialized(_this), "_passwordGroupEl", _this._parentEl.querySelector('.form-group[data-field="password"]'));

    _defineProperty(_assertThisInitialized(_this), "_passwordInput", _this._passwordGroupEl.querySelector('#password'));

    _defineProperty(_assertThisInitialized(_this), "_seePasswordBtn", _this._passwordGroupEl.querySelector('[data-action="see-password"]'));

    _this.handleFormBasicFunctionality();

    _this.enableUserToSeePasswordTyped(_this._seePasswordBtn, _this._passwordInput);

    return _this;
  } // API ***********************************************
  // send email or name for further login


  _createClass(ConfirmLoginView, [{
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._loginBtn.addEventListener('click', function () {
        var formdata = _this2.getAllNonHiddenInputValueAsObj(); // then to next page


        handle(formdata);
      });
    }
  }, {
    key: "addHandlerForgotPasswordBtn",
    value: function addHandlerForgotPasswordBtn() {
      this._forgotPasswordBtn.addEventListener('click', function (handle) {
        // reassign to forgot Password
        // then to next pagehandle
        handle();
      });
    }
  }]);

  return ConfirmLoginView;
}(_FormView2.default);

var _default = ConfirmLoginView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/login/1.confirmUserController.js":[function(require,module,exports) {
"use strict";

var _ConfirmUserView = _interopRequireDefault(require("../../../../View/Form/Login/1.ConfirmUserView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var confirmLoginUserForm = document.querySelector('.form--login[data-action="enter-password"]');

var controlLoginUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data); //   const email = location.search.split('&')[0].split('email=')[1];

            _context.next = 3;
            return (0, _api.post)("auth/loginConfirm", data, '/');

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlLoginUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlForgotPassword = function controlForgotPassword() {
  location.assign('/forgotPassword/0');
};

if (confirmLoginUserForm) {
  var View = new _ConfirmUserView.default(); // handler

  View.addHandlerSubmitForm(controlLoginUser);
  View.addHandlerForgotPasswordBtn(controlForgotPassword);
}
},{"../../../../View/Form/Login/1.ConfirmUserView.js":"View/Form/Login/1.ConfirmUserView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/ForgotPassword/0.FindAccountViewByNameOrEmail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FindTwitterAccount = /*#__PURE__*/function (_FormView) {
  _inherits(FindTwitterAccount, _FormView);

  var _super = _createSuper(FindTwitterAccount);

  function FindTwitterAccount() {
    var _this;

    _classCallCheck(this, FindTwitterAccount);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form[data-action="find-account-by-name-or-email"]'));

    _defineProperty(_assertThisInitialized(_this), "_searchBtn", _this._parentEl.querySelector('button[data-action="search"]'));

    _this.handleFormBasicFunctionality();

    return _this;
  } // API ***********************************************
  // send email or name for further login


  _createClass(FindTwitterAccount, [{
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._searchBtn.addEventListener('click', function () {
        var formData = _this2.getAllNonHiddenInputValueAsObj();

        handle(formData);
      });
    }
  }]);

  return FindTwitterAccount;
}(_FormView2.default);

var _default = FindTwitterAccount;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/forgotPassword/0.findUserByNameOrEmailController.js":[function(require,module,exports) {
"use strict";

var _FindAccountViewByNameOrEmail = _interopRequireDefault(require("../../../../View/Form/ForgotPassword/0.FindAccountViewByNameOrEmail.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var findUserForm = document.querySelector('.form--forgotPassword[data-action="find-account-by-name-or-email"]');

var controlFindUserAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data);
            _context.next = 3;
            return (0, _api.post)("auth/forgotPasswordCheckUserExist", data);

          case 3:
            res = _context.sent;
            console.log(res);

            if (!(res.data.userSubmittedEmail === true)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", location.assign("/forgotPassword/1?email=".concat(res.data.q)));

          case 7:
            location.assign("/forgotPassword/00?name=".concat(data.nameOrEmail));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlFindUserAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (findUserForm) {
  var View = new _FindAccountViewByNameOrEmail.default(); // handler

  View.addHandlerSubmitForm(controlFindUserAccount);
}
},{"../../../../View/Form/ForgotPassword/0.FindAccountViewByNameOrEmail.js":"View/Form/ForgotPassword/0.FindAccountViewByNameOrEmail.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/ForgotPassword/0.FindAccountByEmail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FindTwitterAccountByEmail = /*#__PURE__*/function (_FormView) {
  _inherits(FindTwitterAccountByEmail, _FormView);

  var _super = _createSuper(FindTwitterAccountByEmail);

  function FindTwitterAccountByEmail() {
    var _this;

    _classCallCheck(this, FindTwitterAccountByEmail);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form[data-action="find-account-by-email"]'));

    _defineProperty(_assertThisInitialized(_this), "_searchBtn", _this._parentEl.querySelector('button[data-action="search"]'));

    _this.handleFormBasicFunctionality();

    return _this;
  } // API ***********************************************
  // send email or name for further login


  _createClass(FindTwitterAccountByEmail, [{
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._searchBtn.addEventListener('click', function () {
        var formData = _this2.getAllNonHiddenInputValueAsObj();

        handle(formData);
      });
    }
  }]);

  return FindTwitterAccountByEmail;
}(_FormView2.default);

var _default = FindTwitterAccountByEmail;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/forgotPassword/0.findUserByEmailController.js":[function(require,module,exports) {
"use strict";

var _FindAccountByEmail = _interopRequireDefault(require("../../../../View/Form/ForgotPassword/0.FindAccountByEmail.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var findUserForm = document.querySelector('.form--forgotPassword[data-action="find-account-by-email"]');

var controlFindUserAccountByEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var name;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data);
            name = location.search.split('&')[0].split('name=')[1];
            _context.next = 4;
            return (0, _api.post)("auth/forgotPasswordUserEmailExist?name=".concat(name), data, "/forgotPassword/1?q=".concat(data.email));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlFindUserAccountByEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (findUserForm) {
  var View = new _FindAccountByEmail.default(); // handler

  View.addHandlerSubmitForm(controlFindUserAccountByEmail);
}
},{"../../../../View/Form/ForgotPassword/0.FindAccountByEmail.js":"View/Form/ForgotPassword/0.FindAccountByEmail.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/ForgotPassword/1.SendVerificationTokenView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SendResetPasswordTokenView = /*#__PURE__*/function (_FormView) {
  _inherits(SendResetPasswordTokenView, _FormView);

  var _super = _createSuper(SendResetPasswordTokenView);

  function SendResetPasswordTokenView() {
    var _this;

    _classCallCheck(this, SendResetPasswordTokenView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--forgotPassword[data-action="send-verification"]'));

    _defineProperty(_assertThisInitialized(_this), "_checkBoxBtn", _this._parentEl.querySelector('.btn--checkbox'));

    _defineProperty(_assertThisInitialized(_this), "_submitBtn", _this._parentEl.querySelector('button[data-action="next"]'));

    _defineProperty(_assertThisInitialized(_this), "_cancelBtn", _this._parentEl.querySelector("button[data-action='cancel'"));

    _this.handleFormBasicFunctionality();

    _this.handleCheckBox(_this._checkBoxBtn, _this._submitBtn);

    return _this;
  } // API ***********************************************
  // send email or name for further login


  _createClass(SendResetPasswordTokenView, [{
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      this._submitBtn.addEventListener('click', function () {
        handle();
      });
    }
  }, {
    key: "addHandlerCloseForm",
    value: function addHandlerCloseForm(handle) {
      this._cancelBtn.addEventListener('click', function () {
        handle();
      });
    }
  }]);

  return SendResetPasswordTokenView;
}(_FormView2.default);

var _default = SendResetPasswordTokenView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/forgotPassword/1.sendVerificationController.js":[function(require,module,exports) {
"use strict";

var _SendVerificationTokenView = _interopRequireDefault(require("../../../../View/Form/ForgotPassword/1.SendVerificationTokenView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SendResetVerificationTokenForm = document.querySelector('.form--forgotPassword[data-action="send-verification"]');

var controlSendVerificationToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var email, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = location.search.split('&')[0].split('q=')[1];
            data = {};
            data.email = email;
            _context.next = 5;
            return (0, _api.post)("auth/forgotPasswordSendVerification", data, "/forgotPassword/2?q=".concat(email));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlSendVerificationToken() {
    return _ref.apply(this, arguments);
  };
}();

var controlCloseForm = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var email, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = location.search.split('&')[0].split('q=')[1];
            data = {};
            data.email = email;
            _context2.next = 5;
            return (0, _api.post)("auth/removeVerificationTokenProperties", data, "/join");

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function controlCloseForm() {
    return _ref2.apply(this, arguments);
  };
}();

if (SendResetVerificationTokenForm) {
  var View = new _SendVerificationTokenView.default(); // handler

  View.addHandlerSubmitForm(controlSendVerificationToken);
  View.addHandlerCloseForm(controlCloseForm);
}
},{"../../../../View/Form/ForgotPassword/1.SendVerificationTokenView.js":"View/Form/ForgotPassword/1.SendVerificationTokenView.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/ForgotPassword/2.VerifyAccount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SignUpVerificationView = /*#__PURE__*/function (_FormView) {
  _inherits(SignUpVerificationView, _FormView);

  var _super = _createSuper(SignUpVerificationView);

  function SignUpVerificationView() {
    var _this;

    _classCallCheck(this, SignUpVerificationView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--forgotPassword[data-action="verify-account"]'));

    _defineProperty(_assertThisInitialized(_this), "_reRequestTokenBtn", _this._parentEl.querySelector('.form-reRequestToken'));

    _defineProperty(_assertThisInitialized(_this), "_formSubmitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _this.handleFormBasicFunctionality();

    return _this;
  } // API ***********************************************


  _createClass(SignUpVerificationView, [{
    key: "addHandlerRequestNewVerificationToken",
    value: function addHandlerRequestNewVerificationToken(handle) {
      this._reRequestTokenBtn.addEventListener('click', function () {
        // api call
        handle();
      });
    }
  }, {
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._formSubmitBtn.addEventListener('click', function () {
        var formData = _this2.getAllNonHiddenInputValueAsObj();

        handle(formData);
      });
    }
  }]);

  return SignUpVerificationView;
}(_FormView2.default);

var _default = SignUpVerificationView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/forgotPassword/2.verifyUserController.js":[function(require,module,exports) {
"use strict";

var _VerifyAccount = _interopRequireDefault(require("../../../../View/Form/ForgotPassword/2.VerifyAccount.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var forgotPasswordVerificationForm = document.querySelector('.form--forgotPassword[data-action="verify-account"]');

var controlVerifyAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token) {
    var email;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(token);
            email = location.search.split('&')[0].split('q=')[1];
            _context.next = 4;
            return (0, _api.post)("auth/forgotPasswordVerifyAccount", token, "/forgotPassword/3?q=".concat(email));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlVerifyAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlResendVerificationToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var email, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = location.search.split('&')[0].split('q=')[1];
            data = {
              email: email
            };
            _context2.next = 4;
            return (0, _api.post)("auth/forgotPasswordSendVerification", data);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function controlResendVerificationToken() {
    return _ref2.apply(this, arguments);
  };
}();

if (forgotPasswordVerificationForm) {
  var View = new _VerifyAccount.default(); // handler

  View.addHandlerSubmitForm(controlVerifyAccount);
  View.addHandlerRequestNewVerificationToken(controlResendVerificationToken);
}
},{"../../../../View/Form/ForgotPassword/2.VerifyAccount.js":"View/Form/ForgotPassword/2.VerifyAccount.js","../../../api/api.js":"Controller/api/api.js"}],"View/Form/ForgotPassword/3.ResetPasswordView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResetPasswordView = /*#__PURE__*/function (_FormView) {
  _inherits(ResetPasswordView, _FormView);

  var _super = _createSuper(ResetPasswordView);

  function ResetPasswordView() {
    var _this;

    _classCallCheck(this, ResetPasswordView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--forgotPassword[data-action="reset-password"]'));

    _defineProperty(_assertThisInitialized(_this), "_loginBtn", _this._parentEl.querySelector('button[data-action="login"]'));

    _defineProperty(_assertThisInitialized(_this), "_passwordGroupEl", _this._parentEl.querySelector('.form-group[data-field="password"]'));

    _defineProperty(_assertThisInitialized(_this), "_passwordInput", _this._passwordGroupEl.querySelector('#password'));

    _defineProperty(_assertThisInitialized(_this), "_seePasswordBtn", _this._passwordGroupEl.querySelector('[data-action="see-password"]'));

    _this.handleFormBasicFunctionality(); // this._addHandlerSubmitForm();


    _this.checkIfNewPasswordMeetMinRequirements(_this._passwordInput, _this._passwordGroupEl);

    _this.enableUserToSeePasswordTyped(_this._seePasswordBtn, _this._passwordInput);

    return _this;
  } // API ***********************************************
  // send email or name for further login


  _createClass(ResetPasswordView, [{
    key: "addHandlerSubmitForm",
    value: function addHandlerSubmitForm(handle) {
      var _this2 = this;

      this._loginBtn.addEventListener('click', function () {
        var formdata = _this2.getAllNonHiddenInputValueAsObj();

        handle(formdata); // then to next page
      });
    }
  }]);

  return ResetPasswordView;
}(_FormView2.default);

var _default = ResetPasswordView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js"}],"Controller/Components/Form/forgotPassword/3.resetPasswordController.js":[function(require,module,exports) {
"use strict";

var _ResetPasswordView = _interopRequireDefault(require("../../../../View/Form/ForgotPassword/3.ResetPasswordView.js"));

var _api = require("../../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var resetPasswordForm = document.querySelector('.form--forgotPassword[data-action="reset-password"]');

var controlResetPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(data); //   const email = location.search.split('&')[0].split('email=')[1];

            _context.next = 3;
            return (0, _api.post)("auth/forgotPasswordResetPassword", data, '/');

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlResetPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (resetPasswordForm) {
  var View = new _ResetPasswordView.default(); // handler

  View.addHandlerSubmitForm(controlResetPassword);
}
},{"../../../../View/Form/ForgotPassword/3.ResetPasswordView.js":"View/Form/ForgotPassword/3.ResetPasswordView.js","../../../api/api.js":"Controller/api/api.js"}],"Controller/Components/Form/main.js":[function(require,module,exports) {
"use strict";

require("./SignUp/0.CreateAccountController.js");

require("./SignUp/1.CustomiseExperienceViewController.js");

require("./SignUp/2.ConfirmAccountCredentialsController.js");

require("./SignUp/3.SignUpVerificationController.js");

require("./SignUp/4.SetPasswordController.js");

require("./SignUp/5.SetProfileController.js");

require("./SignUp/6.SetBioController.js");

require("./login/0.identifyUserController.js");

require("./login/1.confirmUserController.js");

require("./forgotPassword/0.findUserByNameOrEmailController.js");

require("./forgotPassword/0.findUserByEmailController.js");

require("./forgotPassword/1.sendVerificationController.js");

require("./forgotPassword/2.verifyUserController.js");

require("./forgotPassword/3.resetPasswordController.js");
},{"./SignUp/0.CreateAccountController.js":"Controller/Components/Form/SignUp/0.CreateAccountController.js","./SignUp/1.CustomiseExperienceViewController.js":"Controller/Components/Form/SignUp/1.CustomiseExperienceViewController.js","./SignUp/2.ConfirmAccountCredentialsController.js":"Controller/Components/Form/SignUp/2.ConfirmAccountCredentialsController.js","./SignUp/3.SignUpVerificationController.js":"Controller/Components/Form/SignUp/3.SignUpVerificationController.js","./SignUp/4.SetPasswordController.js":"Controller/Components/Form/SignUp/4.SetPasswordController.js","./SignUp/5.SetProfileController.js":"Controller/Components/Form/SignUp/5.SetProfileController.js","./SignUp/6.SetBioController.js":"Controller/Components/Form/SignUp/6.SetBioController.js","./login/0.identifyUserController.js":"Controller/Components/Form/login/0.identifyUserController.js","./login/1.confirmUserController.js":"Controller/Components/Form/login/1.confirmUserController.js","./forgotPassword/0.findUserByNameOrEmailController.js":"Controller/Components/Form/forgotPassword/0.findUserByNameOrEmailController.js","./forgotPassword/0.findUserByEmailController.js":"Controller/Components/Form/forgotPassword/0.findUserByEmailController.js","./forgotPassword/1.sendVerificationController.js":"Controller/Components/Form/forgotPassword/1.sendVerificationController.js","./forgotPassword/2.verifyUserController.js":"Controller/Components/Form/forgotPassword/2.verifyUserController.js","./forgotPassword/3.resetPasswordController.js":"Controller/Components/Form/forgotPassword/3.resetPasswordController.js"}],"View/Common/Preview.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ParentPreview = /*#__PURE__*/function () {
  function ParentPreview() {
    _classCallCheck(this, ParentPreview);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_parentBtn", void 0);

    _defineProperty(this, "_parentTextEl", void 0);

    _defineProperty(this, "_parentInputEl", void 0);
  }

  _createClass(ParentPreview, [{
    key: "_hide",
    value: function _hide() {// this._parentBtn.dataset.active = false;
    }
  }, {
    key: "_hideOtherPreviewExceptCurOne",
    value: function _hideOtherPreviewExceptCurOne() {
      var _this = this;

      var previewElsArr = _toConsumableArray(document.querySelectorAll('.preview'));

      previewElsArr.forEach(function (el) {
        if (el.dataset.type !== _this._parentEl.dataset.type) el.closest('.preview-parent') ? el.closest('.preview-parent').dataset.active = false : '';
      });
    }
  }, {
    key: "_setDOMEls",
    value: function _setDOMEls() {
      this._parentBtn = this._parentEl.closest('.preview-parent');
      this._parentTextEl = this._parentBtn.querySelector('.preview-parent-text');
      this._parentInputEl = this._parentBtn.querySelector('.preview-parent-input');
    }
  }, {
    key: "_set_item_active",
    value: function _set_item_active(el) {
      var cur_preview_item = el.closest('.preview-item');

      _toConsumableArray(this._parentEl.querySelectorAll('.preview-item')).forEach(function (el) {
        if (el !== cur_preview_item) return el.dataset.active = false;
        el.dataset.active = true;
      });
    }
  }, {
    key: "handleAdditionalFunc",
    value: function handleAdditionalFunc() {} // // topParentFormEL will the create-Tweet form in which the preview exist
    // handlePreview(handle, ) {
    //   // this._parentEl = topParentFormEl.querySelector(this._parentElSelector);
    //   // // preventing addEvent to not add twice in one el
    //   // if (this._parentEl.dataset.clickEvent === 'true') return;
    //   // this._parentEl.dataset.clickEvent = 'true';
    //   document.addEventListener('click', (e) => {
    //     const target = e.target;
    //   if(  !this._target_checker(target)) return;
    //     this._set_item_active(target);
    //     this._hideOtherPreviewExceptCurOne();
    //     this._setDOMEls();
    //     this.handleAdditionalFunc(handle, target);
    //     // //  open new component from preview
    //     // if (target.closest('.preview-open-component')) {
    //     //   const { action } = target.closest('.preview-open-component').dataset;
    //     //   this._hide();
    //     //   return handle(action);
    //     // }
    //     // Select item and set value;
    //     const preview_item = target.closest('.preview-item');
    //     if (!preview_item) return;
    //     const { value } = preview_item.dataset;
    //     this._parentTextEl.textContent = value;
    //     this._parentInputEl.value = value;
    //     this._hide();
    //   });
    // }

  }]);

  return ParentPreview;
}();

var _default = ParentPreview;
exports.default = _default;
},{}],"View/Components/Preview/1.ChooseAudiencePreview.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Preview = _interopRequireDefault(require("../../Common/Preview.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChooseAudiencePreview = /*#__PURE__*/function (_ParentPreview) {
  _inherits(ChooseAudiencePreview, _ParentPreview);

  var _super = _createSuper(ChooseAudiencePreview);

  function ChooseAudiencePreview() {
    var _this;

    _classCallCheck(this, ChooseAudiencePreview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentElSelector", '.preview[data-type="choose-audience"]');

    return _this;
  }

  _createClass(ChooseAudiencePreview, [{
    key: "handleAdditionalFunc",
    value: function handleAdditionalFunc(handle, target) {
      // handle edit circle btn
      var el = target.closest('[data-action="open-user-edit-circle"]');
      if (!el) return;
      var edit_circle_modal = document.querySelector('.modal[data-action="edit-your-circle"]');
      var show_circle = handle('show-user-cicle');
      if (show_circle) edit_circle_modal.classList.replace('hidden', 'display');
    }
  }, {
    key: "addHandlerChooseAudience",
    value: function addHandlerChooseAudience(handle) {
      var _this2 = this;

      document.addEventListener('click', function (e) {
        var target = e.target;
        _this2._parentEl = e.target.closest('.preview[data-type="choose-audience"]');
        if (!_this2._parentEl) return;

        _this2._set_item_active(target);

        _this2._hideOtherPreviewExceptCurOne();

        _this2._setDOMEls();

        _this2.handleAdditionalFunc(handle, target); // //  open new component from preview
        // if (target.closest('.preview-open-component')) {
        //   const { action } = target.closest('.preview-open-component').dataset;
        //   this._hide();
        //   return handle(action);
        // }
        // Select item and set value;


        var preview_item = target.closest('.preview-item');
        if (!preview_item) return;
        var value = preview_item.dataset.value;
        _this2._parentTextEl.textContent = value;
        _this2._parentInputEl.value = value;

        _this2._hide();
      });
    }
  }]);

  return ChooseAudiencePreview;
}(_Preview.default);

var _default = ChooseAudiencePreview;
exports.default = _default;
},{"../../Common/Preview.js":"View/Common/Preview.js"}],"View/Components/Preview/2.chooseWhoCanReplyView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Preview = _interopRequireDefault(require("../../Common/Preview.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChooseWhoCanReplyAudiencePreview = /*#__PURE__*/function (_ParentPreview) {
  _inherits(ChooseWhoCanReplyAudiencePreview, _ParentPreview);

  var _super = _createSuper(ChooseWhoCanReplyAudiencePreview);

  function ChooseWhoCanReplyAudiencePreview() {
    var _this;

    _classCallCheck(this, ChooseWhoCanReplyAudiencePreview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentElSelector", '.preview[data-type="choose-who-can-reply"]');

    return _this;
  }

  _createClass(ChooseWhoCanReplyAudiencePreview, [{
    key: "addHandlerChooseWhoCanReply",
    value: function addHandlerChooseWhoCanReply(handle) {
      var _this2 = this;

      document.addEventListener('click', function (e) {
        var target = e.target;
        _this2._parentEl = e.target.closest('.preview[data-type="choose-who-can-reply"]');
        if (!_this2._parentEl) return;

        _this2._set_item_active(target);

        _this2._hideOtherPreviewExceptCurOne();

        _this2._setDOMEls();

        _this2.handleAdditionalFunc(handle, target); // //  open new component from preview
        // if (target.closest('.preview-open-component')) {
        //   const { action } = target.closest('.preview-open-component').dataset;
        //   this._hide();
        //   return handle(action);
        // }
        // Select item and set value;


        var preview_item = target.closest('.preview-item');
        if (!preview_item) return;
        var value = preview_item.dataset.value;
        _this2._parentTextEl.textContent = value;
        _this2._parentInputEl.value = value;

        _this2._hide();
      });
    }
  }]);

  return ChooseWhoCanReplyAudiencePreview;
}(_Preview.default);

var _default = ChooseWhoCanReplyAudiencePreview;
exports.default = _default;
},{"../../Common/Preview.js":"View/Common/Preview.js"}],"View/Components/Tweet/3.ScheduleTweetView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormView2 = _interopRequireDefault(require("../../Common/FormView.js"));

var _AlertView = _interopRequireDefault(require("../Alert/AlertView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScheduleTweetFormView = /*#__PURE__*/function (_FormView) {
  _inherits(ScheduleTweetFormView, _FormView);

  var _super = _createSuper(ScheduleTweetFormView);

  // create Tweet form
  function ScheduleTweetFormView() {
    var _this;

    _classCallCheck(this, ScheduleTweetFormView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.form--schedule-tweet[data-action="schedule-post"]'));

    _defineProperty(_assertThisInitialized(_this), "_scheduleDateLabel", _this._parentEl.querySelector('.form-schedule-label span'));

    _defineProperty(_assertThisInitialized(_this), "_submitBtn", _this._parentEl.querySelector('.form-submitBtn'));

    _defineProperty(_assertThisInitialized(_this), "_redirectToWhenFormClosed", 'current');

    _defineProperty(_assertThisInitialized(_this), "_createTweetForm", void 0);

    _defineProperty(_assertThisInitialized(_this), "_createTweetScheduleInputEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_createTweetScheduleLabelEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_date", void 0);

    _defineProperty(_assertThisInitialized(_this), "_monthInputEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_dayInputEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_yearInputEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_hourInputEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_minuteInputEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_am_pmInputEl", void 0);

    _this.handleFormBasicFunctionality();

    return _this;
  }

  _createClass(ScheduleTweetFormView, [{
    key: "_setDOMSEls",
    value: function _setDOMSEls(createTweetForm) {
      // action to be taken on
      this._createTweetForm = createTweetForm;
      this._createTweetScheduleInputEl = createTweetForm.querySelector('#tweet-schedule-input');
      this._createTweetScheduleLabelEl = createTweetForm.querySelector('.createTweet-schedule-timing-value'); // schedule form

      this._monthInputEl = this._parentEl.querySelector('#month');
      this._dayInputEl = this._parentEl.querySelector('#day');
      this._yearInputEl = this._parentEl.querySelector('#year');
      this._hourInputEl = this._parentEl.querySelector('#hour');
      this._minuteInputEl = this._parentEl.querySelector('#minute');
      this._am_pmInputEl = this._parentEl.querySelector('[name="am_pm"]');
    }
  }, {
    key: "setScheduleDateLabel",
    value: function setScheduleDateLabel(date) {
      date = date.setDate(date.getDate() + 1);
      date = new Date(date);
      this._date = date;
      this._monthInputEl.value = date.getMonth() + 1;
      this._dayInputEl.value = date.getDate();
      this._yearInputEl.value = date.getFullYear();
      this._hourInputEl.value = Math.abs(date.getHours() - 12);
      this._minuteInputEl.value = date.getMinutes();
      this._am_pmInputEl.value = date.getHours > 12 ? 'AM' : 'PM';
      this._scheduleDateLabel.textContent = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(date).split('GMT')[0] + "".concat(this._am_pmInputEl.value);

      this._enableSubmitBtnWhenAllInputsValid();
    }
  }, {
    key: "_handleSubmitBtn",
    value: function _handleSubmitBtn(target, createTweetForm) {
      var btn = target.closest('.form-submitBtn');
      if (!btn) return;
      var inputValues = this.getAllNonHiddenInputValueAsObj();
      var am_pm = inputValues.am_pm,
          day = inputValues.day,
          hour = inputValues.hour,
          minute = inputValues.minute,
          month = inputValues.month,
          year = inputValues.year;
      var schedule_date = new Date("".concat(month, " ").concat(day, " ").concat(year, " ").concat(hour, ":").concat(minute, " ").concat(am_pm));
      console.log("".concat(month, " ").concat(day, " ").concat(year, " ").concat(hour, ":").concat(minute, " ").concat(am_pm), schedule_date);
      if (schedule_date < new Date()) return new _AlertView.default().render('choose a date in future!');
      var schedule_date_db = schedule_date.toISOString();
      this._createTweetForm.dataset.tweetSchedule = true;
      this._createTweetScheduleInputEl.value = schedule_date_db;
      this._createTweetScheduleLabelEl.textContent = "".concat("".concat(schedule_date).split('GMT')[0], " ").concat(am_pm, " ");

      this._hideWithoutClearInputValues();

      return {
        schedule_date: schedule_date,
        schedule_date_db: schedule_date_db
      };
    } // change schedule tweet to normal tweet

  }, {
    key: "_handleClearBtn",
    value: function _handleClearBtn(target) {
      var btn = target.closest('button[data-action="clear"]');
      if (!btn) return;

      this._createTweetForm.setAttribute('data-tweet-schedule', false);

      this._hide();
    }
  }, {
    key: "_handleScheduledTweetBtn",
    value: function _handleScheduledTweetBtn(target) {
      var btn = target.closest('button[data-action="scheduled-tweets"]');
      if (!btn) return;
      var unsentTweetModal = document.querySelector('.modal[data-modal="unsent-tweets"]');
      unsentTweetModal.classList.replace('hidden', 'display');

      this._hide();
    } // whenever i call this form i will change the form to which it needs to send the data back
    // will also prevent duplicate add eventlistener

  }, {
    key: "handleScheduleForm",
    value: function handleScheduleForm(createTweetForm) {
      var _this2 = this;

      this._setDOMSEls(createTweetForm); // prevent duplicate of data


      if (this._parentEl.dataset.clickEvent === 'true') return;
      this._parentEl.dataset.clickEvent = 'true';

      this._parentEl.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;

        _this2._handleSubmitBtn(target);

        _this2._handleClearBtn(target);

        _this2._handleScheduledTweetBtn(target);
      });
    }
  }]);

  return ScheduleTweetFormView;
}(_FormView2.default);

var _default = ScheduleTweetFormView;
exports.default = _default;
},{"../../Common/FormView.js":"View/Common/FormView.js","../Alert/AlertView.js":"View/Components/Alert/AlertView.js"}],"View/Components/Tweet/createTweet/0.ParentCreateTweetView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domHelper = require("../../../utils/domHelper.js");

var _AlertView = _interopRequireDefault(require("../../Alert/AlertView.js"));

var _ChooseAudiencePreview = _interopRequireDefault(require("../../Preview/1.ChooseAudiencePreview.js"));

var _chooseWhoCanReplyView = _interopRequireDefault(require("../../Preview/2.chooseWhoCanReplyView.js"));

var _ScheduleTweetView = _interopRequireDefault(require("../3.ScheduleTweetView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// whenever a component is used twice we should make the component as common View for that component so another component just like can use the component
// Parent have all the method defined so that child can use all
var ParentCreateTweetView = /*#__PURE__*/function () {
  function ParentCreateTweetView() {
    _classCallCheck(this, ParentCreateTweetView);

    _defineProperty(this, "_topParentEl", void 0);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_textAreaEl", void 0);

    _defineProperty(this, "_percentageCircleControllerEl", void 0);

    _defineProperty(this, "_overlay", void 0);

    _defineProperty(this, "_chooseAudienceBtn", void 0);

    _defineProperty(this, "_chooseWhoCanReplyBtn", void 0);

    _defineProperty(this, "_scheduleTweetBtn", void 0);

    _defineProperty(this, "_addMutlipleTweetBtn", void 0);

    _defineProperty(this, "_saveScheduleTweetBtn", void 0);

    _defineProperty(this, "_saveTweetBtn", void 0);

    _defineProperty(this, "_scheduleTweetForm", void 0);

    _defineProperty(this, "_createMutipleTweetsContainer", void 0);

    _defineProperty(this, "_uploadImgInputEl", void 0);

    _defineProperty(this, "_uploadImgsMainContainerEl", void 0);

    _defineProperty(this, "_uploadImgsContainerEl", void 0);

    _defineProperty(this, "_uploadImgElsArr", void 0);

    _defineProperty(this, "_chooseAudienceBtnSpanEl", void 0);

    _defineProperty(this, "_chooseWhoCanReplyAudienceBtnSpanEl", void 0);

    _defineProperty(this, "_totalLength", 200);

    _defineProperty(this, "_ScheduleView", void 0);
  }

  _createClass(ParentCreateTweetView, [{
    key: "setSomeOtherComponentClass",
    value: function setSomeOtherComponentClass() {}
  }, {
    key: "setUsedComponentClass",
    value: function setUsedComponentClass() {
      this._ScheduleView = new _ScheduleTweetView.default();
      this.setSomeOtherComponentClass();
    }
  }, {
    key: "setMoreDOMEls",
    value: function setMoreDOMEls() {}
  }, {
    key: "_setDOMEls",
    value: function _setDOMEls(target) {
      var _this$_chooseAudience, _this$_chooseWhoCanRe, _this$_chooseAudience2, _this$_chooseWhoCanRe2;

      this._parentEl = target.closest('.form--createTweet');
      this.setMoreDOMEls(target);
      this._textAreaEl = this._parentEl.querySelector('.createTweet-textarea');
      this._saveTweetBtn = this._parentEl.querySelector('button[data-action="save-tweet"]');
      this._percentageCircleControllerEl = this._parentEl.querySelector('.circle'); // this._overlay = this._parentEl.querySelector('.overlay');
      // BTNS -----------------------------------------------------------------

      this._chooseAudienceBtn = this._parentEl.querySelector("button[data-action='choose-audience']");
      this._chooseAudienceInput = (_this$_chooseAudience = this._chooseAudienceBtn) === null || _this$_chooseAudience === void 0 ? void 0 : _this$_chooseAudience.querySelector('input');
      this._chooseWhoCanReplyBtn = this._parentEl.querySelector("button[data-action='choose-whocan-reply']");
      this._chooseWhoCanReplyInput = (_this$_chooseWhoCanRe = this._chooseWhoCanReplyBtn) === null || _this$_chooseWhoCanRe === void 0 ? void 0 : _this$_chooseWhoCanRe.querySelector('input');
      this._scheduleTweetBtn = this._parentEl.querySelector("button[data-action='schedule-post']");
      this._addMutlipleTweetBtn = this._parentEl.querySelector("button[data-action='add-another-tweet']");
      this._saveScheduleTweetBtn = this._parentEl.querySelector('button[data-action="save-schedule-tweet"]');
      this._saveTweetBtn = this._parentEl.querySelector("button[data-action='save-tweet']"); // FORM -----------------------------------------------------------------

      this._scheduleTweetForm = document.querySelector('.form[data-action="schedule-post"]');
      this._createMutipleTweetsContainer = document.querySelector('.createTweets'); // INPUT ---------------------------------------------------------------

      this._uploadImgInputEl = this._parentEl.querySelector('input[name="upload_image"]'); // OTHER --------------------------------------------------

      this._uploadImgsMainContainerEl = this._parentEl.querySelector('.tweet-uploadImg__container');
      this._uploadImgsContainerEl = this._parentEl.querySelector('.tweet-uploadImg__content');
      this._uploadImgElsArr = _toConsumableArray(this._uploadImgsContainerEl.querySelectorAll('.tweet-uploadImg'));
      this._scheduleTimingEl = this._parentEl.querySelector('.createTweet-schedule-timing');
      this._scheduleTimingSpanValueEl = this._parentEl.querySelector('.createTweet-schedule-timing-value');
      this._chooseAudienceBtnSpanEl = (_this$_chooseAudience2 = this._chooseAudienceBtn) === null || _this$_chooseAudience2 === void 0 ? void 0 : _this$_chooseAudience2.querySelector('span');
      this._chooseWhoCanReplyAudienceBtnSpanEl = (_this$_chooseWhoCanRe2 = this._chooseWhoCanReplyBtn) === null || _this$_chooseWhoCanRe2 === void 0 ? void 0 : _this$_chooseWhoCanRe2.querySelector('span');
    }
  }, {
    key: "emptyAllInputsValue",
    value: function emptyAllInputsValue() {
      var defer_img_files_remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // parent el
      this._parentEl.setAttribute('data-active', false);

      this._parentEl.setAttribute('data-tweet-schedule', false);

      this._parentEl.setAttribute('data-tweet-empty', true); // schedule timing label


      (0, _domHelper.addClass)(this._scheduleTimingEl, 'hidden');
      this._scheduleTimingSpanValueEl.value = ''; // btns

      this._chooseAudienceBtn.dataset.active = false;
      this._chooseWhoCanReplyBtn.dataset.active = false;
      this._chooseAudienceBtn.className = 'btn--inline preview-parent';
      this._chooseWhoCanReplyBtn.className = 'btn--span preview-parent';
      this._chooseAudienceBtnSpanEl.textContent = 'Everyone';
      this._chooseWhoCanReplyAudienceBtnSpanEl.textContent = 'Everyone can reply';
      this._chooseWhoCanReplyBtn.disabled = false;
      this._chooseWhoCanReplyInput.value = 'everyone';
      this._chooseAudienceInput.value = 'everyone';
      this._textAreaEl.value = '';

      this._uploadImgsMainContainerEl.classList.add('hidden');

      this._uploadImgElsArr.forEach(function (el) {
        return el.src = '';
      }); // percent complete circle


      this._percentageCircleControllerEl.setAttribute('stroke-dasharray', "0,100");

      if (defer_img_files_remove) return; // input values

      _toConsumableArray(this._parentEl.querySelectorAll('input')).forEach(function (el) {
        return el.value = '';
      });

      this._uploadImgInputEl.value = '';
      this._uploadImgInputEl.files = undefined; // img

      this._chooseAudienceInput.value = 'everyone';
      this._chooseWhoCanReplyInput.value = 'everyone';
    } // CSS ----------------------------------------

  }, {
    key: "_autoIncreaseTextareaHeight",
    value: function _autoIncreaseTextareaHeight() {
      // this._textAreaEl.style.height =
      //   this._textAreaEl.clientHeight + this._textAreaEl.scrollTop + 'px';
      if (this._textAreaEl.dataset.scrollEvent === 'true') return;
      this._textAreaEl.dataset.scrollEvent = 'true';

      this._textAreaEl.addEventListener('scroll', function () {
        this.style.height = this.clientHeight + this.scrollTop + 'px';
      });
    }
  }, {
    key: "_showTextWordLimitAndEnableSubmitBtn",
    value: function _showTextWordLimitAndEnableSubmitBtn() {
      var _this = this;

      if (this._textAreaEl.dataset.inputChangeEvent === 'true') return;
      this._textAreaEl.dataset.inputChangeEvent = 'true';

      this._textAreaEl.addEventListener('input', function () {
        var length = _this._textAreaEl.value.trim().length;

        _this._saveTweetBtn.disabled = length === 0 ? true : false;
        _this._parentEl.dataset.tweetEmpty = length === 0 ? true : false;
        var percentage = Math.floor((length || 0) / _this._totalLength * 100);

        _this._percentageCircleControllerEl.setAttribute('stroke-dasharray', "".concat(percentage, ",100"));
      });
    }
  }, {
    key: "_getAllInputsValue",
    value: function _getAllInputsValue(parentEl) {
      if (parentEl) this._parentEl = parentEl;

      var _textAreaEl = this._parentEl.querySelectorAll('textarea');

      var inputEls = this._parentEl.querySelectorAll('input');

      var data = [].concat(_toConsumableArray(_textAreaEl), _toConsumableArray(inputEls));
      data = data.reduce(function (acc, input) {
        if (input.name !== 'upload_image' && input.value && input.value !== '') {
          acc[input.name] = input.value;
          return acc;
        }

        if (input.name === 'upload_image') {
          // changing this to upload_imgs
          acc['upload_imgs'] = input.files || input.upload_imgs;
        } // acc[input.name] =input.value


        return acc;
      }, {});
      return data;
    } // Handle Btn $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  }, {
    key: "_setUploadImgsAndshow",
    value: function _setUploadImgsAndshow(type) {
      var _this2 = this;

      var imgArrOptional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // imgType => img or files
      this._parentEl.dataset.tweetEmpty = 'false'; // this._upload_img_files_arr = [];
      // for multiple tweet to minimize text area height

      this._parentEl.setAttribute('data-tweet-img-set', true);

      this._saveTweetBtn.disabled = false;
      var img_files = type === 'files' ? _toConsumableArray(this._uploadImgInputEl.files) : imgArrOptional;
      if (img_files.length > 4) new _AlertView.default().render('Max no. of images is 4!');
      console.log('start', this._uploadImgInputEl.files);
      var limit_img_files = img_files.slice(0, 4); // this._uploadImgInputEl.dataset.files = JSON.stringify(limit_img_files);
      // this._upload_img_files_arr = limit_img_files;
      // displaying submit img by setting into img src

      limit_img_files.reduce(function (count, file, i) {
        var imgEl = _this2._uploadImgElsArr[i];
        var imgParentEl = imgEl.closest('figure');
        (0, _domHelper.removeClass)(imgParentEl, 'hidden'); // CSS

        imgEl.src = type === 'files' ? URL.createObjectURL(file) : "/img/tweet/".concat(file);

        if (type === 'files') {
          imgEl.onload = function () {
            URL.revokeObjectURL(imgEl.src); // free memory
          };
        }
      }, 0);
      (0, _domHelper.removeClass)(this._uploadImgsMainContainerEl, 'hidden');
      this._uploadImgsContainerEl.dataset.items = limit_img_files.length;
      if ((0, _domHelper.contains)(this._parentEl, 'createTweets-item')) this.addAdditionalCodeToShowUploadImgFunc();
      console.log('final', this._uploadImgInputEl.files);
    }
  }, {
    key: "_handleUploadImg",
    value: function _handleUploadImg() {
      var _this3 = this;

      if (this._uploadImgInputEl.dataset.changeEvent === 'true') return;
      this._uploadImgInputEl.dataset.changeEvent = 'true'; // adding img input files event

      this._uploadImgInputEl.addEventListener('change', this._setUploadImgsAndshow.bind(this, 'files')); // editing the submit imgs


      this._uploadImgsContainerEl.addEventListener('click', function (e) {
        var removeImgBtn = e.target.closest('button[data-action="remove-img"]');
        if (!removeImgBtn) return; //  remove img

        var clickedImgFigEl = removeImgBtn.closest('figure');
        clickedImgFigEl.classList.add('hidden'); // remove img from input files also

        var removeImgIndex = _this3._uploadImgElsArr.findIndex(function (el) {
          return el === clickedImgFigEl.querySelector('img');
        }); // let imgFiles = JSON.parse(this._uploadImgInputEl.dataset.files);
        // this._upload_img_files_arr.splice(removeImgIndex, 1);
        // this._uploadImgInputEl.dataset.files = JSON.stringify(imgFiles);
        // get remaining images


        var remainingImg_count = _toConsumableArray(_this3._uploadImgsContainerEl.querySelectorAll('figure')).filter(function (el) {
          return !el.classList.contains('hidden');
        }).length;

        if (remainingImg_count === 0) {
          // this._upload_img_files_arr = [];
          (0, _domHelper.addClass)(_this3._uploadImgsMainContainerEl, 'hidden');
        }

        if (_this3._textAreaEl.value === 0) {
          _this3._parentEl.dataset.active = false;
          _this3._parentEl.dataset.tweetEmpty = true;
          _this3._saveTweetBtn.disabled = true;
        } // set new grid


        _this3._uploadImgsContainerEl.dataset.items = remainingImg_count;
      });
    } // selecting the type of audience user want s

  }, {
    key: "_handleChooseTargetAudienceBtn",
    value: function _handleChooseTargetAudienceBtn(target) {
      // this.();
      var chooseAudienceBtn = target.closest("button[data-action='choose-audience']");
      if (!chooseAudienceBtn) return;
      if (chooseAudienceBtn.disabled) return; // setting the preview to give user options
      // preview-item-container

      var active = chooseAudienceBtn.dataset.active;
      active = active === 'true' ? 'false' : 'true'; // setting option value in btn in chooseAudienceBtn and the relevant value in chooseWhoCanReplyBtn
      // two options in btns

      var choose_audience_type = this._chooseAudienceBtnSpanEl.textContent;

      if (choose_audience_type === 'everyone') {
        this._chooseAudienceInput.value = 'everyone';
        this._chooseWhoCanReplyInput.value = 'everyone';
        this._chooseWhoCanReplyAudienceBtnSpanEl.textContent = 'Everyone can reply';
        this._chooseWhoCanReplyBtn.disabled = false;
        this._chooseWhoCanReplyBtn.false = true;

        this._chooseAudienceBtn.classList.replace('btn--inline-secondary', 'btn--inline-primary');
      } else {
        this._chooseWhoCanReplyAudienceBtnSpanEl.textContent = 'Only your Twitter Circle can reply';
        this._chooseAudienceInput.value = 'circle';
        this._chooseWhoCanReplyInput.value = 'circle';
        this._chooseWhoCanReplyBtn.disabled = true;

        this._chooseAudienceBtn.classList.add('btn--inline-secondary', 'btn--inline-secondary');
      }

      this._chooseAudienceBtn.dataset.active = active;
      if ((0, _domHelper.contains)(this._parentEl, 'createTweets-item')) this.addAdditionalCodeToHandleChooseAudienceBtn();
    }
  }, {
    key: "_handleChooseWhoCanReplyBtn",
    value: function _handleChooseWhoCanReplyBtn(target) {
      var chooseWhoCanReplyBtn = target.closest("button[data-action='choose-whocan-reply']");
      if (!chooseWhoCanReplyBtn) return;
      if (chooseWhoCanReplyBtn.disabled) return; // const View = new ChoooseWhoCanReplyPreview();
      // View.handlePreview(this._parentEl);

      var active = chooseWhoCanReplyBtn.dataset.active;
      active = active === 'true' ? 'false' : 'true';
      this._chooseWhoCanReplyBtn.dataset.active = active;
      if ((0, _domHelper.contains)(this._parentEl, 'createTweets-item')) this.addAdditionalCodeToHandleChooseWhoCanReplyBtn();
    }
  }, {
    key: "_handleScheduleTweetBtn",
    value: function _handleScheduleTweetBtn(target) {
      var scheduleTweetBtn = target.closest("button[data-action='schedule-post']");
      if (!scheduleTweetBtn) return;
      if (scheduleTweetBtn.disabled) return; // const View = new ScheduleTweetFormView();

      this._ScheduleView.show();

      this._ScheduleView.handleScheduleForm(this._parentEl);

      this._ScheduleView.setScheduleDateLabel(new Date()); // replaceClass(this._scheduleTweetForm, 'hidden', 'view');

    }
  }, {
    key: "_showTweetFullOptionsWhenUserClick",
    value: function _showTweetFullOptionsWhenUserClick() {
      this._parentEl.dataset.active = true;
    } // FUNCTION TO ADD ON OWN VIEW

  }, {
    key: "handleAddMultipleTweetsBtn",
    value: function handleAddMultipleTweetsBtn() {// written in its own View Component
    }
  }, {
    key: "additionalHandleFuncs",
    value: function additionalHandleFuncs() {} // return current click tweet item el

  }, {
    key: "getTweetDataAsFormData",
    value: function getTweetDataAsFormData() {
      var data = this._getAllInputsValue();

      console.log(data);
      data.tweet_type = data.schedule_post_time ? 'schedule' : 'post';
      data.upload_imgs = _toConsumableArray(data.upload_imgs); // check for draft tweet

      if (this._parentEl.dataset.tweetId) data.tweet_id = this._parentEl.dataset.tweetId; // setting upload_img
      // data.upload_imgs = this._upload_img_files_arr;
      // delete data.upload_image;

      var form_data = new FormData(); // loop

      Object.keys(data).forEach(function (key) {
        if (data[key] === null || data[key] === '') return;
        if (key === 'upload_imgs') return;
        form_data.append(key, data[key]);
      }); // taking care of upload_imgs

      if (data.upload_imgs && data.upload_imgs.length > 0) data.upload_imgs.forEach(function (img) {
        return form_data.append('upload_imgs', img);
      });
      return form_data;
    } // Submit data to db(single tweet)

  }, {
    key: "_handleSaveTweet",
    value: function _handleSaveTweet(target, handle) {
      var tweetBtn = target.closest('button[data-action="save-tweet"]');
      if (!tweetBtn) return;
      var form_data = this.getTweetDataAsFormData();
      handle('save-tweet', form_data);
    }
  }, {
    key: "_handleSaveScheduleTweet",
    value: function _handleSaveScheduleTweet(target, handle) {
      var btn = target.closest('button[data-action="save-schedule-tweet"]');
      if (!btn) return;
      var form_data = this.getTweetDataAsFormData();
      handle('save-schedule-tweet', form_data);
    } // handle unsent tweet

  }, {
    key: "handleTweetTopParentEl",
    value: function handleTweetTopParentEl(target) {} // API ***********************************************
    // addHandlerSubmitForm(handle) {
    //   this._saveTweetBtn.addEventListener('click', () => {
    //     const data = this._getAllInputsValue();
    //     // update user bio
    //     // then go to next page
    //   });
    // }

  }, {
    key: "handleTweet",
    value: function handleTweet(handle) {
      var _this4 = this;

      this._topParentEl.addEventListener('click', function (e) {
        var target = e.target; ///////////////////////////////////////////////////////
        // - HANDLE TWEET ITEM PARENT EL => CREATETWEETS
        ///////////////////////////////////////////////////////

        _this4.handleTweetTopParentEl(target); //////////////////////////////////////////////////////////
        // - HANDLE TWEET ITEM
        //////////////////////////////////////////////////////////


        if (!target.closest('.form--createTweet')) return;

        _this4._setDOMEls(target); // set some used class component


        _this4._showTweetFullOptionsWhenUserClick(target); // function which depend on click event


        _this4._handleChooseTargetAudienceBtn(target);

        _this4._handleChooseWhoCanReplyBtn(target);

        _this4._handleScheduleTweetBtn(target); // function depend on other event
        // so need to check if they are already add or not


        _this4._autoIncreaseTextareaHeight();

        _this4._showTextWordLimitAndEnableSubmitBtn();

        _this4._handleUploadImg(); // HANDLE FUNCTION TO ADD ON OWN COMPONENT VIEW


        _this4._handleSaveTweet(target, handle);

        _this4.handleAddMultipleTweetsBtn(target, handle);

        _this4._handleSaveScheduleTweet(target, handle);

        _this4.additionalHandleFuncs(target, handle);
      });
    }
  }]);

  return ParentCreateTweetView;
}();

var _default = ParentCreateTweetView;
exports.default = _default;
},{"../../../utils/domHelper.js":"View/utils/domHelper.js","../../Alert/AlertView.js":"View/Components/Alert/AlertView.js","../../Preview/1.ChooseAudiencePreview.js":"View/Components/Preview/1.ChooseAudiencePreview.js","../../Preview/2.chooseWhoCanReplyView.js":"View/Components/Preview/2.chooseWhoCanReplyView.js","../3.ScheduleTweetView.js":"View/Components/Tweet/3.ScheduleTweetView.js"}],"View/Components/Tweet/createTweet/1.CreateTweetView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domHelper = require("../../../utils/domHelper.js");

var _ParentCreateTweetView = _interopRequireDefault(require("./0.ParentCreateTweetView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreateTweetView = /*#__PURE__*/function (_ParentCreateTweetVie) {
  _inherits(CreateTweetView, _ParentCreateTweetVie);

  var _super = _createSuper(CreateTweetView);

  // _parentEl = document.querySelector(
  //   '.form--createTweet[data-multiple-tweets="false"]'
  // );
  // FORM -------------------------------------------------------
  // INPUT ----------------------------------------------------------
  // so methods to be called automatically
  function CreateTweetView() {
    var _this;

    _classCallCheck(this, CreateTweetView);

    // this refers to current class CreateTweetView
    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.createTweet-main'));

    _defineProperty(_assertThisInitialized(_this), "_multipleTweetForm", document.querySelector('.createTweets'));

    return _this;
  } // setUsedComponentClass() {
  //   this._ScheduleView = new ScheduleTweetFormView();
  // }


  _createClass(CreateTweetView, [{
    key: "_passTweetContentToMultipleTweetForm",
    value: function _passTweetContentToMultipleTweetForm(handle) {
      var cur_tweet_content = this._textAreaEl.value;

      var inputsValue = this._getAllInputsValue();

      console.log(inputsValue);

      var multipleTweetFormFirstItem = this._multipleTweetForm.querySelector('.createTweets-item');

      var multiple_tweet_textarea_input = multipleTweetFormFirstItem.querySelector('.createTweet-textarea'); // audience btn

      var multipleTweetAudienceBtn = multipleTweetFormFirstItem.querySelector('button[data-action="choose-audience"]');
      var multipleTweetAudienceTextEl = multipleTweetAudienceBtn.querySelector('span');
      var multipleTweetAudienceInputEl = multipleTweetAudienceBtn.querySelector('input'); // audience btn

      var multipleTweetAudienceCanReplyBtn = multipleTweetFormFirstItem.querySelector('button[data-action="choose-whocan-reply"]');
      var multipleTweetAudienceCanReplyTextEl = multipleTweetAudienceCanReplyBtn.querySelector('span');
      var multipleTweetAudienceCanReplyInputEl = multipleTweetAudienceCanReplyBtn.querySelector('input');
      var multipleTweetUploadImgInput = multipleTweetFormFirstItem.querySelector('[name="upload_image"]'); /////////////////////////////////////////////////////////////////////////////

      if (inputsValue.upload_imgs.length > 0) {
        console.log('true');
        multipleTweetUploadImgInput.files = inputsValue.upload_imgs;
        handle('show-upload-img-in-multiple-tweet-form');
      } // target audience


      multipleTweetAudienceTextEl.textContent = inputsValue.target_audience;
      multipleTweetAudienceInputEl.textContent = inputsValue.target_audience; // allegieblle to reply

      multipleTweetAudienceCanReplyTextEl.textContent = inputsValue.allegible_to_reply;
      multipleTweetAudienceCanReplyInputEl.textContent = inputsValue.allegible_to_reply;
      if (cur_tweet_content) multiple_tweet_textarea_input.value = cur_tweet_content;
    } // FUNCTION BELONG TO PARENT VIEW

  }, {
    key: "handleAddMultipleTweetsBtn",
    value: function handleAddMultipleTweetsBtn(target, handle) {
      var btn = target.closest("button[data-action='add-another-tweet']");
      if (!btn) return;

      this._passTweetContentToMultipleTweetForm(handle);

      (0, _domHelper.replaceClass)(this._createMutipleTweetsContainer, 'hidden', 'view');
      this.emptyAllInputsValue(true);
    }
  }, {
    key: "addHandlerTweet",
    value: function addHandlerTweet(handle) {
      this.setUsedComponentClass();
      this.handleTweet(handle);
    }
  }]);

  return CreateTweetView;
}(_ParentCreateTweetView.default);

var _default = CreateTweetView;
exports.default = _default;
},{"../../../utils/domHelper.js":"View/utils/domHelper.js","./0.ParentCreateTweetView.js":"View/Components/Tweet/createTweet/0.ParentCreateTweetView.js"}],"View/utils/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.try_catch = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var try_catch = function try_catch(fn) {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fn.apply(void 0, _args);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
};

exports.try_catch = try_catch;
},{}],"View/Components/Tweet/posted_tweet_or_comment/0.posted_parent_view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ParentPostedView = /*#__PURE__*/function () {
  function ParentPostedView() {
    _classCallCheck(this, ParentPostedView);

    _defineProperty(this, "_topParentEl", void 0);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_postOptionsDropdown", document.querySelector('.dropdown[data-type="post-options-dropdown"]'));

    _defineProperty(this, "_retweet_quote_tweet_Dropdown", document.querySelector('.dropdown[data-type="retweet_quote_post"]'));

    _defineProperty(this, "_post_reply_modal", document.querySelector('.tweet-reply'));

    _defineProperty(this, "_tweet_reply_btn", void 0);

    _defineProperty(this, "_retweet_quote_tweet_btn", void 0);
  }

  _createClass(ParentPostedView, [{
    key: "render",
    value: function render(user, tweet) {
      var html = this._generate_markUp(user, tweet);

      this._topParentEl.insertAdjacentHTML('afterbegin', html);
    }
  }, {
    key: "_generate_markUp",
    value: function _generate_markUp(user, tweet) {} // CSS STUFF------------------------------------------

  }, {
    key: "_set_btn_active",
    value: function _set_btn_active(type) {
      if (type === 'write-comment') this._tweet_reply_btn.dataset.active = true;
      if (type === 'retweet') this._retweet_quote_tweet_btn.dataset.active = true;
    } //////////////////////////////////////////////////////////////////////

  }, {
    key: "_setDOMSElsAndDataAttrs",
    value: function _setDOMSElsAndDataAttrs(target) {
      // set post dropdown attribute from tweet detail attribute
      this._parentEl = target.closest('.postedTweet');
      var post_data = JSON.parse(this._parentEl.dataset.post);
      var post_user = JSON.parse(this._parentEl.dataset.postUser);
      this.post_id = post_data._id;
      this.post_user_id = post_user._id;
      this.post_type = post_data.type;
      this.post_user_avatar = post_user.avatar;
      this.post_format = post_data.format;
      this._tweet_reply_btn = this._parentEl.querySelector('button[data-action="write-comment"]');
      this._retweet_quote_tweet_btn = this._parentEl.querySelector('button[data-action="retweet"]');
    }
  }, {
    key: "update_posted_tweet_btn_count_and_active_state",
    value: function update_posted_tweet_btn_count_and_active_state(btn_type, count, active_state) {
      var btn = this._parentEl.querySelector("button[data-action=\"".concat(btn_type, "\"]"));

      btn.dataset.active = active_state;
      var count_value = Number(btn.querySelector('span').textContent);
      btn.querySelector('span').textContent = count_value + count;
    }
  }, {
    key: "_handle_like_unlike_post",
    value: function _handle_like_unlike_post(target, handle) {
      var btn = target.closest('button[data-action="like"]');
      if (!btn) return;
      var active = btn.dataset.active;
      active = active === 'true' ? false : true; // set btn

      btn.dataset.active = active; // update the count

      var count_value = Number(btn.querySelector('span').textContent);
      btn.querySelector('span').textContent = active ? count_value + 1 : count_value - 1;
      active === true ? handle('like-post', {
        post_type: this.post_type,
        post_id: this.post_id
      }) : handle('unlike-post', {
        post_type: this.post_type,
        post_id: this.post_id
      });
    }
  }, {
    key: "_handle_retweet_quote_post",
    value: function _handle_retweet_quote_post(target, handle) {
      var btn = target.closest('button[data-action="retweet"]');
      if (!btn) return;

      this._retweet_quote_tweet_Dropdown.setAttribute('data-post-id', this.post_id);

      this._retweet_quote_tweet_Dropdown.setAttribute('data-post-type', this.post_format);
    }
  }, {
    key: "_handle_reply_to_post",
    value: function _handle_reply_to_post(target, handle) {
      var btn = target.closest('button[data-action="write-comment"]');
      if (!btn) return;
      handle('display-reply-modal', {
        post: {
          post_data: JSON.parse(this._parentEl.dataset.post),
          post_user: JSON.parse(this._parentEl.dataset.postUser)
        },
        cur_user: JSON.parse(document.querySelector('.section-home').dataset.curUser)
      }); // this._post_reply_modal.classList.replace('hide', 'display');
    }
  }, {
    key: "_handle_bookmark_post",
    value: function _handle_bookmark_post(target, handle) {
      var btn = target.closest('button[data-action="bookmark"]');
      if (!btn) return;
      var active = btn.dataset.active;
      active = active === 'true' ? 'false' : 'true';
      btn.dataset.active = active;
      active === 'true' ? handle('bookmark-post', {
        post_type: this.post_type,
        post_id: this.post_id
      }) : handle('unbookmark-post', {
        post_type: this.post_type,
        post_id: this.post_id
      });
    }
  }, {
    key: "_handle_post_options_dropdown",
    value: function _handle_post_options_dropdown(target) {
      var _this = this;

      // 1.set tweet id and tweet user id in dropdown
      // 2.set tweet user name in list item span el
      var btn = target.closest('.tweet-options-btn');
      if (!btn) return;
      console.log(this._parentEl.dataset);
      console.log(this.tweet_id, this.tweet_user_id); // 1.set tweet id and tweet user id in dropdown

      this._postOptionsDropdown.setAttribute('data-post-id', this.post_id);

      this._postOptionsDropdown.setAttribute('data-post-user-id', this.post_user_id);

      this._postOptionsDropdown.setAttribute('data-post-user-name', this.post_user_avatar);

      this._postOptionsDropdown.setAttribute('data-post-type', this.post_type); // 2.set tweet user name in list item span el


      var spanEls = _toConsumableArray(this._postOptionsDropdown.querySelectorAll('span'));

      spanEls.forEach(function (el) {
        el.textContent = el.textContent.replace('name', _this.post_user_avatar);
      });
    }
  }, {
    key: "_handle_click_on_list_item_el",
    value: function _handle_click_on_list_item_el(target, handle) {
      // name or img or avatar
      if (target.closest('.tweet-img') || target.closest('.tweet-user_name') || target.closest('.tweet-user__email')) {
        handle('redirect-to-user', {
          avatar: this.post_user_avatar
        });
      } else {
        if (!target.closest('button')) {
          handle('redirect-to-post', {
            post_type: this.post_type,
            post_id: this.post_id
          });
        }
      }
    }
  }, {
    key: "addHandlePost",
    value: function addHandlePost(handle) {
      var _this2 = this;

      this._topParentEl.addEventListener('click', function (e) {
        var target = e.target; // TASKS
        //-- 1.display user-preview when hover on user detail(name,avatar) => taken cart by user preview (already written func)
        //-- 2.display tweet options dropdown when clicked on dropdown btn(notification bar)
        //-- 3.click on tweet user interaction btns(like,retweet,comment,bookmark)

        _this2._setDOMSElsAndDataAttrs(target); // 1. => already done
        // 2.display tweet options dropdown when clicked on dropdown btn(notification bar)


        _this2._handle_post_options_dropdown(target);

        _this2._handle_reply_to_post(target, handle);

        _this2._handle_like_unlike_post(target, handle);

        _this2._handle_retweet_quote_post(target, handle);

        _this2._handle_bookmark_post(target, handle);

        _this2._handle_click_on_list_item_el(target, handle);
      });
    }
  }]);

  return ParentPostedView;
}();

var _default = ParentPostedView;
exports.default = _default;
},{}],"View/Components/Tweet/posted_tweet_or_comment/posted_tweet_view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _posted_parent_view = _interopRequireDefault(require("./0.posted_parent_view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PostedTweetView = /*#__PURE__*/function (_ParentPostedView) {
  _inherits(PostedTweetView, _ParentPostedView);

  var _super = _createSuper(PostedTweetView);

  function PostedTweetView() {
    var _this;

    _classCallCheck(this, PostedTweetView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.postedTweet-list'));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_tweetOptionsDropdown", document.querySelector('.dropdown[data-type="post-options-dropdown"]'));

    _defineProperty(_assertThisInitialized(_this), "_retweet_quote_tweet_Dropdown", document.querySelector('.dropdown[data-type="retweet_quote_post"]'));

    _defineProperty(_assertThisInitialized(_this), "_tweet_reply_modal", document.querySelector('.tweet-reply'));

    _defineProperty(_assertThisInitialized(_this), "_tweet_reply_btn", void 0);

    _defineProperty(_assertThisInitialized(_this), "_retweet_quote_tweet_btn", void 0);

    _defineProperty(_assertThisInitialized(_this), "tweet_id", void 0);

    _defineProperty(_assertThisInitialized(_this), "tweet_user_id", void 0);

    _defineProperty(_assertThisInitialized(_this), "tweet_user_name", void 0);

    return _this;
  }

  _createClass(PostedTweetView, [{
    key: "render",
    value: function render(user, tweet) {
      var html = this._generate_markUp(user, tweet);

      this._topParentEl.insertAdjacentHTML('afterbegin', html);
    }
  }, {
    key: "_generate_markUp",
    value: function _generate_markUp(tweet) {
      var upload_imgs = tweet.upload_imgs;
      var total_upload_imgs = tweet.upload_imgs.length;
      var upload_imgs_exist = total_upload_imgs > 0 ? true : false;
      var user = tweet.user_details;
      return "\n        <div class=\"tweet preview-item-container postedTweet\" data-user-id=".concat(tweet.user_id, " data-tweet-id=").concat(tweet._id, " data-user-name=").concat(user.name, ">\n          <div class=\"tweet-container\" data-active=\"false\">\n            <img class=\"tweet-img img--md\" src=").concat(user.profilePic, " onerror=\"this.src='/img/users/default.png'\"/>\n            <div class=\"tweet-tag subheading hover-underline hide\">").concat(user.category, "</div>\n            <div class=\"tweet-content\">\n              <div class=\"tweet-user__info preview-item\" data-hover=\"\" data-no-hover-change=\"\" data-name=").concat(user.name, " data-avatar=").concat(user.avatar, " data-description=").concat(user.bio, " data-following_count=").concat(user.following_count, " data-followers_count=").concat(user.followers_count, ">\n                <p class=\"tweet-user__name h-8 hover-underline\" data-preview-window-target-el=\"true\">").concat(user.name, "</p>\n                <p class=\"tweet-user__verified\" data-preview-window-target-el=\"true\"></p>\n                <p class=\"tweet-user__email t--md\" data-preview-window-target-el=\"true\">").concat(user.avatar, "</p>\n                <p class=\"tweet-user__postTime t--md hover-underline\">").concat(tweet.ts_format, "</p>\n              </div>\n              <button class=\"tweet-btn tweet-options-btn btn--icon-dim-primary\" data-dropdown-btn=\"data-dropdown-btn\" data-dropdown-class=\"tweet-options-dropdown\" data-active=\"false\">\n                <div class=\"icon-box\"><i class=\"fas fa-ellipsis\"></i></div>\n              </button>\n              <div class=\"tweet-message mg-lw p--md\">").concat(tweet.text, "</div>\n              <div class=\"tweet-uploadImg__container mg-lw ").concat(upload_imgs_exist ? '' : 'hidden', " \">\n              <div class=\"tweet-uploadImg__content grid--collage\" data-items=").concat(total_upload_imgs, "  >\n  \n              ").concat([0, 1, 2, 3].map(function (count) {
        return "\n                <figure class=\"tweet-uploadImg__fig ".concat(upload_imgs[count] ? '' : 'hidden', "\">\n                    <img class=\"tweet-uploadImg\" src=").concat(upload_imgs[count] ? "/img/tweet/".concat(upload_imgs[count]) : '', "  alt=\"\"/>\n                </figure>\n                    ");
      }).join(''), "\n                </div>\n              </div>\n              <div class=\"tweet-btns\">\n                <button class=\"tweet-btn btn--icon-dim-primary\" data-action=\"write-comment\">\n                  <div class=\"icon-box\"><i class=\"fa fa-commenting-o\"></i></div><span class=\"tweet-btn__value btn--icon-value\"></span>\n                </button>\n                <button class=\"tweet-btn btn--icon-dim-secondary\" data-action=\"retweet\">\n                  <div class=\"icon-box\"><i class=\"fa fa-retweet\"></i></div><span class=\"tweet-btn__value btn--icon-value\"></span>\n                </button>\n                <button class=\"tweet-btn btn--icon-dim-tertiary\" data-action=\"like\">\n                  <div class=\"icon-box\"><i class=\"fa fa-heart-o\"></i></div><span class=\"tweet-btn__value btn--icon-dim-value\"></span>\n                </button>\n                <button class=\"tweet-btn btn--icon-dim-primary\" data-action=\"bookmark\">\n                  <div class=\"icon-box\"><i class=\"fa fa-bookmark-o\"></i></div>\n                </button>\n              </div>\n            </div>\n          </div>\n          <div class=\"line line-dim\">&nbsp;</div>\n        </div>");
    } // tive === 'true' ? 'false' : 'true';
    //     btn.dataset.active = active;
    //     active === 'true'
    //       ? handle('bookmark-tweet', { tweet_id: this.tweet_id })
    //       : handle('unbookmark-tweet', { tweet_id: this.tweet_id });
    //   }
    //   _handle_tweet_options_dropdown(target) {
    //     // 1.set twe
    //   // CSS STUFF------------------------------------------
    //   _set_btn_active(type) {
    //     if (type === 'write-comment') this._tweet_reply_btn.dataset.active = true;
    //     if (type === 'retweet') this._retweet_quote_tweet_btn.dataset.active = true;
    //   }
    //   //////////////////////////////////////////////////////////////////////
    //   _setDOMSElsAndDataAttrs(target) {
    //     this._parentEl = target.closest('.postedTweet');
    //     this.tweet_id = this._parentEl.dataset.tweetId;
    //     this.tweet_user_id = this._parentEl.dataset.userId;
    //     this.tweet_user_name = this._parentEl.dataset.userName;
    //     this._tweet_reply_btn = this._parentEl.querySelector(
    //       'button[data-action="write-comment"]'
    //     );
    //     this._retweet_quote_tweet_btn = this._parentEl.querySelector(
    //       'button[data-action="retweet"]'
    //     );
    //   }
    //   _handle_like_unlike_tweet(target, handle) {
    //     const btn = target.closest('button[data-action="like"]');
    //     if (!btn) return;
    //     let { active } = btn.dataset;
    //     active = active === 'true' ? 'false' : 'true';
    //     btn.dataset.active = active;
    //     active === 'true'
    //       ? handle('like-tweet', { tweet_id: this.tweet_id })
    //       : handle('unlike-tweet', { tweet_id: this.tweet_id });
    //   }
    //   _handle_retweet_quote_tweet(target, handle) {
    //     const btn = target.closest('button[data-action="retweet"]');
    //     if (!btn) return;
    //     console.log('retweet');
    //     this._retweet_quote_tweet_Dropdown.setAttribute(
    //       'data-tweet-id',
    //       this.tweet_id
    //     );
    //   }
    //   _handle_reply_to_tweet(target) {
    //     const btn = target.closest('button[data-action="write-comment"]');
    //     if (!btn) return;
    //     this._tweet_reply_modal.classList.replace('hide', 'display');
    //   }
    //   _handle_bookmark_tweet(target, handle) {
    //     const btn = target.closest('button[data-action="bookmark"]');
    //     if (!btn) return;
    //     let { active } = btn.dataset;
    //     active = acet id and tweet user id in dropdown
    //     // 2.set tweet user name in list item span el
    //     const btn = target.closest('button[data-dropdown-btn]');
    //     if (!btn) return;
    //     console.log(this.tweet_id, this.tweet_user_id);
    //     // 1.set tweet id and tweet user id in dropdown
    //     this._tweetOptionsDropdown.setAttribute('data-tweet-id', this.tweet_id);
    //     this._tweetOptionsDropdown.setAttribute(
    //       'data-tweet-user-id',
    //       this.tweet_user_id
    //     );
    //     // 2.set tweet user name in list item span el
    //     const spanEls = [...this._tweetOptionsDropdown.querySelectorAll('span')];
    //     spanEls.forEach((el) => {
    //       el.textContent = el.textContent.replace('name', this.tweet_user_name);
    //     });
    //   }
    //   addHandlePostedTweet(handle) {
    //   this._topParentEl.addEventListener('click', (e) => {
    //     const target = e.target;
    //     // TASKS
    //     //-- 1.display user-preview when hover on user detail(name,avatar) => taken cart by user preview (already written func)
    //     //-- 2.display tweet options dropdown when clicked on dropdown btn(notification bar)
    //     //-- 3.click on tweet user interaction btns(like,retweet,comment,bookmark)
    //     this._setDOMSElsAndDataAttrs(target);
    //     // 1. => already done
    //     // 2.display tweet options dropdown when clicked on dropdown btn(notification bar)
    //     this._handle_tweet_options_dropdown(target);
    //     this._handle_reply_to_tweet(target);
    //     this._handle_like_unlike_tweet(target, handle);
    //     this._handle_retweet_quote_tweet(target, handle);
    //     this._handle_bookmark_tweet(target, handle);
    //   });
    // }

  }, {
    key: "addHandlerPostedTweet",
    value: function addHandlerPostedTweet(handle) {
      this.addHandlePost(handle);
    }
  }]);

  return PostedTweetView;
}(_posted_parent_view.default);

var _default = PostedTweetView;
exports.default = _default;
},{"./0.posted_parent_view.js":"View/Components/Tweet/posted_tweet_or_comment/0.posted_parent_view.js"}],"View/Components/Tweet/createTweet/3.create_comment_view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentCreateTweetView = _interopRequireDefault(require("./0.ParentCreateTweetView.js"));

var _domHelper = require("../../../utils/domHelper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var create_comment_view = /*#__PURE__*/function (_ParentCreateTweetVie) {
  _inherits(create_comment_view, _ParentCreateTweetVie);

  var _super = _createSuper(create_comment_view);

  function create_comment_view() {
    var _this;

    _classCallCheck(this, create_comment_view);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.tweet-reply'));

    return _this;
  }

  _createClass(create_comment_view, [{
    key: "emptyAllInputsValue",
    value: function emptyAllInputsValue() {
      // parent el
      this._parentEl.setAttribute('data-active', false);

      this._parentEl.setAttribute('data-tweet-schedule', false);

      this._parentEl.setAttribute('data-tweet-empty', true); // schedule timing label


      (0, _domHelper.addClass)(this._scheduleTimingEl, 'hidden');
      this._scheduleTimingSpanValueEl.value = '';
      this._textAreaEl.value = '';

      this._uploadImgsMainContainerEl.classList.add('hidden');

      this._uploadImgElsArr.forEach(function (el) {
        return el.src = '';
      }); // percent complete circle


      this._percentageCircleControllerEl.setAttribute('stroke-dasharray', "0,100"); // input values


      _toConsumableArray(this._parentEl.querySelectorAll('input')).forEach(function (el) {
        return el.value = '';
      });

      this._uploadImgInputEl.value = '';
      this._uploadImgInputEl.files = undefined; // img
    } // Submit data to db(single tweet)

  }, {
    key: "_handleSaveTweet",
    value: function _handleSaveTweet(target, handle) {
      var tweetBtn = target.closest('button[data-action="save-tweet"]');
      if (!tweetBtn) return;

      var comment = this._getAllInputsValue();

      comment.tweet_avatar = this._topParentEl.dataset.userAvatar;
      comment.tweet_id = this._topParentEl.dataset.tweetId;
      comment.tweet_user_id = this._topParentEl.dataset.tweetUserId;
      var form_data = new FormData();
      Object.keys(comment).forEach(function (key) {
        if (!comment[key] || comment[key] === '' || key === 'upload_imgs') return;
        form_data.append(key, comment[key]);
      });

      if (comment.upload_imgs && comment.upload_imgs.length > 0) {
        _toConsumableArray(comment.upload_imgs).forEach(function (file) {
          return form_data.append('upload_imgs', file);
        });
      }

      handle('save-comment', this._topParentEl.dataset.tweetId, form_data); // reset inputs

      this.emptyAllInputsValue();
    }
  }]);

  return create_comment_view;
}(_ParentCreateTweetView.default);

var _default = create_comment_view;
exports.default = _default;
},{"./0.ParentCreateTweetView.js":"View/Components/Tweet/createTweet/0.ParentCreateTweetView.js","../../../utils/domHelper.js":"View/utils/domHelper.js"}],"View/Common/PopupView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domHelper = require("../utils/domHelper.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PopupView = /*#__PURE__*/function () {
  function PopupView() {
    _classCallCheck(this, PopupView);

    _defineProperty(this, "_parentEl", void 0);
  }

  _createClass(PopupView, [{
    key: "show",
    value: // _tweetTopParenContainerEl;
    function show() {
      (0, _domHelper.removeClass)(this._parentEl, 'hidden');
    }
  }, {
    key: "hide",
    value: function hide() {
      (0, _domHelper.addClass)(this._parentEl, 'hidden');
    } // i must think on my own no matter what other say the only thing which matter what i think not what other think
    // delete all written tweet in multi tweet form and return to home page

  }, {
    key: "handleDeleteAllTweetBtn",
    value: function handleDeleteAllTweetBtn(target, handle) {
      var btn = target.closest("button[data-action='delete-tweets']");
      if (!btn) return;
      location.assign('/'); // handle('discard-all-tweets');
    } // return back to multi tweet form

  }, {
    key: "_handleCancelTweetBtn",
    value: function _handleCancelTweetBtn(target) {
      var btn = target.closest("button[data-action='hide-popup']");
      if (!btn) return;
      this.hide();
    }
  }, {
    key: "_handleOverlayEL",
    value: function _handleOverlayEL(target) {
      var el = target.closest('.overlay');
      if (!el) return;
      this.hide();
    }
  }, {
    key: "additionalHandleFuncs",
    value: function additionalHandleFuncs() {} // note
    // -- in case of multiple tweet frontend is self sufficient
    // -- for unsent draft tweet controller is needed

  }, {
    key: "handlePopup",
    value: function handlePopup(handle) {
      var _this = this;

      // checking if event is set already
      if (!this._parentEl || this._parentEl.dataset.clickEvent === 'true') return; // setting addEvent for only one time

      this._parentEl.dataset.clickEvent = 'false'; // handlling begings

      this._parentEl.addEventListener('click', function (e) {
        var target = e.target;

        _this.handleDeleteAllTweetBtn(target, handle);

        _this._handleCancelTweetBtn(target);

        _this._handleOverlayEL(target);

        _this.additionalHandleFuncs(target, handle); //

      });
    }
  }]);

  return PopupView;
}();

var _default = PopupView;
exports.default = _default;
},{"../utils/domHelper.js":"View/utils/domHelper.js"}],"View/Components/Popup/MultipleTweet/DiscardMultiTweetPopupView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PopupView2 = _interopRequireDefault(require("../../../Common/PopupView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// present in multi tweets
var DiscardMultiTweetPopupView = /*#__PURE__*/function (_PopupView) {
  _inherits(DiscardMultiTweetPopupView, _PopupView);

  var _super = _createSuper(DiscardMultiTweetPopupView);

  function DiscardMultiTweetPopupView() {
    var _this;

    _classCallCheck(this, DiscardMultiTweetPopupView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.popup[data-tweet-type="multiple-tweets"][data-action="discard-tweets"]'));

    _this.handlePopup();

    return _this;
  }

  return _createClass(DiscardMultiTweetPopupView);
}(_PopupView2.default);

var _default = DiscardMultiTweetPopupView;
exports.default = _default;
},{"../../../Common/PopupView.js":"View/Common/PopupView.js"}],"View/Components/Popup/MultipleTweet/SaveMultiTweetPopupView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PopupView2 = _interopRequireDefault(require("../../../Common/PopupView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// present in multi tweets
var SaveMultiTweetPopupView = /*#__PURE__*/function (_PopupView) {
  _inherits(SaveMultiTweetPopupView, _PopupView);

  var _super = _createSuper(SaveMultiTweetPopupView);

  function SaveMultiTweetPopupView() {
    var _this;

    _classCallCheck(this, SaveMultiTweetPopupView);

    _this = _super.call(this); // this.handlePopup();

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.popup[data-tweet-type="multiple-tweets"][data-action="save-tweet"]'));

    return _this;
  }

  _createClass(SaveMultiTweetPopupView, [{
    key: "additionalHandleFuncs",
    value: function additionalHandleFuncs(target, handle) {
      // save Tweet btn
      var btn = target.closest('button[data-action="save-tweet"]');
      if (!btn) return;
      handle('save-tweet-as-draft');
    }
  }, {
    key: "addHandlerPopup",
    value: function addHandlerPopup(handle) {
      this.handlePopup(handle);
    }
  }]);

  return SaveMultiTweetPopupView;
}(_PopupView2.default);

var _default = SaveMultiTweetPopupView;
exports.default = _default;
},{"../../../Common/PopupView.js":"View/Common/PopupView.js"}],"View/Components/Modal/post_reply/0.parent_reply_modal_view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _create_comment_view2 = _interopRequireDefault(require("../../Tweet/createTweet/3.create_comment_view.js"));

var _DiscardMultiTweetPopupView = _interopRequireDefault(require("../../Popup/MultipleTweet/DiscardMultiTweetPopupView.js"));

var _SaveMultiTweetPopupView = _interopRequireDefault(require("../../Popup/MultipleTweet/SaveMultiTweetPopupView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// comment model on the home page to just add a comment without going to comments
// to see more comments and reply to other comment we use commentController and redirected to new page
var PostReplyModal = /*#__PURE__*/function (_create_comment_view) {
  _inherits(PostReplyModal, _create_comment_view);

  var _super = _createSuper(PostReplyModal);

  function PostReplyModal() {
    var _this;

    _classCallCheck(this, PostReplyModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.tweet-reply'));

    _defineProperty(_assertThisInitialized(_this), "_overlay", _this._topParentEl.querySelector('.overlay'));

    _defineProperty(_assertThisInitialized(_this), "_post_reply_content_el", _this._topParentEl.querySelector('.tweet-reply-content'));

    return _this;
  }

  _createClass(PostReplyModal, [{
    key: "hide",
    value: function hide() {
      this._topParentEl.classList.replace('view', 'hide');
    }
  }, {
    key: "show",
    value: function show() {
      this._topParentEl.classList.replace('hide', 'view');
    } //   post => tweet or comment

  }, {
    key: "render",
    value: function render(post, cur_user_data) {
      var tweet_user = post.post_user;
      var tweet = post.post_data;
      this._topParentEl.dataset.tweetId = tweet._id;
      this._topParentEl.dataset.userAvatar = tweet_user.avatar;
      this._topParentEl.dataset.tweetUserId = tweet_user._id;
      this._post_reply_content_el.innerHTML = '';
      var html = "   \n    <img class=\"tweet-img img--md\" src=\"/img/users/".concat(tweet_user.profilePic, "\" />\n    <div class=\"tweet-content tweet-reply-detail\">\n        <div class=\"tweet-user__info preview-item\" data-no-hover-change=\"\">\n          <p class=\"tweet-user__name h-8 hover-underline\">").concat(tweet_user.name, " </p>\n          <p class=\"tweet-user__verified\"></p>\n          <p class=\"tweet-user__email t--md\">").concat(tweet_user.avatar, "</p>\n          <p class=\"tweet-user__postTime t--md hover-underline\">").concat(tweet.ts_format, "</p>\n    </div>\n    <p class=\"p--md mg-sm\">").concat(tweet.text, "</p>\n    <div class=\"tweet-message mg-lw t--md\">Replying to\n       <span class=\"blue\"> ").concat(tweet_user.avatar, " </span>\n    </div>\n    </div>\n    ");
      this._topParentEl.querySelector('.createTweet-user__img').src = "/img/users/".concat(cur_user_data.profilePic);

      this._post_reply_content_el.insertAdjacentHTML('afterbegin', html);

      this.show();
    }
  }, {
    key: "setSomeOtherComponentClass",
    value: function setSomeOtherComponentClass() {
      this._DiscardTweetPopupView = new _DiscardMultiTweetPopupView.default();
      this._SaveMultiTweetPopupView = new _SaveMultiTweetPopupView.default();
    }
  }, {
    key: "_hideParentWhenOverlayIsClicked",
    value: function _hideParentWhenOverlayIsClicked() {
      var _this2 = this;

      this._overlay.addEventListener('click', function () {
        return _this2._DiscardTweetPopupView.show();

        _this2._hide(); // this.emptyAllInputsValue();

      });
    }
  }, {
    key: "_handleUnsentTweetBtn",
    value: function _handleUnsentTweetBtn(target) {
      var btn = target.closest('button[data-action="show-unsent-tweets"]'); // console.log(btn);

      if (!btn) return;
      if (this._topParentEl.querySelector('textarea').value === '') return; // if tweet in use === 1 then if clicked on unsent tweet allow to save tweet

      return this._SaveMultiTweetPopupView.show();
      var unsentTweetModalEl = document.querySelector('.modal[data-modal="unsent-tweets"]');
      replaceClass(unsentTweetModalEl, 'hidden', 'display'); // const View = new UnsentTweetModalView();
      // View.show();
      // View.handleModal();
    }
  }, {
    key: "handleTweetTopParentEl",
    value: function handleTweetTopParentEl(target) {
      this._handleUnsentTweetBtn(target);
    }
  }, {
    key: "addHandlerPostReply",
    value: function addHandlerPostReply(handle) {
      this._hideParentWhenOverlayIsClicked();

      this.setUsedComponentClass();
      this.handleTweet(handle);
    }
  }]);

  return PostReplyModal;
}(_create_comment_view2.default);

var _default = PostReplyModal;
exports.default = _default;
},{"../../Tweet/createTweet/3.create_comment_view.js":"View/Components/Tweet/createTweet/3.create_comment_view.js","../../Popup/MultipleTweet/DiscardMultiTweetPopupView.js":"View/Components/Popup/MultipleTweet/DiscardMultiTweetPopupView.js","../../Popup/MultipleTweet/SaveMultiTweetPopupView.js":"View/Components/Popup/MultipleTweet/SaveMultiTweetPopupView.js"}],"View/Components/Modal/post_reply/1.tweet_reply_modal_view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parent_reply_modal_view = _interopRequireDefault(require("./0.parent_reply_modal_view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TweetReplyModalView = /*#__PURE__*/function (_ParentReplyModalView) {
  _inherits(TweetReplyModalView, _ParentReplyModalView);

  var _super = _createSuper(TweetReplyModalView);

  function TweetReplyModalView() {
    var _this;

    _classCallCheck(this, TweetReplyModalView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.section-home .tweet-reply'));

    return _this;
  }

  return _createClass(TweetReplyModalView);
}(_parent_reply_modal_view.default);

var _default = TweetReplyModalView;
exports.default = _default;
},{"./0.parent_reply_modal_view.js":"View/Components/Modal/post_reply/0.parent_reply_modal_view.js"}],"Controller/Components/Comment/comment_controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment_controller = void 0;

var _api = require("../../api/api.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var comment_controller_class = /*#__PURE__*/function () {
  function comment_controller_class() {
    _classCallCheck(this, comment_controller_class);
  }

  _createClass(comment_controller_class, [{
    key: "save_comment",
    value: function () {
      var _save_comment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(tweet_id, data) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", (0, _api.post)("tweets/".concat(tweet_id, "/comments"), data));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function save_comment(_x, _x2) {
        return _save_comment.apply(this, arguments);
      }

      return save_comment;
    }()
  }, {
    key: "save_reply",
    value: function () {
      var _save_reply = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tweet_id, comment_id, data) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", (0, _api.post)("tweets/".concat(tweet_id, "/comments/").concat(comment_id), data));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function save_reply(_x3, _x4, _x5) {
        return _save_reply.apply(this, arguments);
      }

      return save_reply;
    }()
  }, {
    key: "delete_comment",
    value: function () {
      var _delete_comment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(tweet_id, comment_id) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", (0, _api.del)("tweets/".concat(tweet_id, "/comments/\n    ").concat(comment_id)));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function delete_comment(_x6, _x7) {
        return _delete_comment.apply(this, arguments);
      }

      return delete_comment;
    }()
  }]);

  return comment_controller_class;
}();

var comment_controller = new comment_controller_class();
exports.comment_controller = comment_controller;
},{"../../api/api.js":"Controller/api/api.js"}],"Controller/Components/Modal/post_reply/tweet_reply_modal_controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display_tweet_reply_modal = void 0;

var _api = require("../../../api/api.js");

var _tweet_reply_modal_view = _interopRequireDefault(require("../../../../View/Components/Modal/post_reply/1.tweet_reply_modal_view.js"));

var _comment_controller = require("../../Comment/comment_controller.js");

var _postedTweetController = require("../../Tweet/postedTweetController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tweet_reply_el = document.querySelector('.tweet-reply');
var View;

var control_tweet_reply = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(action, tweet_id, data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(action === 'save-comment')) {
              _context.next = 6;
              break;
            }

            res = _comment_controller.comment_controller.save_comment(tweet_id, data);

            if (res) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            hide_tweet_reply_modal();
            (0, _postedTweetController.update_posted_tweet_btn_count_and_active_state)('write-comment', 1, false);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function control_tweet_reply(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var hide_tweet_reply_modal = function hide_tweet_reply_modal() {
  return View.hide();
};

var display_tweet_reply_modal = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tweet, cur_user) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            View.render(tweet, cur_user);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function display_tweet_reply_modal(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.display_tweet_reply_modal = display_tweet_reply_modal;

if (tweet_reply_el) {
  View = new _tweet_reply_modal_view.default();
  View.addHandlerPostReply(control_tweet_reply);
}
},{"../../../api/api.js":"Controller/api/api.js","../../../../View/Components/Modal/post_reply/1.tweet_reply_modal_view.js":"View/Components/Modal/post_reply/1.tweet_reply_modal_view.js","../../Comment/comment_controller.js":"Controller/Components/Comment/comment_controller.js","../../Tweet/postedTweetController.js":"Controller/Components/Tweet/postedTweetController.js"}],"Controller/Components/Tweet/postedTweetController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_posted_tweet_btn_count_and_active_state = exports.controlRenderPostedTweet = void 0;

var _posted_tweet_view = _interopRequireDefault(require("../../../View/Components/Tweet/posted_tweet_or_comment/posted_tweet_view.js"));

var _tweet_reply_modal_controller = require("../Modal/post_reply/tweet_reply_modal_controller.js");

var _api = require("../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var postedTweetListEl = document.querySelector('.postedTweet');

var controlRenderPostedTweet = function controlRenderPostedTweet(user, tweet) {
  return View.render(user, tweet);
};

exports.controlRenderPostedTweet = controlRenderPostedTweet;

var update_posted_tweet_btn_count_and_active_state = function update_posted_tweet_btn_count_and_active_state(btn_type, count, active_state) {
  return View.update_posted_tweet_btn_count_and_active_state(btn_type, count, active_state);
};

exports.update_posted_tweet_btn_count_and_active_state = update_posted_tweet_btn_count_and_active_state;

var like_unlike_tweet = function like_unlike_tweet(action, data) {
  if (action === 'like-post') (0, _api.post)("users/like-tweets/add/tweet/".concat(data.post_id));
  if (action === 'unlike-post') (0, _api.del)("users/like-tweets/remove/tweet/".concat(data.post_id));
};

var bookmark_unbookmark_tweet = function bookmark_unbookmark_tweet(action, data) {
  if (action === 'bookmark-post') (0, _api.post)("users/bookmark-tweets/add/tweet/".concat(data.post_id));
  if (action === 'unbookmark-post') (0, _api.del)("users/bookmark-tweets/remove/tweet/".concat(data.post_id));
};

var retweet_quote_tweet = function retweet_quote_tweet(action, data) {
  var tweet_id = data.tweet_id;
  if (action === 'retweet') (0, _api.post)("tweets/like/".concat(tweet_id));
  if (action === 'delete-retweet') (0, _api.del)("tweets/".concat(tweet_id));
  if (action === 'quote-tweet') (0, _api.post)("tweets/quote-tweet/".concat(tweet_id));
};

var reply_to_tweet = function reply_to_tweet(action, data) {// if(action==="tweet-reply")
};

var redirect_to_user = function redirect_to_user(user_avatar) {
  return location.assign("/users/".concat(user_avatar.slice(1)));
};

var redirect_to_tweet_comments = function redirect_to_tweet_comments(tweet_id) {
  return location.assign("/tweets/".concat(tweet_id, "}"));
};

var controlPostedTweets = function controlPostedTweets(action, data) {
  console.log(action, data);
  like_unlike_tweet(action, data);
  bookmark_unbookmark_tweet(action, data);
  if (action === 'redirect-to-user') redirect_to_user(data.avatar);
  if (action === 'redirect-to-post') redirect_to_tweet_comments(data.post_id); // tweet-id

  if (action === 'display-reply-modal') (0, _tweet_reply_modal_controller.display_tweet_reply_modal)(data.post, data.cur_user);
};

if (postedTweetListEl) {
  View = new _posted_tweet_view.default();
  View.addHandlerPostedTweet(controlPostedTweets);
}
},{"../../../View/Components/Tweet/posted_tweet_or_comment/posted_tweet_view.js":"View/Components/Tweet/posted_tweet_or_comment/posted_tweet_view.js","../Modal/post_reply/tweet_reply_modal_controller.js":"Controller/Components/Modal/post_reply/tweet_reply_modal_controller.js","../../api/api.js":"Controller/api/api.js"}],"View/Components/Tweet/createTweet/2.CreateMultipleTweetsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentCreateTweetView = _interopRequireDefault(require("./0.ParentCreateTweetView.js"));

var _AlertView = _interopRequireDefault(require("../../Alert/AlertView.js"));

var _domHelper = require("../../../utils/domHelper.js");

var _DiscardMultiTweetPopupView = _interopRequireDefault(require("../../Popup/MultipleTweet/DiscardMultiTweetPopupView.js"));

var _SaveMultiTweetPopupView = _interopRequireDefault(require("../../Popup/MultipleTweet/SaveMultiTweetPopupView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreateMultipleTweetsView = /*#__PURE__*/function (_ParentCreateTweetVie) {
  _inherits(CreateMultipleTweetsView, _ParentCreateTweetVie);

  var _super = _createSuper(CreateMultipleTweetsView);

  // CLASS __________________________________
  function CreateMultipleTweetsView() {
    var _this;

    _classCallCheck(this, CreateMultipleTweetsView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.createTweets'));

    _defineProperty(_assertThisInitialized(_this), "_topParentContainerEl", _this._topParentEl.querySelector('.createTweets-container'));

    _defineProperty(_assertThisInitialized(_this), "_tweetListEl", _this._topParentEl.querySelector('.createTweets-list'));

    _defineProperty(_assertThisInitialized(_this), "_overlay", _this._topParentEl.querySelector('.overlay'));

    _defineProperty(_assertThisInitialized(_this), "_saveAllTweetsBtn", void 0);

    _defineProperty(_assertThisInitialized(_this), "_DiscardTweetPopupView", void 0);

    _defineProperty(_assertThisInitialized(_this), "_SaveMultiTweetPopupView", void 0);

    _this._hideParentWhenOverlayIsClicked();

    return _this;
  }

  _createClass(CreateMultipleTweetsView, [{
    key: "setSomeOtherComponentClass",
    value: function setSomeOtherComponentClass() {
      this._DiscardTweetPopupView = new _DiscardMultiTweetPopupView.default();
      this._SaveMultiTweetPopupView = new _SaveMultiTweetPopupView.default();
    }
  }, {
    key: "setMoreDOMEls",
    value: function setMoreDOMEls() {
      this._saveAllTweetsBtn = this._parentEl.querySelector('button[data-action="save-all-tweets"]');
    }
  }, {
    key: "_hide",
    value: function _hide() {
      this._topParentEl.classList.replace('view', 'hidden');
    }
  }, {
    key: "_show",
    value: function _show() {
      this._topParentEl.classList.replace('hidden', 'view');
    }
  }, {
    key: "_getAllTweetItems",
    value: function _getAllTweetItems() {
      return _toConsumableArray(this._topParentEl.querySelectorAll('.createTweets-item'));
    }
  }, {
    key: "_getTotalCountOfTweetItemInUse",
    value: function _getTotalCountOfTweetItemInUse() {
      return this._getAllTweetItems().filter(function (el) {
        return el.dataset.tweetInUse === 'true';
      }).length;
    }
  }, {
    key: "_getCurrentActiveTweetItem",
    value: function _getCurrentActiveTweetItem() {
      return this._topParentEl.querySelector('.createTweets-item[data-active="true"]');
    }
  }, {
    key: "_setDatasetObjInEl",
    value: function _setDatasetObjInEl(tweet_item, dataset_obj) {
      Object.keys(dataset_obj).forEach(function (key) {
        tweet_item.dataset[key] = dataset_obj[key];
      });
    }
  }, {
    key: "_setTweetItemActive",
    value: function _setTweetItemActive(cur_tweet_item) {
      var dataset = {
        active: true,
        tweetMini: false,
        tweetInUse: true // hideTweetTrackLine: false,

      };

      this._setDOMEls(cur_tweet_item);

      this._setDatasetObjInEl(cur_tweet_item, dataset);

      this._getAllTweetItems().forEach(function (el) {
        if (el !== cur_tweet_item) {
          el.dataset.active = false;
          el.dataset.tweetMini = true;
          el.dataset.hideTweetTrackLine = false;
        }
      }); //////////////////////////////////////////////////////////////////////////////////
      // hide last active tweet item track line


      var lastTweetItemInUseEl = _toConsumableArray(this._topParentContainerEl.querySelectorAll('.createTweets-item[data-tweet-in-use="true"]')).slice(-1)[0];

      cur_tweet_item.dataset.hideTweetTrackLine = lastTweetItemInUseEl === cur_tweet_item;
      cur_tweet_item.classList.remove('hidden');
    }
  }, {
    key: "_handleSelectTweetItemEl",
    value: function _handleSelectTweetItemEl(target) {
      var optionalItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (target.closest('button[data-action="add-another-tweet"]')) return;
      var tweet_item = optionalItem ? optionalItem : target.closest('.createTweets-item');
      if (!tweet_item && !optionalItem) return;

      this._setTweetItemActive(tweet_item);
    }
  }, {
    key: "_switchBwTweetBtnAndTweetAllBtn",
    value: function _switchBwTweetBtnAndTweetAllBtn() {
      this._tweetListEl.dataset.multipleTweets = this._getTotalCountOfTweetItemInUse() > 1 ? 'true' : 'false';
      this._tweetListEl.dataset.multipleTweets ? this._saveAllTweetsBtn.removeAttribute('disabled') : this._saveAllTweetsBtn.setAttribute('disabled');
    }
  }, {
    key: "_hideParentWhenOverlayIsClicked",
    value: function _hideParentWhenOverlayIsClicked() {
      var _this2 = this;

      this._overlay.addEventListener('click', function () {
        return _this2._DiscardTweetPopupView.show();

        _this2._hide(); // this.emptyAllInputsValue();

      });
    }
  }, {
    key: "_handleTweetItemRemoveBtn",
    value: function _handleTweetItemRemoveBtn(target) {
      var removeTweetItemBtn = target.closest('button[data-action="remove-tweet"]');
      if (!removeTweetItemBtn) return; // remove tweet

      var removeTweetItem = removeTweetItemBtn.closest('.createTweets-item');
      removeTweetItem.classList.add('hidden');
      var dataset = {
        active: false,
        tweetSchedule: false,
        tweetEmpty: true,
        tweetInUse: false,
        mini: true
      };

      this._setDatasetObjInEl(removeTweetItem, dataset); // find the tweet before the remove tweet and make it active


      var tweetNum = removeTweetItem.dataset.tweetNum;

      var findTweetItem = this._getAllTweetItems().find(function (el) {
        return Number(el.dataset.tweetNum) === Number(tweetNum) - 1;
      });

      if (!findTweetItem) findTweetItem = this._getAllTweetItems().find(function (el) {
        return Number(el.dataset.tweetNum) === Number(tweetNum) + 1;
      });
      if (!findTweetItem) this._hide();

      this._setTweetItemActive(findTweetItem); // if tweet is one left then set list multiple-tweets attribute to false


      if (this._getTotalCountOfTweetItemInUse() === 1) {
        this._tweetListEl.dataset.multipleTweets = 'false';
        findTweetItem.querySelector('button[data-action="choose-audience"]').style.display = 'block';
      }
    } ////////////////////////////////////////////////////
    // -  TWEET ITEM ADDITIONAL FUNCTION
    ////////////////////////////////////////////////////

  }, {
    key: "handleAddMultipleTweetsBtn",
    value: function handleAddMultipleTweetsBtn(target) {
      var btn = target.closest("button[data-action='add-another-tweet']");
      if (!btn) return; // we can do this by displaying the left tweet
      // lets get the last item

      var nextTweetItem = this._getAllTweetItems().find(function (el) {
        return el.dataset.tweetInUse === 'false';
      });

      if (!nextTweetItem) return new _AlertView.default().render('Max Tweet Limit 5');

      this._handleSelectTweetItemEl(nextTweetItem);
    }
  }, {
    key: "addAdditionalCodeToShowUploadImgFunc",
    value: function addAdditionalCodeToShowUploadImgFunc() {
      this._makeHeaderStickyWhenHeightOverflowContainer();
    }
  }, {
    key: "addAdditionalCodeToHandleChooseWhoCanReplyBtn",
    value: function addAdditionalCodeToHandleChooseWhoCanReplyBtn() {
      // make choose option value in all btns same when choosen by any reply btn
      // if reply btn is disabled then all should be also
      var btn_value = this._chooseWhoCanReplyBtn.querySelector('.preview-parent-text').textContent;

      var isBtnDisabled = this._chooseWhoCanReplyBtn.disabled;

      var chooseWhoCanReplyBtnsValueArr = _toConsumableArray(this._topParentEl.querySelectorAll('button[data-action="choose-whocan-reply"] .preview-parent-text '));

      chooseWhoCanReplyBtnsValueArr.forEach(function (el) {
        el.textContent = btn_value;
        el.closest('button').querySelector('input').value = btn_value;
        if (isBtnDisabled) el.closest('button[data-action="choose-whocan-reply"]').disabled = true;
      });
    }
  }, {
    key: "addAdditionalCodeToHandleChooseAudienceBtn",
    value: function addAdditionalCodeToHandleChooseAudienceBtn() {
      var btn_value = this._chooseAudienceBtn.querySelector('.preview-parent-text').textContent;

      var choooseAudienceAllBtns = _toConsumableArray(this._topParentEl.querySelectorAll('button[data-action="choose-audience"] input'));

      choooseAudienceAllBtns.forEach(function (el) {
        return el.value = btn_value;
      });

      var chooseWhoCanReplyBtnsValue = _toConsumableArray(this._topParentEl.querySelectorAll('button[data-action="choose-whocan-reply"] .preview-parent-text'));

      if (btn_value === 'everyone') {
        chooseWhoCanReplyBtnsValue.forEach(function (el) {
          el.closest('button').querySelector('input').value = btn_value;
          el.textContent = 'Everyone can reply';
          el.closest('button[data-action="choose-whocan-reply"] ').disabled = false;
        });
      } else {
        chooseWhoCanReplyBtnsValue.forEach(function (el) {
          el.closest('button').querySelector('input').value = btn_value;
          el.textContent = 'Only your Twitter Circle can reply';
          el.closest('button[data-action="choose-whocan-reply"] ').disabled = true;
        });
      }
    } // scrollHeight

  }, {
    key: "_makeHeaderStickyWhenHeightOverflowContainer",
    value: function _makeHeaderStickyWhenHeightOverflowContainer() {
      var setTrue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // scrollHeight increase when content of container is overflowing
      if (this._topParentContainerEl.scrollHeight > this._topParentContainerEl.clientHeight || setTrue) this._topParentContainerEl.dataset.stickyHeader = 'true';
    }
  }, {
    key: "_handleUnsentTweetBtn",
    value: function _handleUnsentTweetBtn(target) {
      var btn = target.closest('button[data-action="show-unsent-tweets"]'); // console.log(btn);

      if (!btn) return; // if tweet in use === 1 then if clicked on unsent tweet allow to save tweet

      if (this._getTotalCountOfTweetItemInUse() === 1 && this._textAreaEl.value && this._textAreaEl.value !== '') {
        return this._SaveMultiTweetPopupView.show();
      }

      var unsentTweetModalEl = document.querySelector('.modal[data-modal="unsent-tweets"]');
      (0, _domHelper.replaceClass)(unsentTweetModalEl, 'hidden', 'display'); // const View = new UnsentTweetModalView();
      // View.show();
      // View.handleModal();
    } // FUNCTION WORKING ON TWEET ITEM

  }, {
    key: "additionalHandleFuncs",
    value: function additionalHandleFuncs(target, handle) {
      // CSS ------------------------------------------------------------
      this._makeHeaderStickyWhenHeightOverflowContainer(); // active item on clicking (unhide the hidden item els)


      this._handleSelectTweetItemEl(target); // change tweet btn to tweet all when no of tweets is more than one on active tweet item


      this._switchBwTweetBtnAndTweetAllBtn();

      this._handleTweetItemRemoveBtn(target); // HANDLE -----------------------------------------------


      this._handleSaveMultipleTweets(target, handle);
    } // FUNCTION ON TWEET TOP PARENT E

  }, {
    key: "handleTweetTopParentEl",
    value: function handleTweetTopParentEl(target) {
      this._handleUnsentTweetBtn(target);
    } // add one more empty tweet in tweet  list

  }, {
    key: "addHandlerMultipleTweets",
    value: function addHandlerMultipleTweets(handle) {
      this.setUsedComponentClass();
      this.handleTweet(handle);

      this._makeHeaderStickyWhenHeightOverflowContainer();
    } // ------------------------------------------------------
    // To set Changes in multiple tweets from controller

  }, {
    key: "_setItemActiveAndItsDOMElsForAccessAndReturnEl",
    value: function _setItemActiveAndItsDOMElsForAccessAndReturnEl(firstTweet) {
      var activeTweetItemEl = firstTweet ? this._topParentEl.querySelector('.createTweets-item') : this._topParentEl.querySelector('.createTweets-item[data-active="true"]'); // to access it dom elements of createTweet item

      this._setDOMEls(activeTweetItemEl); // to show tweet item as active


      this._handleSelectTweetItemEl(activeTweetItemEl);

      return activeTweetItemEl;
    } // if first tweet item true means set image in first tweet item

  }, {
    key: "setUploadImgInMultipleTweetImgEls",
    value: function setUploadImgInMultipleTweetImgEls(firstTweet, imgArr) {
      this._setItemActiveAndItsDOMElsForAccessAndReturnEl(firstTweet); // if arr is img not files then it means it is from unsent Tweets ,if  arr is of img files then arr is from single create tweet


      imgArr ? this._setUploadImgsAndshow('img', imgArr) : this._setUploadImgsAndshow('files');

      if (firstTweet) {
        // now set the second tweet if the first tweet  upload img is set by single tweet
        this._handleSelectTweetItemEl(this._topParentEl.querySelector('.createTweets-item[data-tweet-new="true"]'));

        this._makeHeaderStickyWhenHeightOverflowContainer(true);
      }
    }
  }, {
    key: "setUnsentTweetInMultiplTweetForm",
    value: function setUnsentTweetInMultiplTweetForm(tweetObj) {
      var activeTweetEl = this._setItemActiveAndItsDOMElsForAccessAndReturnEl(true); // select first item to to access the textarea el thorught setDOMELS


      var type = tweetObj.type,
          text = tweetObj.text,
          id = tweetObj.id,
          schedule_date = tweetObj.schedule_date,
          imgArr = tweetObj.imgArr;
      activeTweetEl.dataset.tweetId = id; // setting the tweet

      this._textAreaEl.value = text ? text : '';
      this._textAreaEl.textContent = text ? text : '';
      imgArr !== '' ? this.setUploadImgInMultipleTweetImgEls(true, imgArr) : ''; // if (type === 'scheduled') {
      //   activeTweetEl.dataset.tweetSchedule = true;
      //   this._scheduleTimingSpanValueEl.textContent = schedule_date;
      // }
    } // get only one left tweet item input value to save as draft tweet

  }, {
    key: "getLastLeftTweetData",
    value: function getLastLeftTweetData() {
      // return current click tweet item el
      var formdata = this.getTweetDataAsFormData();
      formdata.set('tweet_type', 'draft');
      return formdata;
    } // SUBMIT

  }, {
    key: "_handleSaveMultipleTweets",
    value: function _handleSaveMultipleTweets(target, handle) {
      var _this3 = this;

      if (!target.closest('button[data-action="save-all-tweets"]')) return;
      var tweets_data_obj = {}; // 1.get all tweet in use

      var tweetInUse = _toConsumableArray(this._topParentEl.querySelectorAll('.createTweets-item[data-tweet-in-use="true"]')); // looping through to set related tweet properties


      tweetInUse.forEach(function (tweet, i) {
        var tweet_data = _this3._getAllInputsValue(tweet); // check for draft tweet 


        if (tweet.dataset.tweetId) tweet_data.tweet_id = tweet.dataset.tweetId;
        console.log('dat', tweet_data);
        if (!tweet_data.text && _toConsumableArray(tweet_data.upload_imgs).length === 0) return; // filter empty tweet
        // slicing which user after left after editing workaround

        var no_of_upload_img = tweet.querySelector('.grid--collage').dataset.items;

        if (tweet_data.upload_imgs) {
          tweet_data.upload_imgs = _toConsumableArray(tweet_data.upload_imgs).slice(0, Number(no_of_upload_img));
        }

        tweet_data.tweet_type = tweet_data.schedule_post_time ? 'schedule' : 'post'; // to let server know this tweet is from multiple tweets

        tweet_data.multiple_tweets = true; // creating formdata

        var tweet_form_data = new FormData();
        Object.keys(tweet_data).forEach(function (key) {
          if (tweet_data[key] === null || tweet_data[key] === '') return;
          if (key === 'upload_imgs') return;
          tweet_form_data.append(key, tweet_data[key]);
        }); // taking care of upload_imgs

        if (tweet_data.upload_imgs) tweet_data.upload_imgs.forEach(function (img) {
          return tweet_form_data.append('upload_imgs', img);
        });
        tweets_data_obj[i] = tweet_form_data;
      });
      console.log(tweets_data_obj);
      handle('save-all-tweets', tweets_data_obj);
    }
  }]);

  return CreateMultipleTweetsView;
}(_ParentCreateTweetView.default);

var _default = CreateMultipleTweetsView;
exports.default = _default;
},{"./0.ParentCreateTweetView.js":"View/Components/Tweet/createTweet/0.ParentCreateTweetView.js","../../Alert/AlertView.js":"View/Components/Alert/AlertView.js","../../../utils/domHelper.js":"View/utils/domHelper.js","../../Popup/MultipleTweet/DiscardMultiTweetPopupView.js":"View/Components/Popup/MultipleTweet/DiscardMultiTweetPopupView.js","../../Popup/MultipleTweet/SaveMultiTweetPopupView.js":"View/Components/Popup/MultipleTweet/SaveMultiTweetPopupView.js"}],"Controller/Components/Tweet/createMutltipleTweetsController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCreateMultipleTweetsView = exports.controlSetUploadImgInMultipleTweetImgEls = exports.controlSetUnsentTweetInMultiplTweetForm = exports.controlSaveTweetAsDraft = void 0;

var _CreateMultipleTweetsView = _interopRequireDefault(require("../../../View/Components/Tweet/createTweet/2.CreateMultipleTweetsView.js"));

var _api = require("../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createMultipleTweetsEl = document.querySelector('.createTweets');
var View;

var controlSetUploadImgInMultipleTweetImgEls = function controlSetUploadImgInMultipleTweetImgEls() {
  View.setUploadImgInMultipleTweetImgEls(true);
};

exports.controlSetUploadImgInMultipleTweetImgEls = controlSetUploadImgInMultipleTweetImgEls;

var controlSetUnsentTweetInMultiplTweetForm = function controlSetUnsentTweetInMultiplTweetForm(tweetObj) {
  View._show();

  View.setUnsentTweetInMultiplTweetForm(tweetObj);
};

exports.controlSetUnsentTweetInMultiplTweetForm = controlSetUnsentTweetInMultiplTweetForm;

var getCreateMultipleTweetsView = function getCreateMultipleTweetsView() {
  return View;
};

exports.getCreateMultipleTweetsView = getCreateMultipleTweetsView;

var controlSaveSingleTweet = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _api.post)('tweets', data);

          case 2:
            res = _context.sent;
            console.log(res);

            if (res) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            location.assign('/');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlSaveSingleTweet(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlSaveMultipleTweets = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var tweets_save, _i, _Object$keys, key, tweet_formdata, save_tweet;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            tweets_save = [];

            for (_i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
              key = _Object$keys[_i];
              tweet_formdata = data[key];
              save_tweet = (0, _api.post)('tweets', tweet_formdata);
              tweets_save.push(save_tweet);
            }

            _context2.next = 5;
            return Promise.all(tweets_save);

          case 5:
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.error('multiple tweets not saved');
            return _context2.abrupt("return");

          case 11:
            location.reload();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function controlSaveMultipleTweets(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var controlSaveTweetAsDraft = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var tweet_data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // return formData
            tweet_data = View.getLastLeftTweetData();
            _context3.next = 3;
            return (0, _api.post)('tweets', tweet_data);

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function controlSaveTweetAsDraft() {
    return _ref3.apply(this, arguments);
  };
}();

exports.controlSaveTweetAsDraft = controlSaveTweetAsDraft;

var controlMultipleTweets = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(action, data) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (action === 'save-tweet') controlSaveSingleTweet(data);
            if (action === 'save-all-tweets') controlSaveMultipleTweets(data);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function controlMultipleTweets(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

if (createMultipleTweetsEl) {
  View = new _CreateMultipleTweetsView.default();
  View.addHandlerMultipleTweets(controlMultipleTweets);
}
},{"../../../View/Components/Tweet/createTweet/2.CreateMultipleTweetsView.js":"View/Components/Tweet/createTweet/2.CreateMultipleTweetsView.js","../../api/api.js":"Controller/api/api.js"}],"Controller/Components/Tweet/createTweetController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlSaveTweet = void 0;

var _CreateTweetView = _interopRequireDefault(require("../../../View/Components/Tweet/createTweet/1.CreateTweetView.js"));

var _api = require("../../api/api.js");

var _helper = require("../../../View/utils/helper.js");

var _postedTweetController = require("./postedTweetController.js");

var _createMutltipleTweetsController = require("./createMutltipleTweetsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var View;
var createTweetForm = document.querySelector('.createTweet-main');

var resetCreateTweetForm = function resetCreateTweetForm() {
  return View.emptyAllInputsValue();
};

var controlSaveTweet = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var res, docs;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _api.post)('tweets', data);

          case 2:
            res = _context.sent;
            console.log(res);

            if (res) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            docs = res.data.docs;
            (0, _postedTweetController.controlRenderPostedTweet)(docs);
            resetCreateTweetForm();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlSaveTweet(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.controlSaveTweet = controlSaveTweet;

var control_save_schedule_tweet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _api.post)('tweets', data);

          case 2:
            res = _context2.sent;
            console.log(res);

            if (res) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            resetCreateTweetForm();

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function control_save_schedule_tweet(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getRecentTweets = (0, _helper.try_catch)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
  var recent_tweets;
  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _api.get)('tweets');

        case 2:
          recent_tweets = _context3.sent;

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));

var controlCreateTweetForm = function controlCreateTweetForm(action, data) {
  console.log(action);
  if (action === 'save-tweet') controlSaveTweet(data);
  if (action === 'save-schedule-tweet') control_save_schedule_tweet(data);

  if (action === 'show-upload-img-in-multiple-tweet-form') {
    console.log('called');
    (0, _createMutltipleTweetsController.controlSetUploadImgInMultipleTweetImgEls)(true);
  }

  console.log(action, data);
};

if (createTweetForm) {
  View = new _CreateTweetView.default();
  View.addHandlerTweet(controlCreateTweetForm);
}
},{"../../../View/Components/Tweet/createTweet/1.CreateTweetView.js":"View/Components/Tweet/createTweet/1.CreateTweetView.js","../../api/api.js":"Controller/api/api.js","../../../View/utils/helper.js":"View/utils/helper.js","./postedTweetController.js":"Controller/Components/Tweet/postedTweetController.js","./createMutltipleTweetsController.js":"Controller/Components/Tweet/createMutltipleTweetsController.js"}],"View/Components/Tweet/posted_tweet_or_comment/CommentView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _posted_parent_view = _interopRequireDefault(require("./0.posted_parent_view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommentView = /*#__PURE__*/function (_ParentPostedTwet) {
  _inherits(CommentView, _ParentPostedTwet);

  var _super = _createSuper(CommentView);

  function CommentView() {
    var _this;

    _classCallCheck(this, CommentView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.comment-list'));

    _defineProperty(_assertThisInitialized(_this), "tweet_id", void 0);

    _defineProperty(_assertThisInitialized(_this), "tweet_user_id", void 0);

    _defineProperty(_assertThisInitialized(_this), "tweet_user_name", void 0);

    _defineProperty(_assertThisInitialized(_this), "commentId", void 0);

    return _this;
  }

  _createClass(CommentView, [{
    key: "_setDOMSElsAndDataAttrs",
    value: function _setDOMSElsAndDataAttrs(target) {
      this._parentEl = target.closest('.comment-item');
      this.comment_id = this._parentEl.dataset.commentId;
      this.comment_user_id = this._parentEl.dataset.commentId;
      this.comment_user_name = this._parentEl.dataset.commentName;
      this.comment_reply_to = this._parentEl.dataset.commentReplyTo;
      this._tweet_reply_btn = this._parentEl.querySelector('button[data-action="write-comment"]');
      this._retweet_quote_tweet_btn = this._parentEl.querySelector('button[data-action="retweet"]');
    }
  }, {
    key: "add_handler_comments",
    value: function add_handler_comments(handle) {
      this.addHandlePost(handle);
    }
  }]);

  return CommentView;
}(_posted_parent_view.default);

var _default = CommentView;
exports.default = _default;
},{"./0.posted_parent_view.js":"View/Components/Tweet/posted_tweet_or_comment/0.posted_parent_view.js"}],"Controller/Components/Tweet/CommentController.js":[function(require,module,exports) {
"use strict";

var _CommentView = _interopRequireDefault(require("../../../View/Components/Tweet/posted_tweet_or_comment/CommentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var comment_section = document.querySelector('.comment-tweet');

if (comment_section) {
  View = new CommentView();
  View.add_handler_comments();
}
},{"../../../View/Components/Tweet/posted_tweet_or_comment/CommentView.js":"View/Components/Tweet/posted_tweet_or_comment/CommentView.js"}],"Controller/Components/Tweet/main.js":[function(require,module,exports) {
"use strict";

require("./createTweetController.js");

require("./createMutltipleTweetsController.js");

require("./postedTweetController.js");

require("./CommentController.js");
},{"./createTweetController.js":"Controller/Components/Tweet/createTweetController.js","./createMutltipleTweetsController.js":"Controller/Components/Tweet/createMutltipleTweetsController.js","./postedTweetController.js":"Controller/Components/Tweet/postedTweetController.js","./CommentController.js":"Controller/Components/Tweet/CommentController.js"}],"View/Common/ModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domHelper = require("../utils/domHelper.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ModalView = /*#__PURE__*/function () {
  function ModalView() {
    _classCallCheck(this, ModalView);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_parentElNoOfSections", void 0);

    _defineProperty(this, "_currentActiveSectionEl", void 0);

    _defineProperty(this, "_deleteBtn", void 0);
  }

  _createClass(ModalView, [{
    key: "hide",
    value: function hide() {
      // replaceClass(this._parentEl, 'display', 'hidden');
      this._parentEl.classList.add('hide');

      this.reset();
    }
  }, {
    key: "show",
    value: function show() {
      // replaceClass(this._parentEl, 'hidden', 'display');
      this._parentEl.classList.remove('hide');
    }
  }, {
    key: "render",
    value: function render(section, user_arr) {
      var _this = this;

      console.log(section, user_arr);

      var insert_list_el = this._parentEl.querySelector("section[data-section=".concat(section, "]")).querySelector('.modal-list');

      insert_list_el.innerHTML = '';
      var html = user_arr.map(function (user) {
        return _this._generate_markUp(user);
      }).join('');
      insert_list_el.insertAdjacentHTML('afterbegin', html);
    }
  }, {
    key: "_handleBackBtn",
    value: function _handleBackBtn(target, handle) {
      var btn = target.closest('button[data-action="back"]');
      if (!btn) return;
      this.hide();
      handle('redirect-to-home');
    }
  }, {
    key: "_getCurSectionAllItemEls",
    value: function _getCurSectionAllItemEls() {
      return _toConsumableArray(this._currentActiveSectionEl.querySelectorAll('.modal-item'));
    }
  }, {
    key: "_getCurActiveSectionEl",
    value: function _getCurActiveSectionEl() {
      return this._sectionElArr.filter(function (el) {
        return (0, _domHelper.contains)(el, 'display');
      });
    }
  }, {
    key: "_getCurSectionAllActiveItemEls",
    value: function _getCurSectionAllActiveItemEls() {
      return _toConsumableArray(this._currentActiveSectionEl.querySelectorAll('.modal-item[data-active="true"]'));
    } //

  }, {
    key: "handleSelectItems",
    value: function handleSelectItems(target, handle) {}
  }, {
    key: "hideModalWhenOverlayIsClicked",
    value: function hideModalWhenOverlayIsClicked(target, handle) {
      if (!target.closest('.overlay')) return; // this.hide();

      handle('redirect-to-home');
    }
  }, {
    key: "reset",
    value: function reset() {}
  }, {
    key: "_handleChangeSectionBtns",
    value: function _handleChangeSectionBtns(target, handle) {
      var btn = target.closest('button[data-btn="change-section-btn"]');
      if (!btn) return;
      var section = btn.dataset.section;
      console.log(btn); // // active click section
      // this._sectionElArr.forEach((el) => {
      //   if (el.dataset.section === section) replaceClass(el, 'hidden', 'display');
      //   else replaceClass(el, 'display', 'hidden');
      // });
      // // active click btn
      // this._changeSectionBtnArr.forEach((el) => {
      //   if (el !== btn) el.dataset.active = false;
      //   else btn.dataset.active = true;
      // });

      handle('redirect-to-section', {
        section: section
      }); // unactive previous section item els
      // this.reset();
    } // handleDeleteBtn(target, handle) {
    //   const btn = target.closest('button[data-action="delete"]');
    //   if (!btn) return;
    //   const { section } = this._currentActiveSectionEl.dataset;
    //   const deleteTweetIdArr = this._getCurSectionAllActiveItemEls().map((el) => {
    //     el.remove();
    //     return el.dataset.id;
    //   });
    //   handle(`delete-tweets`, { type: section, tweetIds: deleteTweetIdArr });
    // }

  }, {
    key: "_setDOMEls",
    value: function _setDOMEls() {
      // no of sections
      this._parentElNoOfSections = this._parentEl.dataset.sections;
      this._sectionElArr = _toConsumableArray(this._parentEl.querySelectorAll('.modal-section'));
      this._changeSectionBtnArr = _toConsumableArray(this._parentEl.querySelectorAll('button[data-btn="change-section-btn"]')); // current display section

      this._currentActiveSectionEl = this._parentEl.querySelector('.modal-section.display');
      this._deleteBtn = this._parentEl.querySelector('button[data-action="delete"]');
      this._selectAllBtn = this._parentEl.querySelector('button[data-action="select-all"]');
      this._unSelectAllBtn = this._parentEl.querySelector('button[data-action="unselect-all"]');
    }
  }, {
    key: "setClass",
    value: function setClass() {}
  }, {
    key: "handleAdditionalFuncs",
    value: function handleAdditionalFuncs() {}
  }, {
    key: "handleModal",
    value: function handleModal(handle) {
      var _this2 = this;

      this._parentEl.addEventListener('click', function (e) {
        var target = e.target;

        _this2._setDOMEls();

        _this2._handleChangeSectionBtns(target, handle);

        _this2.hideModalWhenOverlayIsClicked(target, handle); // handle backbtns


        _this2._handleBackBtn(target, handle);

        _this2.handleSelectItems(target, handle);

        _this2.handleAdditionalFuncs(target, handle); // change between section
        // select all btn
        // delete btn

      });
    }
  }]);

  return ModalView;
}();

var _default = ModalView;
exports.default = _default;
},{"../utils/domHelper.js":"View/utils/domHelper.js"}],"View/Components/Popup/DraftUnsentTweet/DraftTweetPopup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PopupView2 = _interopRequireDefault(require("../../../Common/PopupView.js"));

var _unsendTweetsController = require("../../../../Controller/Components/Modal/unsendTweetsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// present in multi tweets
var DiscardDraftTweetPopupView = /*#__PURE__*/function (_PopupView) {
  _inherits(DiscardDraftTweetPopupView, _PopupView);

  var _super = _createSuper(DiscardDraftTweetPopupView);

  function DiscardDraftTweetPopupView() {
    var _this;

    _classCallCheck(this, DiscardDraftTweetPopupView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.popup[data-tweet-type="draft-tweets"]'));

    return _this;
  }

  _createClass(DiscardDraftTweetPopupView, [{
    key: "handleDeleteAllTweetBtn",
    value: function handleDeleteAllTweetBtn(target, handle) {
      var btn = target.closest("button[data-action='delete-tweets']");
      if (!btn) return;
      handle('delete-draft');
      this.hide();
    }
  }]);

  return DiscardDraftTweetPopupView;
}(_PopupView2.default);

var _default = DiscardDraftTweetPopupView;
exports.default = _default;
},{"../../../Common/PopupView.js":"View/Common/PopupView.js","../../../../Controller/Components/Modal/unsendTweetsController.js":"Controller/Components/Modal/unsendTweetsController.js"}],"View/Components/Modal/UnsentTweetModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ModalView2 = _interopRequireDefault(require("../../Common/ModalView.js"));

var _DraftTweetPopup = _interopRequireDefault(require("../Popup/DraftUnsentTweet/DraftTweetPopup.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UnsentTweetModalView = /*#__PURE__*/function (_ModalView) {
  _inherits(UnsentTweetModalView, _ModalView);

  var _super = _createSuper(UnsentTweetModalView);

  function UnsentTweetModalView() {
    var _this;

    _classCallCheck(this, UnsentTweetModalView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".modal[data-modal='unsent-tweets']"));

    return _this;
  }

  _createClass(UnsentTweetModalView, [{
    key: "_getAllItemsFromAllSection",
    value: function _getAllItemsFromAllSection() {
      return _toConsumableArray(this._parentEl.querySelectorAll('.modal-item'));
    }
  }, {
    key: "_getCountOfCurSectionActiveItemEls",
    value: function _getCountOfCurSectionActiveItemEls() {
      return _toConsumableArray(this._currentActiveSectionEl.querySelectorAll('li[data-active="true"]')).length;
    }
  }, {
    key: "_setAlLeastOneItemSelectedAttrAndDeleteBtnState",
    value: function _setAlLeastOneItemSelectedAttrAndDeleteBtnState(attrState, disabledbtn) {
      this._parentEl.setAttribute('data-atleast-1-item-selected', attrState);

      if (this._deleteBtn) this._deleteBtn.disabled = disabledbtn;
    }
  }, {
    key: "_setItemElActiveState",
    value: function _setItemElActiveState(el, activeState) {
      if (!el) return;
      el.dataset.active = activeState;
      el.querySelector('.btn--checkbox').dataset.checked = activeState;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this2 = this;

      // set all paretn el atrribute to false
      this._parentEl.setAttribute('data-edit-items', false);

      this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(false, true); // unselect last opened section item els


      this._getCurSectionAllItemEls().forEach(function (el) {
        if (!el) return;

        _this2._setItemElActiveState(el, 'false');
      });
    }
  }, {
    key: "_delete_item",
    value: function _delete_item(target, handle) {
      var btn = target.closest('button[data-action="delete"]');
      if (!btn) return;
      var section = this._currentActiveSectionEl.dataset.section;

      var deleteTweetIdArr = this._getCurSectionAllActiveItemEls().map(function (el) {
        // el.remove();
        return el.dataset.id;
      });

      handle("delete-tweets", {
        type: section,
        tweetIds: deleteTweetIdArr
      });
    }
  }, {
    key: "_select_item",
    value: function _select_item(target, handle) {
      var itemEl = target.closest('.preview-item');
      if (!itemEl) return; // if items is clicked not btn if edit functionality is not open then this means to put this tweet into multiple tweet modal

      if (this._parentEl.getAttribute('data-edit-items') === 'false') {
        var _itemEl$dataset = itemEl.dataset,
            id = _itemEl$dataset.id,
            imgArr = _itemEl$dataset.imgArr,
            text = _itemEl$dataset.text,
            scheduleDate = _itemEl$dataset.scheduleDate;
        console.log(imgArr);
        handle('insert-tweet-in-multiple-tweet-modal', {
          type: this._currentActiveSectionEl.dataset.section,
          id: id,
          imgArr: imgArr ? JSON.parse(imgArr) : '',
          // schedule_date:new Date(scheduleDate).toLocaleString(),
          text: text
        });
        this.hide();
        return;
      } // active item and checking the box
      // const itemCheckBoxEl = itemEl.querySelector('.btn--checkbox');


      var active = itemEl.dataset.active;
      active = active === 'true' ? false : true;

      this._setItemElActiveState(itemEl, active); // itemCheckBoxEl.dataset.checked = checked;
      // itemEl.dataset.active = checked;
      // showing deselectall and active delete btn when alleast one el is active


      if (this._getCountOfCurSectionActiveItemEls() > 0) {
        this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(true, false);

        return;
      }

      this._parentEl.setAttribute('data-atleast-1-item-selected', false);

      this._deleteBtn.disabled = true;

      this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(false, true);
    }
  }, {
    key: "_edit_items",
    value: function _edit_items(target) {
      var btn = target.closest('button[data-action="allow-to-edit-items"]');
      if (!btn) return;

      this._parentEl.setAttribute('data-edit-items', true);
    }
  }, {
    key: "_done_btn",
    value: function _done_btn(target) {
      var btn = target.closest('button[data-action="done-with-editing-items"]');
      if (!btn) return;

      this._parentEl.setAttribute('data-edit-items', false); // uncheck all item checkbox checked


      this._getCurSectionAllItemEls().forEach(function (el) {
        return el.querySelector('.btn--checkbox').dataset.checked = false;
      });

      this._parentEl.setAttribute('data-atleast-1-item-selected', false);

      this._deleteBtn.disabled = true;
    }
  }, {
    key: "_select_all_items",
    value: function _select_all_items(target) {
      var _this3 = this;

      var btn = target.closest('button[data-action="select-all"]');
      if (!btn) return;

      this._getCurSectionAllItemEls().forEach(function (el) {
        return _this3._setItemElActiveState(el, 'true');
      });

      this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(true, false);
    }
  }, {
    key: "_unselect_all_items",
    value: function _unselect_all_items(target) {
      var _this4 = this;

      var btn = target.closest('button[data-action="unselect-all"]');
      if (!btn) return;

      this._getCurSectionAllItemEls().forEach(function (el) {
        return _this4._setItemElActiveState(el, 'false');
      });

      this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(false, true);
    }
  }, {
    key: "handleAdditionalFuncs",
    value: function handleAdditionalFuncs(target, handle) {
      // edit btns
      this._edit_items(target);

      this._done_btn(target);

      this._select_all_items(target);

      this._unselect_all_items(target);

      this._select_item(target, handle);

      this._delete_item(target, handle);
    }
  }, {
    key: "addHandlerModal",
    value: function addHandlerModal(handle) {
      this.handleModal(handle);
    }
  }]);

  return UnsentTweetModalView;
}(_ModalView2.default);

var _default = UnsentTweetModalView;
exports.default = _default;
},{"../../Common/ModalView.js":"View/Common/ModalView.js","../Popup/DraftUnsentTweet/DraftTweetPopup.js":"View/Components/Popup/DraftUnsentTweet/DraftTweetPopup.js"}],"Controller/Components/Popup/draftTweetPopupController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show_delete_draft_tweet_popup = exports.controlDraftTweetPopup = void 0;

var _unsendTweetsController = require("../Modal/unsendTweetsController.js");

var _DraftTweetPopup = _interopRequireDefault(require("../../../View/Components/Popup/DraftUnsentTweet/DraftTweetPopup.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var discart_draft_tweet_popup_el = document.querySelector('.popup[data-tweet-type="draft-tweets"]');

var controlDraftTweetPopup = function controlDraftTweetPopup(action) {
  if (action === 'delete-draft') (0, _unsendTweetsController.controlDeleteUnsentTweets)();
};

exports.controlDraftTweetPopup = controlDraftTweetPopup;

var show_delete_draft_tweet_popup = function show_delete_draft_tweet_popup() {
  return View.show();
}; // Working
// -- show a popup
// -- have two option => 1) delete selected draft tweet
// --                 => 2) cancel


exports.show_delete_draft_tweet_popup = show_delete_draft_tweet_popup;

if (discart_draft_tweet_popup_el) {
  View = new _DraftTweetPopup.default();
  View.handlePopup(controlDraftTweetPopup);
}
},{"../Modal/unsendTweetsController.js":"Controller/Components/Modal/unsendTweetsController.js","../../../View/Components/Popup/DraftUnsentTweet/DraftTweetPopup.js":"View/Components/Popup/DraftUnsentTweet/DraftTweetPopup.js"}],"Controller/Components/Modal/unsendTweetsController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDraftTweetModalView = exports.controlSaveTweetAsDraft = exports.controlInsertTweetIntoCreateTweetsModal = exports.controlDraftTweetModal = exports.controlDeleteUnsentTweets = void 0;

var _UnsentTweetModalView = _interopRequireDefault(require("../../../View/Components/Modal/UnsentTweetModalView.js"));

var _api = require("../../api/api.js");

var _draftTweetPopupController = require("../Popup/draftTweetPopupController.js");

var _createMutltipleTweetsController = require("../Tweet/createMutltipleTweetsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UnsentDraftTweetModalEl = document.querySelector(".modal[data-modal='unsent-tweets']");
var View;
var to_be_delete_draft_tweets = {}; // insert draft tweet into multiple tweet form

var controlInsertTweetIntoCreateTweetsModal = function controlInsertTweetIntoCreateTweetsModal(tweetObj) {
  console.log(tweetObj);
  (0, _createMutltipleTweetsController.controlSetUnsentTweetInMultiplTweetForm)(tweetObj);
  View.hide();
};

exports.controlInsertTweetIntoCreateTweetsModal = controlInsertTweetIntoCreateTweetsModal;

var getDraftTweetModalView = function getDraftTweetModalView() {
  return View;
};

exports.getDraftTweetModalView = getDraftTweetModalView;

var controlDeleteUnsentTweets = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var _to_be_delete_draft_t, type, tweetIds, to_be_delete_tweets_arr, _iterator, _step, tweet_id;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (to_be_delete_draft_tweets.tweetIds) {
              _context.next = 4;
              break;
            }

            to_be_delete_draft_tweets = data;
            (0, _draftTweetPopupController.show_delete_draft_tweet_popup)();
            return _context.abrupt("return");

          case 4:
            _to_be_delete_draft_t = to_be_delete_draft_tweets, type = _to_be_delete_draft_t.type, tweetIds = _to_be_delete_draft_t.tweetIds;
            to_be_delete_tweets_arr = [];
            _iterator = _createForOfIteratorHelper(tweetIds);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                tweet_id = _step.value;
                to_be_delete_tweets_arr.push((0, _api.del)("users/".concat(type, "-tweets/remove/tweet/").concat(tweet_id)));
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            _context.next = 10;
            return Promise.all(to_be_delete_tweets_arr);

          case 10:
            location.reload();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlDeleteUnsentTweets(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.controlDeleteUnsentTweets = controlDeleteUnsentTweets;

var go_to_home = function go_to_home() {
  return location.assign('/');
};

var go_to_section_page = function go_to_section_page(section) {
  return location.assign("/tweets/unsent/".concat(section));
};

var controlSaveTweetAsDraft = function controlSaveTweetAsDraft() {};

exports.controlSaveTweetAsDraft = controlSaveTweetAsDraft;

var controlDraftTweetModal = function controlDraftTweetModal(action, data) {
  console.log(action);
  if (action === 'insert-tweet-in-multiple-tweet-modal') controlInsertTweetIntoCreateTweetsModal(data);
  if (action === 'delete-tweets') controlDeleteUnsentTweets(data);
  if (action === 'save-tweet') controlSaveTweetAsDraft(data);
  if (action === 'redirect-to-home') go_to_home();
  if (action === 'redirect-to-section') go_to_section_page(data.section);
};

exports.controlDraftTweetModal = controlDraftTweetModal;

if (UnsentDraftTweetModalEl) {
  View = new _UnsentTweetModalView.default();
  View.addHandlerModal(controlDraftTweetModal);
}
},{"../../../View/Components/Modal/UnsentTweetModalView.js":"View/Components/Modal/UnsentTweetModalView.js","../../api/api.js":"Controller/api/api.js","../Popup/draftTweetPopupController.js":"Controller/Components/Popup/draftTweetPopupController.js","../Tweet/createMutltipleTweetsController.js":"Controller/Components/Tweet/createMutltipleTweetsController.js"}],"View/Components/Modal/TwitterCircleModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ModalView2 = _interopRequireDefault(require("../../Common/ModalView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TwitterCircleModalView = /*#__PURE__*/function (_ModalView) {
  _inherits(TwitterCircleModalView, _ModalView);

  var _super = _createSuper(TwitterCircleModalView);

  function TwitterCircleModalView() {
    var _this;

    _classCallCheck(this, TwitterCircleModalView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".modal[data-modal='edit-circle']"));

    _defineProperty(_assertThisInitialized(_this), "_search_form", _this._parentEl.querySelector('.search-form'));

    return _this;
  }

  _createClass(TwitterCircleModalView, [{
    key: "hide",
    value: function hide() {
      this._parentEl.classList.replace('view', 'hidden');
    }
  }, {
    key: "show",
    value: function show() {
      this._parentEl.classList.replace('hidden', 'view');
    }
  }, {
    key: "_generate_markUp",
    value: function _generate_markUp(user) {
      return "\n    <div class=\"modal-item preview-item-container preview-item\" data-state data-id=".concat(user._id, " data-name=").concat(user.name, " data-avatar=").concat(user.avatar, " data-description=").concat(user.bio, " data-following_count=").concat(user.following_count, " data-followers_count=").concat(user.followers_count, " >\n      <div class=\"preview-item-content\"><img class=\"preview-img\" src=\"/img/users/").concat(user.profilePic, "\" alt=\"\" data-preview-window-target-el=\"true\"/>\n        <div class=\"preview-details\">\n          <div class=\"preview-title\" data-preview-window-target-el=\"true\">").concat(user.name, "</div>\n          <div class=\"preview-extra\" data-preview-window-target-el=\"true\">").concat(user.avatar, "</div>\n        </div>\n      </div>\n      <p class=\"preview-state\">\n        <button class=\"btn--outline btn--sm\" data-action=\"add\">Add</button>\n      </p>\n    </div>");
    } // add or remove member from/to  twitter circle

  }, {
    key: "handleSelectItems",
    value: function handleSelectItems(target, handle) {
      var itemEl = target.closest('.preview-item');
      if (!itemEl) return;
      var section = this._currentActiveSectionEl.dataset.section;
      var _itemEl$dataset = itemEl.dataset,
          id = _itemEl$dataset.id,
          avatar = _itemEl$dataset.avatar,
          name = _itemEl$dataset.name,
          profilePic = _itemEl$dataset.profilePic;
      itemEl.dataset._id = id;
      var btn;

      if (section === 'my-circle') {
        // 1.click remove btn then change it to add btn
        btn = target.closest('button[data-action="remove"]');

        if (btn) {
          itemEl.remove();
          handle('remove-user-from-circle', itemEl.dataset);
          return;
        }
      }

      if (section === 'recommend-circle') {
        // twitter recommend => we can add user to circle
        btn = target.closest('button[data-action="add"]');

        if (btn) {
          btn.dataset.action = 'remove';
          btn.textContent = 'Remove';
          handle('add-user-to-circle', itemEl.dataset);
          return;
        } // 1.click remove btn then change it to add btn


        btn = target.closest('button[data-action="remove"]');

        if (btn) {
          btn.dataset.action = 'add';
          btn.textContent = 'Add';
          handle('remove-user-from-circle', itemEl.dataset);
          return;
        }
      }

      handle('redirect-to-user', itemEl.dataset);
    }
  }, {
    key: "handleSearchUser",
    value: function handleSearchUser(handle) {
      var _this2 = this;

      this._search_form && this._search_form.addEventListener('input', function (e) {
        var value = _this2._search_form.querySelector('input').value;

        if (value === '') return;
        handle('display-recommend-users', {
          section: _this2._currentActiveSectionEl.dataset.section,
          name: value
        });
      });
    }
  }, {
    key: "addHandlerModal",
    value: function addHandlerModal(handle) {
      this.handleModal(handle); // saerch user for recommendation

      this.handleSearchUser(handle);
    }
  }]);

  return TwitterCircleModalView;
}(_ModalView2.default);

var _default = TwitterCircleModalView;
exports.default = _default;
},{"../../Common/ModalView.js":"View/Common/ModalView.js"}],"Controller/Components/Modal/twitterCircleModalController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hide_circle_modal = exports.display_circle_modal = void 0;

var _TwitterCircleModalView = _interopRequireDefault(require("../../../View/Components/Modal/TwitterCircleModalView.js"));

var _api = require("../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var View;
var TwitterCircleModalEl = document.querySelector(".modal[data-modal='edit-circle']");

var renderModalList = function renderModalList(section, user_arr) {
  View.render(section, user_arr);
};

var display_circle_modal = function display_circle_modal() {
  return View.show();
};

exports.display_circle_modal = display_circle_modal;

var hide_circle_modal = function hide_circle_modal() {
  return View.hide();
};

exports.hide_circle_modal = hide_circle_modal;

var go_to_home = function go_to_home() {
  return location.assign('/');
};

var go_to_section_page = function go_to_section_page(section) {
  return location.assign("/users/circle/".concat(section));
};

var go_to_user_page = function go_to_user_page(avatar) {
  return location.assign("/users/".concat(avatar));
};

var add_user_to_circle = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(user_data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _api.post)("users/circle/add/user/".concat(user_data._id), {
              add_user: user_data
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function add_user_to_circle(_x) {
    return _ref.apply(this, arguments);
  };
}();

var remove_user_from_circle = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user_id) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _api.del)("users/circle/remove/user/".concat(user_id));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function remove_user_from_circle(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var display_recomment_users = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
    var users;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _api.get)("users/search/".concat(data.name));

          case 2:
            users = _context3.sent;
            console.log(users);
            renderModalList(data.section, users.data.docs);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function display_recomment_users(_x3) {
    return _ref3.apply(this, arguments);
  };
}(); // remove/add to twitter circle
// redirect to clicked user


var controlTwitterCircleModal = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(action, data) {
    var _id, avatar, name, profilePic;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(action, data);
            if (action === 'redirect-to-home') go_to_home();
            if (action === 'redirect-to-section') go_to_section_page(data.section); // search user

            if (action === 'display-recommend-users') display_recomment_users(data); // user detail

            _id = data._id, avatar = data.avatar, name = data.name, profilePic = data.profilePic;
            if (action === 'redirect-to-user') go_to_user_page(avatar);
            if (action === 'add-user-to-circle') add_user_to_circle(_defineProperty({
              _id: _id,
              avatar: avatar,
              name: name
            }, "avatar", avatar)); // ---------------------------

            if (action === 'remove-user-from-circle') remove_user_from_circle(_id);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function controlTwitterCircleModal(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

if (TwitterCircleModalEl) {
  View = new _TwitterCircleModalView.default();
  View.addHandlerModal(controlTwitterCircleModal);
}
},{"../../../View/Components/Modal/TwitterCircleModalView.js":"View/Components/Modal/TwitterCircleModalView.js","../../api/api.js":"Controller/api/api.js"}],"View/Components/Modal/FollowOrFollowingModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ModalView2 = _interopRequireDefault(require("../../Common/ModalView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FollowOrFollowingModalView = /*#__PURE__*/function (_ModalView) {
  _inherits(FollowOrFollowingModalView, _ModalView);

  var _super = _createSuper(FollowOrFollowingModalView);

  function FollowOrFollowingModalView() {
    var _this;

    _classCallCheck(this, FollowOrFollowingModalView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".modal[data-modal='follow-or-following']"));

    return _this;
  }

  _createClass(FollowOrFollowingModalView, [{
    key: "handleSelectItems",
    value: // add or remove member from/to  twitter circle
    function handleSelectItems(target, handle) {
      var itemEl = target.closest('.preview-item');
      if (!itemEl) return; // 1.click on follow or unfollow btn
      // 2.click on item not btn

      var user_id = itemEl.dataset.user_id; ///----------------------------------------------------------------
      // 1.click on follow or unfollow btn

      var button = target.closest('button[data-follow]');

      if (button) {
        // sending imf
        var follow = button.dataset.follow;
        var action = follow === 'true' ? 'follow' : 'unfollow';
        var follow_value = follow === 'true' ? 'true' : 'false';
        handle(action, user_id); // setting item el data attribute (data-follow-user)

        itemEl.dataset.followUser = follow_value;
        return;
      } // 2.click on preview item


      return handle('redirect-to-user', user_id);
    } // additional function

  }, {
    key: "handleAdditionalFuncs",
    value: function handleAdditionalFuncs(target, handle) {
      // 1.click on header twitter account name(the account which we are viewing follow and following stats)
      var user_account_stats = target.closest('[data-user-window-id]');

      if (user_account_stats) {
        var user_account_id = user_account_stats.getAttribute('data-user-window-id');
        return handle('redirect-to-user', user_account_id);
      }
    }
  }]);

  return FollowOrFollowingModalView;
}(_ModalView2.default);

var _default = FollowOrFollowingModalView;
exports.default = _default;
},{"../../Common/ModalView.js":"View/Common/ModalView.js"}],"Controller/Components/Modal/followOrfollowingModalController.js":[function(require,module,exports) {
"use strict";

var _FollowOrFollowingModalView = _interopRequireDefault(require("../../../View/Components/Modal/FollowOrFollowingModalView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var followOrFollowingModalEl = document.querySelector(".modal[data-modal='follow-or-following']");

var controlFollowOrFollowingModal = function controlFollowOrFollowingModal(action, user_id) {
  console.log(action, user_id);
};

if (followOrFollowingModalEl) {
  View = new _FollowOrFollowingModalView.default();
  View.addHandlerModal(controlFollowOrFollowingModal);
}
},{"../../../View/Components/Modal/FollowOrFollowingModalView.js":"View/Components/Modal/FollowOrFollowingModalView.js"}],"Controller/Components/Modal/0.main.js":[function(require,module,exports) {
"use strict";

require("./post_reply/tweet_reply_modal_controller.js");

require("./unsendTweetsController.js");

require("./twitterCircleModalController.js");

require("./followOrfollowingModalController.js");
},{"./post_reply/tweet_reply_modal_controller.js":"Controller/Components/Modal/post_reply/tweet_reply_modal_controller.js","./unsendTweetsController.js":"Controller/Components/Modal/unsendTweetsController.js","./twitterCircleModalController.js":"Controller/Components/Modal/twitterCircleModalController.js","./followOrfollowingModalController.js":"Controller/Components/Modal/followOrfollowingModalController.js"}],"Controller/Components/Popup/saveTweetAsDraftPopupController.js":[function(require,module,exports) {
"use strict";

var _SaveMultiTweetPopupView = _interopRequireDefault(require("../../../View/Components/Popup/MultipleTweet/SaveMultiTweetPopupView.js"));

var _createMutltipleTweetsController = require("../Tweet/createMutltipleTweetsController.js");

var _unsendTweetsController = require("../Modal/unsendTweetsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var saveMultiTweetAsDraftPopupEl = document.querySelector('.popup[data-tweet-type="multiple-tweets"][data-action="save-tweet"]');

var controlPopup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(action) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // save draft tweet
            console.log(action);

            if (!(action === 'save-tweet-as-draft')) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return (0, _createMutltipleTweetsController.controlSaveTweetAsDraft)();

          case 4:
            res = _context.sent;

            if (res) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            // getDraftTweetModalView().show();
            location.assign('/tweets/unsent/draft');

          case 8:
            if (action === 'discard-all-tweets') location.assign('/');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function controlPopup(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (saveMultiTweetAsDraftPopupEl) {
  var View = new _SaveMultiTweetPopupView.default();
  View.addHandlerPopup(controlPopup);
}
},{"../../../View/Components/Popup/MultipleTweet/SaveMultiTweetPopupView.js":"View/Components/Popup/MultipleTweet/SaveMultiTweetPopupView.js","../Tweet/createMutltipleTweetsController.js":"Controller/Components/Tweet/createMutltipleTweetsController.js","../Modal/unsendTweetsController.js":"Controller/Components/Modal/unsendTweetsController.js"}],"Controller/Components/Popup/0.main.js":[function(require,module,exports) {
"use strict";

require("./draftTweetPopupController.js");

require("./saveTweetAsDraftPopupController.js");
},{"./draftTweetPopupController.js":"Controller/Components/Popup/draftTweetPopupController.js","./saveTweetAsDraftPopupController.js":"Controller/Components/Popup/saveTweetAsDraftPopupController.js"}],"View/Common/PreviewWindowView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PreviewWindowView = /*#__PURE__*/function () {
  function PreviewWindowView() {
    _classCallCheck(this, PreviewWindowView);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_targetEl", void 0);

    _defineProperty(this, "_userId", void 0);
  }

  _createClass(PreviewWindowView, [{
    key: "hide",
    value: function hide() {
      this._parentEl.classList.replace('show', 'hide');
    }
  }, {
    key: "show",
    value: function show() {
      // hiding other preview window execpt this current one
      _toConsumableArray(document.querySelectorAll('preview[preview-window]')).forEach(function (el) {
        return el.classList.add('hide');
      });

      this._parentEl.classList.replace('hide', 'show');
    } // there is preview item in preview_el which is different from user preview component

  }, {
    key: "set_user_info_in_tweet_and_display_user_preview",
    value: function set_user_info_in_tweet_and_display_user_preview(tweet_preview_el, user_data) {
      var name = user_data.name,
          avatar = user_data.avatar,
          bio = user_data.bio,
          following_count = user_data.following_count,
          followers_count = user_data.followers_count,
          _id = user_data._id; // if there are multiple tweets by same user so i dont want make req for same data for another tweet of multiple tweets as we already have it

      var tweet_group_el = tweet_preview_el.closest('.postedTweet-group');

      if (tweet_group_el.dataset.tweetsCount === 'multiple') {
        var all_tweet_group_preview_els = _toConsumableArray(tweet_group_el.querySelectorAll('.preview-item'));

        all_tweet_group_preview_els.forEach(function (el) {
          el.dataset.name = name;
          el.dataset.avatar = avatar;
          el.dataset.bio = bio || '';
          el.dataset.followers_count = followers_count;
          el.dataset.following_count = following_count;
          el.dataset.userDetailSet = 'true';
        });
        tweet_preview_el = all_tweet_group_preview_els[0];
      } else {
        // set info in tweet el for future purpose
        tweet_preview_el.dataset.name = name;
        tweet_preview_el.dataset.avatar = avatar;
        tweet_preview_el.dataset.bio = bio || '';
        tweet_preview_el.dataset.followers_count = followers_count;
        tweet_preview_el.dataset.following_count = following_count;
        tweet_preview_el.dataset.userDetailSet = 'true';
      }

      this.render(tweet_preview_el.dataset);
    } // update imf of hover user

  }, {
    key: "render",
    value: function render(dataset) {
      var name = dataset.name,
          avatar = dataset.avatar,
          bio = dataset.bio,
          following_count = dataset.following_count,
          followers_count = dataset.followers_count,
          user_id = dataset.user_id; // set detail in tweet so future purpose
      // user preview

      this._parentEl.dataset.user_id = user_id;
      this._parentEl.dataset.user_id = user_id; // extract imformation from user_doc

      this._parentEl.querySelector('.preview-name').textContent = name;
      this._parentEl.querySelector('.preview-avatar').textContent = avatar;
      this._parentEl.querySelector('.preview-description').textContent = bio;
      this._parentEl.querySelector('.preview-following').textContent = following_count;
      this._parentEl.querySelector('.preview-followers').textContent = "".concat(followers_count);
    }
  }, {
    key: "_setDOMElsAndAttributes",
    value: function _setDOMElsAndAttributes(target) {
      this._userId = this._parentEl.dataset.userId;
    } // handle

  }, {
    key: "_handleClickOnUserAboutDetail",
    value: function _handleClickOnUserAboutDetail(target, handle) {
      var el = target.closest('.preview-about-user');
      if (!el) return;
      handle('redirect-to-user', {
        user_id: this._userId
      });
    }
  }, {
    key: "_handleClickOnFollowingOrFollowsStats",
    value: function _handleClickOnFollowingOrFollowsStats(target, handle) {
      var statsBtn = target.closest("[data-action='show_user_following']") || target.closest("[data-action='show_user_followers']");
      if (!statsBtn) return;
      var type = statsBtn.dataset.type;
      handle('redirect-to-following-followers-page', {
        user_id: this._userId,
        type_of_users: type
      });
    } // follow or unFollow Btn

  }, {
    key: "_handleFollowOrUnfollowBtn",
    value: function _handleFollowOrUnfollowBtn(target, handle) {
      var followOrFollowingBtn = target.closest('button[data-follow-btn]');
      if (!followOrFollowingBtn) return;
      var follow = followOrFollowingBtn.dataset.follow;
      console.log(follow);
      follow = follow === 'true' ? false : true;
      this._parentEl.dataset.followUser = follow;
      handle('follow-or-unfollow', {
        user_id: this._userId,
        follow: follow
      });
    }
  }, {
    key: "_adjust_postion_according_to_component",
    value: function _adjust_postion_according_to_component(el) {
      var _el$getBoundingClient = el.getBoundingClientRect(),
          top = _el$getBoundingClient.top,
          left = _el$getBoundingClient.left,
          width = _el$getBoundingClient.width,
          height = _el$getBoundingClient.height;

      this._parentEl.style.left = left + 'px'; // posted_tweet

      if (el.closest('.postedTweet-list')) {
        this._parentEl.style.top = el.offsetTop + height / 3 + 'px';
      }

      if (el.closest('.modal[data-modal="edit-circle"]')) {
        this._parentEl.style.top = el.offsetTop + height + 40 + 'px';
      }
    }
  }, {
    key: "addHandlerPreviewWidnow",
    value: function addHandlerPreviewWidnow(handle) {
      var _this = this;

      // show preview when hover on target user item and change imf according to hover user
      document.documentElement.addEventListener('mouseover', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
          var target, target_item_el, target_position_el;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  target = e.target; // if its not preview target then can it be preview itself

                  if (!target.closest('.preview[data-preview-window]')) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return");

                case 3:
                  if (target.getAttribute('data-preview-window-target-el')) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt("return", _this.hide());

                case 5:
                  // checking for preview target
                  // // const targetEl = target.closest('[data-preview-window-target]');
                  // if (!targetEl) return this.hide();
                  // updating value in preview according to target item
                  target_item_el = target.closest('.preview-item');
                  target_position_el = target.closest('.preview-item-container');

                  if (target_item_el) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return");

                case 9:
                  // GET USER INFO FROM DB
                  if (target_item_el.dataset.userDetailSet === 'true') _this.render(target_item_el.dataset);else {
                    handle('set-user-info-in-preview', {
                      el: target_item_el,
                      user_id: target_item_el.dataset.userId
                    });
                  }

                  _this._adjust_postion_according_to_component(target_position_el); // this._parentEl.style.top =
                  //   target.closest('.tweet').offsetTop + height / 2 + 'px';


                  _this.show();

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()); // handle functionality of preview

      this._parentEl.addEventListener('click', function (e) {
        var target = e.target;

        _this._setDOMElsAndAttributes(target); // redirect to user when click user main details


        _this._handleClickOnUserAboutDetail(target, handle); // display users following or follow on new page


        _this._handleClickOnFollowingOrFollowsStats(target, handle); // follow user or unfollow target user


        _this._handleFollowOrUnfollowBtn(target, handle);
      });
    }
  }]);

  return PreviewWindowView;
}();

var _default = PreviewWindowView;
exports.default = _default;
},{}],"View/Components/Preview/userPreview.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PreviewWindowView2 = _interopRequireDefault(require("../../Common/PreviewWindowView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// show user preofile in short way 
var UserPreview = /*#__PURE__*/function (_PreviewWindowView) {
  _inherits(UserPreview, _PreviewWindowView);

  var _super = _createSuper(UserPreview);

  function UserPreview() {
    var _this;

    _classCallCheck(this, UserPreview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.preview[data-type="user-preview"]'));

    return _this;
  } // addHandler Is in Paremt


  return _createClass(UserPreview);
}(_PreviewWindowView2.default);

var _default = UserPreview;
exports.default = _default;
},{"../../Common/PreviewWindowView.js":"View/Common/PreviewWindowView.js"}],"Controller/Components/Preview/2.userPreviewController.js":[function(require,module,exports) {
"use strict";

var _userPreview = _interopRequireDefault(require("../../../View/Components/Preview/userPreview.js"));

var _api = require("../../api/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var View;
var userPreviewEl = document.querySelector('.preview[data-type="user-preview"]');

var control_set_user_info_in_preview_and_display_preview = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var el, user_id, res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // el => tweet_preview_el
            el = data.el, user_id = data.user_id;
            _context.next = 3;
            return (0, _api.get)("users/".concat(user_id));

          case 3:
            res = _context.sent;
            View.set_user_info_in_tweet_and_display_user_preview(el, res.data.docs);
            console.log(res);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function control_set_user_info_in_preview_and_display_preview(_x) {
    return _ref.apply(this, arguments);
  };
}();

var controlUserPreview = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(action, data) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (action === 'set-user-info-in-preview') control_set_user_info_in_preview_and_display_preview(data);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function controlUserPreview(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

if (userPreviewEl) {
  View = new _userPreview.default();
  View.addHandlerPreviewWidnow(controlUserPreview);
}
},{"../../../View/Components/Preview/userPreview.js":"View/Components/Preview/userPreview.js","../../api/api.js":"Controller/api/api.js"}],"Controller/Components/Preview/0.chooseAudiencePreviewController.js":[function(require,module,exports) {
"use strict";

var _ChooseAudiencePreview = _interopRequireDefault(require("../../../View/Components/Preview/1.ChooseAudiencePreview.js"));

var _twitterCircleModalController = require("../Modal/twitterCircleModalController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var View;
var choose_audience_preview_el = document.querySelector('.preview[data-type="choose-audience"] ');

var control_target_audience = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(action) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(action);
            if (action === 'show-user-cicle') location.assign('/users/circle/my-circle');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function control_target_audience(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (choose_audience_preview_el) {
  View = new _ChooseAudiencePreview.default();
  View.addHandlerChooseAudience(control_target_audience);
}
},{"../../../View/Components/Preview/1.ChooseAudiencePreview.js":"View/Components/Preview/1.ChooseAudiencePreview.js","../Modal/twitterCircleModalController.js":"Controller/Components/Modal/twitterCircleModalController.js"}],"Controller/Components/Preview/1.chooseWhoCanReplyPreviewController.js":[function(require,module,exports) {
"use strict";

var _chooseWhoCanReplyView = _interopRequireDefault(require("../../../View/Components/Preview/2.chooseWhoCanReplyView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var choose_who_can_reply_el = document.querySelector('.preview[data-type="choose-who-can-reply"] ');

var control_audience_can_reply = function control_audience_can_reply(action) {};

if (choose_who_can_reply_el) {
  View = new _chooseWhoCanReplyView.default();
  View.addHandlerChooseWhoCanReply(control_audience_can_reply);
}
},{"../../../View/Components/Preview/2.chooseWhoCanReplyView.js":"View/Components/Preview/2.chooseWhoCanReplyView.js"}],"Controller/Components/Preview/0.main.js":[function(require,module,exports) {
"use strict";

require("./2.userPreviewController.js");

require("./0.chooseAudiencePreviewController.js");

require("./1.chooseWhoCanReplyPreviewController.js");
},{"./2.userPreviewController.js":"Controller/Components/Preview/2.userPreviewController.js","./0.chooseAudiencePreviewController.js":"Controller/Components/Preview/0.chooseAudiencePreviewController.js","./1.chooseWhoCanReplyPreviewController.js":"Controller/Components/Preview/1.chooseWhoCanReplyPreviewController.js"}],"View/Common/AbsDropdownView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AbsDropdownView = /*#__PURE__*/function () {
  function AbsDropdownView() {
    _classCallCheck(this, AbsDropdownView);

    _defineProperty(this, "_topParentEl", void 0);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_dropdownListEl", void 0);
  }

  _createClass(AbsDropdownView, [{
    key: "hide",
    value: // dropdown-list
    function hide() {
      this._parentEl.dataset.active = false;
    }
  }, {
    key: "show",
    value: function show() {
      this._parentEl.dataset.active = true;
    } // display dropdown at dropdown-btn position when clicked and set details attr from target(dropdown-details)

  }, {
    key: "_automatically_display_dropdown",
    value: function _automatically_display_dropdown() {
      var _this = this;

      document.documentElement.addEventListener('click', function (e) {
        // 1.get dropdown class from dropdown-btn and check if it same as givent _parentEl.class
        // 2.if same then display dropdown where dropdown btn is by position the dropdown
        // 3.set details attr from target(dropdown-details)
        var target = e.target;
        if (!target.closest('[data-dropdown-btn]')) return _this.hide(); // 1

        var dropdown_btn = target.closest('button[data-dropdown-btn]');
        var dropdownClass = dropdown_btn.dataset.dropdownClass;
        if (_this._parentEl.getAttribute('data-type') !== dropdownClass) return; // 2

        var _dropdown_btn$getBoun = dropdown_btn.getBoundingClientRect(),
            top = _dropdown_btn$getBoun.top,
            left = _dropdown_btn$getBoun.left,
            width = _dropdown_btn$getBoun.width,
            height = _dropdown_btn$getBoun.height;

        _this._dropdownListEl.style.top = top + height + 'px';
        _this._dropdownListEl.style.left = left - left / 3 + 'px'; // 3.set details attr in dropdown component from target(dropdown-details) i
        // const { postType, postId, postUserName, postUserId } =
        //   dropdown_btn.closest('.dropdown-details').dataset;
        // this._parentEl.post_id = postId;
        // this._parentEl.post_user_id = postUserId;
        // this._parentEl.post_type = postType;
        // this._parentEl.post_user_name = postUserName;

        _this.show();
      });
    }
  }, {
    key: "handle_dropdown_options",
    value: function handle_dropdown_options(handle) {
      var _this2 = this;

      // handle dropdown option
      this._parentEl.addEventListener('click', function (e) {
        var list_item = e.target.closest('.dropdown-item');
        if (!list_item) return; // 0.if dropdown item clicked,pass the value and hide dropdown

        var _this2$_parentEl$data = _this2._parentEl.dataset,
            postId = _this2$_parentEl$data.postId,
            postUserId = _this2$_parentEl$data.postUserId,
            postType = _this2$_parentEl$data.postType,
            postUserName = _this2$_parentEl$data.postUserName;
        var action = list_item.dataset.action;

        _this2.hide();

        return handle(action, {
          post_id: postId,
          post_type: action
        });
      });
    }
  }, {
    key: "addHandlerDropdown",
    value: function addHandlerDropdown(handle) {
      this._automatically_display_dropdown();

      this.handle_dropdown_options(handle);
    }
  }]);

  return AbsDropdownView;
}();

var _default = AbsDropdownView;
exports.default = _default;
},{}],"View/Components/Dropdown/postOptionsDropdownView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbsDropdownView2 = _interopRequireDefault(require("../../Common/AbsDropdownView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PostedTweetOptionsDropdown = /*#__PURE__*/function (_AbsDropdownView) {
  _inherits(PostedTweetOptionsDropdown, _AbsDropdownView);

  var _super = _createSuper(PostedTweetOptionsDropdown);

  function PostedTweetOptionsDropdown() {
    var _this;

    _classCallCheck(this, PostedTweetOptionsDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector('.postedTweet-list'));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.dropdown[data-type="post-options-dropdown"]'));

    _defineProperty(_assertThisInitialized(_this), "_dropdownListEl", _this._parentEl.querySelector('.dropdown-list'));

    return _this;
  }

  return _createClass(PostedTweetOptionsDropdown);
}(_AbsDropdownView2.default);

var _default = PostedTweetOptionsDropdown;
exports.default = _default;
},{"../../Common/AbsDropdownView.js":"View/Common/AbsDropdownView.js"}],"Controller/Components/Dropdown/post_options_controller.js":[function(require,module,exports) {
"use strict";

var _postOptionsDropdownView = _interopRequireDefault(require("../../../View/Components/Dropdown/postOptionsDropdownView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var postDropdownEl = document.querySelector('.dropdown[data-type="post-options-dropdown"]');

var control_tweet_options = function control_tweet_options(action, data) {};

var control_comment_options = function control_comment_options(action, data) {};

var controlPostDropdownOptions = function controlPostDropdownOptions(action, data) {
  var post_type = data.post_type;
  post_type === 'tweet' ? control_tweet_options(action, data) : control_comment_options(action, data);
};

if (postDropdownEl) {
  View = new _postOptionsDropdownView.default();
  View.addHandlerDropdown(controlPostDropdownOptions);
}
},{"../../../View/Components/Dropdown/postOptionsDropdownView.js":"View/Components/Dropdown/postOptionsDropdownView.js"}],"View/Components/Dropdown/RetweetQuotePostDropdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbsDropdownView2 = _interopRequireDefault(require("../../Common/AbsDropdownView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RetweetQuoteTweetDropdown = /*#__PURE__*/function (_AbsDropdownView) {
  _inherits(RetweetQuoteTweetDropdown, _AbsDropdownView);

  var _super = _createSuper(RetweetQuoteTweetDropdown);

  function RetweetQuoteTweetDropdown() {
    var _this;

    _classCallCheck(this, RetweetQuoteTweetDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector('.dropdown[data-type="retweet_quote_post"]'));

    _defineProperty(_assertThisInitialized(_this), "_dropdownListEl", _this._parentEl.querySelector('.dropdown-list'));

    return _this;
  }

  _createClass(RetweetQuoteTweetDropdown, [{
    key: "handle_dropdown_options",
    value: function handle_dropdown_options(handle) {
      var _this2 = this;

      // handle dropdown option
      this._parentEl.addEventListener('click', function (e) {
        var list_item = e.target.closest('.dropdown-item');
        if (!list_item) return; // 0.if dropdown item clicked,pass the value and hide dropdown

        var _this2$_parentEl$data = _this2._parentEl.dataset,
            postId = _this2$_parentEl$data.postId,
            postType = _this2$_parentEl$data.postType;
        var action = list_item.dataset.action;

        _this2.hide();

        return handle(action, {
          post_type: postType,
          tweet_id: postId,
          tweet_type: action
        });
      });
    }
  }]);

  return RetweetQuoteTweetDropdown;
}(_AbsDropdownView2.default);

var _default = RetweetQuoteTweetDropdown;
exports.default = _default;
},{"../../Common/AbsDropdownView.js":"View/Common/AbsDropdownView.js"}],"Controller/Components/Dropdown/retweet_options_controller.js":[function(require,module,exports) {
"use strict";

var _RetweetQuotePostDropdown = _interopRequireDefault(require("../../../View/Components/Dropdown/RetweetQuotePostDropdown.js"));

var _api = require("../../api/api.js");

var _postedTweetController = require("../Tweet/postedTweetController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var retweeetQuoteTweetDropdown = document.querySelector('.dropdown[data-type="retweet_quote_post"]');
var View;

var control_tweet_options = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(action, data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(action === 'retweet')) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return (0, _api.post)('tweets', data);

          case 3:
            res = _context.sent;

            if (res) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            (0, _postedTweetController.update_posted_tweet_btn_count_and_active_state)('retweet', 1, true);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function control_tweet_options(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var control_comment_options = function control_comment_options(action, data) {};

var controlRetweetQuotePostOptions = function controlRetweetQuotePostOptions(action, data) {
  console.log(action, data);
  var post_type = data.post_type;
  post_type === 'tweet' ? control_tweet_options(action, data) : control_comment_options(action, data);
};

if (retweeetQuoteTweetDropdown) {
  View = new _RetweetQuotePostDropdown.default();
  View.addHandlerDropdown(controlRetweetQuotePostOptions);
}
},{"../../../View/Components/Dropdown/RetweetQuotePostDropdown.js":"View/Components/Dropdown/RetweetQuotePostDropdown.js","../../api/api.js":"Controller/api/api.js","../Tweet/postedTweetController.js":"Controller/Components/Tweet/postedTweetController.js"}],"Controller/Components/Dropdown/0.main.js":[function(require,module,exports) {
"use strict";

require("./post_options_controller.js");

require("./retweet_options_controller.js");
},{"./post_options_controller.js":"Controller/Components/Dropdown/post_options_controller.js","./retweet_options_controller.js":"Controller/Components/Dropdown/retweet_options_controller.js"}],"Controller/main.js":[function(require,module,exports) {
"use strict";

require("./Pages/twitterJoinPage.js");

require("./Components/Form/main.js");

require("./Components/Tweet/main.js");

require("./Components/Modal/0.main.js");

require("./Components/Popup/0.main.js");

require("./Components/Preview/0.main.js");

require("./Components/Dropdown/0.main.js");
},{"./Pages/twitterJoinPage.js":"Controller/Pages/twitterJoinPage.js","./Components/Form/main.js":"Controller/Components/Form/main.js","./Components/Tweet/main.js":"Controller/Components/Tweet/main.js","./Components/Modal/0.main.js":"Controller/Components/Modal/0.main.js","./Components/Popup/0.main.js":"Controller/Components/Popup/0.main.js","./Components/Preview/0.main.js":"Controller/Components/Preview/0.main.js","./Components/Dropdown/0.main.js":"Controller/Components/Dropdown/0.main.js"}],"script.js":[function(require,module,exports) {
"use strict";

require("./Controller/main.js");
},{"./Controller/main.js":"Controller/main.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37449" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.js.map