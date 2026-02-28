declare interface Env {
  readonly NG_APP_NODE_ENV: string;
  readonly NG_APP_SERVER_URL: string;
}
declare interface ImportMeta {
  readonly env: Env;
}
declare const _NGX_ENV_: Env;
declare namespace NodeJS {
  export type ProcessEnv = Env;
}
