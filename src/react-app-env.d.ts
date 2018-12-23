/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference lib="es2017.object" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
  }
}

declare module '*.bmp' {
  var src: string
  export default src
}

declare module '*.gif' {
  var src: string
  export default src
}

declare module '*.jpg' {
  var src: string
  export default src
}

declare module '*.jpeg' {
  var src: string
  export default src
}

declare module '*.png' {
  var src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export var ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>

  var src: string
  export default src
}

declare module '*.module.css' {
  var classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  var classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  var classes: { [key: string]: string }
  export default classes
}
