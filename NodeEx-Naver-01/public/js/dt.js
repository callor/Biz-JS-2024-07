/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr				|
|                                                   |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
| Updated: 2024-11-29 by Callor						|
|		Code Refactoring							|
|		ECMA 5+										|
|		function Prototype => class method 			|
|--------------------------------------------------*/

const dtree_root = "/static/dtree/";

// Node object
class Node {
  constructor(id, pid, name, url, title, target, icon, iconOpen, open) {
    this.id = id;
    this.pid = pid;
    this.name = name;
    this.url = url;
    this.title = title;
    this.target = target;
    this.icon = icon;
    this.iconOpen = iconOpen;
    this.open = open;
  }
  id;
  pid;
  name;
  url;
  title;
  target;
  icon;
  iconOpen;
  open;
  _io = this.open || false;
  _is = false;
  _ls = false;
  _hc = false;
  _ai = 0;
  _p;
}

// Tree object
class dTree {
  constructor(objName) {
    this.obj = objName;
  }
  obj;
  aNodes = [];
  aIndent = [];
  root = new Node(-1);
  selectedNode = null;
  selectedFound = false;
  completed = false;

  config = {
    target: null,
    folderLinks: true,
    useSelection: true,
    useCookies: true,
    useLines: true,
    useIcons: true,
    useStatusText: false,
    closeSameLevel: false,
    inOrder: false,
  };
  icon = {
    root: dtree_root + "img/base.gif",
    folder: dtree_root + "img/folder.gif",
    folderOpen: dtree_root + "img/folderopen.gif",
    node: dtree_root + "img/page.gif",
    empty: dtree_root + "img/empty.gif",
    line: dtree_root + "img/line.gif",
    join: dtree_root + "img/join.gif",
    joinBottom: dtree_root + "img/joinbottom.gif",
    plus: dtree_root + "img/plus.gif",
    plusBottom: dtree_root + "img/plusbottom.gif",
    minus: dtree_root + "img/minus.gif",
    minusBottom: dtree_root + "img/minusbottom.gif",
    nlPlus: dtree_root + "img/nolines_plus.gif",
    nlMinus: dtree_root + "img/nolines_minus.gif",
  };

  add = (id, pid, name, url, title, target, icon, iconOpen, open) => {
    this.aNodes[this.aNodes.length] = new Node(
      id,
      pid,
      name,
      url,
      title,
      target,
      icon,
      iconOpen,
      open
    );
  };

  // Outputs the tree to the page
  toString = () => {
    let str = '<div class="dtree">\n';
    str +=
      '<div style="text-align:center;margin:5px;"><button type="button" onclick="d.openAll();">Open All</button> <button type="button" onclick="d.closeAll();">Close All</button></div>\n';
    if (document.getElementById) {
      if (this.config.useCookies) this.selectedNode = this.getSelected();
      str += this.addNode(this.root);
    } else str += "Browser not supported.";
    str += "</div>";
    if (!this.selectedFound) this.selectedNode = null;
    this.completed = true;
    return str;
  };

  // Creates the tree structure
  addNode = (pNode) => {
    let str = "";
    let index = 0;

    if (this.config.inOrder) index = pNode._ai;
    for (index; index < this.aNodes.length; index++) {
      if (this.aNodes[index].pid === pNode.id) {
        let currentNode = this.aNodes[index];
        currentNode._p = pNode;
        currentNode._ai = index;
        this.setCS(currentNode);
        if (!currentNode.target && this.config.target) currentNode.target = this.config.target;
        if (currentNode._hc && !currentNode._io && this.config.useCookies)
          currentNode._io = this.isOpen(currentNode.id);
        if (!this.config.folderLinks && currentNode._hc) currentNode.url = null;
        if (
          this.config.useSelection &&
          currentNode.id === this.selectedNode &&
          !this.selectedFound
        ) {
          currentNode._is = true;
          this.selectedNode = index;
          this.selectedFound = true;
        }
        str += this.createNode(currentNode, index);
        if (currentNode._ls) break;
      }
    }
    return str;
  };

