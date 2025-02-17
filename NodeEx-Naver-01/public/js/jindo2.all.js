function isUnCacheAgent() {
  var e = _ua.indexOf("iPad") > -1,
    t = _ua.indexOf("Android") > -1,
    n =
      (!(_ua.indexOf("IEMobile") > -1) && _ua.indexOf("Mobile") > -1) ||
      (e && _ua.indexOf("Safari") > -1);
  return n && !e && !t;
}
"undefined" != typeof window && "undefined" == typeof window.nhn && (window.nhn = {}),
  "undefined" != typeof window
    ? "undefined" == typeof window.jindo && (window.jindo = {})
    : jindo || (jindo = {}),
  (jindo.$Jindo = function () {
    var e = arguments.callee,
      t = e._cached;
    return t
      ? t
      : this instanceof e
      ? (t || (e._cached = this), void (this.version = "1.5.2-SMART_EDITOR"))
      : new e();
  }),
  (jindo.$ = function (e) {
    var t = [],
      n = arguments,
      o = n.length,
      i = n[o - 1],
      r = document,
      s = null,
      a = /^<([a-z]+|h[1-5])>$/i,
      u = /^<([a-z]+|h[1-5])(\s+[^>]+)?>/i;
    o > 1 &&
      "string" != typeof i &&
      i.body &&
      ((n = Array.prototype.slice.apply(n, [0, o - 1])), (r = i));
    for (var l = 0; o > l; l++) {
      if (((s = n[l]), "string" == typeof s))
        if (((s = s.replace(/^\s+|\s+$/g, "")), s.indexOf("<") > -1)) {
          if (a.test(s)) s = r.createElement(RegExp.$1);
          else if (u.test(s)) {
            for (
              var d = {
                  thead: "table",
                  tbody: "table",
                  tr: "tbody",
                  td: "tr",
                  dt: "dl",
                  dd: "dl",
                  li: "ul",
                  legend: "fieldset",
                  option: "select",
                },
                c = RegExp.$1.toLowerCase(),
                p = jindo._createEle(d[c], s, r),
                l = 0,
                f = p.length;
              f > l;
              l++
            )
              t.push(p[l]);
            s = null;
          }
        } else s = r.getElementById(s);
      s && (t[t.length] = s);
    }
    return t.length > 1 ? t : t[0] || null;
  }),
  (jindo._createEle = function (e, t, n, o) {
    var i = "R" + new Date().getTime() + parseInt(1e5 * Math.random(), 10),
      r = n.createElement("div");
    switch (e) {
      case "select":
      case "table":
      case "dl":
      case "ul":
      case "fieldset":
        r.innerHTML = "<" + e + ' class="' + i + '">' + t + "</" + e + ">";
        break;
      case "thead":
      case "tbody":
      case "col":
        r.innerHTML = "<table><" + e + ' class="' + i + '">' + t + "</" + e + "></table>";
        break;
      case "tr":
        r.innerHTML = '<table><tbody><tr class="' + i + '">' + t + "</tr></tbody></table>";
        break;
      default:
        r.innerHTML = '<div class="' + i + '">' + t + "</div>";
    }
    var s;
    for (s = r.firstChild; s && s.className != i; s = s.firstChild);
    return o ? s : s.childNodes;
  }),
  (jindo.$Class = function (oDef) {
    function typeClass() {
      for (
        var t = this,
          a = [],
          superFunc = function (m, superClass, func) {
            if ("constructor" != m && func.toString().indexOf("$super") > -1) {
              var funcArg = func
                  .toString()
                  .replace(/function[^\(]*\(([^\)]*)[\w\W]*/g, "$1")
                  .split(","),
                funcStr = func
                  .toString()
                  .replace(/function[^{]*{/, "")
                  .replace(/(\w|\.?)(this\.\$super|this)/g, function (e, t, n) {
                    return t ? e : n + ".$super";
                  });
              (funcStr = funcStr.substr(0, funcStr.length - 1)),
                (func = superClass[m] =
                  eval("false||function(" + funcArg.join(",") + "){" + funcStr + "}"));
            }
            return function () {
              var e = this.$this[m],
                t = this.$this,
                n = (t[m] = func).apply(t, arguments);
              return (t[m] = e), n;
            };
          };
        "undefined" != typeof t._$superClass;

      ) {
        (t.$super = new Object()), (t.$super.$this = this);
        for (var x in t._$superClass.prototype)
          t._$superClass.prototype.hasOwnProperty(x) &&
            ("undefined" == typeof this[x] &&
              "$init" != x &&
              (this[x] = t._$superClass.prototype[x]),
            "constructor" != x &&
            "_$superClass" != x &&
            "function" == typeof t._$superClass.prototype[x]
              ? (t.$super[x] = superFunc(x, t._$superClass, t._$superClass.prototype[x]))
              : (t.$super[x] = t._$superClass.prototype[x]));
        "function" == typeof t.$super.$init && (a[a.length] = t), (t = t.$super);
      }
      for (var i = a.length - 1; i > -1; i--) a[i].$super.$init.apply(a[i].$super, arguments);
      "function" == typeof this.$init && this.$init.apply(this, arguments);
    }
    if ("undefined" != typeof oDef.$static) {
      var i = 0,
        x;
      for (x in oDef) oDef.hasOwnProperty(x) && ("$static" == x || i++);
      for (x in oDef.$static) oDef.$static.hasOwnProperty(x) && (typeClass[x] = oDef.$static[x]);
      if (!i) return oDef.$static;
      delete oDef.$static;
    }
    return (
      (typeClass.prototype = oDef),
      (typeClass.prototype.constructor = typeClass),
      (typeClass.extend = jindo.$Class.extend),
      typeClass
    );
  }),
  (jindo.$Class.extend = function (e) {
    if ("undefined" == typeof e || null === e || !e.extend)
      throw new Error("extend시 슈퍼 클래스는 Class여야 합니다.");
    this.prototype._$superClass = e;
    for (var t in e)
      if (e.hasOwnProperty(t)) {
        if ("prototype" == t) continue;
        this[t] = e[t];
      }
    return this;
  }),
  (jindo.$$ = jindo.cssquery =
    (function () {
      function getElementsByClass(e, t, n) {
        var o = new Array();
        null == t && (t = document), null == n && (n = "*");
        var r = t.getElementsByTagName(n),
          s = r.length,
          a = new RegExp("(^|\\s)" + e + "(\\s|$)");
        for (i = 0, j = 0; i < s; i++) a.test(r[i].className) && ((o[j] = r[i]), j++);
        return o;
      }
      function _isNonStandardQueryButNotException(e) {
        return /\[\s*(?:checked|selected|disabled)/.test(e);
      }
      function _commaRevise(e, t) {
        return e.replace(/\,/gi, t);
      }
      var sVersion = "3.0",
        debugOption = { repeat: 1 },
        UID = 1,
        cost = 0,
        validUID = {},
        bSupportByClassName = document.getElementsByClassName ? !0 : !1,
        safeHTML = !1,
        getUID4HTML = function (e) {
          var t = safeHTML ? e._cssquery_UID && e._cssquery_UID[0] : e._cssquery_UID;
          return t && validUID[t] == e
            ? t
            : ((t = UID++), (e._cssquery_UID = safeHTML ? [t] : t), (validUID[t] = e), t);
        },
        getUID4XML = function (e) {
          var t = e.getAttribute("_cssquery_UID"),
            n = safeHTML ? t && t[0] : t;
          return n || ((n = UID++), e.setAttribute("_cssquery_UID", safeHTML ? [n] : n)), n;
        },
        getUID = getUID4HTML,
        uniqid = function (e) {
          return (e || "") + new Date().getTime() + parseInt(1e8 * Math.random(), 10);
        },
        getChilds_dontShrink = function (e, t, n) {
          return bSupportByClassName && n
            ? e.getElementsByClassName
              ? e.getElementsByClassName(n)
              : e.querySelectorAll
              ? e.querySelectorAll(n)
              : getElementsByClass(n, e, t)
            : "*" == t
            ? e.all || e.getElementsByTagName(t)
            : e.getElementsByTagName(t);
        },
        clearKeys = function () {
          backupKeys._keys = {};
        },
        oDocument_dontShrink = document,
        bXMLDocument = !1,
        backupKeys = function (e) {
          var t = backupKeys._keys;
          (e = e.replace(/'(\\'|[^'])*'/g, function (e) {
            var n = uniqid("QUOT");
            return (t[n] = e), n;
          })),
            (e = e.replace(/"(\\"|[^"])*"/g, function (e) {
              var n = uniqid("QUOT");
              return (t[n] = e), n;
            })),
            (e = e.replace(/\[(.*?)\]/g, function (e, n) {
              if (0 == n.indexOf("ATTR")) return e;
              var o = "[" + uniqid("ATTR") + "]";
              return (t[o] = e), o;
            }));
          var n;
          do
            (n = !1),
              (e = e.replace(/\(((\\\)|[^)|^(])*)\)/g, function (e, o) {
                if (0 == o.indexOf("BRCE")) return e;
                var i = "_" + uniqid("BRCE");
                return (t[i] = e), (n = !0), i;
              }));
          while (n);
          return e;
        },
        restoreKeys = function (e, t) {
          var n,
            o = backupKeys._keys,
            i = t ? /(\[ATTR[0-9]+\])/g : /(QUOT[0-9]+|\[ATTR[0-9]+\])/g;
          do
            (n = !1),
              (e = e.replace(i, function (e) {
                return o[e] ? ((n = !0), o[e]) : e;
              }));
          while (n);
          return (e = e.replace(/_BRCE[0-9]+/g, function (e) {
            return o[e] ? o[e] : e;
          }));
        },
        restoreString = function (sKey) {
          var oKeys = backupKeys._keys,
            sOrg = oKeys[sKey];
          return sOrg ? eval(sOrg) : sKey;
        },
        wrapQuot = function (e) {
          return '"' + e.replace(/"/g, '\\"') + '"';
        },
        getStyleKey = function (e) {
          return /^@/.test(e) ? e.substr(1) : null;
        },
        getCSS = function (e, t) {
          return e.currentStyle
            ? ("float" == t && (t = "styleFloat"), e.currentStyle[t] || e.style[t])
            : window.getComputedStyle
            ? oDocument_dontShrink.defaultView
                .getComputedStyle(e, null)
                .getPropertyValue(t.replace(/([A-Z])/g, "-$1").toLowerCase()) || e.style[t]
            : ("float" == t && /MSIE/.test(window.navigator.userAgent) && (t = "styleFloat"),
              e.style[t]);
        },
        oCamels = {
          accesskey: "accessKey",
          cellspacing: "cellSpacing",
          cellpadding: "cellPadding",
          class: "className",
          colspan: "colSpan",
          for: "htmlFor",
          maxlength: "maxLength",
          readonly: "readOnly",
          rowspan: "rowSpan",
          tabindex: "tabIndex",
          valign: "vAlign",
        },
        getDefineCode = function (e) {
          var t, n;
          if (bXMLDocument) t = 'oEl.getAttribute("' + e + '",2)';
          else if ((n = getStyleKey(e))) (e = "$$" + n), (t = 'getCSS(oEl, "' + n + '")');
          else
            switch (e) {
              case "checked":
                t = 'oEl.checked + ""';
                break;
              case "disabled":
                t = 'oEl.disabled + ""';
                break;
              case "enabled":
                t = '!oEl.disabled + ""';
                break;
              case "readonly":
                t = 'oEl.readOnly + ""';
                break;
              case "selected":
                t = 'oEl.selected + ""';
                break;
              default:
                t = oCamels[e] ? "oEl." + oCamels[e] : 'oEl.getAttribute("' + e + '",2)';
            }
          return "_" + e.replace(/\-/g, "_") + " = " + t;
        },
        getReturnCode = function (e) {
          var t = getStyleKey(e.key),
            n = "_" + (t ? "$$" + t : e.key);
          n = n.replace(/\-/g, "_");
          var o = e.val ? wrapQuot(e.val) : "";
          switch (e.op) {
            case "~=":
              return "(" + n + ' && (" " + ' + n + ' + " ").indexOf(" " + ' + o + ' + " ") > -1)';
            case "^=":
              return "(" + n + " && " + n + ".indexOf(" + o + ") == 0)";
            case "$=":
              return (
                "(" +
                n +
                " && " +
                n +
                ".substr(" +
                n +
                ".length - " +
                e.val.length +
                ") == " +
                o +
                ")"
              );
            case "*=":
              return "(" + n + " && " + n + ".indexOf(" + o + ") > -1)";
            case "!=":
              return "(" + n + " != " + o + ")";
            case "=":
              return "(" + n + " == " + o + ")";
          }
          return "(" + n + ")";
        },
        getNodeIndex = function (e) {
          var t = getUID(e),
            n = oNodeIndexes[t] || 0;
          if (0 == n) {
            for (var o = (e.parentNode || e._IE5_parentNode).firstChild; o; o = o.nextSibling)
              1 == o.nodeType && (n++, setNodeIndex(o, n));
            n = oNodeIndexes[t];
          }
          return n;
        },
        oNodeIndexes = {},
        setNodeIndex = function (e, t) {
          var n = getUID(e);
          oNodeIndexes[n] = t;
        },
        unsetNodeIndexes = function () {
          setTimeout(function () {
            oNodeIndexes = {};
          }, 0);
        },
        oPseudoes_dontShrink = {
          contains: function (e, t) {
            return (e.innerText || e.textContent || "").indexOf(t) > -1;
          },
          "last-child": function (e, t) {
            for (e = e.nextSibling; e; e = e.nextSibling) if (1 == e.nodeType) return !1;
            return !0;
          },
          "first-child": function (e, t) {
            for (e = e.previousSibling; e; e = e.previousSibling) if (1 == e.nodeType) return !1;
            return !0;
          },
          "only-child": function (e, t) {
            for (
              var n = 0, o = (e.parentNode || e._IE5_parentNode).firstChild;
              o;
              o = o.nextSibling
            )
              if ((1 == o.nodeType && n++, n > 1)) return !1;
            return n ? !0 : !1;
          },
          empty: function (e, t) {
            return e.firstChild ? !1 : !0;
          },
          "nth-child": function (e, t, n) {
            var o = getNodeIndex(e);
            return o % t == n;
          },
          "nth-last-child": function (e, t, n) {
            for (
              var o = (e.parentNode || e._IE5_parentNode).lastChild;
              o && 1 != o.nodeType;
              o = o.previousSibling
            );
            var i = getNodeIndex(o),
              r = getNodeIndex(e),
              s = i - r + 1;
            return s % t == n;
          },
          checked: function (e) {
            return !!e.checked;
          },
          selected: function (e) {
            return !!e.selected;
          },
          enabled: function (e) {
            return !e.disabled;
          },
          disabled: function (e) {
            return !!e.disabled;
          },
        },
        getExpression = function (e) {
          var t,
            n,
            o = { defines: "", returns: "true" },
            e = restoreKeys(e, !0),
            i = [],
            r = [],
            s = [],
            e = e.replace(/:([\w-]+)(\(([^)]*)\))?/g, function (e, t, n, i) {
              switch (t) {
                case "not":
                  var r = getExpression(i),
                    a = r.defines,
                    u = r.returnsID + r.returnsTAG + r.returns;
                  s.push("!(function() { " + a + " return " + u + " })()");
                  break;
                case "nth-child":
                case "nth-last-child":
                  (i = restoreString(i)), "even" == i ? (i = "2n") : "odd" == i && (i = "2n+1");
                  var l,
                    d,
                    c = i.match(/([0-9]*)n([+-][0-9]+)*/);
                  c ? ((l = c[1] || 1), (d = c[2] || 0)) : ((l = 1 / 0), (d = parseInt(i, 10))),
                    s.push("oPseudoes_dontShrink[" + wrapQuot(t) + "](oEl, " + l + ", " + d + ")");
                  break;
                case "first-of-type":
                case "last-of-type":
                  (t = "first-of-type" == t ? "nth-of-type" : "nth-last-of-type"), (i = 1);
                case "nth-of-type":
                case "nth-last-of-type":
                  (i = restoreString(i)), "even" == i ? (i = "2n") : "odd" == i && (i = "2n+1");
                  var l, d;
                  /([0-9]*)n([+-][0-9]+)*/.test(i)
                    ? ((l = parseInt(RegExp.$1, 10) || 1), (d = parseInt(RegExp.$2, 20) || 0))
                    : ((l = 1 / 0), (d = parseInt(i, 10))),
                    (o.nth = [l, d, t]);
                  break;
                default:
                  (i = i ? restoreString(i) : ""),
                    s.push("oPseudoes_dontShrink[" + wrapQuot(t) + "](oEl, " + wrapQuot(i) + ")");
              }
              return "";
            }),
            e = e.replace(/\[(@?[\w-]+)(([!^~$*]?=)([^\]]*))?\]/g, function (e, t, n, o, r) {
              return (
                (t = restoreString(t)),
                (r = restoreString(r)),
                ("checked" == t ||
                  "disabled" == t ||
                  "enabled" == t ||
                  "readonly" == t ||
                  "selected" == t) &&
                  (r || ((o = "="), (r = "true"))),
                i.push({ key: t, op: o, val: r }),
                ""
              );
            }),
            a = null,
            e = e.replace(/\.([\w-]+)/g, function (e, t) {
              return i.push({ key: "class", op: "~=", val: t }), a || (a = t), "";
            }),
            e = e.replace(/#([\w-]+)/g, function (e, n) {
              return bXMLDocument ? i.push({ key: "id", op: "=", val: n }) : (t = n), "";
            });
          n = "*" == e ? "" : e;
          for (var u, l = {}, d = 0; (u = i[d]); d++) {
            var c = u.key;
            l[c] || r.push(getDefineCode(c)), s.unshift(getReturnCode(u)), (l[c] = !0);
          }
          return (
            r.length && (o.defines = "var " + r.join(",") + ";"),
            s.length && (o.returns = s.join("&&")),
            (o.quotID = t ? wrapQuot(t) : ""),
            (o.quotTAG = n ? wrapQuot(bXMLDocument ? n : n.toUpperCase()) : ""),
            bSupportByClassName && (o.quotCLASS = a ? wrapQuot(a) : ""),
            (o.returnsID = t ? "oEl.id == " + o.quotID + " && " : ""),
            (o.returnsTAG = n && "*" != n ? "oEl.tagName == " + o.quotTAG + " && " : ""),
            o
          );
        },
        splitToParts = function (e) {
          var t = [],
            n = " ",
            o = e.replace(/(.*?)\s*(!?[+>~ ]|!)\s*/g, function (e, o, i) {
              return o && t.push({ rel: n, body: o }), (n = i.replace(/\s+$/g, "") || " "), "";
            });
          return o && t.push({ rel: n, body: o }), t;
        },
        isNth_dontShrink = function (e, t, n, o, i) {
          for (var r = 0, s = e; s; s = s[i]) 1 != s.nodeType || (t && t != s.tagName) || r++;
          return r % n == o;
        },
        compileParts = function (aParts) {
          for (var aPartExprs = [], i = 0, oPart; (oPart = aParts[i]); i++)
            aPartExprs.push(getExpression(oPart.body));
          for (
            var sFunc = "",
              sPushCode = "aRet.push(oEl); if (oOptions.single) { bStop = true; }",
              i = aParts.length - 1,
              oPart;
            (oPart = aParts[i]);
            i--
          ) {
            var oExpr = aPartExprs[i],
              sPush = (debugOption.callback ? "cost++;" : "") + oExpr.defines,
              sReturn = "if (bStop) {" + (0 == i ? "return aRet;" : "return;") + "}";
            sPush +=
              "true" == oExpr.returns
                ? (sFunc ? sFunc + "(oEl);" : sPushCode) + sReturn
                : "if (" +
                  oExpr.returns +
                  ") {" +
                  (sFunc ? sFunc + "(oEl);" : sPushCode) +
                  sReturn +
                  "}";
            var sCheckTag = "oEl.nodeType != 1";
            oExpr.quotTAG && (sCheckTag = "oEl.tagName != " + oExpr.quotTAG);
            var sTmpFunc =
              "(function(oBase" +
              (0 == i ? ", oOptions) { var bStop = false; var aRet = [];" : ") {");
            switch (
              (oExpr.nth &&
                (sPush =
                  "if (isNth_dontShrink(oEl, " +
                  (oExpr.quotTAG ? oExpr.quotTAG : "false") +
                  "," +
                  oExpr.nth[0] +
                  "," +
                  oExpr.nth[1] +
                  ',"' +
                  ("nth-of-type" == oExpr.nth[2] ? "previousSibling" : "nextSibling") +
                  '")) {' +
                  sPush +
                  "}"),
              oPart.rel)
            ) {
              case " ":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");var oCandi = oEl;for (; oCandi; oCandi = (oCandi.parentNode || oCandi._IE5_parentNode)) {if (oCandi == oBase) break;}if (!oCandi || " +
                    sCheckTag +
                    ") return aRet;" +
                    sPush
                  : "var aCandi = getChilds_dontShrink(oBase, " +
                    (oExpr.quotTAG || '"*"') +
                    ", " +
                    (oExpr.quotCLASS || "null") +
                    ");for (var i = 0, oEl; oEl = aCandi[i]; i++) {" +
                    (oExpr.quotCLASS ? "if (" + sCheckTag + ") continue;" : "") +
                    sPush +
                    "}";
                break;
              case ">":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");if ((oEl.parentNode || oEl._IE5_parentNode) != oBase || " +
                    sCheckTag +
                    ") return aRet;" +
                    sPush
                  : "for (var oEl = oBase.firstChild; oEl; oEl = oEl.nextSibling) {if (" +
                    sCheckTag +
                    ") { continue; }" +
                    sPush +
                    "}";
                break;
              case "+":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");var oPrev;for (oPrev = oEl.previousSibling; oPrev; oPrev = oPrev.previousSibling) { if (oPrev.nodeType == 1) break; }if (!oPrev || oPrev != oBase || " +
                    sCheckTag +
                    ") return aRet;" +
                    sPush
                  : "for (var oEl = oBase.nextSibling; oEl; oEl = oEl.nextSibling) { if (oEl.nodeType == 1) break; }if (!oEl || " +
                    sCheckTag +
                    ") { return aRet; }" +
                    sPush;
                break;
              case "~":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");var oCandi = oEl;for (; oCandi; oCandi = oCandi.previousSibling) { if (oCandi == oBase) break; }if (!oCandi || " +
                    sCheckTag +
                    ") return aRet;" +
                    sPush
                  : "for (var oEl = oBase.nextSibling; oEl; oEl = oEl.nextSibling) {if (" +
                    sCheckTag +
                    ") { continue; }if (!markElement_dontShrink(oEl, " +
                    i +
                    ")) { break; }" +
                    sPush +
                    "}";
                break;
              case "!":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");for (; oBase; oBase = (oBase.parentNode || oBase._IE5_parentNode)) { if (oBase == oEl) break; }if (!oBase || " +
                    sCheckTag +
                    ") return aRet;" +
                    sPush
                  : "for (var oEl = (oBase.parentNode || oBase._IE5_parentNode); oEl; oEl = (oEl.parentNode || oEl._IE5_parentNode)) {if (" +
                    sCheckTag +
                    ") { continue; }" +
                    sPush +
                    "}";
                break;
              case "!>":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");var oRel = (oBase.parentNode || oBase._IE5_parentNode);if (!oRel || oEl != oRel || (" +
                    sCheckTag +
                    ")) return aRet;" +
                    sPush
                  : "var oEl = (oBase.parentNode || oBase._IE5_parentNode);if (!oEl || " +
                    sCheckTag +
                    ") { return aRet; }" +
                    sPush;
                break;
              case "!+":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");var oRel;for (oRel = oBase.previousSibling; oRel; oRel = oRel.previousSibling) { if (oRel.nodeType == 1) break; }if (!oRel || oEl != oRel || (" +
                    sCheckTag +
                    ")) return aRet;" +
                    sPush
                  : "for (oEl = oBase.previousSibling; oEl; oEl = oEl.previousSibling) { if (oEl.nodeType == 1) break; }if (!oEl || " +
                    sCheckTag +
                    ") { return aRet; }" +
                    sPush;
                break;
              case "!~":
                sTmpFunc += oExpr.quotID
                  ? "var oEl = oDocument_dontShrink.getElementById(" +
                    oExpr.quotID +
                    ");var oRel;for (oRel = oBase.previousSibling; oRel; oRel = oRel.previousSibling) { if (oRel.nodeType != 1) { continue; }if (oRel == oEl) { break; }}if (!oRel || (" +
                    sCheckTag +
                    ")) return aRet;" +
                    sPush
                  : "for (oEl = oBase.previousSibling; oEl; oEl = oEl.previousSibling) {if (" +
                    sCheckTag +
                    ") { continue; }if (!markElement_dontShrink(oEl, " +
                    i +
                    ")) { break; }" +
                    sPush +
                    "}";
            }
            (sTmpFunc += (0 == i ? "return aRet;" : "") + "})"), (sFunc = sTmpFunc);
          }
          return eval("var fpCompiled = " + sFunc + ";"), fpCompiled;
        },
        parseQuery = function (e) {
          var t = e,
            n = arguments.callee,
            o = n._cache[t];
          if (!o) {
            e = backupKeys(e);
            var i = splitToParts(e);
            (o = n._cache[t] = compileParts(i)), (o.depth = i.length);
          }
          return o;
        };
      parseQuery._cache = {};
      var parseTestQuery = function (sQuery) {
        for (
          var fpSelf = arguments.callee,
            aSplitQuery = backupKeys(sQuery).split(/\s*,\s*/),
            aResult = [],
            nLen = aSplitQuery.length,
            aFunc = [],
            i = 0;
          nLen > i;
          i++
        )
          aFunc.push(
            (function (sQuery) {
              var sCacheKey = sQuery,
                fpFunction = fpSelf._cache[sCacheKey];
              if (!fpFunction) {
                sQuery = backupKeys(sQuery);
                var oExpr = getExpression(sQuery);
                eval(
                  "fpFunction = function(oEl) { " +
                    oExpr.defines +
                    "return (" +
                    oExpr.returnsID +
                    oExpr.returnsTAG +
                    oExpr.returns +
                    "); };"
                );
              }
              return fpFunction;
            })(restoreKeys(aSplitQuery[i]))
          );
        return aFunc;
      };
      parseTestQuery._cache = {};
      var distinct = function (e) {
          for (var t, n = [], o = {}, i = 0; (t = e[i]); i++) {
            var r = getUID(t);
            o[r] || (n.push(t), (o[r] = !0));
          }
          return n;
        },
        markElement_dontShrink = function (e, t) {
          var n = getUID(e);
          return cssquery._marked[t][n] ? !1 : ((cssquery._marked[t][n] = !0), !0);
        },
        oResultCache = null,
        bUseResultCache = !1,
        bExtremeMode = !1,
        old_cssquery = function (e, t, n) {
          if ("object" == typeof e) {
            var o = {};
            for (var i in e) e.hasOwnProperty(i) && (o[i] = arguments.callee(e[i], t, n));
            return o;
          }
          cost = 0;
          for (var r, s = new Date().getTime(), a = 0, u = debugOption.repeat; u > a; a++)
            r = (function (e, t, n) {
              if (
                (n ? n.oneTimeOffCache || (n.oneTimeOffCache = !1) : (n = { oneTimeOffCache: !1 }),
                cssquery.safeHTML(n.oneTimeOffCache),
                t || (t = document),
                (oDocument_dontShrink = t.ownerDocument || t.document || t),
                /\bMSIE\s([0-9]+(\.[0-9]+)*);/.test(navigator.userAgent) &&
                  parseFloat(RegExp.$1) < 6)
              ) {
                try {
                  oDocument_dontShrink.location;
                } catch (o) {
                  oDocument_dontShrink = document;
                }
                (oDocument_dontShrink.firstChild =
                  oDocument_dontShrink.getElementsByTagName("html")[0]),
                  (oDocument_dontShrink.firstChild._IE5_parentNode = oDocument_dontShrink);
              }
              (bXMLDocument =
                "undefined" != typeof XMLDocument
                  ? oDocument_dontShrink.constructor === XMLDocument
                  : !oDocument_dontShrink.location),
                (getUID = bXMLDocument ? getUID4XML : getUID4HTML),
                clearKeys();
              for (var i = backupKeys(e).split(/\s*,\s*/), r = [], s = i.length, a = 0; s > a; a++)
                i[a] = restoreKeys(i[a]);
              for (var a = 0; s > a; a++) {
                var u = i[a],
                  l = null,
                  d = u + (n.single ? "_single" : ""),
                  c = bUseResultCache ? oResultCache[d] : null;
                if (c)
                  for (var p, f = 0; (p = c[f]); f++)
                    if (p.parent == t) {
                      l = p.result;
                      break;
                    }
                if (!l) {
                  var h = parseQuery(u);
                  cssquery._marked = [];
                  for (var f = 0, y = h.depth; y > f; f++) cssquery._marked.push({});
                  (l = distinct(h(t, n))),
                    bUseResultCache &&
                      !n.oneTimeOffCache &&
                      (oResultCache[d] instanceof Array || (oResultCache[d] = []),
                      oResultCache[d].push({ parent: t, result: l }));
                }
                r = r.concat(l);
              }
              return unsetNodeIndexes(), r;
            })(e, t, n);
          return (
            (s = new Date().getTime() - s),
            debugOption.callback && debugOption.callback(e, cost, s),
            r
          );
        },
        cssquery;
      if (document.querySelectorAll) {
        var protoSlice = Array.prototype.slice,
          _toArray = function (e) {
            return protoSlice.apply(e);
          };
        try {
          protoSlice.apply(document.documentElement.childNodes);
        } catch (e) {
          _toArray = function (e) {
            for (var t = [], n = e.length, o = 0; n > o; o++) t.push(e[o]);
            return t;
          };
        }
        cssquery = function (e, t, n) {
          t = t || document;
          try {
            if (_isNonStandardQueryButNotException(e)) throw Error("None Standard Query");
            var o = e,
              i = t;
            if (9 != t.nodeType) {
              if (!bExtremeMode)
                throw Error(
                  "Parent Element has not ID.or It is not document.or None Extreme Mode."
                );
              t.id || (t.id = "p" + new Date().getTime() + parseInt(1e8 * Math.random(), 10)),
                (o = _commaRevise("#" + t.id + " " + e, ", #" + t.id)),
                (i = t.ownerDocument || t.document || document);
            }
            return n && n.single ? [i.querySelector(o)] : _toArray(i.querySelectorAll(o));
          } catch (r) {
            return old_cssquery(e, t, n);
          }
        };
      } else cssquery = old_cssquery;
      return (
        (cssquery.test = function (e, t) {
          clearKeys();
          for (var n = parseTestQuery(t), o = 0, i = n.length; i > o; o++) if (n[o](e)) return !0;
          return !1;
        }),
        (cssquery.useCache = function (e) {
          return (
            "undefined" != typeof e && ((bUseResultCache = e), cssquery.clearCache()),
            bUseResultCache
          );
        }),
        (cssquery.clearCache = function () {
          oResultCache = {};
        }),
        (cssquery.getSingle = function (e, t, n) {
          return (
            cssquery(e, t, { single: !0, oneTimeOffCache: n ? !!n.oneTimeOffCache : !1 })[0] || null
          );
        }),
        (cssquery.xpath = function (e, t) {
          var e = e.replace(/\/(\w+)(\[([0-9]+)\])?/g, function (e, t, n, o) {
            return (o = o || "1"), ">" + t + ":nth-of-type(" + o + ")";
          });
          return old_cssquery(e, t);
        }),
        (cssquery.debug = function (e, t) {
          (debugOption.callback = e), (debugOption.repeat = t || 1);
        }),
        (cssquery.safeHTML = function (e) {
          var t = /MSIE/.test(window.navigator.userAgent);
          return arguments.length > 0 && (safeHTML = e && t), safeHTML || !t;
        }),
        (cssquery.version = sVersion),
        (cssquery.release = function () {
          /MSIE/.test(window.navigator.userAgent) &&
            (delete validUID, (validUID = {}), bUseResultCache && cssquery.clearCache());
        }),
        (cssquery._getCacheInfo = function () {
          return { uidCache: validUID, eleCache: oResultCache };
        }),
        (cssquery._resetUID = function () {
          UID = 0;
        }),
        (cssquery.extreme = function (e) {
          0 == arguments.length && (e = !0), (bExtremeMode = e);
        }),
        cssquery
      );
    })()),
  (jindo.$Agent = function () {
    var e = arguments.callee,
      t = e._cached;
    return t
      ? t
      : this instanceof e
      ? (t || (e._cached = this),
        (this._navigator = navigator),
        void (this._dm = document.documentMode))
      : new e();
  }),
  (jindo.$Agent.prototype.navigator = function () {
    function e(e, t) {
      return (t || "").indexOf(e) > -1;
    }
    var t = {},
      n = -1,
      o = -1,
      i = this._navigator.userAgent,
      r = this._navigator.vendor || "",
      s = this._dm;
    (t.getName = function () {
      var e = "";
      for (x in t) "boolean" == typeof t[x] && t[x] && t.hasOwnProperty(x) && (e = x);
      return e;
    }),
      (t.edge = e("Edge", i)),
      (t.webkit = !t.edge && e("WebKit", i)),
      (t.opera = void 0 !== window.opera || e("Opera", i) || e("OPR", i)),
      (t.ie = !t.opera && (e("MSIE", i) || e("Trident", i))),
      (t.chrome = (!t.edge && t.webkit && !t.opera && e("Chrome", i)) || e("CriOS", i)),
      (t.safari = !t.edge && t.webkit && !t.chrome && !t.opera && e("Apple", r)),
      (t.firefox = e("Firefox", i)),
      (t.mozilla = !t.edge && e("Gecko", i) && !t.safari && !t.chrome && !t.firefox && !t.ie),
      (t.camino = e("Camino", r)),
      (t.netscape = e("Netscape", i)),
      (t.omniweb = e("OmniWeb", i)),
      (t.icab = e("iCab", r)),
      (t.konqueror = e("KDE", r)),
      (t.mobile =
        !t.edge &&
        (e("Mobile", i) ||
          e("Android", i) ||
          e("Nokia", i) ||
          e("webOS", i) ||
          e("Opera Mini", i) ||
          e("Opera Mobile", i) ||
          e("BlackBerry", i) ||
          (e("Windows", i) && e("PPC", i)) ||
          e("Smartphone", i) ||
          e("IEMobile", i)) &&
        !(e("iPad", i) || e("Tablet", i))),
      (t.msafari =
        !t.edge &&
        ((!e("IEMobile", i) && e("Mobile", i)) || (e("iPad", i) && e("Safari", i))) &&
        !t.chrome &&
        !t.opera &&
        !t.firefox),
      (t.mopera = e("Opera Mini", i)),
      (t.mie = e("PPC", i) || e("Smartphone", i) || e("IEMobile", i));
    try {
      if (t.ie)
        if (s > 0)
          if (((n = s), i.match(/(?:Trident)\/([0-9.]+)/))) {
            var a = parseFloat(RegExp.$1, 10);
            a > 3 && (o = a + 4);
          } else o = n;
        else o = n = i.match(/(?:MSIE) ([0-9.]+)/)[1];
      else
        t.edge
          ? (n = i.match(/(?:Edge)\/([\d.]+)/)[1])
          : t.safari || t.msafari
          ? ((n = parseFloat(i.match(/Safari\/([0-9.]+)/)[1])),
            (n =
              100 == n
                ? 1.1
                : i.match(/Version\/([0-9.]+)/)
                ? RegExp.$1
                : [1, 1.2, -1, 1.3, 2, 3][Math.floor(n / 100)]))
          : t.mopera
          ? (n = i.match(/(?:Opera\sMini)\/([0-9.]+)/)[1])
          : t.firefox || t.opera || t.omniweb
          ? (n = i.match(/(?:Firefox|Opera|OmniWeb)\/([0-9.]+)/)[1])
          : t.mozilla
          ? (n = i.match(/rv:([0-9.]+)/)[1])
          : t.icab
          ? (n = i.match(/iCab[ \/]([0-9.]+)/)[1])
          : t.chrome && (n = i.match(/Chrome[ \/]([0-9.]+)/)[1]);
      (t.version = parseFloat(n)),
        (t.nativeVersion = parseFloat(o)),
        isNaN(t.version) && (t.version = -1);
    } catch (u) {
      t.version = -1;
    }
    return (
      (this.navigator = function () {
        return t;
      }),
      t
    );
  }),
  (jindo.$Agent.prototype.os = function () {
    var e = new Object(),
      t = this._navigator.userAgent,
      n = this._navigator.platform,
      o = function (e, t) {
        return t.indexOf(e) > -1;
      };
    return (
      (e.getName = function () {
        var t = "";
        for (x in e) "boolean" == typeof e[x] && e[x] && e.hasOwnProperty(x) && (t = x);
        return t;
      }),
      (e.win = o("Win", n)),
      (e.mac = o("Mac", n)),
      (e.linux = o("Linux", n)),
      (e.win2000 = e.win && (o("NT 5.0", t) || o("2000", t))),
      (e.winxp = e.win && o("NT 5.1", t)),
      (e.xpsp2 = e.winxp && o("SV1", t)),
      (e.vista = e.win && o("NT 6.0", t)),
      (e.win7 = e.win && o("NT 6.1", t)),
      (e.ipad = o("iPad", t)),
      (e.iphone = o("iPhone", t) && !e.ipad),
      (e.android = o("Android", t)),
      (e.nokia = o("Nokia", t)),
      (e.webos = o("webOS", t)),
      (e.blackberry = o("BlackBerry", t)),
      (e.mwin = o("PPC", t) || o("Smartphone", t) || o("IEMobile", t)),
      (this.os = function () {
        return e;
      }),
      e
    );
  }),
  (jindo.$Agent.prototype.flash = function () {
    var e = new Object(),
      t = this._navigator.plugins,
      n = this._navigator.mimeTypes,
      o = null;
    if (((e.installed = !1), (e.version = -1), "undefined" != typeof t && t.length))
      (o = t["Shockwave Flash"]),
        o &&
          ((e.installed = !0),
          o.description && (e.version = parseFloat(o.description.match(/[0-9.]+/)[0]))),
        t["Shockwave Flash 2.0"] && ((e.installed = !0), (e.version = 2));
    else if ("undefined" != typeof n && n.length)
      (o = n["application/x-shockwave-flash"]), (e.installed = o && o.enabledPlugin);
    else
      for (var i = 10; i > 1; i--)
        try {
          (o = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i)),
            (e.installed = !0),
            (e.version = i);
          break;
        } catch (r) {}
    return (
      (this.flash = function () {
        return e;
      }),
      (this.info = this.flash),
      e
    );
  }),
  (jindo.$Agent.prototype.silverlight = function () {
    var e = new Object(),
      t = this._navigator.plugins,
      n = null;
    if (((e.installed = !1), (e.version = -1), "undefined" != typeof t && t.length))
      (n = t["Silverlight Plug-In"]),
        n &&
          ((e.installed = !0),
          (e.version = parseInt(n.description.split(".")[0], 10)),
          "1.0.30226.2" == n.description && (e.version = 2));
    else
      try {
        (n = new ActiveXObject("AgControl.AgControl")),
          (e.installed = !0),
          n.isVersionSupported("3.0")
            ? (e.version = 3)
            : n.isVersionSupported("2.0")
            ? (e.version = 2)
            : n.isVersionSupported("1.0") && (e.version = 1);
      } catch (o) {}
    return (
      (this.silverlight = function () {
        return e;
      }),
      e
    );
  }),
  (jindo.$A = function (e) {
    var t = arguments.callee;
    if ((("undefined" == typeof e || null == e) && (e = []), e instanceof t)) return e;
    if (!(this instanceof t)) return new t(e);
    if (((this._array = []), e.constructor != String)) {
      this._array = [];
      for (var n = 0; n < e.length; n++) this._array[this._array.length] = e[n];
    }
  }),
  (jindo.$A.prototype.toString = function () {
    return this._array.toString();
  }),
  (jindo.$A.prototype.get = function (e) {
    return this._array[e];
  }),
  (jindo.$A.prototype.length = function (e, t) {
    if ("number" == typeof e) {
      var n = this._array.length;
      if (((this._array.length = e), "undefined" != typeof t))
        for (var o = n; e > o; o++) this._array[o] = t;
      return this;
    }
    return this._array.length;
  }),
  (jindo.$A.prototype.has = function (e) {
    return this.indexOf(e) > -1;
  }),
  (jindo.$A.prototype.indexOf = function (e) {
    return (
      "undefined" != typeof this._array.indexOf
        ? (jindo.$A.prototype.indexOf = function (e) {
            return this._array.indexOf(e);
          })
        : (jindo.$A.prototype.indexOf = function (e) {
            for (var t = 0; t < this._array.length; t++) if (this._array[t] == e) return t;
            return -1;
          }),
      this.indexOf(e)
    );
  }),
  (jindo.$A.prototype.$value = function () {
    return this._array;
  }),
  (jindo.$A.prototype.push = function (e) {
    return this._array.push.apply(this._array, Array.prototype.slice.apply(arguments));
  }),
  (jindo.$A.prototype.pop = function () {
    return this._array.pop();
  }),
  (jindo.$A.prototype.shift = function () {
    return this._array.shift();
  }),
  (jindo.$A.prototype.unshift = function (e) {
    return (
      this._array.unshift.apply(this._array, Array.prototype.slice.apply(arguments)),
      this._array.length
    );
  }),
  (jindo.$A.prototype.forEach = function (e, t) {
    return (
      "function" == typeof this._array.forEach
        ? (jindo.$A.prototype.forEach = function (e, t) {
            function n(n, o, r) {
              try {
                e.call(t, n, o, r);
              } catch (s) {
                if (!(s instanceof i)) throw s;
              }
            }
            var o = (this._array, this.constructor.Break),
              i = this.constructor.Continue;
            try {
              this._array.forEach(n);
            } catch (r) {
              if (!(r instanceof o)) throw r;
            }
            return this;
          })
        : (jindo.$A.prototype.forEach = function (e, t) {
            function n(n, o, i) {
              try {
                e.call(t, n, o, i);
              } catch (s) {
                if (!(s instanceof r)) throw s;
              }
            }
            for (
              var o = this._array, i = this.constructor.Break, r = this.constructor.Continue, s = 0;
              s < o.length;
              s++
            )
              try {
                n(o[s], s, o);
              } catch (a) {
                if (a instanceof i) break;
                throw a;
              }
            return this;
          }),
      this.forEach(e, t)
    );
  }),
  (jindo.$A.prototype.slice = function (e, t) {
    var n = this._array.slice.call(this._array, e, t);
    return jindo.$A(n);
  }),
  (jindo.$A.prototype.splice = function (e, t) {
    var n = this._array.splice.apply(this._array, Array.prototype.slice.apply(arguments));
    return jindo.$A(n);
  }),
  (jindo.$A.prototype.shuffle = function () {
    return (
      this._array.sort(function (e, t) {
        return Math.random() > Math.random() ? 1 : -1;
      }),
      this
    );
  }),
  (jindo.$A.prototype.reverse = function () {
    return this._array.reverse(), this;
  }),
  (jindo.$A.prototype.empty = function () {
    return this.length(0);
  }),
  (jindo.$A.Break = function () {
    if (!(this instanceof arguments.callee)) throw new arguments.callee();
  }),
  (jindo.$A.Continue = function () {
    if (!(this instanceof arguments.callee)) throw new arguments.callee();
  }),
  (jindo.$A.prototype.map = function (e, t) {
    return (
      "function" == typeof this._array.map
        ? (jindo.$A.prototype.map = function (e, t) {
            function n(n, o, r) {
              try {
                return e.call(t, n, o, r);
              } catch (s) {
                if (s instanceof i) return n;
                throw s;
              }
            }
            var o = (this._array, this.constructor.Break),
              i = this.constructor.Continue;
            try {
              this._array = this._array.map(n);
            } catch (r) {
              if (!(r instanceof o)) throw r;
            }
            return this;
          })
        : (jindo.$A.prototype.map = function (e, t) {
            function n(n, o, i) {
              try {
                return e.call(t, n, o, i);
              } catch (r) {
                if (r instanceof s) return n;
                throw r;
              }
            }
            for (
              var o = this._array,
                i = [],
                r = this.constructor.Break,
                s = this.constructor.Continue,
                a = 0;
              a < this._array.length;
              a++
            )
              try {
                i[a] = n(o[a], a, o);
              } catch (u) {
                if (u instanceof r) return this;
                throw u;
              }
            return (this._array = i), this;
          }),
      this.map(e, t)
    );
  }),
  (jindo.$A.prototype.filter = function (e, t) {
    return (
      "undefined" != typeof this._array.filter
        ? (jindo.$A.prototype.filter = function (e, t) {
            return jindo.$A(this._array.filter(e, t));
          })
        : (jindo.$A.prototype.filter = function (e, t) {
            var n = [];
            return (
              this.forEach(function (o, i, r) {
                e.call(t, o, i, r) === !0 && (n[n.length] = o);
              }),
              jindo.$A(n)
            );
          }),
      this.filter(e, t)
    );
  }),
  (jindo.$A.prototype.every = function (e, t) {
    return (
      "undefined" != typeof this._array.every
        ? (jindo.$A.prototype.every = function (e, t) {
            return this._array.every(e, t);
          })
        : (jindo.$A.prototype.every = function (e, t) {
            var n = !0;
            return (
              this.forEach(function (o, i, r) {
                e.call(t, o, i, r) === !1 && ((n = !1), jindo.$A.Break());
              }),
              n
            );
          }),
      this.every(e, t)
    );
  }),
  (jindo.$A.prototype.some = function (e, t) {
    return (
      "undefined" != typeof this._array.some
        ? (jindo.$A.prototype.some = function (e, t) {
            return this._array.some(e, t);
          })
        : (jindo.$A.prototype.some = function (e, t) {
            var n = !1;
            return (
              this.forEach(function (o, i, r) {
                e.call(t, o, i, r) === !0 && ((n = !0), jindo.$A.Break());
              }),
              n
            );
          }),
      this.some(e, t)
    );
  }),
  (jindo.$A.prototype.refuse = function (e) {
    var t = jindo.$A(Array.prototype.slice.apply(arguments));
    return this.filter(function (e, n) {
      return !t.has(e);
    });
  }),
  (jindo.$A.prototype.unique = function () {
    var e,
      t,
      n = this._array,
      o = [],
      i = n.length;
    for (e = 0; i > e; e++) {
      for (t = 0; t < o.length && n[e] != o[t]; t++);
      t >= o.length && (o[t] = n[e]);
    }
    return (this._array = o), this;
  }),
  (jindo.$Ajax = function (e, t) {
    function n() {
      var e = window.XMLHttpRequest && new XMLHttpRequest();
      if (this._checkCORSUrl(this._url)) {
        if (e && "withCredentials" in e) return e;
        if (window.XDomainRequest) return (this._bXDomainRequest = !0), new XDomainRequest();
      } else {
        if (e) return e;
        if (window.ActiveXObject)
          try {
            return new ActiveXObject("MSXML2.XMLHTTP");
          } catch (t) {
            return new ActiveXObject("Microsoft.XMLHTTP");
          }
      }
      return null;
    }
    var o = arguments.callee;
    if (!(this instanceof o)) return new o(e, t);
    (this._status = 0),
      (this._url = e),
      (this._options = new Object()),
      (this._headers = new Object()),
      (this._options = {
        type: "xhr",
        method: "post",
        proxy: "",
        timeout: 0,
        onload: function (e) {},
        onerror: null,
        ontimeout: function (e) {},
        jsonp_charset: "utf-8",
        callbackid: "",
        callbackname: "",
        sendheader: !0,
        async: !0,
        decode: !0,
        postBody: !1,
        withCredentials: !1,
      }),
      this.option(t),
      jindo.$Ajax.CONFIG && this.option(jindo.$Ajax.CONFIG);
    var i = this._options;
    switch (
      ((i.type = i.type.toLowerCase()),
      (i.method = i.method.toLowerCase()),
      "undefined" == typeof window.__jindo2_callback && (window.__jindo2_callback = new Array()),
      i.type)
    ) {
      case "put":
      case "delete":
      case "get":
      case "post":
        (i.method = i.type), (i.type = "xhr");
      case "xhr":
        (this._request = n.call(this)), this._checkCORS(this._url, i.type);
        break;
      case "flash":
        if (!jindo.$Ajax.SWFRequest) throw Error("Require jindo.$Ajax.SWFRequest");
        this._request = new jindo.$Ajax.SWFRequest(jindo.$Fn(this.option, this).bind());
        break;
      case "jsonp":
        if (!jindo.$Ajax.JSONPRequest) throw Error("Require jindo.$Ajax.JSONPRequest");
        (i.method = "get"),
          (this._request = new jindo.$Ajax.JSONPRequest(jindo.$Fn(this.option, this).bind()));
        break;
      case "iframe":
        if (!jindo.$Ajax.FrameRequest) throw Error("Require jindo.$Ajax.FrameRequest");
        this._request = new jindo.$Ajax.FrameRequest(jindo.$Fn(this.option, this).bind());
    }
  }),
  (jindo.$Ajax.prototype._checkCORSUrl = function (e) {
    return /^http/.test(e) && !new RegExp("^http://" + window.location.host, "i").test(e);
  }),
  (jindo.$Ajax.prototype._checkCORS = function (e, t) {
    if (((this._bCORS = !1), this._checkCORSUrl(e) && "xhr" === t)) {
      if (!(this._bXDomainRequest || "withCredentials" in this._request))
        throw Error("This browser does not support CORS.");
      this._bCORS = !0;
    }
  }),
  (jindo.$Ajax.prototype._onload = (function (e) {
    return e
      ? function () {
          var e,
            t = this._request.status,
            n =
              (4 == this._request.readyState && (200 == t || 0 == t)) ||
              (this._bXDomainRequest && !!this._request.responseText);
          if (4 == this._request.readyState || this._bXDomainRequest)
            try {
              200 != this._request.status && "function" == typeof this._options.onerror
                ? 0 == !this._request.status &&
                  this._options.onerror(jindo.$Ajax.Response(this._request))
                : this._is_abort || (e = this._options.onload(jindo.$Ajax.Response(this._request)));
            } finally {
              if (
                ("function" == typeof this._oncompleted && this._oncompleted(n, e),
                "xhr" == this._options.type)
              ) {
                this.abort();
                try {
                  delete this._request.onload;
                } catch (o) {
                  this._request.onload = void 0;
                }
              }
              this._request.onreadystatechange && delete this._request.onreadystatechange;
            }
        }
      : function () {
          var e,
            t = 4 == this._request.readyState && 200 == this._request.status;
          if (4 == this._request.readyState)
            try {
              200 != this._request.status && "function" == typeof this._options.onerror
                ? this._options.onerror(jindo.$Ajax.Response(this._request))
                : (e = this._options.onload(jindo.$Ajax.Response(this._request)));
            } finally {
              this._status--, "function" == typeof this._oncompleted && this._oncompleted(t, e);
            }
        };
  })(/MSIE/.test(window.navigator.userAgent))),
  (jindo.$Ajax.prototype.request = function (e) {
    this._status++;
    var t,
      n,
      o = this,
      i = this._request,
      r = this._options,
      s = [],
      t = "",
      a = null,
      u = this._url;
    this._is_abort = !1;
    var l = r.type.toUpperCase(),
      d = r.method.toUpperCase();
    if (r.postBody && "XHR" == l && "GET" != d)
      t = "string" == typeof e ? e : jindo.$Json(e).toString();
    else if ("undefined" != typeof e && e) {
      for (var c in e)
        e.hasOwnProperty(c) &&
          ((n = e[c]),
          "function" == typeof n && (n = n()),
          n instanceof Array || n instanceof jindo.$A
            ? jindo.$A(n).forEach(function (e, t, n) {
                s[s.length] = c + "=" + encodeURIComponent(e);
              })
            : (s[s.length] = c + "=" + encodeURIComponent(n)));
      t = s.join("&");
    } else t = null;
    if (
      (t &&
        "XHR" == l &&
        "GET" == d &&
        ((u += -1 == u.indexOf("?") ? "?" : "&"), (u += t), (t = null)),
      i.open(d, u, !!r.async),
      r.withCredentials && (i.withCredentials = !0),
      this._bCORS && r.sendheader === !1 && (i.setRequestHeader = null),
      "XHR" == l &&
        "GET" == d &&
        /MSIE|Trident/.test(window.navigator.userAgent) &&
        i.setRequestHeader &&
        i.setRequestHeader("If-Modified-Since", "Thu, 1 Jan 1970 00:00:00 GMT"),
      ("XHR" == l || "IFRAME" == l || ("FLASH" == l && r.sendheader)) && i.setRequestHeader)
    ) {
      this._headers["Content-Type"] ||
        i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"),
        i.setRequestHeader("charset", "utf-8"),
        this._bCORS ||
          this._headers["X-Requested-With"] ||
          i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      for (var p in this._headers)
        if (this._headers.hasOwnProperty(p)) {
          if ("function" == typeof this._headers[p]) continue;
          i.setRequestHeader(p, String(this._headers[p]));
        }
    }
    var f = navigator.userAgent;
    if (!i.addEventListener || f.indexOf("Opera") > -1 || f.indexOf("MSIE") > -1)
      if ("undefined" != typeof i.onload) {
        if (
          ((i.onload = function (e) {
            4 != i.readyState || o._is_abort || (clearTimeout(a), (a = void 0), o._onload(e));
          }),
          this._bXDomainRequest)
        ) {
          var h = i.onload;
          (i.onload = function (e) {
            (o._request.readyState = 4), (o._request.status = 200), h(e);
          }),
            (i.onerror = function (e) {
              (o._request.readyState = 4), (o._request.status = 404), h(e);
            });
        }
      } else if (6 == window.navigator.userAgent.match(/(?:MSIE) ([0-9.]+)/)[1] && r.async) {
        var y = function (e) {
          4 != i.readyState ||
            o._is_abort ||
            (a && (clearTimeout(a), (a = void 0)),
            o._onload(e),
            clearInterval(o._interval),
            (o._interval = void 0));
        };
        this._interval = setInterval(y, 300);
      } else
        i.onreadystatechange = function (e) {
          4 == i.readyState && (clearTimeout(a), (a = void 0), o._onload(e));
        };
    else
      this._loadFunc && i.removeEventListener("load", this._loadFunc, !1),
        (this._loadFunc = function (e) {
          clearTimeout(a), (a = void 0), o._onload(e);
        }),
        i.addEventListener("load", this._loadFunc, !1),
        i.addEventListener("error", this._loadFunc, !1);
    return (
      r.timeout > 0 &&
        (this._timer && clearTimeout(this._timer),
        (a = setTimeout(function () {
          (o._is_abort = !0), o._interval && (clearInterval(o._interval), (o._interval = void 0));
          try {
            i.abort();
          } catch (e) {}
          r.ontimeout(i), "function" == typeof o._oncompleted && o._oncompleted(!1);
        }, 1e3 * r.timeout)),
        (this._timer = a)),
      (this._test_url = u),
      i.send(t),
      this
    );
  }),
  (jindo.$Ajax.prototype.isIdle = function () {
    return 0 == this._status;
  }),
  (jindo.$Ajax.prototype.abort = function () {
    try {
      this._interval && clearInterval(this._interval),
        this._timer && clearTimeout(this._timer),
        (this._interval = void 0),
        (this._timer = void 0),
        (this._is_abort = !0),
        this._request.abort();
    } finally {
      this._status--;
    }
    return this;
  }),
  (jindo.$Ajax.prototype.option = function (e, t) {
    if ("undefined" == typeof e) return "";
    if ("string" == typeof e)
      return "undefined" == typeof t ? this._options[e] : ((this._options[e] = t), this);
    try {
      for (var n in e) e.hasOwnProperty(n) && (this._options[n] = e[n]);
    } catch (o) {}
    return this;
  }),
  (jindo.$Ajax.prototype.header = function (e, t) {
    if ("undefined" == typeof e) return "";
    if ("string" == typeof e)
      return "undefined" == typeof t ? this._headers[e] : ((this._headers[e] = t), this);
    try {
      for (var n in e) e.hasOwnProperty(n) && (this._headers[n] = e[n]);
    } catch (o) {}
    return this;
  }),
  (jindo.$Ajax.Response = function (e) {
    return this === jindo.$Ajax ? new jindo.$Ajax.Response(e) : void (this._response = e);
  }),
  (jindo.$Ajax.Response.prototype.xml = function () {
    return this._response.responseXML;
  }),
  (jindo.$Ajax.Response.prototype.text = function () {
    return this._response.responseText;
  }),
  (jindo.$Ajax.Response.prototype.status = function () {
    return this._response.status;
  }),
  (jindo.$Ajax.Response.prototype.readyState = function () {
    return this._response.readyState;
  }),
  (jindo.$Ajax.Response.prototype.json = function () {
    if (this._response.responseJSON) return this._response.responseJSON;
    if (this._response.responseText)
      try {
        return eval("(" + this._response.responseText + ")");
      } catch (e) {
        return {};
      }
    return {};
  }),
  (jindo.$Ajax.Response.prototype.header = function (e) {
    return "string" == typeof e
      ? this._response.getResponseHeader(e)
      : this._response.getAllResponseHeaders();
  }),
  (jindo.$Ajax.RequestBase = jindo.$Class({
    _respHeaderString: "",
    callbackid: "",
    callbackname: "",
    responseXML: null,
    responseJSON: null,
    responseText: "",
    status: 404,
    readyState: 0,
    $init: function (e) {},
    onload: function () {},
    abort: function () {},
    open: function () {},
    send: function () {},
    setRequestHeader: function (e, t) {
      this._headers[e] = t;
    },
    getResponseHeader: function (e) {
      return this._respHeaders[e] || "";
    },
    getAllResponseHeaders: function () {
      return this._respHeaderString;
    },
    _getCallbackInfo: function () {
      var e = "";
      if ("" != this.option("callbackid")) {
        var t = 0;
        do (e = "_" + this.option("callbackid") + "_" + t), t++;
        while (window.__jindo2_callback[e]);
      } else
        do e = "_" + Math.floor(1e4 * Math.random());
        while (window.__jindo2_callback[e]);
      return (
        "" == this.option("callbackname") && this.option("callbackname", "_callback"),
        { callbackname: this.option("callbackname"), id: e, name: "window.__jindo2_callback." + e }
      );
    },
  })),
  (jindo.$Ajax.JSONPRequest = jindo
    .$Class({
      _headers: {},
      _respHeaders: {},
      _script: null,
      _onerror: null,
      $init: function (e) {
        this.option = e;
      },
      _callback: function (e) {
        this._onerror && (clearTimeout(this._onerror), (this._onerror = null));
        var t = this;
        (this.responseJSON = e),
          this.onload(this),
          setTimeout(function () {
            t.abort();
          }, 10);
      },
      abort: function () {
        if (this._script)
          try {
            this._script.parentNode.removeChild(this._script);
          } catch (e) {}
      },
      open: function (e, t) {
        (this.responseJSON = null), (this._url = t);
      },
      send: function (e) {
        var t = this,
          n = this._getCallbackInfo(),
          o = document.getElementsByTagName("head")[0];
        (this._script = jindo.$("<script>")),
          (this._script.type = "text/javascript"),
          (this._script.charset = this.option("jsonp_charset")),
          o
            ? o.appendChild(this._script)
            : document.body && document.body.appendChild(this._script),
          (window.__jindo2_callback[n.id] = function (e) {
            try {
              (t.readyState = 4), (t.status = 200), t._callback(e);
            } finally {
              delete window.__jindo2_callback[n.id];
            }
          });
        var i = jindo.$Agent(navigator);
        i.navigator().ie || i.navigator().opera
          ? (this._script.onreadystatechange = function () {
              "loaded" == this.readyState &&
                (t.responseJSON ||
                  ((t.readyState = 4),
                  (t.status = 500),
                  (t._onerror = setTimeout(function () {
                    t._callback(null);
                  }, 200))),
                (this.onreadystatechange = null));
            })
          : ((this._script.onload = function () {
              t.responseJSON ||
                ((t.readyState = 4),
                (t.status = 500),
                (t._onerror = setTimeout(function () {
                  t._callback(null);
                }, 200))),
                (this.onload = null),
                (this.onerror = null);
            }),
            (this._script.onerror = function () {
              t.responseJSON ||
                ((t.readyState = 4),
                (t.status = 404),
                (t._onerror = setTimeout(function () {
                  t._callback(null);
                }, 200))),
                (this.onerror = null),
                (this.onload = null);
            }));
        var r = "&";
        -1 == this._url.indexOf("?") && (r = "?"),
          (e = e ? "&" + e : ""),
          (this._test_url = this._url + r + n.callbackname + "=" + n.name + e),
          (this._script.src = this._url + r + n.callbackname + "=" + n.name + e);
      },
    })
    .extend(jindo.$Ajax.RequestBase)),
  (jindo.$Ajax.SWFRequest = jindo
    .$Class({
      $init: function (e) {
        this.option = e;
      },
      _headers: {},
      _respHeaders: {},
      _getFlashObj: function () {
        var e,
          t = jindo.$Agent(window.navigator).navigator();
        return (
          (e =
            t.ie && 9 == t.version
              ? document.getElementById(jindo.$Ajax.SWFRequest._tmpId)
              : window.document[jindo.$Ajax.SWFRequest._tmpId]),
          (this._getFlashObj = function () {
            return e;
          })()
        );
      },
      _callback: function (e, t, n) {
        if (
          ((this.readyState = 4),
          "number" == (typeof e).toLowerCase() ? (this.status = e) : 1 == e && (this.status = 200),
          200 == this.status)
        ) {
          if ("string" == typeof t)
            try {
              (this.responseText = this.option("decode") ? decodeURIComponent(t) : t),
                (this.responseText && "" != this.responseText) || (this.responseText = t);
            } catch (o) {
              "URIError" == o.name &&
                ((this.responseText = t),
                (this.responseText && "" != this.responseText) || (this.responseText = t));
            }
          "object" == typeof n && (this._respHeaders = n);
        }
        this.onload(this);
      },
      open: function (e, t) {
        (this._url = t), (this._method = e);
      },
      send: function (e) {
        function t(e) {
          switch (typeof e) {
            case "string":
              return '"' + e.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"';
            case "number":
              return e;
            case "object":
              var n = "",
                o = [];
              if (e instanceof Array) {
                for (var i = 0; i < e.length; i++) o[i] = t(e[i]);
                n = "[" + o.join(",") + "]";
              } else {
                for (var r in e) e.hasOwnProperty(r) && (o[o.length] = t(r) + ":" + t(e[r]));
                n = "{" + o.join(",") + "}";
              }
              return n;
            default:
              return '""';
          }
        }
        (this.responseXML = !1), (this.responseText = "");
        var n = this,
          o = {},
          i = this._getCallbackInfo(),
          r = this._getFlashObj();
        e = e ? e.split("&") : [];
        for (var s = 0; s < e.length; s++)
          (pos = e[s].indexOf("=")),
            (key = e[s].substring(0, pos)),
            (val = e[s].substring(pos + 1)),
            (o[key] = decodeURIComponent(val));
        (this._current_callback_id = i.id),
          (window.__jindo2_callback[i.id] = function (e, t) {
            try {
              n._callback(e, t);
            } finally {
              delete window.__jindo2_callback[i.id];
            }
          });
        var a = {
          url: this._url,
          type: this._method,
          data: o,
          charset: "UTF-8",
          callback: i.name,
          header_json: this._headers,
        };
        r.requestViaFlash(t(a));
      },
      abort: function () {
        this._current_callback_id &&
          (window.__jindo2_callback[this._current_callback_id] = function () {
            delete window.__jindo2_callback[info.id];
          });
      },
    })
    .extend(jindo.$Ajax.RequestBase)),
  (jindo.$Ajax.SWFRequest.write = function (e) {
    "undefined" == typeof e && (e = "./ajax.swf"),
      (jindo.$Ajax.SWFRequest._tmpId =
        "tmpSwf" + new Date().getMilliseconds() + Math.floor(1e5 * Math.random()));
    var t = "jindo.$Ajax.SWFRequest.loaded";
    jindo.$Ajax._checkFlashLoad(),
      document.write(
        '<div style="position:absolute;top:-1000px;left:-1000px"><object tabindex="-1" id="' +
          jindo.$Ajax.SWFRequest._tmpId +
          '" width="1" height="1" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="' +
          e +
          '"><param name = "FlashVars" value = "activeCallback=' +
          t +
          '" /><param name = "allowScriptAccess" value = "always" /><embed name="' +
          jindo.$Ajax.SWFRequest._tmpId +
          '" src="' +
          e +
          '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" width="1" height="1" allowScriptAccess="always" swLiveConnect="true" FlashVars="activeCallback=' +
          t +
          '"></embed></object></div>'
      );
  }),
  (jindo.$Ajax._checkFlashLoad = function () {
    (jindo.$Ajax._checkFlashKey = setTimeout(function () {}, 5e3)),
      (jindo.$Ajax._checkFlashLoad = function () {});
  }),
  (jindo.$Ajax.SWFRequest.activeFlash = !1),
  (jindo.$Ajax.SWFRequest.loaded = function () {
    clearTimeout(jindo.$Ajax._checkFlashKey), (jindo.$Ajax.SWFRequest.activeFlash = !0);
  }),
  (jindo.$Ajax.FrameRequest = jindo
    .$Class({
      _headers: {},
      _respHeaders: {},
      _frame: null,
      _domain: "",
      $init: function (e) {
        this.option = e;
      },
      _callback: function (e, t, n) {
        var o = this;
        (this.readyState = 4),
          (this.status = 200),
          (this.responseText = t),
          (this._respHeaderString = n),
          n.replace(/^([\w\-]+)\s*:\s*(.+)$/m, function (e, t, n) {
            o._respHeaders[t] = n;
          }),
          this.onload(this),
          setTimeout(function () {
            o.abort();
          }, 10);
      },
      abort: function () {
        if (this._frame)
          try {
            this._frame.parentNode.removeChild(this._frame);
          } catch (e) {}
      },
      open: function (e, t) {
        var n = /https?:\/\/([a-z0-9_\-\.]+)/i,
          o = document.location.toString().match(n);
        (this._method = e),
          (this._url = t),
          (this._remote = String(t).match(/(https?:\/\/[a-z0-9_\-\.]+)(:[0-9]+)?/i)[0]),
          (this._frame = null),
          (this._domain = o[1] != document.domain ? document.domain : "");
      },
      send: function (e) {
        (this.responseXML = ""), (this.responseText = "");
        var t = this,
          n = /https?:\/\/([a-z0-9_\-\.]+)/i,
          o = this._getCallbackInfo(),
          i = [];
        i.push(this._remote + "/ajax_remote_callback.html?method=" + this._method);
        var r = new Array();
        window.__jindo2_callback[o.id] = function (e, n, i) {
          try {
            t._callback(e, n, i);
          } finally {
            delete window.__jindo2_callback[o.id];
          }
        };
        for (var s in this._headers)
          this._headers.hasOwnProperty(s) &&
            (r[r.length] = "'" + s + "':'" + this._headers[s] + "'");
        (r = "{" + r.join(",") + "}"),
          i.push("&id=" + o.id),
          i.push("&header=" + encodeURIComponent(r)),
          i.push("&proxy=" + encodeURIComponent(this.option("proxy"))),
          i.push("&domain=" + this._domain),
          i.push("&url=" + encodeURIComponent(this._url.replace(n, ""))),
          i.push("#" + encodeURIComponent(e));
        var a = (this._frame = jindo.$("<iframe>"));
        (a.style.position = "absolute"),
          (a.style.visibility = "hidden"),
          (a.style.width = "1px"),
          (a.style.height = "1px");
        var u = document.body || document.documentElement;
        u.firstChild ? u.insertBefore(a, u.firstChild) : u.appendChild(a), (a.src = i.join(""));
      },
    })
    .extend(jindo.$Ajax.RequestBase)),
  (jindo.$Ajax.Queue = function (e) {
    var t = arguments.callee;
    return this instanceof t
      ? ((this._options = { async: !1, useResultAsParam: !1, stopOnFailure: !1 }),
        this.option(e),
        void (this._queue = []))
      : new t(e);
  }),
  (jindo.$Ajax.Queue.prototype.option = function (e, t) {
    if ("undefined" == typeof e) return "";
    if ("string" == typeof e)
      return "undefined" == typeof t ? this._options[e] : ((this._options[e] = t), this);
    try {
      for (var n in e) e.hasOwnProperty(n) && (this._options[n] = e[n]);
    } catch (o) {}
    return this;
  }),
  (jindo.$Ajax.Queue.prototype.add = function (e, t) {
    this._queue.push({ obj: e, param: t });
  }),
  (jindo.$Ajax.Queue.prototype.request = function () {
    this.option("async") ? this._requestAsync() : this._requestSync(0);
  }),
  (jindo.$Ajax.Queue.prototype._requestSync = function (e, t) {
    var n = this;
    this._queue.length > e + 1 &&
      (this._queue[e].obj._oncompleted = function (t, o) {
        (!n.option("stopOnFailure") || t) && n._requestSync(e + 1, o);
      });
    var o = this._queue[e].param || {};
    if (this.option("useResultAsParam") && t)
      try {
        for (var i in t) "undefined" == typeof o[i] && t.hasOwnProperty(i) && (o[i] = t[i]);
      } catch (r) {}
    this._queue[e].obj.request(o);
  }),
  (jindo.$Ajax.Queue.prototype._requestAsync = function () {
    for (var e = 0; e < this._queue.length; e++) this._queue[e].obj.request(this._queue[e].param);
  }),
  (jindo.$H = function (e) {
    var t = arguments.callee;
    if (("undefined" == typeof e && (e = new Object()), e instanceof t)) return e;
    if (!(this instanceof t)) return new t(e);
    this._table = {};
    for (var n in e) e.hasOwnProperty(n) && (this._table[n] = e[n]);
  }),
  (jindo.$H.prototype.$value = function () {
    return this._table;
  }),
  (jindo.$H.prototype.$ = function (e, t) {
    return "undefined" == typeof t ? this._table[e] : ((this._table[e] = t), this);
  }),
  (jindo.$H.prototype.length = function () {
    var e = 0;
    for (var t in this._table)
      if (this._table.hasOwnProperty(t)) {
        if ("undefined" != typeof Object.prototype[t] && Object.prototype[t] === this._table[t])
          continue;
        e++;
      }
    return e;
  }),
  (jindo.$H.prototype.forEach = function (e, t) {
    var n = this._table,
      o = this.constructor;
    for (var i in n)
      if (n.hasOwnProperty(i)) {
        if (!n.propertyIsEnumerable(i)) continue;
        try {
          e.call(t, n[i], i, n);
        } catch (r) {
          if (r instanceof o.Break) break;
          if (r instanceof o.Continue) continue;
          throw r;
        }
      }
    return this;
  }),
  (jindo.$H.prototype.filter = function (e, t) {
    var n = jindo.$H();
    return (
      this.forEach(function (o, i, r) {
        e.call(t, o, i, r) === !0 && n.add(i, o);
      }),
      n
    );
  }),
  (jindo.$H.prototype.map = function (e, t) {
    var n = this._table;
    return (
      this.forEach(function (o, i, r) {
        n[i] = e.call(t, o, i, r);
      }),
      this
    );
  }),
  (jindo.$H.prototype.add = function (e, t) {
    return (this._table[e] = t), this;
  }),
  (jindo.$H.prototype.remove = function (e) {
    if ("undefined" == typeof this._table[e]) return null;
    var t = this._table[e];
    return delete this._table[e], t;
  }),
  (jindo.$H.prototype.search = function (e) {
    var t = !1;
    return (
      this.forEach(function (n, o, i) {
        n === e && ((t = o), jindo.$H.Break());
      }),
      t
    );
  }),
  (jindo.$H.prototype.hasKey = function (e) {
    return "undefined" != typeof this._table[e];
  }),
  (jindo.$H.prototype.hasValue = function (e) {
    return this.search(e) !== !1;
  }),
  (jindo.$H.prototype.sort = function () {
    var e = new Object(),
      t = this.values(),
      n = !1;
    t.sort();
    for (var o = 0; o < t.length; o++)
      (n = this.search(t[o])), (e[n] = t[o]), delete this._table[n];
    return (this._table = e), this;
  }),
  (jindo.$H.prototype.ksort = function () {
    var e = new Object(),
      t = this.keys();
    t.sort();
    for (var n = 0; n < t.length; n++) e[t[n]] = this._table[t[n]];
    return (this._table = e), this;
  }),
  (jindo.$H.prototype.keys = function () {
    var e = new Array();
    for (var t in this._table) this._table.hasOwnProperty(t) && e.push(t);
    return e;
  }),
  (jindo.$H.prototype.values = function () {
    var e = [];
    for (var t in this._table) this._table.hasOwnProperty(t) && (e[e.length] = this._table[t]);
    return e;
  }),
  (jindo.$H.prototype.toQueryString = function () {
    var e = [],
      t = null;
    for (var n in this._table)
      if (this._table.hasOwnProperty(n))
        if ("object" == typeof (t = this._table[n]) && t.constructor == Array)
          for (i = 0; i < t.length; i++)
            e[e.length] = encodeURIComponent(n) + "[]=" + encodeURIComponent(t[i] + "");
        else e[e.length] = encodeURIComponent(n) + "=" + encodeURIComponent(this._table[n] + "");
    return e.join("&");
  }),
  (jindo.$H.prototype.empty = function () {
    for (var e = this.keys(), t = 0; t < e.length; t++) delete this._table[e[t]];
    return this;
  }),
  (jindo.$H.Break = function () {
    if (!(this instanceof arguments.callee)) throw new arguments.callee();
  }),
  (jindo.$H.Continue = function () {
    if (!(this instanceof arguments.callee)) throw new arguments.callee();
  }),
  (jindo.$Json = function (e) {
    var t = arguments.callee;
    return (
      "undefined" == typeof e && (e = {}),
      e instanceof t
        ? e
        : this instanceof t
        ? void ("string" == typeof e
            ? (this._object = jindo.$Json._oldMakeJSON(e))
            : (this._object = e))
        : new t(e)
    );
  }),
  (jindo.$Json._oldMakeJSON = function (sObject) {
    try {
      sObject = /^(?:\s*)[\{\[]/.test(sObject) ? eval("(" + sObject + ")") : sObject;
    } catch (e) {
      sObject = {};
    }
    return sObject;
  }),
  (jindo.$Json.fromXML = function (e) {
    var t = {},
      n =
        /\s*<(\/?[\w:\-]+)((?:\s+[\w:\-]+\s*=\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'))*)\s*((?:\/>)|(?:><\/\1>|\s*))|\s*<!\[CDATA\[([\w\W]*?)\]\]>\s*|\s*>?([^<]*)/gi,
      o = /^[0-9]+(?:\.[0-9]+)?$/,
      i = { "&amp;": "&", "&nbsp;": " ", "&quot;": '"', "&lt;": "<", "&gt;": ">" },
      r = { tags: ["/"], stack: [t] },
      s = function (e) {
        return "undefined" == typeof e
          ? ""
          : e.replace(/&[a-z]+;/g, function (e) {
              return "string" == typeof i[e] ? i[e] : e;
            });
      },
      a = function (e, t) {
        e.replace(
          /([\w\:\-]+)\s*=\s*(?:"((?:\\"|[^"])*)"|'((?:\\'|[^'])*)')/g,
          function (e, n, o, i) {
            t[n] = s(
              (o ? o.replace(/\\"/g, '"') : void 0) || (i ? i.replace(/\\'/g, "'") : void 0)
            );
          }
        );
      },
      u = function (e) {
        for (var t in e)
          if (e.hasOwnProperty(t)) {
            if (Object.prototype[t]) continue;
            return !1;
          }
        return !0;
      },
      l = function (e, t, n, i, l, d) {
        var c,
          p = "",
          f = r.stack.length - 1;
        if ("string" == typeof t && t)
          if ("/" != t.substr(0, 1)) {
            var h = "string" == typeof n && n,
              y = "string" == typeof i && i,
              m = !h && y ? "" : {};
            if (((c = r.stack[f]), "undefined" == typeof c[t]))
              (c[t] = m), (c = r.stack[f + 1] = c[t]);
            else if (c[t] instanceof Array) {
              var _ = c[t].length;
              (c[t][_] = m), (c = r.stack[f + 1] = c[t][_]);
            } else (c[t] = [c[t], m]), (c = r.stack[f + 1] = c[t][1]);
            h && a(n, c), (r.tags[f + 1] = t), y && (r.tags.length--, r.stack.length--);
          } else r.tags.length--, r.stack.length--;
        else "string" == typeof l && l ? (p = l) : "string" == typeof d && d && (p = s(d));
        if (p.replace(/^\s+/g, "").length > 0) {
          var g = r.stack[f - 1],
            v = r.tags[f];
          if (
            (o.test(p) ? (p = parseFloat(p)) : "true" == p ? (p = !0) : "false" == p && (p = !1),
            "undefined" == typeof g)
          )
            return;
          if (g[v] instanceof Array) {
            var j = g[v];
            "object" != typeof j[j.length - 1] || u(j[j.length - 1])
              ? (j[j.length - 1] = p)
              : ((j[j.length - 1].$cdata = p),
                (j[j.length - 1].toString = function () {
                  return p;
                }));
          } else
            "object" != typeof g[v] || u(g[v])
              ? (g[v] = p)
              : ((g[v].$cdata = p),
                (g[v].toString = function () {
                  return p;
                }));
        }
      };
    return (e = e.replace(/<(\?|\!-)[^>]*>/g, "")), e.replace(n, l), jindo.$Json(t);
  }),
  (jindo.$Json.prototype.get = function (e) {
    for (
      var t,
        n,
        o,
        i,
        r,
        s = this._object,
        a = e.split("/"),
        u = /^([\w:\-]+)\[([0-9]+)\]$/,
        l = [[s]],
        d = l[0],
        c = a.length,
        p = 0;
      c > p;
      p++
    )
      if ("." != a[p] && "" != a[p]) {
        if (".." == a[p]) l.length--;
        else {
          if (((o = []), (n = -1), (t = d.length), 0 == t)) return [];
          for (u.test(a[p]) && (n = +RegExp.$2), i = 0; t > i; i++)
            (r = d[i][a[p]]),
              "undefined" != typeof r &&
                (r instanceof Array
                  ? n > -1
                    ? n < r.length && (o[o.length] = r[n])
                    : (o = o.concat(r))
                  : -1 == n && (o[o.length] = r));
          l[l.length] = o;
        }
        d = l[l.length - 1];
      }
    return d;
  }),
  (jindo.$Json.prototype.toString = function () {
    return (
      window.JSON && window.JSON.stringify
        ? (jindo.$Json.prototype.toString = function () {
            try {
              return window.JSON.stringify(this._object);
            } catch (e) {
              return jindo.$Json._oldToString(this._object);
            }
          })
        : (jindo.$Json.prototype.toString = function () {
            return jindo.$Json._oldToString(this._object);
          }),
      this.toString()
    );
  }),
  (jindo.$Json._oldToString = function (e) {
    var t = {
      $: function (e) {
        return "object" == typeof e && null == e
          ? "null"
          : "undefined" == typeof e
          ? '""'
          : "boolean" == typeof e
          ? e
            ? "true"
            : "false"
          : "string" == typeof e
          ? this.s(e)
          : "number" == typeof e
          ? e
          : e instanceof Array
          ? this.a(e)
          : e instanceof Object
          ? this.o(e)
          : void 0;
      },
      s: function (e) {
        var t = { '"': '\\"', "\\": "\\\\", "\n": "\\n", "\r": "\\r", "	": "\\t" },
          n = function (e) {
            return "undefined" != typeof t[e] ? t[e] : e;
          };
        return '"' + e.replace(/[\\"'\n\r\t]/g, n) + '"';
      },
      a: function (e) {
        for (var t = "[", n = "", o = e.length, i = 0; o > i; i++)
          "function" != typeof e[i] && ((t += n + this.$(e[i])), n || (n = ","));
        return t + "]";
      },
      o: function (e) {
        e = jindo.$H(e).ksort().$value();
        var t = "{",
          n = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            if ("function" == typeof e[o]) continue;
            (t += n + this.s(o) + ":" + this.$(e[o])), n || (n = ",");
          }
        return t + "}";
      },
    };
    return t.$(e);
  }),
  (jindo.$Json.prototype.toXML = function () {
    var e = function (t, n) {
      var o = function (e, t) {
        return "<" + n + (t || "") + ">" + e + "</" + n + ">";
      };
      switch (typeof t) {
        case "undefined":
        case "null":
          return o("");
        case "number":
          return o(t);
        case "string":
          return o(t.indexOf("<") < 0 ? t.replace(/&/g, "&amp;") : "<![CDATA[" + t + "]]>");
        case "boolean":
          return o(String(t));
        case "object":
          var i = "";
          if (t instanceof Array) for (var r = t.length, s = 0; r > s; s++) i += e(t[s], n);
          else {
            var a = "";
            for (var u in t)
              if (t.hasOwnProperty(u)) {
                if ("$cdata" == u || "function" == typeof t[u]) continue;
                i += e(t[u], u);
              }
            n && (i = o(i, a));
          }
          return i;
      }
    };
    return e(this._object, "");
  }),
  (jindo.$Json.prototype.toObject = function () {
    return this._object;
  }),
  (jindo.$Json.prototype.compare = function (e) {
    return (
      jindo.$Json._oldToString(this._object).toString() ==
      jindo.$Json._oldToString(jindo.$Json(e).$value()).toString()
    );
  }),
  (jindo.$Json.prototype.$value = jindo.$Json.prototype.toObject),
  (jindo.$Cookie = function () {
    var e = arguments.callee;
    e._cached;
    return e._cached
      ? e._cached
      : this instanceof e
      ? void ("undefined" == typeof e._cached && (e._cached = this))
      : new e();
  }),
  (jindo.$Cookie.prototype.keys = function () {
    for (
      var e = document.cookie.split(";"), t = /^\s+|\s+$/g, n = new Array(), o = 0;
      o < e.length;
      o++
    )
      n[n.length] = e[o].substr(0, e[o].indexOf("=")).replace(t, "");
    return n;
  }),
  (jindo.$Cookie.prototype.get = function (e) {
    for (
      var t = document.cookie.split(/\s*;\s*/), n = new RegExp("^(\\s*" + e + "\\s*=)"), o = 0;
      o < t.length;
      o++
    )
      if (n.test(t[o])) return unescape(t[o].substr(RegExp.$1.length));
    return null;
  }),
  (jindo.$Cookie.prototype.set = function (e, t, n, o, i) {
    var r = "";
    return (
      "number" == typeof n &&
        (r = ";expires=" + new Date(new Date().getTime() + 1e3 * n * 60 * 60 * 24).toGMTString()),
      "undefined" == typeof o && (o = ""),
      "undefined" == typeof i && (i = "/"),
      (document.cookie = e + "=" + escape(t) + r + "; path=" + i + (o ? "; domain=" + o : "")),
      this
    );
  }),
  (jindo.$Cookie.prototype.remove = function (e, t, n) {
    return null != this.get(e) && this.set(e, "", -1, t, n), this;
  }),
  (jindo.$Event = function (e) {
    var t = arguments.callee;
    return e instanceof t
      ? e
      : this instanceof t
      ? ("undefined" == typeof e && (e = window.event),
        e === window.event && document.createEventObject && (e = document.createEventObject(e)),
        (this._event = e),
        (this._globalEvent = window.event),
        (this.type = e.type.toLowerCase()),
        "dommousescroll" == this.type
          ? (this.type = "mousewheel")
          : "domcontentloaded" == this.type && (this.type = "domready"),
        (this.canceled = !1),
        (this.element = e.target || e.srcElement),
        (this.currentElement = e.currentTarget),
        (this.relatedElement = null),
        void ("undefined" != typeof e.relatedTarget
          ? (this.relatedElement = e.relatedTarget)
          : e.fromElement &&
            e.toElement &&
            (this.relatedElement = e["mouseout" == this.type ? "toElement" : "fromElement"])))
      : new t(e);
  }),
  (jindo.$Event.prototype.mouse = function () {
    var e = this._event,
      t = 0,
      n = !1,
      o = !1,
      i = !1,
      n = e.which ? 0 == e.button : !!(1 & e.button),
      o = e.which ? 1 == e.button : !!(4 & e.button),
      i = e.which ? 2 == e.button : !!(2 & e.button),
      r = {};
    return (
      e.wheelDelta ? (t = e.wheelDelta / 120) : e.detail && (t = -e.detail / 3),
      (r = { delta: t, left: n, middle: o, right: i }),
      (this.mouse = function () {
        return r;
      }),
      r
    );
  }),
  (jindo.$Event.prototype.key = function () {
    var e = this._event,
      t = e.keyCode || e.charCode,
      n = {
        keyCode: t,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
        up: 38 == t,
        down: 40 == t,
        left: 37 == t,
        right: 39 == t,
        enter: 13 == t,
        esc: 27 == t,
      };
    return (
      (this.key = function () {
        return n;
      }),
      n
    );
  }),
  (jindo.$Event.prototype.pos = function (e) {
    var t = this._event,
      n = (this.element.ownerDocument || document).body,
      o = (this.element.ownerDocument || document).documentElement,
      i = [n.scrollLeft || o.scrollLeft, n.scrollTop || o.scrollTop],
      r = {
        clientX: t.clientX,
        clientY: t.clientY,
        pageX: "pageX" in t ? t.pageX : t.clientX + i[0] - n.clientLeft,
        pageY: "pageY" in t ? t.pageY : t.clientY + i[1] - n.clientTop,
        layerX: "offsetX" in t ? t.offsetX : t.layerX - 1,
        layerY: "offsetY" in t ? t.offsetY : t.layerY - 1,
      };
    if (e && jindo.$Element) {
      var s = jindo.$Element(this.element).offset();
      (r.offsetX = r.pageX - s.left), (r.offsetY = r.pageY - s.top);
    }
    return r;
  }),
  (jindo.$Event.prototype.stop = function (e) {
    e = e || jindo.$Event.CANCEL_ALL;
    var t = window.event && window.event == this._globalEvent ? this._globalEvent : this._event,
      n = !!(e & jindo.$Event.CANCEL_BUBBLE),
      o = !!(e & jindo.$Event.CANCEL_DEFAULT);
    return (
      (this.canceled = !0),
      "undefined" != typeof t.preventDefault && o && t.preventDefault(),
      "undefined" != typeof t.stopPropagation && n && t.stopPropagation(),
      o && (t.returnValue = !1),
      n && (t.cancelBubble = !0),
      this
    );
  }),
  (jindo.$Event.prototype.stopDefault = function () {
    return this.stop(jindo.$Event.CANCEL_DEFAULT);
  }),
  (jindo.$Event.prototype.stopBubble = function () {
    return this.stop(jindo.$Event.CANCEL_BUBBLE);
  }),
  (jindo.$Event.prototype.$value = function () {
    return this._event;
  }),
  (jindo.$Event.CANCEL_BUBBLE = 1),
  (jindo.$Event.CANCEL_DEFAULT = 2),
  (jindo.$Event.CANCEL_ALL = 3),
  (jindo.$Element = function (e) {
    var t = arguments.callee;
    if (e && e instanceof t) return e;
    if (null === e || "undefined" == typeof e) return null;
    if (((e = jindo.$(e)), null === e)) return null;
    if (!(this instanceof t)) return new t(e);
    this._element = "string" == typeof e ? jindo.$(e) : e;
    var n = this._element.tagName;
    this.tag = "undefined" != typeof n ? n.toLowerCase() : "";
  });
var _j_ag = navigator.userAgent,
  IS_IE = _j_ag.indexOf("MSIE") > -1,
  IS_FF = _j_ag.indexOf("Firefox") > -1,
  IS_OP = _j_ag.indexOf("Opera") > -1,
  IS_SF = _j_ag.indexOf("Apple") > -1,
  IS_CH = _j_ag.indexOf("Chrome") > -1;
(jindo.$Element.prototype.$value = function () {
  return this._element;
}),
  (jindo.$Element.prototype.visible = function (e, t) {
    return "undefined" != typeof e
      ? (this[e ? "show" : "hide"](t), this)
      : "none" != this.css("display");
  }),
  (jindo.$Element.prototype.show = function (e) {
    var t = this._element.style,
      n = "block",
      o = {
        p: n,
        div: n,
        form: n,
        h1: n,
        h2: n,
        h3: n,
        h4: n,
        ol: n,
        ul: n,
        fieldset: n,
        td: "table-cell",
        th: "table-cell",
        li: "list-item",
        table: "table",
        thead: "table-header-group",
        tbody: "table-row-group",
        tfoot: "table-footer-group",
        tr: "table-row",
        col: "table-column",
        colgroup: "table-column-group",
        caption: "table-caption",
        dl: n,
        dt: n,
        dd: n,
      };
    try {
      if (e) t.display = e;
      else {
        var i = o[this.tag];
        t.display = i || "inline";
      }
    } catch (r) {
      t.display = "block";
    }
    return this;
  }),
  (jindo.$Element.prototype.hide = function () {
    return (this._element.style.display = "none"), this;
  }),
  (jindo.$Element.prototype.toggle = function (e) {
    return this[this.visible() ? "hide" : "show"](e), this;
  }),
  (jindo.$Element.prototype.opacity = function (e) {
    var t,
      n = this._element,
      o = "none" != this._getCss(n, "display");
    return (
      (e = parseFloat(e)),
      (n.style.zoom = 1),
      isNaN(e)
        ? ("undefined" != typeof n.filters
            ? ((t =
                "undefined" == typeof n.filters.alpha ? (o ? 100 : 0) : n.filters.alpha.opacity),
              (t /= 100))
            : ((t = parseFloat(n.style.opacity)), isNaN(t) && (t = o ? 1 : 0)),
          t)
        : ((e = Math.max(Math.min(e, 1), 0)),
          "undefined" != typeof n.filters
            ? ((e = Math.ceil(100 * e)),
              "unknown" != typeof n.filters && "undefined" != typeof n.filters.alpha
                ? (n.filters.alpha.opacity = e)
                : (n.style.filter = n.style.filter + " alpha(opacity=" + e + ")"))
            : (n.style.opacity = e),
          e)
    );
  }),
  (jindo.$Element.prototype.css = function (e, t) {
    var n = this._element,
      o = typeof t;
    if ("opacity" == e) return "undefined" == o ? this.opacity() : this.opacity(t);
    var i = typeof e;
    if ("string" == i) {
      if ("string" != o && "number" != o) {
        var r = this._getCss;
        if ((IS_FF || IS_OP) && ("backgroundPositionX" == e || "backgroundPositionY" == e)) {
          var s = r(n, "backgroundPosition").split(/\s+/);
          return "backgroundPositionX" == e ? s[0] : s[1];
        }
        if (IS_IE && "backgroundPosition" == e)
          return r(n, "backgroundPositionX") + " " + r(n, "backgroundPositionY");
        if ((IS_FF || IS_SF || IS_CH) && ("padding" == e || "margin" == e)) {
          var a = r(n, e + "Top"),
            u = r(n, e + "Right"),
            l = r(n, e + "Bottom"),
            d = r(n, e + "Left");
          return a == u && l == d
            ? a
            : a == l && u == d
            ? a + " " + u
            : a + " " + u + " " + l + " " + d;
        }
        return r(n, e);
      }
      var c = {};
      (c[e] = t), (e = c);
    }
    var p = jindo.$H;
    if (("undefined" != typeof p && e instanceof p && (e = e._table), "object" == typeof e)) {
      var f, h;
      for (var y in e)
        if (e.hasOwnProperty(y)) {
          if (((f = e[y]), (h = typeof f), "string" != h && "number" != h)) continue;
          if ("opacity" == y) {
            "undefined" == h ? this.opacity() : this.opacity(f);
            continue;
          }
          if (
            ("cssFloat" == y && IS_IE && (y = "styleFloat"),
            (!IS_FF && !IS_OP) || ("backgroundPositionX" != y && "backgroundPositionY" != y))
          )
            this._setCss(n, y, f);
          else {
            var s = this.css("backgroundPosition").split(/\s+/);
            (f = "backgroundPositionX" == y ? f + " " + s[1] : s[0] + " " + f),
              this._setCss(n, "backgroundPosition", f);
          }
        }
    }
    return this;
  }),
  (jindo.$Element.prototype._getCss = function (e, t) {
    var n;
    return (
      (n = e.currentStyle
        ? function (e, t) {
            try {
              "cssFloat" == t && (t = "styleFloat");
              var n = e.style[t];
              if (n) return n;
              var o = e.currentStyle;
              return o ? o[t] : n;
            } catch (i) {
              throw new Error((e.tagName || "document") + "는 css를 사용 할수 없습니다.");
            }
          }
        : window.getComputedStyle
        ? function (e, t) {
            try {
              "cssFloat" == t && (t = "float");
              var n = e.ownerDocument || e.document || document,
                o =
                  e.style[t] ||
                  n.defaultView
                    .getComputedStyle(e, null)
                    .getPropertyValue(t.replace(/([A-Z])/g, "-$1").toLowerCase());
              return "textDecoration" == t && (o = o.replace(",", "")), o;
            } catch (i) {
              throw new Error((e.tagName || "document") + "는 css를 사용 할수 없습니다.");
            }
          }
        : function (e, t) {
            try {
              return "cssFloat" == t && IS_IE && (t = "styleFloat"), e.style[t];
            } catch (n) {
              throw new Error((e.tagName || "document") + "는 css를 사용 할수 없습니다.");
            }
          }),
      (jindo.$Element.prototype._getCss = n),
      n(e, t)
    );
  }),
  (jindo.$Element.prototype._setCss = function (e, t, n) {
    "#top#left#right#bottom#".indexOf(t + "#") > 0 && ("number" == typeof n || /\d$/.test(n))
      ? (e.style[t] = parseInt(n, 10) + "px")
      : (e.style[t] = n);
  }),
  (jindo.$Element.prototype.attr = function (e, t) {
    var n = this._element;
    if ("string" == typeof e) {
      if ("undefined" == typeof t)
        return "class" == e || "className" == e
          ? n.className
          : "style" == e
          ? n.style.cssText
          : "checked" == e || "disabled" == e
          ? !!n[e]
          : "value" == e
          ? n.value
          : "href" == e
          ? n.getAttribute(e, 2)
          : n.getAttribute(e);
      var o = {};
      (o[e] = t), (e = o);
    }
    if (
      ("undefined" != typeof jindo.$H && e instanceof jindo.$H && (e = e.$value()),
      "object" == typeof e)
    )
      for (var i in e)
        e.hasOwnProperty(i) &&
          ("undefined" != typeof t && null === t
            ? n.removeAttribute(i)
            : "class" == i || "className" == i
            ? (n.className = e[i])
            : "style" == i
            ? (n.style.cssText = e[i])
            : "checked" == i || "disabled" == i
            ? (n[i] = e[i])
            : "value" == i
            ? (n.value = e[i])
            : n.setAttribute(i, e[i]));
    return this;
  }),
  (jindo.$Element.prototype.width = function (e) {
    if ("number" == typeof e) {
      var t = this._element;
      t.style.width = e + "px";
      var n = t.offsetWidth;
      if (n != e && 0 !== n) {
        var o = 2 * e - n;
        o > 0 && (t.style.width = o + "px");
      }
      return this;
    }
    return this._element.offsetWidth;
  }),
  (jindo.$Element.prototype.height = function (e) {
    if ("number" == typeof e) {
      var t = this._element;
      t.style.height = e + "px";
      var n = t.offsetHeight;
      if (n != e && 0 !== n) {
        var e = 2 * e - n;
        e > 0 && (t.style.height = e + "px");
      }
      return this;
    }
    return this._element.offsetHeight;
  }),
  (jindo.$Element.prototype.className = function (e) {
    var t = this._element;
    return "undefined" == typeof e ? t.className : ((t.className = e), this);
  }),
  (jindo.$Element.prototype.hasClass = function (e) {
    return (
      this._element.classList
        ? (jindo.$Element.prototype.hasClass = function (e) {
            return this._element.classList.contains(e);
          })
        : (jindo.$Element.prototype.hasClass = function (e) {
            return (" " + this._element.className + " ").indexOf(" " + e + " ") > -1;
          }),
      this.hasClass(e)
    );
  }),
  (jindo.$Element.prototype.addClass = function (e) {
    return (
      this._element.classList
        ? (jindo.$Element.prototype.addClass = function (e) {
            for (var t = e.split(/\s+/), n = this._element.classList, o = t.length; o--; )
              n.add(t[o]);
            return this;
          })
        : (jindo.$Element.prototype.addClass = function (e) {
            for (var t, n = this._element, o = e.split(/\s+/), i = o.length - 1; i >= 0; i--)
              (t = o[i]),
                this.hasClass(t) || (n.className = (n.className + " " + t).replace(/^\s+/, ""));
            return this;
          }),
      this.addClass(e)
    );
  }),
  (jindo.$Element.prototype.removeClass = function (e) {
    return (
      this._element.classList
        ? (jindo.$Element.prototype.removeClass = function (e) {
            for (var t = this._element.classList, n = e.split(" "), o = n.length; o--; )
              t.remove(n[o]);
            return this;
          })
        : (jindo.$Element.prototype.removeClass = function (e) {
            for (var t, n = this._element, o = e.split(/\s+/), i = o.length - 1; i >= 0; i--)
              (t = o[i]),
                this.hasClass(t) &&
                  (n.className = (" " + n.className.replace(/\s+$/, "").replace(/^\s+/, "") + " ")
                    .replace(" " + t + " ", " ")
                    .replace(/\s+$/, "")
                    .replace(/^\s+/, ""));
            return this;
          }),
      this.removeClass(e)
    );
  }),
  (jindo.$Element.prototype.toggleClass = function (e, t) {
    return (
      this._element.classList
        ? (jindo.$Element.prototype.toggleClass = function (e, t) {
            return (
              "undefined" == typeof t
                ? this._element.classList.toggle(e)
                : this.hasClass(e)
                ? (this.removeClass(e), this.addClass(t))
                : (this.addClass(e), this.removeClass(t)),
              this
            );
          })
        : (jindo.$Element.prototype.toggleClass = function (e, t) {
            return (
              (t = t || ""),
              this.hasClass(e)
                ? (this.removeClass(e), t && this.addClass(t))
                : (this.addClass(e), t && this.removeClass(t)),
              this
            );
          }),
      this.toggleClass(e, t)
    );
  }),
  (jindo.$Element.prototype.text = function (e) {
    var t = this._element,
      n = this.tag,
      o = "undefined" != typeof t.innerText ? "innerText" : "textContent";
    ("textarea" == n || "input" == n) && (o = "value");
    var i = typeof e;
    if ("undefined" != i && ("string" == i || "number" == i || "boolean" == i)) {
      e += "";
      try {
        "value" != o && (o = "undefined" != typeof t.textContent ? "textContent" : "innerText"),
          (t[o] = e);
      } catch (r) {
        return this.html(e.replace(/&/g, "&amp;").replace(/</g, "&lt;"));
      }
      return this;
    }
    return t[o];
  }),
  (jindo.$Element.prototype.html = function (e) {
    var t = IS_IE,
      n = IS_FF;
    return (
      t
        ? (jindo.$Element.prototype.html = function (e) {
            if ("undefined" != typeof e && arguments.length) {
              (e += ""), jindo.$$.release();
              for (var t = this._element; t.firstChild; ) t.removeChild(t.firstChild);
              var n,
                o = "R" + new Date().getTime() + parseInt(1e5 * Math.random(), 10),
                i = t.ownerDocument || t.document || document,
                r = t.tagName.toLowerCase();
              switch (r) {
                case "select":
                case "table":
                  (n = i.createElement("div")),
                    (n.innerHTML = "<" + r + ' class="' + o + '">' + e + "</" + r + ">");
                  break;
                case "tr":
                case "thead":
                case "tbody":
                case "colgroup":
                  (n = i.createElement("div")),
                    (n.innerHTML =
                      "<table><" + r + ' class="' + o + '">' + e + "</" + r + "></table>");
                  break;
                default:
                  t.innerHTML = e;
              }
              if (n) {
                var s;
                for (s = n.firstChild; s && s.className != o; s = s.firstChild);
                if (s) {
                  for (var a, u = !0; (a = t.firstChild); ) a.removeNode(!0);
                  for (var a = s.firstChild; a; a = s.firstChild)
                    if ("select" == r) {
                      var l = a.cloneNode(!0);
                      a.selected && u && ((u = !1), (l.selected = !0)),
                        t.appendChild(l),
                        a.removeNode(!0);
                    } else t.appendChild(a);
                  n.removeNode && n.removeNode(!0);
                }
                n = null;
              }
              return this;
            }
            return this._element.innerHTML;
          })
        : n
        ? (jindo.$Element.prototype.html = function (e) {
            if ("undefined" != typeof e && arguments.length) {
              e += "";
              var t = this._element;
              if (t.parentNode) t.innerHTML = e;
              else {
                var n,
                  o = "R" + new Date().getTime() + parseInt(1e5 * Math.random(), 10),
                  i = t.ownerDocument || t.document || document,
                  r = t.tagName.toLowerCase();
                switch (r) {
                  case "select":
                  case "table":
                    (n = i.createElement("div")),
                      (n.innerHTML = "<" + r + ' class="' + o + '">' + e + "</" + r + ">");
                    break;
                  case "tr":
                  case "thead":
                  case "tbody":
                  case "colgroup":
                    (n = i.createElement("div")),
                      (n.innerHTML =
                        "<table><" + r + ' class="' + o + '">' + e + "</" + r + "></table>");
                    break;
                  default:
                    t.innerHTML = e;
                }
                if (n) {
                  var s;
                  for (s = n.firstChild; s && s.className != o; s = s.firstChild);
                  if (s) {
                    for (var a; (a = t.firstChild); ) a.removeNode(!0);
                    for (var a = s.firstChild; a; a = s.firstChild) t.appendChild(a);
                    n.removeNode && n.removeNode(!0);
                  }
                  n = null;
                }
              }
              return this;
            }
            return this._element.innerHTML;
          })
        : (jindo.$Element.prototype.html = function (e) {
            if ("undefined" != typeof e && arguments.length) {
              e += "";
              var t = this._element;
              return (t.innerHTML = e), this;
            }
            return this._element.innerHTML;
          }),
      this.html(e)
    );
  }),
  (jindo.$Element.prototype.outerHTML = function () {
    var e = this._element;
    if ("undefined" != typeof e.outerHTML) return e.outerHTML;
    var t = e.ownerDocument || e.document || document,
      n = t.createElement("div"),
      o = e.parentNode;
    if (!o) return e.innerHTML;
    o.insertBefore(n, e), (n.style.display = "none"), n.appendChild(e);
    var i = n.innerHTML;
    return o.insertBefore(e, n), o.removeChild(n), i;
  }),
  (jindo.$Element.prototype.toString = jindo.$Element.prototype.outerHTML),
  (jindo.$Element._getTransition = function () {
    var e = !1,
      t = "";
    return (
      "undefined" != typeof document.body.style.trasition
        ? ((e = !0), (t = "trasition"))
        : "undefined" != typeof document.body.style.webkitTransition
        ? ((e = !0), (t = "webkitTransition"))
        : "undefined" != typeof document.body.style.OTransition && ((e = !0), (t = "OTransition")),
      (jindo.$Element._getTransition = function () {
        return { hasTransition: e, name: t };
      })()
    );
  }),
  (jindo.$Element.prototype.appear = function (e, t) {
    var n = jindo.$Element._getTransition();
    return (
      n.hasTransition
        ? (jindo.$Element.prototype.appear = function (e, t) {
            e = e || 0.3;
            var o = this;
            t = t || function () {};
            var i = function () {
                t(), o.show(), this.removeEventListener(n.name + "End", arguments.callee, !1);
              },
              r = this._element;
            return (
              this.visible() || ((r.style.opacity = r.style.opacity || 0), o.show()),
              r.addEventListener(n.name + "End", i, !1),
              (r.style[n.name + "Property"] = "opacity"),
              (r.style[n.name + "Duration"] = e + "s"),
              (r.style[n.name + "TimingFunction"] = "linear"),
              setTimeout(function () {
                r.style.opacity = "1";
              }, 1),
              this
            );
          })
        : (jindo.$Element.prototype.appear = function (e, t) {
            var n = this,
              o = this.opacity();
            if ((this.visible() || (o = 0), 1 == o)) return this;
            try {
              clearTimeout(this._fade_timer);
            } catch (i) {}
            t = t || function () {};
            var r = (1 - o) / (100 * (e || 0.3)),
              s = function () {
                (o += r), n.opacity(o), o >= 1 ? t(n) : (n._fade_timer = setTimeout(s, 10));
              };
            return this.show(), s(), this;
          }),
      this.appear(e, t)
    );
  }),
  (jindo.$Element.prototype.disappear = function (e, t) {
    var n = jindo.$Element._getTransition();
    return (
      n.hasTransition
        ? (jindo.$Element.prototype.disappear = function (e, t) {
            e = e || 0.3;
            var o = this;
            t = t || function () {};
            var i = function () {
                t(), this.removeEventListener(n.name + "End", arguments.callee, !1), o.hide();
              },
              r = this._element;
            return (
              r.addEventListener(n.name + "End", i, !1),
              (r.style[n.name + "Property"] = "opacity"),
              (r.style[n.name + "Duration"] = e + "s"),
              (r.style[n.name + "TimingFunction"] = "linear"),
              setTimeout(function () {
                r.style.opacity = "0";
              }, 1),
              this
            );
          })
        : (jindo.$Element.prototype.disappear = function (e, t) {
            var n = this,
              o = this.opacity();
            if (0 == o) return this;
            try {
              clearTimeout(this._fade_timer);
            } catch (i) {}
            t = t || function () {};
            var r = o / (100 * (e || 0.3)),
              s = function () {
                (o -= r),
                  n.opacity(o),
                  0 >= o ? (n.hide(), n.opacity(1), t(n)) : (n._fade_timer = setTimeout(s, 10));
              };
            return s(), this;
          }),
      this.disappear(e, t)
    );
  }),
  (jindo.$Element.prototype.offset = function (e, t) {
    var n = this._element,
      o = null;
    if ("number" == typeof e && "number" == typeof t) {
      isNaN(parseInt(this.css("top"), 10)) && this.css("top", 0),
        isNaN(parseInt(this.css("left"), 10)) && this.css("left", 0);
      var i = this.offset(),
        r = { top: e - i.top, left: t - i.left };
      return (
        (n.style.top = parseInt(this.css("top"), 10) + r.top + "px"),
        (n.style.left = parseInt(this.css("left"), 10) + r.left + "px"),
        this
      );
    }
    var s = /Safari/.test(navigator.userAgent),
      a = /MSIE/.test(navigator.userAgent),
      u = a ? navigator.userAgent.match(/(?:MSIE) ([0-9.]+)/)[1] : 0,
      l = function (e) {
        for (var t = { left: 0, top: 0 }, n = e, o = n.offsetParent; (n = n.parentNode); )
          n.offsetParent && ((t.left -= n.scrollLeft), (t.top -= n.scrollTop)),
            n == o &&
              ((t.left += e.offsetLeft + n.clientLeft),
              (t.top += e.offsetTop + n.clientTop),
              n.offsetParent || ((t.left += n.offsetLeft), (t.top += n.offsetTop)),
              (o = n.offsetParent),
              (e = n));
        return t;
      },
      d = function (e) {
        var t = { left: 0, top: 0 },
          n = e.ownerDocument || e.document || document,
          i = n.documentElement,
          r = n.body;
        if (e.getBoundingClientRect) {
          if (!o) {
            var s = window == top;
            if (!s)
              try {
                s = window.frameElement && 1 == window.frameElement.frameBorder;
              } catch (l) {}
            a && 8 > u && window.external && s
              ? ((o = { left: 2, top: 2 }), (oBase = null))
              : (o = { left: 0, top: 0 });
          }
          var d = e.getBoundingClientRect();
          e !== i &&
            e !== r &&
            ((t.left = d.left - o.left),
            (t.top = d.top - o.top),
            (t.left += i.scrollLeft || r.scrollLeft),
            (t.top += i.scrollTop || r.scrollTop));
        } else if (n.getBoxObjectFor) {
          var d = n.getBoxObjectFor(e),
            c = n.getBoxObjectFor(i || r);
          (t.left = d.screenX - c.screenX), (t.top = d.screenY - c.screenY);
        } else {
          for (var p = e; p; p = p.offsetParent) (t.left += p.offsetLeft), (t.top += p.offsetTop);
          for (var p = e.parentNode; p && "BODY" != p.tagName; p = p.parentNode)
            "TR" == p.tagName && (t.top += 2), (t.left -= p.scrollLeft), (t.top -= p.scrollTop);
        }
        return t;
      };
    return (s ? l : d)(n);
  }),
  (jindo.$Element.prototype.evalScripts = function (sHTML) {
    var aJS = [];
    return (
      (sHTML = sHTML.replace(
        new RegExp("<script(\\s[^>]+)*>(.*?)</script>", "gi"),
        function (e, t, n) {
          return aJS.push(n), "";
        }
      )),
      eval(aJS.join("\n")),
      this
    );
  }),
  (jindo.$Element._append = function (e, t) {
    return (
      "string" == typeof t ? (t = jindo.$(t)) : t instanceof jindo.$Element && (t = t.$value()),
      e._element.appendChild(t),
      e
    );
  }),
  (jindo.$Element._prepend = function (e, t) {
    "string" == typeof e ? (e = jindo.$(e)) : e instanceof jindo.$Element && (e = e.$value());
    var n = e.childNodes;
    return n.length > 0 ? e.insertBefore(t._element, n[0]) : e.appendChild(t._element), t;
  }),
  (jindo.$Element.prototype.append = function (e) {
    return jindo.$Element._append(this, e);
  }),
  (jindo.$Element.prototype.prepend = function (e) {
    return jindo.$Element._prepend(this._element, jindo.$Element(e));
  }),
  (jindo.$Element.prototype.replace = function (e) {
    jindo.$$.release();
    var t = this._element,
      n = t.parentNode,
      o = jindo.$Element(e);
    if (n && n.replaceChild) return n.replaceChild(o.$value(), t), o;
    var o = o.$value();
    return n.insertBefore(o, t), n.removeChild(t), o;
  }),
  (jindo.$Element.prototype.appendTo = function (e) {
    var t = jindo.$Element(e);
    return jindo.$Element._append(t, this._element), t;
  }),
  (jindo.$Element.prototype.prependTo = function (e) {
    return jindo.$Element._prepend(e, this), jindo.$Element(e);
  }),
  (jindo.$Element.prototype.before = function (e) {
    var t = jindo.$Element(e),
      n = t.$value();
    return this._element.parentNode.insertBefore(n, this._element), t;
  }),
  (jindo.$Element.prototype.after = function (e) {
    var t = this.before(e);
    return t.before(this), t;
  }),
  (jindo.$Element.prototype.parent = function (e, t) {
    var n = this._element,
      o = [],
      i = null;
    if ("undefined" == typeof e) return jindo.$Element(n.parentNode);
    for (
      ("undefined" == typeof t || 0 == t) && (t = -1);
      n.parentNode &&
      0 != t-- &&
      ((i = jindo.$Element(n.parentNode)), n.parentNode != document.documentElement);

    )
      (!e || (e && e(i))) && (o[o.length] = i), (n = n.parentNode);
    return o;
  }),
  (jindo.$Element.prototype.child = function (e, t) {
    var n = this._element,
      o = [],
      i = null;
    return "undefined" == typeof e
      ? jindo
          .$A(n.childNodes)
          .filter(function (e) {
            return 1 == e.nodeType;
          })
          .map(function (e) {
            return jindo.$Element(e);
          })
          .$value()
      : (("undefined" == typeof t || 0 == t) && (t = -1),
        (i = function (t, n) {
          for (var r = null, s = null, a = 0; a < t.childNodes.length; a++)
            (r = t.childNodes[a]),
              1 == r.nodeType &&
                ((s = jindo.$Element(t.childNodes[a])),
                (!e || (e && e(s))) && (o[o.length] = s),
                0 != n && i(t.childNodes[a], n - 1));
        })(n, t - 1),
        o);
  }),
  (jindo.$Element.prototype.prev = function (e) {
    var t = this._element,
      n = [],
      o = "undefined" == typeof e;
    if (!t) return o ? jindo.$Element(null) : n;
    do
      if (((t = t.previousSibling), t && 1 == t.nodeType)) {
        if (o) return jindo.$Element(t);
        (!e || e(t)) && (n[n.length] = jindo.$Element(t));
      }
    while (t);
    return o ? jindo.$Element(t) : n;
  }),
  (jindo.$Element.prototype.next = function (e) {
    var t = this._element,
      n = [],
      o = "undefined" == typeof e;
    if (!t) return o ? jindo.$Element(null) : n;
    do
      if (((t = t.nextSibling), t && 1 == t.nodeType)) {
        if (o) return jindo.$Element(t);
        (!e || e(t)) && (n[n.length] = jindo.$Element(t));
      }
    while (t);
    return o ? jindo.$Element(t) : n;
  }),
  (jindo.$Element.prototype.first = function () {
    var e = this._element.firstElementChild || this._element.firstChild;
    if (!e) return null;
    for (; e && 1 != e.nodeType; ) e = e.nextSibling;
    return e ? jindo.$Element(e) : null;
  }),
  (jindo.$Element.prototype.last = function () {
    var e = this._element.lastElementChild || this._element.lastChild;
    if (!e) return null;
    for (; e && 1 != e.nodeType; ) e = e.previousSibling;
    return e ? jindo.$Element(e) : null;
  }),
  (jindo.$Element.prototype.isChildOf = function (e) {
    return jindo.$Element._contain(jindo.$Element(e).$value(), this._element);
  }),
  (jindo.$Element.prototype.isParentOf = function (e) {
    return jindo.$Element._contain(this._element, jindo.$Element(e).$value());
  }),
  (jindo.$Element._contain = function (e, t) {
    return (
      document.compareDocumentPosition
        ? (jindo.$Element._contain = function (e, t) {
            return !!(16 & e.compareDocumentPosition(t));
          })
        : document.body.contains
        ? (jindo.$Element._contain = function (e, t) {
            return e !== t && (e.contains ? e.contains(t) : !0);
          })
        : (jindo.$Element._contain = function (e, t) {
            for (var n = e, o = t; n && n.parentNode; ) if (((n = n.parentNode), n == o)) return !0;
            return !1;
          }),
      jindo.$Element._contain(e, t)
    );
  }),
  (jindo.$Element.prototype.isEqual = function (e) {
    try {
      return this._element === jindo.$Element(e).$value();
    } catch (t) {
      return !1;
    }
  }),
  (jindo.$Element.prototype.fireEvent = function (e, t) {
    function n(e, t) {
      e = (e + "").toLowerCase();
      var n = document.createEventObject();
      if (t) {
        for (k in t) t.hasOwnProperty(k) && (n[k] = t[k]);
        (n.button = (t.left ? 1 : 0) + (t.middle ? 4 : 0) + (t.right ? 2 : 0)),
          (n.relatedTarget = t.relatedElement || null);
      }
      var o = this._element;
      return (
        "input" == this.tag &&
          "click" == e &&
          ("checkbox" == o.type ? (o.checked = !o.checked) : "radio" == o.type && (o.checked = !0)),
        this._element.fireEvent("on" + e, n),
        this
      );
    }
    function o(e, t) {
      var n = "HTMLEvents";
      (e = (e + "").toLowerCase()),
        "click" == e || 0 == e.indexOf("mouse")
          ? ((n = "MouseEvent"), "mousewheel" == e && (e = "dommousescroll"))
          : 0 == e.indexOf("key") && (n = "KeyboardEvent");
      var o;
      if (t)
        switch (
          ((t.button = 0 + (t.middle ? 1 : 0) + (t.right ? 2 : 0)),
          (t.ctrl = t.ctrl || !1),
          (t.alt = t.alt || !1),
          (t.shift = t.shift || !1),
          (t.meta = t.meta || !1),
          n)
        ) {
          case "MouseEvent":
            (o = document.createEvent(n)),
              o.initMouseEvent(
                e,
                !0,
                !0,
                null,
                t.detail || 0,
                t.screenX || 0,
                t.screenY || 0,
                t.clientX || 0,
                t.clientY || 0,
                t.ctrl,
                t.alt,
                t.shift,
                t.meta,
                t.button,
                t.relatedElement || null
              );
            break;
          case "KeyboardEvent":
            if (window.KeyEvent)
              (o = document.createEvent("KeyEvents")),
                o.initKeyEvent(
                  e,
                  !0,
                  !0,
                  window,
                  t.ctrl,
                  t.alt,
                  t.shift,
                  t.meta,
                  t.keyCode,
                  t.keyCode
                );
            else
              try {
                o = document.createEvent("Events");
              } catch (i) {
                o = document.createEvent("UIEvents");
              } finally {
                o.initEvent(e, !0, !0),
                  (o.ctrlKey = t.ctrl),
                  (o.altKey = t.alt),
                  (o.shiftKey = t.shift),
                  (o.metaKey = t.meta),
                  (o.keyCode = t.keyCode),
                  (o.which = t.keyCode);
              }
            break;
          default:
            (o = document.createEvent(n)), o.initEvent(e, !0, !0);
        }
      else (o = document.createEvent(n)), o.initEvent(e, !0, !0);
      return this._element.dispatchEvent(o), this;
    }
    return (
      (jindo.$Element.prototype.fireEvent =
        "undefined" != typeof this._element.dispatchEvent ? o : n),
      this.fireEvent(e, t)
    );
  }),
  (jindo.$Element.prototype.empty = function () {
    return jindo.$$.release(), this.html(""), this;
  }),
  (jindo.$Element.prototype.remove = function (e) {
    return jindo.$$.release(), jindo.$Element(e).leave(), this;
  }),
  (jindo.$Element.prototype.leave = function () {
    var e = this._element;
    return (
      e.parentNode && (jindo.$$.release(), e.parentNode.removeChild(e)),
      jindo.$Fn.freeElement(this._element),
      this
    );
  }),
  (jindo.$Element.prototype.wrap = function (e) {
    var t = this._element;
    return (
      (e = jindo.$Element(e).$value()),
      t.parentNode && t.parentNode.insertBefore(e, t),
      e.appendChild(t),
      this
    );
  }),
  (jindo.$Element.prototype.ellipsis = function (e) {
    e = e || "...";
    var t = this.text(),
      n = t.length,
      o = parseInt(this.css("paddingTop"), 10) + parseInt(this.css("paddingBottom"), 10),
      i = this.height() - o,
      r = 0,
      s = this.text("A").height() - o;
    if (1.5 * s > i) return this.text(t);
    for (i = s; 1.5 * s > i; )
      (r += Math.max(Math.ceil((n - r) / 2), 1)),
        (i = this.text(t.substring(0, r) + e).height() - o);
    for (; i > 1.5 * s; ) r--, (i = this.text(t.substring(0, r) + e).height() - o);
  }),
  (jindo.$Element.prototype.indexOf = function (e) {
    try {
      for (
        var t = jindo.$Element(e).$value(),
          n = this._element.childNodes,
          o = 0,
          i = n.length,
          r = 0;
        i > r;
        r++
      )
        if (1 == n[r].nodeType) {
          if (n[r] === t) return o;
          o++;
        }
    } catch (t) {}
    return -1;
  }),
  (jindo.$Element.prototype.queryAll = function (e) {
    return jindo.$$(e, this._element);
  }),
  (jindo.$Element.prototype.query = function (e) {
    return jindo.$$.getSingle(e, this._element);
  }),
  (jindo.$Element.prototype.test = function (e) {
    return jindo.$$.test(this._element, e);
  }),
  (jindo.$Element.prototype.xpathAll = function (e) {
    return jindo.$$.xpath(e, this._element);
  }),
  (jindo.$Element.insertAdjacentHTML = function (e, t, n, o, i) {
    var r = e._element;
    if (
      r.insertAdjacentHTML &&
      !/^<(option|tr|td|th|col)(?:.*?)>/.test(t.replace(/^(\s|　)+|(\s|　)+$/g, "").toLowerCase())
    )
      r.insertAdjacentHTML(n, t);
    else {
      var s,
        a = r.ownerDocument || r.document || document,
        u = a.createDocumentFragment(),
        l = t.replace(/^(\s|　)+|(\s|　)+$/g, ""),
        d = {
          option: "select",
          tr: "tbody",
          thead: "table",
          tbody: "table",
          col: "table",
          td: "tr",
          th: "tr",
          div: "div",
        },
        c = /^\<(option|tr|thead|tbody|td|th|col)(?:.*?)\>/i.exec(l),
        p = null === c ? "div" : c[1].toLowerCase(),
        f = d[p];
      s = jindo._createEle(f, l, a, !0);
      for (var h = s.getElementsByTagName("script"), y = 0, m = h.length; m > y; y++)
        h[y].parentNode.removeChild(h[y]);
      for (; s[o]; ) u.appendChild(s[o]);
      i(u.cloneNode(!0));
    }
    return e;
  }),
  (jindo.$Element.prototype.appendHTML = function (e) {
    return jindo.$Element.insertAdjacentHTML(
      this,
      e,
      "beforeEnd",
      "firstChild",
      jindo
        .$Fn(function (e) {
          this.append(e);
        }, this)
        .bind()
    );
  }),
  (jindo.$Element.prototype.prependHTML = function (e) {
    return jindo.$Element.insertAdjacentHTML(
      this,
      e,
      "afterBegin",
      "lastChild",
      jindo
        .$Fn(function (e) {
          this.prepend(e);
        }, this)
        .bind()
    );
  }),
  (jindo.$Element.prototype.beforeHTML = function (e) {
    return jindo.$Element.insertAdjacentHTML(
      this,
      e,
      "beforeBegin",
      "firstChild",
      jindo
        .$Fn(function (e) {
          this.before(e);
        }, this)
        .bind()
    );
  }),
  (jindo.$Element.prototype.afterHTML = function (e) {
    return jindo.$Element.insertAdjacentHTML(
      this,
      e,
      "afterEnd",
      "lastChild",
      jindo
        .$Fn(function (e) {
          this._element.parentNode.insertBefore(e, this._element.nextSibling);
        }, this)
        .bind()
    );
  }),
  (jindo.$Element.prototype.delegate = function (e, t, n) {
    if (!this._element["_delegate_" + e]) {
      this._element["_delegate_" + e] = {};
      var o = jindo
        .$Fn(function (e, t) {
          (t = t || window.event),
            "undefined" == typeof t.currentTarget && (t.currentTarget = this._element);
          var n,
            o,
            i,
            r,
            s = t.target || t.srcElement,
            a = this._element["_delegate_" + e];
          for (var u in a)
            if (((n = a[u]), (r = n.checker(s)), r[0])) {
              (o = n.func), (i = jindo.$Event(t)), (i.element = r[1]);
              for (var l = 0, d = o.length; d > l; l++) o[l](i);
            }
        }, this)
        .bind(e);
      jindo.$Element._eventBind(this._element, e, o);
      var i = this._element;
      (i["_delegate_" + e + "_func"] = o),
        this._element._delegate_events
          ? this._element._delegate_events.push(e)
          : (this._element._delegate_events = [e]),
        (i = null);
    }
    return this._bind(e, t, n), this;
  }),
  (jindo.$Element._eventBind = function (e, t, n) {
    e.addEventListener
      ? (jindo.$Element._eventBind = function (e, t, n) {
          e.addEventListener(t, n, !1);
        })
      : (jindo.$Element._eventBind = function (e, t, n) {
          e.attachEvent("on" + t, n);
        }),
      jindo.$Element._eventBind(e, t, n);
  }),
  (jindo.$Element.prototype.undelegate = function (e, t, n) {
    return this._unbind(e, t, n), this;
  }),
  (jindo.$Element.prototype._bind = function (e, t, n) {
    var o = this._element["_delegate_" + e];
    if (o) {
      var i;
      "string" == typeof t
        ? (i = jindo
            .$Fn(function (e, t) {
              var n = t,
                o = jindo.$$.test(t, e);
              if (!o)
                for (var i = this._getParent(t), r = 0, s = i.length; s > r; r++)
                  if (((n = i[r]), jindo.$$.test(n, e))) {
                    o = !0;
                    break;
                  }
              return [o, n];
            }, this)
            .bind(t))
        : "function" == typeof t &&
          (i = jindo
            .$Fn(function (e, t) {
              var n = t,
                o = e(this._element, t);
              if (!o)
                for (var i = this._getParent(t), r = 0, s = i.length; s > r; r++)
                  if (((n = i[r]), e(this._element, n))) {
                    o = !0;
                    break;
                  }
              return [o, n];
            }, this)
            .bind(t)),
        (this._element["_delegate_" + e] = jindo.$Element._addBind(o, t, n, i));
    } else alert("check your delegate event.");
  }),
  (jindo.$Element.prototype._getParent = function (e) {
    for (
      var t = this._element, n = [], o = null;
      e.parentNode && o != t && ((o = e.parentNode), o != document.documentElement);

    )
      (n[n.length] = o), (e = o);
    return n;
  }),
  (jindo.$Element._addBind = function (e, t, n, o) {
    var i = e[t];
    if (i) {
      var r = i.func;
      r.push(n), (i.func = r);
    } else i = { checker: o, func: [n] };
    return (e[t] = i), e;
  }),
  (jindo.$Element.prototype._unbind = function (e, t, n) {
    var o = this._element;
    if (e && t && n) {
      var i = o["_delegate_" + e];
      if (i && i[t]) {
        var r = i[t].func;
        (r = i[t].func = jindo.$A(r).refuse(n).$value()),
          r.length || jindo.$Element._deleteFilter(o, e, t);
      }
    } else if (e && t) jindo.$Element._deleteFilter(o, e, t);
    else if (e) jindo.$Element._deleteEvent(o, e, t);
    else {
      for (var s, a = o._delegate_events, u = 0, l = a.length; l > u; u++)
        (s = a[u]),
          jindo.$Element._unEventBind(o, s, o["_delegate_" + s + "_func"]),
          jindo.$Element._delDelegateInfo(o, "_delegate_" + s),
          jindo.$Element._delDelegateInfo(o, "_delegate_" + s + "_func");
      jindo.$Element._delDelegateInfo(o, "_delegate_events");
    }
    return this;
  }),
  (jindo.$Element._delDelegateInfo = function (e, t) {
    try {
      (e[t] = null), delete e[t];
    } catch (n) {}
    return e;
  }),
  (jindo.$Element._deleteFilter = function (e, t, n) {
    var o = e["_delegate_" + t];
    o &&
      o[n] &&
      (1 == jindo.$H(o).keys().length
        ? jindo.$Element._deleteEvent(e, t, n)
        : jindo.$Element._delDelegateInfo(o, n));
  }),
  (jindo.$Element._deleteEvent = function (e, t, n) {
    var o = e._delegate_events;
    jindo.$Element._unEventBind(e, t, e["_delegate_" + t + "_func"]),
      jindo.$Element._delDelegateInfo(e, "_delegate_" + t),
      jindo.$Element._delDelegateInfo(e, "_delegate_" + t + "_func"),
      (o = jindo.$A(o).refuse(t).$value()),
      o.length
        ? (e._delegate_events = jindo.$A(o).refuse(t).$value())
        : jindo.$Element._delDelegateInfo(e, "_delegate_events");
  }),
  (jindo.$Element._unEventBind = function (e, t, n) {
    e.removeEventListener
      ? (jindo.$Element._unEventBind = function (e, t, n) {
          e.removeEventListener(t, n, !1);
        })
      : (jindo.$Element._unEventBind = function (e, t, n) {
          e.detachEvent("on" + t, n);
        }),
      jindo.$Element._unEventBind(e, t, n);
  }),
  (jindo.$Fn = function (func, thisObject) {
    var cl = arguments.callee;
    return func instanceof cl
      ? func
      : this instanceof cl
      ? ((this._events = []),
        (this._tmpElm = null),
        (this._key = null),
        void ("function" == typeof func
          ? ((this._func = func), (this._this = thisObject))
          : "string" == typeof func &&
            "string" == typeof thisObject &&
            (this._func = eval("false||function(" + func + "){" + thisObject + "}"))))
      : new cl(func, thisObject);
  });
var _ua = navigator.userAgent;
if (
  ((jindo.$Fn.prototype.$value = function () {
    return this._func;
  }),
  (jindo.$Fn.prototype.bind = function () {
    var e = jindo.$A(arguments).$value(),
      t = this._func,
      n = this._this,
      o = function () {
        var o = jindo.$A(arguments).$value();
        return e.length && (o = e.concat(o)), t.apply(n, o);
      };
    return o;
  }),
  (jindo.$Fn.prototype.bindForEvent = function () {
    var e = arguments,
      t = this._func,
      n = this._this,
      o = this._tmpElm || null,
      i = function (i) {
        var r = Array.prototype.slice.apply(e);
        "undefined" == typeof i && (i = window.event),
          "undefined" == typeof i.currentTarget && (i.currentTarget = o);
        var s = jindo.$Event(i);
        r.unshift(s);
        var a = t.apply(n, r);
        return "undefined" != typeof a && "beforeunload" == s.type && (i.returnValue = a), a;
      };
    return i;
  }),
  (jindo.$Fn._resizeEventBugInIE = function (e) {
    var t = document.documentMode >= 9 && document.documentMode < 11;
    if (t) {
      var n = /resize/;
      jindo.$Fn._resizeEventBugInIE = function (e) {
        return n.test(e);
      };
    } else
      jindo.$Fn._resizeEventBugInIE = function () {
        return !1;
      };
    return jindo.$Fn._resizeEventBugInIE(e);
  }),
  (jindo.$Fn.prototype.attach = function (e, t, n) {
    var o = null,
      i = t,
      r = e,
      s = _ua;
    if (
      ("undefined" == typeof n && (n = !1),
      (this._bUseCapture = n),
      r instanceof Array || (jindo.$A && r instanceof jindo.$A && (r = r.$value())))
    ) {
      for (var a = 0; a < r.length; a++) this.attach(r[a], i, n);
      return this;
    }
    if (!r || !i) return this;
    "function" == typeof r.$value && (r = r.$value()),
      (r = jindo.$(r)),
      (i = i.toLowerCase()),
      (this._tmpElm = r),
      (o = this.bindForEvent()),
      (this._tmpElm = null);
    var u = s.indexOf("MSIE") > -1;
    if ("undefined" == typeof r.addEventListener || jindo.$Fn._resizeEventBugInIE(t)) {
      if ("undefined" != typeof r.attachEvent) {
        if ("domready" == i) {
          if (window.top != window) throw new Error("Domready Event doesn't work in the iframe.");
          return jindo.$Fn._domready(r, o), this;
        }
        r.attachEvent("on" + i, o);
      }
    } else {
      if ("domready" == i) i = "DOMContentLoaded";
      else if ("mousewheel" == i && s.indexOf("WebKit") < 0 && !/Opera/.test(s) && !u)
        i = "DOMMouseScroll";
      else if ("mouseenter" != i || u)
        if ("mouseleave" != i || u) {
          if ("transitionend" == i || "transitionstart" == i) {
            var l,
              d = i.replace("transition", "");
            (d = d.substr(0, 1).toUpperCase() + d.substr(1)),
              "undefined" != typeof document.body.style.WebkitTransition
                ? (l = "webkit")
                : "undefined" != typeof document.body.style.OTransition
                ? (l = "o")
                : "undefined" != typeof document.body.style.MsTransition && (l = "ms"),
              (i = (l ? l + "Transition" : "transition") + d),
              (this._for_test_attach = i),
              (this._for_test_detach = "");
          } else if ("animationstart" == i || "animationend" == i || "animationiteration" == i) {
            var l,
              d = i.replace("animation", "");
            (d = d.substr(0, 1).toUpperCase() + d.substr(1)),
              "undefined" != typeof document.body.style.WebkitAnimationName
                ? (l = "webkit")
                : "undefined" != typeof document.body.style.OAnimationName
                ? (l = "o")
                : "undefined" != typeof document.body.style.MsTransitionName && (l = "ms"),
              (i = (l ? l + "Animation" : "animation") + d),
              (this._for_test_attach = i),
              (this._for_test_detach = "");
          }
        } else (i = "mouseout"), (o = jindo.$Fn._fireWhenElementBoundary(r, o));
      else (i = "mouseover"), (o = jindo.$Fn._fireWhenElementBoundary(r, o));
      r.addEventListener(i, o, n);
    }
    return (
      this._key ||
        ((this._key = "$" + jindo.$Fn.gc.count++), (jindo.$Fn.gc.pool[this._key] = this)),
      (this._events[this._events.length] = { element: r, event: t.toLowerCase(), func: o }),
      this
    );
  }),
  (jindo.$Fn.prototype.detach = function (e, t) {
    var n = null,
      o = e,
      i = t,
      r = _ua;
    if (o instanceof Array || (jindo.$A && o instanceof jindo.$A && (o = o.$value()))) {
      for (var s = 0; s < o.length; s++) this.detach(o[s], i);
      return this;
    }
    if (!o || !i) return this;
    jindo.$Element && o instanceof jindo.$Element && (o = o.$value()),
      (o = jindo.$(o)),
      (i = i.toLowerCase());
    for (var a = this._events, s = 0; s < a.length; s++)
      if (a[s].element === o && a[s].event === i) {
        (n = a[s].func), (this._events = jindo.$A(this._events).refuse(a[s]).$value());
        break;
      }
    if ("undefined" == typeof o.removeEventListener || jindo.$Fn._resizeEventBugInIE(t)) {
      if ("undefined" != typeof o.detachEvent) {
        if ("domready" == i)
          return (jindo.$Fn._domready.list = jindo.$Fn._domready.list.refuse(n)), this;
        o.detachEvent("on" + i, n);
      }
    } else {
      if ("domready" == i) i = "DOMContentLoaded";
      else if ("mousewheel" == i && r.indexOf("WebKit") < 0) i = "DOMMouseScroll";
      else if ("mouseenter" == i) i = "mouseover";
      else if ("mouseleave" == i) i = "mouseout";
      else if ("transitionend" == i || "transitionstart" == i) {
        var u,
          l = i.replace("transition", "");
        (l = l.substr(0, 1).toUpperCase() + l.substr(1)),
          "undefined" != typeof document.body.style.WebkitTransition
            ? (u = "webkit")
            : "undefined" != typeof document.body.style.OTransition
            ? (u = "o")
            : "undefined" != typeof document.body.style.MsTransition && (u = "ms"),
          (i = (u ? u + "Transition" : "transition") + l),
          (this._for_test_detach = i),
          (this._for_test_attach = "");
      } else if ("animationstart" == i || "animationend" == i || "animationiteration" == i) {
        var u,
          l = i.replace("animation", "");
        (l = l.substr(0, 1).toUpperCase() + l.substr(1)),
          "undefined" != typeof document.body.style.WebkitAnimationName
            ? (u = "webkit")
            : "undefined" != typeof document.body.style.OAnimationName
            ? (u = "o")
            : "undefined" != typeof document.body.style.MsTransitionName && (u = "ms"),
          (i = (u ? u + "Animation" : "animation") + l),
          (this._for_test_detach = i),
          (this._for_test_attach = "");
      }
      n && o.removeEventListener(i, n, !1);
    }
    return this;
  }),
  (jindo.$Fn.prototype.delay = function (e, t) {
    return (
      "undefined" == typeof t && (t = []),
      (this._delayKey = setTimeout(this.bind.apply(this, t), 1e3 * e)),
      this
    );
  }),
  (jindo.$Fn.prototype.setInterval = function (e, t) {
    return (
      "undefined" == typeof t && (t = []),
      (this._repeatKey = setInterval(this.bind.apply(this, t), 1e3 * e)),
      this._repeatKey
    );
  }),
  (jindo.$Fn.prototype.repeat = jindo.$Fn.prototype.setInterval),
  (jindo.$Fn.prototype.stopDelay = function () {
    return (
      "undefined" != typeof this._delayKey &&
        (window.clearTimeout(this._delayKey), delete this._delayKey),
      this
    );
  }),
  (jindo.$Fn.prototype.stopRepeat = function () {
    return (
      "undefined" != typeof this._repeatKey &&
        (window.clearInterval(this._repeatKey), delete this._repeatKey),
      this
    );
  }),
  (jindo.$Fn.prototype.free = function (e) {
    for (var t = this._events.length; t > 0; ) {
      var n = this._events[--t].element,
        o = this._events[t].event;
      this._events[t].func;
      if (!e || n === e) {
        this.detach(n, o);
        var i = !e;
        i &&
          window === n &&
          "unload" == o &&
          _ua.indexOf("MSIE") < 1 &&
          this._func.call(this._this),
          delete this._events[t];
      }
    }
    if (0 == this._events.length)
      try {
        delete jindo.$Fn.gc.pool[this._key];
      } catch (r) {}
  }),
  (jindo.$Fn._domready = function (e, t) {
    if ("undefined" == typeof jindo.$Fn._domready.list) {
      var n = null,
        o = (jindo.$Fn._domready.list = jindo.$A([t])),
        i = !1,
        r = function () {
          if (!i) {
            i = !0;
            for (var t = { type: "domready", target: e, currentTarget: e }; (n = o.shift()); ) n(t);
          }
        };
      !(function () {
        try {
          e.documentElement.doScroll("left");
        } catch (t) {
          return void setTimeout(arguments.callee, 50);
        }
        r();
      })(),
        (e.onreadystatechange = function () {
          "complete" == e.readyState && ((e.onreadystatechange = null), r());
        });
    } else jindo.$Fn._domready.list.push(t);
  }),
  (jindo.$Fn._fireWhenElementBoundary = function (e, t) {
    return function (e) {
      var n = jindo.$Event(e),
        o = jindo.$Element(n.relatedElement);
      (o && (o.isEqual(this) || o.isChildOf(this))) || t.call(this, e);
    };
  }),
  (jindo.$Fn.gc = function () {
    var e = jindo.$Fn.gc.pool;
    for (var t in e)
      if (e.hasOwnProperty(t))
        try {
          e[t].free();
        } catch (n) {}
    jindo.$Fn.gc.pool = e = {};
  }),
  (jindo.$Fn.freeElement = function (e) {
    var t = jindo.$Fn.gc.pool;
    for (var n in t)
      if (t.hasOwnProperty(n))
        try {
          t[n].free(e);
        } catch (o) {}
  }),
  (jindo.$Fn.gc.count = 0),
  (jindo.$Fn.gc.pool = {}),
  "undefined" == typeof window ||
    isUnCacheAgent() ||
    jindo.$Fn(jindo.$Fn.gc).attach(window, "unload"),
  (jindo.$ElementList = function (e) {
    var t = arguments.callee;
    return e instanceof t
      ? e
      : this instanceof t
      ? ((e =
          e instanceof Array
            ? jindo.$A(e)
            : jindo.$A && e instanceof jindo.$A
            ? jindo.$A(e.$value())
            : "string" == typeof e && jindo.cssquery
            ? jindo.$A(jindo.cssquery(e))
            : jindo.$A()),
        void (this._elements = e.map(function (e, t, n) {
          return jindo.$Element(e);
        })))
      : new t(e);
  }),
  (jindo.$ElementList.prototype.get = function (e) {
    return this._elements.$value()[e];
  }),
  (jindo.$ElementList.prototype.getFirst = function () {
    return this.get(0);
  }),
  (jindo.$ElementList.prototype.length = function (e, t) {
    return this._elements.length(e, t);
  }),
  (jindo.$ElementList.prototype.getLast = function () {
    return this.get(Math.max(this._elements.length() - 1, 0));
  }),
  (jindo.$ElementList.prototype.$value = function () {
    return this._elements.$value();
  }),
  (function (e) {
    var t = [
      "show",
      "hide",
      "toggle",
      "addClass",
      "removeClass",
      "toggleClass",
      "fireEvent",
      "leave",
      "empty",
      "appear",
      "disappear",
      "className",
      "width",
      "height",
      "text",
      "html",
      "css",
      "attr",
    ];
    jindo.$A(t).forEach(function (t) {
      e[t] = function () {
        var e = jindo.$A(arguments).$value();
        return (
          this._elements.forEach(function (n) {
            n[t].apply(n, e);
          }),
          this
        );
      };
    }),
      jindo.$A(["appear", "disappear"]).forEach(function (t) {
        e[t] = function (e, n) {
          var o = this._elements.length,
            i = this;
          return (
            this._elements.forEach(function (r, s) {
              s == o - 1
                ? r[t](e, function () {
                    n(i);
                  })
                : r[t](e);
            }),
            this
          );
        };
      });
  })(jindo.$ElementList.prototype),
  (jindo.$S = function (e) {
    var t = arguments.callee;
    return (
      "undefined" == typeof e && (e = ""),
      e instanceof t ? e : this instanceof t ? void (this._str = e + "") : new t(e)
    );
  }),
  (jindo.$S.prototype.$value = function () {
    return this._str;
  }),
  (jindo.$S.prototype.toString = jindo.$S.prototype.$value),
  (jindo.$S.prototype.trim = function () {
    return (
      "".trim
        ? (jindo.$S.prototype.trim = function () {
            return jindo.$S(this._str.trim());
          })
        : (jindo.$S.prototype.trim = function () {
            return jindo.$S(this._str.replace(/^(\s|　)+/g, "").replace(/(\s|　)+$/g, ""));
          }),
      jindo.$S(this.trim())
    );
  }),
  (jindo.$S.prototype.escapeHTML = function () {
    var e = { '"': "quot", "&": "amp", "<": "lt", ">": "gt", "'": "#39" },
      t = this._str.replace(/[<>&"']/g, function (t) {
        return e[t] ? "&" + e[t] + ";" : t;
      });
    return jindo.$S(t);
  }),
  (jindo.$S.prototype.stripTags = function () {
    return jindo.$S(this._str.replace(/<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/gi, ""));
  }),
  (jindo.$S.prototype.times = function (e) {
    for (var t = [], n = 0; e > n; n++) t[t.length] = this._str;
    return jindo.$S(t.join(""));
  }),
  (jindo.$S.prototype.unescapeHTML = function () {
    var e = { quot: '"', amp: "&", lt: "<", gt: ">", "#39": "'" },
      t = this._str.replace(/&([a-z]+|#[0-9]+);/g, function (t, n) {
        return e[n] ? e[n] : t;
      });
    return jindo.$S(t);
  }),
  (jindo.$S.prototype.escape = function () {
    var e = this._str.replace(/([\u0080-\uFFFF]+)|[\n\r\t"'\\]/g, function (e, t, n) {
      return t
        ? escape(t).replace(/%/g, "\\")
        : (n = { "\n": "\\n", "\r": "\\r", "	": "\\t" })[e]
        ? n[e]
        : "\\" + e;
    });
    return jindo.$S(e);
  }),
  (jindo.$S.prototype.bytes = function (e) {
    var t,
      n,
      o = 0,
      i = 0,
      r = 0,
      s = this._str.length,
      a = (document.charset || document.characterSet || document.defaultCharset) + "";
    if (
      ("undefined" == typeof e
        ? (t = !1)
        : e.constructor == Number
        ? ((t = !0), (n = e))
        : e.constructor == Object
        ? ((a = e.charset || a), (n = e.size || !1), (t = !!n))
        : (t = !1),
      "utf-8" == a.toLowerCase())
    ) {
      for (r = 0; s > r; r++)
        if (
          ((o = this._str.charCodeAt(r)),
          (i += 128 > o ? 1 : 2048 > o ? 2 : 65536 > o ? 3 : 4),
          t && i > n)
        ) {
          this._str = this._str.substr(0, r);
          break;
        }
    } else
      for (r = 0; s > r; r++)
        if (((i += this._str.charCodeAt(r) > 128 ? 2 : 1), t && i > n)) {
          this._str = this._str.substr(0, r);
          break;
        }
    return t ? this : i;
  }),
  (jindo.$S.prototype.parseString = function () {
    if ("" == this._str) return {};
    for (var e, t, n, o = this._str.split(/&/g), i = {}, r = !1, s = 0; s < o.length; s++) {
      (t = o[s].substring(0, (e = o[s].indexOf("=")))), (r = !1);
      try {
        n = decodeURIComponent(o[s].substring(e + 1));
      } catch (a) {
        (r = !0), (n = decodeURIComponent(unescape(o[s].substring(e + 1))));
      }
      "[]" == t.substr(t.length - 2, 2)
        ? ((t = t.substring(0, t.length - 2)),
          "undefined" == typeof i[t] && (i[t] = []),
          (i[t][i[t].length] = r ? escape(n) : n))
        : (i[t] = r ? escape(n) : n);
    }
    return i;
  }),
  (jindo.$S.prototype.escapeRegex = function () {
    var e = this._str,
      t = /([\?\.\*\+\-\/\(\)\{\}\[\]\:\!\^\$\\\|])/g;
    return jindo.$S(e.replace(t, "\\$1"));
  }),
  (jindo.$S.prototype.format = function () {
    var e = arguments,
      t = 0,
      n = this._str.replace(/%([ 0])?(-)?([1-9][0-9]*)?([bcdsoxX])/g, function (n, o, i, r, s) {
        var a = e[t++],
          u = "",
          l = "";
        if (((r = r ? +r : 0), "s" == s)) u = a + "";
        else if (" bcdoxX".indexOf(s) > 0) {
          if ("number" != typeof a) return "";
          (u =
            "c" == s ? String.fromCharCode(a) : a.toString({ b: 2, d: 10, o: 8, x: 16, X: 16 }[s])),
            " X".indexOf(s) > 0 && (u = u.toUpperCase());
        }
        return (
          u.length < r &&
            (l = jindo
              .$S(o || " ")
              .times(r - u.length)
              .toString()),
          "-" == i ? (u += l) : (u = l + u),
          u
        );
      });
    return jindo.$S(n);
  }),
  (jindo.$Document = function (e) {
    var t = arguments.callee;
    return e instanceof t
      ? e
      : this instanceof t
      ? ((this._doc = e || document),
        void (this._docKey = "Standards" == this.renderingMode() ? "documentElement" : "body"))
      : new t(e);
  }),
  (jindo.$Document.prototype.$value = function () {
    return this._doc;
  }),
  (jindo.$Document.prototype.scrollSize = function () {
    var e = navigator.userAgent.indexOf("WebKit") > -1,
      t = this._doc[e ? "body" : this._docKey];
    return {
      width: Math.max(t.scrollWidth, t.clientWidth),
      height: Math.max(t.scrollHeight, t.clientHeight),
    };
  }),
  (jindo.$Document.prototype.scrollPosition = function () {
    var e = navigator.userAgent.indexOf("WebKit") > -1,
      t = this._doc[e ? "body" : this._docKey];
    return {
      left: t.scrollLeft || window.pageXOffset || window.scrollX || 0,
      top: t.scrollTop || window.pageYOffset || window.scrollY || 0,
    };
  }),
  (jindo.$Document.prototype.clientSize = function () {
    var e = navigator.userAgent,
      t = this._doc[this._docKey],
      n = e.indexOf("WebKit") > -1 && -1 == e.indexOf("Chrome");
    return n
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: t.clientWidth, height: t.clientHeight };
  }),
  (jindo.$Document.prototype.renderingMode = function () {
    var e,
      t = navigator.userAgent,
      n = "undefined" == typeof window.opera && t.indexOf("MSIE") > -1,
      o =
        t.indexOf("WebKit") > -1 &&
        t.indexOf("Chrome") < 0 &&
        navigator.vendor.indexOf("Apple") > -1;
    return (e =
      "compatMode" in this._doc
        ? "CSS1Compat" == this._doc.compatMode
          ? "Standards"
          : n
          ? "Quirks"
          : "Almost"
        : o
        ? "Standards"
        : "Quirks");
  }),
  (jindo.$Document.prototype.queryAll = function (e) {
    return jindo.$$(e, this._doc);
  }),
  (jindo.$Document.prototype.query = function (e) {
    return jindo.$$.getSingle(e, this._doc);
  }),
  (jindo.$Document.prototype.xpathAll = function (e) {
    return jindo.$$.xpath(e, this._doc);
  }),
  (jindo.$Form = function (e) {
    var t = arguments.callee;
    if (e instanceof t) return e;
    if (!(this instanceof t)) return new t(e);
    if (((e = jindo.$(e)), !e.tagName || "FORM" != e.tagName.toUpperCase()))
      throw new Error("The element should be a FORM element");
    this._form = e;
  }),
  (jindo.$Form.prototype.$value = function () {
    return this._form;
  }),
  (jindo.$Form.prototype.serialize = function () {
    var e = this,
      t = {},
      n = arguments.length,
      o = function (n) {
        var o = e.value(n);
        "undefined" != typeof o && (t[n] = o);
      };
    if (0 == n)
      jindo.$A(this.element()).forEach(function (e) {
        e.name && o(e.name);
      });
    else for (var i = 0; n > i; i++) o(arguments[i]);
    return jindo.$H(t).toQueryString();
  }),
  (jindo.$Form.prototype.element = function (e) {
    return arguments.length > 0 ? this._form[e] : this._form.elements;
  }),
  (jindo.$Form.prototype.enable = function () {
    var e = arguments[0];
    if ("object" == typeof e) {
      var t = this;
      return (
        jindo.$H(e).forEach(function (e, n) {
          t.enable(n, e);
        }),
        this
      );
    }
    var n = this.element(e);
    if (!n) return this;
    if (((n = 1 == n.nodeType ? [n] : n), arguments.length < 2)) {
      var o = !0;
      return (
        jindo.$A(n).forEach(function (e) {
          e.disabled && ((o = !1), jindo.$A.Break());
        }),
        o
      );
    }
    var i = arguments[1];
    return (
      jindo.$A(n).forEach(function (e) {
        e.disabled = !i;
      }),
      this
    );
  }),
  (jindo.$Form.prototype.value = function (e) {
    if ("object" == typeof e) {
      var t = this;
      return (
        jindo.$H(e).forEach(function (e, n) {
          t.value(n, e);
        }),
        this
      );
    }
    var n = this.element(e);
    if (!n) throw new Error("엘리먼트는 존재하지 않습니다.");
    if (((n = 1 == n.nodeType ? [n] : n), arguments.length > 1)) {
      var o = arguments[1];
      return (
        jindo.$A(n).forEach(function (e) {
          switch (e.type) {
            case "radio":
              e.checked = e.value == o;
              break;
            case "checkbox":
              o.constructor == Array
                ? (e.checked = jindo.$A(o).has(e.value))
                : (e.checked = e.value == o);
              break;
            case "select-one":
              for (var t = -1, n = 0, i = e.options.length; i > n; n++)
                e.options[n].value == o && (t = n);
              e.selectedIndex = t;
              break;
            case "select-multiple":
              var t = -1;
              if (o.constructor == Array)
                for (var r = jindo.$A(o), n = 0, i = e.options.length; i > n; n++)
                  e.options[n].selected = r.has(e.options[n].value);
              else {
                for (var n = 0, i = e.options.length; i > n; n++)
                  e.options[n].value == o && (t = n);
                e.selectedIndex = t;
              }
              break;
            default:
              e.value = o;
          }
        }),
        this
      );
    }
    var i = [];
    return (
      jindo.$A(n).forEach(function (e) {
        switch (e.type) {
          case "radio":
          case "checkbox":
            e.checked && i.push(e.value);
            break;
          case "select-one":
            -1 != e.selectedIndex && i.push(e.options[e.selectedIndex].value);
            break;
          case "select-multiple":
            if (-1 != e.selectedIndex)
              for (var t = 0, n = e.options.length; n > t; t++)
                e.options[t].selected && i.push(e.options[t].value);
            break;
          default:
            i.push(e.value);
        }
      }),
      i.length > 1 ? i : i[0]
    );
  }),
  (jindo.$Form.prototype.submit = function (e, t) {
    var n = null;
    return (
      "string" == typeof e && ((n = this._form.target), (this._form.target = e)),
      "function" == typeof e && (t = e),
      "undefined" == typeof t || t(this._form)
        ? (this._form.submit(), null !== n && (this._form.target = n), this)
        : this
    );
  }),
  (jindo.$Form.prototype.reset = function (e) {
    return "undefined" == typeof e || e(this._form) ? (this._form.reset(), this) : this;
  }),
  (jindo.$Template = function (e) {
    var t = null,
      n = "",
      o = arguments.callee;
    return e instanceof o
      ? e
      : this instanceof o
      ? ("undefined" == typeof e
          ? (e = "")
          : (t = document.getElementById(e) || e) &&
            t.tagName &&
            (n = t.tagName.toUpperCase()) &&
            ("TEXTAREA" == n || ("SCRIPT" == n && "text/template" == t.getAttribute("type"))) &&
            (e = (t.value || t.innerHTML).replace(/^\s+|\s+$/g, "")),
        void (this._str = e + ""))
      : new o(e);
  }),
  (jindo.$Template.splitter = /(?!\\)[\{\}]/g),
  (jindo.$Template.pattern =
    /^(?:if (.+)|elseif (.+)|for (?:(.+)\:)?(.+) in (.+)|(else)|\/(if|for)|=(.+)|js (.+)|set (.+))$/),
  (jindo.$Template.prototype.process = function (data) {
    var key = "",
      leftBrace = "",
      rightBrace = "",
      tpl = (" " + this._str + " ")
        .replace(/\\{/g, leftBrace)
        .replace(/\\}/g, rightBrace)
        .replace(/(?!\\)\}\{/g, "}" + key + "{")
        .split(jindo.$Template.splitter),
      i = tpl.length,
      map = { '"': '\\"', "\\": "\\\\", "\n": "\\n", "\r": "\\r", "	": "\\t", "\f": "\\f" },
      reg = [
        /(["'](?:(?:\\.)+|[^\\["']+)*["']|[a-zA-Z_][\w\.]*)/g,
        /[\n\r\t\f"\\]/g,
        /^\s+/,
        /\s+$/,
        /#/g,
      ],
      cb = [
        function (e) {
          return '"' == e.substring(0, 1) || "'" == e.substring(0, 1) || "null" == e ? e : "d." + e;
        },
        function (e) {
          return map[e] || e;
        },
        "",
        "",
      ],
      stm = [],
      lev = 0;
    if (
      ((tpl[0] = tpl[0].substr(1)),
      (tpl[i - 1] = tpl[i - 1].substr(0, tpl[i - 1].length - 1)),
      2 > i)
    )
      return tpl[0];
    tpl = jindo.$A(tpl).reverse().$value();
    for (var delete_info; i--; )
      i % 2
        ? (tpl[i] = tpl[i].replace(jindo.$Template.pattern, function () {
            var e = arguments;
            if (e[10])
              return (
                e[10].replace(/(\w+)(?:\s*)=(?:\s*)(?:([a-zA-Z0-9_]+)|(.+))$/g, function () {
                  var e = arguments,
                    t = "d." + e[1] + "=";
                  return (t += e[2]
                    ? "d." + e[2]
                    : e[3].replace(/(=(?:[a-zA-Z_][\w\.]*)+)/g, function (e) {
                        return "=" == e.substring(0, 1) ? "d." + e.replace("=", "") : e;
                      }));
                }) + ";"
              );
            if (e[9])
              return (
                "s[i++]=" +
                e[9].replace(/(=(?:[a-zA-Z_][\w\.]*)+)/g, function (e) {
                  return "=" == e.substring(0, 1) ? "d." + e.replace("=", "") : e;
                }) +
                ";"
              );
            if (e[8]) return "s[i++]= d." + e[8] + ";";
            if (e[1])
              return (
                "if(" +
                e[1]
                  .replace(reg[0], cb[0])
                  .replace(/d\.(typeof) /, "$1 ")
                  .replace(/ d\.(instanceof) d\./, " $1 ") +
                "){"
              );
            if (e[2])
              return (
                "}else if(" +
                e[2]
                  .replace(reg[0], cb[0])
                  .replace(/d\.(typeof) /, "$1 ")
                  .replace(/ d\.(instanceof) d\./, " $1 ") +
                "){"
              );
            if (e[5]) {
              delete_info = e[4];
              var t = [];
              return (
                t.push("var t#=d." + e[5] + "||{},p#=isArray(t#),i#=0;"),
                t.push("for(var x# in t#){"),
                t.push("if(!t#.hasOwnProperty(x#)){continue;}"),
                t.push(
                  "	if( (p# && isNaN(i#=parseInt(x#,10))) || (!p# && !t#.propertyIsEnumerable(x#)) ) continue;"
                ),
                t.push("	d." + e[4] + "=t#[x#];"),
                t.push(e[3] ? "d." + e[3] + "=p#?i#:x#;" : ""),
                t.join("").replace(reg[4], lev++)
              );
            }
            return e[6]
              ? "}else{"
              : e[7]
              ? "for" == e[7]
                ? "delete d." + delete_info + "; };"
                : "};"
              : e[0];
          }))
        : tpl[i] == key
        ? (tpl[i] = "")
        : tpl[i] && (tpl[i] = 's[i++]="' + tpl[i].replace(reg[1], cb[1]) + '";');
    tpl = jindo
      .$A(tpl)
      .reverse()
      .$value()
      .join("")
      .replace(new RegExp(leftBrace, "g"), "{")
      .replace(new RegExp(rightBrace, "g"), "}");
    var _aStr = [];
    return (
      _aStr.push("var s=[],i=0;"),
      _aStr.push(
        'function isArray(o){ return Object.prototype.toString.call(o) == "[object Array]" };'
      ),
      _aStr.push(tpl),
      _aStr.push('return s.join("");'),
      (tpl = eval("false||function(d){" + _aStr.join("") + "}")),
      (tpl = tpl(data))
    );
  }),
  (jindo.$Date = function (e) {
    var t = arguments,
      n = "",
      o = arguments.callee;
    if (e && e instanceof o) return e;
    if (!(this instanceof o)) return new o(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
    if ("string" == (n = typeof e))
      if (/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)))/.test(e))
        try {
          (this._date = new Date(e)),
            this._date.toISOString
              ? "Invalid Date" == this._date.toISOString() && (this._date = jindo.$Date.makeISO(e))
              : (this._date = jindo.$Date.makeISO(e));
        } catch (i) {
          this._date = jindo.$Date.makeISO(e);
        }
      else this._date = o.parse(e);
    else if ("number" == n)
      if ("undefined" == typeof t[1]) this._date = new Date(e);
      else {
        for (var r = 0; 7 > r; r++) "number" != typeof t[r] && (t[r] = 1);
        this._date = new Date(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
      }
    else
      "object" == n && e.constructor == Date
        ? ((this._date = new Date()).setTime(e.getTime()),
          this._date.setMilliseconds(e.getMilliseconds()))
        : (this._date = new Date());
    this._names = {};
    for (var r in jindo.$Date.names)
      jindo.$Date.names.hasOwnProperty(r) && (this._names[r] = jindo.$Date.names[r]);
  }),
  (jindo.$Date.makeISO = function (e) {
    var t = e.match(
        /(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/
      ),
      n = parseInt(t[4] || 0, 10),
      o = parseInt(t[5] || 0, 10);
    return (
      "Z" == t[8]
        ? (n += jindo.$Date.utc)
        : ("+" == t[9] || "-" == t[9]) &&
          ((n += jindo.$Date.utc - parseInt(t[9] + t[10], 10)), (o += parseInt(t[9] + t[11], 10))),
      new Date(t[1] || 0, parseInt(t[2] || 0, 10) - 1, t[3] || 0, n, o, t[6] || 0, t[7] || 0)
    );
  }),
  (jindo.$Date.names = {
    month: [
      "January",
      "Febrary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novermber",
      "December",
    ],
    s_month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    s_day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ampm: ["AM", "PM"],
  }),
  (jindo.$Date.utc = 9),
  (jindo.$Date.now = function () {
    return Date.now();
  }),
  (jindo.$Date.prototype.name = function (e) {
    if (!arguments.length) return this._names;
    for (var t in e) e.hasOwnProperty(t) && (this._names[t] = e[t]);
  }),
  (jindo.$Date.parse = function (e) {
    return new Date(Date.parse(e));
  }),
  (jindo.$Date.prototype.$value = function () {
    return this._date;
  }),
  (jindo.$Date.prototype.format = function (e) {
    var t = {},
      n = this._date,
      o = this.name(),
      i = this;
    return (e || "").replace(/[a-z]/gi, function (e) {
      if ("undefined" != typeof t[e]) return t[e];
      switch (e) {
        case "d":
        case "j":
          return (t.j = n.getDate()), (t.d = (t.j > 9 ? "" : "0") + t.j), t[e];
        case "l":
        case "D":
        case "w":
        case "N":
          return (
            (t.w = n.getDay()),
            (t.N = t.w ? t.w : 7),
            (t.D = o.s_day[t.w]),
            (t.l = o.day[t.w]),
            t[e]
          );
        case "S":
          return (t.S = ["st", "nd", "rd"][n.getDate()]) ? t.S : (t.S = "th");
        case "z":
          return (
            (t.z = Math.floor((n.getTime() - new Date(n.getFullYear(), 0, 1).getTime()) / 864e5)),
            t.z
          );
        case "m":
        case "n":
          return (t.n = n.getMonth() + 1), (t.m = (t.n > 9 ? "" : "0") + t.n), t[e];
        case "L":
          return (t.L = i.isLeapYear()), t.L;
        case "o":
        case "Y":
        case "y":
          return (t.o = t.Y = n.getFullYear()), (t.y = (t.o + "").substr(2)), t[e];
        case "a":
        case "A":
        case "g":
        case "G":
        case "h":
        case "H":
          return (
            (t.G = n.getHours()),
            (t.g = (t.g = t.G % 12) ? t.g : 12),
            (t.A = t.G < 12 ? o.ampm[0] : o.ampm[1]),
            (t.a = t.A.toLowerCase()),
            (t.H = (t.G > 9 ? "" : "0") + t.G),
            (t.h = (t.g > 9 ? "" : "0") + t.g),
            t[e]
          );
        case "i":
          return (t.i = ((t.i = n.getMinutes()) > 9 ? "" : "0") + t.i), t.i;
        case "s":
          return (t.s = ((t.s = n.getSeconds()) > 9 ? "" : "0") + t.s), t.s;
        case "u":
          return (t.u = n.getMilliseconds()), t.u;
        case "U":
          return (t.U = i.time()), t.U;
        default:
          return e;
      }
    });
  }),
  (jindo.$Date.prototype.time = function (e) {
    return "number" == typeof e ? (this._date.setTime(e), this) : this._date.getTime();
  }),
  (jindo.$Date.prototype.year = function (e) {
    return "number" == typeof e ? (this._date.setFullYear(e), this) : this._date.getFullYear();
  }),
  (jindo.$Date.prototype.month = function (e) {
    return "number" == typeof e ? (this._date.setMonth(e), this) : this._date.getMonth();
  }),
  (jindo.$Date.prototype.date = function (e) {
    return "number" == typeof e ? (this._date.setDate(e), this) : this._date.getDate();
  }),
  (jindo.$Date.prototype.day = function () {
    return this._date.getDay();
  }),
  (jindo.$Date.prototype.hours = function (e) {
    return "number" == typeof e ? (this._date.setHours(e), this) : this._date.getHours();
  }),
  (jindo.$Date.prototype.minutes = function (e) {
    return "number" == typeof e ? (this._date.setMinutes(e), this) : this._date.getMinutes();
  }),
  (jindo.$Date.prototype.seconds = function (e) {
    return "number" == typeof e ? (this._date.setSeconds(e), this) : this._date.getSeconds();
  }),
  (jindo.$Date.prototype.isLeapYear = function () {
    var e = this._date.getFullYear();
    return !((e % 4 || !(e % 100)) && e % 400);
  }),
  (jindo.$Window = function (e) {
    var t = arguments.callee;
    return e instanceof t ? e : this instanceof t ? void (this._win = e || window) : new t(e);
  }),
  (jindo.$Window.prototype.$value = function () {
    return this._win;
  }),
  (jindo.$Window.prototype.resizeTo = function (e, t) {
    return this._win.resizeTo(e, t), this;
  }),
  (jindo.$Window.prototype.resizeBy = function (e, t) {
    return this._win.resizeBy(e, t), this;
  }),
  (jindo.$Window.prototype.moveTo = function (e, t) {
    return this._win.moveTo(e, t), this;
  }),
  (jindo.$Window.prototype.moveBy = function (e, t) {
    return this._win.moveBy(e, t), this;
  }),
  (jindo.$Window.prototype.sizeToContent = function (e, t) {
    if ("function" == typeof this._win.sizeToContent) this._win.sizeToContent();
    else {
      if (2 != arguments.length) {
        var n,
          o,
          i = this._win,
          r = this._win.document;
        i.innerHeight
          ? ((n = i.innerWidth), (o = i.innerHeight))
          : r.documentElement && r.documentElement.clientHeight
          ? ((n = r.documentElement.clientWidth), (o = r.documentElement.clientHeight))
          : r.body && ((n = r.body.clientWidth), (o = r.body.clientHeight));
        var s,
          a,
          u = r.body.scrollHeight,
          l = r.body.offsetHeight;
        u > l
          ? ((s = r.body.scrollWidth), (a = r.body.scrollHeight))
          : ((s = r.body.offsetWidth), (a = r.body.offsetHeight)),
          (e = s - n),
          (t = a - o);
      }
      this.resizeBy(e, t);
    }
    return this;
  }),
  "undefined" != typeof window)
)
  for (prop in jindo) jindo.hasOwnProperty(prop) && (window[prop] = jindo[prop]);
