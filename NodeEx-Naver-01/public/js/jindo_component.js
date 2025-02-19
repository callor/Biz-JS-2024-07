(jindo.Component = jindo.$Class({
  _htEventHandler: null,
  _htOption: null,
  $init: function () {
    var t = this.constructor.getInstance();
    t.push(this),
      (this._htEventHandler = {}),
      (this._htOption = {}),
      (this._htOption._htSetter = {});
  },
  option: function (t, e) {
    switch (typeof t) {
      case "undefined":
        return this._htOption;
      case "string":
        if ("undefined" == typeof e) return this._htOption[t];
        if ("htCustomEventHandler" == t) {
          if ("undefined" != typeof this._htOption[t]) return this;
          this.attach(e);
        }
        (this._htOption[t] = e),
          "function" == typeof this._htOption._htSetter[t] && this._htOption._htSetter[t](e);
        break;
      case "object":
        for (var n in t) {
          if ("htCustomEventHandler" == n) {
            if ("undefined" != typeof this._htOption[n]) continue;
            this.attach(t[n]);
          }
          (this._htOption[n] = t[n]),
            "function" == typeof this._htOption._htSetter[n] && this._htOption._htSetter[n](t[n]);
        }
    }
    return this;
  },
  optionSetter: function (t, e) {
    switch (typeof t) {
      case "undefined":
        return this._htOption._htSetter;
      case "string":
        if ("undefined" == typeof e) return this._htOption._htSetter[t];
        this._htOption._htSetter[t] = jindo.$Fn(e, this).bind();
        break;
      case "object":
        for (var n in t) this._htOption._htSetter[n] = jindo.$Fn(t[n], this).bind();
    }
    return this;
  },
  fireEvent: function (t, e) {
    e = e || {};
    var n = this["on" + t],
      i = this._htEventHandler[t] || [],
      s = "function" == typeof n,
      a = i.length > 0;
    if (!s && !a) return !0;
    (i = i.concat()),
      (e.sType = t),
      "undefined" == typeof e._aExtend &&
        ((e._aExtend = []),
        (e.stop = function () {
          e._aExtend.length > 0 && (e._aExtend[e._aExtend.length - 1].bCanceled = !0);
        })),
      e._aExtend.push({ sType: t, bCanceled: !1 });
    var o,
      r,
      h = [e];
    for (o = 2, r = arguments.length; r > o; o++) h.push(arguments[o]);
    if ((s && n.apply(this, h), a)) {
      var l;
      for (o = 0, l; (l = i[o]); o++) l.apply(this, h);
    }
    return !e._aExtend.pop().bCanceled;
  },
  attach: function (t, e) {
    if (1 == arguments.length)
      return (
        jindo.$H(arguments[0]).forEach(
          jindo
            .$Fn(function (t, e) {
              this.attach(e, t);
            }, this)
            .bind()
        ),
        this
      );
    var n = this._htEventHandler[t];
    return "undefined" == typeof n && (n = this._htEventHandler[t] = []), n.push(e), this;
  },
  detach: function (t, e) {
    if (1 == arguments.length)
      return (
        jindo.$H(arguments[0]).forEach(
          jindo
            .$Fn(function (t, e) {
              this.detach(e, t);
            }, this)
            .bind()
        ),
        this
      );
    var n = this._htEventHandler[t];
    if (n)
      for (var i, s = 0; (i = n[s]); s++)
        if (i === e) {
          n = n.splice(s, 1);
          break;
        }
    return this;
  },
  detachAll: function (t) {
    var e = this._htEventHandler;
    if (arguments.length) return "undefined" == typeof e[t] ? this : (delete e[t], this);
    for (var n in e) delete e[n];
    return this;
  },
})),
  (jindo.Component.factory = function (t, e) {
    var n,
      i = [];
    "undefined" == typeof e && (e = {});
    for (var s, a = 0; (s = t[a]); a++) (n = new this(s, e)), (i[i.length] = n);
    return i;
  }),
  (jindo.Component.getInstance = function () {
    return "undefined" == typeof this._aInstance && (this._aInstance = []), this._aInstance;
  }),
  (jindo.UIComponent = jindo
    .$Class({
      $init: function () {
        this._bIsActivating = !1;
      },
      isActivating: function () {
        return this._bIsActivating;
      },
      activate: function () {
        return this.isActivating()
          ? this
          : ((this._bIsActivating = !0),
            arguments.length > 0 ? this._onActivate.apply(this, arguments) : this._onActivate(),
            this);
      },
      deactivate: function () {
        return this.isActivating()
          ? ((this._bIsActivating = !1),
            arguments.length > 0 ? this._onDeactivate.apply(this, arguments) : this._onDeactivate(),
            this)
          : this;
      },
    })
    .extend(jindo.Component)),
  (jindo.RolloverArea = jindo
    .$Class({
      $init: function (t, e) {
        this.option({
          sClassName: "rollover",
          sClassPrefix: "rollover-",
          bCheckMouseDown: !0,
          bActivateOnload: !0,
          htStatus: { sOver: "over", sDown: "down" },
        }),
          this.option(e || {}),
          (this._elArea = jindo.$(t)),
          (this._aOveredElements = []),
          (this._aDownedElements = []),
          (this._wfMouseOver = jindo.$Fn(this._onMouseOver, this)),
          (this._wfMouseOut = jindo.$Fn(this._onMouseOut, this)),
          (this._wfMouseDown = jindo.$Fn(this._onMouseDown, this)),
          (this._wfMouseUp = jindo.$Fn(this._onMouseUp, this)),
          this.option("bActivateOnload") && this.activate();
      },
      _addOvered: function (t) {
        this._aOveredElements.push(t);
      },
      _removeOvered: function (t) {
        this._aOveredElements.splice(jindo.$A(this._aOveredElements).indexOf(t), 1);
      },
      _addStatus: function (t, e) {
        jindo.$Element(t).addClass(this.option("sClassPrefix") + e);
      },
      _removeStatus: function (t, e) {
        jindo.$Element(t).removeClass(this.option("sClassPrefix") + e);
      },
      _isInnerElement: function (t, e) {
        return t === e ? !0 : jindo.$Element(t).isParentOf(e);
      },
      _onActivate: function () {
        this._wfMouseOver.attach(this._elArea, "mouseover"),
          this._wfMouseOut.attach(this._elArea, "mouseout"),
          this.option("bCheckMouseDown") &&
            (this._wfMouseDown.attach(this._elArea, "mousedown"),
            this._wfMouseUp.attach(document, "mouseup"));
      },
      _onDeactivate: function () {
        this._wfMouseOver.detach(this._elArea, "mouseover"),
          this._wfMouseOut.detach(this._elArea, "mouseout"),
          this._wfMouseDown.detach(this._elArea, "mousedown"),
          this._wfMouseUp.detach(document, "mouseup"),
          (this._aOveredElements.length = 0),
          (this._aDownedElements.length = 0);
      },
      _findRollover: function (t) {
        var e = this.option("sClassName");
        return jindo.$$.test(t, "." + e) ? t : jindo.$$.getSingle("! ." + e, t);
      },
      _onMouseOver: function (t) {
        for (
          var e, n = t.element, i = t.relatedElement;
          (n = this._findRollover(n));
          n = n.parentNode
        )
          (i && this._isInnerElement(n, i)) ||
            (this._addOvered(n),
            (e = { element: n, htStatus: this.option("htStatus"), weEvent: t }),
            this.fireEvent("over", e) && this._addStatus(e.element, e.htStatus.sOver));
      },
      _onMouseOut: function (t) {
        for (
          var e, n = t.element, i = t.relatedElement;
          (n = this._findRollover(n));
          n = n.parentNode
        )
          (i && this._isInnerElement(n, i)) ||
            (this._removeOvered(n),
            (e = { element: n, htStatus: this.option("htStatus"), weEvent: t }),
            this.fireEvent("out", e) && this._removeStatus(e.element, e.htStatus.sOver));
      },
      _onMouseDown: function (t) {
        for (var e, n = t.element; (n = this._findRollover(n)); )
          (e = { element: n, htStatus: this.option("htStatus"), weEvent: t }),
            this._aDownedElements.push(n),
            this.fireEvent("down", e) && this._addStatus(e.element, e.htStatus.sDown),
            (n = n.parentNode);
      },
      _onMouseUp: function (t) {
        var e,
          n,
          i,
          s = t.element,
          a = [],
          o = this._aDownedElements;
        for (i = 0; (n = o[i]); i++)
          a.push({ element: n, htStatus: this.option("htStatus"), weEvent: t });
        for (; (s = this._findRollover(s)); s = s.parentNode)
          jindo.$A(o).indexOf(s) > -1 ||
            a.push({ element: s, htStatus: this.option("htStatus"), weEvent: t });
        for (i = 0; (e = a[i]); i++)
          this.fireEvent("up", e) && this._removeStatus(e.element, e.htStatus.sDown);
        this._aDownedElements = [];
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.Calendar = jindo
    .$Class({
      $init: function (t, e) {
        (this._htToday = this.constructor.getDateHashTable(new Date())),
          (this._elLayer = jindo.$(t)),
          (this.htDefaultOption = {
            sClassPrefix: "calendar-",
            nYear: this._htToday.nYear,
            nMonth: this._htToday.nMonth,
            nDate: this._htToday.nDate,
            sTitleFormat: "yyyy-mm",
            sYearTitleFormat: "yyyy",
            sMonthTitleFormat: "m",
            aMonthTitle: [
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ],
            bDrawOnload: !0,
          }),
          this.option(this.htDefaultOption),
          this.option(e || {}),
          this._assignHTMLElements(),
          this.activate(),
          this.setDate(this.option("nYear"), this.option("nMonth"), this.option("nDate")),
          this.option("bDrawOnload") && this.draw();
      },
      getBaseElement: function () {
        return this._elLayer;
      },
      getDate: function () {
        return this._htDate;
      },
      getDateOfElement: function (t) {
        var e = jindo.$A(this._aDateContainerElement).indexOf(t);
        return e > -1 ? this._aMetaData[e] : null;
      },
      getToday: function () {
        return this._htToday;
      },
      setDate: function (t, e, n) {
        this._htDate = { nYear: t, nMonth: 1 * e, nDate: 1 * n };
      },
      getShownDate: function () {
        return this._getShownDate();
      },
      _getShownDate: function () {
        return this.htShownDate || this.getDate();
      },
      _setShownDate: function (t, e) {
        this.htShownDate = { nYear: t, nMonth: 1 * e, nDate: 1 };
      },
      _assignHTMLElements: function () {
        var t = this.option("sClassPrefix"),
          e = this.getBaseElement();
        (this.elBtnPrevYear = jindo.$$.getSingle("." + t + "btn-prev-year", e)) &&
          (this.wfPrevYear = jindo.$Fn(function (t) {
            t.stop(jindo.$Event.CANCEL_DEFAULT), this.draw(-1, 0, !0);
          }, this)),
          (this.elBtnPrevMonth = jindo.$$.getSingle("." + t + "btn-prev-mon", e)) &&
            (this.wfPrevMonth = jindo.$Fn(function (t) {
              t.stop(jindo.$Event.CANCEL_DEFAULT), this.draw(0, -1, !0);
            }, this)),
          (this.elBtnNextMonth = jindo.$$.getSingle("." + t + "btn-next-mon", e)) &&
            (this.wfNextMonth = jindo.$Fn(function (t) {
              t.stop(jindo.$Event.CANCEL_DEFAULT), this.draw(0, 1, !0);
            }, this)),
          (this.elBtnNextYear = jindo.$$.getSingle("." + t + "btn-next-year", e)) &&
            (this.wfNextYear = jindo.$Fn(function (t) {
              t.stop(jindo.$Event.CANCEL_DEFAULT), this.draw(1, 0, !0);
            }, this)),
          (this.elTitle = jindo.$$.getSingle("." + t + "title", e)),
          (this.elTitleYear = jindo.$$.getSingle("." + t + "title-year", e)),
          (this.elTitleMonth = jindo.$$.getSingle("." + t + "title-month", e));
        var n = jindo.$$.getSingle("." + t + "week", e);
        (this.elWeekTemplate = n.cloneNode(!0)), (this.elWeekAppendTarget = n.parentNode);
      },
      _setCalendarTitle: function (t, e, n) {
        10 > e && (e = ("0" + 1 * e).toString());
        var i,
          s = this.elTitle,
          a = this.option("sTitleFormat");
        if ("undefined" != typeof n)
          switch (n) {
            case "year":
              (s = this.elTitleYear),
                (a = this.option("sYearTitleFormat")),
                (i = a.replace(/yyyy/g, t).replace(/y/g, t.toString().substr(2, 2)));
              break;
            case "month":
              (s = this.elTitleMonth),
                (a = this.option("sMonthTitleFormat")),
                (i = a
                  .replace(/mm/g, e)
                  .replace(/m/g, 1 * e)
                  .replace(/M/g, this.option("aMonthTitle")[e - 1]));
          }
        else
          i = a
            .replace(/yyyy/g, t)
            .replace(/y/g, t.toString().substr(2, 2))
            .replace(/mm/g, e)
            .replace(/m/g, 1 * e)
            .replace(/M/g, this.option("aMonthTitle")[e - 1]);
        jindo.$Element(s).text(i);
      },
      draw: function (t, e, n) {
        var i = this.option("sClassPrefix"),
          s = this.getDate(),
          a = this._getShownDate();
        if (a && "undefined" != typeof n && n) {
          var o = this.constructor.getRelativeDate(t, e, 0, a);
          (t = o.nYear), (e = o.nMonth);
        } else
          "undefined" == typeof t && "undefined" == typeof e && "undefined" == typeof n
            ? ((t = s.nYear), (e = s.nMonth))
            : ((t = t || a.nYear), (e = e || a.nMonth));
        if (this.fireEvent("beforeDraw", { nYear: t, nMonth: e })) {
          this.elTitle && this._setCalendarTitle(t, e),
            this.elTitleYear && this._setCalendarTitle(t, e, "year"),
            this.elTitleMonth && this._setCalendarTitle(t, e, "month"),
            this._clear(jindo.Calendar.getWeeks(t, e)),
            this._setShownDate(t, e);
          var r,
            h,
            l,
            u,
            c,
            f,
            d,
            _,
            g,
            p = this.getToday(),
            v = this.constructor.getFirstDay(t, e),
            m = this.constructor.getLastDay(t, e),
            E = this.constructor.getLastDate(t, e),
            w = 0,
            P = this.constructor.getRelativeDate(0, -1, 0, { nYear: t, nMonth: e, nDate: 1 }),
            D = this.constructor.getRelativeDate(0, 1, 0, { nYear: t, nMonth: e, nDate: 1 }),
            L = this.constructor.getLastDate(P.nYear, P.nMonth),
            j = [],
            b = this.constructor.getWeeks(t, e);
          for (g = 0; b > g; g++)
            (_ = this.elWeekTemplate.cloneNode(!0)),
              jindo.$Element(_).appendTo(this.elWeekAppendTarget),
              this._aWeekElement.push(_);
          if (
            ((this._aDateElement = jindo.$$("." + i + "date", this.elWeekAppendTarget)),
            (this._aDateContainerElement = jindo.$$("." + i + "week > *", this.elWeekAppendTarget)),
            v > 0)
          )
            for (g = L - v; L > g; g++) j.push(g + 1);
          for (g = 1; E + 1 > g; g++) j.push(g);
          for (d = j.length - 1, g = 1; 7 - m > g; g++) j.push(g);
          for (g = 0; g < j.length; g++)
            (r = !1),
              (h = !1),
              (l = jindo.$Element(this._aDateContainerElement[g])),
              (u = t),
              (c = e),
              v > g
                ? ((r = !0), l.addClass(i + "prev-mon"), (u = P.nYear), (c = P.nMonth))
                : g > d
                ? ((h = !0), l.addClass(i + "next-mon"), (u = D.nYear), (c = D.nMonth))
                : ((u = t), (c = e)),
              0 === w && l.addClass(i + "sun"),
              6 == w && l.addClass(i + "sat"),
              u == p.nYear && 1 * c == p.nMonth && j[g] == p.nDate && l.addClass(i + "today"),
              (f = {
                elDate: this._aDateElement[g],
                elDateContainer: l.$value(),
                nYear: u,
                nMonth: c,
                nDate: j[g],
                bPrevMonth: r,
                bNextMonth: h,
                sHTML: j[g],
              }),
              jindo.$Element(f.elDate).html(f.sHTML.toString()),
              this._aMetaData.push({ nYear: u, nMonth: c, nDate: j[g] }),
              (w = (w + 1) % 7),
              this.fireEvent("draw", f);
          this.fireEvent("afterDraw", { nYear: t, nMonth: e });
        }
      },
      _clear: function (t) {
        (this._aMetaData = []),
          (this._aWeekElement = []),
          jindo.$Element(this.elWeekAppendTarget).empty();
      },
      attachEvent: function () {
        this.activate();
      },
      detachEvent: function () {
        this.deactivate();
      },
      _onActivate: function () {
        this.elBtnPrevYear && this.wfPrevYear.attach(this.elBtnPrevYear, "click"),
          this.elBtnPrevMonth && this.wfPrevMonth.attach(this.elBtnPrevMonth, "click"),
          this.elBtnNextMonth && this.wfNextMonth.attach(this.elBtnNextMonth, "click"),
          this.elBtnNextYear && this.wfNextYear.attach(this.elBtnNextYear, "click");
      },
      _onDeactivate: function () {
        this.elBtnPrevYear && this.wfPrevYear.detach(this.elBtnPrevYear, "click"),
          this.elBtnPrevMonth && this.wfPrevMonth.detach(this.elBtnPrevMonth, "click"),
          this.elBtnNextMonth && this.wfNextMonth.detach(this.elBtnNextMonth, "click"),
          this.elBtnNextYear && this.wfNextYear.detach(this.elBtnNextYear, "click");
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.Calendar.getDateObject = function (t) {
    return 3 == arguments.length
      ? new Date(arguments[0], arguments[1] - 1, arguments[2])
      : new Date(t.nYear, t.nMonth - 1, t.nDate);
  }),
  (jindo.Calendar.getDateHashTable = function (t) {
    return 3 == arguments.length
      ? { nYear: arguments[0], nMonth: arguments[1], nDate: arguments[2] }
      : (arguments.length <= 1 && (t = t || new Date()),
        { nYear: t.getFullYear(), nMonth: t.getMonth() + 1, nDate: t.getDate() });
  }),
  (jindo.Calendar.getTime = function (t) {
    return this.getDateObject(t).getTime();
  }),
  (jindo.Calendar.getFirstDay = function (t, e) {
    return new Date(t, e - 1, 1).getDay();
  }),
  (jindo.Calendar.getLastDay = function (t, e) {
    return new Date(t, e, 0).getDay();
  }),
  (jindo.Calendar.getLastDate = function (t, e) {
    return new Date(t, e, 0).getDate();
  }),
  (jindo.Calendar.getWeeks = function (t, e) {
    var n = this.getFirstDay(t, e),
      i = this.getLastDate(t, e);
    return Math.ceil((n + i) / 7);
  }),
  (jindo.Calendar.getRelativeDate = function (t, e, n, i) {
    return this.getDateHashTable(new Date(i.nYear + t, i.nMonth + e - 1, i.nDate + n));
  }),
  (jindo.Calendar.isPast = function (t, e) {
    return this.getTime(t) < this.getTime(e) ? !0 : !1;
  }),
  (jindo.Calendar.isFuture = function (t, e) {
    return this.getTime(t) > this.getTime(e) ? !0 : !1;
  }),
  (jindo.Calendar.isSameDate = function (t, e) {
    return this.getTime(t) == this.getTime(e) ? !0 : !1;
  }),
  (jindo.Calendar.isBetween = function (t, e, n) {
    return this.isFuture(t, n) || this.isPast(t, e) ? !1 : !0;
  }),
  (jindo.LayerManager = jindo
    .$Class({
      _bIsActivating: !1,
      _bIsLayerVisible: !1,
      _bIsHiding: !1,
      _bIsShowing: !1,
      _aLink: null,
      $init: function (t, e) {
        this.option({
          sCheckEvent: "click",
          nCheckDelay: 100,
          nShowDelay: 0,
          nHideDelay: 100,
          sMethod: "show",
          nDuration: 200,
          Transition: {
            fFadeIn: jindo.Effect.cubicEaseOut,
            fFadeOut: jindo.Effect.cubicEaseIn,
            fSlideDown: jindo.Effect.cubicEaseOut,
            fSlideUp: jindo.Effect.cubicEaseIn,
          },
        }),
          this.option(e || {}),
          this.setLayer(t),
          (this._aLink = []),
          (this._oShowTimer = new jindo.Timer()),
          (this._oHideTimer = new jindo.Timer()),
          (this._oEventTimer = new jindo.Timer()),
          (this._wfOnEvent = jindo.$Fn(this._onEvent, this)),
          this.getVisible(),
          this.activate();
      },
      _onActivate: function () {
        this._wfOnEvent.attach(document, this.option("sCheckEvent"));
      },
      _onDeactivate: function () {
        this._wfOnEvent.detach(document, this.option("sCheckEvent"));
      },
      getVisible: function () {
        return (this._bIsLayerVisible = this._wel.visible() && this._wel.opacity() > 0);
      },
      _check: function (t) {
        for (var e, n = jindo.$Element(t), i = 0; (e = this._aLink[i]); i++)
          if (((e = jindo.$Element(e).$value()), e && (t == e || n.isChildOf(e)))) return !0;
        return !1;
      },
      _find: function (t) {
        for (var e, n = 0; (e = this._aLink[n]); n++) if (e == t) return n;
        return -1;
      },
      getLayer: function () {
        return this._el;
      },
      setLayer: function (t) {
        (this._el = jindo.$(t)), (this._wel = jindo.$Element(t));
        var e = this._el.cloneNode(!0),
          n = jindo.$Element(e);
        return (
          n.css({ position: "absolute", left: "-5000px" }).appendTo(this._el.parentNode),
          n.show(),
          (this._nLayerHeight = n.height()),
          n.height(this._nLayerHeight),
          (this._sLayerCSSHeight = n.css("height")),
          (this._sLayerCSSOverflowX = this._wel.css("overflowX")),
          (this._sLayerCSSOverflowY = this._wel.css("overflowY")),
          n.css("overflow", "hidden").height(0),
          (this._nSlideMinHeight = n.height() + 1),
          n.leave(),
          this
        );
      },
      _transform: function () {
        this._wel.css({ overflowX: "hidden", overflowY: "hidden" });
      },
      _restore: function () {
        this._wel.css({ overflowX: this._sLayerCSSOverflowX, overflowY: this._sLayerCSSOverflowY });
      },
      getLinks: function () {
        return this._aLink;
      },
      setLinks: function (t) {
        return (this._aLink = jindo.$A(t).unique().$value()), this;
      },
      link: function (t) {
        if (arguments.length > 1) {
          for (var e = 0, n = arguments.length; n > e; e++) this.link(arguments[e]);
          return this;
        }
        return -1 != this._find(t) ? this : (this._aLink.push(t), this);
      },
      unlink: function (t) {
        if (arguments.length > 1) {
          for (var e = 0, n = arguments.length; n > e; e++) this.unlink(arguments[e]);
          return this;
        }
        var i = this._find(t);
        return i > -1 && this._aLink.splice(i, 1), this;
      },
      _fireEventBeforeShow: function () {
        return (
          this._transform(),
          this.fireEvent("beforeShow", {
            elLayer: this.getLayer(),
            aLinkedElement: this.getLinks(),
            sMethod: this.option("sMethod"),
          })
        );
      },
      _fireEventAppear: function () {
        this.fireEvent("appear", {
          elLayer: this.getLayer(),
          aLinkedElement: this.getLinks(),
          sMethod: this.option("sMethod"),
        });
      },
      _fireEventShow: function () {
        (this._bIsShowing = !1),
          this._restore(),
          this.fireEvent("show", {
            elLayer: this.getLayer(),
            aLinkedElement: this.getLinks(),
            sMethod: this.option("sMethod"),
          });
      },
      _fireEventBeforeHide: function () {
        return (
          this._transform(),
          this.fireEvent("beforeHide", {
            elLayer: this.getLayer(),
            aLinkedElement: this.getLinks(),
            sMethod: this.option("sMethod"),
          })
        );
      },
      _fireEventHide: function () {
        (this._bIsHiding = !1),
          this._restore(),
          this.fireEvent("hide", {
            elLayer: this.getLayer(),
            aLinkedElement: this.getLinks(),
            sMethod: this.option("sMethod"),
          });
      },
      _show: function (t, e) {
        this._oEventTimer.abort(),
          (this._bIsShowing = !0),
          (this._bIsHiding = !1),
          e > 0 ? this._oShowTimer.start(t, e) : (this._oHideTimer.abort(), t());
      },
      _hide: function (t, e) {
        (this._bIsShowing = !1),
          (this._bIsHiding = !0),
          e > 0 ? this._oHideTimer.start(t, e) : (this._oShowTimer.abort(), t());
      },
      _getShowMethod: function () {
        switch (this.option("sMethod")) {
          case "show":
            return "showIn";
          case "fade":
            return "fadeIn";
          case "slide":
            return "slideDown";
        }
      },
      _getHideMethod: function () {
        switch (this.option("sMethod")) {
          case "show":
            return "hideOut";
          case "fade":
            return "fadeOut";
          case "slide":
            return "slideUp";
        }
      },
      show: function (t) {
        return (
          "undefined" == typeof t && (t = this.option("nShowDelay")),
          this[this._getShowMethod()](t),
          this
        );
      },
      hide: function (t) {
        return (
          "undefined" == typeof t && (t = this.option("nHideDelay")),
          this[this._getHideMethod()](t),
          this
        );
      },
      showIn: function (t) {
        "undefined" == typeof t && (t = this.option("nShowDelay"));
        var e = this;
        return (
          this._show(function () {
            (e._sAppliedMethod = "show"),
              e.getVisible() ||
                (e._fireEventBeforeShow() &&
                  (e._wel.show(), e._fireEventAppear(), e._fireEventShow()));
          }, t),
          this
        );
      },
      hideOut: function (t) {
        "undefined" == typeof t && (t = this.option("nHideDelay"));
        var e = this;
        return (
          this._hide(function () {
            (e._sAppliedMethod = "show"),
              e.getVisible() && e._fireEventBeforeHide() && (e._wel.hide(), e._fireEventHide());
          }, t),
          this
        );
      },
      _getTransition: function () {
        return this._oTransition
          ? this._oTransition
          : (this._oTransition = new jindo.Transition().fps(30));
      },
      fadeIn: function (t) {
        var e = this._getTransition();
        e.detachAll().abort(), "undefined" == typeof t && (t = this.option("nShowDelay"));
        var n = this.option("nDuration"),
          i = this;
        return (
          this._show(function () {
            i._sAppliedMethod = "fade";
            var t = i.getLayer();
            (i._wel.visible() && 1 == i._wel.opacity()) ||
              (i._fireEventBeforeShow() &&
                (i._wel.visible() || (i._wel.opacity(0), i._wel.show()),
                (n *= 1 - i._wel.opacity()),
                e
                  .attach({
                    playing: function (t) {
                      1 === t.nStep &&
                        (this.detach("playing", arguments.callee), i._fireEventAppear());
                    },
                    end: function (t) {
                      this.detach("end", arguments.callee), i._fireEventShow();
                    },
                  })
                  .start(n, t, { "@opacity": i.option("Transition").fFadeIn.apply(null, [1]) })));
          }, t),
          this
        );
      },
      fadeOut: function (t) {
        var e = this._getTransition();
        e.detachAll().abort(), "undefined" == typeof t && (t = this.option("nHideDelay"));
        var n = this.option("nDuration"),
          i = this;
        return (
          this._hide(function () {
            if (((i._sAppliedMethod = "fade"), i.getVisible())) {
              var t = i.getLayer();
              i._fireEventBeforeHide() &&
                ((n *= i._wel.opacity()),
                e
                  .attach({
                    end: function (t) {
                      this.detach("end", arguments.callee),
                        i._wel.hide(),
                        i._wel.opacity(1),
                        i._fireEventHide();
                    },
                  })
                  .start(n, t, { "@opacity": i.option("Transition").fFadeOut.apply(null, [0]) }));
            }
          }, t),
          this
        );
      },
      slideDown: function (t) {
        var e = this._getTransition();
        e.detachAll().abort(), "undefined" == typeof t && (t = this.option("nShowDelay"));
        var n = this.option("nDuration"),
          i = this;
        return (
          this._show(function () {
            i._sAppliedMethod = "slide";
            var t = i.getLayer();
            Math.ceil(i._wel.height()) < i._nLayerHeight &&
              i._fireEventBeforeShow() &&
              (i.getVisible()
                ? (n = Math.ceil(
                    n *
                      ((i._nLayerHeight - i._wel.height()) / (i._nLayerHeight - i._nSlideMinHeight))
                  ))
                : i._wel.height(0).show(),
              e
                .attach({
                  playing: function (t) {
                    1 === t.nStep &&
                      (this.detach("playing", arguments.callee), i._fireEventAppear());
                  },
                  end: function (t) {
                    this.detach("end", arguments.callee), i._fireEventShow();
                  },
                })
                .start(
                  n,
                  {
                    getter: function (e) {
                      return jindo.$Element(t)[e]() + 1;
                    },
                    setter: function (e, n) {
                      jindo.$Element(t)[e](parseFloat(n));
                    },
                  },
                  { height: i.option("Transition").fSlideDown.apply(null, [i._nLayerHeight]) }
                ));
          }, t),
          this
        );
      },
      slideUp: function (t) {
        var e = this._getTransition();
        e.detachAll().abort(), "undefined" == typeof t && (t = this.option("nHideDelay"));
        var n = this.option("nDuration"),
          i = this;
        return (
          this._hide(function () {
            i._sAppliedMethod = "slide";
            var t = i.getLayer();
            i.getVisible() &&
              i._fireEventBeforeHide() &&
              ((n = Math.ceil(n * (i._wel.height() / i._nLayerHeight))),
              e
                .attach({
                  end: function (t) {
                    i._wel.hide().css({ height: i._sLayerCSSHeight }),
                      this.detach("end", arguments.callee),
                      i._fireEventHide();
                  },
                })
                .start(
                  n,
                  {
                    getter: function (e) {
                      return jindo.$Element(t)[e]();
                    },
                    setter: function (e, n) {
                      jindo.$Element(t)[e](Math.ceil(n));
                    },
                  },
                  { height: i.option("Transition").fSlideUp.apply(null, [i._nSlideMinHeight]) }
                ));
          }, t),
          this
        );
      },
      toggle: function (t) {
        return (
          !this.getVisible() || this._bIsHiding
            ? this.show(t || this.option("nShowDelay"))
            : this.hide(t || this.option("nHideDelay")),
          this
        );
      },
      _onEvent: function (t) {
        var e = t.element,
          n = this;
        this._oEventTimer.start(function () {
          !n._bIsHiding &&
            n.getVisible() &&
            (n._check(e)
              ? n._bIsShowing ||
                (n.fireEvent("ignore", { sCheckEvent: n.option("sCheckEvent") }),
                n._oHideTimer.abort(),
                (n._bIsHiding = !1))
              : "undefined" != typeof e.tagName && n.hide());
        }, this.option("nCheckDelay"));
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.LayerPosition = jindo
    .$Class({
      $init: function (t, e, n) {
        this.option({
          sPosition: "outside-bottom",
          sAlign: "left",
          sValign: "",
          nTop: 0,
          nLeft: 0,
          bAuto: !1,
        }),
          this.option(n || {}),
          this.setElement(t),
          e && this.setLayer(e),
          t && e && this.setPosition(),
          (this._wfSetPosition = jindo.$Fn(function () {
            var t = this._elLayer;
            t &&
              this._welLayer.visible() &&
              this.fireEvent("beforeAdjust", {
                elLayer: t,
                htCurrentPosition: this.getCurrentPosition(),
                htAdjustedPosition: this._adjustPosition(this.getCurrentPosition()),
              }) &&
              (this.setPosition(),
              this.fireEvent("adjust", {
                elLayer: t,
                htCurrentPosition: this.getCurrentPosition(),
              }));
          }, this)),
          this.option("bAuto") &&
            this._wfSetPosition.attach(window, "scroll").attach(window, "resize");
      },
      getElement: function () {
        return this._el;
      },
      setElement: function (t) {
        return (this._el = jindo.$(t)), (this._wel = jindo.$Element(t)), this;
      },
      getLayer: function () {
        return this._elLayer;
      },
      setLayer: function (t) {
        return (
          (this._elLayer = jindo.$(t)),
          (this._welLayer = jindo.$Element(t)),
          document.body.appendChild(t),
          this
        );
      },
      _isPosition: function (t, e) {
        return t.sPosition.indexOf(e) > -1 ? !0 : !1;
      },
      _setLeftRight: function (t, e) {
        var n = this.getElement(),
          i = this.getLayer(),
          s = n.offsetWidth,
          a = i.offsetWidth;
        n == document.body && (s = jindo.$Document().clientSize().width);
        var o = this._isPosition(t, "left"),
          r = this._isPosition(t, "right"),
          h = this._isPosition(t, "inside");
        return (
          o
            ? h
              ? (e.nLeft += t.nLeft)
              : ((e.nLeft -= a), (e.nLeft -= t.nLeft))
            : r
            ? ((e.nLeft += s), h ? ((e.nLeft -= a), (e.nLeft -= t.nLeft)) : (e.nLeft += t.nLeft))
            : ("left" == t.sAlign && (e.nLeft += t.nLeft),
              "center" == t.sAlign && (e.nLeft += (s - a) / 2),
              "right" == t.sAlign && ((e.nLeft += s - a), (e.nLeft -= t.nLeft))),
          e
        );
      },
      _setVerticalAlign: function (t, e) {
        var n = this.getElement(),
          i = this.getLayer(),
          s = n.offsetHeight,
          a = i.offsetHeight;
        switch ((n == document.body && (s = jindo.$Document().clientSize().height), t.sValign)) {
          case "top":
            e.nTop += t.nTop;
            break;
          case "middle":
            e.nTop += (s - a) / 2;
            break;
          case "bottom":
            e.nTop += s - a - t.nTop;
        }
        return e;
      },
      _adjustScrollPosition: function (t) {
        if (this.getElement() == document.body) {
          var e = jindo.$Document().scrollPosition();
          (t.nTop += e.top), (t.nLeft += e.left);
        }
        return t;
      },
      getPosition: function (t) {
        "object" != typeof t && (t = this.option()),
          "undefined" == typeof t.nTop && (t.nTop = 0),
          "undefined" == typeof t.nLeft && (t.nLeft = 0);
        var e,
          n = this._isPosition(t, "center"),
          i = this._isPosition(t, "inside"),
          s = this._isPosition(t, "top"),
          a = this._isPosition(t, "bottom"),
          o = this._isPosition(t, "left"),
          r = this._isPosition(t, "right");
        o && (e = "left"),
          r && (e = "right"),
          s && (e = "top"),
          a && (e = "bottom"),
          n && (e = "center");
        var h,
          l = this.getElement(),
          u = jindo.$Element(l),
          c = this.getLayer(),
          f = jindo.$Element(c),
          d = u.offset(),
          _ = l.offsetWidth,
          g = l.offsetHeight,
          p = c.offsetWidth,
          v = c.offsetHeight,
          m = { nTop: d.top, nLeft: d.left };
        switch (
          (l == document.body &&
            ((h = jindo.$Document().clientSize()), (_ = h.width), (g = h.height)),
          (p += parseInt(f.css("marginLeft")) + parseInt(f.css("marginRight")) || 0),
          (v += parseInt(f.css("marginTop")) + parseInt(f.css("marginBottom")) || 0),
          e)
        ) {
          case "center":
            (m.nTop += (g - v) / 2),
              (m.nTop += t.nTop),
              (m.nLeft += (_ - p) / 2),
              (m.nLeft += t.nLeft);
            break;
          case "top":
            i ? (m.nTop += t.nTop) : (m.nTop -= t.nTop + v), (m = this._setLeftRight(t, m));
            break;
          case "bottom":
            (m.nTop += g),
              i ? (m.nTop -= t.nTop + v) : (m.nTop += t.nTop),
              (m = this._setLeftRight(t, m));
            break;
          case "left":
            i ? (m.nLeft += t.nLeft) : (m.nLeft -= t.nLeft + p), (m = this._setVerticalAlign(t, m));
            break;
          case "right":
            (m.nLeft += _),
              i ? (m.nLeft -= t.nLeft + p) : (m.nLeft += t.nLeft),
              (m = this._setVerticalAlign(t, m));
        }
        return (m = this._adjustScrollPosition(m));
      },
      setPosition: function (t) {
        var e = jindo.$Element(this.getLayer());
        return (
          e.css("left", "-9999px").css("top", "0px"),
          "undefined" == typeof t && (t = this.getPosition()),
          this.option("bAuto") && (t = this._adjustPosition(t)),
          e.css("left", t.nLeft + "px").css("top", t.nTop + "px"),
          this
        );
      },
      getCurrentPosition: function () {
        var t = jindo.$Element(this.getLayer());
        return { nTop: parseInt(t.css("top")), nLeft: parseInt(t.css("left")) };
      },
      _isFullyVisible: function (t) {
        var e = this.getLayer(),
          n = jindo.$Element(e),
          i = jindo.$Document().scrollPosition(),
          s = i.top,
          a = i.left,
          o = jindo.$Document().clientSize(),
          r = e.offsetWidth + (parseInt(n.css("marginLeft")) + parseInt(n.css("marginRight")) || 0),
          h =
            e.offsetHeight + (parseInt(n.css("marginTop")) + parseInt(n.css("marginBottom")) || 0);
        return t.nLeft >= 0 &&
          t.nTop >= 0 &&
          o.width >= t.nLeft - a + r &&
          o.height >= t.nTop - s + h
          ? !0
          : !1;
      },
      _mirrorHorizontal: function (t) {
        if ("center" == t.sAlign || "inside-center" == t.sPosition) return t;
        var e = {};
        for (var n in t) e[n] = t[n];
        return (
          this._isPosition(e, "right")
            ? (e.sPosition = e.sPosition.replace(/right/, "left"))
            : this._isPosition(e, "left")
            ? (e.sPosition = e.sPosition.replace(/left/, "right"))
            : "right" == e.sAlign
            ? (e.sAlign = "left")
            : "left" == e.sAlign && (e.sAlign = "right"),
          e
        );
      },
      _mirrorVertical: function (t) {
        if ("middle" == t.sValign || "inside-center" == t.sPosition) return t;
        var e = {};
        for (var n in t) e[n] = t[n];
        return (
          this._isPosition(e, "top")
            ? (e.sPosition = e.sPosition.replace(/top/, "bottom"))
            : this._isPosition(e, "bottom")
            ? (e.sPosition = e.sPosition.replace(/bottom/, "top"))
            : "top" == e.sValign
            ? (e.sValign = "bottom")
            : "bottom" == e.sValign && (e.sValign = "top"),
          e
        );
      },
      _adjustPosition: function (t) {
        var e = this.option(),
          n = [];
        n.push(t),
          n.push(this.getPosition(this._mirrorHorizontal(e))),
          n.push(this.getPosition(this._mirrorVertical(e))),
          n.push(this.getPosition(this._mirrorVertical(this._mirrorHorizontal(e))));
        for (var i, s = 0; (i = n[s]); s++)
          if (this._isFullyVisible(i)) {
            t = i;
            break;
          }
        return t;
      },
    })
    .extend(jindo.Component)),
  (jindo.Timer = jindo
    .$Class({
      $init: function () {
        (this._nTimer = null),
          (this._nLatest = null),
          (this._nRemained = 0),
          (this._nDelay = null),
          (this._fRun = null),
          (this._bIsRunning = !1);
      },
      start: function (t, e) {
        return (
          this.abort(),
          (this._nRemained = 0),
          (this._nDelay = e),
          (this._fRun = t),
          (this._bIsRunning = !0),
          (this._nLatest = this._getTime()),
          this.fireEvent("wait"),
          this._excute(this._nDelay, !1),
          !0
        );
      },
      isRunning: function () {
        return this._bIsRunning;
      },
      _getTime: function () {
        return new Date().getTime();
      },
      _clearTimer: function () {
        var t = !1;
        return (
          this._nTimer && (clearInterval(this._nTimer), (this._bIsRunning = !1), (t = !0)),
          (this._nTimer = null),
          t
        );
      },
      abort: function () {
        var t = this._clearTimer();
        return t && (this.fireEvent("abort"), (this._fRun = null)), t;
      },
      pause: function () {
        var t = this._getTime() - this._nLatest;
        return (this._nRemained = Math.max(this._nDelay - t, 0)), this._clearTimer();
      },
      _excute: function (t, e) {
        var n = this;
        this._clearTimer(),
          (this._bIsRunning = !0),
          (this._nTimer = setInterval(function () {
            if (n._nTimer) {
              n.fireEvent("run");
              var t = n._fRun();
              if (((n._nLatest = n._getTime()), !t))
                return (
                  clearInterval(n._nTimer),
                  (n._nTimer = null),
                  (n._bIsRunning = !1),
                  void n.fireEvent("end")
                );
              n.fireEvent("wait"), e && n._excute(n._nDelay, !1);
            }
          }, t));
      },
      resume: function () {
        return !this._fRun || this.isRunning()
          ? !1
          : ((this._bIsRunning = !0),
            this.fireEvent("wait"),
            this._excute(this._nRemained, !0),
            (this._nRemained = 0),
            !0);
      },
    })
    .extend(jindo.Component)),
  (jindo.Transition = jindo
    .$Class({
      _nFPS: 30,
      _aTaskQueue: null,
      _oTimer: null,
      _bIsWaiting: !0,
      _bIsPlaying: !1,
      $init: function (t) {
        (this._aTaskQueue = []),
          (this._oTimer = new jindo.Timer()),
          this.option({ fEffect: jindo.Effect.linear, bCorrection: !1 }),
          this.option(t || {});
      },
      fps: function (t) {
        return arguments.length > 0 ? ((this._nFPS = t), this) : this._nFPS;
      },
      isPlaying: function () {
        return this._bIsPlaying;
      },
      abort: function () {
        return (
          (this._aTaskQueue = []),
          this._oTimer.abort(),
          this._bIsPlaying && this.fireEvent("abort"),
          (this._bIsWaiting = !0),
          (this._bIsPlaying = !1),
          (this._htTaskToDo = null),
          this
        );
      },
      start: function (t, e, n) {
        return (
          arguments.length > 0 && this.queue.apply(this, arguments), this._prepareNextTask(), this
        );
      },
      queue: function (t, e) {
        var n;
        if ("function" == typeof arguments[0]) n = { sType: "function", fTask: arguments[0] };
        else {
          var i = [];
          arguments.length;
          if (arguments[1] instanceof Array) i = arguments[1];
          else {
            var s = [];
            jindo.$A(arguments).forEach(function (t, e) {
              e > 0 && (s.push(t), e % 2 == 0 && (i.push(s.concat()), (s = [])));
            });
          }
          n = { sType: "task", nDuration: t, aList: [] };
          for (var a = 0; a < i.length; a++) {
            var o,
              r = [],
              h = i[a][1];
            for (var l in h)
              (o = h[l]),
                /^(@|style\.)(\w+)/i.test(l)
                  ? r.push(["style", RegExp.$2, o])
                  : r.push(["attr", l, o]);
            n.aList.push({ elTarget: i[a][0], aValue: r });
          }
        }
        return this._queueTask(n), this;
      },
      pause: function () {
        return this._oTimer.abort() && this.fireEvent("pause"), this;
      },
      resume: function () {
        if (this._htTaskToDo) {
          this._bIsWaiting === !1 && this._bIsPlaying === !0 && this.fireEvent("resume"),
            this._doTask(),
            (this._bIsWaiting = !1),
            (this._bIsPlaying = !0);
          var t = this;
          this._oTimer.start(function () {
            var e = !t._doTask();
            return (
              e &&
                ((t._bIsWaiting = !0),
                setTimeout(function () {
                  t._prepareNextTask();
                }, 0)),
              !e
            );
          }, this._htTaskToDo.nInterval);
        }
        return this;
      },
      precede: function (t, e, n) {
        return this.start.apply(this, arguments), this;
      },
      sleep: function (t, e) {
        return (
          "undefined" == typeof e && (e = function () {}),
          this._queueTask({ sType: "sleep", nDuration: t, fCallback: e }),
          this._prepareNextTask(),
          this
        );
      },
      _queueTask: function (t) {
        this._aTaskQueue.push(t);
      },
      _dequeueTask: function () {
        var t = this._aTaskQueue.shift();
        if (t) {
          if ("task" == t.sType)
            for (var e = t.aList, n = 0, i = e.length; i > n; n++)
              for (var s = e[n].elTarget, a = 0, o = e[n].aValue, r = o.length; r > a; a++) {
                var h = o[a][0],
                  l = o[a][2];
                if (
                  ("function" != typeof l &&
                    (l =
                      l instanceof Array
                        ? this.option("fEffect")(l[0], l[1])
                        : this.option("fEffect")(l)),
                  l.setStart)
                )
                  if (this._isHTMLElement(s)) {
                    var u = jindo.$Element(s);
                    switch (h) {
                      case "style":
                        l.setStart(u.css(o[a][1]));
                        break;
                      case "attr":
                        l.setStart(u.$value()[o[a][1]]);
                    }
                  } else l.setStart(s.getter(o[a][1]));
                o[a][2] = l;
              }
          return t;
        }
        return null;
      },
      _prepareNextTask: function () {
        if (this._bIsWaiting) {
          var t = this._dequeueTask();
          if (t)
            switch (t.sType) {
              case "task":
                this._bIsPlaying || this.fireEvent("start");
                var e = 1e3 / this._nFPS,
                  n = e / t.nDuration;
                (this._htTaskToDo = {
                  aList: t.aList,
                  nRatio: 0,
                  nInterval: e,
                  nGap: n,
                  nStep: 0,
                  nTotalStep: Math.ceil(t.nDuration / e),
                }),
                  this.resume();
                break;
              case "function":
                this._bIsPlaying || this.fireEvent("start"), t.fTask(), this._prepareNextTask();
                break;
              case "sleep":
                this._bIsPlaying &&
                  (this.fireEvent("sleep", { nDuration: t.nDuration }), t.fCallback());
                var i = this;
                setTimeout(function () {
                  i.fireEvent("awake"), i._prepareNextTask();
                }, t.nDuration);
            }
          else this._bIsPlaying && ((this._bIsPlaying = !1), this.abort(), this.fireEvent("end"));
        }
      },
      _isHTMLElement: function (t) {
        return "tagName" in t;
      },
      _doTask: function () {
        for (
          var t = this._htTaskToDo,
            e = parseFloat(t.nRatio.toFixed(5), 1),
            n = t.nStep,
            i = t.nTotalStep,
            s = t.aList,
            a = {},
            o = this.option("bCorrection"),
            r = 0,
            h = s.length;
          h > r;
          r++
        )
          for (var l = s[r].elTarget, u = 0, c = s[r].aValue, f = c.length; f > u; u++) {
            var d = c[u][0],
              _ = c[u][1],
              g = c[u][2](e);
            if (this._isHTMLElement(l)) {
              var p = jindo.$Element(l);
              if (o) {
                var v = (/^[0-9]*([^0-9]*)$/.test(g) && RegExp.$1) || "";
                if (v) {
                  var m,
                    E = parseFloat(g);
                  (E += a[_] || 0),
                    (E = parseFloat(E.toFixed(5))),
                    r == h - 1
                      ? (g = Math.round(E) + v)
                      : ((m = parseFloat((/(\.[0-9]+)$/.test(E) && RegExp.$1) || 0)),
                        (g = parseInt(E, 10) + v),
                        (a[_] = m));
                }
              }
              switch (d) {
                case "style":
                  p.css(_, g);
                  break;
                case "attr":
                  p.$value()[_] = g;
              }
            } else l.setter(_, g);
            this._bIsPlaying &&
              this.fireEvent("playing", {
                element: l,
                sKey: _,
                sValue: g,
                nStep: n,
                nTotalStep: i,
              });
          }
        return (t.nRatio = Math.min(t.nRatio + t.nGap, 1)), (t.nStep += 1), 1 != e;
      },
    })
    .extend(jindo.Component)),
  (function () {
    var t = jindo.$Element.prototype.css;
    jindo.$Element.prototype.css = function (e, n) {
      return "opacity" == e
        ? "undefined" != typeof n
          ? this.opacity(parseFloat(n))
          : this.opacity()
        : "undefined" != typeof n
        ? t.call(this, e, n)
        : t.call(this, e);
    };
  })(),
  (jindo.Effect = function (t) {
    if (this instanceof arguments.callee) throw new Error("You can't create a instance of this");
    var e = /^(\-?[0-9\.]+)(%|px|pt|em)?$/,
      n = /^rgb\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+)\)$/i,
      i = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
      s = /^#([0-9A-F])([0-9A-F])([0-9A-F])$/i,
      a = function (t) {
        var a,
          o = t;
        return (
          e.test(t)
            ? ((o = parseFloat(t)), (a = RegExp.$2))
            : n.test(t)
            ? ((o = [parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10), parseInt(RegExp.$3, 10)]),
              (a = "color"))
            : i.test((t = t.replace(s, "#$1$1$2$2$3$3"))) &&
              ((o = [parseInt(RegExp.$1, 16), parseInt(RegExp.$2, 16), parseInt(RegExp.$3, 16)]),
              (a = "color")),
          { nValue: o, sUnit: a }
        );
      };
    return function (e, n) {
      var i;
      if (
        (arguments.length > 1
          ? ((e = a(e)), (n = a(n)), (i = n.sUnit))
          : ((n = a(e)), (e = null), (i = n.sUnit)),
        e && n && e.sUnit != n.sUnit)
      )
        throw new Error("unit error");
      (e = e && e.nValue), (n = n && n.nValue);
      var s = function (s) {
        var a = t(s),
          o = function (t, e) {
            return (e - t) * a + t + i;
          };
        if ("color" == i) {
          var r = parseInt(o(e[0], n[0]), 10) << 16;
          (r |= parseInt(o(e[1], n[1]), 10) << 8),
            (r |= parseInt(o(e[2], n[2]), 10)),
            (r = r.toString(16).toUpperCase());
          for (var h = 0; 6 - r.length; h++) r = "0" + r;
          return "#" + r;
        }
        return o(e, n);
      };
      return (
        null === e &&
          (s.setStart = function (t) {
            if (((t = a(t)), t.sUnit != i)) throw new Error("unit eror");
            e = t.nValue;
          }),
        s
      );
    };
  }),
  (jindo.Effect.linear = jindo.Effect(function (t) {
    return t;
  })),
  (jindo.Effect.easeIn = jindo.Effect(function (t) {
    return 1 - Math.sqrt(1 - t * t);
  })),
  (jindo.Effect.easeOut = jindo.Effect(function (t) {
    return Math.sqrt((2 - t) * t);
  })),
  (jindo.Effect.bounce = jindo.Effect(function (t) {
    return 1 / 2.75 > t
      ? 7.5625 * t * t
      : 2 / 2.75 > t
      ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
      : 2.5 / 2.75 > t
      ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
      : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  })),
  (jindo.Effect._cubicBezier = function (t, e, n, i) {
    return function (s) {
      function a(t) {
        return ((u * t + l) * t + h) * t;
      }
      function o(t) {
        return ((d * t + f) * t + c) * t;
      }
      function r(t, e) {
        for (var n, i, s = 0, o = 1, r = t, c = 0; 8 > c; c++) {
          if (((n = a(r) - t), Math.abs(n) < e)) return r;
          if (((i = (3 * u * r + 2 * l) * r + h), Math.abs(i) < 1e-6)) break;
          r -= n / i;
        }
        if (s > r) return s;
        if (r > o) return o;
        for (; o > s; ) {
          if (((n = a(r)), Math.abs(n - t) < e)) return r;
          t > n ? (s = r) : (o = r), (r = 0.5 * (o - s) + s);
        }
        return r;
      }
      var h = 3 * t,
        l = 3 * (n - t) - h,
        u = 1 - h - l,
        c = 3 * e,
        f = 3 * (i - e) - c,
        d = 1 - c - f;
      return o(r(s, 0.001));
    };
  }),
  (jindo.Effect.cubicBezier = function (t, e, n, i) {
    return jindo.Effect(jindo.Effect._cubicBezier(t, e, n, i));
  }),
  (jindo.Effect.overphase = jindo.Effect.cubicBezier(0.25, 0.75, 0.8, 1.3)),
  (jindo.Effect.easeInOut = jindo.Effect.cubicBezier(0.75, 0, 0.25, 1)),
  (jindo.Effect.easeOutIn = jindo.Effect.cubicBezier(0.25, 0.75, 0.75, 0.25)),
  (jindo.Effect.cubicEase = jindo.Effect.cubicBezier(0.25, 0.1, 0.25, 1)),
  (jindo.Effect.cubicEaseIn = jindo.Effect.cubicBezier(0.42, 0, 1, 1)),
  (jindo.Effect.cubicEaseOut = jindo.Effect.cubicBezier(0, 0, 0.58, 1)),
  (jindo.Effect.cubicEaseInOut = jindo.Effect.cubicBezier(0.42, 0, 0.58, 1)),
  (jindo.Effect.cubicEaseOutIn = jindo.Effect.cubicBezier(0, 0.42, 1, 0.58)),
  (jindo.Effect.pulse = function (t) {
    return jindo.Effect(function (e) {
      return -Math.cos(e * (t - 0.5) * 2 * Math.PI) / 2 + 0.5;
    });
  }),
  (jindo.FileUploader = jindo
    .$Class({
      _bIsActivating: !1,
      _aHiddenInput: [],
      $init: function (t, e) {
        var n = {
          sUrl: "",
          sCallback: "",
          htData: {},
          sFiletype: "*",
          sMsgNotAllowedExt: "업로드가 허용되지 않는 파일형식입니다",
          bAutoUpload: !1,
          bAutoReset: !0,
          bActivateOnload: !0,
        };
        this.option(n),
          this.option(e || {}),
          (this._el = jindo.$(t)),
          (this._wel = jindo.$Element(this._el)),
          (this._elForm = this._el.form),
          (this._aHiddenInput = []),
          (this.constructor._oCallback = {}),
          (this._wfChange = jindo.$Fn(this._onFileSelectChange, this)),
          (this._sFunctionName = null),
          this.option("bActivateOnload") && this.activate();
      },
      _appendIframe: function () {
        var t = "tmpFrame_" + this._makeUniqueId();
        (this._welIframe = jindo
          .$Element(jindo.$('<iframe name="' + t + '" src="">'))
          .css({
            position: "absolute",
            width: "1px",
            height: "1px",
            left: "-100px",
            top: "-100px",
          })),
          document.body.appendChild(this._welIframe.$value());
      },
      _removeIframe: function () {
        this._welIframe && this._welIframe.leave();
      },
      getBaseElement: function () {
        return this.getFileSelect();
      },
      getFileSelect: function () {
        return this._el;
      },
      getFormElement: function () {
        return this._elForm;
      },
      upload: function () {
        this._appendIframe();
        var t = this.getFormElement(),
          e = jindo.$Element(t),
          n = this._welIframe.attr("name"),
          i = (this._sFunctionName = n + "_func"),
          s = this.option("sUrl");
        e.attr({ target: n, action: s }),
          this._aHiddenInput.push(
            this._createElement("input", {
              type: "hidden",
              name: "callback",
              value: this.option("sCallback"),
            })
          ),
          this._aHiddenInput.push(
            this._createElement("input", { type: "hidden", name: "callback_func", value: i })
          );
        for (var a in this.option("htData"))
          this._aHiddenInput.push(
            this._createElement("input", {
              type: "hidden",
              name: a,
              value: this.option("htData")[a],
            })
          );
        for (var o = 0; o < this._aHiddenInput.length; o++) t.appendChild(this._aHiddenInput[o]);
        (this.constructor._oCallback[i + "_success"] = jindo
          .$Fn(function (t) {
            this.option("bAutoReset") && this.reset(),
              this._revertFormAttr(),
              this.fireEvent("success", { htResult: t }),
              this._clear();
          }, this)
          .bind()),
          (this.constructor._oCallback[i + "_error"] = jindo
            .$Fn(function (t) {
              this.option("bAutoReset") && this.reset(),
                this._revertFormAttr(),
                this.fireEvent("error", { htResult: t }),
                this._clear();
            }, this)
            .bind()),
          t.submit();
      },
      reset: function () {
        var t = jindo.$("<form>");
        this._wel.wrap(t), t.reset(), jindo.$Element(t).replace(this._el);
        var e = jindo.$Agent().navigator();
        if (e.ie && e.version <= 10) {
          var n = this.getFormElement();
          (n.type = "radio"), (n.type = "file");
        }
        return this._clear(), this;
      },
      _revertFormAttr: function () {
        var t = this.getFormElement(),
          e = jindo.$Element(t);
        e.attr({ target: this._sPrevTarget, action: this._sAction });
      },
      _onActivate: function () {
        var t = this.getFormElement(),
          e = jindo.$Element(t);
        (this._sPrevTarget = e.attr("target")),
          (this._sAction = e.attr("action")),
          (this._el.value = ""),
          this._wfChange.attach(this._el, "change");
      },
      _onDeactivate: function () {
        this._wfChange.detach(this._el, "change");
      },
      _makeUniqueId: function () {
        return new Date().getMilliseconds() + Math.floor(1e5 * Math.random());
      },
      _createElement: function (t, e) {
        var n = jindo.$("<" + t + ">"),
          i = jindo.$Element(n);
        for (var s in e) i.attr(s, e[s]);
        return n;
      },
      _checkExtension: function (t) {
        for (var e, n = this.option("sFiletype").split(";"), i = 0; i < n.length; i++)
          if (
            ((e = "*.*" == n[i] ? "*" : n[i]),
            (e = e.replace(/^\s+|\s+$/, "")),
            (e = e.replace(/\./g, "\\.")),
            (e = e.replace(/\*/g, "[^\\/]+")),
            new RegExp(e + "$", "gi").test(t))
          )
            return !0;
        return !1;
      },
      _onFileSelectChange: function (t) {
        var e = t.element.value,
          n = this._checkExtension(e),
          i = { sValue: e, bAllowed: n, sMsgNotAllowedExt: this.option("sMsgNotAllowedExt") };
        e.length &&
          this.fireEvent("select", i) &&
          (n ? this.option("bAutoUpload") && this.upload() : alert(i.sMsgNotAllowedExt));
      },
      _clear: function () {
        null != this._sFunctionName &&
          (delete this.constructor._oCallback[this._sFunctionName + "_success"],
          delete this.constructor._oCallback[this._sFunctionName + "_error"],
          (this._sFunctionName = null));
        for (var t = 0, e = this._aHiddenInput.length; e > t; t++)
          jindo.$Element(this._aHiddenInput[t]).leave();
        (this._aHiddenInput.length = 0), this._removeIframe();
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.MultipleAjaxRequest = jindo
    .$Class({
      _bIsRequesting: !1,
      $init: function (t) {
        var e = { sMode: "parallel" };
        this.option(e), this.option(t);
      },
      isRequesting: function () {
        return this._bIsRequesting;
      },
      request: function (t, e) {
        if (this.isRequesting()) return !1;
        switch (
          (t instanceof Array || (t = [t]),
          "undefined" == typeof e && (e = {}),
          (this._htMetaData = e),
          this.option("sMode"))
        ) {
          case "parallel":
            this._parallelRequest(t);
            break;
          case "serial":
            this._serialRequest(t);
            break;
          default:
            return !1;
        }
        return !0;
      },
      _fireEventStart: function () {
        return (
          (this._bIsRequesting = !0),
          this.fireEvent("start", { aAjax: this._aAjax, htMetaData: this._htMetaData })
            ? !0
            : (this.abort(), !1)
        );
      },
      _fireEventBeforeEachRequest: function (t) {
        return this.fireEvent("beforeEachRequest", { oAjax: this._aAjax[t], nIndex: t })
          ? !0
          : (this.abort(), !1);
      },
      _fireEventAfterEachResponse: function (t) {
        return this.fireEvent("afterEachResponse", { oAjax: this._aAjax[t], nIndex: t })
          ? !0
          : (this.abort(), !1);
      },
      _parallelRequest: function (t) {
        if (
          ((this._aAjaxData = t),
          (this._aAjax = []),
          (this._aStatus = []),
          (this._aStatus.length = t.length),
          (this._aResponse = []),
          this._fireEventStart())
        ) {
          var e = this;
          jindo.$A(this._aAjaxData).forEach(function (t, n) {
            var i = function (t) {
              t._constructor = e._aAjax[n];
              var i = e._findAjaxObjectIndexOfResponse(t._constructor);
              (e._aResponse[i] = t),
                (e._aStatus[i] = !0),
                e._fireEventAfterEachResponse(i) &&
                  e._hasCompletedGotResponsesOfParallelResponses() &&
                  e._complete();
            };
            e._aAjax.push(jindo.$Ajax(t.sUrl, t.htOption)),
              (t.htOption.onload = i),
              (t.htOption.onerror = i),
              (t.htOption.ontimeout = i),
              e._aAjax[n].option(t.htOption),
              e._fireEventBeforeEachRequest(n)
                ? e._aAjax[n].request(t.htParameter)
                : jindo.$A.Break();
          });
        }
      },
      _findAjaxObjectIndexOfResponse: function (t) {
        return jindo.$A(this._aAjax).indexOf(t);
      },
      _hasCompletedGotResponsesOfParallelResponses: function () {
        var t = !0;
        return (
          jindo.$A(this._aStatus).forEach(function (e) {
            e || ((t = !1), jindo.$A.Break());
          }),
          t
        );
      },
      _serialRequest: function (t) {
        (this._aAjaxData = t),
          (this._aAjax = []),
          (this._aStatus = []),
          (this._aStatus.length = t.length),
          (this._aResponse = []);
        var e = this;
        jindo.$A(this._aAjaxData).forEach(function (t, n) {
          var i = function (t) {
            (t._constructor = e._aAjax[n]), e._aResponse.push(t), e._serialRequestNext();
          };
          e._aAjax.push(jindo.$Ajax(t.sUrl, t.htOption)),
            (t.htOption.onload = i),
            (t.htOption.onerror = i),
            (t.htOption.ontimeout = i),
            e._aAjax[n].option(t.htOption);
        }),
          this._fireEventStart() &&
            this._fireEventBeforeEachRequest(0) &&
            (this._aAjax[0].request(this._aAjaxData[0].htParameter), (this._aStatus[0] = !0));
      },
      _serialRequestNext: function () {
        for (var t = -1, e = 0; e < this._aStatus.length; e++)
          if (!this._aStatus[e]) {
            (this._aStatus[e] = !0), (t = e);
            break;
          }
        t > 0
          ? this._fireEventAfterEachResponse(t - 1) &&
            this._fireEventBeforeEachRequest(t) &&
            this._aAjax[t].request(this._aAjaxData[t].htParameter)
          : -1 == t &&
            this._fireEventAfterEachResponse(this._aStatus.length - 1) &&
            this._complete();
      },
      _reset: function () {
        (this._aAjaxData.length = 0),
          (this._aAjax.length = 0),
          (this._aStatus.length = 0),
          (this._aResponse.length = 0),
          (this._htMetaData = null),
          delete this._aAjaxData,
          delete this._aAjax,
          delete this._aStatus,
          delete this._aResponse,
          delete this._htMetaData,
          (this._bIsRequesting = !1);
      },
      abort: function () {
        jindo.$A(this._aAjax).forEach(function (t) {
          t.abort();
        }),
          this._reset();
      },
      _complete: function () {
        var t,
          e = this._aResponse.concat(),
          n = {};
        for (t in this._htMetaData) n[t] = this._htMetaData[t];
        this._reset(), this.fireEvent("complete", { aResponse: e, htMetaData: n });
      },
    })
    .extend(jindo.Component)),
  (jindo.RolloverClick = jindo
    .$Class({
      $init: function (t, e) {
        this.option({
          bActivateOnload: !0,
          sCheckEvent: "click",
          bCheckDblClick: !1,
          RolloverArea: {
            sClassName: "rollover",
            sClassPrefix: "rollover-",
            bCheckMouseDown: !1,
            bActivateOnload: !1,
            htStatus: { sOver: "over", sDown: "down" },
          },
        }),
          this.option(e || {});
        var n = this;
        (this._oRolloverArea = new jindo.RolloverArea(t, this.option("RolloverArea")).attach({
          over: function (t) {
            n.fireEvent("over", t) || t.stop();
          },
          out: function (t) {
            n.fireEvent("out", t) || t.stop();
          },
        })),
          (this._wfClick = jindo.$Fn(this._onClick, this)),
          (this._wfDblClick = jindo.$Fn(this._onClick, this)),
          this.option("bActivateOnload") && this.activate();
      },
      _onClick: function (t) {
        var e = t.element,
          n = "click";
        for ("dblclick" == t.type && (n = t.type); (e = this._oRolloverArea._findRollover(e)); )
          this.fireEvent(n, {
            element: e,
            htStatus: this._oRolloverArea.option("htStatus"),
            weEvent: t,
          }),
            (e = e.parentNode);
      },
      _onActivate: function () {
        this._wfClick.attach(this._oRolloverArea._elArea, this.option("sCheckEvent")),
          this.option("bCheckDblClick") &&
            this._wfDblClick.attach(this._oRolloverArea._elArea, "dblclick"),
          this._oRolloverArea.activate();
      },
      _onDeactivate: function () {
        this._wfClick.detach(this._oRolloverArea._elArea, this.option("sCheckEvent")),
          this._wfDblClick.detach(this._oRolloverArea._elArea, "dblclick"),
          this._oRolloverArea.deactivate();
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.Pagination = jindo
    .$Class({
      $init: function (t, e) {
        (this._elPageList = jindo.$(t)),
          (this._welPageList = jindo.$Element(this._elPageList)),
          (this._waPage = jindo.$A([])),
          (this._fClickPage = jindo.$Fn(this._onClickPageList, this)),
          this.option({
            bActivateOnload: !0,
            nItem: 10,
            nItemPerPage: 10,
            nPagePerPageList: 10,
            nPage: 1,
            sMoveUnit: "pagelist",
            bAlignCenter: !1,
            sInsertTextNode: "",
            sClassPrefix: "",
            sClassFirst: "first-child",
            sClassLast: "last-child",
            sPageTemplate: "<a href='#'>{=page}</a>",
            sCurrentPageTemplate: "<strong>{=page}</strong>",
            elFirstPageLinkOn: jindo.$$.getSingle(
              "a." + this._wrapPrefix("pre_end"),
              this._elPageList
            ),
            elPrevPageLinkOn: jindo.$$.getSingle("a." + this._wrapPrefix("pre"), this._elPageList),
            elNextPageLinkOn: jindo.$$.getSingle("a." + this._wrapPrefix("next"), this._elPageList),
            elLastPageLinkOn: jindo.$$.getSingle(
              "a." + this._wrapPrefix("next_end"),
              this._elPageList
            ),
            elFirstPageLinkOff: jindo.$$.getSingle(
              "span." + this._wrapPrefix("pre_end"),
              this._elPageList
            ),
            elPrevPageLinkOff: jindo.$$.getSingle(
              "span." + this._wrapPrefix("pre"),
              this._elPageList
            ),
            elNextPageLinkOff: jindo.$$.getSingle(
              "span." + this._wrapPrefix("next"),
              this._elPageList
            ),
            elLastPageLinkOff: jindo.$$.getSingle(
              "span." + this._wrapPrefix("next_end"),
              this._elPageList
            ),
          }),
          this.option(e || {}),
          this.option("bActivateOnload") && this.activate();
      },
      option: function (t, e) {
        var n = jindo.Component.prototype.option.apply(this, arguments);
        if ("object" == typeof t || "undefined" != typeof e) {
          var i = this.option("sMoveUnit"),
            s = this.option("bAlignCenter");
          if (s && "pageunit" === i)
            throw new Error(
              'Invalid Option : sMoveUnit can\'t be set to "pageunit" when bAlignCenter is true.'
            );
        }
        return n;
      },
      _wrapPrefix: function (t) {
        var e = this.option("sClassPrefix");
        return e ? e + t.replace(/_/g, "-") : t;
      },
      getBaseElement: function () {
        return this._elPageList;
      },
      getItemCount: function () {
        return this.option("nItem");
      },
      setItemCount: function (t) {
        this.option({ nItem: t });
      },
      getItemPerPage: function () {
        return this.option("nItemPerPage");
      },
      setItemPerPage: function (t) {
        this.option("nItemPerPage", t);
      },
      getCurrentPage: function () {
        return this._nCurrentPage;
      },
      getFirstItemOfPage: function (t) {
        return this.getItemPerPage() * (t - 1) + 1;
      },
      getPageOfItem: function (t) {
        return Math.ceil(t / this.getItemPerPage());
      },
      _getLastPage: function () {
        return Math.ceil(this.getItemCount() / this.getItemPerPage());
      },
      _getRelativePage: function (t) {
        var e = null,
          n = "page" == this.option("sMoveUnit"),
          i = this._getPageList(this.getCurrentPage());
        switch (t) {
          case "pre_end":
            e = 1;
            break;
          case "next_end":
            e = this._getLastPage();
            break;
          case "pre":
            e = n ? this.getCurrentPage() - 1 : (i - 1) * this.option("nPagePerPageList");
            break;
          case "next":
            e = n ? this.getCurrentPage() + 1 : i * this.option("nPagePerPageList") + 1;
        }
        return e;
      },
      _getPageList: function (t) {
        if (this.option("bAlignCenter")) {
          var e = Math.floor(this.option("nPagePerPageList") / 2),
            n = t - e;
          return (n = Math.max(n, 1)), (n = Math.min(n, this._getLastPage()));
        }
        return Math.ceil(t / this.option("nPagePerPageList"));
      },
      _isIn: function (t, e) {
        return e ? (t === e ? !0 : jindo.$Element(t).isChildOf(e)) : !1;
      },
      _getPageElement: function (t) {
        for (var e = 0, n = this._waPage.$value().length; n > e; e++) {
          var i = this._waPage.get(e);
          if (this._isIn(t, i)) return i;
        }
        return null;
      },
      _onClickPageList: function (t) {
        t.stop(jindo.$Event.CANCEL_DEFAULT);
        var e = null,
          n = this.option(),
          i = t.element;
        if (this._isIn(i, n.elFirstPageLinkOn)) e = this._getRelativePage("pre_end");
        else if (this._isIn(i, n.elPrevPageLinkOn)) e = this._getRelativePage("pre");
        else if (this._isIn(i, n.elNextPageLinkOn)) e = this._getRelativePage("next");
        else if (this._isIn(i, n.elLastPageLinkOn)) e = this._getRelativePage("next_end");
        else {
          var s = this._getPageElement(i);
          if (!s) return;
          e = parseInt(jindo.$Element(s).text(), 10);
        }
        this.fireEvent("click", { nPage: e, weEvent: t }) && this.movePageTo(e);
      },
      _convertToAvailPage: function (t) {
        var e = this._getLastPage();
        return (t = Math.max(t, 1)), (t = Math.min(t, e));
      },
      movePageTo: function (t, e) {
        "undefined" == typeof e && (e = !0),
          (t = this._convertToAvailPage(t)),
          (this._nCurrentPage = t),
          (!e || this.fireEvent("beforeMove", { nPage: t })) &&
            (this._paginate(t), e && this.fireEvent("move", { nPage: t }));
      },
      reset: function (t) {
        "undefined" == typeof t && (t = this.option("nItem")),
          this.setItemCount(t),
          this.movePageTo(1, !1);
      },
      _onActivate: function () {
        jindo.$Element.prototype.preventTapHighlight && this._welPageList.preventTapHighlight(!0),
          this._fClickPage.attach(this._elPageList, "click"),
          this.setItemCount(this.option("nItem")),
          this.movePageTo(this.option("nPage"), !1),
          this._welPageList.addClass(this._wrapPrefix("loaded"));
      },
      _onDeactivate: function () {
        jindo.$Element.prototype.preventTapHighlight && this._welPageList.preventTapHighlight(!1),
          this._fClickPage.detach(this._elPageList, "click"),
          this._welPageList.removeClass(this._wrapPrefix("loaded"));
      },
      _addTextNode: function () {
        var t = this.option("sInsertTextNode");
        this._elPageList.appendChild(document.createTextNode(t));
      },
      _paginate: function (t) {
        this._empty(), this._addTextNode();
        var e = this.option(),
          n = e.elFirstPageLinkOn,
          i = e.elPrevPageLinkOn,
          s = e.elNextPageLinkOn,
          a = e.elLastPageLinkOn,
          o = e.elFirstPageLinkOff,
          r = e.elPrevPageLinkOff,
          h = e.elNextPageLinkOff,
          l = e.elLastPageLinkOff,
          u = this._getLastPage(),
          c = this._getPageList(t),
          f = this._getPageList(u);
        0 === u
          ? this._welPageList.addClass(this._wrapPrefix("no-result"))
          : 1 == u
          ? this._welPageList
              .addClass(this._wrapPrefix("only-one"))
              .removeClass(this._wrapPrefix("no-result"))
          : this._welPageList
              .removeClass(this._wrapPrefix("only-one"))
              .removeClass(this._wrapPrefix("no-result"));
        var d, _;
        if (e.bAlignCenter) {
          var g = Math.floor(e.nPagePerPageList / 2);
          (d = t - g),
            (d = Math.max(d, 1)),
            (_ = d + e.nPagePerPageList - 1),
            _ > u && ((d = u - e.nPagePerPageList + 1), (d = Math.max(d, 1)), (_ = u));
        } else
          (d = (c - 1) * e.nPagePerPageList + 1),
            (_ = c * e.nPagePerPageList),
            (_ = Math.min(_, u));
        "page" == e.sMoveUnit && ((c = t), (f = u)),
          t > 1
            ? n && (this._welPageList.append(n), this._addTextNode())
            : o && (this._welPageList.append(o), this._addTextNode()),
          c > 1
            ? i && (this._welPageList.append(i), this._addTextNode())
            : r && (this._welPageList.append(r), this._addTextNode());
        for (var p, v, m = d; _ >= m; m++)
          m == t
            ? (p = jindo.$(jindo.$Template(e.sCurrentPageTemplate).process({ page: m.toString() })))
            : ((p = jindo.$(jindo.$Template(e.sPageTemplate).process({ page: m.toString() }))),
              this._waPage.push(p)),
            (v = jindo.$Element(p)),
            m == d && v.addClass(this._wrapPrefix(this.option("sClassFirst"))),
            m == _ && v.addClass(this._wrapPrefix(this.option("sClassLast"))),
            this._welPageList.append(p),
            this._addTextNode();
        f > c
          ? s && (this._welPageList.append(s), this._addTextNode())
          : h && (this._welPageList.append(h), this._addTextNode()),
          u > t
            ? a && (this._welPageList.append(a), this._addTextNode())
            : l && (this._welPageList.append(l), this._addTextNode());
      },
      _empty: function () {
        var t = this.option();
        this.option({
          elFirstPageLinkOn: this._clone(t.elFirstPageLinkOn),
          elPrevPageLinkOn: this._clone(t.elPrevPageLinkOn),
          elNextPageLinkOn: this._clone(t.elNextPageLinkOn),
          elLastPageLinkOn: this._clone(t.elLastPageLinkOn),
          elFirstPageLinkOff: this._clone(t.elFirstPageLinkOff),
          elPrevPageLinkOff: this._clone(t.elPrevPageLinkOff),
          elNextPageLinkOff: this._clone(t.elNextPageLinkOff),
          elLastPageLinkOff: this._clone(t.elLastPageLinkOff),
        }),
          this._waPage.empty(),
          this._welPageList.empty();
      },
      _clone: function (t) {
        return t && t.cloneNode ? t.cloneNode(!0) : t;
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.DatePicker = jindo
    .$Class({
      _aDatePickerSet: [],
      _htSelectedDatePickerSet: null,
      $init: function (t, e) {
        var n = new Date();
        (this.htDefaultOption = {
          bUseLayerPosition: !0,
          Calendar: {
            sClassPrefix: "calendar-",
            nYear: n.getFullYear(),
            nMonth: n.getMonth() + 1,
            nDate: n.getDate(),
            sTitleFormat: "yyyy-mm",
            aMonthTitle: [
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ],
          },
          LayerManager: { sCheckEvent: "click", nShowDelay: 0, nHideDelay: 0 },
          LayerPosition: {
            sPosition: "outside-bottom",
            sAlign: "left",
            nTop: 0,
            nLeft: 0,
            bAuto: !1,
          },
        }),
          this.option(this.htDefaultOption),
          this.option(e),
          (this._elCalendarLayer = jindo.$(t)),
          this._initCalendar(),
          this._initLayerManager(),
          this._initLayerPosition(),
          (this._wfFocusInput = jindo.$Fn(this._onFocusInput, this)),
          (this._wfClickLinkedElement = jindo.$Fn(this._onClickLinkedElement, this)),
          (this._wfMouseOverOutDate = jindo.$Fn(this._onMouseOverOutDate, this)),
          (this._wfClickDate = jindo.$Fn(this._onClickDate, this)),
          this.activate();
      },
      addDatePickerSet: function (t) {
        var e = (this.option(), this.getCalendar().option()),
          n = {
            nYear: e.nYear,
            nMonth: e.nMonth,
            nDate: e.nDate,
            bDefaultSet: !0,
            bReadOnly: !0,
            sDateFormat: "yyyy-mm-dd",
            htSelectableDateFrom: { nYear: 1900, nMonth: 1, nDate: 1 },
            htSelectableDateTo: { nYear: 2100, nMonth: 12, nDate: 31 },
          };
        if ("undefined" != typeof t.htOption)
          for (var i in t.htOption) "undefined" != typeof n[i] && (n[i] = t.htOption[i]);
        (t.htOption = n), this._aDatePickerSet.push(t);
        var s = this.getLayerManager();
        return (
          "undefined" != typeof t.elInput &&
            (s.link(t.elInput),
            t.htOption.bReadOnly && (t.elInput.readOnly = !0),
            this._wfFocusInput.attach(t.elInput, "focus"),
            this._wfClickLinkedElement.attach(t.elInput, "click")),
          "undefined" != typeof t.elButton &&
            (s.link(t.elButton), this._wfClickLinkedElement.attach(t.elButton, "click")),
          t.htOption.bDefaultSet && this._setDate(t, t.htOption),
          this
        );
      },
      removeDatePickerSet: function (t) {
        for (var e = -1, n = 0, i = this._aDatePickerSet.length; i > n; n++)
          if (
            this._aDatePickerSet[n].elInput == t.elInput ||
            this._aDatePickerSet[n].elButton == t.elButton
          ) {
            e = n;
            break;
          }
        var s = this._aDatePickerSet[e],
          a = this.getLayerManager();
        return (
          "undefined" != typeof s.elButton &&
            (a.unlink(s.elButton), this._wfClickLinkedElement.detach(s.elButton, "click")),
          "undefined" != typeof s.elInput &&
            (this._wfFocusInput.detach(s.elInput, "focus"),
            this._wfClickLinkedElement.detach(s.elInput, "click"),
            (s.elInput.readOnly = !1)),
          s == this._htSelectedDatePickerSet && (this._htSelectedDatePickerSet = null),
          this._aDatePickerSet.splice(n, 1),
          this
        );
      },
      getDatePickerSet: function (t) {
        if ("undefined" == typeof t) return this._aDatePickerSet;
        for (var e = 0, n = this._aDatePickerSet.length; n > e; e++)
          if (this._aDatePickerSet[e].elInput == t || this._aDatePickerSet[e].elButton == t)
            return this._aDatePickerSet[e];
        return !1;
      },
      getCalendarLayer: function () {
        return this._elCalendarLayer;
      },
      _initCalendar: function () {
        var t = this;
        this._oCalendar = new jindo.Calendar(
          this.getCalendarLayer(),
          this.option("Calendar")
        ).attach({
          beforeDraw: function (e) {
            t.fireEvent("beforeDraw", e) || e.stop();
          },
          draw: function (e) {
            var n = this.option("sClassPrefix"),
              i = t._htSelectedDatePickerSet;
            t.isSelectable(i, e)
              ? ((e.bSelectable = !0),
                jindo.Calendar.isSameDate(e, i) &&
                  jindo.$Element(e.elDateContainer).addClass(n + "selected"))
              : ((e.bSelectable = !1),
                jindo
                  .$Element(e.elDateContainer)
                  .addClass(this.option("sClassPrefix") + "unselectable")),
              t.fireEvent("draw", e) || e.stop();
          },
          afterDraw: function (e) {
            t.fireEvent("afterDraw", e);
          },
        });
      },
      getCalendar: function () {
        return this._oCalendar;
      },
      _initLayerManager: function () {
        var t = this,
          e = this.getCalendarLayer();
        this._oLayerManager = new jindo.LayerManager(e, this.option("LayerManager"))
          .attach({
            hide: function (e) {
              t._htSelectedDatePickerSet = null;
            },
          })
          .link(e);
      },
      getLayerManager: function () {
        return this._oLayerManager;
      },
      _initLayerPosition: function () {
        this.option("bUseLayerPosition") &&
          (this._oLayerPosition = new jindo.LayerPosition(
            null,
            this.getCalendarLayer(),
            this.option("LayerPosition")
          ));
      },
      getLayerPosition: function () {
        return this._oLayerPosition;
      },
      getInput: function (t) {
        return t.elInput || null;
      },
      setInput: function (t, e) {
        this._setDate(t, e);
      },
      getDate: function (t) {
        return { nYear: t.nYear, nMonth: t.nMonth, nDate: t.nDate };
      },
      _setDate: function (t, e) {
        (t.nYear = 1 * e.nYear),
          (t.nMonth = 1 * e.nMonth),
          (t.nDate = 1 * e.nDate),
          "undefined" != typeof t.elInput && (t.elInput.value = this._getDateFormat(t, e));
      },
      isSelectable: function (t, e) {
        return jindo.Calendar.isBetween(
          e,
          t.htOption.htSelectableDateFrom,
          t.htOption.htSelectableDateTo
        );
      },
      setDate: function (t, e) {
        if (this.isSelectable(t, e)) {
          var n = this._getDateFormat(t, e),
            i = { sText: n, nYear: e.nYear, nMonth: e.nMonth, nDate: e.nDate };
          return (
            this.fireEvent("beforeSelect", i) &&
              (this._setDate(t, e), this.fireEvent("select", i) && this.getLayerManager().hide()),
            !0
          );
        }
        return !1;
      },
      _getDateFormat: function (t, e) {
        var n = e.nYear,
          i = e.nMonth,
          s = e.nDate;
        10 > i && (i = ("0" + 1 * i).toString()), 10 > s && (s = ("0" + 1 * s).toString());
        var a = t.htOption.sDateFormat;
        return (a = a
          .replace(/yyyy/g, n)
          .replace(/y/g, n.toString().substr(2, 2))
          .replace(/mm/g, i)
          .replace(/m/g, 1 * i)
          .replace(/M/g, this.getCalendar().option("aMonthTitle")[i - 1])
          .replace(/dd/g, s)
          .replace(/d/g, 1 * s));
      },
      _linkOnly: function (t) {
        var e = this.getLayerManager();
        e.setLinks([this.getCalendarLayer()]),
          "undefined" != typeof t.elInput && e.link(t.elInput),
          "undefined" != typeof t.elButton && e.link(t.elButton);
      },
      _onActivate: function () {
        var t = this.getCalendarLayer();
        this._wfMouseOverOutDate.attach(t, "mouseover").attach(t, "mouseout"),
          this._wfClickDate.attach(t, "click"),
          this.getLayerManager().activate(),
          this.getCalendar().activate();
      },
      _onDeactivate: function () {
        var t = this.getCalendarLayer();
        this._wfMouseOverOutDate.detach(t, "mouseover").detach(t, "mouseout"),
          this._wfClickDate.detach(t, "click").detach(t, "mouseover").detach(t, "mouseout"),
          this.getLayerManager().deactivate(),
          this.getCalendar().deactivate();
      },
      attachEvent: function () {
        return this.activate();
      },
      detachEvent: function () {
        return this.deactivate();
      },
      addButton: function () {
        return this;
      },
      _onFocusInput: function (t) {
        this.fireEvent("focus");
      },
      _onClickLinkedElement: function (t) {
        if (
          (t.stop(jindo.$Event.CANCEL_DEFAULT), this.fireEvent("click", { element: t.element }))
        ) {
          var e = this.getDatePickerSet(t.currentElement);
          if (e) {
            (this._htSelectedDatePickerSet = e),
              this._linkOnly(e),
              e.nYear || (e.nYear = e.htOption.nYear),
              e.nMonth || (e.nMonth = e.htOption.nMonth),
              e.nDate || (e.nDate = e.htOption.nDate);
            var n = e.nYear,
              i = e.nMonth;
            this.getCalendar().draw(n, i),
              this.getLayerManager().show(),
              this.option("bUseLayerPosition") &&
                ("undefined" != typeof e.elLayerPosition
                  ? this.getLayerPosition().setElement(e.elLayerPosition).setPosition()
                  : this.getLayerPosition().setElement(e.elInput).setPosition());
          }
        }
      },
      _getTargetDateElement: function (t) {
        var e = this.getCalendar().option("sClassPrefix"),
          n = jindo.$Element(t).hasClass(e + "date") ? t : jindo.$$.getSingle("." + e + "date", t);
        return !n || (n != t && 1 != n.length) ? null : n;
      },
      _getTargetDateContainerElement: function (t) {
        var e = this.getCalendar().option("sClassPrefix"),
          n = jindo.$$.getSingle("! ." + e + "week", t);
        if (n) {
          for (var i = t; !jindo.$Element(i.parentNode).hasClass(e + "week"); ) i = i.parentNode;
          return jindo.$Element(i).hasClass(e + "unselectable") ? null : i;
        }
        return null;
      },
      _onMouseOverOutDate: function (t) {
        t.stop(jindo.$Event.CANCEL_DEFAULT);
        var e = this.getCalendar().option("sClassPrefix"),
          n = t.element,
          i = this._getTargetDateContainerElement(n);
        if (i) {
          var s = this.getCalendar().getDateOfElement(i);
          if (
            this._htSelectedDatePickerSet &&
            this.isSelectable(this._htSelectedDatePickerSet, s)
          ) {
            if ("mouseover" == t.type)
              return (
                this._elSelected ||
                  ((this._elSelected = jindo.$$.getSingle(
                    "." + e + "selected",
                    this.elWeekAppendTarget
                  )),
                  this._elSelected && jindo.$Element(this._elSelected).removeClass(e + "selected")),
                void jindo.$Element(i).addClass(e + "over")
              );
            if ("mouseout" == t.type) return void jindo.$Element(i).removeClass(e + "over");
          } else
            this._elSelected &&
              (jindo.$Element(this._elSelected).addClass(e + "selected"),
              (this._elSelected = null));
        } else
          this._elSelected &&
            (jindo.$Element(this._elSelected).addClass(e + "selected"), (this._elSelected = null));
      },
      _onClickDate: function (t) {
        t.stop(jindo.$Event.CANCEL_DEFAULT);
        var e = t.element,
          n = this._getTargetDateElement(e);
        if (n) {
          var i = this._getTargetDateContainerElement(n);
          if (i) {
            var s = this.getCalendar().getDateOfElement(i);
            this.isSelectable(this._htSelectedDatePickerSet, s) &&
              this.setDate(this._htSelectedDatePickerSet, s);
          }
        }
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.StarRating = jindo
    .$Class({
      $init: function (t, e) {
        var n = { nStep: 1, nMaxValue: 10, nDefaultValue: 0, bSnap: !1, bActivateOnload: !0 };
        this.option(n),
          this.option(e || {}),
          (this._el = jindo.$(t)),
          (this._wel = jindo.$Element(t)),
          this._assignHTMLElements(),
          (this._wfMouseMove = jindo.$Fn(this._onMouseMove, this)),
          (this._wfMouseLeave = jindo.$Fn(this._onMouseLeave, this)),
          (this._wfClick = jindo.$Fn(this._onClick, this)),
          this.option("bActivateOnload") && this.activate();
      },
      _assignHTMLElements: function () {
        (this._elRatingElement = jindo.$$.getSingle("span", this.getBaseElement())),
          (this._welRatingElement = jindo.$Element(this._elRatingElement));
      },
      getBaseElement: function () {
        return this._el;
      },
      getRatingElement: function () {
        return this._elRatingElement;
      },
      getValue: function () {
        return this._nValue;
      },
      getValueByWidth: function () {
        return (this._welRatingElement.width() / this._nBaseWidth) * this.option("nMaxValue");
      },
      getValueToBeSet: function (t) {
        return (
          (t = this._round(t, this.option("nStep"))),
          (t = Math.min(t, this.option("nMaxValue"))),
          (t = Math.max(t, 0))
        );
      },
      setValue: function (t, e) {
        "undefined" == typeof e && (e = !0);
        var n = this.option("nMaxValue");
        t = this.getValueToBeSet(t);
        var i = (this._nBaseWidth * t) / n;
        return (
          (i = Math.min(i, this._nBaseWidth)),
          this._welRatingElement.width(i),
          (this._nValue = t),
          e && this.fireEvent("set", { nValue: this._nValue }),
          this
        );
      },
      reset: function () {
        var t = this.option("nDefaultValue") || 0;
        return this.setValue(t, !1), this;
      },
      _round: function (t, e) {
        var n,
          i,
          s = t,
          a = Math.floor(t),
          o = a + 1,
          r = 1;
        for (i = a; o >= i; i += e) (n = Math.abs(t - i)), r >= n && ((r = n), (s = i));
        return s.toFixed(Math.max(e.toString().length - 2, 0));
      },
      _onActivate: function () {
        var t = this.getBaseElement();
        this._wfMouseMove.attach(t, "mousemove"),
          this._wfMouseLeave.attach(t, "mouseleave"),
          this._wfClick.attach(t, "click"),
          (this._nBaseWidth = this._wel.width()),
          this.reset();
      },
      _onDeactivate: function () {
        var t = this.getBaseElement();
        this._wfMouseMove.detach(t, "mousemove"),
          this._wfMouseLeave.detach(t, "mouseleave"),
          this._wfClick.detach(t, "click");
      },
      _onMouseMove: function (t) {
        var e,
          n = t.pos(!0).offsetX + 1,
          i = n > this._nBaseWidth ? this._nBaseWidth : n;
        this.option("bSnap") &&
          ((e = (n / this._nBaseWidth) * this.option("nMaxValue")),
          (i =
            (this._round(e, this.option("nStep")) * this._nBaseWidth) / this.option("nMaxValue")),
          (i = Math.min(i, this._nBaseWidth))),
          this._welRatingElement.css("width", i + "px"),
          (e = this.getValueByWidth()),
          this.fireEvent("move", { nValue: e, nValueToBeSet: this.getValueToBeSet(e) });
      },
      _onMouseLeave: function (t) {
        this.setValue(this._nValue, !1), this.fireEvent("out");
      },
      _onClick: function (t) {
        this.setValue(this.getValueByWidth());
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.DragArea = jindo
    .$Class({
      $init: function (t, e) {
        this.option({ sClassName: "draggable", bFlowOut: !0, bSetCapture: !0, nThreshold: 0 }),
          this.option(e || {}),
          (this._el = t),
          (this._bIE = jindo.$Agent().navigator().ie),
          (this._htDragInfo = { bIsDragging: !1, bPrepared: !1, bHandleDown: !1, bForceDrag: !1 }),
          (this._wfOnMouseDown = jindo.$Fn(this._onMouseDown, this)),
          (this._wfOnMouseMove = jindo.$Fn(this._onMouseMove, this)),
          (this._wfOnMouseUp = jindo.$Fn(this._onMouseUp, this)),
          (this._wfOnDragStart = jindo.$Fn(this._onDragStart, this)),
          (this._wfOnSelectStart = jindo.$Fn(this._onSelectStart, this)),
          this.activate();
      },
      _findDraggableElement: function (t) {
        if (1 === t.nodeType && jindo.$$.test(t, "input[type=text], textarea, select")) return null;
        var e = this,
          n = "." + this.option("sClassName"),
          i = function (t) {
            return null === t
              ? !1
              : e._el === document || e._el === t
              ? !0
              : jindo.$Element(e._el).isParentOf(t);
          },
          s = jindo.$$.test(t, n) ? t : jindo.$$.getSingle("! " + n, t);
        return i(s) || (s = null), s;
      },
      isDragging: function () {
        var t = this._htDragInfo;
        return t.bIsDragging && !t.bPrepared;
      },
      stopDragging: function () {
        return this._stopDragging(!0), this;
      },
      _stopDragging: function (t) {
        if (
          (this._wfOnMouseMove.detach(document, "mousemove"),
          this._wfOnMouseUp.detach(document, "mouseup"),
          this.isDragging())
        ) {
          var e = this._htDragInfo,
            n = jindo.$Element(e.elDrag);
          (e.bIsDragging = !1),
            (e.bForceDrag = !1),
            (e.bPrepared = !1),
            this._bIE &&
              this._elSetCapture &&
              (this._elSetCapture.releaseCapture(), (this._elSetCapture = null)),
            this.fireEvent("dragEnd", {
              elArea: this._el,
              elHandle: e.elHandle,
              elDrag: e.elDrag,
              nX: parseInt(n.css("left"), 10) || 0,
              nY: parseInt(n.css("top"), 10) || 0,
              bInterupted: t,
            });
        }
      },
      _onActivate: function () {
        this._wfOnMouseDown.attach(this._el, "mousedown"),
          this._wfOnDragStart.attach(this._el, "dragstart"),
          this._wfOnSelectStart.attach(this._el, "selectstart");
      },
      _onDeactivate: function () {
        this._wfOnMouseDown.detach(this._el, "mousedown"),
          this._wfOnDragStart.detach(this._el, "dragstart"),
          this._wfOnSelectStart.detach(this._el, "selectstart");
      },
      attachEvent: function () {
        this.activate();
      },
      detachEvent: function () {
        this.deactivate();
      },
      isEventAttached: function () {
        return this.isActivating();
      },
      startDragging: function (t) {
        var e = this._findDraggableElement(t);
        return e
          ? ((this._htDragInfo.bForceDrag = !0),
            (this._htDragInfo.bPrepared = !0),
            (this._htDragInfo.elHandle = e),
            (this._htDragInfo.elDrag = e),
            this._wfOnMouseMove.attach(document, "mousemove"),
            this._wfOnMouseUp.attach(document, "mouseup"),
            !0)
          : !1;
      },
      _onMouseDown: function (t) {
        var e = t.mouse(!0);
        if (!e.left || e.right || e.scrollbar) return void this._stopDragging(!0);
        var n = this._findDraggableElement(t.element);
        if (n) {
          var i = t.pos(),
            s = this._htDragInfo;
          (s.bHandleDown = !0),
            (s.bPrepared = !0),
            (s.nButton = t._event.button),
            (s.elHandle = n),
            (s.elDrag = n),
            (s.nPageX = i.pageX),
            (s.nPageY = i.pageY),
            this.fireEvent("handleDown", { elHandle: n, elDrag: n, weEvent: t }) &&
              this._wfOnMouseMove.attach(document, "mousemove"),
            this._wfOnMouseUp.attach(document, "mouseup"),
            t.stop(jindo.$Event.CANCEL_DEFAULT);
        }
      },
      _onMouseMove: function (t) {
        var e,
          n,
          i = this._htDragInfo,
          s = t.pos(),
          a = { nX: s.pageX - i.nPageX, nY: s.pageY - i.nPageY };
        if (i.bPrepared) {
          var o = this.option("nThreshold"),
            r = {};
          if (!i.bForceDrag && o) {
            (r.nPageX = s.pageX - i.nPageX), (r.nPageY = s.pageY - i.nPageY);
            var h = Math.sqrt(r.nPageX * r.nPageX + r.nPageY * r.nPageY);
            if (o > h) return;
          }
          if (
            (this._bIE &&
              this.option("bSetCapture") &&
              ((this._elSetCapture =
                this._el === document ? document.body : this._findDraggableElement(t.element)),
              this._elSetCapture && this._elSetCapture.setCapture(!1)),
            (e = {
              elArea: this._el,
              elHandle: i.elHandle,
              elDrag: i.elDrag,
              htDiff: r,
              weEvent: t,
            }),
            (i.bIsDragging = !0),
            (i.bPrepared = !1),
            !this.fireEvent("dragStart", e))
          )
            return void (i.bPrepared = !0);
          var l = jindo.$Element(e.elDrag),
            u = l.offset();
          (i.elHandle = e.elHandle),
            (i.elDrag = e.elDrag),
            (i.nX = parseInt(l.css("left"), 10) || 0),
            (i.nY = parseInt(l.css("top"), 10) || 0),
            (i.nClientX = u.left + l.width() / 2),
            (i.nClientY = u.top + l.height() / 2);
        }
        if (
          (i.bForceDrag && ((a.nX = s.clientX - i.nClientX), (a.nY = s.clientY - i.nClientY)),
          (e = {
            elArea: this._el,
            elFlowOut: i.elDrag.parentNode,
            elHandle: i.elHandle,
            elDrag: i.elDrag,
            weEvent: t,
            nX: i.nX + a.nX,
            nY: i.nY + a.nY,
            nGapX: a.nX,
            nGapY: a.nY,
          }),
          this.fireEvent("beforeDrag", e))
        ) {
          var c = i.elDrag;
          if (this.option("bFlowOut") === !1) {
            var f = e.elFlowOut,
              d = [c.offsetWidth, c.offsetHeight],
              _ = 0,
              g = 0;
            if (
              (f == document.body && (f = null),
              f && d[0] <= f.scrollWidth && d[1] <= f.scrollHeight)
            )
              (n = { nWidth: f.clientWidth, nHeight: f.clientHeight }),
                (_ = f.scrollLeft),
                (g = f.scrollTop);
            else {
              var p = jindo.$Document().clientSize();
              n = { nWidth: p.width, nHeight: p.height };
            }
            null !== e.nX &&
              ((e.nX = Math.max(e.nX, _)), (e.nX = Math.min(e.nX, n.nWidth - d[0] + _))),
              null !== e.nY &&
                ((e.nY = Math.max(e.nY, g)), (e.nY = Math.min(e.nY, n.nHeight - d[1] + g)));
          }
          null !== e.nX && (c.style.left = e.nX + "px"),
            null !== e.nY && (c.style.top = e.nY + "px"),
            this.fireEvent("drag", e);
        } else i.bIsDragging = !1;
      },
      _onMouseUp: function (t) {
        this._stopDragging(!1);
        var e = this._htDragInfo;
        (e.bHandleDown = !1),
          this.fireEvent("handleUp", { weEvent: t, elHandle: e.elHandle, elDrag: e.elDrag });
      },
      _onDragStart: function (t) {
        this._findDraggableElement(t.element) && t.stop(jindo.$Event.CANCEL_DEFAULT);
      },
      _onSelectStart: function (t) {
        (this.isDragging() || this._findDraggableElement(t.element)) &&
          t.stop(jindo.$Event.CANCEL_DEFAULT);
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.DefaultTextValue = jindo
    .$Class({
      $init: function (t, e) {
        this.option({ sValue: "", bActivateOnload: !0 }),
          this.option(e || {}),
          (this._elBaseTarget = jindo.$(t)),
          (this._wfOnFocusAndBlur = jindo.$Fn(this._onFocusAndBlur, this)),
          this.option("bActivateOnload") && this.activate();
      },
      getBaseElement: function () {
        return this._elBaseTarget;
      },
      setDefault: function () {
        return (this.getBaseElement().value = this.option("sValue")), this;
      },
      setDefaultValue: function (t) {
        var e = this.option("sValue");
        return (
          this.option("sValue", t), this.getBaseElement().value == e && this.setDefault(), this
        );
      },
      getDefaultValue: function () {
        return this.option("sValue");
      },
      paint: function () {
        return this;
      },
      _onActivate: function () {
        var t = this.getBaseElement();
        "" == t.value && this.setDefault(),
          this._wfOnFocusAndBlur.attach(t, "focus").attach(t, "blur");
      },
      _onDeactivate: function () {
        var t = this.getBaseElement();
        this._wfOnFocusAndBlur.detach(t, "focus").detach(t, "blur");
      },
      _onFocusAndBlur: function (t) {
        var e = this._elBaseTarget,
          n = e.value;
        switch (t.type) {
          case "focus":
            n == this.getDefaultValue() && ((e.value = ""), e.select());
            break;
          case "blur":
            "" == jindo.$S(n).trim().$value() && this.setDefault();
        }
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.NumericStepper = jindo
    .$Class({
      _bIsOnFocus: !1,
      $init: function (t, e) {
        (this._el = jindo.$(t)),
          this.option({
            sClassPrefix: "ns-",
            bActivateOnload: !0,
            bUseMouseWheel: !1,
            nStep: 1,
            nDecimalPoint: 0,
            nMin: -(1 / 0),
            nMax: 1 / 0,
            nDefaultValue: 0,
            bInputReadOnly: !0,
          }),
          this.option(e || {}),
          this._assignHTMLElements(),
          this._initEventHandlers(),
          this.option("bActivateOnload") && this.activate();
      },
      _assignHTMLElements: function () {
        var t = this.option("sClassPrefix");
        (this._elInput = jindo.$$.getSingle("." + t + "input", this._el)),
          (this._elPlusButton = jindo.$$.getSingle("." + t + "plus", this._el)),
          (this._elMinusButton = jindo.$$.getSingle("." + t + "minus", this._el));
      },
      _initEventHandlers: function () {
        (this._wfPlusClick = jindo.$Fn(this._onPlusClick, this)),
          (this._wfMinusClick = jindo.$Fn(this._onMinusClick, this)),
          (this._wfWheel = jindo.$Fn(this._onWheel, this)),
          (this._wfFocus = jindo.$Fn(this._onFocus, this)),
          (this._wfBlur = jindo.$Fn(this._onBlur, this));
      },
      reset: function () {
        this._elInput.value = this.option("nDefaultValue").toFixed(this.option("nDecimalPoint"));
      },
      getValue: function () {
        return parseFloat(this._elInput.value);
      },
      setValue: function (t) {
        t = t.toFixed(this.option("nDecimalPoint"));
        var e = this.option("nMin"),
          n = this.option("nMax"),
          i = { nValue: t, nMin: e, nMax: n };
        return t > n || e > t
          ? void this.fireEvent("overLimit", i)
          : void (
              this.fireEvent("beforeChange", i) &&
              ((this._elInput.value = i.nValue), this.fireEvent("change", i))
            );
      },
      getBaseElement: function () {
        return this._el;
      },
      getInputElement: function () {
        return this._elInput;
      },
      getPlusElement: function () {
        return this._elPlusButton;
      },
      getMinusElement: function () {
        return this._elMinusButton;
      },
      isFocused: function () {
        return this._bIsOnFocus;
      },
      _onActivate: function () {
        var t = this.getInputElement();
        this._wfPlusClick.attach(this.getPlusElement(), "click"),
          this._wfMinusClick.attach(this.getMinusElement(), "click"),
          this._wfFocus.attach(t, "focus"),
          this._wfBlur.attach(t, "blur"),
          this.option("bUseMouseWheel") && this._wfWheel.attach(t, "mousewheel"),
          (this._elInput.readOnly = this.option("bInputReadOnly")),
          this.reset();
      },
      _onDeactivate: function () {
        var t = this.getInputElement();
        this._wfPlusClick.detach(this.getPlusElement(), "click"),
          this._wfMinusClick.detach(this.getMinusElement(), "click"),
          this._wfInputClick.detach(t, "click"),
          this._wfFocus.detach(t, "focus"),
          this._wfBlur.detach(t, "blur"),
          this._wfWheel.detach(t, "mousewheel");
      },
      _onMinusClick: function (t) {
        this.setValue(this.getValue() - this.option("nStep"));
      },
      _onPlusClick: function (t) {
        this.setValue(this.getValue() + this.option("nStep"));
      },
      _onWheel: function (t) {
        this.isFocused() &&
          (t.stop(jindo.$Event.CANCEL_DEFAULT),
          t.mouse().delta > 0 ? this._onPlusClick() : this._onMinusClick());
      },
      _onFocus: function (t) {
        this._bIsOnFocus = !0;
      },
      _onBlur: function (t) {
        (this._bIsOnFocus = !1),
          this.setValue(this.getValue()),
          (this._elInput.readOnly = this.option("bInputReadOnly"));
      },
    })
    .extend(jindo.UIComponent)),
  (jindo.LazyLoading = {
    _waLoading: jindo.$A([]),
    _waLoaded: jindo.$A([]),
    _whtScript: jindo.$H({}),
    _whtCallback: jindo.$H({}),
  }),
  (jindo.LazyLoading.load = function (t, e, n) {
    if (
      ("function" != typeof e && (e = function () {}),
      this._queueCallback(t, e),
      this._checkIsLoading(t))
    )
      return !1;
    if (this._checkAlreadyLoaded(t)) return this._doCallback(t), !0;
    this._waLoading.push(t);
    var i = this,
      s = document.getElementsByTagName("head")[0],
      a = document.createElement("script");
    return (
      (a.type = "text/javascript"),
      (a.charset = n || "utf-8"),
      (a.src = t),
      this._whtScript.add(t, a),
      "onload" in a
        ? (a.onload = function () {
            i._waLoaded.push(t), (i._waLoading = i._waLoading.refuse(t)), i._doCallback(t);
          })
        : (a.onreadystatechange = function () {
            ("complete" == this.readyState || "loaded" == this.readyState) &&
              (i._waLoaded.push(t),
              (i._waLoading = i._waLoading.refuse(t)),
              i._doCallback(t),
              (this.onreadystatechange = null));
          }),
      s.appendChild(a),
      !0
    );
  }),
  (jindo.LazyLoading._queueCallback = function (t, e) {
    var n = this._whtCallback.$(t);
    n ? n.push(e) : this._whtCallback.$(t, [e]);
  }),
  (jindo.LazyLoading._doCallback = function (t) {
    for (var e = this._whtCallback.$(t).concat(), n = 0; n < e.length; n++)
      this._whtCallback.$(t).splice(n, 1), e[n]();
  }),
  (jindo.LazyLoading.abort = function (t) {
    if (this._checkIsLoading(t)) {
      var e = this.getScriptElement(t);
      return (
        (this._waLoading = this._waLoading.refuse(t)),
        "onload" in e ? (e.onload = null) : (e.onreadystatechange = null),
        jindo.$Element(e).leave(),
        this._whtScript.remove(t),
        this._whtCallback.remove(t),
        !0
      );
    }
    return !1;
  }),
  (jindo.LazyLoading._checkAlreadyLoaded = function (t) {
    return this._waLoaded.has(t);
  }),
  (jindo.LazyLoading._checkIsLoading = function (t) {
    return this._waLoading.has(t);
  }),
  (jindo.LazyLoading.getLoaded = function () {
    return this._waLoaded.$value();
  }),
  (jindo.LazyLoading.getLoading = function () {
    return this._waLoading.$value();
  }),
  (jindo.LazyLoading.getScriptElement = function (t) {
    return this._whtScript.$(t) || null;
  });
