import e from "@peter.naydenov/notice";
import t from "ask-for-promise";
//#region node_modules/@peter.naydenov/url-pattern/dist/url-pattern.es.js
var n = {
	escapeChar: "\\",
	segmentNameStartChar: ":",
	segmentNameEndChar: void 0,
	segmentNameCharset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
	segmentValueCharset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_~ %",
	optionalSegmentStartChar: "(",
	optionalSegmentEndChar: ")",
	wildcardChar: "*",
	wildcardName: "_"
}, r = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), i = (e) => {
	let t = e.replace(/\\/g, "\\\\");
	return t = t.replace(/\]/g, "\\]"), t = t.replace(/\^/g, "\\^"), t = t.replace(/-/g, "\\-"), t;
}, a = (e = {}) => ({
	...n,
	...e
}), o = (e, t, n) => {
	let r = [
		n.escapeChar,
		n.optionalSegmentStartChar,
		n.optionalSegmentEndChar,
		n.wildcardChar,
		n.segmentNameStartChar
	], i = e.length;
	for (let n = 0; n < r.length; n++) {
		let a = r[n];
		if (!a) continue;
		let o = e.indexOf(a, t);
		o !== -1 && o < i && (i = o);
	}
	return i;
}, s = (e, t) => {
	let n = [], a = 0, s = !1, c = 0, l = 0;
	for (; a < e.length;) {
		let u = e[a];
		if (u === t.escapeChar) {
			if (a + 1 >= e.length) throw Error(`Invalid pattern: '\\' at position ${a} has nothing to escape`);
			let t = e[a + 1];
			if ("^$.*+?()[]{}|\\".includes(t)) {
				n.push({
					type: "literal",
					name: t,
					regex: r(t),
					optional: s,
					optionalGroupId: s ? c : void 0
				}), a += 2;
				continue;
			} else {
				n.push({
					type: "literal",
					name: "\\",
					regex: "\\\\",
					optional: s,
					optionalGroupId: s ? c : void 0
				}), a += 1;
				continue;
			}
		}
		if (u === t.optionalSegmentStartChar) {
			s = !0, c++, l++, a++;
			continue;
		}
		if (u === t.optionalSegmentEndChar) {
			if (l === 0) throw Error(`Invalid pattern: unmatched '${u}' at position ${a}`);
			s = !1, l--, a++;
			continue;
		}
		if (u === t.wildcardChar) {
			n.push({
				type: "wildcard",
				name: t.wildcardName,
				regex: ".*",
				optional: s,
				optionalGroupId: s ? c : void 0
			}), a++;
			continue;
		}
		if (u === t.segmentNameStartChar && a + 1 < e.length) {
			let r = e.slice(a + 1), o = 0, l = t.segmentNameCharset || "", d = t.segmentNameEndChar;
			for (let e = 0; e < r.length && !(d && r[e] === d || !l.includes(r[e])); e++) o = e + 1;
			let f = r.slice(0, o), p = !!(d && r[o] === d);
			if (f.length > 0) {
				let e = `([${i(t.segmentValueCharset || "")}]+)`;
				n.push({
					type: "named",
					name: f,
					regex: e,
					optional: s,
					optionalGroupId: s ? c : void 0
				}), a += 1 + o + +!!p;
				continue;
			}
			throw Error(`Invalid pattern: '${u}' at position ${a} has no segment name`);
		}
		let d = o(e, a, t);
		if (d > a) {
			let t = e.slice(a, d);
			n.push({
				type: "literal",
				name: t,
				regex: r(t),
				optional: s,
				optionalGroupId: s ? c : void 0
			}), a = d;
			continue;
		}
		throw Error(`Invalid pattern: '${u}' at position ${a} has no segment name`);
	}
	if (l !== 0) throw Error(`Invalid pattern: unclosed '${t.optionalSegmentStartChar}'`);
	return n;
}, c = (e) => !!(e == null || e === "" || typeof e == "number" && Number.isNaN(e) || Array.isArray(e) && e.length === 0), l = (e, t) => {
	let n = "^", r = 0, i = [], a = 0;
	for (; a < e.length;) {
		let o = e[a];
		if (o.optional) {
			let s = "", c = a, l = o.optionalGroupId;
			for (; c < e.length && e[c].optional && e[c].optionalGroupId === l;) {
				let n = e[c];
				n.type === "wildcard" ? (s += "(.*)", i.push({
					name: t.wildcardName,
					index: r,
					type: "wildcard"
				}), r++) : n.type === "named" ? (s += n.regex, i.push({
					name: n.name,
					index: r,
					type: "named"
				}), r++) : s += n.regex, c++;
			}
			n += `(?:${s})?`, a = c;
			continue;
		}
		o.type === "wildcard" ? (n += "(.*)", i.push({
			name: t.wildcardName,
			index: r,
			type: "wildcard"
		}), r++) : o.type === "named" ? (n += o.regex, i.push({
			name: o.name,
			index: r,
			type: "named"
		}), r++) : n += o.regex, a++;
	}
	return n += "$", {
		regex: n,
		segmentNames: i
	};
}, u = (e, t = {}) => {
	let n = a(t), r = s(e, n), { regex: i, segmentNames: o } = l(r, n);
	return {
		regex: i,
		regexObj: new RegExp(i),
		segments: r,
		segmentNames: o,
		options: n,
		isRegex: !1,
		pattern: e
	};
}, d = (e, t = []) => {
	let r = e.flags.replace(/[gy]/g, ""), i = r === e.flags ? e : new RegExp(e.source, r);
	return {
		regex: e.source,
		regexObj: i,
		segments: [],
		segmentNames: t.map((e, t) => ({
			name: e,
			index: t,
			type: "named"
		})),
		options: n,
		isRegex: !0,
		keys: t
	};
}, f = (e, t) => {
	if (typeof t != "string") throw TypeError(`pattern.match() requires a string, got ${typeof t}`);
	let n = e.regexObj.exec(t);
	if (!n) return null;
	if (e.isRegex) {
		if (e.keys && e.keys.length > 0) {
			let t = {};
			return e.keys.forEach((e, r) => {
				let i = n[r + 1];
				i !== void 0 && (t[e] = i);
			}), t;
		}
		return n.slice(1);
	}
	let r = {}, i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
	for (let t of e.segmentNames) t.type === "wildcard" && a.add(t.name);
	for (let t = 0; t < e.segmentNames.length; t++) {
		let a = e.segmentNames[t], o = a.index + 1 in n ? n[a.index + 1] : "", s = o === void 0 ? "" : o;
		i.has(a.name) ? (Array.isArray(r[a.name]) || (r[a.name] = [r[a.name]]), r[a.name].push(s)) : (i.add(a.name), r[a.name] = s);
	}
	for (let e in r) {
		let t = r[e];
		if (Array.isArray(t)) {
			let n = t.filter((t) => t !== "" || a.has(e));
			n.length === 0 ? delete r[e] : r[e] = n;
		} else t === "" && !a.has(e) && delete r[e];
	}
	return r;
}, p = (e, t = {}) => {
	if (e.isRegex) throw Error("Cannot stringify a pattern created from regex");
	let n = "", r = 0;
	for (; r < e.segments.length;) {
		let i = e.segments[r];
		if (i.optional) {
			let a = "", o = r, s = i.optionalGroupId;
			for (; o < e.segments.length && e.segments[o].optional && e.segments[o].optionalGroupId === s;) {
				let n = e.segments[o];
				if (n.type === "literal") a += n.name;
				else if (n.type === "named") {
					let e = t[n.name];
					if (c(e)) {
						a = "";
						break;
					}
					a += Array.isArray(e) ? e.join("/") : e;
				} else if (n.type === "wildcard") {
					let n = t[e.options.wildcardName];
					if (c(n)) {
						a = "";
						break;
					}
					a += Array.isArray(n) ? n.join("/") : n;
				}
				o++;
			}
			a !== "" && (n += a), r === o ? r++ : r = o;
			continue;
		}
		if (i.type === "literal") n += i.name;
		else if (i.type === "named") {
			let e = t[i.name];
			if (c(e)) throw Error(`Missing required value for segment: ${i.name}`);
			n += Array.isArray(e) ? e.join("/") : e;
		} else if (i.type === "wildcard") {
			let r = t[e.options.wildcardName];
			if (r == null) throw Error("Missing required wildcard value");
			n += Array.isArray(r) ? r.join("/") : r;
		}
		r++;
	}
	return n;
}, m = class {
	constructor(e, t = {}) {
		if (e instanceof RegExp) {
			let n = Array.isArray(t) ? t : [];
			this.compiled = d(e, n);
		} else this.compiled = u(e, t);
		Object.freeze(this.compiled.options), Object.freeze(this.compiled);
	}
	match(e) {
		return f(this.compiled, e);
	}
	stringify(e) {
		return p(this.compiled, e);
	}
}, h = (e, t = {}) => new m(e, t);
//#endregion
//#region src/historyController.js
function g() {
	let e = null, n = null;
	function r({ state: e, title: t, url: n }, r) {
		r ? window.history.pushState(e, "", n) : window.history.replaceState(e, "", n), document.title = typeof t == "function" ? t(e.data) : t;
	}
	function i() {
		return window.location.pathname;
	}
	function a(r) {
		n = function(n) {
			let { PGID: i, url: a, data: o } = n.state;
			e ||= t(), r(e, {
				addressName: i,
				data: o,
				url: a
			}), e = null;
		}, window.addEventListener("popstate", n);
	}
	function o(n = 1) {
		return e = t().timeout(1500, "expire"), window.history.back(n), e.onComplete((t) => {
			t === "expire" && (e = null);
		}), e.promise;
	}
	function s(n = 1) {
		return e = t().timeout(1500, "expire"), window.history.go(n), e.onComplete((t) => {
			t === "expire" && (e = null);
		}), e.promise;
	}
	function c() {
		n && window.removeEventListener("popstate", n);
	}
	return {
		write: r,
		read: i,
		back: o,
		go: s,
		listen: a,
		destroy: c
	};
}
//#endregion
//#region src/methods/_historyActions.js
function _(e, t) {
	return function(n, { addressName: r, data: i, url: a }) {
		let { eBus: o, API: s } = e, c = t.lastLocation;
		s.navigate(r, i, !0), c === a ? o.emit("_RELOAD", r, i, a) : o.emit("_CHANGE", r, i, a), n.done(r, i);
	};
}
//#endregion
//#region src/methods/_locationChange.js
function v(e, t) {
	return function() {
		let { eBus: n, history: r, API: i } = e, a = !1, o = !0, s = !1, c = sessionStorage.getItem(t.SSName), l = r.read();
		if (c && c === l && (a = !0), o = t.rt.every(({ name: e, pattern: o, title: c, redirect: u, data: d = {} }) => {
			let f = o.match(l);
			return f ? u ? (i.navigate(u, d, !0), s = !0, !1) : (sessionStorage.setItem(t.SSName, l), t.lastLocation = l, t.lastAddress = e, r.write({
				state: {
					PGID: e,
					url: l,
					data: f
				},
				url: l,
				title: c
			}, !0), a ? n.emit("_RELOAD", e, f, l) : n.emit("_CHANGE", e, f, l), !1) : !0;
		}), o) {
			if (s) return;
			n.emit("_ERROR", {
				code: 404,
				message: `There is no defined address for path "${l}".`
			});
			return;
		}
		t.lastRoute = l;
	};
}
//#endregion
//#region src/methods/_setAddressRecord.js
function y(e, t) {
	return function({ name: n, path: r, title: i, inHistory: a, redirect: o, data: s }) {
		if (n == null || r == null) return null;
		i ??= t.appName, a ??= !1;
		let { UrlPattern: c } = e, l = new c(r);
		return {
			name: n,
			path: r,
			title: i,
			inHistory: a,
			pattern: l,
			redirect: o,
			data: s
		};
	};
}
//#endregion
//#region src/methods/createURL.js
function b(e, t) {
	return function(e, n = {}) {
		let { routes: r } = t;
		if (!r[e]) return console.error(`Address "${e}" is not registered`), null;
		let { pattern: i } = r[e];
		try {
			return i.stringify(n);
		} catch {
			return console.error(`Data provided for address "${e}" is not correct.`), null;
		}
	};
}
//#endregion
//#region src/methods/getCurrentAddress.js
function x(e, t) {
	return function() {
		let { lastAddress: e, lastLocation: n, routes: r } = t, { pattern: i } = e ? r[e] : { pattern: "null" }, a = i.match(n);
		return [t.lastAddress, a];
	};
}
//#endregion
//#region src/methods/destroy.js
function S(e, t) {
	return function() {
		let { eBus: n, history: r, dead: i } = e;
		t.isActive = !1, n.off(), r.destroy(), sessionStorage.removeItem(t.SSName), e.API = {
			on: i,
			navigate: i,
			destroy: i
		};
	};
}
//#endregion
//#region src/methods/listActiveAddresses.js
function C(e, t) {
	return function() {
		return t.rt.map((e) => e.name);
	};
}
//#endregion
//#region src/methods/listActiveRoutes.js
function w(e, t) {
	return function() {
		let { rt: e } = t;
		return e.map((e) => `${e.name} ---> ${e.path}`);
	};
}
//#endregion
//#region src/methods/navigate.js
function T(e, t) {
	let { history: n, eBus: r } = e;
	return function e(i, a = {}, o = !1) {
		if (!t.isActive) {
			console.error("Router is not active. Use router.run() to activate it.");
			return;
		}
		let { lastAddress: s, lastLocation: c, routes: l } = t;
		if (!l[i]) {
			console.error(`Address "${i}" is not registered`), r.emit("_ERROR", {
				code: 404,
				message: `Address "${i}" is not registered`
			});
			return;
		}
		let u = !1, { pattern: d, title: f, redirect: p, data: m } = l[i];
		if (p) {
			e(p, m);
			return;
		}
		s && (u = l[s].inHistory);
		try {
			let e = d.stringify(a);
			if (e === c) return;
			t.lastLocation = e, sessionStorage.setItem(t.SSName, e), t.lastAddress = i, o && (u = !1), n.write({
				state: {
					PGID: i,
					url: e,
					data: a
				},
				url: e,
				title: f
			}, u);
		} catch (e) {
			r.emit("_ERROR", {
				code: 400,
				message: `Data provided for address "${i}" is not correct. ${e}`
			});
			return;
		}
	};
}
//#endregion
//#region src/methods/setAddresses.js
function E(e, t) {
	return function(n, r = []) {
		let { _setAddressRecord: i } = e.inAPI;
		return n.forEach((e) => {
			let n = i(e);
			if (!n || r.includes(n.name)) return;
			let a = n.name;
			t.rt.push(n), t.routes[a] = n;
		}), e.API;
	};
}
//#endregion
//#region src/methods/removeAddresses.js
function D(e, t) {
	return function(n) {
		let { rt: r } = t;
		return t.rt = r.reduce((e, r) => {
			let { name: i } = r;
			return n.includes(i) ? (delete t.routes[i], e) : (e.push(r), e);
		}, []), e.API;
	};
}
//#endregion
//#region src/methods/run.js
function O(e, t) {
	return function() {
		let { inAPI: n, history: r } = e;
		t.isActive = !0, r.listen(n._historyActions), n._locationChange();
	};
}
//#endregion
//#region src/methods/index.js
var k = {
	_historyActions: _,
	_locationChange: v,
	_setAddressRecord: y,
	createURL: b,
	getCurrentAddress: x,
	destroy: S,
	listAciveAddresses: C,
	listActiveRoutes: w,
	navigate: T,
	removeAddresses: D,
	run: O,
	setAddresses: E
};
//#endregion
//#region src/main.js
function A(t) {
	let n = e(), r = g(), { appName: i, sessionStorageKey: a } = t || {}, o = {
		lastLocation: "",
		lastAddress: null,
		SSName: "_routeEmmiterLastLocation",
		appName: "App Name",
		rt: [],
		routes: {},
		isActive: !1
	}, s = {
		UrlPattern: h,
		eBus: n,
		history: r,
		dead: () => console.error("Router was destroyed")
	}, c = {}, l = {};
	return i && typeof i == "string" && (o.appName = i), a && typeof a == "string" && (o.SSName = a), Object.entries(k).forEach(([e, t]) => {
		e.startsWith("_") ? l[e] = t(s, o) : c[e] = t(s, o);
	}), s.inAPI = l, s.API = {
		onChange: (e) => (n.on("_CHANGE", e), s.API),
		onError: (e) => (n.on("_ERROR", e), s.API),
		onReload: (e) => (n.on("_RELOAD", e), s.API),
		back: (e) => r.back(e),
		forward: (e) => r.go(e),
		...c
	}, s.API;
}
//#endregion
export { A as default };
