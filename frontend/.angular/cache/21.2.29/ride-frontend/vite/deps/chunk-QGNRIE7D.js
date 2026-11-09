import {
  CommonModule
} from "./chunk-HNTBT5CH.js";
import {
  Component,
  DOCUMENT,
  Directive,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  PLATFORM_ID,
  TemplateRef,
  effect,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-P5ZKPH7L.js";
import {
  Subject
} from "./chunk-GEBJETWL.js";
import {
  __spreadValues
} from "./chunk-75NUGXPU.js";

// node_modules/primeng/node_modules/@primeuix/utils/dist/classnames/index.mjs
function f(...e) {
  if (e) {
    let t2 = [];
    for (let i4 = 0; i4 < e.length; i4++) {
      let n = e[i4];
      if (!n) continue;
      let s5 = typeof n;
      if (s5 === "string" || s5 === "number") t2.push(n);
      else if (s5 === "object") {
        let c4 = Array.isArray(n) ? [f(...n)] : Object.entries(n).map(([r, o]) => o ? r : void 0);
        t2 = c4.length ? t2.concat(c4.filter((r) => !!r)) : t2;
      }
    }
    return t2.join(" ").trim();
  }
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/object/index.mjs
function l(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function b(e, t2, n = /* @__PURE__ */ new WeakSet()) {
  if (e === t2) return true;
  if (!e || !t2 || typeof e != "object" || typeof t2 != "object" || n.has(e) || n.has(t2)) return false;
  n.add(e).add(t2);
  let o = Array.isArray(e), r = Array.isArray(t2), u2, f2, T;
  if (o && r) {
    if (f2 = e.length, f2 != t2.length) return false;
    for (u2 = f2; u2-- !== 0; ) if (!b(e[u2], t2[u2], n)) return false;
    return true;
  }
  if (o != r) return false;
  let S2 = e instanceof Date, A = t2 instanceof Date;
  if (S2 != A) return false;
  if (S2 && A) return e.getTime() == t2.getTime();
  let I = e instanceof RegExp, L = t2 instanceof RegExp;
  if (I != L) return false;
  if (I && L) return e.toString() == t2.toString();
  let F3 = Object.keys(e);
  if (f2 = F3.length, f2 !== Object.keys(t2).length) return false;
  for (u2 = f2; u2-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t2, F3[u2])) return false;
  for (u2 = f2; u2-- !== 0; ) if (T = F3[u2], !b(e[T], t2[T], n)) return false;
  return true;
}
function y(e, t2) {
  return b(e, t2);
}
function c(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function s(e) {
  return !l(e);
}
function p(e, t2) {
  if (!e || !t2) return null;
  try {
    let n = e[t2];
    if (s(n)) return n;
  } catch (n) {
  }
  if (Object.keys(e).length) {
    if (c(t2)) return t2(e);
    if (t2.indexOf(".") === -1) return e[t2];
    {
      let n = t2.split("."), o = e;
      for (let r = 0, u2 = n.length; r < u2; ++r) {
        if (o == null) return null;
        o = o[n[r]];
      }
      return o;
    }
  }
  return null;
}
function k(e, t2, n) {
  return n ? p(e, n) === p(t2, n) : y(e, t2);
}
function i(e, t2 = true) {
  return e instanceof Object && e.constructor === Object && (t2 || Object.keys(e).length !== 0);
}
function m(e, ...t2) {
  return c(e) ? e(...t2) : e;
}
function a(e, t2 = true) {
  return typeof e == "string" && (t2 || e !== "");
}
function g(e) {
  return a(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
}
function R(e, t2 = "", n = {}) {
  let o = g(t2).split("."), r = o.shift();
  if (r) {
    if (i(e)) {
      let u2 = Object.keys(e).find((f2) => g(f2) === r) || "";
      return R(m(e[u2], n), o.join("."), n);
    }
    return;
  }
  return m(e, n);
}
function h(e, t2 = true) {
  return Array.isArray(e) && (t2 || e.length !== 0);
}
function Y(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function X(e) {
  if (e && /[\xC0-\xFF\u0100-\u017E]/.test(e)) {
    let n = { A: /[\xC0-\xC5\u0100\u0102\u0104]/g, AE: /[\xC6]/g, C: /[\xC7\u0106\u0108\u010A\u010C]/g, D: /[\xD0\u010E\u0110]/g, E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g, G: /[\u011C\u011E\u0120\u0122]/g, H: /[\u0124\u0126]/g, I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g, IJ: /[\u0132]/g, J: /[\u0134]/g, K: /[\u0136]/g, L: /[\u0139\u013B\u013D\u013F\u0141]/g, N: /[\xD1\u0143\u0145\u0147\u014A]/g, O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g, OE: /[\u0152]/g, R: /[\u0154\u0156\u0158]/g, S: /[\u015A\u015C\u015E\u0160]/g, T: /[\u0162\u0164\u0166]/g, U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g, W: /[\u0174]/g, Y: /[\xDD\u0176\u0178]/g, Z: /[\u0179\u017B\u017D]/g, a: /[\xE0-\xE5\u0101\u0103\u0105]/g, ae: /[\xE6]/g, c: /[\xE7\u0107\u0109\u010B\u010D]/g, d: /[\u010F\u0111]/g, e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g, g: /[\u011D\u011F\u0121\u0123]/g, i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g, ij: /[\u0133]/g, j: /[\u0135]/g, k: /[\u0137,\u0138]/g, l: /[\u013A\u013C\u013E\u0140\u0142]/g, n: /[\xF1\u0144\u0146\u0148\u014B]/g, p: /[\xFE]/g, o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g, oe: /[\u0153]/g, r: /[\u0155\u0157\u0159]/g, s: /[\u015B\u015D\u015F\u0161]/g, t: /[\u0163\u0165\u0167]/g, u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g, w: /[\u0175]/g, y: /[\xFD\xFF\u0177]/g, z: /[\u017A\u017C\u017E]/g };
    for (let o in n) e = e.replace(n[o], o);
  }
  return e;
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/dom/index.mjs
function p2(t2) {
  return typeof Element != "undefined" ? t2 instanceof Element : t2 !== null && typeof t2 == "object" && t2.nodeType === 1 && typeof t2.nodeName == "string";
}
function O(t2, e = {}) {
  if (p2(t2)) {
    let o = (r, i4) => {
      var a3, l4;
      let s5 = (a3 = t2 == null ? void 0 : t2.$attrs) != null && a3[r] ? [(l4 = t2 == null ? void 0 : t2.$attrs) == null ? void 0 : l4[r]] : [];
      return [i4].flat().reduce((d2, f2) => {
        if (f2 != null) {
          let c4 = typeof f2;
          if (c4 === "string" || c4 === "number") d2.push(f2);
          else if (c4 === "object") {
            let u2 = Array.isArray(f2) ? o(r, f2) : Object.entries(f2).map(([g4, w3]) => r === "style" && (w3 || w3 === 0) ? `${g4.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${w3}` : w3 ? g4 : void 0);
            d2 = u2.length ? d2.concat(u2.filter((g4) => !!g4)) : d2;
          }
        }
        return d2;
      }, s5);
    }, n = (r) => {
      o("style", r).forEach((s5) => {
        let a3 = s5.indexOf(":");
        if (a3 < 0) return;
        let l4 = s5.slice(0, a3).trim(), d2 = s5.slice(a3 + 1).trim();
        l4 && t2.style.setProperty(l4, d2);
      });
    };
    Object.entries(e).forEach(([r, i4]) => {
      if (i4 != null) {
        let s5 = r.match(/^on(.+)/);
        s5 ? t2.addEventListener(s5[1].toLowerCase(), i4) : r === "p-bind" || r === "pBind" ? O(t2, i4) : r === "style" ? (n(i4), (t2.$attrs = t2.$attrs || {}) && (t2.$attrs[r] = t2.style.cssText)) : (i4 = r === "class" ? [...new Set(o("class", i4))].join(" ").trim() : i4, (t2.$attrs = t2.$attrs || {}) && (t2.$attrs[r] = i4), t2.setAttribute(r, i4));
      }
    });
  }
}
function te(t2, e = "", o) {
  if (p2(t2) && o !== null && o !== void 0) {
    if (e === "style") {
      typeof o == "string" ? t2.style.cssText = o : typeof o == "object" && Object.entries(o).forEach(([n, r]) => {
        if (r == null) return;
        let i4 = n.startsWith("--") ? n : n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        t2.style.setProperty(i4, String(r));
      });
      return;
    }
    t2.setAttribute(e, o);
  }
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/mergeprops/index.mjs
var x = Object.defineProperty;
var d = Object.getOwnPropertySymbols;
var c2 = Object.prototype.hasOwnProperty;
var y2 = Object.prototype.propertyIsEnumerable;
var m2 = (t2, r, e) => r in t2 ? x(t2, r, { enumerable: true, configurable: true, writable: true, value: e }) : t2[r] = e;
var u = (t2, r) => {
  for (var e in r || (r = {})) c2.call(r, e) && m2(t2, e, r[e]);
  if (d) for (var e of d(r)) y2.call(r, e) && m2(t2, e, r[e]);
  return t2;
};
function i2(...t2) {
  if (t2) {
    let r = [];
    for (let e = 0; e < t2.length; e++) {
      let a3 = t2[e];
      if (!a3) continue;
      let o = typeof a3;
      if (o === "string" || o === "number") r.push(a3);
      else if (o === "object") {
        let f2 = Array.isArray(a3) ? [i2(...a3)] : Object.entries(a3).map(([s5, n]) => n ? s5 : void 0);
        r = f2.length ? r.concat(f2.filter((s5) => !!s5)) : r;
      }
    }
    return r.join(" ").trim();
  }
}
function l2(t2) {
  return typeof t2 == "function" && "call" in t2 && "apply" in t2;
}
function p3({ skipUndefined: t2 = false }, ...r) {
  return r == null ? void 0 : r.reduce((e, a3 = {}) => {
    for (let o in a3) {
      let f2 = a3[o];
      if (!(t2 && f2 === void 0)) if (o === "style") e.style = u(u({}, e.style), a3.style);
      else if (o === "class" || o === "className") e[o] = i2(e[o], a3[o]);
      else if (l2(f2)) {
        let s5 = e[o];
        e[o] = s5 ? (...n) => {
          s5(...n), f2(...n);
        } : f2;
      } else e[o] = f2;
    }
    return e;
  }, {});
}
function w(...t2) {
  return p3({ skipUndefined: false }, ...t2);
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/uuid/index.mjs
var t = {};
function s2(n = "pui_id_") {
  return Object.hasOwn(t, n) || (t[n] = 0), t[n]++, `${n}${t[n]}`;
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/zindex/index.mjs
function g2() {
  let r = [], i4 = (e, n, t2 = 999) => {
    let s5 = u2(e, n, t2), o = s5.value + (s5.key === e ? 0 : t2) + 1;
    return r.push({ key: e, value: o }), o;
  }, d2 = (e) => {
    r = r.filter((n) => n.value !== e);
  }, a3 = (e, n) => u2(e, n).value, u2 = (e, n, t2 = 0) => [...r].reverse().find((s5) => n ? true : s5.key === e) || { key: e, value: t2 }, l4 = (e) => e && parseInt(e.style.zIndex, 10) || 0;
  return { get: l4, set: (e, n, t2) => {
    n && (n.style.zIndex = String(i4(e, true, t2)));
  }, clear: (e) => {
    e && (d2(l4(e)), e.style.zIndex = "");
  }, getCurrent: (e) => a3(e, true) };
}
var x2 = g2();

// node_modules/primeng/fesm2022/primeng-api.mjs
var _c0 = ["*"];
var ConfirmEventType;
(function(ConfirmEventType2) {
  ConfirmEventType2[ConfirmEventType2["ACCEPT"] = 0] = "ACCEPT";
  ConfirmEventType2[ConfirmEventType2["REJECT"] = 1] = "REJECT";
  ConfirmEventType2[ConfirmEventType2["CANCEL"] = 2] = "CANCEL";
})(ConfirmEventType || (ConfirmEventType = {}));
var ConfirmationService = class _ConfirmationService {
  requireConfirmationSource = new Subject();
  acceptConfirmationSource = new Subject();
  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  accept = this.acceptConfirmationSource.asObservable();
  /**
   * Callback to invoke on confirm.
   * @param {Confirmation} confirmation - Represents a confirmation dialog configuration.
   * @group Method
   */
  confirm(confirmation) {
    this.requireConfirmationSource.next(confirmation);
    return this;
  }
  /**
   * Closes the dialog.
   * @group Method
   */
  close() {
    this.requireConfirmationSource.next(null);
    return this;
  }
  /**
   * Accepts the dialog.
   * @group Method
   */
  onAccept() {
    this.acceptConfirmationSource.next(null);
  }
  static ɵfac = function ConfirmationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmationService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ConfirmationService,
    factory: _ConfirmationService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmationService, [{
    type: Injectable
  }], null, null);
})();
var ContextMenuService = class _ContextMenuService {
  activeItemKeyChange = new Subject();
  activeItemKeyChange$ = this.activeItemKeyChange.asObservable();
  activeItemKey;
  changeKey(key) {
    this.activeItemKey = key;
    this.activeItemKeyChange.next(this.activeItemKey);
  }
  reset() {
    this.activeItemKey = null;
    this.activeItemKeyChange.next(this.activeItemKey);
  }
  static ɵfac = function ContextMenuService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContextMenuService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ContextMenuService,
    factory: _ContextMenuService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuService, [{
    type: Injectable
  }], null, null);
})();
var FilterMatchMode = class {
  static STARTS_WITH = "startsWith";
  static CONTAINS = "contains";
  static NOT_CONTAINS = "notContains";
  static ENDS_WITH = "endsWith";
  static EQUALS = "equals";
  static NOT_EQUALS = "notEquals";
  static IN = "in";
  static LESS_THAN = "lt";
  static LESS_THAN_OR_EQUAL_TO = "lte";
  static GREATER_THAN = "gt";
  static GREATER_THAN_OR_EQUAL_TO = "gte";
  static BETWEEN = "between";
  static IS = "is";
  static IS_NOT = "isNot";
  static BEFORE = "before";
  static AFTER = "after";
  static DATE_IS = "dateIs";
  static DATE_IS_NOT = "dateIsNot";
  static DATE_BEFORE = "dateBefore";
  static DATE_AFTER = "dateAfter";
};
var FilterService = class _FilterService {
  filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    let filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          let fieldValue = p(item, field);
          if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  }
  filters = {
    startsWith: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();
      else if (value == filter) return true;
      else return X(value.toString()).toLocaleLowerCase(filterLocale) == X(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();
      else if (value == filter) return false;
      else return X(value.toString()).toLocaleLowerCase(filterLocale) != X(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    in: (value, filter) => {
      if (filter === void 0 || filter === null || filter.length === 0) {
        return true;
      }
      for (let i4 = 0; i4 < filter.length; i4++) {
        if (k(value, filter[i4])) {
          return true;
        }
      }
      return false;
    },
    between: (value, filter) => {
      if (filter == null || filter[0] == null || filter[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
      else return filter[0] <= value && value <= filter[1];
    },
    lt: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();
      else return value < filter;
    },
    lte: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();
      else return value <= filter;
    },
    gt: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();
      else return value > filter;
    },
    gte: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();
      else return value >= filter;
    },
    is: (value, filter, filterLocale) => {
      return this.filters.equals(value, filter, filterLocale);
    },
    isNot: (value, filter, filterLocale) => {
      return this.filters.notEquals(value, filter, filterLocale);
    },
    before: (value, filter, filterLocale) => {
      return this.filters.lt(value, filter, filterLocale);
    },
    after: (value, filter, filterLocale) => {
      return this.filters.gt(value, filter, filterLocale);
    },
    dateIs: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter.toDateString();
    },
    dateIsNot: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter.toDateString();
    },
    dateBefore: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter.getTime();
    },
    dateAfter: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      value.setHours(0, 0, 0, 0);
      return value.getTime() > filter.getTime();
    }
  };
  register(rule, fn) {
    this.filters[rule] = fn;
  }
  static ɵfac = function FilterService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FilterService,
    factory: _FilterService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var MessageService = class _MessageService {
  messageSource = new Subject();
  clearSource = new Subject();
  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();
  /**
   * Inserts single message.
   * @param {ToastMessageOptions} message - Message to be added.
   * @group Method
   */
  add(message) {
    if (message) {
      this.messageSource.next(message);
    }
  }
  /**
   * Inserts new messages.
   * @param {Message[]} messages - Messages to be added.
   * @group Method
   */
  addAll(messages) {
    if (messages && messages.length) {
      this.messageSource.next(messages);
    }
  }
  /**
   * Clears the message with the given key.
   * @param {string} key - Key of the message to be cleared.
   * @group Method
   */
  clear(key) {
    this.clearSource.next(key || null);
  }
  static ɵfac = function MessageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MessageService,
    factory: _MessageService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageService, [{
    type: Injectable
  }], null, null);
})();
var OverlayService = class _OverlayService {
  clickSource = new Subject();
  parentDragSource = new Subject();
  clickObservable = this.clickSource.asObservable();
  parentDragObservable = this.parentDragSource.asObservable();
  add(event) {
    if (event) {
      this.clickSource.next(event);
    }
  }
  emitParentDrag(container) {
    this.parentDragSource.next(container);
  }
  static ɵfac = function OverlayService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _OverlayService,
    factory: _OverlayService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var Header = class _Header {
  static ɵfac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Header,
    selectors: [["p-header"]],
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Header_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{
      selector: "p-header",
      template: "<ng-content></ng-content>",
      standalone: false
    }]
  }], null, null);
})();
var Footer = class _Footer {
  static ɵfac = function Footer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Footer)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Footer,
    selectors: [["p-footer"]],
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Footer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Footer, [{
    type: Component,
    args: [{
      selector: "p-footer",
      template: "<ng-content></ng-content>",
      standalone: false
    }]
  }], null, null);
})();
var PrimeTemplate = class _PrimeTemplate {
  template;
  type;
  name;
  constructor(template) {
    this.template = template;
  }
  getType() {
    return this.name;
  }
  static ɵfac = function PrimeTemplate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PrimeTemplate)(ɵɵdirectiveInject(TemplateRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _PrimeTemplate,
    selectors: [["", "pTemplate", ""]],
    inputs: {
      type: "type",
      name: [0, "pTemplate", "name"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeTemplate, [{
    type: Directive,
    args: [{
      selector: "[pTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], {
    type: [{
      type: Input
    }],
    name: [{
      type: Input,
      args: ["pTemplate"]
    }]
  });
})();
var SharedModule = class _SharedModule {
  static ɵfac = function SharedModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _SharedModule,
    declarations: [Header, Footer],
    imports: [CommonModule, PrimeTemplate],
    exports: [Header, Footer, PrimeTemplate]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, PrimeTemplate],
      exports: [Header, Footer, PrimeTemplate],
      declarations: [Header, Footer]
    }]
  }], null, null);
})();
var TreeDragDropService = class _TreeDragDropService {
  dragStartSource = new Subject();
  dragStopSource = new Subject();
  dragStart$ = this.dragStartSource.asObservable();
  dragStop$ = this.dragStopSource.asObservable();
  startDrag(event) {
    this.dragStartSource.next(event);
  }
  stopDrag(event) {
    this.dragStopSource.next(event);
  }
  static ɵfac = function TreeDragDropService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TreeDragDropService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _TreeDragDropService,
    factory: _TreeDragDropService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeDragDropService, [{
    type: Injectable
  }], null, null);
})();

