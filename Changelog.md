# Release History



### 2.3.2 ( 2026-10-13)
- [x] Dependency update. ask-for-promise - v. 3.2.1;
- [x] Dependency update. @peter.naydenov/notice - v. 2.6.2;
- [x] Fix: `back(steps)` moved only one step. Native `history.back()` ignores arguments, so `history.go(-steps)` is used;
- [x] Fix: CommonJS types (`types/main.d.cts`) work with TypeScript older than 5.3. The file is self-contained and generated from `types/main.d.ts` on build;
- [x] Fix: Deep imports `dist/route-emitter.esm.js`, `dist/route-emitter.cjs` and `src/*.js` have types;
- [x] Fix: `getCurrentAddress` returns `[null, null]` before an address is loaded instead of `[null, ['']]`. It returns null data instead of throwing when the current address was removed;
- [x] Fix: `navigate` threw after the current address was removed. The removed address is treated as not in history;
- [x] Removed unused React dev dependencies;
- [x] Tests for `back` and `forward` are enabled. Type tests check that ESM and CommonJS declarations match;
- [x] Documentation: README has a TypeScript section. Fixed signal name `reload`, default title 'App Name' and the `routeEmmiter` typo in the example. Skill updated for v2.3.2;



### 2.3.1 ( 2026-10-11)
- [x] Fix: TypeScript declarations were invalid. API members had no names;
- [x] Fix: TypeScript declarations were not reachable through package.json "exports". Added "types" conditions;
- [x] Fix: `require` pointed to missing file `dist/route-emitter.cjs`. CommonJS build is added together with `types/main.d.cts`;
- [x] Fix: Declared types match the runtime API. Config is optional, `back`, `forward` and `createURL` are typed, `listActiveAddresses` returns `string[]`;
- [x] Feature: Method `listActiveAddresses` is available. Misspelled `listAciveAddresses` is deprecated but still works;
- [x] Fix: `@peter.naydenov/url-pattern` is external in the builds instead of bundled;
- [x] Package contains only `src`, `dist`, `types`, `skills` and docs. Removed outdated `types/src` declarations;
- [x] Dependency update. @peter.naydenov/notice - v. 2.6.1;
- [x] Test setup works with Vitest 5. Added type-check tests for ESM and CommonJS consumers;
- [x] Dev dependencies update. Removed unused rollup plugins;


### 2.3.0 ( 2026-09-30)
- [x] Feature: Added an agent-neutral route-emitter skill in `skills/`;


### 2.2.18 ( 2026-08-28)
- [x] Dependency update. @peter.naydenov/url-pattern - v. 1.0.7;



### 2.2.17 ( 2026-07-23)
- [x] Dependency update. @peter.naydenov/notice - v. 2.5.0;



### 2.2.16 ( 2026-07-21)
- [x] Dependency update. peter.naydenov/url-pattern - v. 1.0.6;
- [x] Dependency update. ask-for-promise - v. 3.2.0;
- [x] Dev dependency update. Vite - v.8.1.5;



### 2.2.15 ( 2026-07-10)
- [x] Dependency update. @peter.naydenov/notice - v. 2.4.5;
- [x] Dependency update. @peter.naydenov/url-pattern - v. 1.0.5;
- [x] Regular dev dependency updates;



### 2.2.14 ( 2026-05-15)
- [x] Dependency change: Using now @peter.naydenov/url-pattern instead of url-pattern;



### 2.2.13 ( 2026-05-01)
- [x] Dependency update. ask-for-promise - v. 3.1.1



### 2.2.12 ( 2026-04-03)
- [x] Dependency update. @peter.naydenov/notice - v. 2.4.2;
- [x] Dev dependency update. Typescript v.6;
- [x] Update types according to typescript v.6;
- [x] Moving tests from cypress to vitest;



### 2.2.11 ( 2025-10-04)
- [x] Dependency update. Ask-for-promise - v. 3.0.2



### 2.2.10 ( 2025-05-02)
- [x] Build was processed;



### 2.2.9 ( 2025-05-02)
- [x] Dependency update. @peter.naydenov/notice - v. 2.4.1
- [ ] Build was forgotten;



### 2.2.8 ( 2025-02-25)
- [x] Dependency update. @peter.naydenov/notice - v. 2.4.0



### 2.2.6 (2024-12-16)
- [x] Dependency update. @peter.naydenov/notice - v. 2.3.2
- [x] Dependency update. ask-for-promise - v. 2.0.5


### 2.2.5 (2024-12-12)
- [x] Fix: Method `getCurrentAddress` breaks if the URL is not in the address list;



### 2.2.4 (2024-12-12)
- [x] Types updates
- [ ] Bug: Method `getCurrentAddress` breaks if the URL is not in the address list;


### 2.2.3 (2024-12-12)
- [x] Generate d.ts files on build;
- [x] Compression of build files was removed;
- [ ] Bug: Method `getCurrentAddress` breaks if the URL is not in the address list;



### 2.2.2 (2024-12-11)
- [x] Fix: Folder dist is not available in npm package;



### 2.2.1 ( 2024-04-06)
- [x] Dependency update. @peter.naydenov/notice - v. 2.3.1
- [x] Dev dependencies updates.
- [ ] Bug: Folder dist is not available in npm package;




### 2.2.0 (2024-02-05)
- [x]  Folder 'dist' was added to the project. Includes commonjs, umd and esm versions of the library;
 - [x] Package.json: "exports" section was added. Allows you to use package as commonjs or es6 module without additional configuration;
 - [x] Rollup was added to the project. Used to build the library versions;




### 2.1.2 (2023-11-11)
- [x] Dependency update: @peter.naydenov/notice@2.2.2;



### 2.0.0 ( 2023-09-29 )
- [x] Refactoring: React-router is no longer a dependency;
- [x] Complete rewrite of the application;



### 1.1.1 ( 2022-09-18 )
- [x] Fix: Use of method 'repeat' before a navigation event is cause for error;



### 1.1.0 ( 2022-07-22)
- [x] New methods: getCurrent, repeat;
- [ ] Bug: Use of method 'repeat' before a navigation event is cause for error;



### 1.0.1 ( 2022-10-08 )
- [x] Published for first time
