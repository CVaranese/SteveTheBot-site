"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/picocolors/picocolors.browser.js
  var require_picocolors_browser = __commonJS({
    "node_modules/picocolors/picocolors.browser.js"(exports, module) {
      var x = String;
      var create = function() {
        return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x, blackBright: x, redBright: x, greenBright: x, yellowBright: x, blueBright: x, magentaBright: x, cyanBright: x, whiteBright: x, bgBlackBright: x, bgRedBright: x, bgGreenBright: x, bgYellowBright: x, bgBlueBright: x, bgMagentaBright: x, bgCyanBright: x, bgWhiteBright: x };
      };
      module.exports = create();
      module.exports.createColors = create;
    }
  });

  // node_modules/tailwindcss/lib/util/log.js
  var require_log = __commonJS({
    "node_modules/tailwindcss/lib/util/log.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        dim: function() {
          return dim;
        },
        default: function() {
          return _default;
        }
      });
      var _picocolors = /* @__PURE__ */ _interop_require_default(require_picocolors_browser());
      function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      var alreadyShown = /* @__PURE__ */ new Set();
      function log(type, messages, key) {
        if (typeof process !== "undefined" && process.env.JEST_WORKER_ID) return;
        if (key && alreadyShown.has(key)) return;
        if (key) alreadyShown.add(key);
        console.warn("");
        messages.forEach((message) => console.warn(type, "-", message));
      }
      function dim(input) {
        return _picocolors.default.dim(input);
      }
      var _default = {
        info(key, messages) {
          log(_picocolors.default.bold(_picocolors.default.cyan("info")), ...Array.isArray(key) ? [
            key
          ] : [
            messages,
            key
          ]);
        },
        warn(key, messages) {
          log(_picocolors.default.bold(_picocolors.default.yellow("warn")), ...Array.isArray(key) ? [
            key
          ] : [
            messages,
            key
          ]);
        },
        risk(key, messages) {
          log(_picocolors.default.bold(_picocolors.default.magenta("risk")), ...Array.isArray(key) ? [
            key
          ] : [
            messages,
            key
          ]);
        }
      };
    }
  });

  // node_modules/tailwindcss/lib/public/colors.js
  var require_colors = __commonJS({
    "node_modules/tailwindcss/lib/public/colors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "default", {
        enumerable: true,
        get: function() {
          return _default;
        }
      });
      var _log = /* @__PURE__ */ _interop_require_default(require_log());
      function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function warn({ version, from, to }) {
        _log.default.warn(`${from}-color-renamed`, [
          `As of Tailwind CSS ${version}, \`${from}\` has been renamed to \`${to}\`.`,
          "Update your configuration file to silence this warning."
        ]);
      }
      var _default = {
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617"
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712"
        },
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b"
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a"
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09"
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a"
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407"
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03"
        },
        yellow: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006"
        },
        lime: {
          50: "#f7fee7",
          100: "#ecfccb",
          200: "#d9f99d",
          300: "#bef264",
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
          700: "#4d7c0f",
          800: "#3f6212",
          900: "#365314",
          950: "#1a2e05"
        },
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16"
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22"
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e"
        },
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344"
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49"
        },
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554"
        },
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b"
        },
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065"
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764"
        },
        fuchsia: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e"
        },
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724"
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519"
        },
        get lightBlue() {
          warn({
            version: "v2.2",
            from: "lightBlue",
            to: "sky"
          });
          return this.sky;
        },
        get warmGray() {
          warn({
            version: "v3.0",
            from: "warmGray",
            to: "stone"
          });
          return this.stone;
        },
        get trueGray() {
          warn({
            version: "v3.0",
            from: "trueGray",
            to: "neutral"
          });
          return this.neutral;
        },
        get coolGray() {
          warn({
            version: "v3.0",
            from: "coolGray",
            to: "gray"
          });
          return this.gray;
        },
        get blueGray() {
          warn({
            version: "v3.0",
            from: "blueGray",
            to: "slate"
          });
          return this.slate;
        }
      };
    }
  });

  // node_modules/tailwindcss/colors.js
  var require_colors2 = __commonJS({
    "node_modules/tailwindcss/colors.js"(exports, module) {
      var colors3 = require_colors();
      module.exports = (colors3.__esModule ? colors3 : { default: colors3 }).default;
    }
  });

  // node_modules/solid-js/dist/solid.js
  var sharedConfig = {
    context: void 0,
    registry: void 0,
    effects: void 0,
    done: false,
    getContextId() {
      return getContextId(this.context.count);
    },
    getNextContextId() {
      return getContextId(this.context.count++);
    }
  };
  function getContextId(count) {
    const num = String(count), len = num.length - 1;
    return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
  }
  function setHydrateContext(context) {
    sharedConfig.context = context;
  }
  function nextHydrateContext() {
    return {
      ...sharedConfig.context,
      id: sharedConfig.getNextContextId(),
      count: 0
    };
  }
  var IS_DEV = false;
  var equalFn = (a, b) => a === b;
  var $PROXY = Symbol("solid-proxy");
  var $TRACK = Symbol("solid-track");
  var $DEVCOMP = Symbol("solid-dev-component");
  var signalOptions = {
    equals: equalFn
  };
  var ERROR = null;
  var runEffects = runQueue;
  var STALE = 1;
  var PENDING = 2;
  var UNOWNED = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
  };
  var NO_INIT = {};
  var Owner = null;
  var Transition = null;
  var Scheduler = null;
  var ExternalSourceConfig = null;
  var Listener = null;
  var Updates = null;
  var Effects = null;
  var ExecCount = 0;
  function createRoot(fn, detachedOwner) {
    const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === void 0 ? owner : detachedOwner, root = unowned ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: current ? current.context : null,
      owner: current
    }, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
    Owner = root;
    Listener = null;
    try {
      return runUpdates(updateFn, true);
    } finally {
      Listener = listener;
      Owner = owner;
    }
  }
  function createSignal(value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const s2 = {
      value,
      observers: null,
      observerSlots: null,
      comparator: options.equals || void 0
    };
    const setter = (value2) => {
      if (typeof value2 === "function") {
        if (Transition && Transition.running && Transition.sources.has(s2)) value2 = value2(s2.tValue);
        else value2 = value2(s2.value);
      }
      return writeSignal(s2, value2);
    };
    return [readSignal.bind(s2), setter];
  }
  function createComputed(fn, value, options) {
    const c = createComputation(fn, value, true, STALE);
    if (Scheduler && Transition && Transition.running) Updates.push(c);
    else updateComputation(c);
  }
  function createRenderEffect(fn, value, options) {
    const c = createComputation(fn, value, false, STALE);
    if (Scheduler && Transition && Transition.running) Updates.push(c);
    else updateComputation(c);
  }
  function createEffect(fn, value, options) {
    runEffects = runUserEffects;
    const c = createComputation(fn, value, false, STALE), s2 = SuspenseContext && useContext(SuspenseContext);
    if (s2) c.suspense = s2;
    if (!options || !options.render) c.user = true;
    Effects ? Effects.push(c) : updateComputation(c);
  }
  function createMemo(fn, value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const c = createComputation(fn, value, true, 0);
    c.observers = null;
    c.observerSlots = null;
    c.comparator = options.equals || void 0;
    if (Scheduler && Transition && Transition.running) {
      c.tState = STALE;
      Updates.push(c);
    } else updateComputation(c);
    return readSignal.bind(c);
  }
  function isPromise(v) {
    return v && typeof v === "object" && "then" in v;
  }
  function createResource(pSource, pFetcher, pOptions) {
    let source;
    let fetcher;
    let options;
    if (typeof pFetcher === "function") {
      source = pSource;
      fetcher = pFetcher;
      options = pOptions || {};
    } else {
      source = true;
      fetcher = pSource;
      options = pFetcher || {};
    }
    let pr = null, initP = NO_INIT, id = null, loadedUnderTransition = false, scheduled = false, resolved = "initialValue" in options, dynamic = typeof source === "function" && createMemo(source);
    const contexts = /* @__PURE__ */ new Set(), [value, setValue] = (options.storage || createSignal)(options.initialValue), [error, setError] = createSignal(void 0), [track, trigger] = createSignal(void 0, {
      equals: false
    }), [state, setState] = createSignal(resolved ? "ready" : "unresolved");
    if (sharedConfig.context) {
      id = sharedConfig.getNextContextId();
      if (options.ssrLoadFrom === "initial") initP = options.initialValue;
      else if (sharedConfig.load && sharedConfig.has(id)) initP = sharedConfig.load(id);
    }
    function loadEnd(p, v, error2, key) {
      if (pr === p) {
        pr = null;
        key !== void 0 && (resolved = true);
        if ((p === initP || v === initP) && options.onHydrated)
          queueMicrotask(
            () => options.onHydrated(key, {
              value: v
            })
          );
        initP = NO_INIT;
        if (Transition && p && loadedUnderTransition) {
          Transition.promises.delete(p);
          loadedUnderTransition = false;
          runUpdates(() => {
            Transition.running = true;
            completeLoad(v, error2);
          }, false);
        } else completeLoad(v, error2);
      }
      return v;
    }
    function completeLoad(v, err2) {
      runUpdates(() => {
        if (err2 === void 0) setValue(() => v);
        setState(err2 !== void 0 ? "errored" : resolved ? "ready" : "unresolved");
        setError(err2);
        for (const c of contexts.keys()) c.decrement();
        contexts.clear();
      }, false);
    }
    function read() {
      const c = SuspenseContext && useContext(SuspenseContext), v = value(), err2 = error();
      if (err2 !== void 0 && !pr) throw err2;
      if (Listener && !Listener.user && c) {
        createComputed(() => {
          track();
          if (pr) {
            if (c.resolved && Transition && loadedUnderTransition) Transition.promises.add(pr);
            else if (!contexts.has(c)) {
              c.increment();
              contexts.add(c);
            }
          }
        });
      }
      return v;
    }
    function load2(refetching = true) {
      if (refetching !== false && scheduled) return;
      scheduled = false;
      const lookup = dynamic ? dynamic() : source;
      loadedUnderTransition = Transition && Transition.running;
      if (lookup == null || lookup === false) {
        loadEnd(pr, untrack(value));
        return;
      }
      if (Transition && pr) Transition.promises.delete(pr);
      const p = initP !== NO_INIT ? initP : untrack(
        () => fetcher(lookup, {
          value: value(),
          refetching
        })
      );
      if (!isPromise(p)) {
        loadEnd(pr, p, void 0, lookup);
        return p;
      }
      pr = p;
      if ("value" in p) {
        if (p.status === "success") loadEnd(pr, p.value, void 0, lookup);
        else loadEnd(pr, void 0, castError(p.value), lookup);
        return p;
      }
      scheduled = true;
      queueMicrotask(() => scheduled = false);
      runUpdates(() => {
        setState(resolved ? "refreshing" : "pending");
        trigger();
      }, false);
      return p.then(
        (v) => loadEnd(p, v, void 0, lookup),
        (e) => loadEnd(p, void 0, castError(e), lookup)
      );
    }
    Object.defineProperties(read, {
      state: {
        get: () => state()
      },
      error: {
        get: () => error()
      },
      loading: {
        get() {
          const s2 = state();
          return s2 === "pending" || s2 === "refreshing";
        }
      },
      latest: {
        get() {
          if (!resolved) return read();
          const err2 = error();
          if (err2 && !pr) throw err2;
          return value();
        }
      }
    });
    if (dynamic) createComputed(() => load2(false));
    else load2(false);
    return [
      read,
      {
        refetch: load2,
        mutate: setValue
      }
    ];
  }
  function batch(fn) {
    return runUpdates(fn, false);
  }
  function untrack(fn) {
    if (!ExternalSourceConfig && Listener === null) return fn();
    const listener = Listener;
    Listener = null;
    try {
      if (ExternalSourceConfig) return ExternalSourceConfig.untrack(fn);
      return fn();
    } finally {
      Listener = listener;
    }
  }
  function onMount(fn) {
    createEffect(() => untrack(fn));
  }
  function onCleanup(fn) {
    if (Owner === null) ;
    else if (Owner.cleanups === null) Owner.cleanups = [fn];
    else Owner.cleanups.push(fn);
    return fn;
  }
  function getListener() {
    return Listener;
  }
  function startTransition(fn) {
    if (Transition && Transition.running) {
      fn();
      return Transition.done;
    }
    const l = Listener;
    const o = Owner;
    return Promise.resolve().then(() => {
      Listener = l;
      Owner = o;
      let t;
      if (Scheduler || SuspenseContext) {
        t = Transition || (Transition = {
          sources: /* @__PURE__ */ new Set(),
          effects: [],
          promises: /* @__PURE__ */ new Set(),
          disposed: /* @__PURE__ */ new Set(),
          queue: /* @__PURE__ */ new Set(),
          running: true
        });
        t.done || (t.done = new Promise((res) => t.resolve = res));
        t.running = true;
      }
      runUpdates(fn, false);
      Listener = Owner = null;
      return t ? t.done : void 0;
    });
  }
  var [transPending, setTransPending] = /* @__PURE__ */ createSignal(false);
  function useContext(context) {
    let value;
    return Owner && Owner.context && (value = Owner.context[context.id]) !== void 0 ? value : context.defaultValue;
  }
  function children(fn) {
    const children2 = createMemo(fn);
    const memo = createMemo(() => resolveChildren(children2()));
    memo.toArray = () => {
      const c = memo();
      return Array.isArray(c) ? c : c != null ? [c] : [];
    };
    return memo;
  }
  var SuspenseContext;
  function readSignal() {
    const runningTransition = Transition && Transition.running;
    if (this.sources && (runningTransition ? this.tState : this.state)) {
      if ((runningTransition ? this.tState : this.state) === STALE) updateComputation(this);
      else {
        const updates = Updates;
        Updates = null;
        runUpdates(() => lookUpstream(this), false);
        Updates = updates;
      }
    }
    if (Listener) {
      const sSlot = this.observers ? this.observers.length : 0;
      if (!Listener.sources) {
        Listener.sources = [this];
        Listener.sourceSlots = [sSlot];
      } else {
        Listener.sources.push(this);
        Listener.sourceSlots.push(sSlot);
      }
      if (!this.observers) {
        this.observers = [Listener];
        this.observerSlots = [Listener.sources.length - 1];
      } else {
        this.observers.push(Listener);
        this.observerSlots.push(Listener.sources.length - 1);
      }
    }
    if (runningTransition && Transition.sources.has(this)) return this.tValue;
    return this.value;
  }
  function writeSignal(node, value, isComp) {
    let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
    if (!node.comparator || !node.comparator(current, value)) {
      if (Transition) {
        const TransitionRunning = Transition.running;
        if (TransitionRunning || !isComp && Transition.sources.has(node)) {
          Transition.sources.add(node);
          node.tValue = value;
        }
        if (!TransitionRunning) node.value = value;
      } else node.value = value;
      if (node.observers && node.observers.length) {
        runUpdates(() => {
          for (let i = 0; i < node.observers.length; i += 1) {
            const o = node.observers[i];
            const TransitionRunning = Transition && Transition.running;
            if (TransitionRunning && Transition.disposed.has(o)) continue;
            if (TransitionRunning ? !o.tState : !o.state) {
              if (o.pure) Updates.push(o);
              else Effects.push(o);
              if (o.observers) markDownstream(o);
            }
            if (!TransitionRunning) o.state = STALE;
            else o.tState = STALE;
          }
          if (Updates.length > 1e6) {
            Updates = [];
            if (IS_DEV) ;
            throw new Error();
          }
        }, false);
      }
    }
    return value;
  }
  function updateComputation(node) {
    if (!node.fn) return;
    cleanNode(node);
    const time = ExecCount;
    runComputation(
      node,
      Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value,
      time
    );
    if (Transition && !Transition.running && Transition.sources.has(node)) {
      queueMicrotask(() => {
        runUpdates(() => {
          Transition && (Transition.running = true);
          Listener = Owner = node;
          runComputation(node, node.tValue, time);
          Listener = Owner = null;
        }, false);
      });
    }
  }
  function runComputation(node, value, time) {
    let nextValue;
    const owner = Owner, listener = Listener;
    Listener = Owner = node;
    try {
      nextValue = node.fn(value);
    } catch (err2) {
      if (node.pure) {
        if (Transition && Transition.running) {
          node.tState = STALE;
          node.tOwned && node.tOwned.forEach(cleanNode);
          node.tOwned = void 0;
        } else {
          node.state = STALE;
          node.owned && node.owned.forEach(cleanNode);
          node.owned = null;
        }
      }
      node.updatedAt = time + 1;
      return handleError(err2);
    } finally {
      Listener = listener;
      Owner = owner;
    }
    if (!node.updatedAt || node.updatedAt <= time) {
      if (node.updatedAt != null && "observers" in node) {
        writeSignal(node, nextValue, true);
      } else if (Transition && Transition.running && node.pure) {
        Transition.sources.add(node);
        node.tValue = nextValue;
      } else node.value = nextValue;
      node.updatedAt = time;
    }
  }
  function createComputation(fn, init, pure, state = STALE, options) {
    const c = {
      fn,
      state,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: init,
      owner: Owner,
      context: Owner ? Owner.context : null,
      pure
    };
    if (Transition && Transition.running) {
      c.state = 0;
      c.tState = state;
    }
    if (Owner === null) ;
    else if (Owner !== UNOWNED) {
      if (Transition && Transition.running && Owner.pure) {
        if (!Owner.tOwned) Owner.tOwned = [c];
        else Owner.tOwned.push(c);
      } else {
        if (!Owner.owned) Owner.owned = [c];
        else Owner.owned.push(c);
      }
    }
    if (ExternalSourceConfig && c.fn) {
      const [track, trigger] = createSignal(void 0, {
        equals: false
      });
      const ordinary = ExternalSourceConfig.factory(c.fn, trigger);
      onCleanup(() => ordinary.dispose());
      const triggerInTransition = () => startTransition(trigger).then(() => inTransition.dispose());
      const inTransition = ExternalSourceConfig.factory(c.fn, triggerInTransition);
      c.fn = (x) => {
        track();
        return Transition && Transition.running ? inTransition.track(x) : ordinary.track(x);
      };
    }
    return c;
  }
  function runTop(node) {
    const runningTransition = Transition && Transition.running;
    if ((runningTransition ? node.tState : node.state) === 0) return;
    if ((runningTransition ? node.tState : node.state) === PENDING) return lookUpstream(node);
    if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
    const ancestors = [node];
    while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
      if (runningTransition && Transition.disposed.has(node)) return;
      if (runningTransition ? node.tState : node.state) ancestors.push(node);
    }
    for (let i = ancestors.length - 1; i >= 0; i--) {
      node = ancestors[i];
      if (runningTransition) {
        let top = node, prev = ancestors[i + 1];
        while ((top = top.owner) && top !== prev) {
          if (Transition.disposed.has(top)) return;
        }
      }
      if ((runningTransition ? node.tState : node.state) === STALE) {
        updateComputation(node);
      } else if ((runningTransition ? node.tState : node.state) === PENDING) {
        const updates = Updates;
        Updates = null;
        runUpdates(() => lookUpstream(node, ancestors[0]), false);
        Updates = updates;
      }
    }
  }
  function runUpdates(fn, init) {
    if (Updates) return fn();
    let wait = false;
    if (!init) Updates = [];
    if (Effects) wait = true;
    else Effects = [];
    ExecCount++;
    try {
      const res = fn();
      completeUpdates(wait);
      return res;
    } catch (err2) {
      if (!wait) Effects = null;
      Updates = null;
      handleError(err2);
    }
  }
  function completeUpdates(wait) {
    if (Updates) {
      if (Scheduler && Transition && Transition.running) scheduleQueue(Updates);
      else runQueue(Updates);
      Updates = null;
    }
    if (wait) return;
    let res;
    if (Transition) {
      if (!Transition.promises.size && !Transition.queue.size) {
        const sources = Transition.sources;
        const disposed = Transition.disposed;
        Effects.push.apply(Effects, Transition.effects);
        res = Transition.resolve;
        for (const e2 of Effects) {
          "tState" in e2 && (e2.state = e2.tState);
          delete e2.tState;
        }
        Transition = null;
        runUpdates(() => {
          for (const d of disposed) cleanNode(d);
          for (const v of sources) {
            v.value = v.tValue;
            if (v.owned) {
              for (let i = 0, len = v.owned.length; i < len; i++) cleanNode(v.owned[i]);
            }
            if (v.tOwned) v.owned = v.tOwned;
            delete v.tValue;
            delete v.tOwned;
            v.tState = 0;
          }
          setTransPending(false);
        }, false);
      } else if (Transition.running) {
        Transition.running = false;
        Transition.effects.push.apply(Transition.effects, Effects);
        Effects = null;
        setTransPending(true);
        return;
      }
    }
    const e = Effects;
    Effects = null;
    if (e.length) runUpdates(() => runEffects(e), false);
    if (res) res();
  }
  function runQueue(queue) {
    for (let i = 0; i < queue.length; i++) runTop(queue[i]);
  }
  function scheduleQueue(queue) {
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      const tasks = Transition.queue;
      if (!tasks.has(item)) {
        tasks.add(item);
        Scheduler(() => {
          tasks.delete(item);
          runUpdates(() => {
            Transition.running = true;
            runTop(item);
          }, false);
          Transition && (Transition.running = false);
        });
      }
    }
  }
  function runUserEffects(queue) {
    let i, userLength = 0;
    for (i = 0; i < queue.length; i++) {
      const e = queue[i];
      if (!e.user) runTop(e);
      else queue[userLength++] = e;
    }
    if (sharedConfig.context) {
      if (sharedConfig.count) {
        sharedConfig.effects || (sharedConfig.effects = []);
        sharedConfig.effects.push(...queue.slice(0, userLength));
        return;
      }
      setHydrateContext();
    }
    if (sharedConfig.effects && (sharedConfig.done || !sharedConfig.count)) {
      queue = [...sharedConfig.effects, ...queue];
      userLength += sharedConfig.effects.length;
      delete sharedConfig.effects;
    }
    for (i = 0; i < userLength; i++) runTop(queue[i]);
  }
  function lookUpstream(node, ignore) {
    const runningTransition = Transition && Transition.running;
    if (runningTransition) node.tState = 0;
    else node.state = 0;
    for (let i = 0; i < node.sources.length; i += 1) {
      const source = node.sources[i];
      if (source.sources) {
        const state = runningTransition ? source.tState : source.state;
        if (state === STALE) {
          if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount))
            runTop(source);
        } else if (state === PENDING) lookUpstream(source, ignore);
      }
    }
  }
  function markDownstream(node) {
    const runningTransition = Transition && Transition.running;
    for (let i = 0; i < node.observers.length; i += 1) {
      const o = node.observers[i];
      if (runningTransition ? !o.tState : !o.state) {
        if (runningTransition) o.tState = PENDING;
        else o.state = PENDING;
        if (o.pure) Updates.push(o);
        else Effects.push(o);
        o.observers && markDownstream(o);
      }
    }
  }
  function cleanNode(node) {
    let i;
    if (node.sources) {
      while (node.sources.length) {
        const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
        if (obs && obs.length) {
          const n = obs.pop(), s2 = source.observerSlots.pop();
          if (index < obs.length) {
            n.sourceSlots[s2] = index;
            obs[index] = n;
            source.observerSlots[index] = s2;
          }
        }
      }
    }
    if (node.tOwned) {
      for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
      delete node.tOwned;
    }
    if (Transition && Transition.running && node.pure) {
      reset(node, true);
    } else if (node.owned) {
      for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
      node.owned = null;
    }
    if (node.cleanups) {
      for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
      node.cleanups = null;
    }
    if (Transition && Transition.running) node.tState = 0;
    else node.state = 0;
  }
  function reset(node, top) {
    if (!top) {
      node.tState = 0;
      Transition.disposed.add(node);
    }
    if (node.owned) {
      for (let i = 0; i < node.owned.length; i++) reset(node.owned[i]);
    }
  }
  function castError(err2) {
    if (err2 instanceof Error) return err2;
    return new Error(typeof err2 === "string" ? err2 : "Unknown error", {
      cause: err2
    });
  }
  function runErrors(err2, fns, owner) {
    try {
      for (const f of fns) f(err2);
    } catch (e) {
      handleError(e, owner && owner.owner || null);
    }
  }
  function handleError(err2, owner = Owner) {
    const fns = ERROR && owner && owner.context && owner.context[ERROR];
    const error = castError(err2);
    if (!fns) throw error;
    if (Effects)
      Effects.push({
        fn() {
          runErrors(error, fns, owner);
        },
        state: STALE
      });
    else runErrors(error, fns, owner);
  }
  function resolveChildren(children2) {
    if (typeof children2 === "function" && !children2.length) return resolveChildren(children2());
    if (Array.isArray(children2)) {
      const results = [];
      for (let i = 0; i < children2.length; i++) {
        const result = resolveChildren(children2[i]);
        Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
      }
      return results;
    }
    return children2;
  }
  var FALLBACK = Symbol("fallback");
  function dispose(d) {
    for (let i = 0; i < d.length; i++) d[i]();
  }
  function mapArray(list, mapFn, options = {}) {
    let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
    onCleanup(() => dispose(disposers));
    return () => {
      let newItems = list() || [], newLen = newItems.length, i, j;
      newItems[$TRACK];
      return untrack(() => {
        let newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start3, end, newEnd, item;
        if (newLen === 0) {
          if (len !== 0) {
            dispose(disposers);
            disposers = [];
            items = [];
            mapped = [];
            len = 0;
            indexes && (indexes = []);
          }
          if (options.fallback) {
            items = [FALLBACK];
            mapped[0] = createRoot((disposer) => {
              disposers[0] = disposer;
              return options.fallback();
            });
            len = 1;
          }
        } else if (len === 0) {
          mapped = new Array(newLen);
          for (j = 0; j < newLen; j++) {
            items[j] = newItems[j];
            mapped[j] = createRoot(mapper);
          }
          len = newLen;
        } else {
          temp = new Array(newLen);
          tempdisposers = new Array(newLen);
          indexes && (tempIndexes = new Array(newLen));
          for (start3 = 0, end = Math.min(len, newLen); start3 < end && items[start3] === newItems[start3]; start3++) ;
          for (end = len - 1, newEnd = newLen - 1; end >= start3 && newEnd >= start3 && items[end] === newItems[newEnd]; end--, newEnd--) {
            temp[newEnd] = mapped[end];
            tempdisposers[newEnd] = disposers[end];
            indexes && (tempIndexes[newEnd] = indexes[end]);
          }
          newIndices = /* @__PURE__ */ new Map();
          newIndicesNext = new Array(newEnd + 1);
          for (j = newEnd; j >= start3; j--) {
            item = newItems[j];
            i = newIndices.get(item);
            newIndicesNext[j] = i === void 0 ? -1 : i;
            newIndices.set(item, j);
          }
          for (i = start3; i <= end; i++) {
            item = items[i];
            j = newIndices.get(item);
            if (j !== void 0 && j !== -1) {
              temp[j] = mapped[i];
              tempdisposers[j] = disposers[i];
              indexes && (tempIndexes[j] = indexes[i]);
              j = newIndicesNext[j];
              newIndices.set(item, j);
            } else disposers[i]();
          }
          for (j = start3; j < newLen; j++) {
            if (j in temp) {
              mapped[j] = temp[j];
              disposers[j] = tempdisposers[j];
              if (indexes) {
                indexes[j] = tempIndexes[j];
                indexes[j](j);
              }
            } else mapped[j] = createRoot(mapper);
          }
          mapped = mapped.slice(0, len = newLen);
          items = newItems.slice(0);
        }
        return mapped;
      });
      function mapper(disposer) {
        disposers[j] = disposer;
        if (indexes) {
          const [s2, set] = createSignal(j);
          indexes[j] = set;
          return mapFn(newItems[j], s2);
        }
        return mapFn(newItems[j]);
      }
    };
  }
  var hydrationEnabled = false;
  function createComponent(Comp, props) {
    if (hydrationEnabled) {
      if (sharedConfig.context) {
        const c = sharedConfig.context;
        setHydrateContext(nextHydrateContext());
        const r2 = untrack(() => Comp(props || {}));
        setHydrateContext(c);
        return r2;
      }
    }
    return untrack(() => Comp(props || {}));
  }
  var narrowedError = (name) => `Stale read from <${name}>.`;
  function For(props) {
    const fallback = "fallback" in props && {
      fallback: () => props.fallback
    };
    return createMemo(mapArray(() => props.each, props.children, fallback || void 0));
  }
  function Show(props) {
    const keyed = props.keyed;
    const conditionValue = createMemo(() => props.when, void 0, void 0);
    const condition = keyed ? conditionValue : createMemo(conditionValue, void 0, {
      equals: (a, b) => !a === !b
    });
    return createMemo(
      () => {
        const c = condition();
        if (c) {
          const child = props.children;
          const fn = typeof child === "function" && child.length > 0;
          return fn ? untrack(
            () => child(
              keyed ? c : () => {
                if (!untrack(condition)) throw narrowedError("Show");
                return conditionValue();
              }
            )
          ) : child;
        }
        return props.fallback;
      },
      void 0,
      void 0
    );
  }
  function Switch(props) {
    const chs = children(() => props.children);
    const switchFunc = createMemo(() => {
      const ch = chs();
      const mps = Array.isArray(ch) ? ch : [ch];
      let func = () => void 0;
      for (let i = 0; i < mps.length; i++) {
        const index = i;
        const mp = mps[i];
        const prevFunc = func;
        const conditionValue = createMemo(
          () => prevFunc() ? void 0 : mp.when,
          void 0,
          void 0
        );
        const condition = mp.keyed ? conditionValue : createMemo(conditionValue, void 0, {
          equals: (a, b) => !a === !b
        });
        func = () => prevFunc() || (condition() ? [index, conditionValue, mp] : void 0);
      }
      return func;
    });
    return createMemo(
      () => {
        const sel = switchFunc()();
        if (!sel) return props.fallback;
        const [index, conditionValue, mp] = sel;
        const child = mp.children;
        const fn = typeof child === "function" && child.length > 0;
        return fn ? untrack(
          () => child(
            mp.keyed ? conditionValue() : () => {
              if (untrack(switchFunc)()?.[0] !== index) throw narrowedError("Match");
              return conditionValue();
            }
          )
        ) : child;
      },
      void 0,
      void 0
    );
  }
  function Match(props) {
    return props;
  }

  // node_modules/solid-js/web/dist/web.js
  var booleans = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected"
  ];
  var Properties = /* @__PURE__ */ new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...booleans
  ]);
  var ChildProperties = /* @__PURE__ */ new Set([
    "innerHTML",
    "textContent",
    "innerText",
    "children"
  ]);
  var Aliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
    className: "class",
    htmlFor: "for"
  });
  var PropAliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
    class: "className",
    formnovalidate: {
      $: "formNoValidate",
      BUTTON: 1,
      INPUT: 1
    },
    ismap: {
      $: "isMap",
      IMG: 1
    },
    nomodule: {
      $: "noModule",
      SCRIPT: 1
    },
    playsinline: {
      $: "playsInline",
      VIDEO: 1
    },
    readonly: {
      $: "readOnly",
      INPUT: 1,
      TEXTAREA: 1
    }
  });
  function getPropAlias(prop, tagName) {
    const a = PropAliases[prop];
    return typeof a === "object" ? a[tagName] ? a["$"] : void 0 : a;
  }
  var DelegatedEvents = /* @__PURE__ */ new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart"
  ]);
  var SVGNamespace = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
  };
  function reconcileArrays(parentNode, a, b) {
    let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
        continue;
      }
      while (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
        while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) a[aStart].remove();
          aStart++;
        }
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = a[--aEnd].nextSibling;
        parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
        parentNode.insertBefore(b[--bEnd], node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = /* @__PURE__ */ new Map();
          let i = bStart;
          while (i < bEnd) map.set(b[i], i++);
        }
        const index = map.get(a[aStart]);
        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i = aStart, sequence = 1, t;
            while (++i < aEnd && i < bEnd) {
              if ((t = map.get(a[i])) == null || t !== index + sequence) break;
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = a[aStart];
              while (bStart < index) parentNode.insertBefore(b[bStart++], node);
            } else parentNode.replaceChild(b[bStart++], a[aStart++]);
          } else aStart++;
        } else a[aStart++].remove();
      }
    }
  }
  var $$EVENTS = "_$DX_DELEGATE";
  function template(html, isImportNode, isSVG, isMathML) {
    let node;
    const create = () => {
      const t = isMathML ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
      t.innerHTML = html;
      return isSVG ? t.content.firstChild.firstChild : isMathML ? t.firstChild : t.content.firstChild;
    };
    const fn = isImportNode ? () => untrack(() => document.importNode(node || (node = create()), true)) : () => (node || (node = create())).cloneNode(true);
    fn.cloneNode = fn;
    return fn;
  }
  function delegateEvents(eventNames, document2 = window.document) {
    const e = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set());
    for (let i = 0, l = eventNames.length; i < l; i++) {
      const name = eventNames[i];
      if (!e.has(name)) {
        e.add(name);
        document2.addEventListener(name, eventHandler);
      }
    }
  }
  function setAttribute(node, name, value) {
    if (isHydrating(node)) return;
    if (value == null) node.removeAttribute(name);
    else node.setAttribute(name, value);
  }
  function setAttributeNS(node, namespace, name, value) {
    if (isHydrating(node)) return;
    if (value == null) node.removeAttributeNS(namespace, name);
    else node.setAttributeNS(namespace, name, value);
  }
  function setBoolAttribute(node, name, value) {
    if (isHydrating(node)) return;
    value ? node.setAttribute(name, "") : node.removeAttribute(name);
  }
  function className(node, value) {
    if (isHydrating(node)) return;
    if (value == null) node.removeAttribute("class");
    else node.className = value;
  }
  function addEventListener(node, name, handler, delegate) {
    if (delegate) {
      if (Array.isArray(handler)) {
        node[`$$${name}`] = handler[0];
        node[`$$${name}Data`] = handler[1];
      } else node[`$$${name}`] = handler;
    } else if (Array.isArray(handler)) {
      const handlerFn = handler[0];
      node.addEventListener(name, handler[0] = (e) => handlerFn.call(node, handler[1], e));
    } else node.addEventListener(name, handler, typeof handler !== "function" && handler);
  }
  function classList(node, value, prev = {}) {
    const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
    let i, len;
    for (i = 0, len = prevKeys.length; i < len; i++) {
      const key = prevKeys[i];
      if (!key || key === "undefined" || value[key]) continue;
      toggleClassKey(node, key, false);
      delete prev[key];
    }
    for (i = 0, len = classKeys.length; i < len; i++) {
      const key = classKeys[i], classValue = !!value[key];
      if (!key || key === "undefined" || prev[key] === classValue || !classValue) continue;
      toggleClassKey(node, key, true);
      prev[key] = classValue;
    }
    return prev;
  }
  function style(node, value, prev) {
    if (!value) return prev ? setAttribute(node, "style") : value;
    const nodeStyle = node.style;
    if (typeof value === "string") return nodeStyle.cssText = value;
    typeof prev === "string" && (nodeStyle.cssText = prev = void 0);
    prev || (prev = {});
    value || (value = {});
    let v, s2;
    for (s2 in prev) {
      value[s2] == null && nodeStyle.removeProperty(s2);
      delete prev[s2];
    }
    for (s2 in value) {
      v = value[s2];
      if (v !== prev[s2]) {
        nodeStyle.setProperty(s2, v);
        prev[s2] = v;
      }
    }
    return prev;
  }
  function spread(node, props = {}, isSVG, skipChildren) {
    const prevProps = {};
    if (!skipChildren) {
      createRenderEffect(
        () => prevProps.children = insertExpression(node, props.children, prevProps.children)
      );
    }
    createRenderEffect(() => typeof props.ref === "function" && use(props.ref, node));
    createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
    return prevProps;
  }
  function use(fn, element, arg) {
    return untrack(() => fn(element, arg));
  }
  function insert(parent, accessor, marker, initial) {
    if (marker !== void 0 && !initial) initial = [];
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
  }
  function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
    props || (props = {});
    for (const prop in prevProps) {
      if (!(prop in props)) {
        if (prop === "children") continue;
        prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef, props);
      }
    }
    for (const prop in props) {
      if (prop === "children") {
        if (!skipChildren) insertExpression(node, props.children);
        continue;
      }
      const value = props[prop];
      prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef, props);
    }
  }
  function isHydrating(node) {
    return !!sharedConfig.context && !sharedConfig.done && (!node || node.isConnected);
  }
  function toPropertyName(name) {
    return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
  }
  function toggleClassKey(node, key, value) {
    const classNames = key.trim().split(/\s+/);
    for (let i = 0, nameLen = classNames.length; i < nameLen; i++)
      node.classList.toggle(classNames[i], value);
  }
  function assignProp(node, prop, value, prev, isSVG, skipRef, props) {
    let isCE, isProp, isChildProp, propAlias, forceProp;
    if (prop === "style") return style(node, value, prev);
    if (prop === "classList") return classList(node, value, prev);
    if (value === prev) return prev;
    if (prop === "ref") {
      if (!skipRef) value(node);
    } else if (prop.slice(0, 3) === "on:") {
      const e = prop.slice(3);
      prev && node.removeEventListener(e, prev, typeof prev !== "function" && prev);
      value && node.addEventListener(e, value, typeof value !== "function" && value);
    } else if (prop.slice(0, 10) === "oncapture:") {
      const e = prop.slice(10);
      prev && node.removeEventListener(e, prev, true);
      value && node.addEventListener(e, value, true);
    } else if (prop.slice(0, 2) === "on") {
      const name = prop.slice(2).toLowerCase();
      const delegate = DelegatedEvents.has(name);
      if (!delegate && prev) {
        const h = Array.isArray(prev) ? prev[0] : prev;
        node.removeEventListener(name, h);
      }
      if (delegate || value) {
        addEventListener(node, name, value, delegate);
        delegate && delegateEvents([name]);
      }
    } else if (prop.slice(0, 5) === "attr:") {
      setAttribute(node, prop.slice(5), value);
    } else if (prop.slice(0, 5) === "bool:") {
      setBoolAttribute(node, prop.slice(5), value);
    } else if ((forceProp = prop.slice(0, 5) === "prop:") || (isChildProp = ChildProperties.has(prop)) || !isSVG && ((propAlias = getPropAlias(prop, node.tagName)) || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-") || "is" in props)) {
      if (forceProp) {
        prop = prop.slice(5);
        isProp = true;
      } else if (isHydrating(node)) return value;
      if (prop === "class" || prop === "className") className(node, value);
      else if (isCE && !isProp && !isChildProp) node[toPropertyName(prop)] = value;
      else node[propAlias || prop] = value;
    } else {
      const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
      if (ns) setAttributeNS(node, ns, prop, value);
      else setAttribute(node, Aliases[prop] || prop, value);
    }
    return value;
  }
  function eventHandler(e) {
    if (sharedConfig.registry && sharedConfig.events) {
      if (sharedConfig.events.find(([el, ev]) => ev === e)) return;
    }
    let node = e.target;
    const key = `$$${e.type}`;
    const oriTarget = e.target;
    const oriCurrentTarget = e.currentTarget;
    const retarget = (value) => Object.defineProperty(e, "target", {
      configurable: true,
      value
    });
    const handleNode = () => {
      const handler = node[key];
      if (handler && !node.disabled) {
        const data = node[`${key}Data`];
        data !== void 0 ? handler.call(node, data, e) : handler.call(node, e);
        if (e.cancelBubble) return;
      }
      node.host && typeof node.host !== "string" && !node.host._$host && node.contains(e.target) && retarget(node.host);
      return true;
    };
    const walkUpTree = () => {
      while (handleNode() && (node = node._$host || node.parentNode || node.host)) ;
    };
    Object.defineProperty(e, "currentTarget", {
      configurable: true,
      get() {
        return node || document;
      }
    });
    if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = _$HY.done = true;
    if (e.composedPath) {
      const path = e.composedPath();
      retarget(path[0]);
      for (let i = 0; i < path.length - 2; i++) {
        node = path[i];
        if (!handleNode()) break;
        if (node._$host) {
          node = node._$host;
          walkUpTree();
          break;
        }
        if (node.parentNode === oriCurrentTarget) {
          break;
        }
      }
    } else walkUpTree();
    retarget(oriTarget);
  }
  function insertExpression(parent, value, current, marker, unwrapArray) {
    const hydrating = isHydrating(parent);
    if (hydrating) {
      !current && (current = [...parent.childNodes]);
      let cleaned = [];
      for (let i = 0; i < current.length; i++) {
        const node = current[i];
        if (node.nodeType === 8 && node.data.slice(0, 2) === "!$") node.remove();
        else cleaned.push(node);
      }
      current = cleaned;
    }
    while (typeof current === "function") current = current();
    if (value === current) return current;
    const t = typeof value, multi = marker !== void 0;
    parent = multi && current[0] && current[0].parentNode || parent;
    if (t === "string" || t === "number") {
      if (hydrating) return current;
      if (t === "number") {
        value = value.toString();
        if (value === current) return current;
      }
      if (multi) {
        let node = current[0];
        if (node && node.nodeType === 3) {
          node.data !== value && (node.data = value);
        } else node = document.createTextNode(value);
        current = cleanChildren(parent, current, marker, node);
      } else {
        if (current !== "" && typeof current === "string") {
          current = parent.firstChild.data = value;
        } else current = parent.textContent = value;
      }
    } else if (value == null || t === "boolean") {
      if (hydrating) return current;
      current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
      createRenderEffect(() => {
        let v = value();
        while (typeof v === "function") v = v();
        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      const currentArray = current && Array.isArray(current);
      if (normalizeIncomingArray(array, value, current, unwrapArray)) {
        createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
        return () => current;
      }
      if (hydrating) {
        if (!array.length) return current;
        if (marker === void 0) return current = [...parent.childNodes];
        let node = array[0];
        if (node.parentNode !== parent) return current;
        const nodes = [node];
        while ((node = node.nextSibling) !== marker) nodes.push(node);
        return current = nodes;
      }
      if (array.length === 0) {
        current = cleanChildren(parent, current, marker);
        if (multi) return current;
      } else if (currentArray) {
        if (current.length === 0) {
          appendNodes(parent, array, marker);
        } else reconcileArrays(parent, current, array);
      } else {
        current && cleanChildren(parent);
        appendNodes(parent, array);
      }
      current = array;
    } else if (value.nodeType) {
      if (hydrating && value.parentNode) return current = multi ? [value] : value;
      if (Array.isArray(current)) {
        if (multi) return current = cleanChildren(parent, current, marker, value);
        cleanChildren(parent, current, null, value);
      } else if (current == null || current === "" || !parent.firstChild) {
        parent.appendChild(value);
      } else parent.replaceChild(value, parent.firstChild);
      current = value;
    } else ;
    return current;
  }
  function normalizeIncomingArray(normalized, array, current, unwrap2) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i], prev = current && current[normalized.length], t;
      if (item == null || item === true || item === false) ;
      else if ((t = typeof item) === "object" && item.nodeType) {
        normalized.push(item);
      } else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
      } else if (t === "function") {
        if (unwrap2) {
          while (typeof item === "function") item = item();
          dynamic = normalizeIncomingArray(
            normalized,
            Array.isArray(item) ? item : [item],
            Array.isArray(prev) ? prev : [prev]
          ) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else {
        const value = String(item);
        if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
        else normalized.push(document.createTextNode(value));
      }
    }
    return dynamic;
  }
  function appendNodes(parent, array, marker = null) {
    for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
  }
  function cleanChildren(parent, current, marker, replacement) {
    if (marker === void 0) return parent.textContent = "";
    const node = replacement || document.createTextNode("");
    if (current.length) {
      let inserted = false;
      for (let i = current.length - 1; i >= 0; i--) {
        const el = current[i];
        if (node !== el) {
          const isParent = el.parentNode === parent;
          if (!inserted && !i)
            isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
          else isParent && el.remove();
        } else inserted = true;
      }
    } else parent.insertBefore(node, marker);
    return [node];
  }
  var RequestContext = Symbol();
  var isServer = false;

  // node_modules/component-register/dist/component-register.js
  function cloneProps(props) {
    const propKeys = Object.keys(props);
    return propKeys.reduce((memo, k) => {
      const prop = props[k];
      memo[k] = Object.assign({}, prop);
      if (isObject(prop.value) && !isFunction(prop.value) && !Array.isArray(prop.value)) memo[k].value = Object.assign({}, prop.value);
      if (Array.isArray(prop.value)) memo[k].value = prop.value.slice(0);
      return memo;
    }, {});
  }
  function normalizePropDefs(props) {
    if (!props) return {};
    const propKeys = Object.keys(props);
    return propKeys.reduce((memo, k) => {
      const v = props[k];
      memo[k] = !(isObject(v) && "value" in v) ? {
        value: v
      } : v;
      memo[k].attribute || (memo[k].attribute = toAttribute(k));
      memo[k].parse = "parse" in memo[k] ? memo[k].parse : typeof memo[k].value !== "string";
      return memo;
    }, {});
  }
  function propValues(props) {
    const propKeys = Object.keys(props);
    return propKeys.reduce((memo, k) => {
      memo[k] = props[k].value;
      return memo;
    }, {});
  }
  function initializeProps(element, propDefinition) {
    const props = cloneProps(propDefinition), propKeys = Object.keys(propDefinition);
    propKeys.forEach((key) => {
      const prop = props[key], attr = element.getAttribute(prop.attribute), value = element[key];
      if (attr != null) prop.value = prop.parse ? parseAttributeValue(attr) : attr;
      if (value != null) prop.value = Array.isArray(value) ? value.slice(0) : value;
      prop.reflect && reflect(element, prop.attribute, prop.value, !!prop.parse);
      Object.defineProperty(element, key, {
        get() {
          return prop.value;
        },
        set(val) {
          const oldValue = prop.value;
          prop.value = val;
          prop.reflect && reflect(this, prop.attribute, prop.value, !!prop.parse);
          for (let i = 0, l = this.__propertyChangedCallbacks.length; i < l; i++) {
            this.__propertyChangedCallbacks[i](key, val, oldValue);
          }
        },
        enumerable: true,
        configurable: true
      });
    });
    return props;
  }
  function parseAttributeValue(value) {
    if (!value) return;
    try {
      return JSON.parse(value);
    } catch (err2) {
      return value;
    }
  }
  function reflect(node, attribute, value, parse) {
    if (value == null || value === false) return node.removeAttribute(attribute);
    let reflect2 = parse ? JSON.stringify(value) : value;
    node.__updating[attribute] = true;
    if (reflect2 === "true") reflect2 = "";
    node.setAttribute(attribute, reflect2);
    Promise.resolve().then(() => delete node.__updating[attribute]);
  }
  function toAttribute(propName) {
    return propName.replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase()).replace("_", "-").replace(/^-/, "");
  }
  function isObject(obj) {
    return obj != null && (typeof obj === "object" || typeof obj === "function");
  }
  function isFunction(val) {
    return Object.prototype.toString.call(val) === "[object Function]";
  }
  function isConstructor(f) {
    return typeof f === "function" && f.toString().indexOf("class") === 0;
  }
  var currentElement;
  function createElementType(BaseElement, propDefinition) {
    const propKeys = Object.keys(propDefinition);
    return class CustomElement extends BaseElement {
      static get observedAttributes() {
        return propKeys.map((k) => propDefinition[k].attribute);
      }
      constructor() {
        super();
        this.__initialized = false;
        this.__released = false;
        this.__releaseCallbacks = [];
        this.__propertyChangedCallbacks = [];
        this.__updating = {};
        this.props = {};
      }
      connectedCallback() {
        if (this.__initialized) return;
        this.__releaseCallbacks = [];
        this.__propertyChangedCallbacks = [];
        this.__updating = {};
        this.props = initializeProps(this, propDefinition);
        const props = propValues(this.props), ComponentType = this.Component, outerElement = currentElement;
        try {
          currentElement = this;
          this.__initialized = true;
          if (isConstructor(ComponentType)) new ComponentType(props, {
            element: this
          });
          else ComponentType(props, {
            element: this
          });
        } finally {
          currentElement = outerElement;
        }
      }
      async disconnectedCallback() {
        await Promise.resolve();
        if (this.isConnected) return;
        this.__propertyChangedCallbacks.length = 0;
        let callback = null;
        while (callback = this.__releaseCallbacks.pop()) callback(this);
        delete this.__initialized;
        this.__released = true;
      }
      attributeChangedCallback(name, oldVal, newVal) {
        if (!this.__initialized) return;
        if (this.__updating[name]) return;
        name = this.lookupProp(name);
        if (name in propDefinition) {
          if (newVal == null && !this[name]) return;
          this[name] = propDefinition[name].parse ? parseAttributeValue(newVal) : newVal;
        }
      }
      lookupProp(attrName) {
        if (!propDefinition) return;
        return propKeys.find((k) => attrName === k || attrName === propDefinition[k].attribute);
      }
      get renderRoot() {
        return this.shadowRoot || this.attachShadow({
          mode: "open"
        });
      }
      addReleaseCallback(fn) {
        this.__releaseCallbacks.push(fn);
      }
      addPropertyChangedCallback(fn) {
        this.__propertyChangedCallbacks.push(fn);
      }
    };
  }
  var EC = Symbol("element-context");
  function register(tag, props = {}, options = {}) {
    const {
      BaseElement = HTMLElement,
      extension,
      customElements = window.customElements
    } = options;
    return (ComponentType) => {
      if (!tag) throw new Error("tag is required to register a Component");
      let ElementType = customElements.get(tag);
      if (ElementType) {
        ElementType.prototype.Component = ComponentType;
        return ElementType;
      }
      ElementType = createElementType(BaseElement, normalizePropDefs(props));
      ElementType.prototype.Component = ComponentType;
      ElementType.prototype.registeredTag = tag;
      customElements.define(tag, ElementType, extension);
      return ElementType;
    };
  }

  // node_modules/solid-element/dist/index.js
  function createProps(raw) {
    const keys = Object.keys(raw);
    const props = {};
    for (let i = 0; i < keys.length; i++) {
      const [get, set] = createSignal(raw[keys[i]]);
      Object.defineProperty(props, keys[i], {
        get,
        set(v) {
          set(() => v);
        }
      });
    }
    return props;
  }
  function lookupContext(el) {
    if (el.assignedSlot && el.assignedSlot._$owner) return el.assignedSlot._$owner;
    let next = el.parentNode;
    while (next && !next._$owner && !(next.assignedSlot && next.assignedSlot._$owner))
      next = next.parentNode;
    return next && next.assignedSlot ? next.assignedSlot._$owner : el._$owner;
  }
  function withSolid(ComponentType) {
    return (rawProps, options) => {
      const { element } = options;
      return createRoot((dispose2) => {
        const props = createProps(rawProps);
        element.addPropertyChangedCallback((key, val) => props[key] = val);
        element.addReleaseCallback(() => {
          element.renderRoot.textContent = "";
          dispose2();
        });
        const comp = ComponentType(props, options);
        return insert(element.renderRoot, comp);
      }, lookupContext(element));
    };
  }
  function customElement(tag, props, ComponentType) {
    if (arguments.length === 2) {
      ComponentType = props;
      props = {};
    }
    return register(tag, props)(withSolid(ComponentType));
  }

  // node_modules/@solid-primitives/utils/dist/index.js
  var noop = () => void 0;

  // node_modules/@solid-primitives/raf/dist/index.js
  function createRAF(callback) {
    if (isServer) {
      return [() => false, noop, noop];
    }
    const [running3, setRunning] = createSignal(false);
    let requestID = 0;
    const loop = (timeStamp) => {
      requestID = requestAnimationFrame(loop);
      callback(timeStamp);
    };
    const start3 = () => {
      if (running3())
        return;
      setRunning(true);
      requestID = requestAnimationFrame(loop);
    };
    const stop3 = () => {
      setRunning(false);
      cancelAnimationFrame(requestID);
    };
    onCleanup(stop3);
    return [running3, start3, stop3];
  }
  function targetFPS(callback, fps) {
    if (isServer) {
      return callback;
    }
    const interval = typeof fps === "function" ? createMemo(() => Math.floor(1e3 / fps())) : (() => {
      const newInterval = Math.floor(1e3 / fps);
      return () => newInterval;
    })();
    let elapsed = 0;
    let lastRun = 0;
    let missedBy = 0;
    return (timeStamp) => {
      elapsed = timeStamp - lastRun;
      if (Math.ceil(elapsed + missedBy) >= interval()) {
        lastRun = timeStamp;
        missedBy = Math.max(elapsed - interval(), 0);
        callback(timeStamp);
      }
    };
  }

  // node_modules/solid-js/store/dist/store.js
  var $RAW = Symbol("store-raw");
  var $NODE = Symbol("store-node");
  var $HAS = Symbol("store-has");
  var $SELF = Symbol("store-self");
  function wrap$1(value) {
    let p = value[$PROXY];
    if (!p) {
      Object.defineProperty(value, $PROXY, {
        value: p = new Proxy(value, proxyTraps$1)
      });
      if (!Array.isArray(value)) {
        const keys = Object.keys(value), desc = Object.getOwnPropertyDescriptors(value);
        for (let i = 0, l = keys.length; i < l; i++) {
          const prop = keys[i];
          if (desc[prop].get) {
            Object.defineProperty(value, prop, {
              enumerable: desc[prop].enumerable,
              get: desc[prop].get.bind(p)
            });
          }
        }
      }
    }
    return p;
  }
  function isWrappable(obj) {
    let proto;
    return obj != null && typeof obj === "object" && (obj[$PROXY] || !(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype || Array.isArray(obj));
  }
  function unwrap(item, set = /* @__PURE__ */ new Set()) {
    let result, unwrapped, v, prop;
    if (result = item != null && item[$RAW]) return result;
    if (!isWrappable(item) || set.has(item)) return item;
    if (Array.isArray(item)) {
      if (Object.isFrozen(item)) item = item.slice(0);
      else set.add(item);
      for (let i = 0, l = item.length; i < l; i++) {
        v = item[i];
        if ((unwrapped = unwrap(v, set)) !== v) item[i] = unwrapped;
      }
    } else {
      if (Object.isFrozen(item)) item = Object.assign({}, item);
      else set.add(item);
      const keys = Object.keys(item), desc = Object.getOwnPropertyDescriptors(item);
      for (let i = 0, l = keys.length; i < l; i++) {
        prop = keys[i];
        if (desc[prop].get) continue;
        v = item[prop];
        if ((unwrapped = unwrap(v, set)) !== v) item[prop] = unwrapped;
      }
    }
    return item;
  }
  function getNodes(target, symbol) {
    let nodes = target[symbol];
    if (!nodes)
      Object.defineProperty(target, symbol, {
        value: nodes = /* @__PURE__ */ Object.create(null)
      });
    return nodes;
  }
  function getNode(nodes, property, value) {
    if (nodes[property]) return nodes[property];
    const [s2, set] = createSignal(value, {
      equals: false,
      internal: true
    });
    s2.$ = set;
    return nodes[property] = s2;
  }
  function proxyDescriptor$1(target, property) {
    const desc = Reflect.getOwnPropertyDescriptor(target, property);
    if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE)
      return desc;
    delete desc.value;
    delete desc.writable;
    desc.get = () => target[$PROXY][property];
    return desc;
  }
  function trackSelf(target) {
    getListener() && getNode(getNodes(target, $NODE), $SELF)();
  }
  function ownKeys(target) {
    trackSelf(target);
    return Reflect.ownKeys(target);
  }
  var proxyTraps$1 = {
    get(target, property, receiver) {
      if (property === $RAW) return target;
      if (property === $PROXY) return receiver;
      if (property === $TRACK) {
        trackSelf(target);
        return receiver;
      }
      const nodes = getNodes(target, $NODE);
      const tracked = nodes[property];
      let value = tracked ? tracked() : target[property];
      if (property === $NODE || property === $HAS || property === "__proto__") return value;
      if (!tracked) {
        const desc = Object.getOwnPropertyDescriptor(target, property);
        if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property)) && !(desc && desc.get))
          value = getNode(nodes, property, value)();
      }
      return isWrappable(value) ? wrap$1(value) : value;
    },
    has(target, property) {
      if (property === $RAW || property === $PROXY || property === $TRACK || property === $NODE || property === $HAS || property === "__proto__")
        return true;
      getListener() && getNode(getNodes(target, $HAS), property)();
      return property in target;
    },
    set() {
      return true;
    },
    deleteProperty() {
      return true;
    },
    ownKeys,
    getOwnPropertyDescriptor: proxyDescriptor$1
  };
  function setProperty(state, property, value, deleting = false) {
    if (!deleting && state[property] === value) return;
    const prev = state[property], len = state.length;
    if (value === void 0) {
      delete state[property];
      if (state[$HAS] && state[$HAS][property] && prev !== void 0) state[$HAS][property].$();
    } else {
      state[property] = value;
      if (state[$HAS] && state[$HAS][property] && prev === void 0) state[$HAS][property].$();
    }
    let nodes = getNodes(state, $NODE), node;
    if (node = getNode(nodes, property, prev)) node.$(() => value);
    if (Array.isArray(state) && state.length !== len) {
      for (let i = state.length; i < len; i++) (node = nodes[i]) && node.$();
      (node = getNode(nodes, "length", len)) && node.$(state.length);
    }
    (node = nodes[$SELF]) && node.$();
  }
  function mergeStoreNode(state, value) {
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      setProperty(state, key, value[key]);
    }
  }
  function updateArray(current, next) {
    if (typeof next === "function") next = next(current);
    next = unwrap(next);
    if (Array.isArray(next)) {
      if (current === next) return;
      let i = 0, len = next.length;
      for (; i < len; i++) {
        const value = next[i];
        if (current[i] !== value) setProperty(current, i, value);
      }
      setProperty(current, "length", len);
    } else mergeStoreNode(current, next);
  }
  function updatePath(current, path, traversed = []) {
    let part, prev = current;
    if (path.length > 1) {
      part = path.shift();
      const partType = typeof part, isArray = Array.isArray(current);
      if (Array.isArray(part)) {
        for (let i = 0; i < part.length; i++) {
          updatePath(current, [part[i]].concat(path), traversed);
        }
        return;
      } else if (isArray && partType === "function") {
        for (let i = 0; i < current.length; i++) {
          if (part(current[i], i)) updatePath(current, [i].concat(path), traversed);
        }
        return;
      } else if (isArray && partType === "object") {
        const { from = 0, to = current.length - 1, by = 1 } = part;
        for (let i = from; i <= to; i += by) {
          updatePath(current, [i].concat(path), traversed);
        }
        return;
      } else if (path.length > 1) {
        updatePath(current[part], path, [part].concat(traversed));
        return;
      }
      prev = current[part];
      traversed = [part].concat(traversed);
    }
    let value = path[0];
    if (typeof value === "function") {
      value = value(prev, traversed);
      if (value === prev) return;
    }
    if (part === void 0 && value == void 0) return;
    value = unwrap(value);
    if (part === void 0 || isWrappable(prev) && isWrappable(value) && !Array.isArray(value)) {
      mergeStoreNode(prev, value);
    } else setProperty(current, part, value);
  }
  function createStore(...[store, options]) {
    const unwrappedStore = unwrap(store || {});
    const isArray = Array.isArray(unwrappedStore);
    const wrappedStore = wrap$1(unwrappedStore);
    function setStore(...args) {
      batch(() => {
        isArray && args.length === 1 ? updateArray(unwrappedStore, args[0]) : updatePath(unwrappedStore, args);
      });
    }
    return [wrappedStore, setStore];
  }
  var $ROOT = Symbol("store-root");

  // src/common/ids.ts
  var characterNameByExternalId = [
    "Captain Falcon",
    // 0, 0x0
    "Donkey Kong",
    // 1, 0x1
    "Fox",
    // 2, 0x2
    "Mr. Game & Watch",
    // 3, 0x3
    "Kirby",
    // 4, 0x4
    "Bowser",
    // 5, 0x5
    "Link",
    // 6, 0x6
    "Luigi",
    // 7, 0x7
    "Mario",
    // 8, 0x8
    "Marth",
    // 9, 0x9
    "Mewtwo",
    // 10, 0xa
    "Ness",
    // 11, 0xb
    "Peach",
    // 12, 0xc
    "Pikachu",
    // 13, 0xd
    "Ice Climbers",
    // 14, 0xe
    "Jigglypuff",
    // 15, 0xf
    "Samus",
    // 16, 0x10
    "Yoshi",
    // 17, 0x11
    "Zelda",
    // 18, 0x12
    "Sheik",
    // 19, 0x13
    "Falco",
    // 20, 0x14
    "Young Link",
    // 21, 0x15
    "Dr. Mario",
    // 22, 0x16
    "Roy",
    // 23, 0x17
    "Pichu",
    // 24, 0x18
    "Ganondorf",
    // 25, 0x19
    "Master Hand",
    // 26, 0x1a
    "Wireframe Male",
    // 27, 0x1b
    "Wireframe Female",
    // 28, 0x1c
    "Giga Bowser",
    // 29, 0x1d
    "Crazy Hand",
    // 30, 0x1e
    "Sandbag",
    // 31, 0x1f
    "Popo"
    // 32, 0x20
  ];
  var characterNameByInternalId = [
    "Mario",
    // 0, 0x0
    "Fox",
    // 1, 0x1
    "Captain Falcon",
    // 2, 0x2
    "Donkey Kong",
    // 3, 0x3
    "Kirby",
    // 4, 0x4
    "Bowser",
    // 5, 0x5
    "Link",
    // 6, 0x6
    "Sheik",
    // 7, 0x7
    "Ness",
    // 8, 0x8
    "Peach",
    // 9, 0x9
    "Popo",
    // 10, 0xa
    "Nana",
    // 11, 0xb
    "Pikachu",
    // 12, 0xc
    "Samus",
    // 13, 0xd
    "Yoshi",
    // 14, 0xe
    "Jigglypuff",
    // 15, 0xf
    "Mewtwo",
    // 16, 0x10
    "Luigi",
    // 17, 0x11
    "Marth",
    // 18, 0x12
    "Zelda",
    // 19, 0x13
    "Young Link",
    // 20, 0x14
    "Dr. Mario",
    // 21, 0x15
    "Falco",
    // 22, 0x16
    "Pichu",
    // 23, 0x17
    "Mr. Game & Watch",
    // 24, 0x18
    "Ganondorf",
    // 25, 0x19
    "Roy",
    // 26, 0x1a
    "Master Hand",
    // 27, 0x1b
    "Crazy Hand",
    // 28, 0x1c
    "Wireframe Male (Boy)",
    // 29, 0x1d
    "Wireframe Female (Girl)",
    // 30, 0x1e
    "Giga Bowser",
    // 31, 0x1f
    "Sandbag"
    // 32, 0x20
  ];
  var stageNameByExternalId = [
    "Dummy",
    // 0, 0x0
    "TEST",
    // 1, 0x1
    "Fountain of Dreams",
    // 2, 0x2
    "Pok\xE9mon Stadium",
    // 3, 0x3
    "Princess Peach's Castle",
    // 4, 0x4
    "Kongo Jungle",
    // 5, 0x5
    "Brinstar",
    // 6, 0x6
    "Corneria",
    // 7, 0x7
    "Yoshi's Story",
    // 8, 0x8
    "Onett",
    // 9, 0x9
    "Mute City",
    // 10, 0xa
    "Rainbow Cruise",
    // 11, 0xb
    "Jungle Japes",
    // 12, 0xc
    "Great Bay",
    // 13, 0xd
    "Hyrule Temple",
    // 14, 0xe
    "Brinstar Depths",
    // 15, 0xf
    "Yoshi's Island",
    // 16, 0x10
    "Green Greens",
    // 17, 0x11
    "Fourside",
    // 18, 0x12
    "Mushroom Kingdom I",
    // 19, 0x13
    "Mushroom Kingdom II",
    // 20, 0x14
    "Akaneia",
    // 21, 0x15
    "Venom",
    // 22, 0x16
    "Pok\xE9 Floats",
    // 23, 0x17
    "Big Blue",
    // 24, 0x18
    "Icicle Mountain",
    // 25, 0x19
    "Icetop",
    // 26, 0x1a
    "Flat Zone",
    // 27, 0x1b
    "Dream Land N64",
    // 28, 0x1c
    "Yoshi's Island N64",
    // 29, 0x1d
    "Kongo Jungle N64",
    // 30, 0x1e
    "Battlefield",
    // 31, 0x1f
    "Final Destination"
    // 32, 0x20
    // TODO: Single player mode stages, goes up to 285
  ];
  var actionNameById = [
    "DeadDown",
    // 0, 0x0
    "DeadLeft",
    // 1, 0x1
    "DeadRight",
    // 2, 0x2
    "DeadUp",
    // 3, 0x3
    "DeadUpStar",
    // 4, 0x4
    "DeadUpStarIce",
    // 5, 0x5
    "DeadUpFall",
    // 6, 0x6
    "DeadUpFallHitCamera",
    // 7, 0x7
    "DeadUpFallHitCameraFlat",
    // 8, 0x8
    "DeadUpFallIce",
    // 9, 0x9
    "DeadUpFallHitCameraIce",
    // 10, 0xa
    "Sleep",
    // 11, 0xb
    "Rebirth",
    // 12, 0xc
    "RebirthWait",
    // 13, 0xd
    "Wait",
    // 14, 0xe
    "WalkSlow",
    // 15, 0xf
    "WalkMiddle",
    // 16, 0x10
    "WalkFast",
    // 17, 0x11
    "Turn",
    // 18, 0x12
    "TurnRun",
    // 19, 0x13
    "Dash",
    // 20, 0x14
    "Run",
    // 21, 0x15
    "RunDirect",
    // 22, 0x16
    "RunBrake",
    // 23, 0x17
    "KneeBend",
    // 24, 0x18
    "JumpF",
    // 25, 0x19
    "JumpB",
    // 26, 0x1a
    "JumpAerialF",
    // 27, 0x1b
    "JumpAerialB",
    // 28, 0x1c
    "Fall",
    // 29, 0x1d
    "FallF",
    // 30, 0x1e
    "FallB",
    // 31, 0x1f
    "FallAerial",
    // 32, 0x20
    "FallAerialF",
    // 33, 0x21
    "FallAerialB",
    // 34, 0x22
    "FallSpecial",
    // 35, 0x23
    "FallSpecialF",
    // 36, 0x24
    "FallSpecialB",
    // 37, 0x25
    "DamageFall",
    // 38, 0x26
    "Squat",
    // 39, 0x27
    "SquatWait",
    // 40, 0x28
    "SquatRv",
    // 41, 0x29
    "Landing",
    // 42, 0x2a
    "LandingFallSpecial",
    // 43, 0x2b
    "Attack11",
    // 44, 0x2c
    "Attack12",
    // 45, 0x2d
    "Attack13",
    // 46, 0x2e
    "Attack100Start",
    // 47, 0x2f
    "Attack100Loop",
    // 48, 0x30
    "Attack100End",
    // 49, 0x31
    "AttackDash",
    // 50, 0x32
    "AttackS3Hi",
    // 51, 0x33
    "AttackS3HiS",
    // 52, 0x34
    "AttackS3S",
    // 53, 0x35
    "AttackS3LwS",
    // 54, 0x36
    "AttackS3Lw",
    // 55, 0x37
    "AttackHi3",
    // 56, 0x38
    "AttackLw3",
    // 57, 0x39
    "AttackS4Hi",
    // 58, 0x3a
    "AttackS4HiS",
    // 59, 0x3b
    "AttackS4S",
    // 60, 0x3c
    "AttackS4LwS",
    // 61, 0x3d
    "AttackS4Lw",
    // 62, 0x3e
    "AttackHi4",
    // 63, 0x3f
    "AttackLw4",
    // 64, 0x40
    "AttackAirN",
    // 65, 0x41
    "AttackAirF",
    // 66, 0x42
    "AttackAirB",
    // 67, 0x43
    "AttackAirHi",
    // 68, 0x44
    "AttackAirLw",
    // 69, 0x45
    "LandingAirN",
    // 70, 0x46
    "LandingAirF",
    // 71, 0x47
    "LandingAirB",
    // 72, 0x48
    "LandingAirHi",
    // 73, 0x49
    "LandingAirLw",
    // 74, 0x4a
    "DamageHi1",
    // 75, 0x4b
    "DamageHi2",
    // 76, 0x4c
    "DamageHi3",
    // 77, 0x4d
    "DamageN1",
    // 78, 0x4e
    "DamageN2",
    // 79, 0x4f
    "DamageN3",
    // 80, 0x50
    "DamageLw1",
    // 81, 0x51
    "DamageLw2",
    // 82, 0x52
    "DamageLw3",
    // 83, 0x53
    "DamageAir1",
    // 84, 0x54
    "DamageAir2",
    // 85, 0x55
    "DamageAir3",
    // 86, 0x56
    "DamageFlyHi",
    // 87, 0x57
    "DamageFlyN",
    // 88, 0x58
    "DamageFlyLw",
    // 89, 0x59
    "DamageFlyTop",
    // 90, 0x5a
    "DamageFlyRoll",
    // 91, 0x5b
    "LightGet",
    // 92, 0x5c
    "HeavyGet",
    // 93, 0x5d
    "LightThrowF",
    // 94, 0x5e
    "LightThrowB",
    // 95, 0x5f
    "LightThrowHi",
    // 96, 0x60
    "LightThrowLw",
    // 97, 0x61
    "LightThrowDash",
    // 98, 0x62
    "LightThrowDrop",
    // 99, 0x63
    "LightThrowAirF",
    // 100, 0x64
    "LightThrowAirB",
    // 101, 0x65
    "LightThrowAirHi",
    // 102, 0x66
    "LightThrowAirLw",
    // 103, 0x67
    "HeavyThrowF",
    // 104, 0x68
    "HeavyThrowB",
    // 105, 0x69
    "HeavyThrowHi",
    // 106, 0x6a
    "HeavyThrowLw",
    // 107, 0x6b
    "LightThrowF4",
    // 108, 0x6c
    "LightThrowB4",
    // 109, 0x6d
    "LightThrowHi4",
    // 110, 0x6e
    "LightThrowLw4",
    // 111, 0x6f
    "LightThrowAirF4",
    // 112, 0x70
    "LightThrowAirB4",
    // 113, 0x71
    "LightThrowAirHi4",
    // 114, 0x72
    "LightThrowAirLw4",
    // 115, 0x73
    "HeavyThrowF4",
    // 116, 0x74
    "HeavyThrowB4",
    // 117, 0x75
    "HeavyThrowHi4",
    // 118, 0x76
    "HeavyThrowLw4",
    // 119, 0x77
    "SwordSwing1",
    // 120, 0x78
    "SwordSwing3",
    // 121, 0x79
    "SwordSwing4",
    // 122, 0x7a
    "SwordSwingDash",
    // 123, 0x7b
    "BatSwing1",
    // 124, 0x7c
    "BatSwing3",
    // 125, 0x7d
    "BatSwing4",
    // 126, 0x7e
    "BatSwingDash",
    // 127, 0x7f
    "ParasolSwing1",
    // 128, 0x80
    "ParasolSwing3",
    // 129, 0x81
    "ParasolSwing4",
    // 130, 0x82
    "ParasolSwingDash",
    // 131, 0x83
    "HarisenSwing1",
    // 132, 0x84
    "HarisenSwing3",
    // 133, 0x85
    "HarisenSwing4",
    // 134, 0x86
    "HarisenSwingDash",
    // 135, 0x87
    "StarRodSwing1",
    // 136, 0x88
    "StarRodSwing3",
    // 137, 0x89
    "StarRodSwing4",
    // 138, 0x8a
    "StarRodSwingDash",
    // 139, 0x8b
    "LipStickSwing1",
    // 140, 0x8c
    "LipStickSwing3",
    // 141, 0x8d
    "LipStickSwing4",
    // 142, 0x8e
    "LipStickSwingDash",
    // 143, 0x8f
    "ItemParasolOpen",
    // 144, 0x90
    "ItemParasolFall",
    // 145, 0x91
    "ItemParasolFallSpecial",
    // 146, 0x92
    "ItemParasolDamageFall",
    // 147, 0x93
    "LGunShoot",
    // 148, 0x94
    "LGunShootAir",
    // 149, 0x95
    "LGunShootEmpty",
    // 150, 0x96
    "LGunShootAirEmpty",
    // 151, 0x97
    "FireFlowerShoot",
    // 152, 0x98
    "FireFlowerShootAir",
    // 153, 0x99
    "ItemScrew",
    // 154, 0x9a
    "ItemScrewAir",
    // 155, 0x9b
    "DamageScrew",
    // 156, 0x9c
    "DamageScrewAir",
    // 157, 0x9d
    "ItemScopeStart",
    // 158, 0x9e
    "ItemScopeRapid",
    // 159, 0x9f
    "ItemScopeFire",
    // 160, 0xa0
    "ItemScopeEnd",
    // 161, 0xa1
    "ItemScopeAirStart",
    // 162, 0xa2
    "ItemScopeAirRapid",
    // 163, 0xa3
    "ItemScopeAirFire",
    // 164, 0xa4
    "ItemScopeAirEnd",
    // 165, 0xa5
    "ItemScopeStartEmpty",
    // 166, 0xa6
    "ItemScopeRapidEmpty",
    // 167, 0xa7
    "ItemScopeFireEmpty",
    // 168, 0xa8
    "ItemScopeEndEmpty",
    // 169, 0xa9
    "ItemScopeAirStartEmpty",
    // 170, 0xaa
    "ItemScopeAirRapidEmpty",
    // 171, 0xab
    "ItemScopeAirFireEmpty",
    // 172, 0xac
    "ItemScopeAirEndEmpty",
    // 173, 0xad
    "LiftWait",
    // 174, 0xae
    "LiftWalk1",
    // 175, 0xaf
    "LiftWalk2",
    // 176, 0xb0
    "LiftTurn",
    // 177, 0xb1
    "GuardOn",
    // 178, 0xb2
    "Guard",
    // 179, 0xb3
    "GuardOff",
    // 180, 0xb4
    "GuardSetOff",
    // 181, 0xb5
    "GuardReflect",
    // 182, 0xb6
    "DownBoundU",
    // 183, 0xb7
    "DownWaitU",
    // 184, 0xb8
    "DownDamageU",
    // 185, 0xb9
    "DownStandU",
    // 186, 0xba
    "DownAttackU",
    // 187, 0xbb
    "DownFowardU",
    // 188, 0xbc
    "DownBackU",
    // 189, 0xbd
    "DownSpotU",
    // 190, 0xbe
    "DownBoundD",
    // 191, 0xbf
    "DownWaitD",
    // 192, 0xc0
    "DownDamageD",
    // 193, 0xc1
    "DownStandD",
    // 194, 0xc2
    "DownAttackD",
    // 195, 0xc3
    "DownFowardD",
    // 196, 0xc4
    "DownBackD",
    // 197, 0xc5
    "DownSpotD",
    // 198, 0xc6
    "Passive",
    // 199, 0xc7
    "PassiveStandF",
    // 200, 0xc8
    "PassiveStandB",
    // 201, 0xc9
    "PassiveWall",
    // 202, 0xca
    "PassiveWallJump",
    // 203, 0xcb
    "PassiveCeil",
    // 204, 0xcc
    "ShieldBreakFly",
    // 205, 0xcd
    "ShieldBreakFall",
    // 206, 0xce
    "ShieldBreakDownU",
    // 207, 0xcf
    "ShieldBreakDownD",
    // 208, 0xd0
    "ShieldBreakStandU",
    // 209, 0xd1
    "ShieldBreakStandD",
    // 210, 0xd2
    "FuraFura",
    // 211, 0xd3
    "Catch",
    // 212, 0xd4
    "CatchPull",
    // 213, 0xd5
    "CatchDash",
    // 214, 0xd6
    "CatchDashPull",
    // 215, 0xd7
    "CatchWait",
    // 216, 0xd8
    "CatchAttack",
    // 217, 0xd9
    "CatchCut",
    // 218, 0xda
    "ThrowF",
    // 219, 0xdb
    "ThrowB",
    // 220, 0xdc
    "ThrowHi",
    // 221, 0xdd
    "ThrowLw",
    // 222, 0xde
    "CapturePulledHi",
    // 223, 0xdf
    "CaptureWaitHi",
    // 224, 0xe0
    "CaptureDamageHi",
    // 225, 0xe1
    "CapturePulledLw",
    // 226, 0xe2
    "CaptureWaitLw",
    // 227, 0xe3
    "CaptureDamageLw",
    // 228, 0xe4
    "CaptureCut",
    // 229, 0xe5
    "CaptureJump",
    // 230, 0xe6
    "CaptureNeck",
    // 231, 0xe7
    "CaptureFoot",
    // 232, 0xe8
    "EscapeF",
    // 233, 0xe9
    "EscapeB",
    // 234, 0xea
    "Escape",
    // 235, 0xeb
    "EscapeAir",
    // 236, 0xec
    "ReboundStop",
    // 237, 0xed
    "Rebound",
    // 238, 0xee
    "ThrownF",
    // 239, 0xef
    "ThrownB",
    // 240, 0xf0
    "ThrownHi",
    // 241, 0xf1
    "ThrownLw",
    // 242, 0xf2
    "ThrownLwWomen",
    // 243, 0xf3
    "Pass",
    // 244, 0xf4
    "Ottotto",
    // 245, 0xf5
    "OttottoWait",
    // 246, 0xf6
    "FlyReflectWall",
    // 247, 0xf7
    "FlyReflectCeil",
    // 248, 0xf8
    "StopWall",
    // 249, 0xf9
    "StopCeil",
    // 250, 0xfa
    "MissFoot",
    // 251, 0xfb
    "CliffCatch",
    // 252, 0xfc
    "CliffWait",
    // 253, 0xfd
    "CliffClimbSlow",
    // 254, 0xfe
    "CliffClimbQuick",
    // 255, 0xff
    "CliffAttackSlow",
    // 256, 0x100
    "CliffAttackQuick",
    // 257, 0x101
    "CliffEscapeSlow",
    // 258, 0x102
    "CliffEscapeQuick",
    // 259, 0x103
    "CliffJumpSlow1",
    // 260, 0x104
    "CliffJumpSlow2",
    // 261, 0x105
    "CliffJumpQuick1",
    // 262, 0x106
    "CliffJumpQuick2",
    // 263, 0x107
    "AppealR",
    // 264, 0x108
    "AppealL",
    // 265, 0x109
    "ShoulderedWait",
    // 266, 0x10a
    "ShoulderedWalkSlow",
    // 267, 0x10b
    "ShoulderedWalkMiddle",
    // 268, 0x10c
    "ShoulderedWalkFast",
    // 269, 0x10d
    "ShoulderedTurn",
    // 270, 0x10e
    "ThrownFF",
    // 271, 0x10f
    "ThrownFB",
    // 272, 0x110
    "ThrownFHi",
    // 273, 0x111
    "ThrownFLw",
    // 274, 0x112
    "CaptureCaptain",
    // 275, 0x113
    "CaptureYoshi",
    // 276, 0x114
    "YoshiEgg",
    // 277, 0x115
    "CaptureKoopa",
    // 278, 0x116
    "CaptureDamageKoopa",
    // 279, 0x117
    "CaptureWaitKoopa",
    // 280, 0x118
    "ThrownKoopaF",
    // 281, 0x119
    "ThrownKoopaB",
    // 282, 0x11a
    "CaptureKoopaAir",
    // 283, 0x11b
    "CaptureDamageKoopaAir",
    // 284, 0x11c
    "CaptureWaitKoopaAir",
    // 285, 0x11d
    "ThrownKoopaAirF",
    // 286, 0x11e
    "ThrownKoopaAirB",
    // 287, 0x11f
    "CaptureKirby",
    // 288, 0x120
    "CaptureWaitKirby",
    // 289, 0x121
    "ThrownKirbyStar",
    // 290, 0x122
    "ThrownCopyStar",
    // 291, 0x123
    "ThrownKirby",
    // 292, 0x124
    "BarrelWait",
    // 293, 0x125
    "Bury",
    // 294, 0x126
    "BuryWait",
    // 295, 0x127
    "BuryJump",
    // 296, 0x128
    "DamageSong",
    // 297, 0x129
    "DamageSongWait",
    // 298, 0x12a
    "DamageSongRv",
    // 299, 0x12b
    "DamageBind",
    // 300, 0x12c
    "CaptureMewtwo",
    // 301, 0x12d
    "CaptureMewtwoAir",
    // 302, 0x12e
    "ThrownMewtwo",
    // 303, 0x12f
    "ThrownMewtwoAir",
    // 304, 0x130
    "WarpStarJump",
    // 305, 0x131
    "WarpStarFall",
    // 306, 0x132
    "HammerWait",
    // 307, 0x133
    "HammerWalk",
    // 308, 0x134
    "HammerTurn",
    // 309, 0x135
    "HammerKneeBend",
    // 310, 0x136
    "HammerFall",
    // 311, 0x137
    "HammerJump",
    // 312, 0x138
    "HammerLanding",
    // 313, 0x139
    "KinokoGiantStart",
    // 314, 0x13a
    "KinokoGiantStartAir",
    // 315, 0x13b
    "KinokoGiantEnd",
    // 316, 0x13c
    "KinokoGiantEndAir",
    // 317, 0x13d
    "KinokoSmallStart",
    // 318, 0x13e
    "KinokoSmallStartAir",
    // 319, 0x13f
    "KinokoSmallEnd",
    // 320, 0x140
    "KinokoSmallEndAir",
    // 321, 0x141
    "Entry",
    // 322, 0x142
    "EntryStart",
    // 323, 0x143
    "EntryEnd",
    // 324, 0x144
    "DamageIce",
    // 325, 0x145
    "DamageIceJump",
    // 326, 0x146
    "CaptureMasterhand",
    // 327, 0x147
    "CapturedamageMasterhand",
    // 328, 0x148
    "CapturewaitMasterhand",
    // 329, 0x149
    "ThrownMasterhand",
    // 330, 0x14a
    "CaptureKirbyYoshi",
    // 331, 0x14b
    "KirbyYoshiEgg",
    // 332, 0x14c
    "CaptureLeadead",
    // 333, 0x14d
    "CaptureLikelike",
    // 334, 0x14e
    "DownReflect",
    // 335, 0x14f
    "CaptureCrazyhand",
    // 336, 0x150
    "CapturedamageCrazyhand",
    // 337, 0x151
    "CapturewaitCrazyhand",
    // 338, 0x152
    "ThrownCrazyhand",
    // 339, 0x153
    "BarrelCannonWait"
    // 340, 0x154
  ];
  var itemNamesById = [
    // Basic Items
    "Capsule",
    // 0x00
    "Box",
    // 0x01
    "Barrel (Taru)",
    // 0x02
    "Egg",
    // 0x03
    "Party Ball (Kusudama)",
    // 0x04
    "Barrel Cannon (TaruCann)",
    // 0x05
    "Bob-omb (BombHei)",
    // 0x06
    "Mr. Saturn (Dosei)",
    // 0x07
    "Heart Container",
    // 0x08
    "Maxim Tomato",
    // 0x09
    "Starman (Super Star)",
    // 0x0A
    "Home-Run Bat",
    // 0x0B
    "Beam Sword",
    // 0x0C
    "Parasol",
    // 0x0D
    "Green Shell (G Shell)",
    // 0x0E
    "Red Shell (R Shell)",
    // 0x0F
    "Ray Gun (L Gun)",
    // 0x10
    "Freezie (Freeze)",
    // 0x11
    "Food",
    // 0x12
    "Proximity Mine (MSBomb)",
    // 0x13
    "Flipper",
    // 0x14
    "Super Scope (S Scope)",
    // 0x15
    "Star Rod",
    // 0x16
    "Lip's Stick",
    // 0x17
    "Fan (Harisen)",
    // 0x18
    "Fire Flower (F Flower)",
    // 0x19
    "Super Mushroom (Kinoko)",
    // 0x1A
    "",
    // 0x1B
    "",
    // 0x1C
    "Warp Star (WStar)",
    // 0x1D
    "Screw Attack (ScBall)",
    // 0x1E
    "Bunny Hood (RabbitC)",
    // 0x1F
    "Metal Box (MetalB)",
    // 0x20
    "Cloaking Device (SpyCloak)",
    // 0x21
    "Pok\xE9 Ball (M Ball)",
    // 0x22
    // Item Related
    "Ray Gun recoil effect",
    // 0x23
    "Star Rod Star",
    // 0x24
    "Lips Stick Dust",
    // 0x25
    "Super Scope Beam",
    // 0x26
    "Ray Gun Beam",
    // 0x27
    "Hammer Head",
    // 0x28
    "Flower",
    // 0x29
    "Yoshi's egg (Event)",
    // 0x2A
    // Monsters Part 1
    "Goomba (DKuriboh)",
    // 0x2B
    "Redead (Leadead)",
    // 0x2C
    "Octarok (Octarock)",
    // 0x2D
    "Ottosea",
    // 0x2E
    "Stone(Octarok Projectile)",
    // 0x2F
    // Character Related
    "Mario's fire",
    // 0x30
    "",
    // 0x31
    "Kirby's Cutter beam",
    // 0x32
    "Kirby's Hammer",
    // 0x33
    "Kirby's Copy Star",
    // 0x34 (hat drop)
    "Kirby's Spit Star",
    // 0x35
    "Fox's Laser",
    // 0x36
    "Falco's Laser",
    // 0x37
    "Fox's shadow",
    // 0x38
    "Falco's shadow",
    // 0x39
    "Link's bomb",
    // 0x3A
    "Young Link's bomb",
    // 0x3B
    "Link's boomerang",
    // 0x3C
    "Young Link's boomerang",
    // 0x3D
    "Link's Hookshot",
    // 0x3E
    "Young Link's Hookshot",
    // 0x3F
    "Arrow",
    // 0x40
    "Fire Arrow",
    // 0x41
    "PK Fire",
    // 0x42
    "PK Flash",
    // 0x43
    "PK Flash",
    // 0x44
    "PK Thunder (Primary)",
    // 0x45
    "PK Thunder",
    // 0x46
    "PK Thunder",
    // 0x47
    "PK Thunder",
    // 0x48
    "PK Thunder",
    // 0x49
    "Fox's Blaster",
    // 0x4A
    "Falco's Blaster",
    // 0x4B
    "Link's Arrow",
    // 0x4C
    "Young Link's arrow",
    // 0x4D
    "PK Flash (explosion)",
    // 0x4E
    "Needle(thrown)",
    // 0x4F
    "Needle",
    // 0x50
    "Pikachu's Thunder",
    // 0x51
    "Pichu's Thunder",
    // 0x52
    "Mario's cape",
    // 0x53
    "Dr.Mario's cape",
    // 0x54
    "Smoke (Sheik)",
    // 0x55
    "Yoshi's egg(thrown)",
    // 0x56
    "Yoshi's Tongue??",
    // 0x57
    "Yoshi's Star",
    // 0x58
    "Pikachu's thunder (B)",
    // 0x59
    "Pikachu's thunder (B)",
    // 0x5A
    "Pichu's thunder (B)",
    // 0x5B
    "Pichu's thunder (B)",
    // 0x5C
    "Samus's bomb",
    // 0x5D
    "Samus's chargeshot",
    // 0x5E
    "Missile",
    // 0x5F
    "Grapple beam",
    // 0x60
    "Sheik's chain",
    // 0x61
    "",
    // 0x62
    "Turnip",
    // 0x63
    "Bowser's flame",
    // 0x64
    "Ness's bat",
    // 0x65
    "Yoyo",
    // 0x66
    "Peach's parasol",
    // 0x67
    "Toad",
    // 0x68
    "Luigi's fire",
    // 0x69
    "Ice(Iceclimbers)",
    // 0x6A
    "Blizzard",
    // 0x6B
    "Zelda's fire",
    // 0x6C
    "Zelda's fire (explosion)",
    // 0x6D
    "",
    // 0x6E
    "Toad's spore",
    // 0x6F
    "Mewtwo's Shadowball",
    // 0x70
    "Iceclimbers' UpB",
    // 0x71
    "Pesticide",
    // 0x72
    "Manhole",
    // 0x73
    "Fire(G&W)",
    // 0x74
    "Parashute",
    // 0x75
    "Turtle",
    // 0x76
    "Sperky",
    // 0x77
    "Judge",
    // 0x78
    "",
    // 0x79
    "Sausage",
    // 0x7A
    "Milk (Young Link)",
    // 0x7B
    "Firefighter(G&W)",
    // 0x7C
    "Masterhand's Laser",
    // 0x7D
    "Masterhand's Bullet",
    // 0x7E
    "Crazyhand's Laser",
    // 0x7F
    "Crazyhand's Bullet",
    // 0x80
    "Crazyhand's Bomb",
    // 0x81
    "Kirby copy Mario's Fire (B)",
    // 0x82
    "Kirby copy Dr. Mario's Capsule (B)",
    // 0x83
    "Kirby copy Luigi's Fire (B)",
    // 0x84
    "Kirby copy IceClimber's IceCube (B)",
    // 0x85
    "Kirby copy Peach's Toad (B)",
    // 0x86
    "Kirby copy Toad's Spore (B)",
    // 0x87
    "Kirby copy Fox's Laser (B)",
    // 0x88
    "Kirby copy Falco's Laser (B)",
    // 0x89
    "Kirby copy Fox's Blaster (B)",
    // 0x8A
    "Kirby copy Falco's Blaster (B)",
    // 0x8B
    "Kirby copy Link's Arrow (B)",
    // 0x8C
    "Kirby copy Young Link's Arrow (B)",
    // 0x8D
    "Kirby copy Link's Arrow (B)",
    // 0x8E
    "Kirby copy Young Link's Arrow (B)",
    // 0x8F
    "Kirby copy Mewtwo's Shadowball (B)",
    // 0x90
    "Kirby copy PK Flash (B)",
    // 0x91
    "Kirby copy PK Flash Explosion (B)",
    // 0x92
    "Kirby copy Pikachu's Thunder (B)",
    // 0x93
    "Kirby copy Pikachu's Thunder (B)",
    // 0x94
    "Kirby copy Pichu's Thunder (B)",
    // 0x95
    "Kirby copy Pichu's Thunder (B)",
    // 0x96
    "Kirby copy Samus' Chargeshot (B)",
    // 0x97
    "Kirby copy Sheik's Needle (thrown) (B)",
    // 0x98
    "Kirby copy Sheik's Needle (ground) (B)",
    // 0x99
    "Kirby copy Bowser's Flame (B)",
    // 0x9A
    "Kirby copy Mr. Game & Watch's Sausage (B)",
    // 0x9B
    "(unique)",
    // 0x9C
    "Yoshi's Tongue?? (B)",
    // 0x9D
    "(unique)",
    // 0x9E
    "Coin",
    // 0x9F
    // Pokemon
    "Random Pokemon",
    // 0xA0
    "Goldeen (Tosakinto)",
    // 0xA1
    "Chicorita",
    // 0xA2
    "Snorlax",
    // 0xA3
    "Blastoise",
    // 0xA4
    "Weezing (Matadogas)",
    // 0xA5
    "Charizard (Lizardon)",
    // 0xA6
    "Moltres",
    // 0xA7
    "Zapdos",
    // 0xA8
    "Articuno",
    // 0xA9
    "Wobbuffet",
    // 0xAA
    "Scizor",
    // 0xAB
    "Unown",
    // 0xAC
    "Entei",
    // 0xAD
    "Raikou",
    // 0xAE
    "Suicune",
    // 0xAF
    "Bellossom (Kireihana)",
    // 0xB0
    "Electrode (Marumine)",
    // 0xB1
    "Lugia",
    // 0xB2
    "Ho-oh",
    // 0xB3
    "Ditto (Metamon)",
    // 0xB4
    "Clefairy",
    // 0xB5
    "Togepi",
    // 0xB6
    "Mew",
    // 0xB7
    "Celebi",
    // 0xB8
    "Staryu (Hitodeman)",
    // 0xB9
    "Chansey",
    // 0xBA
    "Porygon2",
    // 0xBB
    "Cyndaquil (Hinoarashi)",
    // 0xBC
    "Marill",
    // 0xBD
    "Venusaur (Fushigibana)",
    // 0xBE
    // Pokemon Related
    "Chicorita's Leaf",
    // 0xBF
    "Blastoise's Water",
    // 0xC0
    "Weezing's Gas",
    // 0xC1
    "Weezing's Gas",
    // 0xC2
    "Charizard's Breath",
    // 0xC3
    "Charizard's Breath",
    // 0xC4
    "Charizard's Breath",
    // 0xC5
    "Charizard's Breath",
    // 0xC6
    "Mini-Unowns",
    // 0xC7
    "Lugia's Aeroblast",
    // 0xC8
    "Lugia's Aeroblast",
    // 0xC9
    "Lugia's Aeroblast",
    // 0xCA
    "Ho-Oh's Flame",
    // 0xCB
    "Staryu's Star",
    // 0xCC
    "Healing Egg",
    // 0xCD
    "Cyndaquil's Fire",
    // 0xCE
    "",
    // 0xCF
    // Monsters Part 2
    "Old Goomba (Old-Kuri)",
    // 0xD0
    "Target (Mato)",
    // 0xD1
    "Shyguy (Heiho)",
    // 0xD2
    "Koopa(Green) (Nokonoko)",
    // 0xD3
    "Koopa(Red) (PataPata)",
    // 0xD4
    "Likelile",
    // 0xD5
    "Old Redead (old-lead) [invalid]",
    // 0xD6
    "Old Octorok(old-octa) [invalid]",
    // 0xD7
    "Old Ottosea (old-otto)",
    // 0xD8
    "White Bear (whitebea)",
    // 0xD9
    "Klap",
    // 0xDA
    "Green Shell (zgshell)",
    // 0xDB
    "Red Shell (green act) (zrshell)",
    // 0xDC
    // Stage Specific
    "Tingle (on balloon)",
    // 0xDD
    "[Invalid]",
    // 0xDE
    "[Invalid]",
    // 0xDF
    "[Invalid]",
    // 0xE0
    "Apple",
    // 0xE1
    "Healing Apple",
    // 0xE2
    "[Invalid]",
    // 0xE3
    "[Invalid]",
    // 0xE4
    "[Invalid]",
    // 0xE5
    "Tool (Flatzone)",
    // 0xE6
    "[Invalid]",
    // 0xE7
    "[Invalid]",
    // 0xE8
    "Birdo",
    // 0xE9
    "Arwing Laser",
    // 0xEA
    "Great Fox's Laser",
    // 0xEB
    "Birdo's Egg"
    // 0xEC
  ];

  // src/common/constants.ts
  var fodInitialLeftPlatformHeight = 20;
  var fodInitialRightPlatformHeight = 27.44186047;

  // src/parse/parser.ts
  var firstVersion = "0.1.0.0";
  function parseReplay({ metadata, raw }) {
    const rawData = new DataView(
      raw.buffer,
      raw.byteOffset
      // baseJson.raw.byteLength
    );
    const commandPayloadSizes = parseEventPayloadsEvent(rawData, 0);
    const frames = [];
    const gameSettings = parseGameStartEvent(
      rawData,
      1 + commandPayloadSizes[53],
      metadata
    );
    let gameEnding;
    const replayVersion = gameSettings.replayFormatVersion;
    let offset = 0 + commandPayloadSizes[53] + 1 + commandPayloadSizes[54] + 1;
    while (offset < rawData.byteLength) {
      const command = readUint(rawData, 8, replayVersion, firstVersion, offset);
      switch (command) {
        case 55:
          handlePreFrameUpdateEvent(rawData, offset, replayVersion, frames);
          break;
        case 56:
          handlePostFrameUpdateEvent(rawData, offset, replayVersion, frames);
          break;
        case 57:
          gameEnding = parseGameEndEvent(rawData, offset, replayVersion);
          break;
        case 58:
          handleFrameStartEvent(rawData, offset, replayVersion, frames);
          break;
        case 59:
          handleItemUpdateEvent(rawData, offset, replayVersion, frames);
          break;
        case 63:
          handleFodPlatformsEvent(rawData, offset, replayVersion, frames);
          break;
      }
      offset = offset + commandPayloadSizes[command] + 1;
    }
    if (gameEnding === void 0) {
      console.warn("Game end event not found");
    }
    return {
      settings: gameSettings,
      frames,
      ending: gameEnding
    };
  }
  function handlePreFrameUpdateEvent(rawData, offset, replayVersion, frames) {
    const playerInputs = parsePreFrameUpdateEvent(rawData, offset, replayVersion);
    initFrameIfNeeded(frames, playerInputs.frameNumber);
    initPlayerIfNeeded(
      frames,
      playerInputs.frameNumber,
      playerInputs.playerIndex
    );
    if (playerInputs.isNana) {
      frames[playerInputs.frameNumber].players[
        playerInputs.playerIndex
        // @ts-ignore will only be readonly once parser is done
      ].nanaInputs = playerInputs;
    } else {
      frames[playerInputs.frameNumber].players[playerInputs.playerIndex].inputs = playerInputs;
    }
  }
  function handlePostFrameUpdateEvent(rawData, offset, replayVersion, frames) {
    const playerState = parsePostFrameUpdateEvent(rawData, offset, replayVersion);
    if (playerState.isNana) {
      frames[playerState.frameNumber].players[playerState.playerIndex].nanaState = playerState;
    } else {
      frames[playerState.frameNumber].players[playerState.playerIndex].state = playerState;
    }
  }
  function handleFrameStartEvent(rawData, offset, replayVersion, frames) {
    const { frameNumber, randomSeed } = parseFrameStartEvent(
      rawData,
      offset,
      replayVersion
    );
    initFrameIfNeeded(frames, frameNumber);
    frames[frameNumber].randomSeed = randomSeed;
  }
  function handleItemUpdateEvent(rawData, offset, replayVersion, frames) {
    const itemUpdate = parseItemUpdateEvent(rawData, offset, replayVersion);
    frames[itemUpdate.frameNumber].items.push(itemUpdate);
  }
  function handleFodPlatformsEvent(rawData, offset, replayVersion, frames) {
    const stageUpdate = parseFodPlatformsEvent(
      rawData,
      offset,
      replayVersion
    );
    if (stageUpdate.platform === 1) {
      frames[stageUpdate.frameNumber].stage.fodLeftPlatformHeight = stageUpdate.height;
    } else {
      frames[stageUpdate.frameNumber].stage.fodRightPlatformHeight = stageUpdate.height;
    }
  }
  function initFrameIfNeeded(frames, frameNumber) {
    if (frames[frameNumber] === void 0) {
      const prevFrame = frames[frameNumber - 1];
      let prevFodLeftPlatformHeight, prevFodRightPlatformHeight;
      if (prevFrame) {
        prevFodLeftPlatformHeight = prevFrame.stage.fodLeftPlatformHeight;
        prevFodRightPlatformHeight = prevFrame.stage.fodRightPlatformHeight;
      } else {
        prevFodLeftPlatformHeight = fodInitialLeftPlatformHeight;
        prevFodRightPlatformHeight = fodInitialRightPlatformHeight;
      }
      frames[frameNumber] = {
        frameNumber,
        players: [],
        items: [],
        stage: {
          frameNumber,
          fodLeftPlatformHeight: prevFodLeftPlatformHeight,
          fodRightPlatformHeight: prevFodRightPlatformHeight
        }
      };
    }
  }
  function initPlayerIfNeeded(frames, frameNumber, playerIndex) {
    if (frames[frameNumber].players[playerIndex] === void 0) {
      frames[frameNumber].players[playerIndex] = {
        frameNumber,
        playerIndex
      };
    }
  }
  function parseEventPayloadsEvent(rawData, offset) {
    const commandByte = readUint(
      rawData,
      8,
      firstVersion,
      firstVersion,
      offset + 0
    );
    const commandPayloadSizes = {};
    const eventPayloadsPayloadSize = readUint(
      rawData,
      8,
      firstVersion,
      firstVersion,
      offset + 1
    );
    commandPayloadSizes[commandByte] = eventPayloadsPayloadSize;
    const listOffset = offset + 2;
    for (let i = listOffset; i < eventPayloadsPayloadSize + listOffset - 1; i += 3) {
      const commandByte2 = readUint(
        rawData,
        8,
        firstVersion,
        firstVersion,
        i + 0
      );
      const payloadSize = readUint(
        rawData,
        16,
        firstVersion,
        firstVersion,
        i + 1
      );
      commandPayloadSizes[commandByte2] = payloadSize;
    }
    return commandPayloadSizes;
  }
  function parseGameStartEvent(rawData, offset, metadata) {
    const replayFormatVersion = [
      readUint(rawData, 8, firstVersion, firstVersion, offset + 1),
      readUint(rawData, 8, firstVersion, firstVersion, offset + 2),
      readUint(rawData, 8, firstVersion, firstVersion, offset + 3),
      readUint(rawData, 8, firstVersion, firstVersion, offset + 4)
    ].join(".");
    const settingsBitfield1 = readUint(
      rawData,
      8,
      replayFormatVersion,
      firstVersion,
      offset + 5
    );
    const settingsBitfield2 = readUint(
      rawData,
      8,
      replayFormatVersion,
      firstVersion,
      offset + 6
    );
    const settingsBitfield3 = readUint(
      rawData,
      8,
      replayFormatVersion,
      firstVersion,
      offset + 8
    );
    const settingsBitfield4 = readUint(
      rawData,
      8,
      replayFormatVersion,
      firstVersion,
      offset + 9
    );
    const timerTypeCode = settingsBitfield1 & 3;
    const gameModeCode = (settingsBitfield1 & 224) >> 5;
    const itemSpawnRateCode = readInt(
      rawData,
      8,
      replayFormatVersion,
      firstVersion,
      offset + 16
    );
    const settings = {
      isTeams: Boolean(
        readUint(rawData, 8, replayFormatVersion, firstVersion, offset + 13)
      ),
      playerSettings: [],
      replayFormatVersion,
      stageId: readUint(
        rawData,
        16,
        replayFormatVersion,
        firstVersion,
        offset + 19
      ),
      startTimestamp: metadata?.startAt,
      platform: metadata?.playedOn,
      isPal: Boolean(
        readUint(rawData, 8, replayFormatVersion, "1.5.0.0", offset + 417)
      ),
      isFrozenStadium: Boolean(
        readUint(rawData, 8, replayFormatVersion, "2.0.0.0", offset + 418)
      ),
      timerType: timerTypeCode === 0 ? "no timer" : timerTypeCode === 2 ? "counting down" : "counting up",
      characterUiPlacesCount: (settingsBitfield1 & 28) >> 2,
      gameType: gameModeCode === 0 ? "time" : gameModeCode === 1 ? "stock" : gameModeCode === 2 ? "coin" : "bonus",
      friendlyFireOn: Boolean(settingsBitfield2 & 1),
      isBreakTheTargetsOrTitleDemo: Boolean(settingsBitfield2 & 2),
      isClassicOrAdventureMode: Boolean(settingsBitfield2 & 4),
      isHomeRunContestOrEventMatch: Boolean(settingsBitfield2 & 8),
      isSingleButtonMode: Boolean(settingsBitfield3 & 16),
      timerCountsDuringPause: Boolean(settingsBitfield4 & 1),
      bombRain: Boolean(
        readUint(rawData, 8, replayFormatVersion, firstVersion, offset + 11)
      ),
      itemSpawnRate: itemSpawnRateCode === -1 ? "off" : itemSpawnRateCode === 0 ? "very low" : itemSpawnRateCode === 1 ? "low" : itemSpawnRateCode === 2 ? "medium" : itemSpawnRateCode === 3 ? "high" : "very high",
      selfDestructScoreValue: readInt(
        rawData,
        8,
        replayFormatVersion,
        firstVersion,
        offset + 17
      ),
      timerStart: readUint(
        rawData,
        32,
        replayFormatVersion,
        firstVersion,
        offset + 21
      ),
      damageRatio: readFloat(
        rawData,
        32,
        replayFormatVersion,
        firstVersion,
        offset + 53
      )
    };
    settings.consoleNickname = metadata?.consoleNick;
    for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
      const playerType = readUint(
        rawData,
        8,
        settings.replayFormatVersion,
        firstVersion,
        offset + 102 + 36 * playerIndex
      );
      if (playerType === 3) continue;
      const dashbackFix = readUint(
        rawData,
        32,
        settings.replayFormatVersion,
        "1.0.0.0",
        offset + 321 + 8 * playerIndex
      );
      const shieldDropFix = readUint(
        rawData,
        32,
        settings.replayFormatVersion,
        "1.0.0.0",
        offset + 325 + 8 * playerIndex
      );
      const playerBitfield = readUint(
        rawData,
        8,
        settings.replayFormatVersion,
        firstVersion,
        offset + 113 + 36 * playerIndex
      );
      settings.playerSettings[playerIndex] = {
        playerIndex,
        port: playerIndex + 1,
        internalCharacterIds: Object.keys(
          metadata?.players[playerIndex]?.characters ?? {}
        ).map((key) => Number(key)),
        externalCharacterId: readUint(
          rawData,
          8,
          settings.replayFormatVersion,
          firstVersion,
          offset + 101 + 36 * playerIndex
        ),
        playerType,
        startStocks: readUint(
          rawData,
          8,
          settings.replayFormatVersion,
          firstVersion,
          offset + 103 + 36 * playerIndex
        ),
        costumeIndex: readUint(
          rawData,
          8,
          settings.replayFormatVersion,
          firstVersion,
          offset + 104 + 36 * playerIndex
        ),
        teamShade: readUint(
          rawData,
          8,
          settings.replayFormatVersion,
          firstVersion,
          offset + 108 + 36 * playerIndex
        ),
        handicap: readUint(
          rawData,
          8,
          settings.replayFormatVersion,
          firstVersion,
          offset + 109 + 36 * playerIndex
        ),
        teamId: readUint(
          rawData,
          8,
          settings.replayFormatVersion,
          firstVersion,
          offset + 110 + 36 * playerIndex
        ),
        staminaMode: Boolean(playerBitfield & 1),
        silentCharacter: Boolean(playerBitfield & 2),
        lowGravity: Boolean(playerBitfield & 4),
        invisible: Boolean(playerBitfield & 8),
        blackStockIcon: Boolean(playerBitfield & 16),
        metal: Boolean(playerBitfield & 32),
        startGameOnWarpPlatform: Boolean(playerBitfield & 64),
        rumbleEnabled: Boolean(playerBitfield & 128),
        cpuLevel: readUint(
          rawData,
          8,
          settings.replayFormatVersion,
          firstVersion,
          offset + 116 + 36 * playerIndex
        ),
        offenseRatio: readFloat(
          rawData,
          32,
          settings.replayFormatVersion,
          firstVersion,
          offset + 125 + 36 * playerIndex
        ),
        defenseRatio: readFloat(
          rawData,
          32,
          settings.replayFormatVersion,
          firstVersion,
          offset + 129 + 36 * playerIndex
        ),
        modelScale: readFloat(
          rawData,
          32,
          settings.replayFormatVersion,
          firstVersion,
          offset + 133 + 36 * playerIndex
        ),
        controllerFix: dashbackFix === shieldDropFix ? dashbackFix === 1 ? "UCF" : dashbackFix === 2 ? "Dween" : "None" : "Mixed",
        nametag: readShiftJisString(
          rawData,
          settings.replayFormatVersion,
          "1.3.0.0",
          offset + 353 + 16 * playerIndex,
          9
        ),
        displayName: readShiftJisString(
          rawData,
          settings.replayFormatVersion,
          "3.9.0.0",
          offset + 421 + 31 * playerIndex,
          16
        ),
        connectCode: readShiftJisString(
          rawData,
          settings.replayFormatVersion,
          "3.9.0.0",
          offset + 545 + 10 * playerIndex,
          10
        )
      };
    }
    return settings;
  }
  function parseFrameStartEvent(rawData, offset, replayVersion) {
    return {
      frameNumber: readInt(rawData, 32, replayVersion, "2.2.0.0", offset + 1) + 123,
      randomSeed: readUint(rawData, 32, replayVersion, "2.2.0.0", offset + 5)
    };
  }
  function parsePreFrameUpdateEvent(rawData, offset, replayVersion) {
    const processedButtonsBitfield = readUint(
      rawData,
      32,
      replayVersion,
      "0.1.0.0",
      offset + 45
    );
    const physicalButtonsBitfield = readUint(
      rawData,
      16,
      replayVersion,
      "0.1.0.0",
      offset + 49
    );
    return {
      frameNumber: readInt(rawData, 32, replayVersion, "0.1.0.0", offset + 1) + 123,
      playerIndex: readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 5),
      isNana: Boolean(
        readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 6)
      ),
      physical: {
        dPadLeft: Boolean(physicalButtonsBitfield & 1),
        dPadRight: Boolean(physicalButtonsBitfield & 2),
        dPadDown: Boolean(physicalButtonsBitfield & 4),
        dPadUp: Boolean(physicalButtonsBitfield & 8),
        z: Boolean(physicalButtonsBitfield & 16),
        rTriggerAnalog: readFloat(
          rawData,
          32,
          replayVersion,
          "0.1.0.0",
          offset + 55
        ),
        rTriggerDigital: Boolean(physicalButtonsBitfield & 32),
        lTriggerAnalog: readFloat(
          rawData,
          32,
          replayVersion,
          "0.1.0.0",
          offset + 51
        ),
        lTriggerDigital: Boolean(physicalButtonsBitfield & 64),
        a: Boolean(physicalButtonsBitfield & 256),
        b: Boolean(physicalButtonsBitfield & 512),
        x: Boolean(physicalButtonsBitfield & 1024),
        y: Boolean(physicalButtonsBitfield & 2048),
        start: Boolean(physicalButtonsBitfield & 4096)
      },
      processed: {
        dPadLeft: Boolean(processedButtonsBitfield & 1),
        dPadRight: Boolean(processedButtonsBitfield & 2),
        dPadDown: Boolean(processedButtonsBitfield & 4),
        dPadUp: Boolean(processedButtonsBitfield & 8),
        z: Boolean(processedButtonsBitfield & 16),
        rTriggerDigital: Boolean(processedButtonsBitfield & 32),
        lTriggerDigital: Boolean(processedButtonsBitfield & 64),
        a: Boolean(processedButtonsBitfield & 256),
        b: Boolean(processedButtonsBitfield & 512),
        x: Boolean(processedButtonsBitfield & 1024),
        y: Boolean(processedButtonsBitfield & 2048),
        start: Boolean(processedButtonsBitfield & 4096),
        joystickX: readFloat(
          rawData,
          32,
          replayVersion,
          "0.1.0.0",
          offset + 25
        ),
        joystickY: readFloat(
          rawData,
          32,
          replayVersion,
          "0.1.0.0",
          offset + 29
        ),
        cStickX: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 33),
        cStickY: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 37),
        anyTrigger: readFloat(
          rawData,
          32,
          replayVersion,
          "0.1.0.0",
          offset + 41
        )
      }
    };
  }
  function parsePostFrameUpdateEvent(rawData, offset, replayVersion) {
    const hurtboxCollisionStateCode = readUint(
      rawData,
      8,
      replayVersion,
      "2.1.0.0",
      offset + 52
    );
    const lCancelStatusCode = readUint(
      rawData,
      8,
      replayVersion,
      "2.0.0.0",
      offset + 51
    );
    const stateBitfield1 = readUint(
      rawData,
      8,
      replayVersion,
      "2.1.0.0",
      offset + 38
    );
    const stateBitfield2 = readUint(
      rawData,
      8,
      replayVersion,
      "2.1.0.0",
      offset + 39
    );
    const stateBitfield3 = readUint(
      rawData,
      8,
      replayVersion,
      "2.1.0.0",
      offset + 40
    );
    const stateBitfield4 = readUint(
      rawData,
      8,
      replayVersion,
      "2.1.0.0",
      offset + 41
    );
    const stateBitfield5 = readUint(
      rawData,
      8,
      replayVersion,
      "2.1.0.0",
      offset + 42
    );
    return {
      frameNumber: readInt(rawData, 32, replayVersion, "0.1.0.0", offset + 1) + 123,
      playerIndex: readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 5),
      isNana: Boolean(
        readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 6)
      ),
      internalCharacterId: readUint(
        rawData,
        8,
        replayVersion,
        "0.1.0.0",
        offset + 7
      ),
      actionStateId: readUint(
        rawData,
        16,
        replayVersion,
        "0.1.0.0",
        offset + 8
      ),
      xPosition: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 10),
      yPosition: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 14),
      facingDirection: readFloat(
        rawData,
        32,
        replayVersion,
        "0.1.0.0",
        offset + 18
      ),
      percent: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 22),
      shieldSize: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 26),
      lastHittingAttackId: readUint(
        rawData,
        8,
        replayVersion,
        "0.1.0.0",
        offset + 30
      ),
      currentComboCount: readUint(
        rawData,
        8,
        replayVersion,
        "0.1.0.0",
        offset + 31
      ),
      lastHitBy: readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 32),
      stocksRemaining: readUint(
        rawData,
        8,
        replayVersion,
        "0.1.0.0",
        offset + 33
      ),
      actionStateFrameCounter: readFloat(
        rawData,
        32,
        replayVersion,
        "0.2.0.0",
        offset + 34
      ),
      hitstunRemaining: readFloat(
        rawData,
        32,
        replayVersion,
        "2.0.0.0",
        offset + 43
      ),
      isGrounded: readUint(rawData, 8, replayVersion, "2.0.0.0", offset + 47) !== 0,
      lastGroundId: readUint(rawData, 8, replayVersion, "2.0.0.0", offset + 48),
      jumpsRemaining: readUint(
        rawData,
        8,
        replayVersion,
        "2.0.0.0",
        offset + 50
      ),
      lCancelStatus: lCancelStatusCode === 1 ? "successful" : lCancelStatusCode === 2 ? "missed" : void 0,
      hurtboxCollisionState: hurtboxCollisionStateCode === 0 || hurtboxCollisionStateCode === void 0 ? "vulnerable" : hurtboxCollisionStateCode === 1 ? "invulnerable" : "intangible",
      selfInducedAirXSpeed: readFloat(
        rawData,
        32,
        replayVersion,
        "3.5.0.0",
        offset + 53
      ),
      selfInducedAirYSpeed: readFloat(
        rawData,
        32,
        replayVersion,
        "3.5.0.0",
        offset + 57
      ),
      attackBasedXSpeed: readFloat(
        rawData,
        32,
        replayVersion,
        "3.5.0.0",
        offset + 61
      ),
      attackBasedYSpeed: readFloat(
        rawData,
        32,
        replayVersion,
        "3.5.0.0",
        offset + 65
      ),
      selfInducedGroundXSpeed: readFloat(
        rawData,
        32,
        replayVersion,
        "3.5.0.0",
        offset + 69
      ),
      hitlagRemaining: readFloat(
        rawData,
        32,
        replayVersion,
        "3.8.0.0",
        offset + 73
      ),
      isReflectActive: Boolean(stateBitfield1 & 16),
      isFastfalling: Boolean(stateBitfield2 & 8),
      isShieldActive: Boolean(stateBitfield3 & 128),
      isInHitstun: Boolean(stateBitfield4 & 2),
      isHittingShield: Boolean(stateBitfield4 & 4),
      isPowershieldActive: Boolean(stateBitfield4 & 32),
      isDead: Boolean(stateBitfield5 & 64),
      isOffscreen: Boolean(stateBitfield5 & 128)
    };
  }
  function parseItemUpdateEvent(rawData, offset, replayVersion) {
    return {
      frameNumber: readInt(rawData, 32, replayVersion, "3.0.0.0", offset + 1) + 123,
      typeId: readUint(rawData, 16, replayVersion, "3.0.0.0", offset + 5),
      state: readUint(rawData, 8, replayVersion, "3.0.0.0", offset + 7),
      facingDirection: readFloat(
        rawData,
        32,
        replayVersion,
        "3.0.0.0",
        offset + 8
      ),
      xVelocity: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 12),
      yVelocity: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 16),
      xPosition: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 20),
      yPosition: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 24),
      damageTaken: readUint(rawData, 16, replayVersion, "3.0.0.0", offset + 28),
      expirationTimer: readFloat(
        rawData,
        32,
        replayVersion,
        "3.0.0.0",
        offset + 30
      ),
      spawnId: readUint(rawData, 32, replayVersion, "3.0.0.0", offset + 34),
      samusMissileType: readUint(
        rawData,
        8,
        replayVersion,
        "3.2.0.0",
        offset + 38
      ),
      peachTurnipFace: readUint(
        rawData,
        8,
        replayVersion,
        "3.2.0.0",
        offset + 39
      ),
      isChargeShotLaunched: Boolean(
        readUint(rawData, 8, replayVersion, "3.2.0.0", offset + 40)
      ),
      chargeShotChargeLevel: readUint(
        rawData,
        8,
        replayVersion,
        "3.2.0.0",
        offset + 41
      ),
      owner: readInt(rawData, 8, replayVersion, "3.6.0.0", offset + 42)
    };
  }
  function parseFodPlatformsEvent(rawData, offset, replayVersion) {
    return {
      frameNumber: readInt(rawData, 32, replayVersion, "3.18.0.0", offset + 1) + 123,
      platform: readUint(rawData, 8, replayVersion, "3.18.0.0", offset + 5),
      height: readFloat(
        rawData,
        32,
        replayVersion,
        "3.18.0.0",
        offset + 6
      )
    };
  }
  function parseGameEndEvent(rawData, offset, replayVersion) {
    const gameEndCode = readUint(
      rawData,
      8,
      replayVersion,
      "0.1.0.0",
      offset + 1
    );
    const quitInitiator = readInt(
      rawData,
      8,
      replayVersion,
      "2.0.0.0",
      offset + 2
    );
    if (gameEndCode === 0 || gameEndCode === 3) {
      return {
        oldGameEndMethod: gameEndCode === 3 ? "resolved" : "unresolved",
        quitInitiator
      };
    } else {
      return {
        gameEndMethod: gameEndCode === 1 ? "TIME!" : gameEndCode === 2 ? "GAME!" : "No Contest",
        quitInitiator
      };
    }
  }
  function readUint(rawData, size, replayVersion, firstVersionPresent, offset) {
    if (!isInVersion(replayVersion, firstVersionPresent)) {
      return void 0;
    }
    switch (size) {
      case 8:
        return rawData.getUint8(offset);
      case 16:
        return rawData.getUint16(offset);
      case 32:
        return rawData.getUint32(offset);
    }
  }
  function readFloat(rawData, size, replayVersion, firstVersionPresent, offset) {
    if (!isInVersion(replayVersion, firstVersionPresent)) {
      return void 0;
    }
    switch (size) {
      case 32:
        return rawData.getFloat32(offset);
      case 64:
        return rawData.getFloat64(offset);
    }
  }
  function readInt(rawData, size, replayVersion, firstVersionPresent, offset) {
    if (!isInVersion(replayVersion, firstVersionPresent)) {
      return void 0;
    }
    switch (size) {
      case 8:
        return rawData.getInt8(offset);
      case 16:
        return rawData.getInt16(offset);
      case 32:
        return rawData.getInt32(offset);
    }
  }
  function readShiftJisString(rawData, replayVersion, firstVersionPresent, offset, maxLength) {
    if (!isInVersion(replayVersion, firstVersionPresent)) {
      return void 0;
    }
    const shiftJisBytes = new Uint8Array(maxLength);
    let charNum = 0;
    do {
      shiftJisBytes[charNum] = rawData.getUint8(offset + charNum * 1);
      charNum++;
    } while (charNum < maxLength && shiftJisBytes[charNum - 1] !== 0);
    if (shiftJisBytes[0] !== 0) {
      const decoder = new TextDecoder("shift-jis");
      return toHalfWidth(decoder.decode(shiftJisBytes.subarray(0, charNum - 1)));
    }
    return "";
  }
  function isInVersion(replayVersion, firstVersionPresent) {
    const replayVersionParts = replayVersion.split(".");
    const firstVersionParts = firstVersionPresent.split(".");
    for (let i = 0; i < replayVersionParts.length; i++) {
      const replayVersionPart = parseInt(replayVersionParts[i]);
      const firstVersionPart = parseInt(firstVersionParts[i]);
      if (replayVersionPart > firstVersionPart) return true;
      if (replayVersionPart < firstVersionPart) return false;
    }
    return true;
  }
  function toHalfWidth(s2) {
    return s2.replace(/[！-～]/g, function(r2) {
      return String.fromCharCode(r2.charCodeAt(0) - 65248);
    });
  }

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var u32 = Uint32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start3) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
      b[i] = start3 += 1 << eb[i - 1];
    }
    var r2 = new u32(b[30]);
    for (var i = 1; i < 30; ++i) {
      for (var j = b[i]; j < b[i + 1]; ++j) {
        r2[j] = j - b[i] << 5 | i;
      }
    }
    return [b, r2];
  };
  var _a = freb(fleb, 2);
  var fl = _a[0];
  var revfl = _a[1];
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b[0];
  var revfd = _b[1];
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >>> 1 | (i & 21845) << 1;
    x = (x & 52428) >>> 2 | (x & 13107) << 2;
    x = (x & 61680) >>> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
  }
  var x;
  var i;
  var hMap = function(cd, mb, r2) {
    var s2 = cd.length;
    var i = 0;
    var l = new u16(mb);
    for (; i < s2; ++i) {
      if (cd[i])
        ++l[cd[i] - 1];
    }
    var le = new u16(mb);
    for (i = 0; i < mb; ++i) {
      le[i] = le[i - 1] + l[i - 1] << 1;
    }
    var co;
    if (r2) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i = 0; i < s2; ++i) {
        if (cd[i]) {
          var sv = i << 4 | cd[i];
          var r_1 = mb - cd[i];
          var v = le[cd[i] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >>> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s2);
      for (i = 0; i < s2; ++i) {
        if (cd[i]) {
          co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
        }
      }
    }
    return co;
  };
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
      if (a[i] > m)
        m = a[i];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s2, e) {
    if (s2 == null || s2 < 0)
      s2 = 0;
    if (e == null || e > v.length)
      e = v.length;
    var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s2);
    n.set(v.subarray(s2, e));
    return n;
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, buf, st) {
    var sl = dat.length;
    if (!sl || st && st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf || st;
    var noSt = !st || st.i;
    if (!st)
      st = {};
    if (!buf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s2 = shft(pos) + 4, l = dat[s2 - 4] | dat[s2 - 3] << 8, t = s2 + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + l);
          buf.set(dat.subarray(s2, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i = 0; i < hcLen; ++i) {
            clt[clim[i]] = bits(dat, pos + i * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i = 0; i < tl; ) {
            var r2 = clm[bits(dat, pos, clbmsk)];
            pos += r2 & 15;
            var s2 = r2 >>> 4;
            if (s2 < 16) {
              ldt[i++] = s2;
            } else {
              var c = 0, n = 0;
              if (s2 == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
              else if (s2 == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s2 == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (noBuf)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i = sym - 257, b = fleb[i];
            add = bits(dat, pos, (1 << b) - 1) + fl[i];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + 131072);
          var end = bt + add;
          for (; bt < end; bt += 4) {
            buf[bt] = buf[bt - dt];
            buf[bt + 1] = buf[bt + 1 - dt];
            buf[bt + 2] = buf[bt + 2 - dt];
            buf[bt + 3] = buf[bt + 3 - dt];
          }
          bt = end;
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
  };
  var b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
  };
  var b8 = function(d, b) {
    return b4(d, b) + b4(d, b + 4) * 4294967296;
  };
  function inflateSync(data, out) {
    return inflt(data, out);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  var dutf8 = function(d) {
    for (var r2 = "", i = 0; ; ) {
      var c = d[i++];
      var eb = (c > 127) + (c > 223) + (c > 239);
      if (i + eb > d.length)
        return [r2, slc(d, i - 1)];
      if (!eb)
        r2 += String.fromCharCode(c);
      else if (eb == 3) {
        c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r2 += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
      } else if (eb & 1)
        r2 += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
      else
        r2 += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
    }
  };
  function strFromU8(dat, latin1) {
    if (latin1) {
      var r2 = "";
      for (var i = 0; i < dat.length; i += 16384)
        r2 += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
      return r2;
    } else if (td)
      return td.decode(dat);
    else {
      var _a2 = dutf8(dat), out = _a2[0], ext = _a2[1];
      if (ext.length)
        err(8);
      return out;
    }
  }
  var slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
  };
  var zh = function(d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  var z64e = function(d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
      ;
    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 101010256; --e) {
      if (!e || data.length - e > 65558)
        err(13);
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
      return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    for (var i = 0; i < c; ++i) {
      var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_2
      })) {
        if (!c_2)
          files[fn] = slc(data, b, b + sc);
        else if (c_2 == 8)
          files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
        else
          err(14, "unknown compression type " + c_2);
      }
    }
    return files;
  }

  // src/viewer/animationFrame.ts
  var sourceFrameCountByCharAndMsid = /* @__PURE__ */ new Map([
    ["1:2", 120],
    ["1:3", 120],
    ["22:2", 240],
    ["22:3", 264]
  ]);
  function sourceFrameCount(internalCharacterId, animationIndex) {
    if (animationIndex === void 0) return void 0;
    return sourceFrameCountByCharAndMsid.get(`${internalCharacterId}:${animationIndex}`);
  }
  function visualFrameCount(animationName, animationFrames) {
    if (animationFrames === void 0 || animationFrames.length === 0) return 1;
    if (animationName === "Wait1") {
      let n = animationFrames.length;
      while (n > 1 && animationFrames[n - 1] === "frame0") n -= 1;
      return n;
    }
    return animationFrames.length;
  }
  function animationFrameIndex({
    animationName,
    internalCharacterId,
    animationIndex,
    actionStateFrameCounter,
    animationFrames,
    loopAfterSourceEnd = false
  }) {
    const frameCount = visualFrameCount(animationName, animationFrames);
    if (frameCount <= 0) return 0;
    const frame = Math.floor(Math.max(0, actionStateFrameCounter));
    if (animationName === "Wait1") {
      const sourceFrames = sourceFrameCount(internalCharacterId, animationIndex);
      if (sourceFrames !== void 0) {
        const sourceLast = sourceFrames - 1;
        const visualLast = frameCount - 1;
        const sourceFrame = loopAfterSourceEnd ? frame % sourceFrames : Math.min(frame, sourceLast);
        return Math.min(visualLast, Math.floor(sourceFrame * visualLast / sourceLast));
      }
    }
    return frame % frameCount;
  }

  // src/viewer/characters/bowser.ts
  var bowser = {
    scale: 0.69,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 0.69 * 31.25,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialNStart"],
      [342, "SpecialN"],
      [343, "SpecialNEnd"],
      [344, "SpecialAirNStart"],
      [345, "SpecialAirN"],
      [346, "SpecialAirNEnd"],
      [347, "SpecialSStart"],
      [348, "SpecialSHit"],
      [349, "SpecialSHit"],
      [350, "SpecialSHit"],
      [351, "SpecialSEndF"],
      [352, "SpecialSEndB"],
      [353, "SpecialAirSStart"],
      [354, "SpecialAirSHit"],
      [355, "SpecialAirSHit"],
      [356, "SpecialAirSHit"],
      [357, "SpecialAirSEndF"],
      [358, "SpecialAirSEndB"],
      [359, "SpecialHi"],
      [360, "SpecialAirHi"],
      [361, "SpecialLw"],
      [362, "SpecialAirLw"],
      [363, "SpecialLwLanding"]
    ])
  };

  // src/viewer/characters/captainFalcon.ts
  var captainFalcon = {
    scale: 0.97,
    shieldOffset: [0.2, 10.447],
    shieldSize: 0.97 * 15,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["CliffWait", "CliffWait1"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [347, "SpecialN"],
      [348, "SpecialAirN"],
      [349, "SpecialSStart"],
      [350, "SpecialS"],
      [351, "SpecialAirSStart"],
      [352, "SpecialAirS"],
      [353, "SpecialHi"],
      [354, "SpecialAirHi"],
      [355, "SpecialHiCatch"],
      [356, "SpecialHiThrow"],
      [357, "SpecialLw"],
      [358, "SpecialLwEnd"],
      [359, "SpecialAirLw"],
      [360, "SpecialAirLwEnd"],
      [361, "SpecialAirLwEndAir"],
      [362, "SpecialLwEndAir"],
      [363, "SpecialHiThrow"]
    ])
  };

  // src/viewer/characters/doctorMario.ts
  var doctorMario = {
    scale: 1.1,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1.1 * 10.75,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "Appeal"],
      [343, "SpecialN"],
      [344, "SpecialAirN"],
      [345, "SpecialS"],
      [346, "SpecialSAir"],
      [347, "SpecialHi"],
      [348, "SpecialAirHi"],
      [349, "SpecialLw"],
      [350, "SpecialAirLw"]
    ])
  };

  // src/viewer/characters/donkeyKong.ts
  var donkeyKong = {
    scale: 1,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1 * 17.75,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [351, "ThrowFWait"],
      [352, "ThrowFWalkSlow"],
      [353, "ThrowFWalkMiddle"],
      [354, "ThrowFWalkFast"],
      [355, "ThrowFTurn"],
      [356, "ThrowFWait"],
      // jump squat
      [357, "ThrowFWait"],
      // fall
      [358, "ThrowFWait"],
      // jump
      [359, "ThrowFWait"],
      // landing
      [360, ""],
      // unused
      [361, "ThrowFF"],
      [362, "ThrowFB"],
      [363, "ThrowFHi"],
      [364, "ThrowFLw"],
      [365, "ThrowFF"],
      [366, "ThrowFB"],
      [367, "ThrowFHi"],
      [368, "ThrowFLw"],
      [369, "SpecialNStart"],
      [370, "SpecialNLoop"],
      [371, "SpecialNCansel"],
      [372, "SpecialN"],
      [373, "SpecialN"],
      [374, "SpecialAirNStart"],
      [375, "SpecialAirNLoop"],
      [376, "SpecialAirNCansel"],
      [377, "SpecialAirN"],
      [378, "SpecialAirN"],
      [379, "SpecialS"],
      [380, "SpecialAirS"],
      [381, "SpecialHi"],
      [382, "SpecialAirHi"],
      [383, "SpecialLwStart"],
      [384, "SpecialLwLoop"],
      [385, "SpecialLwEnd"]
    ])
  };

  // src/viewer/characters/falco.ts
  var falco = {
    scale: 1.1,
    shieldOffset: [2.724, 9.003],
    shieldSize: 1.1 * 12.5,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialNStart"],
      [342, "SpecialNLoop"],
      [343, "SpecialNEnd"],
      [344, "SpecialAirNStart"],
      [345, "SpecialAirNLoop"],
      [346, "SpecialAirNEnd"],
      [347, "SpecialSStart"],
      [348, "SpecialS"],
      [349, "SpecialSEnd"],
      [350, "SpecialAirSStart"],
      [351, "SpecialAirS"],
      [352, "SpecialAirSEnd"],
      [353, "SpecialHiHold"],
      [354, "SpecialHiHoldAir"],
      [355, "SpecialHi"],
      [356, "SpecialHi"],
      [357, "SpecialHiLanding"],
      [358, "SpecialHiFall"],
      [359, "SpecialHiBound"],
      [360, "SpecialLwStart"],
      [361, "SpecialLwLoop"],
      [362, "SpecialLwHit"],
      [363, "SpecialLwEnd"],
      [364, "SpecialLw2"],
      [365, "SpecialAirLwStart"],
      [366, "SpecialAirLwLoop"],
      [367, "SpecialAirLwHit"],
      [368, "SpecialAirLwEnd"],
      [369, "SpecialAirLwLoop"],
      [370, "AppealSStartR"],
      [371, "AppealSStartL"],
      [372, "AppealSR"],
      [373, "AppealSL"],
      [374, "AppealSEndR"],
      [375, "AppealSEndL"]
    ])
  };

  // src/viewer/characters/fox.ts
  var fox = {
    scale: 0.96,
    shieldOffset: [2.724, 9.003],
    // model units
    shieldSize: 0.96 * 14.375,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialNStart"],
      [342, "SpecialNLoop"],
      [343, "SpecialNEnd"],
      [344, "SpecialAirNStart"],
      [345, "SpecialAirNLoop"],
      [346, "SpecialAirNEnd"],
      [347, "SpecialSStart"],
      [348, "SpecialS"],
      [349, "SpecialSEnd"],
      [350, "SpecialAirSStart"],
      [351, "SpecialAirS"],
      [352, "SpecialAirSEnd"],
      [353, "SpecialHiHold"],
      [354, "SpecialHiHoldAir"],
      [355, "SpecialHi"],
      [356, "SpecialHi"],
      [357, "SpecialHiLanding"],
      [358, "SpecialHiFall"],
      [359, "SpecialHiBound"],
      [360, "SpecialLwStart"],
      [361, "SpecialLwLoop"],
      [362, "SpecialLwHit"],
      [363, "SpecialLwEnd"],
      [364, "SpecialLwLoop"],
      [365, "SpecialAirLwStart"],
      [366, "SpecialAirLwLoop"],
      [367, "SpecialAirLwHit"],
      [368, "SpecialAirLwEnd"],
      [369, "SpecialAirLwLoop"],
      [370, "AppealSStartR"],
      [371, "AppealSStartL"],
      [372, "AppealSR"],
      [373, "AppealSL"],
      [374, "AppealSEndR"],
      [375, "AppealSEndL"]
    ])
  };

  // src/viewer/characters/ganondorf.ts
  var ganondorf = {
    scale: 1.08,
    shieldOffset: [0.2, 10.447],
    // TODO
    shieldSize: 1.08 * 15,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["CliffWait", "CliffWait1"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, ""],
      [342, ""],
      [343, ""],
      [344, ""],
      [345, ""],
      [346, ""],
      [347, "SpecialN"],
      [348, "SpecialAirN"],
      [349, "SpecialSStart"],
      [350, "SpecialS"],
      [351, "SpecialAirSStart"],
      [352, "SpecialAirS"],
      [353, "SpecialHi"],
      [354, "SpecialAirHi"],
      [355, "SpecialHiCatch"],
      [356, "SpecialHiThrow"],
      [357, "SpecialLw"],
      [358, "SpecialLwEnd"],
      [359, "SpecialAirLw"],
      [360, "SpecialAirLwEnd"],
      [361, "SpecialAirLwEndAir"],
      [362, "SpecialLwEndAir"],
      [363, "SpecialHiThrow"]
    ])
  };

  // src/viewer/characters/iceClimbers.ts
  var iceClimbers = {
    scale: 1.15,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1.15 * 10.75,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialN"],
      [342, "SpecialAirN"],
      [343, "SpecialS1"],
      [344, "SpecialS2"],
      [345, "SpecialAirS1"],
      [346, "SpecialAirS2"],
      [347, "SpecialHiStart"],
      // popo throwing nana
      [348, "SpecialHiThrow"],
      // popo animation while nana flies up
      [349, ""],
      [350, "SpecialHiStart"],
      // failed
      [351, "SpecialHiThrow"],
      // failed 2
      [352, "SpecialAirHiStart"],
      // pop throwing nana in the air
      [353, "SpecialAirHiThrow"],
      // popo air animation while nana flies up
      [354, "SpecialAirHiThrow2"],
      // popo flying up pulled by nana
      [355, "SpecialAirHiStart"],
      // failed air
      [356, "SpecialAirHiThrow"],
      // failed air 2
      [357, "SpecialLw"],
      [358, "SpecialAirLw"],
      [359, "NanaSpecialS2"],
      [360, "NanaSpecialAirS2"],
      [361, "NanaSpecialHiStart"],
      // nana getting ready to be thrown
      [362, "NanaSpecialAirHiThrow"],
      [363, ""],
      [364, ""],
      [365, "NanaSpecialHiThrow"]
      // nana being thrown by popo
    ])
  };

  // src/viewer/characters/jigglypuff.ts
  var jigglypuff = {
    scale: 0.94,
    shieldOffset: [0, 4.828],
    shieldSize: 0.94 * 13.125,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "JumpAerialF1"],
      [342, "JumpAerialF2"],
      [343, "JumpAerialF3"],
      [344, "JumpAerialF4"],
      [345, "JumpAerialF5"],
      [346, "SpecialNStartR"],
      [347, "SpecialNStartL"],
      [348, "SpecialN"],
      [349, "SpecialN"],
      [350, "SpecialN"],
      [351, "SpecialN"],
      [352, "SpecialNEndR"],
      [353, "SpecialNEndL"],
      [354, "SpecialAirNStartR"],
      [355, "SpecialAirNStartL"],
      [356, "SpecialN"],
      [357, "SpecialN"],
      [358, "SpecialN"],
      [359, "SpecialN"],
      [360, "SpecialAirNEndR"],
      [361, "SpecialAirNEndL"],
      [362, "DamageFall"],
      [363, "SpecialS"],
      [364, "SpecialAirS"],
      [365, "SpecialHiL"],
      [366, "SpecialAirHiL"],
      [367, "SpecialHiR"],
      [368, "SpecialAirHiR"],
      [369, "SpecialLwL"],
      [370, "SpecialAirLwL"],
      [371, "SpecialLwR"],
      [372, "SpecialAirLwR"]
    ])
  };

  // src/viewer/characters/kirby.ts
  var kirby = {
    scale: 0.92,
    shieldOffset: [0, 4.828],
    shieldSize: 0.92 * 14.7,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["SquatWait", "SquatWait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "JumpAerialF1"],
      [342, "JumpAerialF2"],
      [343, "JumpAerialF3"],
      [344, "JumpAerialF4"],
      [345, "JumpAerialF5"],
      [346, "JumpAerialF1Met"],
      [347, "JumpAerialF2Met"],
      [348, "JumpAerialF3Met"],
      [349, "JumpAerialF4Met"],
      [350, "JumpAerialF5Met"],
      [351, "AttackDash"],
      [352, "AttackDash"],
      [353, "SpecialN"],
      // Ground Startup (Drink?)
      [354, "SpecialNLoop"],
      [355, "SpecialNEnd"],
      [356, "Eat"],
      // Capture (Eat?)
      [357, ""],
      // ???
      [358, ""],
      // Captured (used as swallowed character state? or is that ThrownKirby?)
      [359, "EatWait"],
      [360, "EatWalkSlow"],
      [361, "EatWalkMiddle"],
      [362, "EatWalkFast"],
      [363, "EatTurn"],
      [364, "EatLanding"],
      [365, "EatJump1"],
      [366, "EatLanding"],
      [367, "SpecialNDrink"],
      // Digest (Drink?)
      [368, ""],
      // ???
      [369, "SpecialNSpit"],
      // Spit
      [370, ""],
      // ???
      [371, "SpecialN"],
      // Air Startup (Drink?)
      [372, "SpecialNLoop"],
      [373, "SpecialNEnd"],
      [374, "Eat"],
      // Air Capture (Eat?)
      [375, ""],
      // ???
      [376, ""],
      // Air Captured (see 358)
      [377, "EatWait"],
      [378, "SpecialNDrink"],
      // Air Digest (Drink?)
      [379, ""],
      // ???
      [380, "SpecialNSpit"],
      // Air Spit
      [381, ""],
      // ???
      [382, "EatTurn"],
      [383, "SpecialS"],
      [384, "SpecialAirS"],
      [385, "SpecialHi1"],
      [386, "SpecialHi2"],
      [387, "SpecialHi3"],
      [388, "SpecialHi4"],
      [389, "SpecialAirHi1"],
      [390, "SpecialAirHi2"],
      [391, "SpecialAirHi3"],
      [392, "SpecialAirHi4"],
      [393, "SpecialLw1"],
      [394, "SpecialLw1"],
      [395, "SpecialLw2"],
      [396, "SpecialAirLw1"],
      [397, "SpecialAirLw1"],
      [398, "SpecialAirLw2"],
      // 399 - 543 are the copy-ability neutral specials, in ftKb_MotionState
      // order. Names map to the Slippi Lab kirby.zip where it ships the hat
      // animation; the rest fall back to the plain inhale pose so Kirby stays
      // visible.
      [399, "MrSpecialN"],
      [400, "MrSpecialAirN"],
      [401, "LkSpecialNStart"],
      [402, "LkSpecialNLoop"],
      [403, "LkSpecialNEnd"],
      [404, "LkSpecialAirNStart"],
      [405, "LkSpecialAirNLoop"],
      [406, "LkSpecialAirNEnd"],
      [407, "SsSpecialNStart"],
      [408, "SsSpecialNHold"],
      [409, "SsSpecialNCancel"],
      [410, "SsSpecialN"],
      [411, "SsSpecialAirNStart"],
      [412, "SsSpecialAirN"],
      [413, "YsSpecialN1"],
      [414, "SpecialN"],
      // YsSpecialNCapture1_0 (no asset)
      [415, "SpecialN"],
      // YsSpecialNCapture1_1 (no asset)
      [416, "SpecialN"],
      // YsSpecialNCapture2_0 (no asset)
      [417, "SpecialN"],
      // YsSpecialNCapture2_1 (no asset)
      [418, "SpecialN"],
      // YsSpecialAirNCapture2 (no asset)
      [419, "SpecialN"],
      // YsSpecialAirNCapture1_0 (no asset)
      [420, "SpecialN"],
      // YsSpecialAirNCapture1_1 (no asset)
      [421, "YsSpecialAirN2"],
      // YsSpecialAirN2_0
      [422, "YsSpecialAirN2"],
      // YsSpecialAirN2_1
      [423, "FxSpecialNStart"],
      [424, "FxSpecialNLoop"],
      [425, "FxSpecialNEnd"],
      [426, "FxSpecialAirNStart"],
      [427, "FxSpecialAirNLoop"],
      [428, "FxSpecialAirNEnd"],
      [429, "PkSpecialN"],
      [430, "PkSpecialAirN"],
      [431, "LgSpecialN"],
      [432, "LgSpecialAirN"],
      [433, "CaSpecialN"],
      [434, "CaSpecialAirN"],
      [435, "NsSpecialNStart"],
      [436, "NsSpecialNHold"],
      // NsSpecialNHold0
      [437, "NsSpecialNHold"],
      // NsSpecialNHold1
      [438, "NsSpecialNEnd"],
      [439, "NsSpecialAirNStart"],
      [440, "NsSpecialAirNHold"],
      // NsSpecialAirNHold0
      [441, "NsSpecialAirNHold"],
      // NsSpecialAirNHold1
      [442, "NsSpecialAirNEnd"],
      [443, "KpSpecialNStart"],
      [444, "KpSpecialN"],
      [445, "KpSpecialNEnd"],
      [446, "KpSpecialAirNStart"],
      [447, "KpSpecialAirN"],
      [448, "KpSpecialAirNEnd"],
      [449, "PeSpecialLw"],
      [450, "PeSpecialLwHit"],
      [451, "PeSpecialAirLw"],
      [452, "PeSpecialAirLwHit"],
      [453, "PpSpecialN"],
      [454, "PpSpecialAirN"],
      [455, "DkSpecialNStart"],
      [456, "DkSpecialNLoop"],
      [457, "DkSpecialNCansel"],
      // DkSpecialNCancel
      [458, "DkSpecialN"],
      [459, "SpecialN"],
      // DkSpecialNFull (no asset)
      [460, "DkSpecialAirNStart"],
      [461, "DkSpecialAirNLoop"],
      [462, "DkSpecialAirNCancel"],
      [463, "DkSpecialAirN"],
      [464, "SpecialN"],
      // DkSpecialAirNFull (no asset)
      [465, "ZdSpecialN"],
      [466, "ZdSpecialAirN"],
      [467, "SkSpecialNStart"],
      [468, "SkSpecialNLoop"],
      [469, "SkSpecialNCancel"],
      [470, "SkSpecialNEnd"],
      [471, "SkSpecialAirNStart"],
      [472, "SkSpecialAirNLoop"],
      [473, "SkSpecialAirNCancel"],
      [474, "SkSpecialAirNEnd"],
      [475, "SpecialN"],
      // PrSpecialNStartR (no asset)
      [476, "SpecialN"],
      // PrSpecialNStartL (no asset)
      [477, "SpecialN"],
      // PrSpecialNLoop (no asset)
      [478, "SpecialN"],
      // PrSpecialNFull (no asset)
      [479, "SpecialN"],
      // PrSpecialN1 (no asset)
      [480, "SpecialN"],
      // PrSpecialNTurn (no asset)
      [481, "SpecialN"],
      // PrSpecialNEndR (no asset)
      [482, "SpecialN"],
      // PrSpecialNEndL (no asset)
      [483, "SpecialN"],
      // PrSpecialAirNStartR (no asset)
      [484, "SpecialN"],
      // PrSpecialAirNStartL (no asset)
      [485, "SpecialN"],
      // PrSpecialAirNLoop (no asset)
      [486, "SpecialN"],
      // PrSpecialAirNFull (no asset)
      [487, "SpecialN"],
      // PrSpecialAirN (no asset)
      [488, "SpecialN"],
      // PrSpecialN0 (no asset)
      [489, "SpecialN"],
      // PrSpecialAirNEndR0 (no asset)
      [490, "SpecialN"],
      // PrSpecialAirNEndR1 (no asset)
      [491, "SpecialN"],
      // PrSpecialNHit (no asset)
      [492, "MsSpecialNStart"],
      [493, "MsSpecialNLoop"],
      [494, "MsSpecialNEnd"],
      // MsSpecialNEnd0
      [495, "MsSpecialNEnd"],
      // MsSpecialNEnd1
      [496, "MsSpecialAirNStart"],
      [497, "MsSpecialAirNLoop"],
      [498, "MsSpecialAirNEnd"],
      // MsSpecialAirNEnd0
      [499, "MsSpecialAirNEnd"],
      // MsSpecialAirNEnd1
      [500, "SpecialN"],
      // MtSpecialNStart (no asset)
      [501, "SpecialN"],
      // MtSpecialNLoop (no asset)
      [502, "SpecialN"],
      // MtSpecialNLoopFull (no asset)
      [503, "SpecialN"],
      // MtSpecialNCancel (no asset)
      [504, "SpecialN"],
      // MtSpecialNEnd (no asset)
      [505, "SpecialN"],
      // MtSpecialAirNStart (no asset)
      [506, "SpecialN"],
      // MtSpecialAirNLoop (no asset)
      [507, "SpecialN"],
      // MtSpecialAirNLoopFull (no asset)
      [508, "SpecialN"],
      // MtSpecialAirNCancel (no asset)
      [509, "SpecialN"],
      // MtSpecialAirNEnd (no asset)
      [510, "GwSpecialN"],
      [511, "GwSpecialAirN"],
      [512, "SpecialN"],
      // DrSpecialN (no asset)
      [513, "SpecialN"],
      // DrSpecialAirN (no asset)
      [514, "SpecialN"],
      // ClSpecialNStart (no asset)
      [515, "SpecialN"],
      // ClSpecialNLoop (no asset)
      [516, "SpecialN"],
      // ClSpecialNEnd (no asset)
      [517, "SpecialN"],
      // ClSpecialAirNStart (no asset)
      [518, "SpecialN"],
      // ClSpecialAirNLoop (no asset)
      [519, "SpecialN"],
      // ClSpecialAirNEnd (no asset)
      [520, "FcSpecialNStart"],
      [521, "FcSpecialNLoop"],
      [522, "FcSpecialNEnd"],
      [523, "FcSpecialAirNStart"],
      [524, "FcSpecialAirNLoop"],
      [525, "FcSpecialAirNEnd"],
      [526, "SpecialN"],
      // PcSpecialN (no asset)
      [527, "SpecialN"],
      // PcSpecialAirN (no asset)
      [528, "GnSpecialN"],
      [529, "GnSpecialAirN"],
      [530, "SpecialN"],
      // FeSpecialNStart (no asset)
      [531, "SpecialN"],
      // FeSpecialNLoop (no asset)
      [532, "SpecialN"],
      // FeSpecialNEnd0 (no asset)
      [533, "SpecialN"],
      // FeSpecialNEnd1 (no asset)
      [534, "SpecialN"],
      // FeSpecialAirNStart (no asset)
      [535, "SpecialN"],
      // FeSpecialAirNLoop (no asset)
      [536, "SpecialN"],
      // FeSpecialAirNEnd0 (no asset)
      [537, "SpecialN"],
      // FeSpecialAirNEnd1 (no asset)
      [538, "SpecialN"],
      // GkSpecialNStart (no asset)
      [539, "SpecialN"],
      // GkSpecialN (no asset)
      [540, "SpecialN"],
      // GkSpecialNEnd (no asset)
      [541, "SpecialN"],
      // GkSpecialAirNStart (no asset)
      [542, "SpecialN"],
      // GkSpecialAirN (no asset)
      [543, "SpecialN"]
      // GkSpecialAirNEnd (no asset)
    ])
  };

  // src/viewer/characters/link.ts
  var link = {
    scale: 1.22,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1.22 * 11.625,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS41"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "AttackS42"],
      [342, ""],
      [343, ""],
      [344, "SpecialNStart"],
      [345, "SpecialNLoop"],
      [346, "SpecialNEnd"],
      [347, "SpecialAirNStart"],
      [348, "SpecialAirNLoop"],
      [349, "SpecialAirNEnd"],
      [350, "SpecialS1"],
      [351, "SpecialS2"],
      [352, "SpecialS1"],
      [353, "SpecialAirS1"],
      [354, "SpecialAirS2"],
      [355, "SpecialAirS1"],
      [356, "SpecialHi"],
      [357, "SpecialAirHi"],
      [358, "SpecialLw"],
      [359, "SpecialAirLw"],
      [360, "AirCatch"],
      [361, "AirCatchHit"]
    ])
  };

  // src/viewer/characters/luigi.ts
  var luigi = {
    scale: 1.25,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1.25 * 10.75,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialN"],
      [342, "SpecialAirN"],
      [343, "SpecialSStart"],
      [344, "SpecialSHold"],
      [345, "SpecialSHold"],
      // Unused
      [346, "SpecialSEnd"],
      [347, "SpecialS"],
      [348, "SpecialS"],
      [349, "SpecialAirSStart"],
      [350, "SpecialAirSHold"],
      [351, "SpecialS"],
      [352, "SpecialAirSEnd"],
      [353, "SpecialS"],
      [354, "SpecialS"],
      [355, "SpecialHi"],
      [356, "SpecialAirHi"],
      [357, "SpecialLw"],
      [358, "SpecialAirLw"]
    ])
  };

  // src/viewer/characters/mario.ts
  var mario = {
    scale: 1.1,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1.1 * 10.75,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [343, "SpecialN"],
      [344, "SpecialAirN"],
      [345, "SpecialS"],
      [346, "SpecialSAir"],
      [347, "SpecialHi"],
      [348, "SpecialAirHi"],
      [349, "SpecialLw"],
      [350, "SpecialAirLw"]
    ])
  };

  // src/viewer/characters/marth.ts
  var marth = {
    scale: 1.15,
    shieldOffset: [0.893, 7.257],
    shieldSize: 1.15 * 11.75,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS31"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialNStart"],
      [342, "SpecialNLoop"],
      [343, "SpecialNEnd"],
      [344, "SpecialNEnd"],
      [345, "SpecialAirNStart"],
      [346, "SpecialAirNLoop"],
      [347, "SpecialAirNEnd"],
      [348, "SpecialAirNEnd"],
      [349, "SpecialS1"],
      [350, "SpecialS2Hi"],
      [351, "SpecialS2Lw"],
      [352, "SpecialS3Hi"],
      [353, "SpecialS3S"],
      [354, "SpecialS3Lw"],
      [355, "SpecialS4Hi"],
      [356, "SpecialS4S"],
      [357, "SpecialS4Lw"],
      [358, "SpecialAirS1"],
      [359, "SpecialAirS2Hi"],
      [360, "SpecialAirS2Lw"],
      [361, "SpecialAirS3Hi"],
      [362, "SpecialAirS3S"],
      [363, "SpecialAirS3Lw"],
      [364, "SpecialAirS4Hi"],
      [365, "SpecialAirS4S"],
      [366, "SpecialAirS4Lw"],
      [367, "SpecialHi"],
      [368, "SpecialAirHi"],
      [369, "SpecialLw"],
      [370, "SpecialLwHit"],
      [371, "SpecialAirLw"],
      [372, "SpecialAirLwHit"]
    ])
  };

  // src/viewer/characters/mewtwo.ts
  var mewtwo = {
    scale: 1,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1 * 16.25,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialNStart"],
      [342, "SpecialNLoop"],
      [343, "SpecialNLoop"],
      [344, "SpecialNCancel"],
      [345, "SpecialNEnd"],
      [346, "SpecialAirNStart"],
      [347, "SpecialAirNLoop"],
      [348, "SpecialAirNLoop"],
      [349, "SpecialAirNCancel"],
      [350, "SpecialAirNEnd"],
      [351, "SpecialS"],
      [352, "SpecialAirS"],
      [353, "SpecialHiStart"],
      [354, "SpecialHiLost"],
      [355, "SpecialHi"],
      [356, "SpecialAirHiStart"],
      [357, "SpecialHiLost"],
      [358, "SpecialAirHi"],
      [359, "SpecialLw"],
      [360, "SpecialAirLw"]
    ])
  };

  // src/viewer/characters/mrGameAndWatch.ts
  var mrGameAndWatch = {
    scale: 1.02,
    shieldOffset: [0, 4.828],
    // TODO
    shieldSize: 1.02 * 10.75,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "Attack11"],
      [342, "Attack11"],
      [343, "Attack100Start"],
      [344, "Attack100End"],
      [345, "AttackLw3"],
      [346, "AttackS4"],
      [347, "AttackAirN"],
      [348, "AttackAirB"],
      [349, "AttackAirHi"],
      [350, "LandingAirN"],
      [351, "LandingAirB"],
      [352, "LandingAirHi"],
      [353, "SpecialN"],
      [354, "SpecialAirN"],
      [355, "SpecialS"],
      // 1
      [356, "SpecialS"],
      // 2
      [357, "SpecialS"],
      // 3
      [358, "SpecialS"],
      // 4
      [359, "SpecialS"],
      // 5
      [360, "SpecialS"],
      // 6
      [361, "SpecialS"],
      // 7
      [362, "SpecialS"],
      // 8
      [363, "SpecialS"],
      // 9
      [364, "SpecialAirS"],
      // 1
      [365, "SpecialAirS"],
      // 2
      [366, "SpecialAirS"],
      // 3
      [367, "SpecialAirS"],
      // 4
      [368, "SpecialAirS"],
      // 5
      [369, "SpecialAirS"],
      // 6
      [370, "SpecialAirS"],
      // 7
      [371, "SpecialAirS"],
      // 8
      [372, "SpecialAirS"],
      // 9
      [373, "SpecialHi"],
      [374, "SpecialAirHi"],
      [375, "SpecialLw"],
      [376, "SpecialLwCatch"],
      [377, "SpecialLwShoot"],
      [378, "SpecialAirLw"],
      [379, "SpecialAirLwCatch"],
      [380, "SpecialAirLwShoot"]
    ])
  };

  // src/viewer/characters/ness.ts
  var ness = {
    scale: 1,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1 * 13.75,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "AttackS4"],
      [342, "AttackHi4"],
      [343, "AttackHi4"],
      [344, "AttackHi4"],
      [345, "AttackLw4"],
      [346, "AttackLw4"],
      [347, "AttackLw4"],
      [348, "SpecialNStart"],
      [349, "SpecialNHold"],
      [350, "SpecialNEnd"],
      [351, "SpecialNEnd"],
      [352, "SpecialAirNStart"],
      [353, "SpecialAirNHold"],
      [354, "SpecialAirNEnd"],
      [355, "SpecialAirNEnd"],
      [356, "SpecialS"],
      [357, "SpecialAirS"],
      [358, "SpecialHiStart"],
      [359, "SpecialHiHold"],
      [360, "SpecialHiEnd"],
      [361, "SpecialHi"],
      [362, "SpecialAirHiStart"],
      [363, "SpecialAirHiHold"],
      [364, "SpecialAirHiEnd"],
      [365, "SpecialHi"],
      [366, "SpecialHi"],
      [367, "SpecialLwStart"],
      [368, "SpecialLwHold"],
      [369, "SpecialLwHit"],
      [370, "SpecialLwEnd"],
      [371, ""],
      [372, "SpecialAirLwStart"],
      [373, "SpecialAirLwHold"],
      [374, "SpecialAirLwHit"],
      [375, "SpecialAirLwEnd"],
      [376, ""]
    ])
  };

  // src/viewer/characters/peach.ts
  var peach = {
    scale: 1.15,
    shieldOffset: [5 / 4.5, 34 / 4.5],
    // guess
    shieldSize: 1.15 * 11.875,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "Fuwafuwa"],
      [342, "FallF"],
      [343, "FallB"],
      [344, "AttackAirN"],
      [345, "AttackAirF"],
      [346, "AttackAirB"],
      [347, "AttackAirHi"],
      [348, "AttackAirLw"],
      [349, "AttackS4"],
      // Golf
      [350, "AttackS4"],
      // Frying
      [351, "AttackS4"],
      // Tennis
      [352, "SpecialN"],
      [353, "SpecialAirN"],
      [354, "SpecialSStart"],
      [355, "SpecialSEnd"],
      [356, "Unsupported"],
      [357, "SpecialAirSStart"],
      [358, "SpecialAirSEnd"],
      [359, "SpecialAirS"],
      [360, "SpecialSJump"],
      [361, "SpecialHiStart"],
      [362, "SpecialHiEnd"],
      [363, "SpecialAirHiStart"],
      [364, "SpecialAirHiEnd"],
      [365, "SpecialLw"],
      [366, "SpecialLwHit"],
      [367, "SpecialAirLw"],
      [368, "SpecialAirLwHit"],
      [369, "ItemParasolOpen"],
      [370, "ItemParasolFall"]
    ])
  };

  // src/viewer/characters/pichu.ts
  var pichu = {
    scale: 0.5,
    shieldOffset: [2.724, 9.003],
    // TODO
    shieldSize: 0.5 * 24.3,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialN"],
      [342, "SpecialN"],
      [343, "SpecialSStart"],
      [344, "SpecialSHold"],
      [345, "UNSUPPORTED"],
      [346, "SpecialSEnd"],
      [347, "SpecialS"],
      [348, "SpecialAirSStart"],
      [349, "SpecialAirSHold"],
      [350, "SpecialS"],
      [351, "SpecialAirSEnd"],
      [352, "SpecialS"],
      [353, "SpecialHiStart"],
      [354, "SpecialHiStart"],
      [355, "SpecialHiEnd"],
      [356, "SpecialAirHiStart"],
      [357, "SpecialAirHiStart"],
      [358, "SpecialAirHiEnd"],
      [359, "SpecialLwStart"],
      [360, "SpecialLwLoop"],
      [361, "SpecialLwEnd"],
      [362, "SpecialLwEnd"],
      [363, "SpecialAirLwStart"],
      [364, "SpecialAirLwLoop"],
      [365, "SpecialAirLwEnd"],
      [366, "SpecialAirLwEnd"]
    ])
  };

  // src/viewer/characters/pikachu.ts
  var pikachu = {
    scale: 0.9,
    shieldOffset: [2.724, 9.003],
    // TODO
    shieldSize: 0.9 * 12,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialN"],
      [342, "SpecialN"],
      [343, "SpecialSStart"],
      [344, "SpecialSHold"],
      [345, "UNSUPPORTED"],
      [346, "SpecialSEnd"],
      [347, "SpecialS"],
      [348, "SpecialAirSStart"],
      [349, "SpecialAirSHold"],
      [350, "SpecialS"],
      [351, "SpecialAirSEnd"],
      [352, "SpecialS"],
      [353, "SpecialHiStart"],
      [354, "SpecialHiStart"],
      [355, "SpecialHiEnd"],
      [356, "SpecialAirHiStart"],
      [357, "SpecialAirHiStart"],
      [358, "SpecialAirHiEnd"],
      [359, "SpecialLwStart"],
      [360, "SpecialLwLoop"],
      [361, "SpecialLwEnd"],
      [362, "SpecialLwEnd"],
      [363, "SpecialAirLwStart"],
      [364, "SpecialAirLwLoop"],
      [365, "SpecialAirLwEnd"],
      [366, "SpecialAirLwEnd"]
    ])
  };

  // src/viewer/characters/roy.ts
  var roy = {
    scale: 1.08,
    shieldOffset: [0.893, 7.257],
    // TODO
    shieldSize: 1.08 * 11.75,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS31"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialNStart"],
      [342, "SpecialNLoop"],
      [343, "SpecialNEnd"],
      [344, "SpecialNEnd"],
      [345, "SpecialAirNStart"],
      [346, "SpecialAirNLoop"],
      [347, "SpecialAirNEnd"],
      [348, "SpecialAirNEnd"],
      [349, "SpecialS1"],
      [350, "SpecialS2Hi"],
      [351, "SpecialS2Lw"],
      [352, "SpecialS3Hi"],
      [353, "SpecialS3S"],
      [354, "SpecialS3Lw"],
      [355, "SpecialS4Hi"],
      [356, "SpecialS4S"],
      [357, "SpecialS4Lw"],
      [358, "SpecialAirS1"],
      [359, "SpecialAirS2Hi"],
      [360, "SpecialAirS2Lw"],
      [361, "SpecialAirS3Hi"],
      [362, "SpecialAirS3S"],
      [363, "SpecialAirS3Lw"],
      [364, "SpecialAirS4Hi"],
      [365, "SpecialAirS4S"],
      [366, "SpecialAirS4Lw"],
      [367, "SpecialHi"],
      [368, "SpecialAirHi"],
      [369, "SpecialLw"],
      [370, "SpecialLwHit"],
      [371, "SpecialAirLw"],
      [372, "SpecialAirLwHit"]
    ])
  };

  // src/viewer/characters/samus.ts
  var samus = {
    scale: 0.88,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 0.88 * 16.25,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4HiS"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4LwS"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialLw"],
      [342, "SpecialAirLw"],
      [343, "SpecialNStart"],
      [344, "SpecialNHold"],
      [345, "SpecialNCancel"],
      [346, "SpecialN"],
      [347, "SpecialAirNStart"],
      [348, "SpecialAirN"],
      [349, "SpecialS"],
      [350, "SpecialS"],
      [351, "SpecialAirS"],
      [352, "SpecialAirS"],
      [353, "SpecialHi"],
      [354, "SpecialAirHi"],
      [355, "SpecialLw"],
      [356, "SpecialAirLw"],
      [357, "AirCatch"],
      [358, "AirCatchHit"]
    ])
  };

  // src/viewer/characters/sheik.ts
  var sheik = {
    scale: 1.4,
    shieldOffset: [0.541, 6.969],
    shieldSize: 1.4 * 11.625,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "Appeal"],
      ["AppealR", "Appeal"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "GuardOn"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialNStart"],
      [342, "SpecialNLoop"],
      [343, "SpecialNCansel"],
      [344, "SpecialNEnd"],
      [345, "SpecialAirNStart"],
      [346, "SpecialAirNLoop"],
      [347, "SpecialAirNCansel"],
      [348, "SpecialAirNEnd"],
      [349, "SpecialSStart"],
      [350, "SpecialS"],
      [351, "SpecialSEnd"],
      [352, "SpecialAirSStart"],
      [353, "SpecialAirS"],
      [354, "SpecialAirSEnd"],
      [355, "SpecialHiStart"],
      [356, "Unsupported"],
      // Invisible
      [357, "SpecialHi"],
      [358, "SpecialAirHiStart"],
      [359, "Unsupported"],
      // Invisible
      [360, "SpecialAirHi"],
      [361, "SpecialLw"],
      [362, "SpecialLw2"],
      [363, "SpecialAirLw"],
      [364, "SpecialAirLw2"]
    ])
  };

  // src/viewer/characters/yoshi.ts
  var yoshi = {
    scale: 1.05,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 1.05 * 6,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "Guard"],
      [342, "Guard"],
      [343, "GuardOff"],
      [344, "GuardDamage"],
      [345, "GuardOn"],
      [346, "SpecialN1"],
      [347, "SpecialN2"],
      [348, ""],
      [349, "SpecialN2"],
      [350, ""],
      [351, "SpecialAirN1"],
      [352, "SpecialAirN2"],
      [353, ""],
      [354, "SpecialAirN2"],
      [355, ""],
      [356, "SpecialSStart"],
      [357, "SpecialSLoop"],
      [358, "SpecialSLoop"],
      [359, "SpecialSEnd"],
      [360, "SpecialAirSStart"],
      [361, "SpecialSLoop"],
      [362, "SpecialSLoop"],
      [363, "SpecialAirSEnd"],
      [364, "SpecialHi"],
      [365, "SpecialAirHi"],
      [366, "SpecialLw"],
      [367, "SpecialLwLanding"],
      [368, "SpecialAirLw"]
    ])
  };

  // src/viewer/characters/youngLink.ts
  var youngLink = {
    scale: 0.96,
    shieldOffset: [2.724, 9.003],
    // model units // TODO
    shieldSize: 0.96 * 11.625,
    // world units
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3Hi"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3Lw"],
      ["AttackS3S", "AttackS3"],
      ["AttackS4Hi", "AttackS4Hi"],
      ["AttackS4HiS", "AttackS4Hi"],
      ["AttackS4Lw", "AttackS4Lw"],
      ["AttackS4LwS", "AttackS4Lw"],
      ["AttackS4S", "AttackS41"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "AttackS42"],
      [342, "AppealR"],
      [343, "AppealL"],
      [344, "SpecialNStart"],
      [345, "SpecialNLoop"],
      [346, "SpecialNEnd"],
      [347, "SpecialAirNStart"],
      [348, "SpecialAirNLoop"],
      [349, "SpecialAirNEnd"],
      [350, "SpecialS1"],
      [351, "SpecialS2"],
      [352, "SpecialS1"],
      [353, "SpecialAirS1"],
      [354, "SpecialAirS2"],
      [355, "SpecialAirS1"],
      [356, "SpecialHi"],
      [357, "SpecialAirHi"],
      [358, "SpecialLw"],
      [359, "SpecialAirLw"],
      [360, "AirCatch"],
      [361, "AirCatchHit"]
    ])
  };

  // src/viewer/characters/zelda.ts
  var zelda = {
    scale: 1.26,
    shieldOffset: [0.541, 6.969],
    shieldSize: 1.26 * 11.875,
    animationMap: /* @__PURE__ */ new Map([
      ["AppealL", "AppealL"],
      ["AppealR", "AppealR"],
      ["AttackS3Hi", "AttackS3Hi"],
      ["AttackS3HiS", "AttackS3HiS"],
      ["AttackS3Lw", "AttackS3Lw"],
      ["AttackS3LwS", "AttackS3LwS"],
      ["AttackS3S", "AttackS3S"],
      ["AttackS4Hi", ""],
      ["AttackS4HiS", ""],
      ["AttackS4Lw", ""],
      ["AttackS4LwS", ""],
      ["AttackS4S", "AttackS4S"],
      ["BarrelWait", ""],
      ["Bury", ""],
      ["BuryJump", ""],
      ["BuryWait", ""],
      ["CaptureCaptain", ""],
      ["CaptureDamageKoopa", ""],
      ["CaptureDamageKoopaAir", ""],
      ["CaptureKirby", ""],
      ["CaptureKirbyYoshi", ""],
      ["CaptureKoopa", ""],
      ["CaptureKoopaAir", ""],
      ["CaptureMewtwo", ""],
      ["CaptureMewtwoAir", ""],
      ["CaptureWaitKirby", ""],
      ["CaptureWaitKoopa", ""],
      ["CaptureWaitKoopaAir", ""],
      ["CaptureYoshi", ""],
      ["CatchDashPull", "CatchWait"],
      ["CatchPull", "CatchWait"],
      ["DamageBind", ""],
      ["DamageIce", ""],
      ["DamageIceJump", "Fall"],
      ["DamageSong", ""],
      ["DamageSongRv", ""],
      ["DamageSongWait", ""],
      ["DeadDown", ""],
      ["DeadLeft", ""],
      ["DeadRight", ""],
      ["DeadUpFallHitCamera", ""],
      ["DeadUpFallHitCameraIce", ""],
      ["DeadUpFallIce", ""],
      ["DeadUpStar", ""],
      ["DeadUpStarIce", ""],
      ["DownReflect", ""],
      ["EntryEnd", "Entry"],
      ["EntryStart", "Entry"],
      ["Escape", "EscapeN"],
      ["FlyReflectCeil", ""],
      ["FlyReflectWall", "WallDamage"],
      ["Guard", "Guard"],
      ["GuardOff", "GuardOff"],
      ["GuardOn", "GuardOn"],
      ["GuardReflect", "Guard"],
      ["GuardSetOff", "GuardDamage"],
      ["ItemParasolDamageFall", ""],
      ["ItemParasolFall", ""],
      ["ItemParasolFallSpecial", ""],
      ["ItemParasolOpen", ""],
      ["KirbyYoshiEgg", ""],
      ["KneeBend", "Landing"],
      ["LandingFallSpecial", "Landing"],
      ["LiftTurn", ""],
      ["LiftWait", ""],
      ["LiftWalk1", ""],
      ["LiftWalk2", ""],
      ["LightThrowAirB4", "LightThrowAirB"],
      ["LightThrowAirF4", "LightThrowAirF"],
      ["LightThrowAirHi4", "LightThrowAirHi"],
      ["LightThrowAirLw4", "LightThrowAirLw"],
      ["LightThrowB4", "LightThrowB"],
      ["LightThrowF4", "LightThrowF"],
      ["LightThrowHi4", "LightThrowHi"],
      ["LightThrowLw4", "LightThrowLw"],
      ["Rebirth", "Entry"],
      ["RebirthWait", "Wait1"],
      ["ReboundStop", "Rebound"],
      ["RunDirect", ""],
      ["ShieldBreakDownD", "DownBoundD"],
      ["ShieldBreakDownU", "DownBoundU"],
      ["ShieldBreakFall", "DamageFall"],
      ["ShieldBreakFly", ""],
      ["ShieldBreakStandD", "DownStandD"],
      ["ShieldBreakStandU", "DownStandU"],
      ["ShoulderedTurn", ""],
      ["ShoulderedWait", ""],
      ["ShoulderedWalkFast", ""],
      ["ShoulderedWalkMiddle", ""],
      ["ShoulderedWalkSlow", ""],
      ["SwordSwing1", "Swing1"],
      ["SwordSwing3", "Swing3"],
      ["SwordSwing4", "Swing4"],
      ["SwordSwingDash", "SwingDash"],
      ["ThrownB", ""],
      ["ThrownCopyStar", ""],
      ["ThrownF", ""],
      ["ThrownFB", ""],
      ["ThrownFF", ""],
      ["ThrownFHi", ""],
      ["ThrownFLw", ""],
      ["ThrownHi", ""],
      ["ThrownKirby", ""],
      ["ThrownKirbyStar", ""],
      ["ThrownKoopaAirB", ""],
      ["ThrownKoopaAirF", ""],
      ["ThrownKoopaB", ""],
      ["ThrownKoopaF", ""],
      ["ThrownLw", ""],
      ["ThrownLwWomen", ""],
      ["ThrownMewtwo", ""],
      ["ThrownMewtwoAir", ""],
      ["Wait", "Wait1"],
      ["YoshiEgg", ""]
    ]),
    specialsMap: /* @__PURE__ */ new Map([
      [341, "SpecialN"],
      [342, "SpecialAirN"],
      [343, "SpecialSStart"],
      [344, "SpecialSLoop"],
      [345, "SpecialSEnd"],
      [346, "SpecialAirSStart"],
      [347, "SpecialAirSLoop"],
      [348, "SpecialAirSEnd"],
      [349, "SpecialHiStart"],
      [350, "Unsupported"],
      // invisible
      [351, "SpecialHi"],
      [352, "SpecialAirHiStart"],
      [353, "Unsupported"],
      // invisible
      [354, "SpecialAirHi"],
      [355, "SpecialLw"],
      [356, "SpecialLw2"],
      [357, "SpecialAirLw"],
      [358, "SpecialAirLw2"]
    ])
  };

  // src/viewer/characters/index.ts
  var actionMapByInternalId = [
    mario,
    fox,
    captainFalcon,
    donkeyKong,
    kirby,
    bowser,
    link,
    sheik,
    ness,
    peach,
    iceClimbers,
    // Popo
    iceClimbers,
    // Nana
    pikachu,
    samus,
    yoshi,
    jigglypuff,
    mewtwo,
    luigi,
    marth,
    zelda,
    youngLink,
    doctorMario,
    falco,
    pichu,
    mrGameAndWatch,
    ganondorf,
    roy
  ];

  // src/viewer/viewerUtil.ts
  function stateForPlayerUpdate(playerUpdate, isNana) {
    return playerUpdate?.[isNana ? "nanaState" : "state"];
  }
  function isActionStartBoundary(playerState, candidateState) {
    const previousState = stateForPlayerUpdate(
      getPlayerOnFrame(playerState.playerIndex, candidateState.frameNumber - 1),
      playerState.isNana
    );
    return previousState === void 0 || previousState.actionStateId !== candidateState.actionStateId || previousState.actionStateFrameCounter > candidateState.actionStateFrameCounter;
  }
  function getStartOfActionFromFrameCounter(playerState) {
    const actionFrame = playerState.actionStateFrameCounter;
    if (!Number.isFinite(actionFrame) || actionFrame < 0) return void 0;
    const estimatedStart = playerState.frameNumber - Math.max(0, Math.floor(actionFrame) - 1);
    let bestFrame;
    let bestError = Number.POSITIVE_INFINITY;
    for (let delta = -2; delta <= 2; delta += 1) {
      const candidateFrame = estimatedStart + delta;
      if (candidateFrame > playerState.frameNumber) continue;
      const candidateState = stateForPlayerUpdate(
        getPlayerOnFrame(playerState.playerIndex, candidateFrame),
        playerState.isNana
      );
      if (candidateState !== void 0 && candidateState.actionStateId === playerState.actionStateId && isActionStartBoundary(playerState, candidateState)) {
        const expectedFrameCounter = candidateState.actionStateFrameCounter + (playerState.frameNumber - candidateFrame);
        const error = Math.abs(expectedFrameCounter - actionFrame);
        if (error < bestError) {
          bestError = error;
          bestFrame = candidateFrame;
        }
      }
    }
    return bestFrame;
  }
  function getStartOfAction(playerState) {
    const fastStart = getStartOfActionFromFrameCounter(playerState);
    if (fastStart !== void 0) return fastStart;
    let earliestStateOfAction = stateForPlayerUpdate(
      getPlayerOnFrame(playerState.playerIndex, playerState.frameNumber),
      playerState.isNana
    );
    while (true) {
      const testEarlierState = stateForPlayerUpdate(
        getPlayerOnFrame(playerState.playerIndex, earliestStateOfAction.frameNumber - 1),
        playerState.isNana
      );
      if (testEarlierState === void 0 || testEarlierState.actionStateId !== earliestStateOfAction.actionStateId || testEarlierState.actionStateFrameCounter > earliestStateOfAction.actionStateFrameCounter) {
        return earliestStateOfAction.frameNumber;
      }
      earliestStateOfAction = testEarlierState;
    }
  }
  function getPlayerOnFrame(playerIndex, frameNumber) {
    return access("frames")[frameNumber]?.players[playerIndex];
  }

  // src/common/util.ts
  var import_colors = __toESM(require_colors2());
  function getPlayerColor(spectateStore2, playerIndex, isNana) {
    if (spectateStore2.playbackData.settings.isTeams) {
      const settings = spectateStore2.playbackData.settings.playerSettings[playerIndex];
      return [
        [import_colors.default.red["800"], import_colors.default.red["600"]],
        [import_colors.default.green["800"], import_colors.default.green["600"]],
        [import_colors.default.blue["800"], import_colors.default.blue["600"]]
      ][settings.teamId][isNana ? 1 : settings.teamShade];
    }
    return [
      [import_colors.default.red["700"], import_colors.default.red["600"]],
      [import_colors.default.blue["700"], import_colors.default.blue["600"]],
      [import_colors.default.yellow["500"], import_colors.default.yellow["400"]],
      [import_colors.default.green["700"], import_colors.default.green["600"]]
    ][playerIndex][isNana ? 1 : 0];
  }

  // worker:D:\git_repos\SteveTheBot\logs\msl_viewer\slippi-viewer\build\worker.js
  var worker_default = '"use strict";\n(() => {\n  // node_modules/reconnecting-websocket/dist/reconnecting-websocket-mjs.js\n  var extendStatics = function(d, b) {\n    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {\n      d2.__proto__ = b2;\n    } || function(d2, b2) {\n      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];\n    };\n    return extendStatics(d, b);\n  };\n  function __extends(d, b) {\n    extendStatics(d, b);\n    function __() {\n      this.constructor = d;\n    }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  }\n  function __values(o) {\n    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;\n    if (m) return m.call(o);\n    return {\n      next: function() {\n        if (o && i >= o.length) o = void 0;\n        return { value: o && o[i++], done: !o };\n      }\n    };\n  }\n  function __read(o, n) {\n    var m = typeof Symbol === "function" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    } catch (error) {\n      e = { error };\n    } finally {\n      try {\n        if (r && !r.done && (m = i["return"])) m.call(i);\n      } finally {\n        if (e) throw e.error;\n      }\n    }\n    return ar;\n  }\n  function __spread() {\n    for (var ar = [], i = 0; i < arguments.length; i++)\n      ar = ar.concat(__read(arguments[i]));\n    return ar;\n  }\n  var Event = (\n    /** @class */\n    /* @__PURE__ */ function() {\n      function Event2(type, target) {\n        this.target = target;\n        this.type = type;\n      }\n      return Event2;\n    }()\n  );\n  var ErrorEvent = (\n    /** @class */\n    function(_super) {\n      __extends(ErrorEvent2, _super);\n      function ErrorEvent2(error, target) {\n        var _this = _super.call(this, "error", target) || this;\n        _this.message = error.message;\n        _this.error = error;\n        return _this;\n      }\n      return ErrorEvent2;\n    }(Event)\n  );\n  var CloseEvent = (\n    /** @class */\n    function(_super) {\n      __extends(CloseEvent2, _super);\n      function CloseEvent2(code, reason, target) {\n        if (code === void 0) {\n          code = 1e3;\n        }\n        if (reason === void 0) {\n          reason = "";\n        }\n        var _this = _super.call(this, "close", target) || this;\n        _this.wasClean = true;\n        _this.code = code;\n        _this.reason = reason;\n        return _this;\n      }\n      return CloseEvent2;\n    }(Event)\n  );\n  var getGlobalWebSocket = function() {\n    if (typeof WebSocket !== "undefined") {\n      return WebSocket;\n    }\n  };\n  var isWebSocket = function(w) {\n    return typeof w !== "undefined" && !!w && w.CLOSING === 2;\n  };\n  var DEFAULT = {\n    maxReconnectionDelay: 1e4,\n    minReconnectionDelay: 1e3 + Math.random() * 4e3,\n    minUptime: 5e3,\n    reconnectionDelayGrowFactor: 1.3,\n    connectionTimeout: 4e3,\n    maxRetries: Infinity,\n    maxEnqueuedMessages: Infinity,\n    startClosed: false,\n    debug: false\n  };\n  var ReconnectingWebSocket = (\n    /** @class */\n    function() {\n      function ReconnectingWebSocket2(url, protocols, options) {\n        var _this = this;\n        if (options === void 0) {\n          options = {};\n        }\n        this._listeners = {\n          error: [],\n          message: [],\n          open: [],\n          close: []\n        };\n        this._retryCount = -1;\n        this._shouldReconnect = true;\n        this._connectLock = false;\n        this._binaryType = "blob";\n        this._closeCalled = false;\n        this._messageQueue = [];\n        this.onclose = null;\n        this.onerror = null;\n        this.onmessage = null;\n        this.onopen = null;\n        this._handleOpen = function(event) {\n          _this._debug("open event");\n          var _a = _this._options.minUptime, minUptime = _a === void 0 ? DEFAULT.minUptime : _a;\n          clearTimeout(_this._connectTimeout);\n          _this._uptimeTimeout = setTimeout(function() {\n            return _this._acceptOpen();\n          }, minUptime);\n          _this._ws.binaryType = _this._binaryType;\n          _this._messageQueue.forEach(function(message) {\n            return _this._ws.send(message);\n          });\n          _this._messageQueue = [];\n          if (_this.onopen) {\n            _this.onopen(event);\n          }\n          _this._listeners.open.forEach(function(listener) {\n            return _this._callEventListener(event, listener);\n          });\n        };\n        this._handleMessage = function(event) {\n          _this._debug("message event");\n          if (_this.onmessage) {\n            _this.onmessage(event);\n          }\n          _this._listeners.message.forEach(function(listener) {\n            return _this._callEventListener(event, listener);\n          });\n        };\n        this._handleError = function(event) {\n          _this._debug("error event", event.message);\n          _this._disconnect(void 0, event.message === "TIMEOUT" ? "timeout" : void 0);\n          if (_this.onerror) {\n            _this.onerror(event);\n          }\n          _this._debug("exec error listeners");\n          _this._listeners.error.forEach(function(listener) {\n            return _this._callEventListener(event, listener);\n          });\n          _this._connect();\n        };\n        this._handleClose = function(event) {\n          _this._debug("close event");\n          _this._clearTimeouts();\n          if (_this._shouldReconnect) {\n            _this._connect();\n          }\n          if (_this.onclose) {\n            _this.onclose(event);\n          }\n          _this._listeners.close.forEach(function(listener) {\n            return _this._callEventListener(event, listener);\n          });\n        };\n        this._url = url;\n        this._protocols = protocols;\n        this._options = options;\n        if (this._options.startClosed) {\n          this._shouldReconnect = false;\n        }\n        this._connect();\n      }\n      Object.defineProperty(ReconnectingWebSocket2, "CONNECTING", {\n        get: function() {\n          return 0;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2, "OPEN", {\n        get: function() {\n          return 1;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2, "CLOSING", {\n        get: function() {\n          return 2;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2, "CLOSED", {\n        get: function() {\n          return 3;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "CONNECTING", {\n        get: function() {\n          return ReconnectingWebSocket2.CONNECTING;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "OPEN", {\n        get: function() {\n          return ReconnectingWebSocket2.OPEN;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "CLOSING", {\n        get: function() {\n          return ReconnectingWebSocket2.CLOSING;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "CLOSED", {\n        get: function() {\n          return ReconnectingWebSocket2.CLOSED;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "binaryType", {\n        get: function() {\n          return this._ws ? this._ws.binaryType : this._binaryType;\n        },\n        set: function(value) {\n          this._binaryType = value;\n          if (this._ws) {\n            this._ws.binaryType = value;\n          }\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "retryCount", {\n        /**\n         * Returns the number or connection retries\n         */\n        get: function() {\n          return Math.max(this._retryCount, 0);\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "bufferedAmount", {\n        /**\n         * The number of bytes of data that have been queued using calls to send() but not yet\n         * transmitted to the network. This value resets to zero once all queued data has been sent.\n         * This value does not reset to zero when the connection is closed; if you keep calling send(),\n         * this will continue to climb. Read only\n         */\n        get: function() {\n          var bytes = this._messageQueue.reduce(function(acc, message) {\n            if (typeof message === "string") {\n              acc += message.length;\n            } else if (message instanceof Blob) {\n              acc += message.size;\n            } else {\n              acc += message.byteLength;\n            }\n            return acc;\n          }, 0);\n          return bytes + (this._ws ? this._ws.bufferedAmount : 0);\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "extensions", {\n        /**\n         * The extensions selected by the server. This is currently only the empty string or a list of\n         * extensions as negotiated by the connection\n         */\n        get: function() {\n          return this._ws ? this._ws.extensions : "";\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "protocol", {\n        /**\n         * A string indicating the name of the sub-protocol the server selected;\n         * this will be one of the strings specified in the protocols parameter when creating the\n         * WebSocket object\n         */\n        get: function() {\n          return this._ws ? this._ws.protocol : "";\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "readyState", {\n        /**\n         * The current state of the connection; this is one of the Ready state constants\n         */\n        get: function() {\n          if (this._ws) {\n            return this._ws.readyState;\n          }\n          return this._options.startClosed ? ReconnectingWebSocket2.CLOSED : ReconnectingWebSocket2.CONNECTING;\n        },\n        enumerable: true,\n        configurable: true\n      });\n      Object.defineProperty(ReconnectingWebSocket2.prototype, "url", {\n        /**\n         * The URL as resolved by the constructor\n         */\n        get: function() {\n          return this._ws ? this._ws.url : "";\n        },\n        enumerable: true,\n        configurable: true\n      });\n      ReconnectingWebSocket2.prototype.close = function(code, reason) {\n        if (code === void 0) {\n          code = 1e3;\n        }\n        this._closeCalled = true;\n        this._shouldReconnect = false;\n        this._clearTimeouts();\n        if (!this._ws) {\n          this._debug("close enqueued: no ws instance");\n          return;\n        }\n        if (this._ws.readyState === this.CLOSED) {\n          this._debug("close: already closed");\n          return;\n        }\n        this._ws.close(code, reason);\n      };\n      ReconnectingWebSocket2.prototype.reconnect = function(code, reason) {\n        this._shouldReconnect = true;\n        this._closeCalled = false;\n        this._retryCount = -1;\n        if (!this._ws || this._ws.readyState === this.CLOSED) {\n          this._connect();\n        } else {\n          this._disconnect(code, reason);\n          this._connect();\n        }\n      };\n      ReconnectingWebSocket2.prototype.send = function(data) {\n        if (this._ws && this._ws.readyState === this.OPEN) {\n          this._debug("send", data);\n          this._ws.send(data);\n        } else {\n          var _a = this._options.maxEnqueuedMessages, maxEnqueuedMessages = _a === void 0 ? DEFAULT.maxEnqueuedMessages : _a;\n          if (this._messageQueue.length < maxEnqueuedMessages) {\n            this._debug("enqueue", data);\n            this._messageQueue.push(data);\n          }\n        }\n      };\n      ReconnectingWebSocket2.prototype.addEventListener = function(type, listener) {\n        if (this._listeners[type]) {\n          this._listeners[type].push(listener);\n        }\n      };\n      ReconnectingWebSocket2.prototype.dispatchEvent = function(event) {\n        var e_1, _a;\n        var listeners = this._listeners[event.type];\n        if (listeners) {\n          try {\n            for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {\n              var listener = listeners_1_1.value;\n              this._callEventListener(event, listener);\n            }\n          } catch (e_1_1) {\n            e_1 = { error: e_1_1 };\n          } finally {\n            try {\n              if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);\n            } finally {\n              if (e_1) throw e_1.error;\n            }\n          }\n        }\n        return true;\n      };\n      ReconnectingWebSocket2.prototype.removeEventListener = function(type, listener) {\n        if (this._listeners[type]) {\n          this._listeners[type] = this._listeners[type].filter(function(l) {\n            return l !== listener;\n          });\n        }\n      };\n      ReconnectingWebSocket2.prototype._debug = function() {\n        var args = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n          args[_i] = arguments[_i];\n        }\n        if (this._options.debug) {\n          console.log.apply(console, __spread(["RWS>"], args));\n        }\n      };\n      ReconnectingWebSocket2.prototype._getNextDelay = function() {\n        var _a = this._options, _b = _a.reconnectionDelayGrowFactor, reconnectionDelayGrowFactor = _b === void 0 ? DEFAULT.reconnectionDelayGrowFactor : _b, _c = _a.minReconnectionDelay, minReconnectionDelay = _c === void 0 ? DEFAULT.minReconnectionDelay : _c, _d = _a.maxReconnectionDelay, maxReconnectionDelay = _d === void 0 ? DEFAULT.maxReconnectionDelay : _d;\n        var delay = 0;\n        if (this._retryCount > 0) {\n          delay = minReconnectionDelay * Math.pow(reconnectionDelayGrowFactor, this._retryCount - 1);\n          if (delay > maxReconnectionDelay) {\n            delay = maxReconnectionDelay;\n          }\n        }\n        this._debug("next delay", delay);\n        return delay;\n      };\n      ReconnectingWebSocket2.prototype._wait = function() {\n        var _this = this;\n        return new Promise(function(resolve) {\n          setTimeout(resolve, _this._getNextDelay());\n        });\n      };\n      ReconnectingWebSocket2.prototype._getNextUrl = function(urlProvider) {\n        if (typeof urlProvider === "string") {\n          return Promise.resolve(urlProvider);\n        }\n        if (typeof urlProvider === "function") {\n          var url = urlProvider();\n          if (typeof url === "string") {\n            return Promise.resolve(url);\n          }\n          if (!!url.then) {\n            return url;\n          }\n        }\n        throw Error("Invalid URL");\n      };\n      ReconnectingWebSocket2.prototype._connect = function() {\n        var _this = this;\n        if (this._connectLock || !this._shouldReconnect) {\n          return;\n        }\n        this._connectLock = true;\n        var _a = this._options, _b = _a.maxRetries, maxRetries = _b === void 0 ? DEFAULT.maxRetries : _b, _c = _a.connectionTimeout, connectionTimeout = _c === void 0 ? DEFAULT.connectionTimeout : _c, _d = _a.WebSocket, WebSocket2 = _d === void 0 ? getGlobalWebSocket() : _d;\n        if (this._retryCount >= maxRetries) {\n          this._debug("max retries reached", this._retryCount, ">=", maxRetries);\n          return;\n        }\n        this._retryCount++;\n        this._debug("connect", this._retryCount);\n        this._removeListeners();\n        if (!isWebSocket(WebSocket2)) {\n          throw Error("No valid WebSocket class provided");\n        }\n        this._wait().then(function() {\n          return _this._getNextUrl(_this._url);\n        }).then(function(url) {\n          if (_this._closeCalled) {\n            return;\n          }\n          _this._debug("connect", { url, protocols: _this._protocols });\n          _this._ws = _this._protocols ? new WebSocket2(url, _this._protocols) : new WebSocket2(url);\n          _this._ws.binaryType = _this._binaryType;\n          _this._connectLock = false;\n          _this._addListeners();\n          _this._connectTimeout = setTimeout(function() {\n            return _this._handleTimeout();\n          }, connectionTimeout);\n        });\n      };\n      ReconnectingWebSocket2.prototype._handleTimeout = function() {\n        this._debug("timeout event");\n        this._handleError(new ErrorEvent(Error("TIMEOUT"), this));\n      };\n      ReconnectingWebSocket2.prototype._disconnect = function(code, reason) {\n        if (code === void 0) {\n          code = 1e3;\n        }\n        this._clearTimeouts();\n        if (!this._ws) {\n          return;\n        }\n        this._removeListeners();\n        try {\n          this._ws.close(code, reason);\n          this._handleClose(new CloseEvent(code, reason, this));\n        } catch (error) {\n        }\n      };\n      ReconnectingWebSocket2.prototype._acceptOpen = function() {\n        this._debug("accept open");\n        this._retryCount = 0;\n      };\n      ReconnectingWebSocket2.prototype._callEventListener = function(event, listener) {\n        if ("handleEvent" in listener) {\n          listener.handleEvent(event);\n        } else {\n          listener(event);\n        }\n      };\n      ReconnectingWebSocket2.prototype._removeListeners = function() {\n        if (!this._ws) {\n          return;\n        }\n        this._debug("removeListeners");\n        this._ws.removeEventListener("open", this._handleOpen);\n        this._ws.removeEventListener("close", this._handleClose);\n        this._ws.removeEventListener("message", this._handleMessage);\n        this._ws.removeEventListener("error", this._handleError);\n      };\n      ReconnectingWebSocket2.prototype._addListeners = function() {\n        if (!this._ws) {\n          return;\n        }\n        this._debug("addListeners");\n        this._ws.addEventListener("open", this._handleOpen);\n        this._ws.addEventListener("close", this._handleClose);\n        this._ws.addEventListener("message", this._handleMessage);\n        this._ws.addEventListener("error", this._handleError);\n      };\n      ReconnectingWebSocket2.prototype._clearTimeouts = function() {\n        clearTimeout(this._connectTimeout);\n        clearTimeout(this._uptimeTimeout);\n      };\n      return ReconnectingWebSocket2;\n    }()\n  );\n  var reconnecting_websocket_mjs_default = ReconnectingWebSocket;\n\n  // src/worker/liveParser.ts\n  var firstVersion = "0.1.0.0";\n  function parsePacket(rawPacket, workerState2) {\n    const rawData = new DataView(\n      rawPacket.buffer,\n      rawPacket.byteOffset\n      // baseJson.raw.byteLength\n    );\n    let offset = 0;\n    const gameEvents = [];\n    while (offset < rawData.byteLength) {\n      let newOffset, gameEvent;\n      [newOffset, gameEvent] = parseEvent(rawData, offset, workerState2);\n      offset = newOffset;\n      if (gameEvent !== null) gameEvents.push(gameEvent);\n    }\n    return gameEvents;\n  }\n  function parseEvent(rawData, offset, workerState2) {\n    const replayVersion = workerState2.replayFormatVersion ?? "3.18.0.0";\n    const payloadSizes = workerState2.payloadSizes;\n    const command = readUint(rawData, 8, replayVersion, firstVersion, offset);\n    let gameEvent = null;\n    switch (command) {\n      case 53:\n        const commandPayloadSizes = parseEventPayloadsEvent(rawData, offset);\n        workerState2.payloadSizes = commandPayloadSizes;\n        gameEvent = { type: "event_payloads", data: null };\n        return [offset + commandPayloadSizes[command] + 1, gameEvent];\n      case 54:\n        const gameSettings = parseGameStartEvent(\n          rawData,\n          offset\n          /* metadata */\n        );\n        workerState2.replayFormatVersion = gameSettings.replayFormatVersion;\n        gameEvent = { type: "game_start", data: gameSettings };\n        break;\n      case 55:\n        const playerInputs = parsePreFrameUpdateEvent(rawData, offset, replayVersion);\n        gameEvent = { type: "pre_frame_update", data: playerInputs };\n        break;\n      case 56:\n        const playerState = parsePostFrameUpdateEvent(rawData, offset, replayVersion);\n        gameEvent = { type: "post_frame_update", data: playerState };\n        break;\n      case 57:\n        const gameEnding = parseGameEndEvent(rawData, offset, replayVersion);\n        gameEvent = { type: "game_end", data: gameEnding };\n        break;\n      case 58:\n        const frameStart = parseFrameStartEvent(\n          rawData,\n          offset,\n          replayVersion\n        );\n        gameEvent = { type: "frame_start", data: frameStart };\n        break;\n      case 59:\n        const itemUpdate = parseItemUpdateEvent(rawData, offset, replayVersion);\n        gameEvent = { type: "item_update", data: itemUpdate };\n        break;\n      case 60:\n        const frameBookend = parseFrameBookendEvent(rawData, offset, replayVersion);\n        gameEvent = { type: "frame_bookend", data: frameBookend };\n        break;\n      case 63:\n        const fodPlatforms = parseFodPlatformsEvent(\n          rawData,\n          offset,\n          replayVersion\n        );\n        gameEvent = { type: "fod_platforms", data: fodPlatforms };\n        break;\n    }\n    return [offset + payloadSizes[command] + 1, gameEvent];\n  }\n  function parseEventPayloadsEvent(rawData, offset) {\n    const commandByte = readUint(\n      rawData,\n      8,\n      firstVersion,\n      firstVersion,\n      offset + 0\n    );\n    const commandPayloadSizes = {};\n    const eventPayloadsPayloadSize = readUint(\n      rawData,\n      8,\n      firstVersion,\n      firstVersion,\n      offset + 1\n    );\n    commandPayloadSizes[commandByte] = eventPayloadsPayloadSize;\n    const listOffset = offset + 2;\n    for (let i = listOffset; i < eventPayloadsPayloadSize + listOffset - 1; i += 3) {\n      const commandByte2 = readUint(\n        rawData,\n        8,\n        firstVersion,\n        firstVersion,\n        i + 0\n      );\n      const payloadSize = readUint(\n        rawData,\n        16,\n        firstVersion,\n        firstVersion,\n        i + 1\n      );\n      commandPayloadSizes[commandByte2] = payloadSize;\n    }\n    return commandPayloadSizes;\n  }\n  function parseGameStartEvent(rawData, offset, metadata) {\n    const replayFormatVersion = [\n      readUint(rawData, 8, firstVersion, firstVersion, offset + 1),\n      readUint(rawData, 8, firstVersion, firstVersion, offset + 2),\n      readUint(rawData, 8, firstVersion, firstVersion, offset + 3),\n      readUint(rawData, 8, firstVersion, firstVersion, offset + 4)\n    ].join(".");\n    const settingsBitfield1 = readUint(\n      rawData,\n      8,\n      replayFormatVersion,\n      firstVersion,\n      offset + 5\n    );\n    const settingsBitfield2 = readUint(\n      rawData,\n      8,\n      replayFormatVersion,\n      firstVersion,\n      offset + 6\n    );\n    const settingsBitfield3 = readUint(\n      rawData,\n      8,\n      replayFormatVersion,\n      firstVersion,\n      offset + 8\n    );\n    const settingsBitfield4 = readUint(\n      rawData,\n      8,\n      replayFormatVersion,\n      firstVersion,\n      offset + 9\n    );\n    const timerTypeCode = settingsBitfield1 & 3;\n    const gameModeCode = (settingsBitfield1 & 224) >> 5;\n    const itemSpawnRateCode = readInt(\n      rawData,\n      8,\n      replayFormatVersion,\n      firstVersion,\n      offset + 16\n    );\n    const settings = {\n      isTeams: Boolean(\n        readUint(rawData, 8, replayFormatVersion, firstVersion, offset + 13)\n      ),\n      playerSettings: [],\n      replayFormatVersion,\n      stageId: readUint(\n        rawData,\n        16,\n        replayFormatVersion,\n        firstVersion,\n        offset + 19\n      ),\n      startTimestamp: metadata?.startAt,\n      platform: metadata?.playedOn,\n      isPal: Boolean(\n        readUint(rawData, 8, replayFormatVersion, "1.5.0.0", offset + 417)\n      ),\n      isFrozenStadium: Boolean(\n        readUint(rawData, 8, replayFormatVersion, "2.0.0.0", offset + 418)\n      ),\n      timerType: timerTypeCode === 0 ? "no timer" : timerTypeCode === 2 ? "counting down" : "counting up",\n      characterUiPlacesCount: (settingsBitfield1 & 28) >> 2,\n      gameType: gameModeCode === 0 ? "time" : gameModeCode === 1 ? "stock" : gameModeCode === 2 ? "coin" : "bonus",\n      friendlyFireOn: Boolean(settingsBitfield2 & 1),\n      isBreakTheTargetsOrTitleDemo: Boolean(settingsBitfield2 & 2),\n      isClassicOrAdventureMode: Boolean(settingsBitfield2 & 4),\n      isHomeRunContestOrEventMatch: Boolean(settingsBitfield2 & 8),\n      isSingleButtonMode: Boolean(settingsBitfield3 & 16),\n      timerCountsDuringPause: Boolean(settingsBitfield4 & 1),\n      bombRain: Boolean(\n        readUint(rawData, 8, replayFormatVersion, firstVersion, offset + 11)\n      ),\n      itemSpawnRate: itemSpawnRateCode === -1 ? "off" : itemSpawnRateCode === 0 ? "very low" : itemSpawnRateCode === 1 ? "low" : itemSpawnRateCode === 2 ? "medium" : itemSpawnRateCode === 3 ? "high" : "very high",\n      selfDestructScoreValue: readInt(\n        rawData,\n        8,\n        replayFormatVersion,\n        firstVersion,\n        offset + 17\n      ),\n      timerStart: readUint(\n        rawData,\n        32,\n        replayFormatVersion,\n        firstVersion,\n        offset + 21\n      ),\n      damageRatio: readFloat(\n        rawData,\n        32,\n        replayFormatVersion,\n        firstVersion,\n        offset + 53\n      )\n    };\n    settings.consoleNickname = metadata?.consoleNick;\n    for (let playerIndex = 0; playerIndex < 4; playerIndex++) {\n      const playerType = readUint(\n        rawData,\n        8,\n        settings.replayFormatVersion,\n        firstVersion,\n        offset + 102 + 36 * playerIndex\n      );\n      if (playerType === 3) continue;\n      const dashbackFix = readUint(\n        rawData,\n        32,\n        settings.replayFormatVersion,\n        "1.0.0.0",\n        offset + 321 + 8 * playerIndex\n      );\n      const shieldDropFix = readUint(\n        rawData,\n        32,\n        settings.replayFormatVersion,\n        "1.0.0.0",\n        offset + 325 + 8 * playerIndex\n      );\n      const playerBitfield = readUint(\n        rawData,\n        8,\n        settings.replayFormatVersion,\n        firstVersion,\n        offset + 113 + 36 * playerIndex\n      );\n      settings.playerSettings[playerIndex] = {\n        playerIndex,\n        port: playerIndex + 1,\n        internalCharacterIds: Object.keys(\n          metadata?.players[playerIndex]?.characters ?? {}\n        ).map((key) => Number(key)),\n        externalCharacterId: readUint(\n          rawData,\n          8,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 101 + 36 * playerIndex\n        ),\n        playerType,\n        startStocks: readUint(\n          rawData,\n          8,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 103 + 36 * playerIndex\n        ),\n        costumeIndex: readUint(\n          rawData,\n          8,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 104 + 36 * playerIndex\n        ),\n        teamShade: readUint(\n          rawData,\n          8,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 108 + 36 * playerIndex\n        ),\n        handicap: readUint(\n          rawData,\n          8,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 109 + 36 * playerIndex\n        ),\n        teamId: readUint(\n          rawData,\n          8,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 110 + 36 * playerIndex\n        ),\n        staminaMode: Boolean(playerBitfield & 1),\n        silentCharacter: Boolean(playerBitfield & 2),\n        lowGravity: Boolean(playerBitfield & 4),\n        invisible: Boolean(playerBitfield & 8),\n        blackStockIcon: Boolean(playerBitfield & 16),\n        metal: Boolean(playerBitfield & 32),\n        startGameOnWarpPlatform: Boolean(playerBitfield & 64),\n        rumbleEnabled: Boolean(playerBitfield & 128),\n        cpuLevel: readUint(\n          rawData,\n          8,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 116 + 36 * playerIndex\n        ),\n        offenseRatio: readFloat(\n          rawData,\n          32,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 125 + 36 * playerIndex\n        ),\n        defenseRatio: readFloat(\n          rawData,\n          32,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 129 + 36 * playerIndex\n        ),\n        modelScale: readFloat(\n          rawData,\n          32,\n          settings.replayFormatVersion,\n          firstVersion,\n          offset + 133 + 36 * playerIndex\n        ),\n        controllerFix: dashbackFix === shieldDropFix ? dashbackFix === 1 ? "UCF" : dashbackFix === 2 ? "Dween" : "None" : "Mixed",\n        nametag: readShiftJisString(\n          rawData,\n          settings.replayFormatVersion,\n          "1.3.0.0",\n          offset + 353 + 16 * playerIndex,\n          9\n        ),\n        displayName: readShiftJisString(\n          rawData,\n          settings.replayFormatVersion,\n          "3.9.0.0",\n          offset + 421 + 31 * playerIndex,\n          16\n        ),\n        connectCode: readShiftJisString(\n          rawData,\n          settings.replayFormatVersion,\n          "3.9.0.0",\n          offset + 545 + 10 * playerIndex,\n          10\n        )\n      };\n    }\n    return settings;\n  }\n  function parseFrameStartEvent(rawData, offset, replayVersion) {\n    return {\n      frameNumber: readInt(rawData, 32, replayVersion, "2.2.0.0", offset + 1) + 123,\n      randomSeed: readUint(rawData, 32, replayVersion, "2.2.0.0", offset + 5)\n    };\n  }\n  function parsePreFrameUpdateEvent(rawData, offset, replayVersion) {\n    const processedButtonsBitfield = readUint(\n      rawData,\n      32,\n      replayVersion,\n      "0.1.0.0",\n      offset + 45\n    );\n    const physicalButtonsBitfield = readUint(\n      rawData,\n      16,\n      replayVersion,\n      "0.1.0.0",\n      offset + 49\n    );\n    return {\n      frameNumber: readInt(rawData, 32, replayVersion, "0.1.0.0", offset + 1) + 123,\n      playerIndex: readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 5),\n      isNana: Boolean(\n        readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 6)\n      ),\n      physical: {\n        dPadLeft: Boolean(physicalButtonsBitfield & 1),\n        dPadRight: Boolean(physicalButtonsBitfield & 2),\n        dPadDown: Boolean(physicalButtonsBitfield & 4),\n        dPadUp: Boolean(physicalButtonsBitfield & 8),\n        z: Boolean(physicalButtonsBitfield & 16),\n        rTriggerAnalog: readFloat(\n          rawData,\n          32,\n          replayVersion,\n          "0.1.0.0",\n          offset + 55\n        ),\n        rTriggerDigital: Boolean(physicalButtonsBitfield & 32),\n        lTriggerAnalog: readFloat(\n          rawData,\n          32,\n          replayVersion,\n          "0.1.0.0",\n          offset + 51\n        ),\n        lTriggerDigital: Boolean(physicalButtonsBitfield & 64),\n        a: Boolean(physicalButtonsBitfield & 256),\n        b: Boolean(physicalButtonsBitfield & 512),\n        x: Boolean(physicalButtonsBitfield & 1024),\n        y: Boolean(physicalButtonsBitfield & 2048),\n        start: Boolean(physicalButtonsBitfield & 4096)\n      },\n      processed: {\n        dPadLeft: Boolean(processedButtonsBitfield & 1),\n        dPadRight: Boolean(processedButtonsBitfield & 2),\n        dPadDown: Boolean(processedButtonsBitfield & 4),\n        dPadUp: Boolean(processedButtonsBitfield & 8),\n        z: Boolean(processedButtonsBitfield & 16),\n        rTriggerDigital: Boolean(processedButtonsBitfield & 32),\n        lTriggerDigital: Boolean(processedButtonsBitfield & 64),\n        a: Boolean(processedButtonsBitfield & 256),\n        b: Boolean(processedButtonsBitfield & 512),\n        x: Boolean(processedButtonsBitfield & 1024),\n        y: Boolean(processedButtonsBitfield & 2048),\n        start: Boolean(processedButtonsBitfield & 4096),\n        joystickX: readFloat(\n          rawData,\n          32,\n          replayVersion,\n          "0.1.0.0",\n          offset + 25\n        ),\n        joystickY: readFloat(\n          rawData,\n          32,\n          replayVersion,\n          "0.1.0.0",\n          offset + 29\n        ),\n        cStickX: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 33),\n        cStickY: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 37),\n        anyTrigger: readFloat(\n          rawData,\n          32,\n          replayVersion,\n          "0.1.0.0",\n          offset + 41\n        )\n      }\n    };\n  }\n  function parsePostFrameUpdateEvent(rawData, offset, replayVersion) {\n    const hurtboxCollisionStateCode = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "2.1.0.0",\n      offset + 52\n    );\n    const lCancelStatusCode = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "2.0.0.0",\n      offset + 51\n    );\n    const stateBitfield1 = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "2.1.0.0",\n      offset + 38\n    );\n    const stateBitfield2 = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "2.1.0.0",\n      offset + 39\n    );\n    const stateBitfield3 = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "2.1.0.0",\n      offset + 40\n    );\n    const stateBitfield4 = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "2.1.0.0",\n      offset + 41\n    );\n    const stateBitfield5 = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "2.1.0.0",\n      offset + 42\n    );\n    return {\n      frameNumber: readInt(rawData, 32, replayVersion, "0.1.0.0", offset + 1) + 123,\n      playerIndex: readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 5),\n      isNana: Boolean(\n        readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 6)\n      ),\n      internalCharacterId: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "0.1.0.0",\n        offset + 7\n      ),\n      actionStateId: readUint(\n        rawData,\n        16,\n        replayVersion,\n        "0.1.0.0",\n        offset + 8\n      ),\n      xPosition: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 10),\n      yPosition: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 14),\n      facingDirection: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "0.1.0.0",\n        offset + 18\n      ),\n      percent: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 22),\n      shieldSize: readFloat(rawData, 32, replayVersion, "0.1.0.0", offset + 26),\n      lastHittingAttackId: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "0.1.0.0",\n        offset + 30\n      ),\n      currentComboCount: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "0.1.0.0",\n        offset + 31\n      ),\n      lastHitBy: readUint(rawData, 8, replayVersion, "0.1.0.0", offset + 32),\n      stocksRemaining: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "0.1.0.0",\n        offset + 33\n      ),\n      actionStateFrameCounter: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "0.2.0.0",\n        offset + 34\n      ),\n      hitstunRemaining: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "2.0.0.0",\n        offset + 43\n      ),\n      isGrounded: readUint(rawData, 8, replayVersion, "2.0.0.0", offset + 47) !== 0,\n      lastGroundId: readUint(rawData, 8, replayVersion, "2.0.0.0", offset + 48),\n      jumpsRemaining: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "2.0.0.0",\n        offset + 50\n      ),\n      lCancelStatus: lCancelStatusCode === 1 ? "successful" : lCancelStatusCode === 2 ? "missed" : void 0,\n      hurtboxCollisionState: hurtboxCollisionStateCode === 0 || hurtboxCollisionStateCode === void 0 ? "vulnerable" : hurtboxCollisionStateCode === 1 ? "invulnerable" : "intangible",\n      selfInducedAirXSpeed: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.5.0.0",\n        offset + 53\n      ),\n      selfInducedAirYSpeed: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.5.0.0",\n        offset + 57\n      ),\n      attackBasedXSpeed: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.5.0.0",\n        offset + 61\n      ),\n      attackBasedYSpeed: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.5.0.0",\n        offset + 65\n      ),\n      selfInducedGroundXSpeed: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.5.0.0",\n        offset + 69\n      ),\n      hitlagRemaining: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.8.0.0",\n        offset + 73\n      ),\n      isReflectActive: Boolean(stateBitfield1 & 16),\n      isFastfalling: Boolean(stateBitfield2 & 8),\n      isShieldActive: Boolean(stateBitfield3 & 128),\n      isInHitstun: Boolean(stateBitfield4 & 2),\n      isHittingShield: Boolean(stateBitfield4 & 4),\n      isPowershieldActive: Boolean(stateBitfield4 & 32),\n      isDead: Boolean(stateBitfield5 & 64),\n      isOffscreen: Boolean(stateBitfield5 & 128)\n    };\n  }\n  function parseItemUpdateEvent(rawData, offset, replayVersion) {\n    return {\n      frameNumber: readInt(rawData, 32, replayVersion, "3.0.0.0", offset + 1) + 123,\n      typeId: readUint(rawData, 16, replayVersion, "3.0.0.0", offset + 5),\n      state: readUint(rawData, 8, replayVersion, "3.0.0.0", offset + 7),\n      facingDirection: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.0.0.0",\n        offset + 8\n      ),\n      xVelocity: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 12),\n      yVelocity: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 16),\n      xPosition: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 20),\n      yPosition: readFloat(rawData, 32, replayVersion, "3.0.0.0", offset + 24),\n      damageTaken: readUint(rawData, 16, replayVersion, "3.0.0.0", offset + 28),\n      expirationTimer: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.0.0.0",\n        offset + 30\n      ),\n      spawnId: readUint(rawData, 32, replayVersion, "3.0.0.0", offset + 34),\n      samusMissileType: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "3.2.0.0",\n        offset + 38\n      ),\n      peachTurnipFace: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "3.2.0.0",\n        offset + 39\n      ),\n      isChargeShotLaunched: Boolean(\n        readUint(rawData, 8, replayVersion, "3.2.0.0", offset + 40)\n      ),\n      chargeShotChargeLevel: readUint(\n        rawData,\n        8,\n        replayVersion,\n        "3.2.0.0",\n        offset + 41\n      ),\n      owner: readInt(rawData, 8, replayVersion, "3.6.0.0", offset + 42)\n    };\n  }\n  function parseFodPlatformsEvent(rawData, offset, replayVersion) {\n    return {\n      frameNumber: readInt(rawData, 32, replayVersion, "3.18.0.0", offset + 1) + 123,\n      platform: readUint(rawData, 8, replayVersion, "3.18.0.0", offset + 5),\n      height: readFloat(\n        rawData,\n        32,\n        replayVersion,\n        "3.18.0.0",\n        offset + 6\n      )\n    };\n  }\n  function parseGameEndEvent(rawData, offset, replayVersion) {\n    const gameEndCode = readUint(\n      rawData,\n      8,\n      replayVersion,\n      "0.1.0.0",\n      offset + 1\n    );\n    const quitInitiator = readInt(\n      rawData,\n      8,\n      replayVersion,\n      "2.0.0.0",\n      offset + 2\n    );\n    if (gameEndCode === 0 || gameEndCode === 3) {\n      return {\n        oldGameEndMethod: gameEndCode === 3 ? "resolved" : "unresolved",\n        quitInitiator\n      };\n    } else {\n      return {\n        gameEndMethod: gameEndCode === 1 ? "TIME!" : gameEndCode === 2 ? "GAME!" : "No Contest",\n        quitInitiator\n      };\n    }\n  }\n  function parseFrameBookendEvent(rawData, offset, replayVersion) {\n    return {\n      frameNumber: readInt(rawData, 32, replayVersion, "3.0.0.0", offset + 1) + 123,\n      latestFinalizedFrame: readInt(rawData, 32, replayVersion, "3.7.0.0", offset + 5) + 123\n    };\n  }\n  function readUint(rawData, size, replayVersion, firstVersionPresent, offset) {\n    if (!isInVersion(replayVersion, firstVersionPresent)) {\n      return void 0;\n    }\n    switch (size) {\n      case 8:\n        return rawData.getUint8(offset);\n      case 16:\n        return rawData.getUint16(offset);\n      case 32:\n        return rawData.getUint32(offset);\n    }\n  }\n  function readFloat(rawData, size, replayVersion, firstVersionPresent, offset) {\n    if (!isInVersion(replayVersion, firstVersionPresent)) {\n      return void 0;\n    }\n    switch (size) {\n      case 32:\n        return rawData.getFloat32(offset);\n      case 64:\n        return rawData.getFloat64(offset);\n    }\n  }\n  function readInt(rawData, size, replayVersion, firstVersionPresent, offset) {\n    if (!isInVersion(replayVersion, firstVersionPresent)) {\n      return void 0;\n    }\n    switch (size) {\n      case 8:\n        return rawData.getInt8(offset);\n      case 16:\n        return rawData.getInt16(offset);\n      case 32:\n        return rawData.getInt32(offset);\n    }\n  }\n  function readShiftJisString(rawData, replayVersion, firstVersionPresent, offset, maxLength) {\n    if (!isInVersion(replayVersion, firstVersionPresent)) {\n      return void 0;\n    }\n    const shiftJisBytes = new Uint8Array(maxLength);\n    let charNum = 0;\n    do {\n      shiftJisBytes[charNum] = rawData.getUint8(offset + charNum * 1);\n      charNum++;\n    } while (charNum < maxLength && shiftJisBytes[charNum - 1] !== 0);\n    if (shiftJisBytes[0] !== 0) {\n      const decoder = new TextDecoder("shift-jis");\n      return toHalfWidth(decoder.decode(shiftJisBytes.subarray(0, charNum - 1)));\n    }\n    return "";\n  }\n  function isInVersion(replayVersion, firstVersionPresent) {\n    const replayVersionParts = replayVersion.split(".");\n    const firstVersionParts = firstVersionPresent.split(".");\n    for (let i = 0; i < replayVersionParts.length; i++) {\n      const replayVersionPart = parseInt(replayVersionParts[i]);\n      const firstVersionPart = parseInt(firstVersionParts[i]);\n      if (replayVersionPart > firstVersionPart) return true;\n      if (replayVersionPart < firstVersionPart) return false;\n    }\n    return true;\n  }\n  function toHalfWidth(s) {\n    return s.replace(/[\uFF01-\uFF5E]/g, function(r) {\n      return String.fromCharCode(r.charCodeAt(0) - 65248);\n    });\n  }\n\n  // src/worker/worker.ts\n  var workerState = {\n    replayFormatVersion: void 0,\n    payloadSizes: void 0\n  };\n  onmessage = (event) => {\n    switch (event.data.type) {\n      case "connect":\n        connectWS(event.data.value);\n        break;\n    }\n  };\n  function connectWS(wsUrl) {\n    console.log("Connecting to stream:", wsUrl);\n    const ws = new reconnecting_websocket_mjs_default(wsUrl);\n    ws.binaryType = "arraybuffer";\n    console.log("Connection successful.");\n    ws.onmessage = (msg) => {\n      handleGameData(msg.data);\n    };\n    ws.onopen = () => {\n      postMessage({ type: "connected", value: null });\n      console.log("WebSocket opened");\n    };\n    ws.onerror = (err) => {\n      postMessage({ type: "disconnected", value: "error" });\n      console.error("WebSocket error:", err);\n    };\n    ws.onclose = (msg) => {\n      postMessage({ type: "disconnected", value: "closed" });\n      console.log("WebSocket closed:", msg);\n    };\n  }\n  function handleGameData(payload) {\n    const gameEvents = parsePacket(\n      new Uint8Array(payload),\n      workerState\n    );\n    postMessage({ type: "game_data", value: gameEvents });\n  }\n  var worker_default = "";\n})();\n/*! Bundled license information:\n\nreconnecting-websocket/dist/reconnecting-websocket-mjs.js:\n  (*! *****************************************************************************\n  Copyright (c) Microsoft Corporation. All rights reserved.\n  Licensed under the Apache License, Version 2.0 (the "License"); you may not use\n  this file except in compliance with the License. You may obtain a copy of the\n  License at http://www.apache.org/licenses/LICENSE-2.0\n  \n  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\n  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\n  MERCHANTABLITY OR NON-INFRINGEMENT.\n  \n  See the Apache Version 2.0 License for specific language governing permissions\n  and limitations under the License.\n  ***************************************************************************** *)\n  (*!\n   * Reconnecting WebSocket\n   * by Pedro Ladaria <pedro.ladaria@gmail.com>\n   * https://github.com/pladaria/reconnecting-websocket\n   * License MIT\n   *)\n*/\n';

  // src/workerUtil.ts
  function handleGameData(gameEvents) {
    batch(() => {
      gameEvents.forEach((gameEvent) => {
        setReplayStateFromGameEvent(gameEvent);
      });
    });
  }
  function createWorker(wsUrl) {
    const workerUrl = URL.createObjectURL(new Blob([worker_default], { type: "text/javascript" }));
    console.log(`Creating worker from URL ${workerUrl}...`);
    const worker2 = new Worker(workerUrl);
    URL.revokeObjectURL(workerUrl);
    worker2.onmessage = (event) => {
      const data = event.data;
      switch (data.type) {
        case "game_data":
          handleGameData(data.value);
          break;
        case "connected":
          setDisconnected(false);
          break;
        case "disconnected":
          setDisconnected(true);
          break;
      }
    };
    worker2.onerror = (error) => {
      console.log(`Worker error: ${error.message}`);
      throw error;
    };
    worker2.postMessage({ type: "connect", value: wsUrl });
    return worker2;
  }

  // src/state/spectateStore.tsx
  var defaultSpectateStoreState = {
    frame: 0,
    gameEndFrame: null,
    renderDatas: [],
    animations: Array(4).fill(void 0),
    isLoading: false,
    fps: 60,
    framesPerTick: 1,
    running: false,
    zoom: 1,
    isDebug: false,
    isFullscreen: false,
    watchingLive: true,
    disconnected: false
  };
  var BUFFER_FRAME_COUNT = 2;
  var LIVE_FRAME_TOLERANCE = 20;
  var [replayState, setReplayState] = createStore(structuredClone(defaultSpectateStoreState));
  var spectateStore = replayState;
  var defaultNonReactiveState = {
    payloadSizes: void 0,
    replayFormatVersion: "0.1.0.0",
    // TODO: import from liveparser (circular dependency)
    gameFrames: [],
    firstKnownFrame: void 0,
    latestFinalizedFrame: void 0,
    stageStateOnLoad: {
      fodLeftPlatformHeight: void 0,
      fodRightPlatformHeight: void 0
    }
  };
  var nonReactiveState = structuredClone(defaultNonReactiveState);
  var worker;
  var [zipsBaseUrl, setZipsBaseUrl] = createSignal("/");
  function speedNormal() {
    batch(() => {
      setReplayState("fps", 60);
      setReplayState("framesPerTick", 1);
    });
  }
  function speedFast() {
    setReplayState("framesPerTick", 2);
  }
  function speedSlow() {
    setReplayState("fps", 30);
  }
  function zoomIn() {
    setReplayState("zoom", (z) => z * 1.01);
  }
  function zoomOut() {
    setReplayState("zoom", (z) => z / 1.01);
  }
  function toggleDebug() {
    setReplayState("isDebug", (isDebug) => !isDebug);
  }
  function toggleFullscreen() {
    setReplayState("isFullscreen", (isFullscreen) => !isFullscreen);
  }
  function togglePause() {
    running() ? pause() : start();
  }
  function pause() {
    setReplayState("watchingLive", false);
    stop();
  }
  function jump(target) {
    if (nonReactiveState.firstKnownFrame === void 0) return;
    setReplayState("watchingLive", false);
    setReplayState("frame", withinKnownFrames(wrapFrame(replayState, target)));
  }
  function jumpPercent(percent) {
    if (nonReactiveState.firstKnownFrame === void 0) return;
    const frameCount = nonReactiveState.gameFrames.length - nonReactiveState.firstKnownFrame;
    setReplayState("watchingLive", false);
    setReplayState(
      "frame",
      withinKnownFrames(Math.round(frameCount * percent) + nonReactiveState.firstKnownFrame)
      // should be within bounds anyways
    );
  }
  function jumpToLive() {
    setReplayState("watchingLive", true);
    setReplayState("frame", withinKnownFrames(nonReactiveState.gameFrames.length));
  }
  function adjust(delta) {
    setReplayState("watchingLive", false);
    setReplayState("frame", (f) => withinKnownFrames(f + delta));
  }
  var [running, start, stop] = createRAF(targetFPS(() => {
    const tryFrame = replayState.frame + replayState.framesPerTick;
    const latestFinalizedFrame = nonReactiveState.latestFinalizedFrame ?? 0;
    if (tryFrame >= latestFinalizedFrame) {
      return;
    }
    const nextFrame = replayState.watchingLive && tryFrame < latestFinalizedFrame - LIVE_FRAME_TOLERANCE ? latestFinalizedFrame : tryFrame;
    setReplayState("frame", nextFrame);
  }, () => replayState.fps));
  createEffect(() => setReplayState("running", running()));
  function setDisconnected(disconnected) {
    setReplayState("disconnected", disconnected);
  }
  function setReplayStateFromGameEvent(gameEvent) {
    switch (gameEvent.type) {
      case "event_payloads":
        handleEventPayloadsEvent();
        break;
      case "game_start":
        handleGameStartEvent(gameEvent.data);
        break;
      case "pre_frame_update":
        handlePreFrameUpdateEvent2(gameEvent.data);
        break;
      case "post_frame_update":
        handlePostFrameUpdateEvent2(gameEvent.data);
        break;
      case "game_end":
        handleGameEndEvent(gameEvent.data);
        break;
      case "frame_start":
        handleFrameStartEvent2(gameEvent.data);
        break;
      case "item_update":
        handleItemUpdateEvent2(gameEvent.data);
        break;
      case "frame_bookend":
        handleFrameBookendEvent(gameEvent.data);
        break;
      case "fod_platforms":
        handleFodPlatformsEvent2(gameEvent.data);
        break;
    }
  }
  function handleEventPayloadsEvent() {
    setReplayState({
      playbackData: void 0,
      frame: 0,
      renderDatas: []
    });
    nonReactiveState.latestFinalizedFrame = void 0;
    nonReactiveState.gameFrames = [];
  }
  function handleGameStartEvent(settings) {
    setReplayState("playbackData", {
      settings
    });
    start();
  }
  function initFrameIfNeeded2(frames, frameNumber) {
    if (frames[frameNumber] === void 0) {
      const prevFrame = frames[frameNumber - 1];
      let prevStageState;
      if (prevFrame === void 0) {
        prevStageState = nonReactiveState.stageStateOnLoad;
      } else {
        prevStageState = prevFrame.stage;
      }
      const prevFodLeftPlatformHeight = prevStageState.fodLeftPlatformHeight ?? fodInitialLeftPlatformHeight;
      const prevFodRightPlatformHeight = prevStageState.fodRightPlatformHeight ?? fodInitialRightPlatformHeight;
      return {
        frameNumber,
        players: [],
        items: [],
        stage: {
          frameNumber,
          fodLeftPlatformHeight: prevFodLeftPlatformHeight,
          fodRightPlatformHeight: prevFodRightPlatformHeight
        }
      };
    } else {
      return frames[frameNumber];
    }
  }
  function initPlayerIfNeeded2(frame, playerIndex) {
    if (frame.players[playerIndex] !== void 0) return frame;
    const players = frame.players.slice();
    players[playerIndex] = {
      frameNumber: frame.frameNumber,
      playerIndex
    };
    return {
      ...frame,
      players
    };
  }
  function handlePreFrameUpdateEvent2(playerInputs) {
    let frame = initFrameIfNeeded2(nonReactiveState.gameFrames, playerInputs.frameNumber);
    frame = initPlayerIfNeeded2(frame, playerInputs.playerIndex);
    if (nonReactiveState.firstKnownFrame === void 0) {
      nonReactiveState.firstKnownFrame = frame.frameNumber;
    }
    if (playerInputs.isNana) {
      const players = frame.players.slice();
      const player = {
        ...frame.players[playerInputs.playerIndex],
        nanaInputs: playerInputs
      };
      players[player.playerIndex] = player;
      frame = {
        ...frame,
        players
      };
      nonReactiveState.gameFrames[playerInputs.frameNumber] = frame;
    } else {
      const players = frame.players.slice();
      const player = {
        ...frame.players[playerInputs.playerIndex],
        inputs: playerInputs
      };
      players[player.playerIndex] = player;
      frame = {
        ...frame,
        players
      };
      nonReactiveState.gameFrames[playerInputs.frameNumber] = frame;
    }
  }
  function handlePostFrameUpdateEvent2(playerState) {
    const frame = nonReactiveState.gameFrames[playerState.frameNumber];
    if (playerState.isNana) {
      const players = frame.players.slice();
      const player = {
        ...players[playerState.playerIndex],
        nanaState: playerState
      };
      players[player.playerIndex] = player;
      nonReactiveState.gameFrames[playerState.frameNumber] = {
        ...frame,
        players
      };
    } else {
      const players = frame.players.slice();
      const player = {
        ...players[playerState.playerIndex],
        state: playerState
      };
      players[player.playerIndex] = player;
      nonReactiveState.gameFrames[playerState.frameNumber] = {
        ...frame,
        players
      };
    }
  }
  function handleGameEndEvent(gameEnding) {
    setReplayState({
      playbackData: {
        ...replayState.playbackData,
        ending: gameEnding
      },
      gameEndFrame: nonReactiveState.gameFrames.length - 1
    });
  }
  function handleFrameStartEvent2(frameStart) {
    const {
      frameNumber,
      randomSeed
    } = frameStart;
    const frame = initFrameIfNeeded2(nonReactiveState.gameFrames, frameNumber);
    frame.randomSeed = randomSeed;
    nonReactiveState.gameFrames[frame.frameNumber] = frame;
  }
  function handleItemUpdateEvent2(itemUpdate) {
    let frame = nonReactiveState.gameFrames[itemUpdate.frameNumber];
    const items = frame.items.slice();
    items.push(itemUpdate);
    frame = {
      ...frame,
      items
    };
    nonReactiveState.gameFrames[itemUpdate.frameNumber] = frame;
  }
  function handleFrameBookendEvent(frameBookend) {
    const prevLatestFrame = nonReactiveState.latestFinalizedFrame;
    nonReactiveState.latestFinalizedFrame = frameBookend.latestFinalizedFrame;
    if (prevLatestFrame === void 0) {
      setReplayState("frame", nonReactiveState.latestFinalizedFrame);
    }
  }
  function handleFodPlatformsEvent2(fodPlatforms) {
    const frame = nonReactiveState.gameFrames[fodPlatforms.frameNumber];
    let stage;
    if (frame === void 0) {
      stage = nonReactiveState.stageStateOnLoad;
    } else {
      stage = frame.stage;
    }
    if (fodPlatforms.platform === 1) {
      stage.fodLeftPlatformHeight = fodPlatforms.height;
    } else {
      stage.fodRightPlatformHeight = fodPlatforms.height;
    }
  }
  function setWsUrl(url) {
    worker?.terminate();
    nonReactiveState = structuredClone(defaultNonReactiveState);
    setReplayState(structuredClone(defaultSpectateStoreState));
    if (url === null) {
      return;
    }
    worker = createWorker(url);
  }
  createRoot(() => {
    const animationResources2 = [];
    for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
      animationResources2.push(createResource(() => {
        const replay = replayState.playbackData;
        if (replay === void 0) {
          return -1;
        }
        if (replay.settings === void 0) {
          return -1;
        }
        const playerSettings = replay.settings.playerSettings[playerIndex];
        if (playerSettings === void 0) {
          return -1;
        }
        if (nonReactiveState.gameFrames[replayState.frame] === void 0) {
          return -1;
        }
        const playerUpdate = nonReactiveState.gameFrames[replayState.frame].players[playerIndex];
        if (playerUpdate === void 0) {
          return playerSettings.externalCharacterId;
        }
        if (playerUpdate.state.internalCharacterId === characterNameByInternalId.indexOf("Zelda")) {
          return characterNameByExternalId.indexOf("Zelda");
        }
        if (playerUpdate.state.internalCharacterId === characterNameByInternalId.indexOf("Sheik")) {
          return characterNameByExternalId.indexOf("Sheik");
        }
        return playerSettings.externalCharacterId;
      }, (id) => id === -1 ? void 0 : fetchAnimations(id)));
    }
    animationResources2.forEach(([dataSignal], playerIndex) => createEffect(() => {
      setReplayState("animations", (animations) => {
        const newAnimations = [...animations];
        newAnimations[playerIndex] = dataSignal();
        return newAnimations;
      });
    }));
    createEffect(() => {
      const dataSignals = animationResources2.map(([dataSignal]) => dataSignal);
      setReplayState("isLoading", dataSignals.some((a) => a.loading));
    });
    createEffect(() => {
      if (replayState.playbackData === void 0) {
        return;
      }
      const frame = nonReactiveState.gameFrames[replayState.frame];
      setReplayState("renderDatas", frame === void 0 ? [] : frame.players.filter((playerUpdate) => Boolean(playerUpdate)).flatMap((playerUpdate) => {
        const animations = replayState.animations[playerUpdate.playerIndex];
        if (animations === void 0) return [];
        const renderDatas = [];
        renderDatas.push(computeRenderData(replayState, playerUpdate, animations, false));
        if (playerUpdate.nanaState != null) {
          renderDatas.push(computeRenderData(replayState, playerUpdate, animations, true));
        }
        return renderDatas;
      }));
    });
  });
  function computeRenderData(replayState3, playerUpdate, animations, isNana) {
    const playerState = playerUpdate[isNana ? "nanaState" : "state"];
    const playerInputs = playerUpdate[isNana ? "nanaInputs" : "inputs"];
    const playerSettings = replayState3.playbackData.settings.playerSettings.filter(Boolean).find((settings) => settings.playerIndex === playerUpdate.playerIndex);
    const startOfActionFrame = getStartOfAction(playerState);
    const startOfActionPlayerState = getPlayerOnFrame(playerUpdate.playerIndex, startOfActionFrame)[isNana ? "nanaState" : "state"];
    const actionName = actionNameById[playerState.actionStateId];
    const characterData = actionMapByInternalId[playerState.internalCharacterId];
    const animationName = characterData.animationMap.get(actionName) ?? characterData.specialsMap.get(playerState.actionStateId) ?? actionName;
    const animationFrames = animations[animationName];
    const visualActionFrameCounter = actionName === "RebirthWait" ? playerState.frameNumber - startOfActionFrame : playerState.actionStateFrameCounter;
    const frameIndex = animationFrameIndex({
      animationName,
      internalCharacterId: playerState.internalCharacterId,
      animationIndex: playerState.animationIndex,
      actionStateFrameCounter: visualActionFrameCounter,
      animationFrames,
      loopAfterSourceEnd: actionName === "RebirthWait"
    });
    const animationPathOrFrameReference = animationFrames?.[frameIndex];
    const path = animationPathOrFrameReference !== void 0 && (animationPathOrFrameReference.startsWith("frame") ?? false) ? animationFrames?.[Number(animationPathOrFrameReference.slice("frame".length))] : animationPathOrFrameReference;
    const rotation = animationName === "DamageFlyRoll" ? getDamageFlyRollRotation(playerState) : isSpacieUpB(playerState) ? getSpacieUpBRotation(playerState) : 0;
    const facingDirection = actionFollowsFacingDirection(animationName) ? playerState.facingDirection : startOfActionPlayerState.facingDirection;
    return {
      playerState,
      playerInputs,
      playerSettings,
      path,
      innerColor: getPlayerColor(replayState3, playerUpdate.playerIndex, playerState.isNana),
      outerColor: startOfActionPlayerState.lCancelStatus === "missed" ? "red" : playerState.hurtboxCollisionState !== "vulnerable" ? "blue" : "black",
      transforms: [
        `translate(${playerState.xPosition} ${playerState.yPosition})`,
        // TODO: rotate around true character center instead of current guessed
        // center of position+(0,8)
        `rotate(${rotation} 0 8)`,
        `scale(${characterData.scale} ${characterData.scale})`,
        `scale(${facingDirection} 1)`,
        "scale(.1 -.1) translate(-500 -500)"
      ],
      animationName,
      characterData
    };
  }
  function getDamageFlyRollRotation(playerState) {
    const previousState = getPlayerOnFrame(playerState.playerIndex, playerState.frameNumber - 1)[playerState.isNana ? "nanaState" : "state"];
    const deltaX = playerState.xPosition - previousState.xPosition;
    const deltaY = playerState.yPosition - previousState.yPosition;
    return Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;
  }
  function getSpacieUpBRotation(playerState) {
    const velocityRotation = spacieUpBRotationFromCurrentVelocity(playerState);
    if (velocityRotation !== void 0) {
      return velocityRotation;
    }
    const startOfActionPlayer = getPlayerOnFrame(playerState.playerIndex, getStartOfAction(playerState));
    const joystickDegrees = (startOfActionPlayer.inputs.processed.joystickY === 0 && startOfActionPlayer.inputs.processed.joystickX === 0 ? Math.PI / 2 : Math.atan2(startOfActionPlayer.inputs.processed.joystickY, startOfActionPlayer.inputs.processed.joystickX)) * 180 / Math.PI;
    return joystickDegrees - (startOfActionPlayer[playerState.isNana ? "nanaState" : "state"].facingDirection === -1 ? 180 : 0);
  }
  function spacieUpBRotationFromCurrentVelocity(playerState) {
    const velocityX = (playerState.isGrounded ? playerState.selfInducedGroundXSpeed : playerState.selfInducedAirXSpeed) + playerState.attackBasedXSpeed;
    const velocityY = playerState.selfInducedAirYSpeed + playerState.attackBasedYSpeed;
    if (!Number.isFinite(velocityX) || !Number.isFinite(velocityY) || velocityX === 0 && velocityY === 0) {
      return void 0;
    }
    const facing = playerState.facingDirection === -1 ? -1 : 1;
    return Math.atan2(velocityY * facing, velocityX * facing) * 180 / Math.PI;
  }
  function actionFollowsFacingDirection(animationName) {
    return animationName.includes("Jump") || ["SpecialHi", "SpecialAirHi"].includes(animationName);
  }
  function isSpacieUpB(playerState) {
    const character = characterNameByInternalId[playerState.internalCharacterId];
    return ["Fox", "Falco"].includes(character) && [355, 356, 357, 358, 359].includes(playerState.actionStateId);
  }
  function wrapFrame(replayState3, frame) {
    if (!replayState3.playbackData) return frame;
    return (frame + nonReactiveState.gameFrames.length) % nonReactiveState.gameFrames.length;
  }
  function withinKnownFrames(frame) {
    if (nonReactiveState.firstKnownFrame === void 0) return 0;
    const firstKnownFrame = nonReactiveState.firstKnownFrame;
    const lastKnownFrame = Math.max(nonReactiveState.gameFrames.length - BUFFER_FRAME_COUNT, 0);
    return Math.min(Math.max(frame, firstKnownFrame), lastKnownFrame);
  }

  // src/viewer/animationCache.ts
  var animationsCache = /* @__PURE__ */ new Map();
  var fetchAnimations = async (externalCharacterId) => {
    if (animationsCache.has(externalCharacterId)) {
      return animationsCache.get(externalCharacterId);
    }
    let zipUrl = zipsBaseUrl();
    if (!zipUrl.endsWith("/")) zipUrl += "/";
    zipUrl += characterZipUrlByExternalId[externalCharacterId];
    const animations = await load(zipUrl);
    animationsCache.set(externalCharacterId, animations);
    return animations;
  };
  var characterZipUrlByExternalId = [
    "zips/captainFalcon.zip",
    "zips/donkeyKong.zip",
    "zips/fox.zip",
    "zips/mrGameAndWatch.zip",
    "zips/kirby.zip",
    "zips/bowser.zip",
    "zips/link.zip",
    "zips/luigi.zip",
    "zips/mario.zip",
    "zips/marth.zip",
    "zips/mewtwo.zip",
    "zips/ness.zip",
    "zips/peach.zip",
    "zips/pikachu.zip",
    "zips/iceClimbers.zip",
    "zips/jigglypuff.zip",
    "zips/samus.zip",
    "zips/yoshi.zip",
    "zips/zelda.zip",
    "zips/sheik.zip",
    "zips/falco.zip",
    "zips/youngLink.zip",
    "zips/doctorMario.zip",
    "zips/roy.zip",
    "zips/pichu.zip",
    "zips/ganondorf.zip"
  ];
  async function load(url) {
    const response = await fetch(url);
    const animationsZip = await response.blob();
    const fileBuffers = unzipSync(
      new Uint8Array(await animationsZip.arrayBuffer())
    );
    return Object.fromEntries(
      Object.entries(fileBuffers).map(([name, buffer]) => [
        name.replace(".json", ""),
        JSON.parse(strFromU8(buffer))
      ])
    );
  }

  // src/state/replayStore.tsx
  var import_colors2 = __toESM(require_colors2());

  // node_modules/@shelacek/ubjson/dist/ubjson.es.js
  var r = class {
    constructor(t = {}) {
      this.t = t, this.g = new ("undefined" != typeof TextDecoder ? TextDecoder : __require("util").TextDecoder)();
    }
    decode(t) {
      const r2 = new Uint8Array(t), e = new DataView(r2.buffer);
      return this.D = { array: r2, view: e }, this.S = 0, this.C();
    }
    C(t = this.m(false)) {
      switch (t) {
        case "Z":
          return null;
        case "N":
          return;
        case "T":
          return true;
        case "F":
          return false;
        case "i":
          return this.F(({ view: t2 }, r2) => t2.getInt8(r2), 1);
        case "U":
          return this.F(({ view: t2 }, r2) => t2.getUint8(r2), 1);
        case "I":
          return this.F(({ view: t2 }, r2) => t2.getInt16(r2), 2);
        case "l":
          return this.F(({ view: t2 }, r2) => t2.getInt32(r2), 4);
        case "L":
          return this.N(8, this.t.int64Handling, true);
        case "d":
          return this.F(({ view: t2 }, r2) => t2.getFloat32(r2), 4);
        case "D":
          return this.F(({ view: t2 }, r2) => t2.getFloat64(r2), 8);
        case "H":
          return this.N(this.V(), this.t.highPrecisionNumberHandling, false);
        case "C":
          return String.fromCharCode(this.C("i"));
        case "S":
          return this.j(this.V());
        case "[":
          return this.M();
        case "{":
          return this.O();
      }
      throw Error("Unexpected type");
    }
    Z() {
      let t, r2;
      switch (this.m(true)) {
        case "$":
          if (this.q(), t = this.m(false), "#" !== this.m(true)) throw Error("Expected count marker");
        case "#":
          this.q(), r2 = this.V();
      }
      return { type: t, count: r2 };
    }
    M() {
      const { type: t, count: r2 } = this.Z();
      if (-1 !== "ZTF".indexOf(t)) return Array(r2).fill(this.C(t));
      if (this.t.useTypedArrays) switch (t) {
        case "i":
          return this.B(r2);
        case "U":
          return this.L(r2);
        case "I":
          return Int16Array.from({ length: r2 }, () => this.C(t));
        case "l":
          return Int32Array.from({ length: r2 }, () => this.C(t));
        case "d":
          return Float32Array.from({ length: r2 }, () => this.C(t));
        case "D":
          return Float64Array.from({ length: r2 }, () => this.C(t));
      }
      if (null != r2) {
        const e = Array(r2);
        for (let s2 = 0; s2 < r2; s2++) e[s2] = this.C(t);
        return e;
      }
      {
        const t2 = [];
        for (; "]" !== this.m(true); ) t2.push(this.C());
        return this.q(), t2;
      }
    }
    O() {
      const { type: t, count: r2 } = this.Z(), e = {};
      if (null != r2) for (let s2 = 0; s2 < r2; s2++) e[this.C("S")] = this.C(t);
      else {
        for (; "}" !== this.m(true); ) e[this.C("S")] = this.C();
        this.q();
      }
      return e;
    }
    V() {
      const t = this.C();
      if (Number.isInteger(t) && t >= 0) return t;
      throw Error("Invalid length/count");
    }
    N(t, r2, e) {
      if ("function" == typeof r2) return this.F(r2, t);
      switch (r2) {
        case "skip":
          return void this.q(t);
        case "raw":
          return e ? this.L(t) : this.j(t);
      }
      throw Error("Unsuported type");
    }
    L(t) {
      return this.F(({ array: r2 }, e) => new Uint8Array(r2.buffer, e, t), t);
    }
    B(t) {
      return this.F(({ array: r2 }, e) => new Int8Array(r2.buffer, e, t), t);
    }
    j(t) {
      return this.F(({ array: r2 }, e) => this.g.decode(new DataView(r2.buffer, e, t)), t);
    }
    q(t = 1) {
      this.R(t), this.S += t;
    }
    m(t) {
      const { array: r2, view: e } = this.D;
      let s2 = "N";
      for (; "N" === s2 && this.S < r2.byteLength; ) s2 = String.fromCharCode(e.getInt8(this.S++));
      return t && this.S--, s2;
    }
    F(t, r2) {
      this.R(r2);
      const e = t(this.D, this.S, r2);
      return this.S += r2, e;
    }
    R(t) {
      if (this.S + t > this.D.array.byteLength) throw Error("Unexpected EOF");
    }
  };
  function s(t, e) {
    return new r(e).decode(t);
  }

  // src/state/replayStore.tsx
  var defaultReplayStoreState = {
    frame: 0,
    renderDatas: [],
    animations: Array(4).fill(void 0),
    isLoading: false,
    fps: 60,
    framesPerTick: 1,
    running: false,
    rendererMode: false,
    zoom: 1,
    isDebug: false,
    isFullscreen: false
  };
  var [replayState2, setReplayState2] = createStore(defaultReplayStoreState);
  var replayStore = replayState2;
  function speedNormal2() {
    batch(() => {
      setReplayState2("fps", 60);
      setReplayState2("framesPerTick", 1);
    });
  }
  function speedFast2() {
    setReplayState2("framesPerTick", 2);
  }
  function speedSlow2() {
    setReplayState2("fps", 30);
  }
  function zoomIn2() {
    setReplayState2("zoom", (z) => z * 1.01);
  }
  function zoomOut2() {
    setReplayState2("zoom", (z) => z / 1.01);
  }
  function toggleDebug2() {
    setReplayState2("isDebug", (isDebug) => !isDebug);
  }
  function toggleFullscreen2() {
    setReplayState2("isFullscreen", (isFullscreen) => !isFullscreen);
  }
  function togglePause2() {
    running2() ? stop2() : start2();
  }
  function pause2() {
    stop2();
  }
  function setRendererMode(enabled) {
    setReplayState2("rendererMode", enabled);
    if (enabled) {
      stop2();
    }
  }
  function jump2(target) {
    setReplayState2("frame", wrapFrame2(replayState2, target));
  }
  function setFrameData(frameNumber, frame) {
    if (!replayState2.replayData) return;
    batch(() => {
      setReplayState2("replayData", "frames", frameNumber, frame);
      setReplayState2("frame", frameNumber);
    });
  }
  function jumpPercent2(percent) {
    setReplayState2("frame", Math.round((replayState2.replayData?.frames.length ?? 0) * percent));
  }
  function adjust2(delta) {
    setReplayState2("frame", (f) => wrapFrame2(replayState2, f + delta));
  }
  var [running2, start2, stop2] = createRAF(targetFPS(() => setReplayState2("frame", (f) => wrapFrame2(replayState2, f + replayState2.framesPerTick)), () => replayState2.fps));
  createEffect(() => setReplayState2("running", running2()));
  async function setReplay(replayFile) {
    const replayData = parseReplay(s(await replayFile.arrayBuffer(), {
      useTypedArrays: true
    }));
    setReplayData(replayData);
  }
  function setReplayData(replayData) {
    batch(() => {
      setReplayState2({
        replayData,
        frame: 0,
        renderDatas: [],
        rendererMode: false
      });
    });
    start2();
  }
  function setLiveReplayData(replayData) {
    batch(() => {
      setReplayState2({
        replayData,
        frame: 0,
        renderDatas: [],
        rendererMode: true
      });
    });
    stop2();
  }
  var animationResources = [];
  for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
    animationResources.push(createResource(() => {
      const replay = replayState2.replayData;
      if (replay === void 0) {
        return void 0;
      }
      const playerSettings = replay.settings.playerSettings[playerIndex];
      if (playerSettings === void 0) {
        return void 0;
      }
      const playerUpdate = replay.frames[replayState2.frame].players[playerIndex];
      if (playerUpdate === void 0) {
        return playerSettings.externalCharacterId;
      }
      if (playerUpdate.state.internalCharacterId === characterNameByInternalId.indexOf("Zelda")) {
        return characterNameByExternalId.indexOf("Zelda");
      }
      if (playerUpdate.state.internalCharacterId === characterNameByInternalId.indexOf("Sheik")) {
        return characterNameByExternalId.indexOf("Sheik");
      }
      return playerSettings.externalCharacterId;
    }, (id) => id === void 0 ? void 0 : fetchAnimations(id)));
  }
  animationResources.forEach(([dataSignal], playerIndex) => createEffect(() => (
    // I can't use the obvious setReplayState("animations", playerIndex,
    // dataSignal()) because it will merge into the previous animations data
    // object, essentially overwriting the previous characters animation data
    // forever
    setReplayState2("animations", (animations) => {
      const newAnimations = [...animations];
      newAnimations[playerIndex] = dataSignal();
      return newAnimations;
    })
  )));
  createEffect(() => {
    const dataSignals = animationResources.map(([dataSignal]) => dataSignal);
    setReplayState2("isLoading", dataSignals.some((a) => a.loading));
  });
  createEffect(() => {
    if (replayState2.replayData === void 0) {
      return;
    }
    setReplayState2("renderDatas", replayState2.replayData.frames[replayState2.frame].players.filter((playerUpdate) => playerUpdate).flatMap((playerUpdate) => {
      const animations = replayState2.animations[playerUpdate.playerIndex];
      if (animations === void 0) return [];
      const renderDatas = [];
      renderDatas.push(computeRenderData2(replayState2, playerUpdate, animations, false));
      if (playerUpdate.nanaState != null) {
        renderDatas.push(computeRenderData2(replayState2, playerUpdate, animations, true));
      }
      return renderDatas;
    }));
  });
  function computeRenderData2(replayState3, playerUpdate, animations, isNana) {
    const playerState = playerUpdate[isNana ? "nanaState" : "state"];
    const playerInputs = playerUpdate[isNana ? "nanaInputs" : "inputs"];
    const playerSettings = replayState3.replayData.settings.playerSettings.filter(Boolean).find((settings) => settings.playerIndex === playerUpdate.playerIndex);
    const startOfActionFrame = getStartOfAction(playerState);
    const startOfActionPlayerState = getPlayerOnFrame(playerUpdate.playerIndex, startOfActionFrame)[isNana ? "nanaState" : "state"];
    const actionName = actionNameById[playerState.actionStateId];
    const characterData = actionMapByInternalId[playerState.internalCharacterId];
    const animationName = characterData.animationMap.get(actionName) ?? characterData.specialsMap.get(playerState.actionStateId) ?? actionName ?? // Action ids past the shared table with no per-character entry (Kirby's
    // copy specials) draw nothing instead of throwing inside the render loop.
    "";
    const animationFrames = animations[animationName];
    const visualActionFrameCounter = actionName === "RebirthWait" ? playerState.frameNumber - startOfActionFrame : playerState.actionStateFrameCounter;
    const frameIndex = animationFrameIndex({
      animationName,
      internalCharacterId: playerState.internalCharacterId,
      animationIndex: playerState.animationIndex,
      actionStateFrameCounter: visualActionFrameCounter,
      animationFrames,
      loopAfterSourceEnd: actionName === "RebirthWait"
    });
    const animationPathOrFrameReference = animationFrames?.[frameIndex];
    const path = animationPathOrFrameReference !== void 0 && (animationPathOrFrameReference.startsWith("frame") ?? false) ? animationFrames?.[Number(animationPathOrFrameReference.slice("frame".length))] : animationPathOrFrameReference;
    const rotation = animationName === "DamageFlyRoll" ? getDamageFlyRollRotation2(replayState3, playerState) : isSpacieUpB2(playerState) ? getSpacieUpBRotation2(replayState3, playerState) : 0;
    const facingDirection = actionFollowsFacingDirection2(animationName) ? playerState.facingDirection : startOfActionPlayerState.facingDirection;
    return {
      playerState,
      playerInputs,
      playerSettings,
      path,
      innerColor: getPlayerColor2(replayState3, playerUpdate.playerIndex, playerState.isNana),
      outerColor: startOfActionPlayerState.lCancelStatus === "missed" ? "red" : playerState.hurtboxCollisionState !== "vulnerable" ? "blue" : "black",
      transforms: [
        `translate(${playerState.xPosition} ${playerState.yPosition})`,
        // TODO: rotate around true character center instead of current guessed
        // center of position+(0,8)
        `rotate(${rotation} 0 8)`,
        `scale(${characterData.scale} ${characterData.scale})`,
        `scale(${facingDirection} 1)`,
        "scale(.1 -.1) translate(-500 -500)"
      ],
      animationName,
      characterData
    };
  }
  function getDamageFlyRollRotation2(replayState3, playerState) {
    const key = playerState.isNana ? "nanaState" : "state";
    const before = getPlayerOnFrame(playerState.playerIndex, playerState.frameNumber - 1);
    if (!before?.[key]) {
      const after = getPlayerOnFrame(playerState.playerIndex, playerState.frameNumber + 1);
      const next = after?.[key];
      if (!next) return 0;
      return Math.atan2(next.yPosition - playerState.yPosition, next.xPosition - playerState.xPosition) * 180 / Math.PI - 90;
    }
    const previousState = before[key];
    const deltaX = playerState.xPosition - previousState.xPosition;
    const deltaY = playerState.yPosition - previousState.yPosition;
    return Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;
  }
  function getSpacieUpBRotation2(replayState3, playerState) {
    const velocityRotation = spacieUpBRotationFromCurrentVelocity2(playerState);
    if (velocityRotation !== void 0) {
      return velocityRotation;
    }
    const startOfActionPlayer = getPlayerOnFrame(playerState.playerIndex, getStartOfAction(playerState));
    const joystickDegrees = (startOfActionPlayer.inputs.processed.joystickY === 0 && startOfActionPlayer.inputs.processed.joystickX === 0 ? Math.PI / 2 : Math.atan2(startOfActionPlayer.inputs.processed.joystickY, startOfActionPlayer.inputs.processed.joystickX)) * 180 / Math.PI;
    return joystickDegrees - (startOfActionPlayer[playerState.isNana ? "nanaState" : "state"].facingDirection === -1 ? 180 : 0);
  }
  function spacieUpBRotationFromCurrentVelocity2(playerState) {
    const velocityX = (playerState.isGrounded ? playerState.selfInducedGroundXSpeed : playerState.selfInducedAirXSpeed) + playerState.attackBasedXSpeed;
    const velocityY = playerState.selfInducedAirYSpeed + playerState.attackBasedYSpeed;
    if (!Number.isFinite(velocityX) || !Number.isFinite(velocityY) || velocityX === 0 && velocityY === 0) {
      return void 0;
    }
    const facing = playerState.facingDirection === -1 ? -1 : 1;
    return Math.atan2(velocityY * facing, velocityX * facing) * 180 / Math.PI;
  }
  function actionFollowsFacingDirection2(animationName) {
    return animationName.includes("Jump") || ["SpecialHi", "SpecialAirHi"].includes(animationName);
  }
  function isSpacieUpB2(playerState) {
    const character = characterNameByInternalId[playerState.internalCharacterId];
    return ["Fox", "Falco"].includes(character) && [355, 356, 357, 358, 359].includes(playerState.actionStateId);
  }
  function getPlayerColor2(replayState3, playerIndex, isNana) {
    if (replayState3.replayData.settings.isTeams) {
      const settings = replayState3.replayData.settings.playerSettings[playerIndex];
      return [[import_colors2.default.red["800"], import_colors2.default.red["600"]], [import_colors2.default.green["800"], import_colors2.default.green["600"]], [import_colors2.default.blue["800"], import_colors2.default.blue["600"]]][settings.teamId][isNana ? 1 : settings.teamShade];
    }
    return [[import_colors2.default.red["700"], import_colors2.default.red["600"]], [import_colors2.default.blue["700"], import_colors2.default.blue["600"]], [import_colors2.default.yellow["500"], import_colors2.default.yellow["400"]], [import_colors2.default.green["700"], import_colors2.default.green["600"]]][playerIndex][isNana ? 1 : 0];
  }
  function wrapFrame2(replayState3, frame) {
    if (!replayState3.replayData) return frame;
    return (frame + replayState3.replayData.frames.length) % replayState3.replayData.frames.length;
  }

  // src/state/accessor.ts
  var { replayPointer, setReplayPointerWrapper } = createRoot(() => {
    const [replayPointer2, setReplayPointer] = createSignal(null);
    const setReplayPointerWrapper2 = (p) => {
      if (p === null) {
        setWsUrl(null);
        setRendererMode(false);
      }
      if (p?.mode === "spectate") {
        setRendererMode(false);
        setWsUrl(p.url);
      } else if (p?.mode === "replay") {
        setRendererMode(false);
        setReplay(p.file);
      } else if (p?.mode === "replay-data") {
        setReplayData(p.replayData);
      } else if (p?.mode === "live-data") {
        setLiveReplayData(p.replayData);
      }
      setReplayPointer(p);
    };
    return { replayPointer: replayPointer2, setReplayPointerWrapper: setReplayPointerWrapper2 };
  });
  function access(attribute) {
    const pointerMode = replayPointer()?.mode;
    const mode = pointerMode === "spectate" ? "spectate" : pointerMode ? "replay" : void 0;
    if (!mode) {
      return void 0;
    }
    switch (attribute) {
      case "currentFrame":
        const frames = access("frames");
        return frames === void 0 ? void 0 : frames[access("frame")];
    }
    const attributeDictionary = {
      "settings": {
        "replay": () => replayStore.replayData?.settings,
        "spectate": () => spectateStore.playbackData?.settings
      },
      "ending": {
        "replay": () => replayStore.replayData?.ending,
        "spectate": () => spectateStore.playbackData?.ending
      },
      "frames": {
        "replay": () => replayStore.replayData?.frames,
        "spectate": () => nonReactiveState.gameFrames
      },
      "replayFormatVersion": {
        "replay": () => replayStore.replayData?.settings.replayFormatVersion,
        "spectate": () => nonReactiveState.replayFormatVersion
      },
      "animations": {
        "replay": () => replayStore.animations,
        "spectate": () => spectateStore.animations
      },
      "isLoading": {
        "replay": () => replayStore.isLoading,
        "spectate": () => spectateStore.isLoading
      },
      "frame": {
        "replay": () => replayStore.frame,
        "spectate": () => spectateStore.frame
      },
      "renderDatas": {
        "replay": () => replayStore.renderDatas,
        "spectate": () => spectateStore.renderDatas
      },
      "framesPerTick": {
        "replay": () => replayStore.framesPerTick,
        "spectate": () => spectateStore.framesPerTick
      },
      "running": {
        "replay": () => replayStore.running,
        "spectate": () => spectateStore.running
      },
      "rendererMode": {
        "replay": () => replayStore.rendererMode,
        "spectate": () => false
      },
      "zoom": {
        "replay": () => replayStore.zoom,
        "spectate": () => spectateStore.zoom
      },
      "isDebug": {
        "replay": () => replayStore.isDebug,
        "spectate": () => spectateStore.isDebug
      },
      "isFullscreen": {
        "replay": () => replayStore.isFullscreen,
        "spectate": () => spectateStore.isFullscreen
      },
      "watchingLive": {
        "replay": () => false,
        "spectate": () => spectateStore.watchingLive
      },
      "disconnected": {
        "replay": () => false,
        "spectate": () => spectateStore.disconnected
      }
    };
    return attributeDictionary[attribute][mode]();
  }

  // src/components/viewer/Camera.tsx
  var _tmpl$ = /* @__PURE__ */ template(`<svg><g></svg>`, false, true, false);
  function Camera(props) {
    const [center, setCenter] = createSignal();
    const [scale, setScale] = createSignal();
    createEffect(() => {
      const followSpeeds = [0.04, 0.04];
      const padding = [25, 25];
      const minimums = [100, 100];
      const currentFrame = access("currentFrame");
      if (!currentFrame) return;
      const focuses = currentFrame.players.filter(Boolean).map((player) => ({
        x: player.state.xPosition,
        y: player.state.yPosition
      }));
      const xs = focuses.map(({
        x
      }) => x);
      const ys = focuses.map(({
        y
      }) => y);
      const xMin = Math.min(...xs) - padding[0];
      const xMax = Math.max(...xs) + padding[0];
      const yMin = Math.min(...ys) - padding[1];
      const yMax = Math.max(...ys) + padding[1];
      const newCenterX = (xMin + xMax) / 2;
      const newCenterY = (yMin + yMax) / 2;
      const xRange = Math.max(xMax - xMin, minimums[0]);
      const yRange = Math.max(yMax - yMin, minimums[1]);
      const scaling = Math.min(640 / xRange, 480 / yRange);
      setCenter((oldCenter) => [smooth(oldCenter?.[0] ?? newCenterX, newCenterX, followSpeeds[0]), smooth(oldCenter?.[1] ?? newCenterY, newCenterY, followSpeeds[1])]);
      setScale((oldScaling) => access("zoom") * smooth(oldScaling ?? 5, scaling, Math.max(...followSpeeds)));
    });
    const transforms = createMemo(() => [`scale(${scale() ?? 1})`, `translate(${(center()?.[0] ?? 0) * -1}, ${(center()?.[1] ?? 0) * -1})`].join(" "));
    return (() => {
      var _el$ = _tmpl$();
      insert(_el$, () => props.children);
      createRenderEffect(() => setAttribute(_el$, "transform", transforms()));
      return _el$;
    })();
  }
  function smooth(from, to, byPercent) {
    return from + (to - from) * byPercent;
  }

  // src/components/viewer/PlayerHUD.tsx
  var _tmpl$2 = /* @__PURE__ */ template(`<svg><text text-anchor=middle stroke=black> </svg>`, false, true, false);
  var _tmpl$22 = /* @__PURE__ */ template(`<svg><circle r=5 stroke=black></svg>`, false, true, false);
  var _tmpl$3 = /* @__PURE__ */ template(`<svg><text y=-40% text-anchor=middle stroke=black> </svg>`, false, true, false);
  var _tmpl$4 = /* @__PURE__ */ template(`<svg><text y=-37% text-anchor=middle stroke=black> </svg>`, false, true, false);
  var _tmpl$5 = /* @__PURE__ */ template(`<svg><text y=-34% text-anchor=middle stroke=black> </svg>`, false, true, false);
  var _tmpl$6 = /* @__PURE__ */ template(`<svg><text y=-31% text-anchor=middle stroke=black> </svg>`, false, true, false);
  var _tmpl$7 = /* @__PURE__ */ template(`<svg><text y=-28% text-anchor=middle stroke=black> </svg>`, false, true, false);
  function PlayerHUD(props) {
    const renderData = createMemo(() => access("renderDatas").find((renderData2) => renderData2.playerSettings.playerIndex === props.player && renderData2.playerState.isNana === false));
    const position = createMemo(() => ({
      x: -30 + 20 * props.player,
      // ports at: -30%, -10%, 10%, 30%
      y: 40
      // y% is flipped by css to make the text right-side up.
    }));
    const name = createMemo(() => renderData() ? [renderData().playerSettings.displayName, renderData().playerSettings.connectCode, renderData().playerSettings.nametag, renderData().playerSettings.displayName, characterNameByInternalId[renderData().playerState.internalCharacterId]].find((n) => n !== void 0 && n.length > 0) : "");
    const hat = createMemo(() => {
      const kind = renderData()?.playerState.kirbyHatKind;
      return kind === void 0 ? "" : ` (${characterNameByInternalId[kind]} hat)`;
    });
    return createComponent(Show, {
      get when() {
        return renderData();
      },
      get children() {
        return [createComponent(For, {
          get each() {
            return Array(renderData().playerState.stocksRemaining).fill(0);
          },
          children: (_, i) => (() => {
            var _el$5 = _tmpl$22();
            createRenderEffect((_p$) => {
              var _v$9 = `${position().x - 2 * (1.5 - i())}%`, _v$10 = `-${position().y}%`, _v$11 = renderData().innerColor;
              _v$9 !== _p$.e && setAttribute(_el$5, "cx", _p$.e = _v$9);
              _v$10 !== _p$.t && setAttribute(_el$5, "cy", _p$.t = _v$10);
              _v$11 !== _p$.a && setAttribute(_el$5, "fill", _p$.a = _v$11);
              return _p$;
            }, {
              e: void 0,
              t: void 0,
              a: void 0
            });
            return _el$5;
          })()
        }), (() => {
          var _el$ = _tmpl$2(), _el$2 = _el$.firstChild;
          _el$.style.setProperty("font", "bold 15px sans-serif");
          _el$.style.setProperty("transform", "scaleY(-1)");
          createRenderEffect((_p$) => {
            var _v$ = `${position().x}%`, _v$2 = `${position().y + 4}%`, _v$3 = `${Math.floor(renderData().playerState.percent)}%`, _v$4 = renderData().innerColor;
            _v$ !== _p$.e && setAttribute(_el$, "x", _p$.e = _v$);
            _v$2 !== _p$.t && setAttribute(_el$, "y", _p$.t = _v$2);
            _v$3 !== _p$.a && (_el$2.data = _p$.a = _v$3);
            _v$4 !== _p$.o && setAttribute(_el$, "fill", _p$.o = _v$4);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          });
          return _el$;
        })(), (() => {
          var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild;
          _el$3.style.setProperty("font", "bold 15px sans-serif");
          _el$3.style.setProperty("transform", "scaleY(-1)");
          createRenderEffect((_p$) => {
            var _v$5 = `${position().x}%`, _v$6 = `${position().y + 7}%`, _v$7 = `${name()}${hat()}`, _v$8 = renderData().innerColor;
            _v$5 !== _p$.e && setAttribute(_el$3, "x", _p$.e = _v$5);
            _v$6 !== _p$.t && setAttribute(_el$3, "y", _p$.t = _v$6);
            _v$7 !== _p$.a && (_el$4.data = _p$.a = _v$7);
            _v$8 !== _p$.o && setAttribute(_el$3, "fill", _p$.o = _v$8);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          });
          return _el$3;
        })(), createComponent(Show, {
          get when() {
            return access("isDebug");
          },
          get children() {
            return createComponent(Debug, {
              get position() {
                return position();
              },
              get renderData() {
                return renderData();
              }
            });
          }
        })];
      }
    });
  }
  function Debug(props) {
    return [(() => {
      var _el$6 = _tmpl$3(), _el$7 = _el$6.firstChild;
      _el$6.style.setProperty("font", "bold 15px sans-serif");
      _el$6.style.setProperty("transform", "scaleY(-1)");
      createRenderEffect((_p$) => {
        var _v$12 = `${props.position.x}%`, _v$13 = `State ID: ${props.renderData.playerState.actionStateId}`, _v$14 = props.renderData.innerColor;
        _v$12 !== _p$.e && setAttribute(_el$6, "x", _p$.e = _v$12);
        _v$13 !== _p$.t && (_el$7.data = _p$.t = _v$13);
        _v$14 !== _p$.a && setAttribute(_el$6, "fill", _p$.a = _v$14);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$6;
    })(), (() => {
      var _el$8 = _tmpl$4(), _el$9 = _el$8.firstChild;
      _el$8.style.setProperty("font", "bold 15px sans-serif");
      _el$8.style.setProperty("transform", "scaleY(-1)");
      createRenderEffect((_p$) => {
        var _v$15 = `${props.position.x}%`, _v$16 = `State Frame: ${parseFloat(props.renderData.playerState.actionStateFrameCounter.toFixed(4))}`, _v$17 = props.renderData.innerColor;
        _v$15 !== _p$.e && setAttribute(_el$8, "x", _p$.e = _v$15);
        _v$16 !== _p$.t && (_el$9.data = _p$.t = _v$16);
        _v$17 !== _p$.a && setAttribute(_el$8, "fill", _p$.a = _v$17);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$8;
    })(), (() => {
      var _el$10 = _tmpl$5(), _el$11 = _el$10.firstChild;
      _el$10.style.setProperty("font", "bold 15px sans-serif");
      _el$10.style.setProperty("transform", "scaleY(-1)");
      createRenderEffect((_p$) => {
        var _v$18 = `${props.position.x}%`, _v$19 = `X: ${parseFloat(props.renderData.playerState.xPosition.toFixed(4))}`, _v$20 = props.renderData.innerColor;
        _v$18 !== _p$.e && setAttribute(_el$10, "x", _p$.e = _v$18);
        _v$19 !== _p$.t && (_el$11.data = _p$.t = _v$19);
        _v$20 !== _p$.a && setAttribute(_el$10, "fill", _p$.a = _v$20);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$10;
    })(), (() => {
      var _el$12 = _tmpl$6(), _el$13 = _el$12.firstChild;
      _el$12.style.setProperty("font", "bold 15px sans-serif");
      _el$12.style.setProperty("transform", "scaleY(-1)");
      createRenderEffect((_p$) => {
        var _v$21 = `${props.position.x}%`, _v$22 = `Y: ${parseFloat(props.renderData.playerState.yPosition.toFixed(4))}`, _v$23 = props.renderData.innerColor;
        _v$21 !== _p$.e && setAttribute(_el$12, "x", _p$.e = _v$21);
        _v$22 !== _p$.t && (_el$13.data = _p$.t = _v$22);
        _v$23 !== _p$.a && setAttribute(_el$12, "fill", _p$.a = _v$23);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$12;
    })(), (() => {
      var _el$14 = _tmpl$7(), _el$15 = _el$14.firstChild;
      _el$14.style.setProperty("font", "bold 15px sans-serif");
      _el$14.style.setProperty("transform", "scaleY(-1)");
      createRenderEffect((_p$) => {
        var _v$24 = `${props.position.x}%`, _v$25 = props.renderData.animationName, _v$26 = props.renderData.innerColor;
        _v$24 !== _p$.e && setAttribute(_el$14, "x", _p$.e = _v$24);
        _v$25 !== _p$.t && (_el$15.data = _p$.t = _v$25);
        _v$26 !== _p$.a && setAttribute(_el$14, "fill", _p$.a = _v$26);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$14;
    })()];
  }

  // src/components/viewer/Timer.tsx
  var _tmpl$8 = /* @__PURE__ */ template(`<svg><text text-anchor=middle y=-42% class=fill-slate-800> </svg>`, false, true, false);
  function Timer() {
    const meleeHundredths = ["00", "02", "04", "06", "07", "09", "11", "12", "14", "16", "17", "19", "21", "22", "24", "26", "27", "29", "31", "32", "34", "36", "37", "39", "41", "42", "44", "46", "47", "49", "51", "53", "54", "56", "58", "59", "61", "63", "64", "66", "68", "69", "71", "73", "74", "76", "78", "79", "81", "83", "84", "86", "88", "89", "91", "93", "94", "96", "98", "99"];
    const time = createMemo(() => {
      const frames = access("settings").timerStart * 60 - access("frame") + 123;
      const minutes = Math.floor(frames / (60 * 60)).toString().padStart(2, "0");
      const seconds = Math.floor(frames % (60 * 60) / 60).toString().padStart(2, "0");
      const hundredths = meleeHundredths[frames % 60];
      return `${minutes}:${seconds}:${hundredths}`;
    });
    return (() => {
      var _el$ = _tmpl$8(), _el$2 = _el$.firstChild;
      _el$.style.setProperty("font", "bold 15px sans-serif");
      _el$.style.setProperty("transform", "scaleY(-1)");
      createRenderEffect(() => _el$2.data = time());
      return _el$;
    })();
  }

  // src/components/viewer/HUD.tsx
  function HUD() {
    const playerIndexes = createMemo(() => access("settings").playerSettings.filter(Boolean).map((playerSettings) => playerSettings.playerIndex));
    return [createComponent(Timer, {}), createComponent(For, {
      get each() {
        return playerIndexes();
      },
      children: (playerIndex) => createComponent(PlayerHUD, {
        player: playerIndex
      })
    })];
  }

  // src/components/viewer/Player.tsx
  var _tmpl$9 = /* @__PURE__ */ template(`<svg><path stroke-width=2></svg>`, false, true, false);
  var _tmpl$23 = /* @__PURE__ */ template(`<svg><circle opacity=0.6></svg>`, false, true, false);
  var _tmpl$32 = /* @__PURE__ */ template(`<svg><defs><mask id=innerHexagon><polygon fill=white></polygon><polygon fill=black></svg>`, false, true, false);
  var _tmpl$42 = /* @__PURE__ */ template(`<svg><polygon fill=#8abce9 mask=url(#innerHexagon)></svg>`, false, true, false);
  function Players() {
    return createComponent(For, {
      get each() {
        return access("renderDatas");
      },
      children: (renderData) => [(() => {
        var _el$ = _tmpl$9();
        createRenderEffect((_p$) => {
          var _v$ = renderData.transforms.join(" "), _v$2 = renderData.path, _v$3 = renderData.innerColor, _v$4 = renderData.outerColor;
          _v$ !== _p$.e && setAttribute(_el$, "transform", _p$.e = _v$);
          _v$2 !== _p$.t && setAttribute(_el$, "d", _p$.t = _v$2);
          _v$3 !== _p$.a && setAttribute(_el$, "fill", _p$.a = _v$3);
          _v$4 !== _p$.o && setAttribute(_el$, "stroke", _p$.o = _v$4);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        });
        return _el$;
      })(), createComponent(Shield, {
        renderData
      }), createComponent(Shine, {
        renderData
      })]
    });
  }
  function Shield(props) {
    const shieldHealth = createMemo(() => props.renderData.playerState.shieldSize);
    const triggerStrength = createMemo(() => props.renderData.animationName === "GuardDamage" ? getPlayerOnFrame(props.renderData.playerSettings.playerIndex, getStartOfAction(props.renderData.playerState)).inputs.processed.anyTrigger : props.renderData.playerInputs.processed.anyTrigger === 0 ? 1 : props.renderData.playerInputs.processed.anyTrigger);
    const triggerStrengthMultiplier = createMemo(() => 1 - 0.5 * (triggerStrength() - 0.3) / 0.7);
    const shieldSizeMultiplier = createMemo(() => shieldHealth() * triggerStrengthMultiplier() / 60 * 0.85 + 0.15);
    const shieldTiltDistance = createMemo(() => props.renderData.characterData.shieldSize * 0.25);
    const shieldX = createMemo(() => {
      const x = props.renderData.playerState.shieldX;
      return typeof x === "number" && Number.isFinite(x) ? x : props.renderData.playerState.xPosition + props.renderData.characterData.shieldOffset[0] * props.renderData.playerState.facingDirection + (props.renderData.playerState.shieldTiltX ?? 0) * shieldTiltDistance();
    });
    const shieldY = createMemo(() => {
      const y = props.renderData.playerState.shieldY;
      return typeof y === "number" && Number.isFinite(y) ? y : props.renderData.playerState.yPosition + props.renderData.characterData.shieldOffset[1] + (props.renderData.playerState.shieldTiltY ?? 0) * shieldTiltDistance();
    });
    const shieldRadius = createMemo(() => {
      const r2 = props.renderData.playerState.shieldRadius;
      return typeof r2 === "number" && Number.isFinite(r2) && r2 > 0 ? r2 : props.renderData.characterData.shieldSize * shieldSizeMultiplier();
    });
    return createComponent(Show, {
      get when() {
        return ["GuardOn", "Guard", "GuardReflect", "GuardDamage"].includes(props.renderData.animationName);
      },
      get children() {
        var _el$2 = _tmpl$23();
        createRenderEffect((_p$) => {
          var _v$5 = shieldX(), _v$6 = shieldY(), _v$7 = shieldRadius(), _v$8 = props.renderData.innerColor;
          _v$5 !== _p$.e && setAttribute(_el$2, "cx", _p$.e = _v$5);
          _v$6 !== _p$.t && setAttribute(_el$2, "cy", _p$.t = _v$6);
          _v$7 !== _p$.a && setAttribute(_el$2, "r", _p$.a = _v$7);
          _v$8 !== _p$.o && setAttribute(_el$2, "fill", _p$.o = _v$8);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        });
        return _el$2;
      }
    });
  }
  function Shine(props) {
    const characterName = createMemo(() => characterNameByExternalId[props.renderData.playerSettings.externalCharacterId]);
    return createComponent(Show, {
      get when() {
        return createMemo(() => !!["Fox", "Falco"].includes(characterName()))() && (props.renderData.animationName.includes("SpecialLw") || props.renderData.animationName.includes("SpecialAirLw"));
      },
      get children() {
        return createComponent(Hexagon, {
          get x() {
            return props.renderData.playerState.xPosition;
          },
          get y() {
            return props.renderData.playerState.yPosition + props.renderData.characterData.shieldOffset[1] * 3 / 4;
          },
          r: 6
        });
      }
    });
  }
  function Hexagon(props) {
    const hexagonHole = 0.6;
    const sideX = Math.sin(2 * Math.PI / 6);
    const sideY = 0.5;
    const offsets = [[0, 1], [sideX, sideY], [sideX, -sideY], [0, -1], [-sideX, -sideY], [-sideX, sideY]];
    const points = createMemo(() => offsets.map(([xOffset, yOffset]) => [props.r * xOffset + props.x, props.r * yOffset + props.y].join(",")).join(","));
    const maskPoints = createMemo(() => offsets.map(([xOffset, yOffset]) => [props.r * xOffset * hexagonHole + props.x, props.r * yOffset * hexagonHole + props.y].join(",")).join(","));
    return [(() => {
      var _el$3 = _tmpl$32(), _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling;
      createRenderEffect((_p$) => {
        var _v$9 = points(), _v$10 = maskPoints();
        _v$9 !== _p$.e && setAttribute(_el$5, "points", _p$.e = _v$9);
        _v$10 !== _p$.t && setAttribute(_el$6, "points", _p$.t = _v$10);
        return _p$;
      }, {
        e: void 0,
        t: void 0
      });
      return _el$3;
    })(), (() => {
      var _el$7 = _tmpl$42();
      createRenderEffect(() => setAttribute(_el$7, "points", points()));
      return _el$7;
    })()];
  }

  // src/components/viewer/Stage.tsx
  var _tmpl$10 = /* @__PURE__ */ template(`<svg><polyline class=fill-slate-800></svg>`, false, true, false);
  var _tmpl$24 = /* @__PURE__ */ template(`<svg><rect fill=none class=stroke-slate-800></svg>`, false, true, false);
  var _tmpl$33 = /* @__PURE__ */ template(`<svg><polyline class=stroke-slate-800></svg>`, false, true, false);
  var _tmpl$43 = /* @__PURE__ */ template(`<svg><polyline class="fill-slate-800 stroke-slate-800"></svg>`, false, true, false);
  var _tmpl$52 = /* @__PURE__ */ template(`<svg><polyline class=stroke-slate-400></svg>`, false, true, false);
  var _tmpl$62 = /* @__PURE__ */ template(`<svg><polyline stroke-dasharray=2,4 class=stroke-slate-800></svg>`, false, true, false);
  var _tmpl$72 = /* @__PURE__ */ template(`<svg><line class="stroke-slippi-50 stroke-[0.1]"></svg>`, false, true, false);
  function Stage() {
    const stageName = createMemo(() => stageNameByExternalId[access("settings").stageId]);
    return createComponent(Switch, {
      get children() {
        return [createComponent(Match, {
          get when() {
            return stageName() === "Battlefield";
          },
          get children() {
            return createComponent(Battlefield, {});
          }
        }), createComponent(Match, {
          get when() {
            return stageName() === "Dream Land N64";
          },
          get children() {
            return createComponent(Dreamland, {});
          }
        }), createComponent(Match, {
          get when() {
            return stageName() === "Final Destination";
          },
          get children() {
            return createComponent(FinalDestination, {});
          }
        }), createComponent(Match, {
          get when() {
            return stageName() === "Yoshi's Story";
          },
          get children() {
            return createComponent(YoshisStory, {});
          }
        }), createComponent(Match, {
          get when() {
            return stageName() === "Fountain of Dreams";
          },
          get children() {
            return createComponent(FountainOfDreams, {});
          }
        }), createComponent(Match, {
          get when() {
            return stageName() === "Pok\xE9mon Stadium";
          },
          get children() {
            return createComponent(PokemonStadium, {});
          }
        })];
      }
    });
  }
  function Battlefield() {
    const mainStage = ["-68.4, 0", " 68.4, 0", "65, -6", "36, -19", "39, -21", "33, -25", "30, -29", "29, -35", "10, -40", "10, -30", "-10, -30", "-10, -40", "-29, -35", "-30, -29", "-33, -25", "-39, -21", "-36, -19", "-65, -6", "-68.4, 0"];
    const platforms = [["-57.6, 27.2", "-20, 27.2"], ["20, 27.2", "57.6, 27.2"], ["-18.8, 54.4", "18.8, 54.4"]];
    const blastzones = [[-224, -108.8], [224, 200]];
    return [createComponent(Grid, {
      blastzones
    }), (() => {
      var _el$ = _tmpl$10();
      createRenderEffect(() => setAttribute(_el$, "points", mainStage.join(" ")));
      return _el$;
    })(), createComponent(For, {
      each: platforms,
      children: (points) => (() => {
        var _el$3 = _tmpl$33();
        createRenderEffect(() => setAttribute(_el$3, "points", points.join(" ")));
        return _el$3;
      })()
    }), (() => {
      var _el$2 = _tmpl$24();
      createRenderEffect((_p$) => {
        var _v$ = blastzones[0][0], _v$2 = blastzones[0][1], _v$3 = blastzones[1][0] - blastzones[0][0], _v$4 = blastzones[1][1] - blastzones[0][1];
        _v$ !== _p$.e && setAttribute(_el$2, "x", _p$.e = _v$);
        _v$2 !== _p$.t && setAttribute(_el$2, "y", _p$.t = _v$2);
        _v$3 !== _p$.a && setAttribute(_el$2, "width", _p$.a = _v$3);
        _v$4 !== _p$.o && setAttribute(_el$2, "height", _p$.o = _v$4);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$2;
    })()];
  }
  function Dreamland() {
    const mainStage = ["-76.5, -11", "-77.25, 0", "77.25, 0", "76.5, -11", "76.5, -11", "65.75, -36", "-65.75, -36", "-76.5, -11"];
    const platforms = [["-61.393, 30.142", "-31.725, 30.142"], ["31.704, 30.243", "63.075, 30.243"], ["-19.018, 51.425", "19.017, 51.425"]];
    const blastzones = [[-255, -123], [255, 250]];
    return [createComponent(Grid, {
      blastzones
    }), (() => {
      var _el$4 = _tmpl$10();
      createRenderEffect(() => setAttribute(_el$4, "points", mainStage.join(" ")));
      return _el$4;
    })(), createComponent(For, {
      each: platforms,
      children: (points) => (() => {
        var _el$6 = _tmpl$33();
        createRenderEffect(() => setAttribute(_el$6, "points", points.join(" ")));
        return _el$6;
      })()
    }), (() => {
      var _el$5 = _tmpl$24();
      createRenderEffect((_p$) => {
        var _v$5 = blastzones[0][0], _v$6 = blastzones[0][1], _v$7 = blastzones[1][0] - blastzones[0][0], _v$8 = blastzones[1][1] - blastzones[0][1];
        _v$5 !== _p$.e && setAttribute(_el$5, "x", _p$.e = _v$5);
        _v$6 !== _p$.t && setAttribute(_el$5, "y", _p$.t = _v$6);
        _v$7 !== _p$.a && setAttribute(_el$5, "width", _p$.a = _v$7);
        _v$8 !== _p$.o && setAttribute(_el$5, "height", _p$.o = _v$8);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$5;
    })()];
  }
  function FinalDestination() {
    const mainStage = ["-85.6, 0", "85.6, 0", "85.6, -10", "65, -20", "65, -30", "60, -47", "50, -55", "45, -56", "-45, -56", "-50, -55", "-60, -47", "-65, -30", "-65, -20", "-85.6, -10", "-85.6, 0"];
    const blastzones = [[-246, -140], [246, 188]];
    return [createComponent(Grid, {
      blastzones
    }), (() => {
      var _el$7 = _tmpl$10();
      createRenderEffect(() => setAttribute(_el$7, "points", mainStage.join(" ")));
      return _el$7;
    })(), (() => {
      var _el$8 = _tmpl$24();
      createRenderEffect((_p$) => {
        var _v$9 = blastzones[0][0], _v$10 = blastzones[0][1], _v$11 = blastzones[1][0] - blastzones[0][0], _v$12 = blastzones[1][1] - blastzones[0][1];
        _v$9 !== _p$.e && setAttribute(_el$8, "x", _p$.e = _v$9);
        _v$10 !== _p$.t && setAttribute(_el$8, "y", _p$.t = _v$10);
        _v$11 !== _p$.a && setAttribute(_el$8, "width", _p$.a = _v$11);
        _v$12 !== _p$.o && setAttribute(_el$8, "height", _p$.o = _v$12);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$8;
    })()];
  }
  function YoshisStory() {
    const mainStage = ["-54, -91", "-54, -47", "-53, -46", "-53, -31", "-54, -30", "-54, -28", "-53, -27", "-53, -12", "-53, -12", "-54, -11", "-55, -8", "-56, -7", "-56, -3.5", "-39, 0", "39, 0", "56, -3.5", "56, -7", "55, -8", "54, -11", "53, -12", "53, -27", "54, -28", "54, -30", "53, -31", "53, -46", "54, -47", "54, -91", "-54, -91"];
    const platforms = [["-59.5, 23.45", "-28, 23.45"], ["28, 23.45", "59.5, 23.45"], ["-15.75, 42", "15.75, 42"]];
    const randall = createMemo(() => {
      const stageRandall = access("currentFrame").stage.randall;
      if (stageRandall?.exists) {
        const halfWidth = 5.95;
        return [[stageRandall.x - halfWidth, stageRandall.y], [stageRandall.x + halfWidth, stageRandall.y]];
      }
      const cornerPositions = {
        416: [-33.184478759765625, 89.75263977050781],
        417: [-33.04470443725586, 90.07878112792969],
        418: [-32.904930114746094, 90.40492248535156],
        419: [-32.76515197753906, 90.73107147216797],
        420: [-32.49260711669922, 90.92455291748047],
        421: [-32.16635513305664, 91.06437683105469],
        422: [-31.84010314941406, 91.20419311523438],
        423: [-31.513851165771484, 91.3440170288086],
        469: [-15.1948881149292, 91.3371353149414],
        470: [-14.868742942810059, 91.1973648071289],
        471: [-14.542601585388184, 91.05758666992188],
        472: [-14.216456413269043, 90.91781616210938],
        473: [-13.967143058776855, 90.71036529541016],
        474: [-13.869664192199707, 90.36917877197266],
        475: [-13.772183418273926, 90.02799224853516],
        476: [-13.674698829650879, 89.68680572509766],
        1069: [-31.59004211425781, -103.554931640625],
        1070: [-31.907413482666016, -103.39625549316406],
        1071: [-32.22478485107422, -103.23756408691406],
        1072: [-32.54215621948242, -103.07887268066406],
        1073: [-32.7216796875, -102.77439880371094],
        1074: [-32.89775085449219, -102.46626281738281],
        1075: [-33.07382583618164, -102.15814208984375],
        1016: [-13.679760932922363, -101.919677734375],
        1017: [-13.819535255432129, -102.24581909179688],
        1018: [-13.959305763244629, -102.57196044921875],
        1019: [-14.099089622497559, -102.8981018066406],
        1020: [-14.320136070251465, -103.1476135253906],
        1021: [-14.6375150680542, -103.3063049316406],
        1022: [-14.954894065856934, -103.4649963378906]
      };
      const frameInLap = (access("frame") - 123 + 1200) % 1200;
      const randallWidth = 11.9;
      if (frameInLap > 476 && frameInLap < 1016) {
        const start3 = 101.235443115234;
        const speed = -0.35484;
        const frameInSection = frameInLap - 477;
        const y2 = -13.64989;
        const left2 = [start3 - randallWidth + speed * frameInSection, y2];
        const right2 = [start3 + speed * frameInSection, y2];
        return [left2, right2];
      }
      if (frameInLap > 1022 && frameInLap < 1069) {
        const start3 = -15.2778692245483;
        const speed = -0.354839325;
        const frameInSection = frameInLap - 1023;
        const y2 = start3 + speed * frameInSection;
        const left2 = [-103.6, y2];
        const right2 = [-91.7, y2];
        return [left2, right2];
      }
      if (frameInLap > 1075 || frameInLap < 416) {
        const start3 = -101.850006103516;
        const speed = 0.35484;
        const frameInSection = frameInLap + (frameInLap < 416 ? 125 : -1076);
        const y2 = -33.2489;
        const left2 = [start3 + speed * frameInSection, y2];
        const right2 = [start3 + randallWidth + speed * frameInSection, y2];
        return [left2, right2];
      }
      if (frameInLap > 423 && frameInLap < 469) {
        const start3 = -31.16023254394531;
        const speed = 0.354839325;
        const frameInSection = frameInLap - 424;
        const y2 = start3 + speed * frameInSection;
        const left2 = [91.35, y2];
        const right2 = [103.25, y2];
        return [left2, right2];
      }
      const position = cornerPositions[frameInLap];
      const y = position[0];
      const left = [position[1], y];
      const right = [position[1] + randallWidth, y];
      return [left, right];
    });
    const blastzones = [[-175.7, -91], [173.6, 169]];
    return [createComponent(Grid, {
      blastzones
    }), (() => {
      var _el$9 = _tmpl$43();
      createRenderEffect(() => setAttribute(_el$9, "points", mainStage.join(" ")));
      return _el$9;
    })(), createComponent(For, {
      each: platforms,
      children: (points) => (() => {
        var _el$12 = _tmpl$33();
        createRenderEffect(() => setAttribute(_el$12, "points", points.join(" ")));
        return _el$12;
      })()
    }), (() => {
      var _el$10 = _tmpl$52();
      createRenderEffect(() => setAttribute(_el$10, "points", randall().join(" ")));
      return _el$10;
    })(), (() => {
      var _el$11 = _tmpl$24();
      createRenderEffect((_p$) => {
        var _v$13 = blastzones[0][0], _v$14 = blastzones[0][1], _v$15 = blastzones[1][0] - blastzones[0][0], _v$16 = blastzones[1][1] - blastzones[0][1];
        _v$13 !== _p$.e && setAttribute(_el$11, "x", _p$.e = _v$13);
        _v$14 !== _p$.t && setAttribute(_el$11, "y", _p$.t = _v$14);
        _v$15 !== _p$.a && setAttribute(_el$11, "width", _p$.a = _v$15);
        _v$16 !== _p$.o && setAttribute(_el$11, "height", _p$.o = _v$16);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$11;
    })()];
  }
  function FountainOfDreams() {
    const mainStage = ["-63.33, 0.62", "-53.5, 0.62", "-51, 0", "51, 0", "53.5, 0.62", "63.33, 0.62", "63.35, 0.62", "63.35, -4.5", "59.33, -15", "56.9, -19.5", "55, -27", "52, -32", "48, -38", "41, -42", "19, -49.5", "13, -54.5", "10, -62", "8.8, -72", "8.8, -150", "-8.8, -150", "-8.8, -72", "-10, -62", "-13, -54.5", "-19, -49.5", "-41, -42", "-48, -38", "-52, -32", "-55, -27", "-56.9, -19.5", "-59.33, -15", "-63.35, -4.5", "-63.35, 0.62", "-63.35, -4.5", "-63.33, 0.62"];
    const platformHeightCoefficient = 0.80625;
    const platforms = createMemo(() => {
      const gameHeightL = access("currentFrame").stage.fodLeftPlatformHeight ?? fodInitialLeftPlatformHeight;
      const gameHeightR = access("currentFrame").stage.fodRightPlatformHeight ?? fodInitialRightPlatformHeight;
      const heightL = gameHeightL * platformHeightCoefficient;
      const heightR = gameHeightR * platformHeightCoefficient;
      return [[`-49.5, ${heightL}`, `-21, ${heightL}`], [`21, ${heightR}`, `49.5, ${heightR}`], ["-14.25, 42.75", "14.25, 42.75"]];
    });
    const blastzones = [[-198.75, -146.25], [198.75, 202.5]];
    return [createComponent(Grid, {
      blastzones
    }), (() => {
      var _el$13 = _tmpl$10();
      createRenderEffect(() => setAttribute(_el$13, "points", mainStage.join(" ")));
      return _el$13;
    })(), createComponent(For, {
      get each() {
        return platforms().slice(0, 2);
      },
      children: (points) => (() => {
        var _el$16 = _tmpl$62();
        createRenderEffect(() => setAttribute(_el$16, "points", points.join(" ")));
        return _el$16;
      })()
    }), (() => {
      var _el$14 = _tmpl$33();
      createRenderEffect(() => setAttribute(_el$14, "points", platforms()[platforms().length - 1].join(" ")));
      return _el$14;
    })(), (() => {
      var _el$15 = _tmpl$24();
      createRenderEffect((_p$) => {
        var _v$17 = blastzones[0][0], _v$18 = blastzones[0][1], _v$19 = blastzones[1][0] - blastzones[0][0], _v$20 = blastzones[1][1] - blastzones[0][1];
        _v$17 !== _p$.e && setAttribute(_el$15, "x", _p$.e = _v$17);
        _v$18 !== _p$.t && setAttribute(_el$15, "y", _p$.t = _v$18);
        _v$19 !== _p$.a && setAttribute(_el$15, "width", _p$.a = _v$19);
        _v$20 !== _p$.o && setAttribute(_el$15, "height", _p$.o = _v$20);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$15;
    })()];
  }
  function PokemonStadium() {
    const mainStage = ["87.75, 0", "87.75, -4", "73.75, -15", "73.75, -17.75", "60, -17.75", "60, -38", "15, -60", "15, -112", "-15, -112", "-15, -60", "-60, -38", "-60, -17.75", "-73.75, -17.75", "-73.75, -15", "-87.75, -4", "-87.75, 0", "87.75, 0"];
    const platforms = [["-55, 25", "-25, 25"], ["25, 25", "55, 25"]];
    const blastzones = [[-230, -111], [230, 180]];
    return [createComponent(Grid, {
      blastzones
    }), (() => {
      var _el$17 = _tmpl$10();
      createRenderEffect(() => setAttribute(_el$17, "points", mainStage.join(" ")));
      return _el$17;
    })(), createComponent(For, {
      each: platforms,
      children: (points) => (() => {
        var _el$19 = _tmpl$33();
        createRenderEffect(() => setAttribute(_el$19, "points", points.join(" ")));
        return _el$19;
      })()
    }), (() => {
      var _el$18 = _tmpl$24();
      createRenderEffect((_p$) => {
        var _v$21 = blastzones[0][0], _v$22 = blastzones[0][1], _v$23 = blastzones[1][0] - blastzones[0][0], _v$24 = blastzones[1][1] - blastzones[0][1];
        _v$21 !== _p$.e && setAttribute(_el$18, "x", _p$.e = _v$21);
        _v$22 !== _p$.t && setAttribute(_el$18, "y", _p$.t = _v$22);
        _v$23 !== _p$.a && setAttribute(_el$18, "width", _p$.a = _v$23);
        _v$24 !== _p$.o && setAttribute(_el$18, "height", _p$.o = _v$24);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$18;
    })()];
  }
  function Grid(props) {
    const lines = createMemo(() => {
      const left = props.blastzones[0][0];
      const bottom = props.blastzones[0][1];
      const right = props.blastzones[1][0];
      const top = props.blastzones[1][1];
      const result = [];
      for (let x = props.blastzones[0][0]; x < props.blastzones[1][0]; x += 5) {
        result.push([x, x, bottom, top]);
      }
      for (let y = props.blastzones[0][0]; y < props.blastzones[1][0]; y += 5) {
        result.push([left, right, y, y]);
      }
      return result;
    });
    return createComponent(For, {
      get each() {
        return lines();
      },
      children: ([x1, x2, y1, y2]) => (() => {
        var _el$20 = _tmpl$72();
        setAttribute(_el$20, "x1", x1);
        setAttribute(_el$20, "x2", x2);
        setAttribute(_el$20, "y1", y1);
        setAttribute(_el$20, "y2", y2);
        return _el$20;
      })()
    });
  }

  // src/components/viewer/Item.tsx
  var _tmpl$11 = /* @__PURE__ */ template(`<svg><circle fill-opacity=0.7 stroke=black stroke-width=0.3></svg>`, false, true, false);
  var _tmpl$25 = /* @__PURE__ */ template(`<svg><circle fill=darkgray></svg>`, false, true, false);
  var _tmpl$34 = /* @__PURE__ */ template(`<svg><circle r=2.34375 fill=darkgray></svg>`, false, true, false);
  var _tmpl$44 = /* @__PURE__ */ template(`<svg><circle r=1.953125 fill=darkgray></svg>`, false, true, false);
  var _tmpl$53 = /* @__PURE__ */ template(`<svg><polyline fill=none stroke=#4b5563 stroke-width=1.35 stroke-linecap=round stroke-linejoin=round></svg>`, false, true, false);
  var _tmpl$63 = /* @__PURE__ */ template(`<svg><circle fill=#f59e0b fill-opacity=0.28 stroke=#b45309 stroke-width=0.8></svg>`, false, true, false);
  var _tmpl$73 = /* @__PURE__ */ template(`<svg><line stroke=red></svg>`, false, true, false);
  var _tmpl$82 = /* @__PURE__ */ template(`<svg><circle r=1.171875 fill=red></svg>`, false, true, false);
  var _tmpl$92 = /* @__PURE__ */ template(`<svg><polygon fill=gold stroke=black stroke-width=0.3></svg>`, false, true, false);
  var _tmpl$102 = /* @__PURE__ */ template(`<svg><circle r=4.25 fill=#aa0000></svg>`, false, true, false);
  var _tmpl$112 = /* @__PURE__ */ template(`<svg><g><line stroke=darkgray stroke-width=0.8 stroke-linecap=round></line><line stroke=darkgray stroke-width=0.8 stroke-linecap=round></svg>`, false, true, false);
  var _tmpl$12 = /* @__PURE__ */ template(`<svg><line stroke-width=0.7 stroke-linecap=round></svg>`, false, true, false);
  var kirbyCopyAliases = {
    "Kirby copy Mario's Fire (B)": "Mario's fire",
    "Kirby copy Luigi's Fire (B)": "Luigi's fire",
    "Kirby copy Fox's Laser (B)": "Fox's Laser",
    "Kirby copy Falco's Laser (B)": "Falco's Laser",
    "Kirby copy Link's Arrow (B)": "Arrow",
    "Kirby copy Young Link's Arrow (B)": "Arrow",
    "Kirby copy Samus' Chargeshot (B)": "Samus's chargeshot",
    "Kirby copy Sheik's Needle (thrown) (B)": "Needle(thrown)",
    "Kirby copy Peach's Toad (B)": "Toad",
    "Kirby copy Toad's Spore (B)": "Toad's spore",
    "Kirby copy Dr. Mario's Capsule (B)": "Dr. Mario's capsule",
    "Kirby copy IceClimber's IceCube (B)": "Ice(Iceclimbers)",
    "Kirby copy Mewtwo's Shadowball (B)": "Mewtwo's Shadowball",
    "Kirby copy PK Flash (B)": "PK Flash",
    "Kirby copy PK Flash Explosion (B)": "PK Flash (explosion)",
    "Kirby copy Pikachu's Thunder (B)": "Pikachu's thunder (B)",
    "Kirby copy Pichu's Thunder (B)": "Pichu's thunder (B)",
    "Kirby copy Bowser's Flame (B)": "Bowser's flame",
    "Kirby copy Mr. Game & Watch's Sausage (B)": "Sausage",
    "Kirby copy Sheik's Needle (ground) (B)": "Needle",
    "Yoshi's Tongue?? (B)": "Kirby's Yoshi egg"
  };
  var genericProjectiles = {
    "Dr. Mario's capsule": [1.5, "#e8e8ff"],
    "Ice(Iceclimbers)": [2, "#9fdcff"],
    "Mewtwo's Shadowball": [3, "#7040c0"],
    "PK Flash": [3, "#40e070"],
    "PK Flash (explosion)": [8, "#40e070"],
    "Pikachu's thunder (B)": [2, "#ffe040"],
    "Pichu's thunder (B)": [2, "#ffe040"],
    "Bowser's flame": [2.5, "#ff7020"],
    "Sausage": [1.5, "#d08040"],
    "Toad": [4, "#ff80c0"],
    "Toad's spore": [1, "#ffc0e0"],
    "Needle": [0.8, "#c0c0c0"],
    "Kirby's Yoshi egg": [6, "#c0f0a0"],
    "Kirby's Cutter beam": [3, "#f0f0f0"],
    "Kirby's Hammer": [3, "#c08040"]
  };
  function GenericProjectile(props) {
    const style2 = createMemo(() => genericProjectiles[props.name]);
    return (() => {
      var _el$ = _tmpl$11();
      createRenderEffect((_p$) => {
        var _v$ = props.item.xPosition, _v$2 = props.item.yPosition, _v$3 = style2()[0], _v$4 = style2()[1];
        _v$ !== _p$.e && setAttribute(_el$, "cx", _p$.e = _v$);
        _v$2 !== _p$.t && setAttribute(_el$, "cy", _p$.t = _v$2);
        _v$3 !== _p$.a && setAttribute(_el$, "r", _p$.a = _v$3);
        _v$4 !== _p$.o && setAttribute(_el$, "fill", _p$.o = _v$4);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$;
    })();
  }
  function Item(props) {
    const itemName = createMemo(() => {
      const raw = itemNamesById[props.item.typeId];
      return raw === void 0 ? void 0 : kirbyCopyAliases[raw] ?? raw;
    });
    return createComponent(Switch, {
      get children() {
        return [createComponent(Match, {
          get when() {
            return itemName() === "Needle(thrown)";
          },
          get children() {
            return createComponent(Needle, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Sheik's chain";
          },
          get children() {
            return createComponent(SheikChain, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Fox's Laser";
          },
          get children() {
            return createComponent(FoxLaser, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Falco's Laser";
          },
          get children() {
            return createComponent(FalcoLaser, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Turnip";
          },
          get children() {
            return createComponent(Turnip, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Yoshi's egg(thrown)";
          },
          get children() {
            return createComponent(YoshiEgg, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Luigi's fire";
          },
          get children() {
            return createComponent(LuigiFireball, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Mario's fire";
          },
          get children() {
            return createComponent(MarioFireball, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Missile";
          },
          get children() {
            return createComponent(Missile, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Samus's bomb";
          },
          get children() {
            return createComponent(SamusBomb, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Samus's chargeshot";
          },
          get children() {
            return createComponent(SamusChargeshot, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Kirby's Copy Star" || itemName() === "Kirby's Spit Star";
          },
          get children() {
            return createComponent(KirbyStar, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return createMemo(() => itemName() !== void 0)() && itemName() in genericProjectiles;
          },
          get children() {
            return createComponent(GenericProjectile, {
              get item() {
                return props.item;
              },
              get name() {
                return itemName();
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Shyguy (Heiho)";
          },
          get children() {
            return createComponent(FlyGuy, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Link's bomb" || itemName() === "Young Link's bomb";
          },
          get children() {
            return createComponent(LinkBomb, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Link's boomerang" || itemName() === "Young Link's boomerang";
          },
          get children() {
            return createComponent(LinkBoomerang, {
              get item() {
                return props.item;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return itemName() === "Arrow" || itemName() === "Fire Arrow";
          },
          get children() {
            return createComponent(LinkArrow, {
              get item() {
                return props.item;
              }
            });
          }
        })];
      }
    });
  }
  function SamusChargeshot(props) {
    const hitboxesByChargeLevel = [300, 400, 500, 600, 700, 800, 900, 1200];
    return (() => {
      var _el$2 = _tmpl$25();
      createRenderEffect((_p$) => {
        var _v$5 = props.item.xPosition, _v$6 = props.item.yPosition, _v$7 = hitboxesByChargeLevel[props.item.chargeShotChargeLevel] / 256;
        _v$5 !== _p$.e && setAttribute(_el$2, "cx", _p$.e = _v$5);
        _v$6 !== _p$.t && setAttribute(_el$2, "cy", _p$.t = _v$6);
        _v$7 !== _p$.a && setAttribute(_el$2, "r", _p$.a = _v$7);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$2;
    })();
  }
  function SamusBomb(props) {
    return (() => {
      var _el$3 = _tmpl$25();
      createRenderEffect((_p$) => {
        var _v$8 = props.item.xPosition, _v$9 = props.item.yPosition, _v$10 = (props.item.state === 3 ? 1536 : 500) / 256;
        _v$8 !== _p$.e && setAttribute(_el$3, "cx", _p$.e = _v$8);
        _v$9 !== _p$.t && setAttribute(_el$3, "cy", _p$.t = _v$9);
        _v$10 !== _p$.a && setAttribute(_el$3, "r", _p$.a = _v$10);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$3;
    })();
  }
  function Missile(props) {
    return (() => {
      var _el$4 = _tmpl$25();
      createRenderEffect((_p$) => {
        var _v$11 = props.item.xPosition, _v$12 = props.item.yPosition, _v$13 = (props.item.samusMissileType === 0 ? 500 : 600) / 256;
        _v$11 !== _p$.e && setAttribute(_el$4, "cx", _p$.e = _v$11);
        _v$12 !== _p$.t && setAttribute(_el$4, "cy", _p$.t = _v$12);
        _v$13 !== _p$.a && setAttribute(_el$4, "r", _p$.a = _v$13);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$4;
    })();
  }
  function MarioFireball(props) {
    return (() => {
      var _el$5 = _tmpl$34();
      createRenderEffect((_p$) => {
        var _v$14 = props.item.xPosition, _v$15 = props.item.yPosition;
        _v$14 !== _p$.e && setAttribute(_el$5, "cx", _p$.e = _v$14);
        _v$15 !== _p$.t && setAttribute(_el$5, "cy", _p$.t = _v$15);
        return _p$;
      }, {
        e: void 0,
        t: void 0
      });
      return _el$5;
    })();
  }
  function LuigiFireball(props) {
    return (() => {
      var _el$6 = _tmpl$44();
      createRenderEffect((_p$) => {
        var _v$16 = props.item.xPosition, _v$17 = props.item.yPosition;
        _v$16 !== _p$.e && setAttribute(_el$6, "cx", _p$.e = _v$16);
        _v$17 !== _p$.t && setAttribute(_el$6, "cy", _p$.t = _v$17);
        return _p$;
      }, {
        e: void 0,
        t: void 0
      });
      return _el$6;
    })();
  }
  function YoshiEgg(props) {
    const ownerState = createMemo(() => getOwner2(props.item).state);
    return (() => {
      var _el$7 = _tmpl$25();
      createRenderEffect((_p$) => {
        var _v$18 = props.item.state === 0 ? ownerState().xPosition : props.item.xPosition, _v$19 = props.item.state === 0 ? ownerState().yPosition + 8 : props.item.yPosition, _v$20 = props.item.state === 2 ? 2500 / 256 : 1e3 / 256, _v$21 = props.item.state === 1 ? 1 : 0.5;
        _v$18 !== _p$.e && setAttribute(_el$7, "cx", _p$.e = _v$18);
        _v$19 !== _p$.t && setAttribute(_el$7, "cy", _p$.t = _v$19);
        _v$20 !== _p$.a && setAttribute(_el$7, "r", _p$.a = _v$20);
        _v$21 !== _p$.o && setAttribute(_el$7, "opacity", _p$.o = _v$21);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$7;
    })();
  }
  function Turnip(props) {
    const ownerState = createMemo(() => getOwner2(props.item).state);
    const held = createMemo(() => props.item.state === 0 || props.item.state === 4);
    return (() => {
      var _el$8 = _tmpl$34();
      createRenderEffect((_p$) => {
        var _v$22 = held() ? ownerState().xPosition : props.item.xPosition, _v$23 = held() ? ownerState().yPosition + 8 : props.item.yPosition, _v$24 = held() ? 0.5 : 1;
        _v$22 !== _p$.e && setAttribute(_el$8, "cx", _p$.e = _v$22);
        _v$23 !== _p$.t && setAttribute(_el$8, "cy", _p$.t = _v$23);
        _v$24 !== _p$.a && setAttribute(_el$8, "opacity", _p$.a = _v$24);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$8;
    })();
  }
  function Needle(props) {
    return (() => {
      var _el$9 = _tmpl$44();
      createRenderEffect((_p$) => {
        var _v$25 = props.item.xPosition, _v$26 = props.item.yPosition;
        _v$25 !== _p$.e && setAttribute(_el$9, "cx", _p$.e = _v$25);
        _v$26 !== _p$.t && setAttribute(_el$9, "cy", _p$.t = _v$26);
        return _p$;
      }, {
        e: void 0,
        t: void 0
      });
      return _el$9;
    })();
  }
  function SheikChain(props) {
    const frame = createMemo(() => access("frames")[props.item.frameNumber]);
    const owner = createMemo(() => {
      const ownerIndex = props.item.owner;
      return ownerIndex >= 0 ? frame()?.players[ownerIndex] : void 0;
    });
    const hitboxes = createMemo(() => owner()?.state.hitboxes ?? []);
    const pointString = createMemo(() => hitboxes().map((hitbox) => `${hitbox.x},${hitbox.y}`).join(" "));
    return [(() => {
      var _el$10 = _tmpl$53();
      createRenderEffect(() => setAttribute(_el$10, "points", pointString()));
      return _el$10;
    })(), createComponent(For, {
      get each() {
        return hitboxes();
      },
      children: (hitbox) => (() => {
        var _el$11 = _tmpl$63();
        createRenderEffect((_p$) => {
          var _v$27 = hitbox.x, _v$28 = hitbox.y, _v$29 = hitbox.radius;
          _v$27 !== _p$.e && setAttribute(_el$11, "cx", _p$.e = _v$27);
          _v$28 !== _p$.t && setAttribute(_el$11, "cy", _p$.t = _v$28);
          _v$29 !== _p$.a && setAttribute(_el$11, "r", _p$.a = _v$29);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        });
        return _el$11;
      })()
    })];
  }
  function FoxLaser(props) {
    const hitboxOffsets = [-200, -933, -1666].map((x) => x / 256);
    const hitboxSize = 300 / 256;
    const rotations = createMemo(() => {
      const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
      return [Math.cos(direction), Math.sin(direction)];
    });
    return [(() => {
      var _el$12 = _tmpl$73();
      createRenderEffect((_p$) => {
        var _v$30 = props.item.xPosition + hitboxOffsets[0] * props.item.facingDirection * rotations()[0], _v$31 = props.item.yPosition + hitboxOffsets[0] * props.item.facingDirection * rotations()[1], _v$32 = props.item.xPosition + hitboxOffsets[hitboxOffsets.length - 1] * props.item.facingDirection * rotations()[0], _v$33 = props.item.yPosition + hitboxOffsets[hitboxOffsets.length - 1] * props.item.facingDirection * rotations()[1];
        _v$30 !== _p$.e && setAttribute(_el$12, "x1", _p$.e = _v$30);
        _v$31 !== _p$.t && setAttribute(_el$12, "y1", _p$.t = _v$31);
        _v$32 !== _p$.a && setAttribute(_el$12, "x2", _p$.a = _v$32);
        _v$33 !== _p$.o && setAttribute(_el$12, "y2", _p$.o = _v$33);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$12;
    })(), createComponent(For, {
      each: hitboxOffsets,
      children: (hitboxOffset) => (() => {
        var _el$13 = _tmpl$82();
        createRenderEffect((_p$) => {
          var _v$34 = props.item.xPosition + hitboxOffset * props.item.facingDirection * rotations()[0], _v$35 = props.item.yPosition + hitboxOffset * props.item.facingDirection * rotations()[1];
          _v$34 !== _p$.e && setAttribute(_el$13, "cx", _p$.e = _v$34);
          _v$35 !== _p$.t && setAttribute(_el$13, "cy", _p$.t = _v$35);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$13;
      })()
    })];
  }
  function FalcoLaser(props) {
    const hitboxOffsets = [-200, -933, -1666, -2400].map((x) => x / 256);
    const hitboxSize = 300 / 256;
    const rotations = createMemo(() => {
      const direction = Math.atan2(props.item.yVelocity, props.item.xVelocity);
      return [Math.cos(direction), Math.sin(direction)];
    });
    return [(() => {
      var _el$14 = _tmpl$73();
      createRenderEffect((_p$) => {
        var _v$36 = props.item.xPosition + hitboxOffsets[0] * props.item.facingDirection * rotations()[0], _v$37 = props.item.yPosition + hitboxOffsets[0] * props.item.facingDirection * rotations()[1], _v$38 = props.item.xPosition + hitboxOffsets[hitboxOffsets.length - 1] * props.item.facingDirection * rotations()[0], _v$39 = props.item.yPosition + hitboxOffsets[hitboxOffsets.length - 1] * props.item.facingDirection * rotations()[1];
        _v$36 !== _p$.e && setAttribute(_el$14, "x1", _p$.e = _v$36);
        _v$37 !== _p$.t && setAttribute(_el$14, "y1", _p$.t = _v$37);
        _v$38 !== _p$.a && setAttribute(_el$14, "x2", _p$.a = _v$38);
        _v$39 !== _p$.o && setAttribute(_el$14, "y2", _p$.o = _v$39);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$14;
    })(), createComponent(For, {
      each: hitboxOffsets,
      children: (hitboxOffset) => (() => {
        var _el$15 = _tmpl$82();
        createRenderEffect((_p$) => {
          var _v$40 = props.item.xPosition + hitboxOffset * props.item.facingDirection * rotations()[0], _v$41 = props.item.yPosition + hitboxOffset * props.item.facingDirection * rotations()[1];
          _v$40 !== _p$.e && setAttribute(_el$15, "cx", _p$.e = _v$40);
          _v$41 !== _p$.t && setAttribute(_el$15, "cy", _p$.t = _v$41);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$15;
      })()
    })];
  }
  function KirbyStar(props) {
    const radius = createMemo(() => itemNamesById[props.item.typeId] === "Kirby's Spit Star" ? 4 : 2.5);
    const points = createMemo(() => {
      const spin = props.item.frameNumber * 12 % 360;
      const outer = radius();
      const inner = outer * 0.45;
      const pts = [];
      for (let i = 0; i < 10; i += 1) {
        const r2 = i % 2 === 0 ? outer : inner;
        const angle = (spin + i * 36) * Math.PI / 180;
        pts.push(`${props.item.xPosition + r2 * Math.cos(angle)},${props.item.yPosition + r2 * Math.sin(angle)}`);
      }
      return pts.join(" ");
    });
    return (() => {
      var _el$16 = _tmpl$92();
      createRenderEffect(() => setAttribute(_el$16, "points", points()));
      return _el$16;
    })();
  }
  function FlyGuy(props) {
    return (() => {
      var _el$17 = _tmpl$102();
      createRenderEffect((_p$) => {
        var _v$42 = props.item.xPosition, _v$43 = props.item.yPosition;
        _v$42 !== _p$.e && setAttribute(_el$17, "cx", _p$.e = _v$42);
        _v$43 !== _p$.t && setAttribute(_el$17, "cy", _p$.t = _v$43);
        return _p$;
      }, {
        e: void 0,
        t: void 0
      });
      return _el$17;
    })();
  }
  function LinkBomb(props) {
    const ownerState = createMemo(() => getOwner2(props.item).state);
    const held = createMemo(() => props.item.state === 0);
    return (() => {
      var _el$18 = _tmpl$25();
      createRenderEffect((_p$) => {
        var _v$44 = held() ? ownerState().xPosition : props.item.xPosition, _v$45 = held() ? ownerState().yPosition + 8 : props.item.yPosition, _v$46 = (props.item.state === 5 ? 2500 : 500) / 256, _v$47 = held() ? 0.5 : 1;
        _v$44 !== _p$.e && setAttribute(_el$18, "cx", _p$.e = _v$44);
        _v$45 !== _p$.t && setAttribute(_el$18, "cy", _p$.t = _v$45);
        _v$46 !== _p$.a && setAttribute(_el$18, "r", _p$.a = _v$46);
        _v$47 !== _p$.o && setAttribute(_el$18, "opacity", _p$.o = _v$47);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      });
      return _el$18;
    })();
  }
  function LinkBoomerang(props) {
    const ownerState = createMemo(() => getOwner2(props.item).state);
    const held = createMemo(() => props.item.state === 0);
    const x = createMemo(() => held() ? ownerState().xPosition : props.item.xPosition);
    const y = createMemo(() => held() ? ownerState().yPosition + 8 : props.item.yPosition);
    const spin = createMemo(() => props.item.frameNumber * 40 % 360);
    const armLength = 900 / 256;
    return (() => {
      var _el$19 = _tmpl$112(), _el$20 = _el$19.firstChild, _el$21 = _el$20.nextSibling;
      createRenderEffect((_p$) => {
        var _v$48 = `rotate(${spin()} ${x()} ${y()})`, _v$49 = held() ? 0.5 : 1, _v$50 = x() - armLength, _v$51 = y(), _v$52 = x() + armLength, _v$53 = y(), _v$54 = x(), _v$55 = y() - armLength, _v$56 = x(), _v$57 = y() + armLength;
        _v$48 !== _p$.e && setAttribute(_el$19, "transform", _p$.e = _v$48);
        _v$49 !== _p$.t && setAttribute(_el$19, "opacity", _p$.t = _v$49);
        _v$50 !== _p$.a && setAttribute(_el$20, "x1", _p$.a = _v$50);
        _v$51 !== _p$.o && setAttribute(_el$20, "y1", _p$.o = _v$51);
        _v$52 !== _p$.i && setAttribute(_el$20, "x2", _p$.i = _v$52);
        _v$53 !== _p$.n && setAttribute(_el$20, "y2", _p$.n = _v$53);
        _v$54 !== _p$.s && setAttribute(_el$21, "x1", _p$.s = _v$54);
        _v$55 !== _p$.h && setAttribute(_el$21, "y1", _p$.h = _v$55);
        _v$56 !== _p$.r && setAttribute(_el$21, "x2", _p$.r = _v$56);
        _v$57 !== _p$.d && setAttribute(_el$21, "y2", _p$.d = _v$57);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0,
        r: void 0,
        d: void 0
      });
      return _el$19;
    })();
  }
  function LinkArrow(props) {
    const ownerState = createMemo(() => getOwner2(props.item).state);
    const nocked = createMemo(() => props.item.state === 0);
    const direction = createMemo(() => {
      if (props.item.state === 1 && (props.item.xVelocity !== 0 || props.item.yVelocity !== 0)) {
        return Math.atan2(props.item.yVelocity, props.item.xVelocity);
      }
      return props.item.facingDirection >= 0 ? 0 : Math.PI;
    });
    const x = createMemo(() => nocked() ? ownerState().xPosition : props.item.xPosition);
    const y = createMemo(() => nocked() ? ownerState().yPosition + 8 : props.item.yPosition);
    const halfLength = 1200 / 256;
    const color = createMemo(() => itemNamesById[props.item.typeId] === "Fire Arrow" ? "orangered" : "darkgray");
    return (() => {
      var _el$22 = _tmpl$12();
      createRenderEffect((_p$) => {
        var _v$58 = x() - Math.cos(direction()) * halfLength, _v$59 = y() - Math.sin(direction()) * halfLength, _v$60 = x() + Math.cos(direction()) * halfLength, _v$61 = y() + Math.sin(direction()) * halfLength, _v$62 = color(), _v$63 = nocked() ? 0.5 : 1;
        _v$58 !== _p$.e && setAttribute(_el$22, "x1", _p$.e = _v$58);
        _v$59 !== _p$.t && setAttribute(_el$22, "y1", _p$.t = _v$59);
        _v$60 !== _p$.a && setAttribute(_el$22, "x2", _p$.a = _v$60);
        _v$61 !== _p$.o && setAttribute(_el$22, "y2", _p$.o = _v$61);
        _v$62 !== _p$.i && setAttribute(_el$22, "stroke", _p$.i = _v$62);
        _v$63 !== _p$.n && setAttribute(_el$22, "opacity", _p$.n = _v$63);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0
      });
      return _el$22;
    })();
  }
  function getOwner2(item) {
    return access("frames")[item.frameNumber].players[item.owner];
  }

  // src/components/common/icons.tsx
  var _tmpl$15 = /* @__PURE__ */ template(`<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"stroke-width=1.5 stroke=currentColor><title></title><path stroke-linecap=round stroke-linejoin=round d="M12 4.5v15m7.5-7.5h-15">`);
  var _tmpl$16 = /* @__PURE__ */ template(`<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"stroke-width=1.5 stroke=currentColor><title></title><path stroke-linecap=round stroke-linejoin=round d="M19.5 12h-15">`);
  var _tmpl$18 = /* @__PURE__ */ template(`<svg xmlns=http://www.w3.org/2000/svg width=70 height=28 viewBox="0 0 70 28"><title></title><rect x=0 y=0 width=70 height=28 rx=10 fill=#E53935></rect><text x=36 y=20 text-anchor=middle fill=#fff letter-spacing=3>LIVE`);
  var _tmpl$19 = /* @__PURE__ */ template(`<svg xmlns=http://www.w3.org/2000/svg width=180 height=40 viewBox="0 0 180 40"><title></title><text x=50% y=50% dominant-baseline=middle text-anchor=middle font-family=sans-serif font-size=24 font-weight=bold>Reconnecting...`);
  function PlusIcon(props) {
    return (() => {
      var _el$29 = _tmpl$15(), _el$30 = _el$29.firstChild;
      spread(_el$29, props, true, true);
      insert(_el$30, () => props.title);
      return _el$29;
    })();
  }
  function MinusIcon(props) {
    return (() => {
      var _el$31 = _tmpl$16(), _el$32 = _el$31.firstChild;
      spread(_el$31, props, true, true);
      insert(_el$32, () => props.title);
      return _el$31;
    })();
  }
  function LiveIcon(props) {
    return (() => {
      var _el$35 = _tmpl$18(), _el$36 = _el$35.firstChild, _el$37 = _el$36.nextSibling, _el$38 = _el$37.nextSibling;
      spread(_el$35, props, true, true);
      insert(_el$36, () => props.title);
      _el$38.style.setProperty("font", "bold 18px sans-serif");
      return _el$35;
    })();
  }
  function ReconnectingText(props) {
    return (() => {
      var _el$39 = _tmpl$19(), _el$40 = _el$39.firstChild;
      spread(_el$39, props, true, true);
      insert(_el$40, () => props.title);
      return _el$39;
    })();
  }

  // src/components/viewer/SpectateControls.tsx
  var _tmpl$13 = /* @__PURE__ */ template(`<div class="material-icons cursor-pointer text-[32px]"aria-label="pause playback">pause`);
  var _tmpl$26 = /* @__PURE__ */ template(`<div class="flex flex-wrap items-center justify-evenly gap-4 rounded-b border border-t-0 py-1 px-2 text-slate-800"><div class="flex items-center gap-1"><div class="material-icons cursor-pointer text-[32px]"aria-label="Rewind 2 seconds">history</div><label for=seekbar class="font-mono text-sm"></label><div class="material-icons cursor-pointer text-[32px] visible"aria-label="Skip ahead 2 seconds">update</div><div class="material-icons cursor-pointer text-[32px]"aria-label="Jump to live">live_tv</div></div><input id=seekbar class="flex-grow accent-slippi-500"type=range><div class="material-icons cursor-pointer text-[32px]"aria-label="Toggle fullscreen mode">`);
  var _tmpl$35 = /* @__PURE__ */ template(`<div class="material-icons cursor-pointer text-[32px] leading-none"aria-label="Resume playback">play_arrow`);
  function SpectateControls() {
    onMount(() => {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
    });
    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    });
    function onKeyDown({
      key
    }) {
      switch (key) {
        case "k":
        case "K":
        case " ":
          togglePause();
          break;
        case "ArrowRight":
        case "l":
        case "L":
          adjust(120);
          break;
        case "ArrowLeft":
        case "j":
        case "J":
          adjust(-120);
          break;
        case ".":
        case ">":
          pause();
          adjust(1);
          break;
        case ",":
        case "<":
          pause();
          adjust(-1);
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          jumpPercent(Number(key) * 0.1);
          break;
        case "ArrowUp":
          speedSlow();
          break;
        case "ArrowDown":
          speedFast();
          break;
        case "-":
        case "_":
          zoomOut();
          break;
        case "=":
        case "+":
          zoomIn();
          break;
        // TODO: Update controls help popup
        // case "]":
        // case "}":
        //   void currentSelectionStore().nextFile();
        //   break;
        // case "[":
        // case "{":
        //   void currentSelectionStore().previousFile();
        //   break;
        // case "'":
        // case '"':
        //   nextHighlight();
        //   break;
        // case ";":
        // case ":":
        //   previousHighlight();
        //   break;
        case "d":
        case "D":
          toggleDebug();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    }
    function onKeyUp({
      key
    }) {
      switch (key) {
        case "ArrowUp":
        case "ArrowDown":
          speedNormal();
          break;
      }
    }
    let seekbarInput;
    return (() => {
      var _el$ = _tmpl$26(), _el$3 = _el$.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$3.nextSibling, _el$9 = _el$8.nextSibling;
      insert(_el$, createComponent(Show, {
        get when() {
          return spectateStore.running;
        },
        get fallback() {
          return (() => {
            var _el$10 = _tmpl$35();
            _el$10.$$click = () => togglePause();
            return _el$10;
          })();
        },
        get children() {
          var _el$2 = _tmpl$13();
          _el$2.$$click = () => togglePause();
          return _el$2;
        }
      }), _el$3);
      _el$4.$$click = () => adjust(-120);
      insert(_el$3, createComponent(MinusIcon, {
        "class": "h-6 w-6",
        role: "button",
        title: "previous frame",
        onClick: () => {
          pause();
          adjust(-1);
        },
        children: "-"
      }), _el$5);
      insert(_el$5, () => spectateStore.isDebug ? spectateStore.frame - 123 : spectateStore.frame);
      insert(_el$3, createComponent(PlusIcon, {
        "class": "h-6 w-6",
        role: "button",
        title: "next frame",
        onClick: () => {
          pause();
          adjust(1);
        },
        children: "+"
      }), _el$6);
      _el$6.$$click = () => adjust(120);
      _el$7.$$click = () => jumpToLive();
      _el$8.$$input = () => jump(seekbarInput.valueAsNumber);
      var _ref$ = seekbarInput;
      typeof _ref$ === "function" ? use(_ref$, _el$8) : seekbarInput = _el$8;
      _el$9.$$click = () => toggleFullscreen();
      insert(_el$9, () => spectateStore.isFullscreen ? "fullscreen_exit" : "fullscreen");
      createRenderEffect(() => setAttribute(_el$8, "max", nonReactiveState.gameFrames.length - 1));
      createRenderEffect(() => _el$8.value = spectateStore.frame);
      return _el$;
    })();
  }
  delegateEvents(["click", "input"]);

  // src/components/viewer/Controls.tsx
  var _tmpl$14 = /* @__PURE__ */ template(`<div class="material-icons cursor-pointer text-[32px]"aria-label="pause playback">pause`);
  var _tmpl$27 = /* @__PURE__ */ template(`<div class="flex flex-wrap items-center justify-evenly gap-4 rounded-b border border-t-0 py-1 px-2 text-slate-800"><div class="flex items-center gap-1"><div class="material-icons cursor-pointer text-[32px]"aria-label="Rewind 2 seconds">history</div><label for=seekbar class="font-mono text-sm"></label><div class="material-icons cursor-pointer text-[32px]"aria-label="Skip ahead 2 seconds">update</div></div><input id=seekbar class="flex-grow accent-slippi-500"type=range><div class="material-icons cursor-pointer text-[32px]"aria-label="Toggle fullscreen mode">`);
  var _tmpl$36 = /* @__PURE__ */ template(`<div class="material-icons cursor-pointer text-[32px] leading-none"aria-label="Resume playback">play_arrow`);
  function Controls() {
    onMount(() => {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
    });
    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    });
    function onKeyDown({
      key
    }) {
      switch (key) {
        case "k":
        case "K":
        case " ":
          togglePause2();
          break;
        case "ArrowRight":
        case "l":
        case "L":
          adjust2(120);
          break;
        case "ArrowLeft":
        case "j":
        case "J":
          adjust2(-120);
          break;
        case ".":
        case ">":
          pause2();
          adjust2(1);
          break;
        case ",":
        case "<":
          pause2();
          adjust2(-1);
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          jumpPercent2(Number(key) * 0.1);
          break;
        case "ArrowUp":
          speedSlow2();
          break;
        case "ArrowDown":
          speedFast2();
          break;
        case "-":
        case "_":
          zoomOut2();
          break;
        case "=":
        case "+":
          zoomIn2();
          break;
        case "d":
        case "D":
          toggleDebug2();
          break;
        case "f":
        case "F":
          toggleFullscreen2();
          break;
      }
    }
    function onKeyUp({
      key
    }) {
      switch (key) {
        case "ArrowUp":
        case "ArrowDown":
          speedNormal2();
          break;
      }
    }
    let seekbarInput;
    return (() => {
      var _el$ = _tmpl$27(), _el$3 = _el$.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling, _el$7 = _el$3.nextSibling, _el$8 = _el$7.nextSibling;
      insert(_el$, createComponent(Show, {
        get when() {
          return replayStore.running;
        },
        get fallback() {
          return (() => {
            var _el$9 = _tmpl$36();
            _el$9.$$click = () => togglePause2();
            return _el$9;
          })();
        },
        get children() {
          var _el$2 = _tmpl$14();
          _el$2.$$click = () => togglePause2();
          return _el$2;
        }
      }), _el$3);
      _el$4.$$click = () => adjust2(-120);
      insert(_el$3, createComponent(MinusIcon, {
        "class": "h-6 w-6",
        role: "button",
        title: "previous frame",
        onClick: () => {
          pause2();
          adjust2(-1);
        },
        children: "-"
      }), _el$5);
      insert(_el$5, () => replayStore.isDebug ? replayStore.frame - 123 : replayStore.frame);
      insert(_el$3, createComponent(PlusIcon, {
        "class": "h-6 w-6",
        role: "button",
        title: "next frame",
        onClick: () => {
          pause2();
          adjust2(1);
        },
        children: "+"
      }), _el$6);
      _el$6.$$click = () => adjust2(120);
      _el$7.$$input = () => jump2(seekbarInput.valueAsNumber);
      var _ref$ = seekbarInput;
      typeof _ref$ === "function" ? use(_ref$, _el$7) : seekbarInput = _el$7;
      _el$8.$$click = () => toggleFullscreen2();
      insert(_el$8, () => replayStore.isFullscreen ? "fullscreen_exit" : "fullscreen");
      createRenderEffect(() => setAttribute(_el$7, "max", replayStore.replayData.frames.length - 1));
      createRenderEffect(() => _el$7.value = replayStore.frame);
      return _el$;
    })();
  }
  delegateEvents(["click", "input"]);

  // src/components/viewer/Viewer.tsx
  var _tmpl$17 = /* @__PURE__ */ template(`<button>Debug`);
  var _tmpl$28 = /* @__PURE__ */ template(`<div><div>watchingLive: </div><div>Number of frames behind: `);
  var _tmpl$37 = /* @__PURE__ */ template(`<svg class="rounded-t border bg-slate-50"viewBox="-365 -300 730 600"><g class=-scale-y-100>`);
  var _tmpl$45 = /* @__PURE__ */ template(`<div class="flex flex-col overflow-y-auto relative">`);
  var _tmpl$54 = /* @__PURE__ */ template(`<div class="flex justify-center italic">`);
  var _tmpl$64 = /* @__PURE__ */ template(`<div class="flex justify-center italic">Loading...`);
  function Viewer() {
    const items = createMemo(() => access("currentFrame")?.items ?? []);
    const showState = () => {
      console.log("spectateStore", spectateStore);
      console.log("nonReactiveState", nonReactiveState);
    };
    return [createComponent(Show, {
      get when() {
        return access("isDebug");
      },
      get children() {
        return [(() => {
          var _el$ = _tmpl$17();
          _el$.$$click = showState;
          return _el$;
        })(), (() => {
          var _el$2 = _tmpl$28(), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling, _el$6 = _el$5.firstChild;
          insert(_el$3, () => String(access("watchingLive")), null);
          insert(_el$5, () => access("frames").length - access("frame"), null);
          return _el$2;
        })()];
      }
    }), (() => {
      var _el$7 = _tmpl$45();
      insert(_el$7, createComponent(Show, {
        get when() {
          return createMemo(() => !!access("settings"))() && access("frames").length > access("frame");
        },
        get fallback() {
          return (() => {
            var _el$10 = _tmpl$54();
            insert(_el$10, () => access("disconnected") ? "Reconnecting..." : "Waiting for game...");
            return _el$10;
          })();
        },
        get children() {
          return [createComponent(Show, {
            get when() {
              return access("disconnected");
            },
            get fallback() {
              return createComponent(Show, {
                get when() {
                  return access("watchingLive");
                },
                get children() {
                  return createComponent(LiveIcon, {
                    title: "Live",
                    "class": "absolute top-4 left-4 w-12"
                  });
                }
              });
            },
            get children() {
              return createComponent(ReconnectingText, {
                title: "Reconnecting",
                "class": "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-red-500 stroke-red-600"
              });
            }
          }), createComponent(Show, {
            get when() {
              return !access("isLoading");
            },
            get fallback() {
              return _tmpl$64();
            },
            get children() {
              return [(() => {
                var _el$8 = _tmpl$37(), _el$9 = _el$8.firstChild;
                insert(_el$9, createComponent(Camera, {
                  get children() {
                    return [createComponent(Stage, {}), createComponent(Players, {}), createComponent(For, {
                      get each() {
                        return items();
                      },
                      children: (item) => createComponent(Item, {
                        item
                      })
                    })];
                  }
                }), null);
                insert(_el$9, createComponent(HUD, {}), null);
                return _el$8;
              })(), createComponent(Show, {
                get when() {
                  return !access("rendererMode");
                },
                get children() {
                  return createMemo(() => replayPointer()?.mode === "spectate")() ? createComponent(SpectateControls, {}) : createComponent(Controls, {});
                }
              })];
            }
          })];
        }
      }));
      return _el$7;
    })()];
  }
  delegateEvents(["click"]);

  // build/css/index.css
  var css_default = '*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.visible{visibility:visible}.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-1\\/2{left:50%}.left-4{left:1rem}.top-1\\/2{top:50%}.top-4{top:1rem}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.h-6{height:1.5rem}.max-h-full{max-height:100%}.w-12{width:3rem}.w-6{width:1.5rem}.w-fit{width:-moz-fit-content;width:fit-content}.flex-grow{flex-grow:1}.-translate-x-1\\/2{--tw-translate-x:-50%}.-translate-x-1\\/2,.-translate-y-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y:-50%}.-scale-y-100{--tw-scale-y:-1}.-scale-y-100,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.justify-evenly{justify-content:space-evenly}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-4{gap:1rem}.overflow-y-auto{overflow-y:auto}.rounded-md{border-radius:.375rem}.rounded-b{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-t{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.border{border-width:1px}.border-t-0{border-top-width:0}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity,1))}.border-transparent{border-color:transparent}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity,1))}.bg-slate-50{--tw-bg-opacity:1;background-color:rgb(248 250 252/var(--tw-bg-opacity,1))}.bg-slippi-100{--tw-bg-opacity:1;background-color:rgb(177 223 191/var(--tw-bg-opacity,1))}.bg-slippi-400{--tw-bg-opacity:1;background-color:rgb(89 188 120/var(--tw-bg-opacity,1))}.fill-red-500{fill:#ef4444}.fill-slate-800{fill:#1e293b}.stroke-red-600{stroke:#dc2626}.stroke-slate-400{stroke:#94a3b8}.stroke-slate-800{stroke:#1e293b}.stroke-slippi-50{stroke:#bfe5cb}.stroke-\\[0\\.1\\]{stroke-width:.1}.px-0{padding-left:0;padding-right:0}.px-2{padding-left:.5rem;padding-right:.5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.text-\\[32px\\]{font-size:32px}.text-sm{font-size:.875rem;line-height:1.25rem}.font-medium{font-weight:500}.italic{font-style:italic}.leading-none{line-height:1}.text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81/var(--tw-text-opacity,1))}.text-slate-800{--tw-text-opacity:1;color:rgb(30 41 59/var(--tw-text-opacity,1))}.text-slippi-700{--tw-text-opacity:1;color:rgb(36 89 52/var(--tw-text-opacity,1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.accent-slippi-500{accent-color:#44a963}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-sm{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgba(0,0,0,.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.hover\\:bg-gray-200:hover{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity,1))}.hover\\:bg-slippi-200:hover{--tw-bg-opacity:1;background-color:rgb(148 212 167/var(--tw-bg-opacity,1))}.hover\\:bg-slippi-500:hover{--tw-bg-opacity:1;background-color:rgb(68 169 99/var(--tw-bg-opacity,1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus\\:ring-slippi-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(68 169 99/var(--tw-ring-opacity,1))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px}';

  // build/css/mui.css
  var mui_default = '@font-face{font-family:Material Icons;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format("woff2")}@font-face{font-family:Material Icons Outlined;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialiconsoutlined/v109/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.woff2) format("woff2")}.material-icons{font-family:Material Icons;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-icons,.material-icons-outlined{font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr}.material-icons-outlined{font-family:Material Icons Outlined;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}';

  // src/components/MiniApp.tsx
  var _tmpl$20 = /* @__PURE__ */ template(`<style>`);
  var _tmpl$29 = /* @__PURE__ */ template(`<div class="flex max-h-full flex-grow flex-col gap-2 px-0">`);
  function MiniApp({
    zipsBaseUrl: zipsBaseUrl2
  }) {
    if (zipsBaseUrl2) {
      setZipsBaseUrl(zipsBaseUrl2);
    }
    void fetchAnimations(20);
    void fetchAnimations(2);
    void fetchAnimations(0);
    void fetchAnimations(9);
    return [(() => {
      var _el$ = _tmpl$20();
      insert(_el$, css_default, null);
      insert(_el$, mui_default, null);
      return _el$;
    })(), (() => {
      var _el$2 = _tmpl$29();
      insert(_el$2, createComponent(Show, {
        get when() {
          return Boolean(replayPointer());
        },
        get children() {
          return createComponent(Viewer, {});
        }
      }));
      return _el$2;
    })()];
  }

  // src/index.tsx
  customElement("slippi-viewer", {
    zipsBaseUrl: "/"
  }, (props, {
    element
  }) => {
    element.innerHTML = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />';
    element.setReplay = (file) => {
      setReplayPointerWrapper({
        mode: "replay",
        file
      });
    };
    element.setReplayData = (replayData) => {
      setReplayPointerWrapper({
        mode: "replay-data",
        replayData
      });
    };
    element.setLiveReplayData = (replayData) => {
      setReplayPointerWrapper({
        mode: "live-data",
        replayData
      });
    };
    element.setFrame = (frame) => {
      jump2(frame);
    };
    element.setFrameData = (frameNumber, frame) => {
      setFrameData(frameNumber, frame);
    };
    element.pausePlayback = () => {
      pause2();
    };
    element.spectate = (url) => {
      setReplayPointerWrapper({
        mode: "spectate",
        url
      });
    };
    element.clear = () => {
      setReplayPointerWrapper(null);
    };
    createEffect(() => {
      const frame = replayStore.frame;
      element.dispatchEvent(new CustomEvent("framechange", {
        detail: frame
      }));
    });
    return createComponent(MiniApp, {
      get zipsBaseUrl() {
        return props.zipsBaseUrl;
      }
    });
  });
})();