// node_modules/primeng/node_modules/@primeuix/styled/node_modules/@primeuix/utils/dist/object/index.mjs
function l3(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function c3(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function s3(e) {
  return !l3(e);
}
function i3(e, t2 = true) {
  return e instanceof Object && e.constructor === Object && (t2 || Object.keys(e).length !== 0);
}
function m3(e, ...t2) {
  return c3(e) ? e(...t2) : e;
}
function a2(e, t2 = true) {
  return typeof e == "string" && (t2 || e !== "");
}
function z(e) {
  return s3(e) && !isNaN(e);
}
function G(e, t2) {
  if (t2) {
    let n = t2.test(e);
    return t2.lastIndex = 0, n;
  }
  return false;
}
function Y2(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function re(e) {
  return a2(e) ? e.replace(/(_)/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : e;
}

// node_modules/primeng/node_modules/@primeuix/styled/node_modules/@primeuix/utils/dist/eventbus/index.mjs
function s4() {
  let r = /* @__PURE__ */ new Map();
  return { on(e, t2) {
    let n = r.get(e);
    return n ? n.push(t2) : n = [t2], r.set(e, n), this;
  }, off(e, t2) {
    let n = r.get(e);
    return n && n.splice(n.indexOf(t2) >>> 0, 1), this;
  }, emit(e, t2) {
    let n = r.get(e);
    n && n.forEach((i4) => {
      i4(t2);
    });
  }, clear() {
    r.clear();
  } };
}

// node_modules/primeng/node_modules/@primeuix/styled/node_modules/@primeuix/utils/dist/zindex/index.mjs
function g3() {
  let r = [], i4 = (e, n, t2 = 999) => {
    let s5 = u2(e, n, t2), o = s5.value + (s5.key === e ? 0 : t2) + 1;
    return r.push({ key: e, value: o }), o;
  }, d2 = (e) => {
    r = r.filter((n) => n.value !== e);
  }, a3 = (e, n) => u2(e, n).value, u2 = (e, n, t2 = 0) => [...r].reverse().find((s5) => n ? true : s5.key === e) || { key: e, value: t2 }, l4 = (e) => e && parseInt(e.style.zIndex, 10) || 0;
  return { get: l4, set: (e, n, t2) => {
    n && (n.style.zIndex = String(i4(e, true, t2)));
  }, clear: (e) => {
    e && (d2(l4(e)), e.style.zIndex = "");
  }, getCurrent: (e) => a3(e, true) };
}
var x3 = g3();

// node_modules/primeng/node_modules/@primeuix/styled/dist/index.mjs
var rt = Object.defineProperty;
var st = Object.defineProperties;
var nt = Object.getOwnPropertyDescriptors;
var F2 = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty;
var be = Object.prototype.propertyIsEnumerable;
var _e = (e, t2, r) => t2 in e ? rt(e, t2, { enumerable: true, configurable: true, writable: true, value: r }) : e[t2] = r;
var h2 = (e, t2) => {
  for (var r in t2 || (t2 = {})) xe.call(t2, r) && _e(e, r, t2[r]);
  if (F2) for (var r of F2(t2)) be.call(t2, r) && _e(e, r, t2[r]);
  return e;
};
var $ = (e, t2) => st(e, nt(t2));
var v = (e, t2) => {
  var r = {};
  for (var s5 in e) xe.call(e, s5) && t2.indexOf(s5) < 0 && (r[s5] = e[s5]);
  if (e != null && F2) for (var s5 of F2(e)) t2.indexOf(s5) < 0 && be.call(e, s5) && (r[s5] = e[s5]);
  return r;
};
var at = s4();
var N = at;
var k2 = /{([^}]*)}/g;
var ne = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
var ie = /var\([^)]+\)/g;
function oe(e) {
  return a2(e) ? e.replace(/[A-Z]/g, (t2, r) => r === 0 ? t2 : "." + t2.toLowerCase()).toLowerCase() : e;
}
function ve(e) {
  return i3(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function dt(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q(e = "", t2 = "") {
  return dt(`${a2(e, false) && a2(t2, false) ? `${e}-` : e}${t2}`);
}
function ae(e = "", t2 = "") {
  return `--${Q(e, t2)}`;
}
function ht(e = "") {
  let t2 = (e.match(/{/g) || []).length, r = (e.match(/}/g) || []).length;
  return (t2 + r) % 2 !== 0;
}
function Y3(e, t2 = "", r = "", s5 = [], i4) {
  if (a2(e)) {
    let a3 = e.trim();
    if (ht(a3)) return;
    if (G(a3, k2)) {
      let n = a3.replaceAll(k2, (l4) => {
        let c4 = l4.replace(/{|}/g, "").split(".").filter((m4) => !s5.some((d2) => G(m4, d2)));
        return `var(${ae(r, re(c4.join("-")))}${s3(i4) ? `, ${i4}` : ""})`;
      });
      return G(n.replace(ie, "0"), ne) ? `calc(${n})` : n;
    }
    return a3;
  } else if (z(e)) return e;
}
function Re(e, t2, r) {
  a2(t2, false) && e.push(`${t2}:${r};`);
}
function C2(e, t2) {
  return e ? `${e}{${t2}}` : "";
}
function le(e, t2) {
  if (e.indexOf("dt(") === -1) return e;
  function r(n, l4) {
    let o = [], c4 = 0, m4 = "", d2 = null, u2 = 0;
    for (; c4 <= n.length; ) {
      let g4 = n[c4];
      if ((g4 === '"' || g4 === "'" || g4 === "`") && n[c4 - 1] !== "\\" && (d2 = d2 === g4 ? null : g4), !d2 && (g4 === "(" && u2++, g4 === ")" && u2--, (g4 === "," || c4 === n.length) && u2 === 0)) {
        let f2 = m4.trim();
        f2.startsWith("dt(") ? o.push(le(f2, l4)) : o.push(s5(f2)), m4 = "", c4++;
        continue;
      }
      g4 !== void 0 && (m4 += g4), c4++;
    }
    return o;
  }
  function s5(n) {
    let l4 = n[0];
    if ((l4 === '"' || l4 === "'" || l4 === "`") && n[n.length - 1] === l4) return n.slice(1, -1);
    let o = Number(n);
    return isNaN(o) ? n : o;
  }
  let i4 = [], a3 = [];
  for (let n = 0; n < e.length; n++) if (e[n] === "d" && e.slice(n, n + 3) === "dt(") a3.push(n), n += 2;
  else if (e[n] === ")" && a3.length > 0) {
    let l4 = a3.pop();
    a3.length === 0 && i4.push([l4, n]);
  }
  if (!i4.length) return e;
  for (let n = i4.length - 1; n >= 0; n--) {
    let [l4, o] = i4[n], c4 = e.slice(l4 + 3, o), m4 = r(c4, t2), d2 = t2(...m4);
    e = e.slice(0, l4) + d2 + e.slice(o + 1);
  }
  return e;
}
var E = (...e) => ue(S.getTheme(), ...e);
var ue = (e = {}, t2, r, s5) => {
  if (t2) {
    let { variable: i4, options: a3 } = S.defaults || {}, { prefix: n, transform: l4 } = (e == null ? void 0 : e.options) || a3 || {}, o = G(t2, k2) ? t2 : `{${t2}}`;
    return s5 === "value" || l3(s5) && l4 === "strict" ? S.getTokenValue(t2) : Y3(o, void 0, n, [i4.excludedKeyRegex], r);
  }
  return "";
};
function ar(e, ...t2) {
  if (e instanceof Array) {
    let r = e.reduce((s5, i4, a3) => {
      var n;
      return s5 + i4 + ((n = m3(t2[a3], { dt: E })) != null ? n : "");
    }, "");
    return le(r, E);
  }
  return m3(e, { dt: E });
}
function de(e, t2 = {}) {
  let r = S.defaults.variable, { prefix: s5 = r.prefix, selector: i4 = r.selector, excludedKeyRegex: a3 = r.excludedKeyRegex } = t2, n = [], l4 = [], o = [{ node: e, path: s5 }];
  for (; o.length; ) {
    let { node: m4, path: d2 } = o.pop();
    for (let u2 in m4) {
      let g4 = m4[u2], f2 = ve(g4), p4 = G(u2, a3) ? Q(d2) : Q(d2, re(u2));
      if (i3(f2)) o.push({ node: f2, path: p4 });
      else {
        let y3 = ae(p4), R2 = Y3(f2, p4, s5, [a3]);
        Re(l4, y3, R2);
        let T = p4;
        s5 && T.startsWith(s5 + "-") && (T = T.slice(s5.length + 1)), n.push(T.replace(/-/g, "."));
      }
    }
  }
  let c4 = l4.join("");
  return { value: l4, tokens: n, declarations: c4, css: C2(i4, c4) };
}
var b2 = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e},:host${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: true };
} } }, resolve(e) {
  let t2 = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
  return [e].flat().map((r) => {
    var s5;
    return (s5 = t2.map((i4) => i4.resolve(r)).find((i4) => i4.matched)) != null ? s5 : this.rules.custom.resolve(r);
  });
} }, _toVariables(e, t2) {
  return de(e, { prefix: t2 == null ? void 0 : t2.prefix });
}, getCommon({ name: e = "", theme: t2 = {}, params: r, set: s5, defaults: i4 }) {
  var R2, T, j, O2, M, z2, V;
  let { preset: a3, options: n } = t2, l4, o, c4, m4, d2, u2, g4;
  if (s3(a3) && n.transform !== "strict") {
    let { primitive: L, semantic: te2, extend: re2 } = a3, f2 = te2 || {}, { colorScheme: K } = f2, A = v(f2, ["colorScheme"]), x4 = re2 || {}, { colorScheme: X2 } = x4, G2 = v(x4, ["colorScheme"]), p4 = K || {}, { dark: U } = p4, B = v(p4, ["dark"]), y3 = X2 || {}, { dark: I } = y3, H2 = v(y3, ["dark"]), W = s3(L) ? this._toVariables({ primitive: L }, n) : {}, q2 = s3(A) ? this._toVariables({ semantic: A }, n) : {}, Z = s3(B) ? this._toVariables({ light: B }, n) : {}, pe = s3(U) ? this._toVariables({ dark: U }, n) : {}, fe = s3(G2) ? this._toVariables({ semantic: G2 }, n) : {}, ye = s3(H2) ? this._toVariables({ light: H2 }, n) : {}, Se = s3(I) ? this._toVariables({ dark: I }, n) : {}, [Me, ze] = [(R2 = W.declarations) != null ? R2 : "", W.tokens], [Ke, Xe] = [(T = q2.declarations) != null ? T : "", q2.tokens || []], [Ge, Ue] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Be, Ie] = [(O2 = pe.declarations) != null ? O2 : "", pe.tokens || []], [He, We] = [(M = fe.declarations) != null ? M : "", fe.tokens || []], [qe, Ze] = [(z2 = ye.declarations) != null ? z2 : "", ye.tokens || []], [Fe, Je] = [(V = Se.declarations) != null ? V : "", Se.tokens || []];
    l4 = this.transformCSS(e, Me, "light", "variable", n, s5, i4), o = ze;
    let Qe = this.transformCSS(e, `${Ke}${Ge}`, "light", "variable", n, s5, i4), Ye = this.transformCSS(e, `${Be}`, "dark", "variable", n, s5, i4);
    c4 = `${Qe}${Ye}`, m4 = [.../* @__PURE__ */ new Set([...Xe, ...Ue, ...Ie])];
    let et = this.transformCSS(e, `${He}${qe}color-scheme:light`, "light", "variable", n, s5, i4), tt = this.transformCSS(e, `${Fe}color-scheme:dark`, "dark", "variable", n, s5, i4);
    d2 = `${et}${tt}`, u2 = [.../* @__PURE__ */ new Set([...We, ...Ze, ...Je])], g4 = m3(a3.css, { dt: E });
  }
  return { primitive: { css: l4, tokens: o }, semantic: { css: c4, tokens: m4 }, global: { css: d2, tokens: u2 }, style: g4 };
}, getPreset({ name: e = "", preset: t2 = {}, options: r, params: s5, set: i4, defaults: a3, selector: n }) {
  var f2, x4, p4;
  let l4, o, c4;
  if (s3(t2) && r.transform !== "strict") {
    let y3 = e.replace("-directive", ""), m4 = t2, { colorScheme: R2, extend: T, css: j } = m4, O2 = v(m4, ["colorScheme", "extend", "css"]), d2 = T || {}, { colorScheme: M } = d2, z2 = v(d2, ["colorScheme"]), u2 = R2 || {}, { dark: V } = u2, L = v(u2, ["dark"]), g4 = M || {}, { dark: te2 } = g4, re2 = v(g4, ["dark"]), K = s3(O2) ? this._toVariables({ [y3]: h2(h2({}, O2), z2) }, r) : {}, A = s3(L) ? this._toVariables({ [y3]: h2(h2({}, L), re2) }, r) : {}, X2 = s3(V) ? this._toVariables({ [y3]: h2(h2({}, V), te2) }, r) : {}, [G2, U] = [(f2 = K.declarations) != null ? f2 : "", K.tokens || []], [B, I] = [(x4 = A.declarations) != null ? x4 : "", A.tokens || []], [H2, W] = [(p4 = X2.declarations) != null ? p4 : "", X2.tokens || []], q2 = this.transformCSS(y3, `${G2}${B}`, "light", "variable", r, i4, a3, n), Z = this.transformCSS(y3, H2, "dark", "variable", r, i4, a3, n);
    l4 = `${q2}${Z}`, o = [.../* @__PURE__ */ new Set([...U, ...I, ...W])], c4 = m3(j, { dt: E });
  }
  return { css: l4, tokens: o, style: c4 };
}, getPresetC({ name: e = "", theme: t2 = {}, params: r, set: s5, defaults: i4 }) {
  var o;
  let { preset: a3, options: n } = t2, l4 = (o = a3 == null ? void 0 : a3.components) == null ? void 0 : o[e];
  return this.getPreset({ name: e, preset: l4, options: n, params: r, set: s5, defaults: i4 });
}, getPresetD({ name: e = "", theme: t2 = {}, params: r, set: s5, defaults: i4 }) {
  var c4, m4;
  let a3 = e.replace("-directive", ""), { preset: n, options: l4 } = t2, o = ((c4 = n == null ? void 0 : n.components) == null ? void 0 : c4[a3]) || ((m4 = n == null ? void 0 : n.directives) == null ? void 0 : m4[a3]);
  return this.getPreset({ name: a3, preset: o, options: l4, params: r, set: s5, defaults: i4 });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
}, getColorSchemeOption(e, t2) {
  var r;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t2.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t2.options.darkModeSelector) : [];
}, getLayerOrder(e, t2 = {}, r, s5) {
  let { cssLayer: i4 } = t2;
  return i4 ? `@layer ${m3(i4.order || i4.name || "primeui", r)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t2 = {}, params: r, props: s5 = {}, set: i4, defaults: a3 }) {
  let n = this.getCommon({ name: e, theme: t2, params: r, set: i4, defaults: a3 }), l4 = Object.entries(s5).reduce((o, [c4, m4]) => o.push(`${c4}="${m4}"`) && o, []).join(" ");
  return Object.entries(n || {}).reduce((o, [c4, m4]) => {
    if (i3(m4) && Object.hasOwn(m4, "css")) {
      let d2 = Y2(m4.css), u2 = `${c4}-variables`;
      o.push(`<style type="text/css" data-primevue-style-id="${u2}" ${l4}>${d2}</style>`);
    }
    return o;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t2 = {}, params: r, props: s5 = {}, set: i4, defaults: a3 }) {
  var c4;
  let n = { name: e, theme: t2, params: r, set: i4, defaults: a3 }, l4 = (c4 = e.includes("-directive") ? this.getPresetD(n) : this.getPresetC(n)) == null ? void 0 : c4.css, o = Object.entries(s5).reduce((m4, [d2, u2]) => m4.push(`${d2}="${u2}"`) && m4, []).join(" ");
  return l4 ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${o}>${Y2(l4)}</style>` : "";
}, createTokens(e = {}, t2, r = "", s5 = "", i4 = {}) {
  let a3 = function(l4, o = {}, c4 = []) {
    if (c4.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), { colorScheme: l4, path: this.path, paths: o, value: void 0 };
    c4.push(this.path), o.name = this.path, o.binding || (o.binding = {});
    let m4 = this.value;
    if (typeof this.value == "string" && k2.test(this.value)) {
      let u2 = this.value.trim().replace(k2, (g4) => {
        var y3;
        let f2 = g4.slice(1, -1), x4 = this.tokens[f2];
        if (!x4) return console.warn(`Token not found for path: ${f2}`), "__UNRESOLVED__";
        let p4 = x4.computed(l4, o, c4);
        return Array.isArray(p4) && p4.length === 2 ? `light-dark(${p4[0].value},${p4[1].value})` : (y3 = p4 == null ? void 0 : p4.value) != null ? y3 : "__UNRESOLVED__";
      });
      m4 = ne.test(u2.replace(ie, "0")) ? `calc(${u2})` : u2;
    }
    return l3(o.binding) && delete o.binding, c4.pop(), { colorScheme: l4, path: this.path, paths: o, value: m4.includes("__UNRESOLVED__") ? void 0 : m4 };
  }, n = (l4, o, c4) => {
    Object.entries(l4).forEach(([m4, d2]) => {
      let u2 = G(m4, t2.variable.excludedKeyRegex) ? o : o ? `${o}.${oe(m4)}` : oe(m4), g4 = c4 ? `${c4}.${m4}` : m4;
      i3(d2) ? n(d2, u2, g4) : (i4[u2] || (i4[u2] = { paths: [], computed: (f2, x4 = {}, p4 = []) => {
        if (i4[u2].paths.length === 1) return i4[u2].paths[0].computed(i4[u2].paths[0].scheme, x4.binding, p4);
        if (f2 && f2 !== "none") for (let y3 = 0; y3 < i4[u2].paths.length; y3++) {
          let R2 = i4[u2].paths[y3];
          if (R2.scheme === f2) return R2.computed(f2, x4.binding, p4);
        }
        return i4[u2].paths.map((y3) => y3.computed(y3.scheme, x4[y3.scheme], p4));
      } }), i4[u2].paths.push({ path: g4, value: d2, scheme: g4.includes("colorScheme.light") ? "light" : g4.includes("colorScheme.dark") ? "dark" : "none", computed: a3, tokens: i4 }));
    });
  };
  return n(e, r, s5), i4;
}, getTokenValue(e, t2, r) {
  var l4;
  let i4 = ((o) => o.split(".").filter((m4) => !G(m4.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t2), a3 = t2.includes("colorScheme.light") ? "light" : t2.includes("colorScheme.dark") ? "dark" : void 0, n = [(l4 = e[i4]) == null ? void 0 : l4.computed(a3)].flat().filter((o) => o);
  return n.length === 1 ? n[0].value : n.reduce((o = {}, c4) => {
    let u2 = c4, { colorScheme: m4 } = u2, d2 = v(u2, ["colorScheme"]);
    return o[m4] = d2, o;
  }, void 0);
}, getSelectorRule(e, t2, r, s5) {
  return r === "class" || r === "attr" ? C2(s3(t2) ? `${e}${t2},${e} ${t2}` : e, s5) : C2(e, C2(t2 != null ? t2 : ":root,:host", s5));
}, transformCSS(e, t2, r, s5, i4 = {}, a3, n, l4) {
  if (s3(t2)) {
    let { cssLayer: o } = i4;
    if (s5 !== "style") {
      let c4 = this.getColorSchemeOption(i4, n);
      t2 = r === "dark" ? c4.reduce((m4, { type: d2, selector: u2 }) => (s3(u2) && (m4 += u2.includes("[CSS]") ? u2.replace("[CSS]", t2) : this.getSelectorRule(u2, l4, d2, t2)), m4), "") : C2(l4 != null ? l4 : ":root,:host", t2);
    }
    if (o) {
      let c4 = { name: "primeui", order: "primeui" };
      i3(o) && (c4.name = m3(o.name, { name: e, type: s5 })), s3(c4.name) && (t2 = C2(`@layer ${c4.name}`, t2), a3 == null || a3.layerNames(c4.name));
    }
    return t2;
  }
  return "";
} };
var S = { defaults: { variable: { prefix: "p", selector: ":root,:host", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t2 } = e;
  t2 && (this._theme = $(h2({}, t2), { options: h2(h2({}, this.defaults.options), t2.options) }), this._tokens = b2.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.preset) || {};
}, get options() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e) {
  this.update({ theme: e }), N.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = $(h2({}, this.theme), { preset: e }), this._tokens = b2.createTokens(e, this.defaults), this.clearLoadedStyleNames(), N.emit("preset:change", e), N.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = $(h2({}, this.theme), { options: e }), this.clearLoadedStyleNames(), N.emit("options:change", e), N.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e) {
  this._layerNames.add(e);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e) {
  return this._loadedStyleNames.has(e);
}, setLoadedStyleName(e) {
  this._loadedStyleNames.add(e);
}, deleteLoadedStyleName(e) {
  this._loadedStyleNames.delete(e);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e) {
  return b2.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t2) {
  return b2.getCommon({ name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t2) {
  let r = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b2.getPresetC(r);
}, getDirective(e = "", t2) {
  let r = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b2.getPresetD(r);
}, getCustomPreset(e = "", t2, r, s5) {
  let i4 = { name: e, preset: t2, options: this.options, selector: r, params: s5, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b2.getPreset(i4);
}, getLayerOrderCSS(e = "") {
  return b2.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t2, r = "style", s5) {
  return b2.transformCSS(e, t2, s5, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t2, r = {}) {
  return b2.getCommonStyleSheet({ name: e, theme: this.theme, params: t2, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t2, r = {}) {
  return b2.getStyleSheet({ name: e, theme: this.theme, params: t2, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t2 }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t2), N.emit(`theme:${t2}:load`, e), !this._loadingStyles.size && N.emit("theme:load"));
} };

// node_modules/@primeuix/styles/dist/base/index.mjs
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    .p-collapsible-enter-active {\n        animation: p-animate-collapsible-expand 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    .p-collapsible-leave-active {\n        animation: p-animate-collapsible-collapse 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-collapsible-expand {\n        from {\n            grid-template-rows: 0fr;\n        }\n        to {\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-collapsible-collapse {\n        from {\n            grid-template-rows: 1fr;\n        }\n        to {\n            grid-template-rows: 0fr;\n        }\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: var(--px-mask-background, dt('mask.background'));\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter-active {\n        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave-active {\n        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-animate-overlay-mask-enter {\n        from {\n            background: transparent;\n        }\n        to {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n    }\n    @keyframes p-animate-overlay-mask-leave {\n        from {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n        to {\n            background: transparent;\n        }\n    }\n\n    .p-anchored-overlay-enter-active {\n        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-anchored-overlay-leave-active {\n        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    @keyframes p-animate-anchored-overlay-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-anchored-overlay-leave {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-usestyle.mjs
var _id = 0;
var UseStyle = class _UseStyle {
  document = inject(DOCUMENT);
  use(css2, options = {}) {
    let isLoaded = false;
    let cssRef = css2;
    let styleRef = null;
    const {
      immediate = true,
      manual = false,
      name = `style_${++_id}`,
      id = void 0,
      media = void 0,
      nonce = void 0,
      first = false,
      props = {}
    } = options;
    if (!this.document) return;
    styleRef = this.document.querySelector(`style[data-primeng-style-id="${name}"]`) || id && this.document.getElementById(id) || this.document.createElement("style");
    if (styleRef) {
      if (!styleRef.isConnected) {
        cssRef = css2;
        const HEAD = this.document.head;
        te(styleRef, "nonce", nonce);
        first && HEAD.firstChild ? HEAD.insertBefore(styleRef, HEAD.firstChild) : HEAD.appendChild(styleRef);
        O(styleRef, {
          type: "text/css",
          media,
          nonce,
          "data-primeng-style-id": name
        });
      }
      if (styleRef.textContent !== cssRef) {
        styleRef.textContent = cssRef;
      }
    }
    return {
      id,
      name,
      el: styleRef,
      css: cssRef
    };
  }
  static ɵfac = function UseStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UseStyle)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _UseStyle,
    factory: _UseStyle.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-base.mjs
var base = {
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded(name) {
    return this._loadedStyleNames.has(name);
  },
  setLoadedStyleName(name) {
    this._loadedStyleNames.add(name);
  },
  deleteLoadedStyleName(name) {
    this._loadedStyleNames.delete(name);
  },
  clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  }
};
var css = (
  /*css*/
  `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: dt('scrollbar.width');
}
`
);
var BaseStyle = class _BaseStyle {
  name = "base";
  useStyle = inject(UseStyle);
  css = void 0;
  style = void 0;
  classes = {};
  inlineStyles = {};
  load = (style2, options = {}, transform = (cs) => cs) => {
    const computedStyle = transform(ar`${m(style2, {
      dt: E
    })}`);
    return computedStyle ? this.useStyle.use(Y(computedStyle), __spreadValues({
      name: this.name
    }, options)) : {};
  };
  loadCSS = (options = {}) => {
    return this.load(this.css, options);
  };
  loadStyle = (options = {}, style2 = "") => {
    return this.load(this.style, options, (computedStyle = "") => S.transformCSS(options.name || this.name, `${computedStyle}${ar`${style2}`}`));
  };
  loadBaseCSS = (options = {}) => {
    return this.load(css, options);
  };
  loadBaseStyle = (options = {}, style$1 = "") => {
    return this.load(style, options, (computedStyle = "") => S.transformCSS(options.name || this.name, `${computedStyle}${ar`${style$1}`}`));
  };
  getCommonTheme = (params) => {
    return S.getCommon(this.name, params);
  };
  getComponentTheme = (params) => {
    return S.getComponent(this.name, params);
  };
  getPresetTheme = (preset, selector, params) => {
    return S.getCustomPreset(this.name, preset, selector, params);
  };
  getLayerOrderThemeCSS = () => {
    return S.getLayerOrderCSS(this.name);
  };
  getStyleSheet = (extendedCSS = "", props = {}) => {
    if (this.css) {
      const _css = m(this.css, {
        dt: E
      });
      const _style = Y(ar`${_css}${extendedCSS}`);
      const _props = Object.entries(props).reduce((acc, [k3, v2]) => acc.push(`${k3}="${v2}"`) && acc, []).join(" ");
      return `<style type="text/css" data-primeng-style-id="${this.name}" ${_props}>${_style}</style>`;
    }
    return "";
  };
  getCommonThemeStyleSheet = (params, props = {}) => {
    return S.getCommonStyleSheet(this.name, params, props);
  };
  getThemeStyleSheet = (params, props = {}) => {
    let css2 = [S.getStyleSheet(this.name, params, props)];
    if (this.style) {
      const name = this.name === "base" ? "global-style" : `${this.name}-style`;
      const _css = ar`${m(this.style, {
        dt: E
      })}`;
      const _style = Y(S.transformCSS(name, _css));
      const _props = Object.entries(props).reduce((acc, [k3, v2]) => acc.push(`${k3}="${v2}"`) && acc, []).join(" ");
      css2.push(`<style type="text/css" data-primeng-style-id="${name}" ${_props}>${_style}</style>`);
    }
    return css2.join("");
  };
  static ɵfac = function BaseStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseStyle)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _BaseStyle,
    factory: _BaseStyle.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-config.mjs
var ThemeProvider = class _ThemeProvider {
  // @todo define type for theme
  theme = signal(void 0, ...ngDevMode ? [{
    debugName: "theme"
  }] : (
    /* istanbul ignore next */
    []
  ));
  csp = signal({
    nonce: void 0
  }, ...ngDevMode ? [{
    debugName: "csp"
  }] : (
    /* istanbul ignore next */
    []
  ));
  isThemeChanged = false;
  document = inject(DOCUMENT);
  baseStyle = inject(BaseStyle);
  constructor() {
    effect(() => {
      N.on("theme:change", (newTheme) => {
        untracked(() => {
          this.isThemeChanged = true;
          this.theme.set(newTheme);
        });
      });
    });
    effect(() => {
      const themeValue = this.theme();
      if (this.document && themeValue) {
        if (!this.isThemeChanged) {
          this.onThemeChange(themeValue);
        }
        this.isThemeChanged = false;
      }
    });
  }
  ngOnDestroy() {
    S.clearLoadedStyleNames();
    N.clear();
  }
  onThemeChange(value) {
    S.setTheme(value);
    if (this.document) {
      this.loadCommonTheme();
    }
  }
  loadCommonTheme() {
    if (this.theme() === "none") return;
    if (!S.isStyleNameLoaded("common")) {
      const {
        primitive,
        semantic,
        global,
        style: style2
      } = this.baseStyle.getCommonTheme?.() || {};
      const styleOptions = {
        nonce: this.csp?.()?.nonce
      };
      this.baseStyle.load(primitive?.css, __spreadValues({
        name: "primitive-variables"
      }, styleOptions));
      this.baseStyle.load(semantic?.css, __spreadValues({
        name: "semantic-variables"
      }, styleOptions));
      this.baseStyle.load(global?.css, __spreadValues({
        name: "global-variables"
      }, styleOptions));
      this.baseStyle.loadBaseStyle(__spreadValues({
        name: "global-style"
      }, styleOptions), style2);
      S.setLoadedStyleName("common");
    }
  }
  setThemeConfig(config) {
    const {
      theme,
      csp
    } = config || {};
    if (theme) this.theme.set(theme);
    if (csp) this.csp.set(csp);
  }
  static ɵfac = function ThemeProvider_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeProvider)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ThemeProvider,
    factory: _ThemeProvider.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeProvider, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var PrimeNG = class _PrimeNG extends ThemeProvider {
  ripple = signal(false, ...ngDevMode ? [{
    debugName: "ripple"
  }] : (
    /* istanbul ignore next */
    []
  ));
  platformId = inject(PLATFORM_ID);
  /**
   * @deprecated Since v20. Use `inputVariant` instead.
   */
  inputStyle = signal(null, ...ngDevMode ? [{
    debugName: "inputStyle"
  }] : (
    /* istanbul ignore next */
    []
  ));
  inputVariant = signal(null, ...ngDevMode ? [{
    debugName: "inputVariant"
  }] : (
    /* istanbul ignore next */
    []
  ));
  overlayAppendTo = signal("self", ...ngDevMode ? [{
    debugName: "overlayAppendTo"
  }] : (
    /* istanbul ignore next */
    []
  ));
  overlayOptions = {};
  csp = signal({
    nonce: void 0
  }, ...ngDevMode ? [{
    debugName: "csp"
  }] : (
    /* istanbul ignore next */
    []
  ));
  unstyled = signal(void 0, ...ngDevMode ? [{
    debugName: "unstyled"
  }] : (
    /* istanbul ignore next */
    []
  ));
  pt = signal(void 0, ...ngDevMode ? [{
    debugName: "pt"
  }] : (
    /* istanbul ignore next */
    []
  ));
  ptOptions = signal(void 0, ...ngDevMode ? [{
    debugName: "ptOptions"
  }] : (
    /* istanbul ignore next */
    []
  ));
  filterMatchModeOptions = {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  };
  translation = {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    is: "Is",
    isNot: "Is not",
    before: "Before",
    after: "After",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    completed: "Completed",
    upload: "Upload",
    cancel: "Cancel",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    dateFormat: "mm/dd/yy",
    firstDayOfWeek: 0,
    today: "Today",
    weekHeader: "Wk",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyMessage: "No results found",
    searchMessage: "Search results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyFilterMessage: "No results found",
    fileChosenMessage: "Files",
    noFileChosenMessage: "No file chosen",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "{page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      previousPageLabel: "Previous Page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List",
      selectColor: "Select a color",
      removeLabel: "Remove",
      browseFiles: "Browse Files",
      maximizeLabel: "Maximize",
      minimizeLabel: "Minimize"
    }
  };
  zIndex = {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  };
  translationSource = new Subject();
  translationObserver = this.translationSource.asObservable();
  getTranslation(key) {
    return this.translation[key];
  }
  setTranslation(value) {
    this.translation = __spreadValues(__spreadValues({}, this.translation), value);
    this.translationSource.next(this.translation);
  }
  setConfig(config) {
    const {
      csp,
      ripple,
      inputStyle,
      inputVariant,
      theme,
      overlayOptions,
      translation,
      filterMatchModeOptions,
      overlayAppendTo,
      zIndex,
      ptOptions,
      pt,
      unstyled
    } = config || {};
    if (csp) this.csp.set(csp);
    if (overlayAppendTo) this.overlayAppendTo.set(overlayAppendTo);
    if (ripple) this.ripple.set(ripple);
    if (inputStyle) this.inputStyle.set(inputStyle);
    if (inputVariant) this.inputVariant.set(inputVariant);
    if (overlayOptions) this.overlayOptions = overlayOptions;
    if (translation) this.setTranslation(translation);
    if (filterMatchModeOptions) this.filterMatchModeOptions = filterMatchModeOptions;
    if (zIndex) this.zIndex = zIndex;
    if (pt) this.pt.set(pt);
    if (ptOptions) this.ptOptions.set(ptOptions);
    if (unstyled) this.unstyled.set(unstyled);
    if (theme) this.setThemeConfig({
      theme,
      csp
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPrimeNG_BaseFactory;
    return function PrimeNG_Factory(__ngFactoryType__) {
      return (ɵPrimeNG_BaseFactory || (ɵPrimeNG_BaseFactory = ɵɵgetInheritedFactory(_PrimeNG)))(__ngFactoryType__ || _PrimeNG);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _PrimeNG,
    factory: _PrimeNG.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeNG, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PRIME_NG_CONFIG = new InjectionToken("PRIME_NG_CONFIG");
function providePrimeNG(...features) {
  const providers = features?.map((feature) => ({
    provide: PRIME_NG_CONFIG,
    useValue: feature,
    multi: false
  }));
  const initializer = provideAppInitializer(() => {
    const PrimeNGConfig = inject(PrimeNG);
    features?.forEach((feature) => PrimeNGConfig.setConfig(feature));
    return;
  });
  return makeEnvironmentProviders([...providers, initializer]);
}

export {
  f,
  c,
  s,
  k,
  m,
  a,
  g,
  R,
  h,
  w,
  s2,
  N,
  S,
  base,
  BaseStyle,
  ThemeProvider,
  PrimeNG,
  PRIME_NG_CONFIG,
  providePrimeNG
};
//# sourceMappingURL=chunk-QGNRIE7D.js.map
