!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof module&&module.exports?module.exports=e():t.Colcade=e()}(window,function(){function t(t,e){if(t=s(t),t&&t.colcadeGUID){var i=a[t.colcadeGUID];return i.option(e),i}this.element=t,this.options={},this.option(e),this.create()}function e(e){var i=e.getAttribute("data-colcade"),n=i.split(","),o={};n.forEach(function(t){var e=t.split(":"),i=e[0].trim(),n=e[1].trim();o[i]=n}),new t(e,o)}function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e){e=e||document;var i=e.querySelectorAll(t);return n(i)}function s(t){return"string"==typeof t&&(t=document.querySelector(t)),t}function u(t){return"complete"==document.readyState?void t():void document.addEventListener("DOMContentLoaded",t)}var r=t.prototype;r.option=function(t){this.options=i(this.options,t)};var h=0,a={};return r.create=function(){this.errorCheck();var t=this.guid=++h;this.element.colcadeGUID=t,a[t]=this,this.reload(),this._windowResizeHandler=this.onWindowResize.bind(this),this._loadHandler=this.onLoad.bind(this),window.addEventListener("resize",this._windowResizeHandler),this.element.addEventListener("load",this._loadHandler,!0)},r.errorCheck=function(){var t=[];if(this.element||t.push("Bad element: "+this.element),this.options.columns||t.push("columns option required: "+this.options.columns),this.options.items||t.push("items option required: "+this.options.items),t.length)throw new Error("[Colcade error] "+t.join(". "))},r.reload=function(){this.updateColumns(),this.updateItems(),this.layout()},r.updateColumns=function(){this.columns=o(this.options.columns,this.element)},r.updateItems=function(){this.items=o(this.options.items,this.element)},r.getActiveColumns=function(){return this.columns.filter(function(t){var e=getComputedStyle(t);return"none"!=e.display})},r.layout=function(){this.activeColumns=this.getActiveColumns(),this._layout()},r._layout=function(){this.columnHeights=this.activeColumns.map(function(){return 0}),this.layoutItems(this.items)},r.layoutItems=function(t){t.forEach(this.layoutItem,this)},r.layoutItem=function(t){var e=Math.min.apply(Math,this.columnHeights),i=this.columnHeights.indexOf(e);this.activeColumns[i].appendChild(t),this.columnHeights[i]+=t.offsetHeight||1},r.append=function(t){var e=this.getQueryItems(t);this.items=this.items.concat(e),this.layoutItems(e)},r.prepend=function(t){var e=this.getQueryItems(t);this.items=e.concat(this.items),this._layout()},r.getQueryItems=function(t){t=n(t);var e=document.createDocumentFragment();return t.forEach(function(t){e.appendChild(t)}),o(this.options.items,e)},r.measureColumnHeight=function(t){var e=this.element.getBoundingClientRect();this.activeColumns.forEach(function(i,n){if(!t||i.contains(t)){var o=i.lastElementChild.getBoundingClientRect();this.columnHeights[n]=o.bottom-e.top}},this)},r.onWindowResize=function(){clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){this.onDebouncedResize()}.bind(this),100)},r.onDebouncedResize=function(){var t=this.getActiveColumns(),e=t.length==this.activeColumns.length,i=!0;this.activeColumns.forEach(function(e,n){i=i&&e==t[n]}),e&&i||(this.activeColumns=t,this._layout())},r.onLoad=function(t){this.measureColumnHeight(t.target)},r.destroy=function(){this.items.forEach(function(t){this.element.appendChild(t)},this),window.removeEventListener("resize",this._windowResizeHandler),this.element.removeEventListener("load",this._loadHandler,!0),delete this.element.colcadeGUID,delete a[this.guid]},u(function(){var t=o("[data-colcade]");t.forEach(e)}),t.data=function(t){t=s(t);var e=t&&t.colcadeGUID;return e&&a[e]},t});