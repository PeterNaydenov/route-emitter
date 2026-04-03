import e from "@peter.naydenov/notice";
import t from "url-pattern";
import n from "ask-for-promise";
//#region src/historyController.js
function r() {
	let e = null;
	function t({ state: e, title: t, url: n }, r) {
		r ? window.history.pushState(e, "", n) : window.history.replaceState(e, "", n), document.title = typeof t == "function" ? t(e.data) : t;
	}
	function r() {
		return window.location.pathname;
	}
	function i(t) {
		onpopstate = function(r) {
			let { PGID: i, url: a, data: o } = r.state;
			e ||= n(), t(e, {
				addressName: i,
				data: o,
				url: a
			}), e = null;
		};
	}
	function a(t = 1) {
		return e = n().timeout(1500, "expire"), window.history.back(t), e.onComplete((t) => {
			t === "expire" && (e = null);
		}), e.promise;
	}
	function o(t = 1) {
		return e = n().timeout(1500, "expire"), window.history.go(t), e.onComplete((t) => {
			t === "expire" && (e = null);
		}), e.promise;
	}
	function s() {
		window.onpopstate = null;
	}
	return {
		write: t,
		read: r,
		back: a,
		go: o,
		listen: i,
		destroy: s
	};
}
//#endregion
//#region src/methods/_historyActions.js
function i(e, t) {
	return function(n, { addressName: r, data: i, url: a }) {
		let { eBus: o, API: s } = e, c = t.lastLocation;
		s.navigate(r, i, !0), c === a ? o.emit("_RELOAD", r, i, a) : o.emit("_CHANGE", r, i, a), n.done(r, i);
	};
}
//#endregion
//#region src/methods/_locationChange.js
function a(e, t) {
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
function o(e, t) {
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
function s(e, t) {
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
function c(e, t) {
	return function() {
		let { lastAddress: e, lastLocation: n, routes: r } = t, { pattern: i } = e ? r[e] : { pattern: "null" }, a = i.match(n);
		return [t.lastAddress, a];
	};
}
//#endregion
//#region src/methods/destroy.js
function l(e, t) {
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
function u(e, t) {
	return function() {
		return t.rt.map((e) => e.name);
	};
}
//#endregion
//#region src/methods/listActiveRoutes.js
function d(e, t) {
	return function() {
		let { rt: e } = t;
		return e.map((e) => `${e.name} ---> ${e.path}`);
	};
}
//#endregion
//#region src/methods/navigate.js
function f(e, t) {
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
function p(e, t) {
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
function m(e, t) {
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
function h(e, t) {
	return function() {
		let { inAPI: n, history: r } = e;
		t.isActive = !0, r.listen(n._historyActions), n._locationChange();
	};
}
//#endregion
//#region src/methods/index.js
var g = {
	_historyActions: i,
	_locationChange: a,
	_setAddressRecord: o,
	createURL: s,
	getCurrentAddress: c,
	destroy: l,
	listAciveAddresses: u,
	listActiveRoutes: d,
	navigate: f,
	removeAddresses: m,
	run: h,
	setAddresses: p
};
//#endregion
//#region src/main.js
function _(n) {
	let i = e(), a = r(), { appName: o, sessionStorageKey: s } = n || {}, c = {
		lastLocation: "",
		lastAddress: null,
		SSName: "_routeEmmiterLastLocation",
		appName: "App Name",
		rt: [],
		routes: {},
		isActive: !1
	}, l = {
		UrlPattern: t,
		eBus: i,
		history: a,
		dead: () => console.error("Router was destroyed")
	}, u = {}, d = {};
	return o && typeof o == "string" && (c.appName = o), s && typeof s == "string" && (c.SSName = s), Object.entries(g).forEach(([e, t]) => {
		e.startsWith("_") ? d[e] = t(l, c) : u[e] = t(l, c);
	}), l.inAPI = d, l.API = {
		onChange: (e) => (i.on("_CHANGE", e), l.API),
		onError: (e) => (i.on("_ERROR", e), l.API),
		onReload: (e) => (i.on("_RELOAD", e), l.API),
		back: (e) => a.back(e),
		forward: (e) => a.go(e),
		...u
	}, l.API;
}
//#endregion
export { _ as default };