  // Creates the node icon, url and text
  createNode = (node, nodeId) => {
    let str = `<div class="dTreeNode">${this.indent(node, nodeId)}`;
    if (this.config.useIcons) {
      if (!node.icon)
        node.icon =
          this.root.id === node.pid ? this.icon.root : node._hc ? this.icon.folder : this.icon.node;
      if (!node.iconOpen) node.iconOpen = node._hc ? this.icon.folderOpen : this.icon.node;
      if (this.root.id === node.pid) {
        node.icon = this.icon.root;
        node.iconOpen = this.icon.root;
      }
      str += `<img id="i${this.obj}${nodeId}" src="${node._io ? node.iconOpen : node.icon}" alt="${
        node._io
      }" />`;
    }
    if (node.url) {
      str += `<a id="s${this.obj}${nodeId}" class="${
        this.config.useSelection ? (node._is ? "nodeSel" : "node") : "node"
      }" href="${node.url}" `;
      if (node.title) str += ` title=${node.title}`;
      if (node.target) str += ` target=${node.target}`;
      if (this.config.useStatusText)
        str += ` onmouseover="window.status=${node.name};return true"; onmouseout="window.status=;return true;" `;
      if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
        str += ` onclick="javascript: ${this.obj}.o('${nodeId}');"`;
      str += ">";
    } else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid !== this.root.id)
      str += `<a href="javascript: ${this.obj}.o('${nodeId}');" class="node">`;
    str += node.name;
    if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += "</a>";
    str += "</div>";
    if (node._hc) {
      str += `<div id="d${this.obj}${nodeId}" class="clip" style="display:${
        this.root.id === node.pid || node._io ? "block" : "none"
      };">`;
      str += this.addNode(node);
      str += "</div>";
    }
    this.aIndent.pop();
    return str;
  };

  // Adds the empty and line icons
  indent = (node, nodeId) => {
    let str = "";
    if (this.root.id !== node.pid) {
      for (let n = 0; n < this.aIndent.length; n++)
        str += `<img src="${
          this.aIndent[n] === 1 && this.config.useLines ? this.icon.line : this.icon.empty
        }" alt="" />`;
      node._ls ? this.aIndent.push(0) : this.aIndent.push(1);
      if (node._hc) {
        str += `<a href="javascript: ${this.obj}.o('${nodeId}');"><img id="j${this.obj}${nodeId}" alt="plus" src="`;
        if (!this.config.useLines) str += node._io ? this.icon.nlMinus : this.icon.nlPlus;
        else
          str += node._io
            ? node._ls && this.config.useLines
              ? this.icon.minusBottom
              : this.icon.minus
            : node._ls && this.config.useLines
            ? this.icon.plusBottom
            : this.icon.plus;
        str += `" /></a>`;
      } else
        str += `<img src="${
          this.config.useLines
            ? node._ls
              ? this.icon.joinBottom
              : this.icon.join
            : this.icon.empty
        }" alt="" />`;
    }
    return str;
  };

  // 노드에 자식이 있는지, 마지막 형제인지 확인합니다.
  setCS = (node) => {
    let lastId;
    for (let index = 0; index < this.aNodes.length; index++) {
      // 자식 노드가 있나?
      if (this.aNodes[index].pid === node.id) node._hc = true;
      if (this.aNodes[index].pid === node.pid) lastId = this.aNodes[index].id;
    }
    // lastSibling
    if (lastId === node.id) node._ls = true;
  };

  // Returns the selected node
  getSelected = () => {
    let sn = this.getCookie("cs" + this.obj);
    return sn ? sn : null;
  };

  // Highlights the selected node
  s = (id) => {
    if (!this.config.useSelection) return;
    const cn = this.aNodes[id];
    if (cn._hc && !this.config.folderLinks) return;
    if (this.selectedNode !== id) {
      if (this.selectedNode || this.selectedNode === 0) {
        const eOld = document.getElementById("s" + this.obj + this.selectedNode);
        eOld.className = "node";
      }
      const eNew = document.getElementById("s" + this.obj + id);
      eNew.className = "nodeSel";
      this.selectedNode = id;
      if (this.config.useCookies) this.setCookie("cs" + this.obj, cn.id);
    }
  };

  // Toggle Open or close
  o = (id) => {
    const cn = this.aNodes[id];
    this.nodeStatus(!cn._io, id, cn._ls);
    cn._io = !cn._io;
    if (this.config.closeSameLevel) this.closeLevel(cn);
    if (this.config.useCookies) this.updateCookie();
  };

  // Opens the tree to a specific node
  openTo = (nId, bSelect, bFirst) => {
    if (!bFirst) {
      for (let n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].id === nId) {
          nId = n;
          break;
        }
      }
    }
    let cn = this.aNodes[nId];
    if (cn.pid === this.root.id || !cn._p) return;
    cn._io = true;
    cn._is = bSelect;
    if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
    if (this.completed && bSelect) this.s(cn._ai);
    else if (bSelect) this._sn = cn._ai;
    this.openTo(cn._p._ai, false, true);
  };

  // Closes all nodes on the same level as certain node
  closeLevel = (node) => {
    for (let n = 0; n < this.aNodes.length; n++) {
      if (this.aNodes[n].pid === node.pid && this.aNodes[n].id !== node.id && this.aNodes[n]._hc) {
        this.nodeStatus(false, n, this.aNodes[n]._ls);
        this.aNodes[n]._io = false;
        this.closeAllChildren(this.aNodes[n]);
      }
    }
  };

  // Closes all children of a node
  closeAllChildren = (node) => {
    for (let n = 0; n < this.aNodes.length; n++) {
      if (this.aNodes[n].pid === node.id && this.aNodes[n]._hc) {
        if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
        this.aNodes[n]._io = false;
        this.closeAllChildren(this.aNodes[n]);
      }
    }
  };

  // Change the status of a node(open or closed)
  nodeStatus = (status, id, bottom) => {
    const eDiv = document.getElementById(`d${this.obj}${id}`);
    const eJoin = document.getElementById(`j${this.obj}${id}`);
    if (this.config.useIcons) {
      const eIcon = document.getElementById(`i${this.obj}${id}`);
      eIcon.src = status ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
    }
    if (eJoin) {
      eJoin.src = this.config.useLines
        ? status
          ? bottom
            ? this.icon.minusBottom
            : this.icon.minus
          : bottom
          ? this.icon.plusBottom
          : this.icon.plus
        : status
        ? this.icon.nlMinus
        : this.icon.nlPlus;
    }
    if (eDiv) eDiv.style.display = status ? "block" : "none";
  };

  // [Cookie] Clears a cookie
  clearCookie = () => {
    let now = new Date();
    let yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
    this.setCookie("co" + this.obj, "cookieValue", yesterday);
    this.setCookie("cs" + this.obj, "cookieValue", yesterday);
  };

  // [Cookie] Sets value in a cookie
  setCookie = (cookieName, cookieValue, expires, path, domain, secure) => {
    document.cookie =
      encodeURI(cookieName) +
      "=" +
      encodeURI(cookieValue) +
      (expires ? "; expires=" + expires.toUTCString() : "") +
      (path ? "; path=" + path : "") +
      (domain ? "; domain=" + domain : "") +
      (secure ? "; secure" : "");
  };

  // [Cookie] Gets a value from a cookie
  getCookie = (cookieName) => {
    let cookieValue = "";
    let posName = document.cookie.indexOf(encodeURI(cookieName) + "=");
    if (posName !== -1) {
      let posValue = posName + (encodeURI(cookieName) + "=").length;
      let endPos = document.cookie.indexOf(";", posValue);
      if (endPos !== -1) cookieValue = decodeURI(document.cookie.substring(posValue, endPos));
      else cookieValue = decodeURI(document.cookie.substring(posValue));
    }
    return cookieValue;
  };

  // [Cookie] Returns ids of open nodes as a string
  updateCookie = () => {
    let str = "";
    for (let n = 0; n < this.aNodes.length; n++) {
      if (this.aNodes[n]._io && this.aNodes[n].pid !== this.root.id) {
        if (str) str += ".";
        str += this.aNodes[n].id;
      }
    }
    this.setCookie(`co${this.obj}`, str);
  };

  // [Cookie] Checks if a node id is in a cookie
  isOpen = (id) => {
    let aOpen = this.getCookie(`co${this.obj}`).split(".");
    for (let index = 0; index < aOpen.length; index++) {
      if (Number(aOpen[index]) === id) return true;
    }
    return false;
  };

  // Open or close all nodes
  oAll = (status) => {
    for (let n = 0; n < this.aNodes.length; n++) {
      if (this.aNodes[n]._hc && this.aNodes[n].pid !== this.root.id) {
        this.nodeStatus(status, n, this.aNodes[n]._ls);
        this.aNodes[n]._io = status;
      }
    }
    if (this.config.useCookies) this.updateCookie();
  };

  openAll = () => {
    this.oAll(true);
  };
  closeAll = () => {
    this.oAll(false);
  };
}

// Adds a new node to the node array
// dTree.add = function(id, pid, name, url, title, target, icon, iconOpen, open) {
// 	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
// };

// Open/close all nodes

// If Push and pop is not implemented by the browser
// if (!Array.prototype.push) {
// 	Array.prototype.push = function array_push() {
// 		for(let i=0;i<arguments.length;i++)
// 			this[this.length]=arguments[i];
// 		return this.length;
// 	}
// }
//
// if (!Array.prototype.pop) {
// 	Array.prototype.pop = function array_pop() {
// 		const lastElement = this[this.length-1];
// 		this.length = Math.max(this.length-1,0);
// 		return lastElement;
// 	}
// }
