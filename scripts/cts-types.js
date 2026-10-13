/**
 *  Generates types/main.d.cts (types for the CommonJS build) from types/main.d.ts.
 *  The result is self-contained, so CommonJS consumers on TypeScript older than 5.3
 *  don't need 'resolution-mode' import attributes. Runs after tsc in 'postbuild'.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const
      source = 'types/main.d.ts'
    , target = 'types/main.d.cts'
    , esm = readFileSync ( source, 'utf8' )
            .replace ( /^\/\/# sourceMappingURL=.*$/m, '' )
            .replace ( /^export default routeEmitter;\s*$/m, '' )
    , fnStart  = esm.indexOf ( 'declare function routeEmitter' )
    , docStart = esm.lastIndexOf ( '/**', fnStart )
    , typeNames = [ ...esm.matchAll ( /^export type (\w+)/gm ) ].map ( m => m[1] )
    ;

if ( fnStart === -1 || docStart === -1 || !typeNames.length )   throw new Error ( `Unexpected format of ${source}` )

const
      indent = text => text.trim ().split ( '\n' ).map ( line => line ? `    ${line}` : line ).join ( '\n' )
    , types = esm.slice ( 0, docStart )
    , fn    = esm.slice ( docStart ).trim ()
    ;

writeFileSync ( target, `// Types for the CommonJS build (dist/route-emitter.cjs) where \`module.exports\` is the routeEmitter function.
// Generated from main.d.ts by scripts/cts-types.js. Don't edit.

declare namespace routeEmitter {
${indent ( types )}
}

${typeNames.map ( name => `import ${name} = routeEmitter.${name};` ).join ( '\n' )}

${fn}

export = routeEmitter;
`)

console.log ( `${target} generated` )
