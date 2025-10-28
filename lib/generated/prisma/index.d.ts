
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model attendances
 * 
 */
export type attendances = $Result.DefaultSelection<Prisma.$attendancesPayload>
/**
 * Model platforms
 * 
 */
export type platforms = $Result.DefaultSelection<Prisma.$platformsPayload>
/**
 * Model projects
 * 
 */
export type projects = $Result.DefaultSelection<Prisma.$projectsPayload>
/**
 * Model roles
 * 
 */
export type roles = $Result.DefaultSelection<Prisma.$rolesPayload>
/**
 * Model skills
 * 
 */
export type skills = $Result.DefaultSelection<Prisma.$skillsPayload>
/**
 * Model user_platforms
 * 
 */
export type user_platforms = $Result.DefaultSelection<Prisma.$user_platformsPayload>
/**
 * Model user_projects
 * 
 */
export type user_projects = $Result.DefaultSelection<Prisma.$user_projectsPayload>
/**
 * Model user_skills
 * 
 */
export type user_skills = $Result.DefaultSelection<Prisma.$user_skillsPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Attendances
 * const attendances = await prisma.attendances.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Attendances
   * const attendances = await prisma.attendances.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.attendances`: Exposes CRUD operations for the **attendances** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendances.findMany()
    * ```
    */
  get attendances(): Prisma.attendancesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platforms`: Exposes CRUD operations for the **platforms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Platforms
    * const platforms = await prisma.platforms.findMany()
    * ```
    */
  get platforms(): Prisma.platformsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projects`: Exposes CRUD operations for the **projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.projects.findMany()
    * ```
    */
  get projects(): Prisma.projectsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.rolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skills`: Exposes CRUD operations for the **skills** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skills.findMany()
    * ```
    */
  get skills(): Prisma.skillsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_platforms`: Exposes CRUD operations for the **user_platforms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_platforms
    * const user_platforms = await prisma.user_platforms.findMany()
    * ```
    */
  get user_platforms(): Prisma.user_platformsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_projects`: Exposes CRUD operations for the **user_projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_projects
    * const user_projects = await prisma.user_projects.findMany()
    * ```
    */
  get user_projects(): Prisma.user_projectsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_skills`: Exposes CRUD operations for the **user_skills** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_skills
    * const user_skills = await prisma.user_skills.findMany()
    * ```
    */
  get user_skills(): Prisma.user_skillsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    attendances: 'attendances',
    platforms: 'platforms',
    projects: 'projects',
    roles: 'roles',
    skills: 'skills',
    user_platforms: 'user_platforms',
    user_projects: 'user_projects',
    user_skills: 'user_skills',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "attendances" | "platforms" | "projects" | "roles" | "skills" | "user_platforms" | "user_projects" | "user_skills" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      attendances: {
        payload: Prisma.$attendancesPayload<ExtArgs>
        fields: Prisma.attendancesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.attendancesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.attendancesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>
          }
          findFirst: {
            args: Prisma.attendancesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.attendancesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>
          }
          findMany: {
            args: Prisma.attendancesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>[]
          }
          create: {
            args: Prisma.attendancesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>
          }
          createMany: {
            args: Prisma.attendancesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.attendancesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>[]
          }
          delete: {
            args: Prisma.attendancesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>
          }
          update: {
            args: Prisma.attendancesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>
          }
          deleteMany: {
            args: Prisma.attendancesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.attendancesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.attendancesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>[]
          }
          upsert: {
            args: Prisma.attendancesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancesPayload>
          }
          aggregate: {
            args: Prisma.AttendancesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendances>
          }
          groupBy: {
            args: Prisma.attendancesGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendancesGroupByOutputType>[]
          }
          count: {
            args: Prisma.attendancesCountArgs<ExtArgs>
            result: $Utils.Optional<AttendancesCountAggregateOutputType> | number
          }
        }
      }
      platforms: {
        payload: Prisma.$platformsPayload<ExtArgs>
        fields: Prisma.platformsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.platformsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.platformsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>
          }
          findFirst: {
            args: Prisma.platformsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.platformsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>
          }
          findMany: {
            args: Prisma.platformsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>[]
          }
          create: {
            args: Prisma.platformsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>
          }
          createMany: {
            args: Prisma.platformsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.platformsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>[]
          }
          delete: {
            args: Prisma.platformsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>
          }
          update: {
            args: Prisma.platformsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>
          }
          deleteMany: {
            args: Prisma.platformsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.platformsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.platformsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>[]
          }
          upsert: {
            args: Prisma.platformsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$platformsPayload>
          }
          aggregate: {
            args: Prisma.PlatformsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatforms>
          }
          groupBy: {
            args: Prisma.platformsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformsGroupByOutputType>[]
          }
          count: {
            args: Prisma.platformsCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformsCountAggregateOutputType> | number
          }
        }
      }
      projects: {
        payload: Prisma.$projectsPayload<ExtArgs>
        fields: Prisma.projectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.projectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.projectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findFirst: {
            args: Prisma.projectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.projectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findMany: {
            args: Prisma.projectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          create: {
            args: Prisma.projectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          createMany: {
            args: Prisma.projectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.projectsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          delete: {
            args: Prisma.projectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          update: {
            args: Prisma.projectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          deleteMany: {
            args: Prisma.projectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.projectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.projectsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          upsert: {
            args: Prisma.projectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          aggregate: {
            args: Prisma.ProjectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjects>
          }
          groupBy: {
            args: Prisma.projectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectsGroupByOutputType>[]
          }
          count: {
            args: Prisma.projectsCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectsCountAggregateOutputType> | number
          }
        }
      }
      roles: {
        payload: Prisma.$rolesPayload<ExtArgs>
        fields: Prisma.rolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          findFirst: {
            args: Prisma.rolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          findMany: {
            args: Prisma.rolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          create: {
            args: Prisma.rolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          createMany: {
            args: Prisma.rolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          delete: {
            args: Prisma.rolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          update: {
            args: Prisma.rolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          deleteMany: {
            args: Prisma.rolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.rolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          upsert: {
            args: Prisma.rolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoles>
          }
          groupBy: {
            args: Prisma.rolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.rolesCountArgs<ExtArgs>
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
          }
        }
      }
      skills: {
        payload: Prisma.$skillsPayload<ExtArgs>
        fields: Prisma.skillsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.skillsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.skillsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>
          }
          findFirst: {
            args: Prisma.skillsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.skillsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>
          }
          findMany: {
            args: Prisma.skillsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>[]
          }
          create: {
            args: Prisma.skillsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>
          }
          createMany: {
            args: Prisma.skillsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.skillsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>[]
          }
          delete: {
            args: Prisma.skillsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>
          }
          update: {
            args: Prisma.skillsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>
          }
          deleteMany: {
            args: Prisma.skillsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.skillsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.skillsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>[]
          }
          upsert: {
            args: Prisma.skillsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillsPayload>
          }
          aggregate: {
            args: Prisma.SkillsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkills>
          }
          groupBy: {
            args: Prisma.skillsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillsGroupByOutputType>[]
          }
          count: {
            args: Prisma.skillsCountArgs<ExtArgs>
            result: $Utils.Optional<SkillsCountAggregateOutputType> | number
          }
        }
      }
      user_platforms: {
        payload: Prisma.$user_platformsPayload<ExtArgs>
        fields: Prisma.user_platformsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_platformsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_platformsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>
          }
          findFirst: {
            args: Prisma.user_platformsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_platformsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>
          }
          findMany: {
            args: Prisma.user_platformsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>[]
          }
          create: {
            args: Prisma.user_platformsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>
          }
          createMany: {
            args: Prisma.user_platformsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_platformsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>[]
          }
          delete: {
            args: Prisma.user_platformsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>
          }
          update: {
            args: Prisma.user_platformsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>
          }
          deleteMany: {
            args: Prisma.user_platformsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_platformsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_platformsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>[]
          }
          upsert: {
            args: Prisma.user_platformsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_platformsPayload>
          }
          aggregate: {
            args: Prisma.User_platformsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_platforms>
          }
          groupBy: {
            args: Prisma.user_platformsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_platformsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_platformsCountArgs<ExtArgs>
            result: $Utils.Optional<User_platformsCountAggregateOutputType> | number
          }
        }
      }
      user_projects: {
        payload: Prisma.$user_projectsPayload<ExtArgs>
        fields: Prisma.user_projectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_projectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_projectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>
          }
          findFirst: {
            args: Prisma.user_projectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_projectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>
          }
          findMany: {
            args: Prisma.user_projectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>[]
          }
          create: {
            args: Prisma.user_projectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>
          }
          createMany: {
            args: Prisma.user_projectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_projectsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>[]
          }
          delete: {
            args: Prisma.user_projectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>
          }
          update: {
            args: Prisma.user_projectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>
          }
          deleteMany: {
            args: Prisma.user_projectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_projectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_projectsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>[]
          }
          upsert: {
            args: Prisma.user_projectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_projectsPayload>
          }
          aggregate: {
            args: Prisma.User_projectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_projects>
          }
          groupBy: {
            args: Prisma.user_projectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_projectsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_projectsCountArgs<ExtArgs>
            result: $Utils.Optional<User_projectsCountAggregateOutputType> | number
          }
        }
      }
      user_skills: {
        payload: Prisma.$user_skillsPayload<ExtArgs>
        fields: Prisma.user_skillsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_skillsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_skillsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>
          }
          findFirst: {
            args: Prisma.user_skillsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_skillsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>
          }
          findMany: {
            args: Prisma.user_skillsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>[]
          }
          create: {
            args: Prisma.user_skillsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>
          }
          createMany: {
            args: Prisma.user_skillsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_skillsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>[]
          }
          delete: {
            args: Prisma.user_skillsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>
          }
          update: {
            args: Prisma.user_skillsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>
          }
          deleteMany: {
            args: Prisma.user_skillsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_skillsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_skillsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>[]
          }
          upsert: {
            args: Prisma.user_skillsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_skillsPayload>
          }
          aggregate: {
            args: Prisma.User_skillsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_skills>
          }
          groupBy: {
            args: Prisma.user_skillsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_skillsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_skillsCountArgs<ExtArgs>
            result: $Utils.Optional<User_skillsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    attendances?: attendancesOmit
    platforms?: platformsOmit
    projects?: projectsOmit
    roles?: rolesOmit
    skills?: skillsOmit
    user_platforms?: user_platformsOmit
    user_projects?: user_projectsOmit
    user_skills?: user_skillsOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlatformsCountOutputType
   */

  export type PlatformsCountOutputType = {
    user_platforms: number
  }

  export type PlatformsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_platforms?: boolean | PlatformsCountOutputTypeCountUser_platformsArgs
  }

  // Custom InputTypes
  /**
   * PlatformsCountOutputType without action
   */
  export type PlatformsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformsCountOutputType
     */
    select?: PlatformsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlatformsCountOutputType without action
   */
  export type PlatformsCountOutputTypeCountUser_platformsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_platformsWhereInput
  }


  /**
   * Count Type ProjectsCountOutputType
   */

  export type ProjectsCountOutputType = {
    user_projects: number
  }

  export type ProjectsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_projects?: boolean | ProjectsCountOutputTypeCountUser_projectsArgs
  }

  // Custom InputTypes
  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectsCountOutputType
     */
    select?: ProjectsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeCountUser_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_projectsWhereInput
  }


  /**
   * Count Type RolesCountOutputType
   */

  export type RolesCountOutputType = {
    users: number
  }

  export type RolesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RolesCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolesCountOutputType
     */
    select?: RolesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Count Type SkillsCountOutputType
   */

  export type SkillsCountOutputType = {
    user_skills: number
  }

  export type SkillsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_skills?: boolean | SkillsCountOutputTypeCountUser_skillsArgs
  }

  // Custom InputTypes
  /**
   * SkillsCountOutputType without action
   */
  export type SkillsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillsCountOutputType
     */
    select?: SkillsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillsCountOutputType without action
   */
  export type SkillsCountOutputTypeCountUser_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_skillsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    attendances: number
    user_platforms: number
    user_projects: number
    user_skills: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendances?: boolean | UsersCountOutputTypeCountAttendancesArgs
    user_platforms?: boolean | UsersCountOutputTypeCountUser_platformsArgs
    user_projects?: boolean | UsersCountOutputTypeCountUser_projectsArgs
    user_skills?: boolean | UsersCountOutputTypeCountUser_skillsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendancesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUser_platformsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_platformsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUser_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_projectsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUser_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_skillsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model attendances
   */

  export type AggregateAttendances = {
    _count: AttendancesCountAggregateOutputType | null
    _avg: AttendancesAvgAggregateOutputType | null
    _sum: AttendancesSumAggregateOutputType | null
    _min: AttendancesMinAggregateOutputType | null
    _max: AttendancesMaxAggregateOutputType | null
  }

  export type AttendancesAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type AttendancesSumAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
  }

  export type AttendancesMinAggregateOutputType = {
    id: bigint | null
    attendance_date: Date | null
    user_id: bigint | null
  }

  export type AttendancesMaxAggregateOutputType = {
    id: bigint | null
    attendance_date: Date | null
    user_id: bigint | null
  }

  export type AttendancesCountAggregateOutputType = {
    id: number
    attendance_date: number
    user_id: number
    _all: number
  }


  export type AttendancesAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type AttendancesSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type AttendancesMinAggregateInputType = {
    id?: true
    attendance_date?: true
    user_id?: true
  }

  export type AttendancesMaxAggregateInputType = {
    id?: true
    attendance_date?: true
    user_id?: true
  }

  export type AttendancesCountAggregateInputType = {
    id?: true
    attendance_date?: true
    user_id?: true
    _all?: true
  }

  export type AttendancesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendances to aggregate.
     */
    where?: attendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendances to fetch.
     */
    orderBy?: attendancesOrderByWithRelationInput | attendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: attendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned attendances
    **/
    _count?: true | AttendancesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendancesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendancesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendancesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendancesMaxAggregateInputType
  }

  export type GetAttendancesAggregateType<T extends AttendancesAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendances]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendances[P]>
      : GetScalarType<T[P], AggregateAttendances[P]>
  }




  export type attendancesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendancesWhereInput
    orderBy?: attendancesOrderByWithAggregationInput | attendancesOrderByWithAggregationInput[]
    by: AttendancesScalarFieldEnum[] | AttendancesScalarFieldEnum
    having?: attendancesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendancesCountAggregateInputType | true
    _avg?: AttendancesAvgAggregateInputType
    _sum?: AttendancesSumAggregateInputType
    _min?: AttendancesMinAggregateInputType
    _max?: AttendancesMaxAggregateInputType
  }

  export type AttendancesGroupByOutputType = {
    id: bigint
    attendance_date: Date
    user_id: bigint | null
    _count: AttendancesCountAggregateOutputType | null
    _avg: AttendancesAvgAggregateOutputType | null
    _sum: AttendancesSumAggregateOutputType | null
    _min: AttendancesMinAggregateOutputType | null
    _max: AttendancesMaxAggregateOutputType | null
  }

  type GetAttendancesGroupByPayload<T extends attendancesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendancesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendancesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendancesGroupByOutputType[P]>
            : GetScalarType<T[P], AttendancesGroupByOutputType[P]>
        }
      >
    >


  export type attendancesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attendance_date?: boolean
    user_id?: boolean
    users?: boolean | attendances$usersArgs<ExtArgs>
  }, ExtArgs["result"]["attendances"]>

  export type attendancesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attendance_date?: boolean
    user_id?: boolean
    users?: boolean | attendances$usersArgs<ExtArgs>
  }, ExtArgs["result"]["attendances"]>

  export type attendancesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attendance_date?: boolean
    user_id?: boolean
    users?: boolean | attendances$usersArgs<ExtArgs>
  }, ExtArgs["result"]["attendances"]>

  export type attendancesSelectScalar = {
    id?: boolean
    attendance_date?: boolean
    user_id?: boolean
  }

  export type attendancesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attendance_date" | "user_id", ExtArgs["result"]["attendances"]>
  export type attendancesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | attendances$usersArgs<ExtArgs>
  }
  export type attendancesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | attendances$usersArgs<ExtArgs>
  }
  export type attendancesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | attendances$usersArgs<ExtArgs>
  }

  export type $attendancesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "attendances"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      attendance_date: Date
      user_id: bigint | null
    }, ExtArgs["result"]["attendances"]>
    composites: {}
  }

  type attendancesGetPayload<S extends boolean | null | undefined | attendancesDefaultArgs> = $Result.GetResult<Prisma.$attendancesPayload, S>

  type attendancesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<attendancesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendancesCountAggregateInputType | true
    }

  export interface attendancesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['attendances'], meta: { name: 'attendances' } }
    /**
     * Find zero or one Attendances that matches the filter.
     * @param {attendancesFindUniqueArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends attendancesFindUniqueArgs>(args: SelectSubset<T, attendancesFindUniqueArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendances that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {attendancesFindUniqueOrThrowArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends attendancesFindUniqueOrThrowArgs>(args: SelectSubset<T, attendancesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancesFindFirstArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends attendancesFindFirstArgs>(args?: SelectSubset<T, attendancesFindFirstArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendances that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancesFindFirstOrThrowArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends attendancesFindFirstOrThrowArgs>(args?: SelectSubset<T, attendancesFindFirstOrThrowArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendances.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendances.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendancesWithIdOnly = await prisma.attendances.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends attendancesFindManyArgs>(args?: SelectSubset<T, attendancesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendances.
     * @param {attendancesCreateArgs} args - Arguments to create a Attendances.
     * @example
     * // Create one Attendances
     * const Attendances = await prisma.attendances.create({
     *   data: {
     *     // ... data to create a Attendances
     *   }
     * })
     * 
     */
    create<T extends attendancesCreateArgs>(args: SelectSubset<T, attendancesCreateArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {attendancesCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendances = await prisma.attendances.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends attendancesCreateManyArgs>(args?: SelectSubset<T, attendancesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {attendancesCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendances = await prisma.attendances.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendancesWithIdOnly = await prisma.attendances.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends attendancesCreateManyAndReturnArgs>(args?: SelectSubset<T, attendancesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attendances.
     * @param {attendancesDeleteArgs} args - Arguments to delete one Attendances.
     * @example
     * // Delete one Attendances
     * const Attendances = await prisma.attendances.delete({
     *   where: {
     *     // ... filter to delete one Attendances
     *   }
     * })
     * 
     */
    delete<T extends attendancesDeleteArgs>(args: SelectSubset<T, attendancesDeleteArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendances.
     * @param {attendancesUpdateArgs} args - Arguments to update one Attendances.
     * @example
     * // Update one Attendances
     * const attendances = await prisma.attendances.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends attendancesUpdateArgs>(args: SelectSubset<T, attendancesUpdateArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {attendancesDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendances.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends attendancesDeleteManyArgs>(args?: SelectSubset<T, attendancesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendances = await prisma.attendances.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends attendancesUpdateManyArgs>(args: SelectSubset<T, attendancesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances and returns the data updated in the database.
     * @param {attendancesUpdateManyAndReturnArgs} args - Arguments to update many Attendances.
     * @example
     * // Update many Attendances
     * const attendances = await prisma.attendances.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attendances and only return the `id`
     * const attendancesWithIdOnly = await prisma.attendances.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends attendancesUpdateManyAndReturnArgs>(args: SelectSubset<T, attendancesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attendances.
     * @param {attendancesUpsertArgs} args - Arguments to update or create a Attendances.
     * @example
     * // Update or create a Attendances
     * const attendances = await prisma.attendances.upsert({
     *   create: {
     *     // ... data to create a Attendances
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendances we want to update
     *   }
     * })
     */
    upsert<T extends attendancesUpsertArgs>(args: SelectSubset<T, attendancesUpsertArgs<ExtArgs>>): Prisma__attendancesClient<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancesCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendances.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends attendancesCountArgs>(
      args?: Subset<T, attendancesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendancesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendancesAggregateArgs>(args: Subset<T, AttendancesAggregateArgs>): Prisma.PrismaPromise<GetAttendancesAggregateType<T>>

    /**
     * Group by Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends attendancesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: attendancesGroupByArgs['orderBy'] }
        : { orderBy?: attendancesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, attendancesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendancesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the attendances model
   */
  readonly fields: attendancesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for attendances.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__attendancesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends attendances$usersArgs<ExtArgs> = {}>(args?: Subset<T, attendances$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the attendances model
   */
  interface attendancesFieldRefs {
    readonly id: FieldRef<"attendances", 'BigInt'>
    readonly attendance_date: FieldRef<"attendances", 'DateTime'>
    readonly user_id: FieldRef<"attendances", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * attendances findUnique
   */
  export type attendancesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * Filter, which attendances to fetch.
     */
    where: attendancesWhereUniqueInput
  }

  /**
   * attendances findUniqueOrThrow
   */
  export type attendancesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * Filter, which attendances to fetch.
     */
    where: attendancesWhereUniqueInput
  }

  /**
   * attendances findFirst
   */
  export type attendancesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * Filter, which attendances to fetch.
     */
    where?: attendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendances to fetch.
     */
    orderBy?: attendancesOrderByWithRelationInput | attendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendances.
     */
    cursor?: attendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendances.
     */
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * attendances findFirstOrThrow
   */
  export type attendancesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * Filter, which attendances to fetch.
     */
    where?: attendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendances to fetch.
     */
    orderBy?: attendancesOrderByWithRelationInput | attendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendances.
     */
    cursor?: attendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendances.
     */
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * attendances findMany
   */
  export type attendancesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * Filter, which attendances to fetch.
     */
    where?: attendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendances to fetch.
     */
    orderBy?: attendancesOrderByWithRelationInput | attendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing attendances.
     */
    cursor?: attendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendances.
     */
    skip?: number
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * attendances create
   */
  export type attendancesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * The data needed to create a attendances.
     */
    data: XOR<attendancesCreateInput, attendancesUncheckedCreateInput>
  }

  /**
   * attendances createMany
   */
  export type attendancesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many attendances.
     */
    data: attendancesCreateManyInput | attendancesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attendances createManyAndReturn
   */
  export type attendancesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * The data used to create many attendances.
     */
    data: attendancesCreateManyInput | attendancesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * attendances update
   */
  export type attendancesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * The data needed to update a attendances.
     */
    data: XOR<attendancesUpdateInput, attendancesUncheckedUpdateInput>
    /**
     * Choose, which attendances to update.
     */
    where: attendancesWhereUniqueInput
  }

  /**
   * attendances updateMany
   */
  export type attendancesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update attendances.
     */
    data: XOR<attendancesUpdateManyMutationInput, attendancesUncheckedUpdateManyInput>
    /**
     * Filter which attendances to update
     */
    where?: attendancesWhereInput
    /**
     * Limit how many attendances to update.
     */
    limit?: number
  }

  /**
   * attendances updateManyAndReturn
   */
  export type attendancesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * The data used to update attendances.
     */
    data: XOR<attendancesUpdateManyMutationInput, attendancesUncheckedUpdateManyInput>
    /**
     * Filter which attendances to update
     */
    where?: attendancesWhereInput
    /**
     * Limit how many attendances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * attendances upsert
   */
  export type attendancesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * The filter to search for the attendances to update in case it exists.
     */
    where: attendancesWhereUniqueInput
    /**
     * In case the attendances found by the `where` argument doesn't exist, create a new attendances with this data.
     */
    create: XOR<attendancesCreateInput, attendancesUncheckedCreateInput>
    /**
     * In case the attendances was found with the provided `where` argument, update it with this data.
     */
    update: XOR<attendancesUpdateInput, attendancesUncheckedUpdateInput>
  }

  /**
   * attendances delete
   */
  export type attendancesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    /**
     * Filter which attendances to delete.
     */
    where: attendancesWhereUniqueInput
  }

  /**
   * attendances deleteMany
   */
  export type attendancesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendances to delete
     */
    where?: attendancesWhereInput
    /**
     * Limit how many attendances to delete.
     */
    limit?: number
  }

  /**
   * attendances.users
   */
  export type attendances$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * attendances without action
   */
  export type attendancesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
  }


  /**
   * Model platforms
   */

  export type AggregatePlatforms = {
    _count: PlatformsCountAggregateOutputType | null
    _avg: PlatformsAvgAggregateOutputType | null
    _sum: PlatformsSumAggregateOutputType | null
    _min: PlatformsMinAggregateOutputType | null
    _max: PlatformsMaxAggregateOutputType | null
  }

  export type PlatformsAvgAggregateOutputType = {
    id: number | null
  }

  export type PlatformsSumAggregateOutputType = {
    id: bigint | null
  }

  export type PlatformsMinAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type PlatformsMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type PlatformsCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type PlatformsAvgAggregateInputType = {
    id?: true
  }

  export type PlatformsSumAggregateInputType = {
    id?: true
  }

  export type PlatformsMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type PlatformsMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type PlatformsCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type PlatformsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which platforms to aggregate.
     */
    where?: platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of platforms to fetch.
     */
    orderBy?: platformsOrderByWithRelationInput | platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned platforms
    **/
    _count?: true | PlatformsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlatformsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlatformsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformsMaxAggregateInputType
  }

  export type GetPlatformsAggregateType<T extends PlatformsAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatforms]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatforms[P]>
      : GetScalarType<T[P], AggregatePlatforms[P]>
  }




  export type platformsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: platformsWhereInput
    orderBy?: platformsOrderByWithAggregationInput | platformsOrderByWithAggregationInput[]
    by: PlatformsScalarFieldEnum[] | PlatformsScalarFieldEnum
    having?: platformsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformsCountAggregateInputType | true
    _avg?: PlatformsAvgAggregateInputType
    _sum?: PlatformsSumAggregateInputType
    _min?: PlatformsMinAggregateInputType
    _max?: PlatformsMaxAggregateInputType
  }

  export type PlatformsGroupByOutputType = {
    id: bigint
    name: string
    _count: PlatformsCountAggregateOutputType | null
    _avg: PlatformsAvgAggregateOutputType | null
    _sum: PlatformsSumAggregateOutputType | null
    _min: PlatformsMinAggregateOutputType | null
    _max: PlatformsMaxAggregateOutputType | null
  }

  type GetPlatformsGroupByPayload<T extends platformsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformsGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformsGroupByOutputType[P]>
        }
      >
    >


  export type platformsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_platforms?: boolean | platforms$user_platformsArgs<ExtArgs>
    _count?: boolean | PlatformsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platforms"]>

  export type platformsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["platforms"]>

  export type platformsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["platforms"]>

  export type platformsSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type platformsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["platforms"]>
  export type platformsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_platforms?: boolean | platforms$user_platformsArgs<ExtArgs>
    _count?: boolean | PlatformsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type platformsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type platformsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $platformsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "platforms"
    objects: {
      user_platforms: Prisma.$user_platformsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
    }, ExtArgs["result"]["platforms"]>
    composites: {}
  }

  type platformsGetPayload<S extends boolean | null | undefined | platformsDefaultArgs> = $Result.GetResult<Prisma.$platformsPayload, S>

  type platformsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<platformsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatformsCountAggregateInputType | true
    }

  export interface platformsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['platforms'], meta: { name: 'platforms' } }
    /**
     * Find zero or one Platforms that matches the filter.
     * @param {platformsFindUniqueArgs} args - Arguments to find a Platforms
     * @example
     * // Get one Platforms
     * const platforms = await prisma.platforms.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends platformsFindUniqueArgs>(args: SelectSubset<T, platformsFindUniqueArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Platforms that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {platformsFindUniqueOrThrowArgs} args - Arguments to find a Platforms
     * @example
     * // Get one Platforms
     * const platforms = await prisma.platforms.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends platformsFindUniqueOrThrowArgs>(args: SelectSubset<T, platformsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Platforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {platformsFindFirstArgs} args - Arguments to find a Platforms
     * @example
     * // Get one Platforms
     * const platforms = await prisma.platforms.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends platformsFindFirstArgs>(args?: SelectSubset<T, platformsFindFirstArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Platforms that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {platformsFindFirstOrThrowArgs} args - Arguments to find a Platforms
     * @example
     * // Get one Platforms
     * const platforms = await prisma.platforms.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends platformsFindFirstOrThrowArgs>(args?: SelectSubset<T, platformsFindFirstOrThrowArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Platforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {platformsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Platforms
     * const platforms = await prisma.platforms.findMany()
     * 
     * // Get first 10 Platforms
     * const platforms = await prisma.platforms.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformsWithIdOnly = await prisma.platforms.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends platformsFindManyArgs>(args?: SelectSubset<T, platformsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Platforms.
     * @param {platformsCreateArgs} args - Arguments to create a Platforms.
     * @example
     * // Create one Platforms
     * const Platforms = await prisma.platforms.create({
     *   data: {
     *     // ... data to create a Platforms
     *   }
     * })
     * 
     */
    create<T extends platformsCreateArgs>(args: SelectSubset<T, platformsCreateArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Platforms.
     * @param {platformsCreateManyArgs} args - Arguments to create many Platforms.
     * @example
     * // Create many Platforms
     * const platforms = await prisma.platforms.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends platformsCreateManyArgs>(args?: SelectSubset<T, platformsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Platforms and returns the data saved in the database.
     * @param {platformsCreateManyAndReturnArgs} args - Arguments to create many Platforms.
     * @example
     * // Create many Platforms
     * const platforms = await prisma.platforms.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Platforms and only return the `id`
     * const platformsWithIdOnly = await prisma.platforms.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends platformsCreateManyAndReturnArgs>(args?: SelectSubset<T, platformsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Platforms.
     * @param {platformsDeleteArgs} args - Arguments to delete one Platforms.
     * @example
     * // Delete one Platforms
     * const Platforms = await prisma.platforms.delete({
     *   where: {
     *     // ... filter to delete one Platforms
     *   }
     * })
     * 
     */
    delete<T extends platformsDeleteArgs>(args: SelectSubset<T, platformsDeleteArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Platforms.
     * @param {platformsUpdateArgs} args - Arguments to update one Platforms.
     * @example
     * // Update one Platforms
     * const platforms = await prisma.platforms.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends platformsUpdateArgs>(args: SelectSubset<T, platformsUpdateArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Platforms.
     * @param {platformsDeleteManyArgs} args - Arguments to filter Platforms to delete.
     * @example
     * // Delete a few Platforms
     * const { count } = await prisma.platforms.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends platformsDeleteManyArgs>(args?: SelectSubset<T, platformsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {platformsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Platforms
     * const platforms = await prisma.platforms.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends platformsUpdateManyArgs>(args: SelectSubset<T, platformsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platforms and returns the data updated in the database.
     * @param {platformsUpdateManyAndReturnArgs} args - Arguments to update many Platforms.
     * @example
     * // Update many Platforms
     * const platforms = await prisma.platforms.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Platforms and only return the `id`
     * const platformsWithIdOnly = await prisma.platforms.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends platformsUpdateManyAndReturnArgs>(args: SelectSubset<T, platformsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Platforms.
     * @param {platformsUpsertArgs} args - Arguments to update or create a Platforms.
     * @example
     * // Update or create a Platforms
     * const platforms = await prisma.platforms.upsert({
     *   create: {
     *     // ... data to create a Platforms
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Platforms we want to update
     *   }
     * })
     */
    upsert<T extends platformsUpsertArgs>(args: SelectSubset<T, platformsUpsertArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {platformsCountArgs} args - Arguments to filter Platforms to count.
     * @example
     * // Count the number of Platforms
     * const count = await prisma.platforms.count({
     *   where: {
     *     // ... the filter for the Platforms we want to count
     *   }
     * })
    **/
    count<T extends platformsCountArgs>(
      args?: Subset<T, platformsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformsAggregateArgs>(args: Subset<T, PlatformsAggregateArgs>): Prisma.PrismaPromise<GetPlatformsAggregateType<T>>

    /**
     * Group by Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {platformsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends platformsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: platformsGroupByArgs['orderBy'] }
        : { orderBy?: platformsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, platformsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the platforms model
   */
  readonly fields: platformsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for platforms.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__platformsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_platforms<T extends platforms$user_platformsArgs<ExtArgs> = {}>(args?: Subset<T, platforms$user_platformsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the platforms model
   */
  interface platformsFieldRefs {
    readonly id: FieldRef<"platforms", 'BigInt'>
    readonly name: FieldRef<"platforms", 'String'>
  }
    

  // Custom InputTypes
  /**
   * platforms findUnique
   */
  export type platformsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * Filter, which platforms to fetch.
     */
    where: platformsWhereUniqueInput
  }

  /**
   * platforms findUniqueOrThrow
   */
  export type platformsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * Filter, which platforms to fetch.
     */
    where: platformsWhereUniqueInput
  }

  /**
   * platforms findFirst
   */
  export type platformsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * Filter, which platforms to fetch.
     */
    where?: platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of platforms to fetch.
     */
    orderBy?: platformsOrderByWithRelationInput | platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for platforms.
     */
    cursor?: platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of platforms.
     */
    distinct?: PlatformsScalarFieldEnum | PlatformsScalarFieldEnum[]
  }

  /**
   * platforms findFirstOrThrow
   */
  export type platformsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * Filter, which platforms to fetch.
     */
    where?: platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of platforms to fetch.
     */
    orderBy?: platformsOrderByWithRelationInput | platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for platforms.
     */
    cursor?: platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of platforms.
     */
    distinct?: PlatformsScalarFieldEnum | PlatformsScalarFieldEnum[]
  }

  /**
   * platforms findMany
   */
  export type platformsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * Filter, which platforms to fetch.
     */
    where?: platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of platforms to fetch.
     */
    orderBy?: platformsOrderByWithRelationInput | platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing platforms.
     */
    cursor?: platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` platforms.
     */
    skip?: number
    distinct?: PlatformsScalarFieldEnum | PlatformsScalarFieldEnum[]
  }

  /**
   * platforms create
   */
  export type platformsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * The data needed to create a platforms.
     */
    data: XOR<platformsCreateInput, platformsUncheckedCreateInput>
  }

  /**
   * platforms createMany
   */
  export type platformsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many platforms.
     */
    data: platformsCreateManyInput | platformsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * platforms createManyAndReturn
   */
  export type platformsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * The data used to create many platforms.
     */
    data: platformsCreateManyInput | platformsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * platforms update
   */
  export type platformsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * The data needed to update a platforms.
     */
    data: XOR<platformsUpdateInput, platformsUncheckedUpdateInput>
    /**
     * Choose, which platforms to update.
     */
    where: platformsWhereUniqueInput
  }

  /**
   * platforms updateMany
   */
  export type platformsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update platforms.
     */
    data: XOR<platformsUpdateManyMutationInput, platformsUncheckedUpdateManyInput>
    /**
     * Filter which platforms to update
     */
    where?: platformsWhereInput
    /**
     * Limit how many platforms to update.
     */
    limit?: number
  }

  /**
   * platforms updateManyAndReturn
   */
  export type platformsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * The data used to update platforms.
     */
    data: XOR<platformsUpdateManyMutationInput, platformsUncheckedUpdateManyInput>
    /**
     * Filter which platforms to update
     */
    where?: platformsWhereInput
    /**
     * Limit how many platforms to update.
     */
    limit?: number
  }

  /**
   * platforms upsert
   */
  export type platformsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * The filter to search for the platforms to update in case it exists.
     */
    where: platformsWhereUniqueInput
    /**
     * In case the platforms found by the `where` argument doesn't exist, create a new platforms with this data.
     */
    create: XOR<platformsCreateInput, platformsUncheckedCreateInput>
    /**
     * In case the platforms was found with the provided `where` argument, update it with this data.
     */
    update: XOR<platformsUpdateInput, platformsUncheckedUpdateInput>
  }

  /**
   * platforms delete
   */
  export type platformsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    /**
     * Filter which platforms to delete.
     */
    where: platformsWhereUniqueInput
  }

  /**
   * platforms deleteMany
   */
  export type platformsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which platforms to delete
     */
    where?: platformsWhereInput
    /**
     * Limit how many platforms to delete.
     */
    limit?: number
  }

  /**
   * platforms.user_platforms
   */
  export type platforms$user_platformsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    where?: user_platformsWhereInput
    orderBy?: user_platformsOrderByWithRelationInput | user_platformsOrderByWithRelationInput[]
    cursor?: user_platformsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_platformsScalarFieldEnum | User_platformsScalarFieldEnum[]
  }

  /**
   * platforms without action
   */
  export type platformsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
  }


  /**
   * Model projects
   */

  export type AggregateProjects = {
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  export type ProjectsAvgAggregateOutputType = {
    id: number | null
  }

  export type ProjectsSumAggregateOutputType = {
    id: bigint | null
  }

  export type ProjectsMinAggregateOutputType = {
    id: bigint | null
    title: string | null
    description: string | null
    start_date: Date | null
    is_archived: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectsMaxAggregateOutputType = {
    id: bigint | null
    title: string | null
    description: string | null
    start_date: Date | null
    is_archived: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    start_date: number
    is_archived: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProjectsAvgAggregateInputType = {
    id?: true
  }

  export type ProjectsSumAggregateInputType = {
    id?: true
  }

  export type ProjectsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    is_archived?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    is_archived?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    is_archived?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProjectsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to aggregate.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned projects
    **/
    _count?: true | ProjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectsMaxAggregateInputType
  }

  export type GetProjectsAggregateType<T extends ProjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjects[P]>
      : GetScalarType<T[P], AggregateProjects[P]>
  }




  export type projectsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithAggregationInput | projectsOrderByWithAggregationInput[]
    by: ProjectsScalarFieldEnum[] | ProjectsScalarFieldEnum
    having?: projectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectsCountAggregateInputType | true
    _avg?: ProjectsAvgAggregateInputType
    _sum?: ProjectsSumAggregateInputType
    _min?: ProjectsMinAggregateInputType
    _max?: ProjectsMaxAggregateInputType
  }

  export type ProjectsGroupByOutputType = {
    id: bigint
    title: string
    description: string
    start_date: Date | null
    is_archived: boolean | null
    created_at: Date
    updated_at: Date
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  type GetProjectsGroupByPayload<T extends projectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
        }
      >
    >


  export type projectsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    is_archived?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_projects?: boolean | projects$user_projectsArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    is_archived?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    is_archived?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    is_archived?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type projectsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "start_date" | "is_archived" | "created_at" | "updated_at", ExtArgs["result"]["projects"]>
  export type projectsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_projects?: boolean | projects$user_projectsArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type projectsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type projectsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $projectsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "projects"
    objects: {
      user_projects: Prisma.$user_projectsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      title: string
      description: string
      start_date: Date | null
      is_archived: boolean | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["projects"]>
    composites: {}
  }

  type projectsGetPayload<S extends boolean | null | undefined | projectsDefaultArgs> = $Result.GetResult<Prisma.$projectsPayload, S>

  type projectsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectsCountAggregateInputType | true
    }

  export interface projectsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['projects'], meta: { name: 'projects' } }
    /**
     * Find zero or one Projects that matches the filter.
     * @param {projectsFindUniqueArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends projectsFindUniqueArgs>(args: SelectSubset<T, projectsFindUniqueArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {projectsFindUniqueOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends projectsFindUniqueOrThrowArgs>(args: SelectSubset<T, projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends projectsFindFirstArgs>(args?: SelectSubset<T, projectsFindFirstArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends projectsFindFirstOrThrowArgs>(args?: SelectSubset<T, projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.projects.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.projects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectsWithIdOnly = await prisma.projects.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends projectsFindManyArgs>(args?: SelectSubset<T, projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projects.
     * @param {projectsCreateArgs} args - Arguments to create a Projects.
     * @example
     * // Create one Projects
     * const Projects = await prisma.projects.create({
     *   data: {
     *     // ... data to create a Projects
     *   }
     * })
     * 
     */
    create<T extends projectsCreateArgs>(args: SelectSubset<T, projectsCreateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {projectsCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends projectsCreateManyArgs>(args?: SelectSubset<T, projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {projectsCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectsWithIdOnly = await prisma.projects.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends projectsCreateManyAndReturnArgs>(args?: SelectSubset<T, projectsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Projects.
     * @param {projectsDeleteArgs} args - Arguments to delete one Projects.
     * @example
     * // Delete one Projects
     * const Projects = await prisma.projects.delete({
     *   where: {
     *     // ... filter to delete one Projects
     *   }
     * })
     * 
     */
    delete<T extends projectsDeleteArgs>(args: SelectSubset<T, projectsDeleteArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projects.
     * @param {projectsUpdateArgs} args - Arguments to update one Projects.
     * @example
     * // Update one Projects
     * const projects = await prisma.projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends projectsUpdateArgs>(args: SelectSubset<T, projectsUpdateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {projectsDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends projectsDeleteManyArgs>(args?: SelectSubset<T, projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends projectsUpdateManyArgs>(args: SelectSubset<T, projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {projectsUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectsWithIdOnly = await prisma.projects.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends projectsUpdateManyAndReturnArgs>(args: SelectSubset<T, projectsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Projects.
     * @param {projectsUpsertArgs} args - Arguments to update or create a Projects.
     * @example
     * // Update or create a Projects
     * const projects = await prisma.projects.upsert({
     *   create: {
     *     // ... data to create a Projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projects we want to update
     *   }
     * })
     */
    upsert<T extends projectsUpsertArgs>(args: SelectSubset<T, projectsUpsertArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.projects.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends projectsCountArgs>(
      args?: Subset<T, projectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectsAggregateArgs>(args: Subset<T, ProjectsAggregateArgs>): Prisma.PrismaPromise<GetProjectsAggregateType<T>>

    /**
     * Group by Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends projectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: projectsGroupByArgs['orderBy'] }
        : { orderBy?: projectsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the projects model
   */
  readonly fields: projectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__projectsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_projects<T extends projects$user_projectsArgs<ExtArgs> = {}>(args?: Subset<T, projects$user_projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the projects model
   */
  interface projectsFieldRefs {
    readonly id: FieldRef<"projects", 'BigInt'>
    readonly title: FieldRef<"projects", 'String'>
    readonly description: FieldRef<"projects", 'String'>
    readonly start_date: FieldRef<"projects", 'DateTime'>
    readonly is_archived: FieldRef<"projects", 'Boolean'>
    readonly created_at: FieldRef<"projects", 'DateTime'>
    readonly updated_at: FieldRef<"projects", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * projects findUnique
   */
  export type projectsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findUniqueOrThrow
   */
  export type projectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findFirst
   */
  export type projectsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findFirstOrThrow
   */
  export type projectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findMany
   */
  export type projectsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects create
   */
  export type projectsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to create a projects.
     */
    data: XOR<projectsCreateInput, projectsUncheckedCreateInput>
  }

  /**
   * projects createMany
   */
  export type projectsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * projects createManyAndReturn
   */
  export type projectsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * projects update
   */
  export type projectsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to update a projects.
     */
    data: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
    /**
     * Choose, which projects to update.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects updateMany
   */
  export type projectsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * projects updateManyAndReturn
   */
  export type projectsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * projects upsert
   */
  export type projectsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The filter to search for the projects to update in case it exists.
     */
    where: projectsWhereUniqueInput
    /**
     * In case the projects found by the `where` argument doesn't exist, create a new projects with this data.
     */
    create: XOR<projectsCreateInput, projectsUncheckedCreateInput>
    /**
     * In case the projects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
  }

  /**
   * projects delete
   */
  export type projectsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter which projects to delete.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects deleteMany
   */
  export type projectsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to delete
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to delete.
     */
    limit?: number
  }

  /**
   * projects.user_projects
   */
  export type projects$user_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    where?: user_projectsWhereInput
    orderBy?: user_projectsOrderByWithRelationInput | user_projectsOrderByWithRelationInput[]
    cursor?: user_projectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_projectsScalarFieldEnum | User_projectsScalarFieldEnum[]
  }

  /**
   * projects without action
   */
  export type projectsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
  }


  /**
   * Model roles
   */

  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesAvgAggregateOutputType = {
    id: number | null
  }

  export type RolesSumAggregateOutputType = {
    id: bigint | null
  }

  export type RolesMinAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type RolesMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type RolesCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type RolesAvgAggregateInputType = {
    id?: true
  }

  export type RolesSumAggregateInputType = {
    id?: true
  }

  export type RolesMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type RolesMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type RolesCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type RolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which roles to aggregate.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }




  export type rolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rolesWhereInput
    orderBy?: rolesOrderByWithAggregationInput | rolesOrderByWithAggregationInput[]
    by: RolesScalarFieldEnum[] | RolesScalarFieldEnum
    having?: rolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _avg?: RolesAvgAggregateInputType
    _sum?: RolesSumAggregateInputType
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }

  export type RolesGroupByOutputType = {
    id: bigint
    name: string
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends rolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolesGroupByOutputType[P]>
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      >
    >


  export type rolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    users?: boolean | roles$usersArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type rolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["roles"]>
  export type rolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | roles$usersArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type rolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type rolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $rolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "roles"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
    }, ExtArgs["result"]["roles"]>
    composites: {}
  }

  type rolesGetPayload<S extends boolean | null | undefined | rolesDefaultArgs> = $Result.GetResult<Prisma.$rolesPayload, S>

  type rolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<rolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface rolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['roles'], meta: { name: 'roles' } }
    /**
     * Find zero or one Roles that matches the filter.
     * @param {rolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rolesFindUniqueArgs>(args: SelectSubset<T, rolesFindUniqueArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Roles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {rolesFindUniqueOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rolesFindUniqueOrThrowArgs>(args: SelectSubset<T, rolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rolesFindFirstArgs>(args?: SelectSubset<T, rolesFindFirstArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindFirstOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rolesFindFirstOrThrowArgs>(args?: SelectSubset<T, rolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolesWithIdOnly = await prisma.roles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends rolesFindManyArgs>(args?: SelectSubset<T, rolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Roles.
     * @param {rolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
     */
    create<T extends rolesCreateArgs>(args: SelectSubset<T, rolesCreateArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {rolesCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rolesCreateManyArgs>(args?: SelectSubset<T, rolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {rolesCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rolesCreateManyAndReturnArgs>(args?: SelectSubset<T, rolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Roles.
     * @param {rolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
     */
    delete<T extends rolesDeleteArgs>(args: SelectSubset<T, rolesDeleteArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Roles.
     * @param {rolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rolesUpdateArgs>(args: SelectSubset<T, rolesUpdateArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {rolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rolesDeleteManyArgs>(args?: SelectSubset<T, rolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rolesUpdateManyArgs>(args: SelectSubset<T, rolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {rolesUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends rolesUpdateManyAndReturnArgs>(args: SelectSubset<T, rolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Roles.
     * @param {rolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
     */
    upsert<T extends rolesUpsertArgs>(args: SelectSubset<T, rolesUpsertArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends rolesCountArgs>(
      args?: Subset<T, rolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rolesGroupByArgs['orderBy'] }
        : { orderBy?: rolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the roles model
   */
  readonly fields: rolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends roles$usersArgs<ExtArgs> = {}>(args?: Subset<T, roles$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the roles model
   */
  interface rolesFieldRefs {
    readonly id: FieldRef<"roles", 'BigInt'>
    readonly name: FieldRef<"roles", 'String'>
  }
    

  // Custom InputTypes
  /**
   * roles findUnique
   */
  export type rolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles findUniqueOrThrow
   */
  export type rolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles findFirst
   */
  export type rolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles findFirstOrThrow
   */
  export type rolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles findMany
   */
  export type rolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles create
   */
  export type rolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The data needed to create a roles.
     */
    data: XOR<rolesCreateInput, rolesUncheckedCreateInput>
  }

  /**
   * roles createMany
   */
  export type rolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many roles.
     */
    data: rolesCreateManyInput | rolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * roles createManyAndReturn
   */
  export type rolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * The data used to create many roles.
     */
    data: rolesCreateManyInput | rolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * roles update
   */
  export type rolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The data needed to update a roles.
     */
    data: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
    /**
     * Choose, which roles to update.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles updateMany
   */
  export type rolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update roles.
     */
    data: XOR<rolesUpdateManyMutationInput, rolesUncheckedUpdateManyInput>
    /**
     * Filter which roles to update
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to update.
     */
    limit?: number
  }

  /**
   * roles updateManyAndReturn
   */
  export type rolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * The data used to update roles.
     */
    data: XOR<rolesUpdateManyMutationInput, rolesUncheckedUpdateManyInput>
    /**
     * Filter which roles to update
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to update.
     */
    limit?: number
  }

  /**
   * roles upsert
   */
  export type rolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The filter to search for the roles to update in case it exists.
     */
    where: rolesWhereUniqueInput
    /**
     * In case the roles found by the `where` argument doesn't exist, create a new roles with this data.
     */
    create: XOR<rolesCreateInput, rolesUncheckedCreateInput>
    /**
     * In case the roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
  }

  /**
   * roles delete
   */
  export type rolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter which roles to delete.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles deleteMany
   */
  export type rolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which roles to delete
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to delete.
     */
    limit?: number
  }

  /**
   * roles.users
   */
  export type roles$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * roles without action
   */
  export type rolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
  }


  /**
   * Model skills
   */

  export type AggregateSkills = {
    _count: SkillsCountAggregateOutputType | null
    _avg: SkillsAvgAggregateOutputType | null
    _sum: SkillsSumAggregateOutputType | null
    _min: SkillsMinAggregateOutputType | null
    _max: SkillsMaxAggregateOutputType | null
  }

  export type SkillsAvgAggregateOutputType = {
    id: number | null
  }

  export type SkillsSumAggregateOutputType = {
    id: bigint | null
  }

  export type SkillsMinAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type SkillsMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type SkillsCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type SkillsAvgAggregateInputType = {
    id?: true
  }

  export type SkillsSumAggregateInputType = {
    id?: true
  }

  export type SkillsMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type SkillsMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type SkillsCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type SkillsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which skills to aggregate.
     */
    where?: skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillsOrderByWithRelationInput | skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned skills
    **/
    _count?: true | SkillsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkillsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkillsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillsMaxAggregateInputType
  }

  export type GetSkillsAggregateType<T extends SkillsAggregateArgs> = {
        [P in keyof T & keyof AggregateSkills]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkills[P]>
      : GetScalarType<T[P], AggregateSkills[P]>
  }




  export type skillsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: skillsWhereInput
    orderBy?: skillsOrderByWithAggregationInput | skillsOrderByWithAggregationInput[]
    by: SkillsScalarFieldEnum[] | SkillsScalarFieldEnum
    having?: skillsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillsCountAggregateInputType | true
    _avg?: SkillsAvgAggregateInputType
    _sum?: SkillsSumAggregateInputType
    _min?: SkillsMinAggregateInputType
    _max?: SkillsMaxAggregateInputType
  }

  export type SkillsGroupByOutputType = {
    id: bigint
    name: string
    _count: SkillsCountAggregateOutputType | null
    _avg: SkillsAvgAggregateOutputType | null
    _sum: SkillsSumAggregateOutputType | null
    _min: SkillsMinAggregateOutputType | null
    _max: SkillsMaxAggregateOutputType | null
  }

  type GetSkillsGroupByPayload<T extends skillsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillsGroupByOutputType[P]>
            : GetScalarType<T[P], SkillsGroupByOutputType[P]>
        }
      >
    >


  export type skillsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_skills?: boolean | skills$user_skillsArgs<ExtArgs>
    _count?: boolean | SkillsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skills"]>

  export type skillsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["skills"]>

  export type skillsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["skills"]>

  export type skillsSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type skillsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["skills"]>
  export type skillsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_skills?: boolean | skills$user_skillsArgs<ExtArgs>
    _count?: boolean | SkillsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type skillsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type skillsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $skillsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "skills"
    objects: {
      user_skills: Prisma.$user_skillsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
    }, ExtArgs["result"]["skills"]>
    composites: {}
  }

  type skillsGetPayload<S extends boolean | null | undefined | skillsDefaultArgs> = $Result.GetResult<Prisma.$skillsPayload, S>

  type skillsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<skillsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillsCountAggregateInputType | true
    }

  export interface skillsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['skills'], meta: { name: 'skills' } }
    /**
     * Find zero or one Skills that matches the filter.
     * @param {skillsFindUniqueArgs} args - Arguments to find a Skills
     * @example
     * // Get one Skills
     * const skills = await prisma.skills.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends skillsFindUniqueArgs>(args: SelectSubset<T, skillsFindUniqueArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Skills that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {skillsFindUniqueOrThrowArgs} args - Arguments to find a Skills
     * @example
     * // Get one Skills
     * const skills = await prisma.skills.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends skillsFindUniqueOrThrowArgs>(args: SelectSubset<T, skillsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillsFindFirstArgs} args - Arguments to find a Skills
     * @example
     * // Get one Skills
     * const skills = await prisma.skills.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends skillsFindFirstArgs>(args?: SelectSubset<T, skillsFindFirstArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skills that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillsFindFirstOrThrowArgs} args - Arguments to find a Skills
     * @example
     * // Get one Skills
     * const skills = await prisma.skills.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends skillsFindFirstOrThrowArgs>(args?: SelectSubset<T, skillsFindFirstOrThrowArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skills.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skills.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillsWithIdOnly = await prisma.skills.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends skillsFindManyArgs>(args?: SelectSubset<T, skillsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Skills.
     * @param {skillsCreateArgs} args - Arguments to create a Skills.
     * @example
     * // Create one Skills
     * const Skills = await prisma.skills.create({
     *   data: {
     *     // ... data to create a Skills
     *   }
     * })
     * 
     */
    create<T extends skillsCreateArgs>(args: SelectSubset<T, skillsCreateArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Skills.
     * @param {skillsCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skills = await prisma.skills.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends skillsCreateManyArgs>(args?: SelectSubset<T, skillsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Skills and returns the data saved in the database.
     * @param {skillsCreateManyAndReturnArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skills = await prisma.skills.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Skills and only return the `id`
     * const skillsWithIdOnly = await prisma.skills.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends skillsCreateManyAndReturnArgs>(args?: SelectSubset<T, skillsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Skills.
     * @param {skillsDeleteArgs} args - Arguments to delete one Skills.
     * @example
     * // Delete one Skills
     * const Skills = await prisma.skills.delete({
     *   where: {
     *     // ... filter to delete one Skills
     *   }
     * })
     * 
     */
    delete<T extends skillsDeleteArgs>(args: SelectSubset<T, skillsDeleteArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Skills.
     * @param {skillsUpdateArgs} args - Arguments to update one Skills.
     * @example
     * // Update one Skills
     * const skills = await prisma.skills.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends skillsUpdateArgs>(args: SelectSubset<T, skillsUpdateArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Skills.
     * @param {skillsDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skills.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends skillsDeleteManyArgs>(args?: SelectSubset<T, skillsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skills = await prisma.skills.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends skillsUpdateManyArgs>(args: SelectSubset<T, skillsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills and returns the data updated in the database.
     * @param {skillsUpdateManyAndReturnArgs} args - Arguments to update many Skills.
     * @example
     * // Update many Skills
     * const skills = await prisma.skills.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Skills and only return the `id`
     * const skillsWithIdOnly = await prisma.skills.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends skillsUpdateManyAndReturnArgs>(args: SelectSubset<T, skillsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Skills.
     * @param {skillsUpsertArgs} args - Arguments to update or create a Skills.
     * @example
     * // Update or create a Skills
     * const skills = await prisma.skills.upsert({
     *   create: {
     *     // ... data to create a Skills
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skills we want to update
     *   }
     * })
     */
    upsert<T extends skillsUpsertArgs>(args: SelectSubset<T, skillsUpsertArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillsCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skills.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends skillsCountArgs>(
      args?: Subset<T, skillsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillsAggregateArgs>(args: Subset<T, SkillsAggregateArgs>): Prisma.PrismaPromise<GetSkillsAggregateType<T>>

    /**
     * Group by Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends skillsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: skillsGroupByArgs['orderBy'] }
        : { orderBy?: skillsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, skillsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the skills model
   */
  readonly fields: skillsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for skills.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__skillsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_skills<T extends skills$user_skillsArgs<ExtArgs> = {}>(args?: Subset<T, skills$user_skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the skills model
   */
  interface skillsFieldRefs {
    readonly id: FieldRef<"skills", 'BigInt'>
    readonly name: FieldRef<"skills", 'String'>
  }
    

  // Custom InputTypes
  /**
   * skills findUnique
   */
  export type skillsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * Filter, which skills to fetch.
     */
    where: skillsWhereUniqueInput
  }

  /**
   * skills findUniqueOrThrow
   */
  export type skillsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * Filter, which skills to fetch.
     */
    where: skillsWhereUniqueInput
  }

  /**
   * skills findFirst
   */
  export type skillsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * Filter, which skills to fetch.
     */
    where?: skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillsOrderByWithRelationInput | skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for skills.
     */
    cursor?: skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of skills.
     */
    distinct?: SkillsScalarFieldEnum | SkillsScalarFieldEnum[]
  }

  /**
   * skills findFirstOrThrow
   */
  export type skillsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * Filter, which skills to fetch.
     */
    where?: skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillsOrderByWithRelationInput | skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for skills.
     */
    cursor?: skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of skills.
     */
    distinct?: SkillsScalarFieldEnum | SkillsScalarFieldEnum[]
  }

  /**
   * skills findMany
   */
  export type skillsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * Filter, which skills to fetch.
     */
    where?: skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillsOrderByWithRelationInput | skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing skills.
     */
    cursor?: skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    distinct?: SkillsScalarFieldEnum | SkillsScalarFieldEnum[]
  }

  /**
   * skills create
   */
  export type skillsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * The data needed to create a skills.
     */
    data: XOR<skillsCreateInput, skillsUncheckedCreateInput>
  }

  /**
   * skills createMany
   */
  export type skillsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many skills.
     */
    data: skillsCreateManyInput | skillsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * skills createManyAndReturn
   */
  export type skillsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * The data used to create many skills.
     */
    data: skillsCreateManyInput | skillsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * skills update
   */
  export type skillsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * The data needed to update a skills.
     */
    data: XOR<skillsUpdateInput, skillsUncheckedUpdateInput>
    /**
     * Choose, which skills to update.
     */
    where: skillsWhereUniqueInput
  }

  /**
   * skills updateMany
   */
  export type skillsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update skills.
     */
    data: XOR<skillsUpdateManyMutationInput, skillsUncheckedUpdateManyInput>
    /**
     * Filter which skills to update
     */
    where?: skillsWhereInput
    /**
     * Limit how many skills to update.
     */
    limit?: number
  }

  /**
   * skills updateManyAndReturn
   */
  export type skillsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * The data used to update skills.
     */
    data: XOR<skillsUpdateManyMutationInput, skillsUncheckedUpdateManyInput>
    /**
     * Filter which skills to update
     */
    where?: skillsWhereInput
    /**
     * Limit how many skills to update.
     */
    limit?: number
  }

  /**
   * skills upsert
   */
  export type skillsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * The filter to search for the skills to update in case it exists.
     */
    where: skillsWhereUniqueInput
    /**
     * In case the skills found by the `where` argument doesn't exist, create a new skills with this data.
     */
    create: XOR<skillsCreateInput, skillsUncheckedCreateInput>
    /**
     * In case the skills was found with the provided `where` argument, update it with this data.
     */
    update: XOR<skillsUpdateInput, skillsUncheckedUpdateInput>
  }

  /**
   * skills delete
   */
  export type skillsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    /**
     * Filter which skills to delete.
     */
    where: skillsWhereUniqueInput
  }

  /**
   * skills deleteMany
   */
  export type skillsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which skills to delete
     */
    where?: skillsWhereInput
    /**
     * Limit how many skills to delete.
     */
    limit?: number
  }

  /**
   * skills.user_skills
   */
  export type skills$user_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    where?: user_skillsWhereInput
    orderBy?: user_skillsOrderByWithRelationInput | user_skillsOrderByWithRelationInput[]
    cursor?: user_skillsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_skillsScalarFieldEnum | User_skillsScalarFieldEnum[]
  }

  /**
   * skills without action
   */
  export type skillsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
  }


  /**
   * Model user_platforms
   */

  export type AggregateUser_platforms = {
    _count: User_platformsCountAggregateOutputType | null
    _avg: User_platformsAvgAggregateOutputType | null
    _sum: User_platformsSumAggregateOutputType | null
    _min: User_platformsMinAggregateOutputType | null
    _max: User_platformsMaxAggregateOutputType | null
  }

  export type User_platformsAvgAggregateOutputType = {
    id: number | null
    platform_id: number | null
    user_id: number | null
  }

  export type User_platformsSumAggregateOutputType = {
    id: bigint | null
    platform_id: bigint | null
    user_id: bigint | null
  }

  export type User_platformsMinAggregateOutputType = {
    id: bigint | null
    link: string | null
    platform_id: bigint | null
    user_id: bigint | null
  }

  export type User_platformsMaxAggregateOutputType = {
    id: bigint | null
    link: string | null
    platform_id: bigint | null
    user_id: bigint | null
  }

  export type User_platformsCountAggregateOutputType = {
    id: number
    link: number
    platform_id: number
    user_id: number
    _all: number
  }


  export type User_platformsAvgAggregateInputType = {
    id?: true
    platform_id?: true
    user_id?: true
  }

  export type User_platformsSumAggregateInputType = {
    id?: true
    platform_id?: true
    user_id?: true
  }

  export type User_platformsMinAggregateInputType = {
    id?: true
    link?: true
    platform_id?: true
    user_id?: true
  }

  export type User_platformsMaxAggregateInputType = {
    id?: true
    link?: true
    platform_id?: true
    user_id?: true
  }

  export type User_platformsCountAggregateInputType = {
    id?: true
    link?: true
    platform_id?: true
    user_id?: true
    _all?: true
  }

  export type User_platformsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_platforms to aggregate.
     */
    where?: user_platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_platforms to fetch.
     */
    orderBy?: user_platformsOrderByWithRelationInput | user_platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_platforms
    **/
    _count?: true | User_platformsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_platformsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_platformsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_platformsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_platformsMaxAggregateInputType
  }

  export type GetUser_platformsAggregateType<T extends User_platformsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_platforms]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_platforms[P]>
      : GetScalarType<T[P], AggregateUser_platforms[P]>
  }




  export type user_platformsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_platformsWhereInput
    orderBy?: user_platformsOrderByWithAggregationInput | user_platformsOrderByWithAggregationInput[]
    by: User_platformsScalarFieldEnum[] | User_platformsScalarFieldEnum
    having?: user_platformsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_platformsCountAggregateInputType | true
    _avg?: User_platformsAvgAggregateInputType
    _sum?: User_platformsSumAggregateInputType
    _min?: User_platformsMinAggregateInputType
    _max?: User_platformsMaxAggregateInputType
  }

  export type User_platformsGroupByOutputType = {
    id: bigint
    link: string
    platform_id: bigint | null
    user_id: bigint | null
    _count: User_platformsCountAggregateOutputType | null
    _avg: User_platformsAvgAggregateOutputType | null
    _sum: User_platformsSumAggregateOutputType | null
    _min: User_platformsMinAggregateOutputType | null
    _max: User_platformsMaxAggregateOutputType | null
  }

  type GetUser_platformsGroupByPayload<T extends user_platformsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_platformsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_platformsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_platformsGroupByOutputType[P]>
            : GetScalarType<T[P], User_platformsGroupByOutputType[P]>
        }
      >
    >


  export type user_platformsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    link?: boolean
    platform_id?: boolean
    user_id?: boolean
    platforms?: boolean | user_platforms$platformsArgs<ExtArgs>
    users?: boolean | user_platforms$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_platforms"]>

  export type user_platformsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    link?: boolean
    platform_id?: boolean
    user_id?: boolean
    platforms?: boolean | user_platforms$platformsArgs<ExtArgs>
    users?: boolean | user_platforms$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_platforms"]>

  export type user_platformsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    link?: boolean
    platform_id?: boolean
    user_id?: boolean
    platforms?: boolean | user_platforms$platformsArgs<ExtArgs>
    users?: boolean | user_platforms$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_platforms"]>

  export type user_platformsSelectScalar = {
    id?: boolean
    link?: boolean
    platform_id?: boolean
    user_id?: boolean
  }

  export type user_platformsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "link" | "platform_id" | "user_id", ExtArgs["result"]["user_platforms"]>
  export type user_platformsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platforms?: boolean | user_platforms$platformsArgs<ExtArgs>
    users?: boolean | user_platforms$usersArgs<ExtArgs>
  }
  export type user_platformsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platforms?: boolean | user_platforms$platformsArgs<ExtArgs>
    users?: boolean | user_platforms$usersArgs<ExtArgs>
  }
  export type user_platformsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platforms?: boolean | user_platforms$platformsArgs<ExtArgs>
    users?: boolean | user_platforms$usersArgs<ExtArgs>
  }

  export type $user_platformsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_platforms"
    objects: {
      platforms: Prisma.$platformsPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      link: string
      platform_id: bigint | null
      user_id: bigint | null
    }, ExtArgs["result"]["user_platforms"]>
    composites: {}
  }

  type user_platformsGetPayload<S extends boolean | null | undefined | user_platformsDefaultArgs> = $Result.GetResult<Prisma.$user_platformsPayload, S>

  type user_platformsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_platformsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_platformsCountAggregateInputType | true
    }

  export interface user_platformsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_platforms'], meta: { name: 'user_platforms' } }
    /**
     * Find zero or one User_platforms that matches the filter.
     * @param {user_platformsFindUniqueArgs} args - Arguments to find a User_platforms
     * @example
     * // Get one User_platforms
     * const user_platforms = await prisma.user_platforms.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_platformsFindUniqueArgs>(args: SelectSubset<T, user_platformsFindUniqueArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_platforms that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_platformsFindUniqueOrThrowArgs} args - Arguments to find a User_platforms
     * @example
     * // Get one User_platforms
     * const user_platforms = await prisma.user_platforms.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_platformsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_platformsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_platforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_platformsFindFirstArgs} args - Arguments to find a User_platforms
     * @example
     * // Get one User_platforms
     * const user_platforms = await prisma.user_platforms.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_platformsFindFirstArgs>(args?: SelectSubset<T, user_platformsFindFirstArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_platforms that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_platformsFindFirstOrThrowArgs} args - Arguments to find a User_platforms
     * @example
     * // Get one User_platforms
     * const user_platforms = await prisma.user_platforms.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_platformsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_platformsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_platforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_platformsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_platforms
     * const user_platforms = await prisma.user_platforms.findMany()
     * 
     * // Get first 10 User_platforms
     * const user_platforms = await prisma.user_platforms.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_platformsWithIdOnly = await prisma.user_platforms.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_platformsFindManyArgs>(args?: SelectSubset<T, user_platformsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_platforms.
     * @param {user_platformsCreateArgs} args - Arguments to create a User_platforms.
     * @example
     * // Create one User_platforms
     * const User_platforms = await prisma.user_platforms.create({
     *   data: {
     *     // ... data to create a User_platforms
     *   }
     * })
     * 
     */
    create<T extends user_platformsCreateArgs>(args: SelectSubset<T, user_platformsCreateArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_platforms.
     * @param {user_platformsCreateManyArgs} args - Arguments to create many User_platforms.
     * @example
     * // Create many User_platforms
     * const user_platforms = await prisma.user_platforms.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_platformsCreateManyArgs>(args?: SelectSubset<T, user_platformsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_platforms and returns the data saved in the database.
     * @param {user_platformsCreateManyAndReturnArgs} args - Arguments to create many User_platforms.
     * @example
     * // Create many User_platforms
     * const user_platforms = await prisma.user_platforms.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_platforms and only return the `id`
     * const user_platformsWithIdOnly = await prisma.user_platforms.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_platformsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_platformsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_platforms.
     * @param {user_platformsDeleteArgs} args - Arguments to delete one User_platforms.
     * @example
     * // Delete one User_platforms
     * const User_platforms = await prisma.user_platforms.delete({
     *   where: {
     *     // ... filter to delete one User_platforms
     *   }
     * })
     * 
     */
    delete<T extends user_platformsDeleteArgs>(args: SelectSubset<T, user_platformsDeleteArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_platforms.
     * @param {user_platformsUpdateArgs} args - Arguments to update one User_platforms.
     * @example
     * // Update one User_platforms
     * const user_platforms = await prisma.user_platforms.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_platformsUpdateArgs>(args: SelectSubset<T, user_platformsUpdateArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_platforms.
     * @param {user_platformsDeleteManyArgs} args - Arguments to filter User_platforms to delete.
     * @example
     * // Delete a few User_platforms
     * const { count } = await prisma.user_platforms.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_platformsDeleteManyArgs>(args?: SelectSubset<T, user_platformsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_platformsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_platforms
     * const user_platforms = await prisma.user_platforms.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_platformsUpdateManyArgs>(args: SelectSubset<T, user_platformsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_platforms and returns the data updated in the database.
     * @param {user_platformsUpdateManyAndReturnArgs} args - Arguments to update many User_platforms.
     * @example
     * // Update many User_platforms
     * const user_platforms = await prisma.user_platforms.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_platforms and only return the `id`
     * const user_platformsWithIdOnly = await prisma.user_platforms.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_platformsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_platformsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_platforms.
     * @param {user_platformsUpsertArgs} args - Arguments to update or create a User_platforms.
     * @example
     * // Update or create a User_platforms
     * const user_platforms = await prisma.user_platforms.upsert({
     *   create: {
     *     // ... data to create a User_platforms
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_platforms we want to update
     *   }
     * })
     */
    upsert<T extends user_platformsUpsertArgs>(args: SelectSubset<T, user_platformsUpsertArgs<ExtArgs>>): Prisma__user_platformsClient<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_platformsCountArgs} args - Arguments to filter User_platforms to count.
     * @example
     * // Count the number of User_platforms
     * const count = await prisma.user_platforms.count({
     *   where: {
     *     // ... the filter for the User_platforms we want to count
     *   }
     * })
    **/
    count<T extends user_platformsCountArgs>(
      args?: Subset<T, user_platformsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_platformsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_platformsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_platformsAggregateArgs>(args: Subset<T, User_platformsAggregateArgs>): Prisma.PrismaPromise<GetUser_platformsAggregateType<T>>

    /**
     * Group by User_platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_platformsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_platformsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_platformsGroupByArgs['orderBy'] }
        : { orderBy?: user_platformsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_platformsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_platformsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_platforms model
   */
  readonly fields: user_platformsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_platforms.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_platformsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platforms<T extends user_platforms$platformsArgs<ExtArgs> = {}>(args?: Subset<T, user_platforms$platformsArgs<ExtArgs>>): Prisma__platformsClient<$Result.GetResult<Prisma.$platformsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends user_platforms$usersArgs<ExtArgs> = {}>(args?: Subset<T, user_platforms$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_platforms model
   */
  interface user_platformsFieldRefs {
    readonly id: FieldRef<"user_platforms", 'BigInt'>
    readonly link: FieldRef<"user_platforms", 'String'>
    readonly platform_id: FieldRef<"user_platforms", 'BigInt'>
    readonly user_id: FieldRef<"user_platforms", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * user_platforms findUnique
   */
  export type user_platformsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * Filter, which user_platforms to fetch.
     */
    where: user_platformsWhereUniqueInput
  }

  /**
   * user_platforms findUniqueOrThrow
   */
  export type user_platformsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * Filter, which user_platforms to fetch.
     */
    where: user_platformsWhereUniqueInput
  }

  /**
   * user_platforms findFirst
   */
  export type user_platformsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * Filter, which user_platforms to fetch.
     */
    where?: user_platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_platforms to fetch.
     */
    orderBy?: user_platformsOrderByWithRelationInput | user_platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_platforms.
     */
    cursor?: user_platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_platforms.
     */
    distinct?: User_platformsScalarFieldEnum | User_platformsScalarFieldEnum[]
  }

  /**
   * user_platforms findFirstOrThrow
   */
  export type user_platformsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * Filter, which user_platforms to fetch.
     */
    where?: user_platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_platforms to fetch.
     */
    orderBy?: user_platformsOrderByWithRelationInput | user_platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_platforms.
     */
    cursor?: user_platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_platforms.
     */
    distinct?: User_platformsScalarFieldEnum | User_platformsScalarFieldEnum[]
  }

  /**
   * user_platforms findMany
   */
  export type user_platformsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * Filter, which user_platforms to fetch.
     */
    where?: user_platformsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_platforms to fetch.
     */
    orderBy?: user_platformsOrderByWithRelationInput | user_platformsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_platforms.
     */
    cursor?: user_platformsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_platforms.
     */
    skip?: number
    distinct?: User_platformsScalarFieldEnum | User_platformsScalarFieldEnum[]
  }

  /**
   * user_platforms create
   */
  export type user_platformsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_platforms.
     */
    data: XOR<user_platformsCreateInput, user_platformsUncheckedCreateInput>
  }

  /**
   * user_platforms createMany
   */
  export type user_platformsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_platforms.
     */
    data: user_platformsCreateManyInput | user_platformsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_platforms createManyAndReturn
   */
  export type user_platformsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * The data used to create many user_platforms.
     */
    data: user_platformsCreateManyInput | user_platformsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_platforms update
   */
  export type user_platformsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_platforms.
     */
    data: XOR<user_platformsUpdateInput, user_platformsUncheckedUpdateInput>
    /**
     * Choose, which user_platforms to update.
     */
    where: user_platformsWhereUniqueInput
  }

  /**
   * user_platforms updateMany
   */
  export type user_platformsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_platforms.
     */
    data: XOR<user_platformsUpdateManyMutationInput, user_platformsUncheckedUpdateManyInput>
    /**
     * Filter which user_platforms to update
     */
    where?: user_platformsWhereInput
    /**
     * Limit how many user_platforms to update.
     */
    limit?: number
  }

  /**
   * user_platforms updateManyAndReturn
   */
  export type user_platformsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * The data used to update user_platforms.
     */
    data: XOR<user_platformsUpdateManyMutationInput, user_platformsUncheckedUpdateManyInput>
    /**
     * Filter which user_platforms to update
     */
    where?: user_platformsWhereInput
    /**
     * Limit how many user_platforms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_platforms upsert
   */
  export type user_platformsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_platforms to update in case it exists.
     */
    where: user_platformsWhereUniqueInput
    /**
     * In case the user_platforms found by the `where` argument doesn't exist, create a new user_platforms with this data.
     */
    create: XOR<user_platformsCreateInput, user_platformsUncheckedCreateInput>
    /**
     * In case the user_platforms was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_platformsUpdateInput, user_platformsUncheckedUpdateInput>
  }

  /**
   * user_platforms delete
   */
  export type user_platformsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    /**
     * Filter which user_platforms to delete.
     */
    where: user_platformsWhereUniqueInput
  }

  /**
   * user_platforms deleteMany
   */
  export type user_platformsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_platforms to delete
     */
    where?: user_platformsWhereInput
    /**
     * Limit how many user_platforms to delete.
     */
    limit?: number
  }

  /**
   * user_platforms.platforms
   */
  export type user_platforms$platformsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the platforms
     */
    select?: platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the platforms
     */
    omit?: platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: platformsInclude<ExtArgs> | null
    where?: platformsWhereInput
  }

  /**
   * user_platforms.users
   */
  export type user_platforms$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * user_platforms without action
   */
  export type user_platformsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
  }


  /**
   * Model user_projects
   */

  export type AggregateUser_projects = {
    _count: User_projectsCountAggregateOutputType | null
    _avg: User_projectsAvgAggregateOutputType | null
    _sum: User_projectsSumAggregateOutputType | null
    _min: User_projectsMinAggregateOutputType | null
    _max: User_projectsMaxAggregateOutputType | null
  }

  export type User_projectsAvgAggregateOutputType = {
    id: number | null
    project_id: number | null
    user_id: number | null
  }

  export type User_projectsSumAggregateOutputType = {
    id: bigint | null
    project_id: bigint | null
    user_id: bigint | null
  }

  export type User_projectsMinAggregateOutputType = {
    id: bigint | null
    project_id: bigint | null
    user_id: bigint | null
    is_active: boolean | null
    project_role: string | null
  }

  export type User_projectsMaxAggregateOutputType = {
    id: bigint | null
    project_id: bigint | null
    user_id: bigint | null
    is_active: boolean | null
    project_role: string | null
  }

  export type User_projectsCountAggregateOutputType = {
    id: number
    project_id: number
    user_id: number
    is_active: number
    project_role: number
    _all: number
  }


  export type User_projectsAvgAggregateInputType = {
    id?: true
    project_id?: true
    user_id?: true
  }

  export type User_projectsSumAggregateInputType = {
    id?: true
    project_id?: true
    user_id?: true
  }

  export type User_projectsMinAggregateInputType = {
    id?: true
    project_id?: true
    user_id?: true
    is_active?: true
    project_role?: true
  }

  export type User_projectsMaxAggregateInputType = {
    id?: true
    project_id?: true
    user_id?: true
    is_active?: true
    project_role?: true
  }

  export type User_projectsCountAggregateInputType = {
    id?: true
    project_id?: true
    user_id?: true
    is_active?: true
    project_role?: true
    _all?: true
  }

  export type User_projectsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_projects to aggregate.
     */
    where?: user_projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_projects to fetch.
     */
    orderBy?: user_projectsOrderByWithRelationInput | user_projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_projects
    **/
    _count?: true | User_projectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_projectsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_projectsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_projectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_projectsMaxAggregateInputType
  }

  export type GetUser_projectsAggregateType<T extends User_projectsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_projects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_projects[P]>
      : GetScalarType<T[P], AggregateUser_projects[P]>
  }




  export type user_projectsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_projectsWhereInput
    orderBy?: user_projectsOrderByWithAggregationInput | user_projectsOrderByWithAggregationInput[]
    by: User_projectsScalarFieldEnum[] | User_projectsScalarFieldEnum
    having?: user_projectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_projectsCountAggregateInputType | true
    _avg?: User_projectsAvgAggregateInputType
    _sum?: User_projectsSumAggregateInputType
    _min?: User_projectsMinAggregateInputType
    _max?: User_projectsMaxAggregateInputType
  }

  export type User_projectsGroupByOutputType = {
    id: bigint
    project_id: bigint | null
    user_id: bigint | null
    is_active: boolean | null
    project_role: string | null
    _count: User_projectsCountAggregateOutputType | null
    _avg: User_projectsAvgAggregateOutputType | null
    _sum: User_projectsSumAggregateOutputType | null
    _min: User_projectsMinAggregateOutputType | null
    _max: User_projectsMaxAggregateOutputType | null
  }

  type GetUser_projectsGroupByPayload<T extends user_projectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_projectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_projectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_projectsGroupByOutputType[P]>
            : GetScalarType<T[P], User_projectsGroupByOutputType[P]>
        }
      >
    >


  export type user_projectsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    user_id?: boolean
    is_active?: boolean
    project_role?: boolean
    projects?: boolean | user_projects$projectsArgs<ExtArgs>
    users?: boolean | user_projects$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_projects"]>

  export type user_projectsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    user_id?: boolean
    is_active?: boolean
    project_role?: boolean
    projects?: boolean | user_projects$projectsArgs<ExtArgs>
    users?: boolean | user_projects$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_projects"]>

  export type user_projectsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    user_id?: boolean
    is_active?: boolean
    project_role?: boolean
    projects?: boolean | user_projects$projectsArgs<ExtArgs>
    users?: boolean | user_projects$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_projects"]>

  export type user_projectsSelectScalar = {
    id?: boolean
    project_id?: boolean
    user_id?: boolean
    is_active?: boolean
    project_role?: boolean
  }

  export type user_projectsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_id" | "user_id" | "is_active" | "project_role", ExtArgs["result"]["user_projects"]>
  export type user_projectsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | user_projects$projectsArgs<ExtArgs>
    users?: boolean | user_projects$usersArgs<ExtArgs>
  }
  export type user_projectsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | user_projects$projectsArgs<ExtArgs>
    users?: boolean | user_projects$usersArgs<ExtArgs>
  }
  export type user_projectsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | user_projects$projectsArgs<ExtArgs>
    users?: boolean | user_projects$usersArgs<ExtArgs>
  }

  export type $user_projectsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_projects"
    objects: {
      projects: Prisma.$projectsPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      project_id: bigint | null
      user_id: bigint | null
      is_active: boolean | null
      project_role: string | null
    }, ExtArgs["result"]["user_projects"]>
    composites: {}
  }

  type user_projectsGetPayload<S extends boolean | null | undefined | user_projectsDefaultArgs> = $Result.GetResult<Prisma.$user_projectsPayload, S>

  type user_projectsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_projectsCountAggregateInputType | true
    }

  export interface user_projectsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_projects'], meta: { name: 'user_projects' } }
    /**
     * Find zero or one User_projects that matches the filter.
     * @param {user_projectsFindUniqueArgs} args - Arguments to find a User_projects
     * @example
     * // Get one User_projects
     * const user_projects = await prisma.user_projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_projectsFindUniqueArgs>(args: SelectSubset<T, user_projectsFindUniqueArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_projects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_projectsFindUniqueOrThrowArgs} args - Arguments to find a User_projects
     * @example
     * // Get one User_projects
     * const user_projects = await prisma.user_projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_projectsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_projectsFindFirstArgs} args - Arguments to find a User_projects
     * @example
     * // Get one User_projects
     * const user_projects = await prisma.user_projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_projectsFindFirstArgs>(args?: SelectSubset<T, user_projectsFindFirstArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_projects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_projectsFindFirstOrThrowArgs} args - Arguments to find a User_projects
     * @example
     * // Get one User_projects
     * const user_projects = await prisma.user_projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_projectsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_projectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_projects
     * const user_projects = await prisma.user_projects.findMany()
     * 
     * // Get first 10 User_projects
     * const user_projects = await prisma.user_projects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_projectsWithIdOnly = await prisma.user_projects.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_projectsFindManyArgs>(args?: SelectSubset<T, user_projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_projects.
     * @param {user_projectsCreateArgs} args - Arguments to create a User_projects.
     * @example
     * // Create one User_projects
     * const User_projects = await prisma.user_projects.create({
     *   data: {
     *     // ... data to create a User_projects
     *   }
     * })
     * 
     */
    create<T extends user_projectsCreateArgs>(args: SelectSubset<T, user_projectsCreateArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_projects.
     * @param {user_projectsCreateManyArgs} args - Arguments to create many User_projects.
     * @example
     * // Create many User_projects
     * const user_projects = await prisma.user_projects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_projectsCreateManyArgs>(args?: SelectSubset<T, user_projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_projects and returns the data saved in the database.
     * @param {user_projectsCreateManyAndReturnArgs} args - Arguments to create many User_projects.
     * @example
     * // Create many User_projects
     * const user_projects = await prisma.user_projects.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_projects and only return the `id`
     * const user_projectsWithIdOnly = await prisma.user_projects.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_projectsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_projectsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_projects.
     * @param {user_projectsDeleteArgs} args - Arguments to delete one User_projects.
     * @example
     * // Delete one User_projects
     * const User_projects = await prisma.user_projects.delete({
     *   where: {
     *     // ... filter to delete one User_projects
     *   }
     * })
     * 
     */
    delete<T extends user_projectsDeleteArgs>(args: SelectSubset<T, user_projectsDeleteArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_projects.
     * @param {user_projectsUpdateArgs} args - Arguments to update one User_projects.
     * @example
     * // Update one User_projects
     * const user_projects = await prisma.user_projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_projectsUpdateArgs>(args: SelectSubset<T, user_projectsUpdateArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_projects.
     * @param {user_projectsDeleteManyArgs} args - Arguments to filter User_projects to delete.
     * @example
     * // Delete a few User_projects
     * const { count } = await prisma.user_projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_projectsDeleteManyArgs>(args?: SelectSubset<T, user_projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_projectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_projects
     * const user_projects = await prisma.user_projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_projectsUpdateManyArgs>(args: SelectSubset<T, user_projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_projects and returns the data updated in the database.
     * @param {user_projectsUpdateManyAndReturnArgs} args - Arguments to update many User_projects.
     * @example
     * // Update many User_projects
     * const user_projects = await prisma.user_projects.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_projects and only return the `id`
     * const user_projectsWithIdOnly = await prisma.user_projects.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_projectsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_projectsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_projects.
     * @param {user_projectsUpsertArgs} args - Arguments to update or create a User_projects.
     * @example
     * // Update or create a User_projects
     * const user_projects = await prisma.user_projects.upsert({
     *   create: {
     *     // ... data to create a User_projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_projects we want to update
     *   }
     * })
     */
    upsert<T extends user_projectsUpsertArgs>(args: SelectSubset<T, user_projectsUpsertArgs<ExtArgs>>): Prisma__user_projectsClient<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_projectsCountArgs} args - Arguments to filter User_projects to count.
     * @example
     * // Count the number of User_projects
     * const count = await prisma.user_projects.count({
     *   where: {
     *     // ... the filter for the User_projects we want to count
     *   }
     * })
    **/
    count<T extends user_projectsCountArgs>(
      args?: Subset<T, user_projectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_projectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_projectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_projectsAggregateArgs>(args: Subset<T, User_projectsAggregateArgs>): Prisma.PrismaPromise<GetUser_projectsAggregateType<T>>

    /**
     * Group by User_projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_projectsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_projectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_projectsGroupByArgs['orderBy'] }
        : { orderBy?: user_projectsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_projectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_projects model
   */
  readonly fields: user_projectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_projectsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends user_projects$projectsArgs<ExtArgs> = {}>(args?: Subset<T, user_projects$projectsArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends user_projects$usersArgs<ExtArgs> = {}>(args?: Subset<T, user_projects$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_projects model
   */
  interface user_projectsFieldRefs {
    readonly id: FieldRef<"user_projects", 'BigInt'>
    readonly project_id: FieldRef<"user_projects", 'BigInt'>
    readonly user_id: FieldRef<"user_projects", 'BigInt'>
    readonly is_active: FieldRef<"user_projects", 'Boolean'>
    readonly project_role: FieldRef<"user_projects", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user_projects findUnique
   */
  export type user_projectsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * Filter, which user_projects to fetch.
     */
    where: user_projectsWhereUniqueInput
  }

  /**
   * user_projects findUniqueOrThrow
   */
  export type user_projectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * Filter, which user_projects to fetch.
     */
    where: user_projectsWhereUniqueInput
  }

  /**
   * user_projects findFirst
   */
  export type user_projectsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * Filter, which user_projects to fetch.
     */
    where?: user_projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_projects to fetch.
     */
    orderBy?: user_projectsOrderByWithRelationInput | user_projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_projects.
     */
    cursor?: user_projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_projects.
     */
    distinct?: User_projectsScalarFieldEnum | User_projectsScalarFieldEnum[]
  }

  /**
   * user_projects findFirstOrThrow
   */
  export type user_projectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * Filter, which user_projects to fetch.
     */
    where?: user_projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_projects to fetch.
     */
    orderBy?: user_projectsOrderByWithRelationInput | user_projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_projects.
     */
    cursor?: user_projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_projects.
     */
    distinct?: User_projectsScalarFieldEnum | User_projectsScalarFieldEnum[]
  }

  /**
   * user_projects findMany
   */
  export type user_projectsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * Filter, which user_projects to fetch.
     */
    where?: user_projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_projects to fetch.
     */
    orderBy?: user_projectsOrderByWithRelationInput | user_projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_projects.
     */
    cursor?: user_projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_projects.
     */
    skip?: number
    distinct?: User_projectsScalarFieldEnum | User_projectsScalarFieldEnum[]
  }

  /**
   * user_projects create
   */
  export type user_projectsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_projects.
     */
    data?: XOR<user_projectsCreateInput, user_projectsUncheckedCreateInput>
  }

  /**
   * user_projects createMany
   */
  export type user_projectsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_projects.
     */
    data: user_projectsCreateManyInput | user_projectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_projects createManyAndReturn
   */
  export type user_projectsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * The data used to create many user_projects.
     */
    data: user_projectsCreateManyInput | user_projectsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_projects update
   */
  export type user_projectsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_projects.
     */
    data: XOR<user_projectsUpdateInput, user_projectsUncheckedUpdateInput>
    /**
     * Choose, which user_projects to update.
     */
    where: user_projectsWhereUniqueInput
  }

  /**
   * user_projects updateMany
   */
  export type user_projectsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_projects.
     */
    data: XOR<user_projectsUpdateManyMutationInput, user_projectsUncheckedUpdateManyInput>
    /**
     * Filter which user_projects to update
     */
    where?: user_projectsWhereInput
    /**
     * Limit how many user_projects to update.
     */
    limit?: number
  }

  /**
   * user_projects updateManyAndReturn
   */
  export type user_projectsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * The data used to update user_projects.
     */
    data: XOR<user_projectsUpdateManyMutationInput, user_projectsUncheckedUpdateManyInput>
    /**
     * Filter which user_projects to update
     */
    where?: user_projectsWhereInput
    /**
     * Limit how many user_projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_projects upsert
   */
  export type user_projectsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_projects to update in case it exists.
     */
    where: user_projectsWhereUniqueInput
    /**
     * In case the user_projects found by the `where` argument doesn't exist, create a new user_projects with this data.
     */
    create: XOR<user_projectsCreateInput, user_projectsUncheckedCreateInput>
    /**
     * In case the user_projects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_projectsUpdateInput, user_projectsUncheckedUpdateInput>
  }

  /**
   * user_projects delete
   */
  export type user_projectsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    /**
     * Filter which user_projects to delete.
     */
    where: user_projectsWhereUniqueInput
  }

  /**
   * user_projects deleteMany
   */
  export type user_projectsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_projects to delete
     */
    where?: user_projectsWhereInput
    /**
     * Limit how many user_projects to delete.
     */
    limit?: number
  }

  /**
   * user_projects.projects
   */
  export type user_projects$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
  }

  /**
   * user_projects.users
   */
  export type user_projects$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * user_projects without action
   */
  export type user_projectsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
  }


  /**
   * Model user_skills
   */

  export type AggregateUser_skills = {
    _count: User_skillsCountAggregateOutputType | null
    _avg: User_skillsAvgAggregateOutputType | null
    _sum: User_skillsSumAggregateOutputType | null
    _min: User_skillsMinAggregateOutputType | null
    _max: User_skillsMaxAggregateOutputType | null
  }

  export type User_skillsAvgAggregateOutputType = {
    id: number | null
    skill_id: number | null
    user_id: number | null
  }

  export type User_skillsSumAggregateOutputType = {
    id: bigint | null
    skill_id: bigint | null
    user_id: bigint | null
  }

  export type User_skillsMinAggregateOutputType = {
    id: bigint | null
    skill_id: bigint | null
    user_id: bigint | null
  }

  export type User_skillsMaxAggregateOutputType = {
    id: bigint | null
    skill_id: bigint | null
    user_id: bigint | null
  }

  export type User_skillsCountAggregateOutputType = {
    id: number
    skill_id: number
    user_id: number
    _all: number
  }


  export type User_skillsAvgAggregateInputType = {
    id?: true
    skill_id?: true
    user_id?: true
  }

  export type User_skillsSumAggregateInputType = {
    id?: true
    skill_id?: true
    user_id?: true
  }

  export type User_skillsMinAggregateInputType = {
    id?: true
    skill_id?: true
    user_id?: true
  }

  export type User_skillsMaxAggregateInputType = {
    id?: true
    skill_id?: true
    user_id?: true
  }

  export type User_skillsCountAggregateInputType = {
    id?: true
    skill_id?: true
    user_id?: true
    _all?: true
  }

  export type User_skillsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_skills to aggregate.
     */
    where?: user_skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_skills to fetch.
     */
    orderBy?: user_skillsOrderByWithRelationInput | user_skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_skills
    **/
    _count?: true | User_skillsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_skillsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_skillsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_skillsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_skillsMaxAggregateInputType
  }

  export type GetUser_skillsAggregateType<T extends User_skillsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_skills]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_skills[P]>
      : GetScalarType<T[P], AggregateUser_skills[P]>
  }




  export type user_skillsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_skillsWhereInput
    orderBy?: user_skillsOrderByWithAggregationInput | user_skillsOrderByWithAggregationInput[]
    by: User_skillsScalarFieldEnum[] | User_skillsScalarFieldEnum
    having?: user_skillsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_skillsCountAggregateInputType | true
    _avg?: User_skillsAvgAggregateInputType
    _sum?: User_skillsSumAggregateInputType
    _min?: User_skillsMinAggregateInputType
    _max?: User_skillsMaxAggregateInputType
  }

  export type User_skillsGroupByOutputType = {
    id: bigint
    skill_id: bigint | null
    user_id: bigint | null
    _count: User_skillsCountAggregateOutputType | null
    _avg: User_skillsAvgAggregateOutputType | null
    _sum: User_skillsSumAggregateOutputType | null
    _min: User_skillsMinAggregateOutputType | null
    _max: User_skillsMaxAggregateOutputType | null
  }

  type GetUser_skillsGroupByPayload<T extends user_skillsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_skillsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_skillsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_skillsGroupByOutputType[P]>
            : GetScalarType<T[P], User_skillsGroupByOutputType[P]>
        }
      >
    >


  export type user_skillsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skill_id?: boolean
    user_id?: boolean
    skills?: boolean | user_skills$skillsArgs<ExtArgs>
    users?: boolean | user_skills$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_skills"]>

  export type user_skillsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skill_id?: boolean
    user_id?: boolean
    skills?: boolean | user_skills$skillsArgs<ExtArgs>
    users?: boolean | user_skills$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_skills"]>

  export type user_skillsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skill_id?: boolean
    user_id?: boolean
    skills?: boolean | user_skills$skillsArgs<ExtArgs>
    users?: boolean | user_skills$usersArgs<ExtArgs>
  }, ExtArgs["result"]["user_skills"]>

  export type user_skillsSelectScalar = {
    id?: boolean
    skill_id?: boolean
    user_id?: boolean
  }

  export type user_skillsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "skill_id" | "user_id", ExtArgs["result"]["user_skills"]>
  export type user_skillsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | user_skills$skillsArgs<ExtArgs>
    users?: boolean | user_skills$usersArgs<ExtArgs>
  }
  export type user_skillsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | user_skills$skillsArgs<ExtArgs>
    users?: boolean | user_skills$usersArgs<ExtArgs>
  }
  export type user_skillsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | user_skills$skillsArgs<ExtArgs>
    users?: boolean | user_skills$usersArgs<ExtArgs>
  }

  export type $user_skillsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_skills"
    objects: {
      skills: Prisma.$skillsPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      skill_id: bigint | null
      user_id: bigint | null
    }, ExtArgs["result"]["user_skills"]>
    composites: {}
  }

  type user_skillsGetPayload<S extends boolean | null | undefined | user_skillsDefaultArgs> = $Result.GetResult<Prisma.$user_skillsPayload, S>

  type user_skillsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_skillsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_skillsCountAggregateInputType | true
    }

  export interface user_skillsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_skills'], meta: { name: 'user_skills' } }
    /**
     * Find zero or one User_skills that matches the filter.
     * @param {user_skillsFindUniqueArgs} args - Arguments to find a User_skills
     * @example
     * // Get one User_skills
     * const user_skills = await prisma.user_skills.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_skillsFindUniqueArgs>(args: SelectSubset<T, user_skillsFindUniqueArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_skills that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_skillsFindUniqueOrThrowArgs} args - Arguments to find a User_skills
     * @example
     * // Get one User_skills
     * const user_skills = await prisma.user_skills.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_skillsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_skillsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_skillsFindFirstArgs} args - Arguments to find a User_skills
     * @example
     * // Get one User_skills
     * const user_skills = await prisma.user_skills.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_skillsFindFirstArgs>(args?: SelectSubset<T, user_skillsFindFirstArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_skills that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_skillsFindFirstOrThrowArgs} args - Arguments to find a User_skills
     * @example
     * // Get one User_skills
     * const user_skills = await prisma.user_skills.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_skillsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_skillsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_skillsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_skills
     * const user_skills = await prisma.user_skills.findMany()
     * 
     * // Get first 10 User_skills
     * const user_skills = await prisma.user_skills.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_skillsWithIdOnly = await prisma.user_skills.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_skillsFindManyArgs>(args?: SelectSubset<T, user_skillsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_skills.
     * @param {user_skillsCreateArgs} args - Arguments to create a User_skills.
     * @example
     * // Create one User_skills
     * const User_skills = await prisma.user_skills.create({
     *   data: {
     *     // ... data to create a User_skills
     *   }
     * })
     * 
     */
    create<T extends user_skillsCreateArgs>(args: SelectSubset<T, user_skillsCreateArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_skills.
     * @param {user_skillsCreateManyArgs} args - Arguments to create many User_skills.
     * @example
     * // Create many User_skills
     * const user_skills = await prisma.user_skills.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_skillsCreateManyArgs>(args?: SelectSubset<T, user_skillsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_skills and returns the data saved in the database.
     * @param {user_skillsCreateManyAndReturnArgs} args - Arguments to create many User_skills.
     * @example
     * // Create many User_skills
     * const user_skills = await prisma.user_skills.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_skills and only return the `id`
     * const user_skillsWithIdOnly = await prisma.user_skills.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_skillsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_skillsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_skills.
     * @param {user_skillsDeleteArgs} args - Arguments to delete one User_skills.
     * @example
     * // Delete one User_skills
     * const User_skills = await prisma.user_skills.delete({
     *   where: {
     *     // ... filter to delete one User_skills
     *   }
     * })
     * 
     */
    delete<T extends user_skillsDeleteArgs>(args: SelectSubset<T, user_skillsDeleteArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_skills.
     * @param {user_skillsUpdateArgs} args - Arguments to update one User_skills.
     * @example
     * // Update one User_skills
     * const user_skills = await prisma.user_skills.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_skillsUpdateArgs>(args: SelectSubset<T, user_skillsUpdateArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_skills.
     * @param {user_skillsDeleteManyArgs} args - Arguments to filter User_skills to delete.
     * @example
     * // Delete a few User_skills
     * const { count } = await prisma.user_skills.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_skillsDeleteManyArgs>(args?: SelectSubset<T, user_skillsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_skillsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_skills
     * const user_skills = await prisma.user_skills.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_skillsUpdateManyArgs>(args: SelectSubset<T, user_skillsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_skills and returns the data updated in the database.
     * @param {user_skillsUpdateManyAndReturnArgs} args - Arguments to update many User_skills.
     * @example
     * // Update many User_skills
     * const user_skills = await prisma.user_skills.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_skills and only return the `id`
     * const user_skillsWithIdOnly = await prisma.user_skills.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_skillsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_skillsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_skills.
     * @param {user_skillsUpsertArgs} args - Arguments to update or create a User_skills.
     * @example
     * // Update or create a User_skills
     * const user_skills = await prisma.user_skills.upsert({
     *   create: {
     *     // ... data to create a User_skills
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_skills we want to update
     *   }
     * })
     */
    upsert<T extends user_skillsUpsertArgs>(args: SelectSubset<T, user_skillsUpsertArgs<ExtArgs>>): Prisma__user_skillsClient<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_skillsCountArgs} args - Arguments to filter User_skills to count.
     * @example
     * // Count the number of User_skills
     * const count = await prisma.user_skills.count({
     *   where: {
     *     // ... the filter for the User_skills we want to count
     *   }
     * })
    **/
    count<T extends user_skillsCountArgs>(
      args?: Subset<T, user_skillsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_skillsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_skillsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_skillsAggregateArgs>(args: Subset<T, User_skillsAggregateArgs>): Prisma.PrismaPromise<GetUser_skillsAggregateType<T>>

    /**
     * Group by User_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_skillsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_skillsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_skillsGroupByArgs['orderBy'] }
        : { orderBy?: user_skillsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_skillsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_skillsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_skills model
   */
  readonly fields: user_skillsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_skills.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_skillsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    skills<T extends user_skills$skillsArgs<ExtArgs> = {}>(args?: Subset<T, user_skills$skillsArgs<ExtArgs>>): Prisma__skillsClient<$Result.GetResult<Prisma.$skillsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends user_skills$usersArgs<ExtArgs> = {}>(args?: Subset<T, user_skills$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_skills model
   */
  interface user_skillsFieldRefs {
    readonly id: FieldRef<"user_skills", 'BigInt'>
    readonly skill_id: FieldRef<"user_skills", 'BigInt'>
    readonly user_id: FieldRef<"user_skills", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * user_skills findUnique
   */
  export type user_skillsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * Filter, which user_skills to fetch.
     */
    where: user_skillsWhereUniqueInput
  }

  /**
   * user_skills findUniqueOrThrow
   */
  export type user_skillsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * Filter, which user_skills to fetch.
     */
    where: user_skillsWhereUniqueInput
  }

  /**
   * user_skills findFirst
   */
  export type user_skillsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * Filter, which user_skills to fetch.
     */
    where?: user_skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_skills to fetch.
     */
    orderBy?: user_skillsOrderByWithRelationInput | user_skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_skills.
     */
    cursor?: user_skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_skills.
     */
    distinct?: User_skillsScalarFieldEnum | User_skillsScalarFieldEnum[]
  }

  /**
   * user_skills findFirstOrThrow
   */
  export type user_skillsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * Filter, which user_skills to fetch.
     */
    where?: user_skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_skills to fetch.
     */
    orderBy?: user_skillsOrderByWithRelationInput | user_skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_skills.
     */
    cursor?: user_skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_skills.
     */
    distinct?: User_skillsScalarFieldEnum | User_skillsScalarFieldEnum[]
  }

  /**
   * user_skills findMany
   */
  export type user_skillsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * Filter, which user_skills to fetch.
     */
    where?: user_skillsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_skills to fetch.
     */
    orderBy?: user_skillsOrderByWithRelationInput | user_skillsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_skills.
     */
    cursor?: user_skillsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_skills.
     */
    skip?: number
    distinct?: User_skillsScalarFieldEnum | User_skillsScalarFieldEnum[]
  }

  /**
   * user_skills create
   */
  export type user_skillsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_skills.
     */
    data?: XOR<user_skillsCreateInput, user_skillsUncheckedCreateInput>
  }

  /**
   * user_skills createMany
   */
  export type user_skillsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_skills.
     */
    data: user_skillsCreateManyInput | user_skillsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_skills createManyAndReturn
   */
  export type user_skillsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * The data used to create many user_skills.
     */
    data: user_skillsCreateManyInput | user_skillsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_skills update
   */
  export type user_skillsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_skills.
     */
    data: XOR<user_skillsUpdateInput, user_skillsUncheckedUpdateInput>
    /**
     * Choose, which user_skills to update.
     */
    where: user_skillsWhereUniqueInput
  }

  /**
   * user_skills updateMany
   */
  export type user_skillsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_skills.
     */
    data: XOR<user_skillsUpdateManyMutationInput, user_skillsUncheckedUpdateManyInput>
    /**
     * Filter which user_skills to update
     */
    where?: user_skillsWhereInput
    /**
     * Limit how many user_skills to update.
     */
    limit?: number
  }

  /**
   * user_skills updateManyAndReturn
   */
  export type user_skillsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * The data used to update user_skills.
     */
    data: XOR<user_skillsUpdateManyMutationInput, user_skillsUncheckedUpdateManyInput>
    /**
     * Filter which user_skills to update
     */
    where?: user_skillsWhereInput
    /**
     * Limit how many user_skills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_skills upsert
   */
  export type user_skillsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_skills to update in case it exists.
     */
    where: user_skillsWhereUniqueInput
    /**
     * In case the user_skills found by the `where` argument doesn't exist, create a new user_skills with this data.
     */
    create: XOR<user_skillsCreateInput, user_skillsUncheckedCreateInput>
    /**
     * In case the user_skills was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_skillsUpdateInput, user_skillsUncheckedUpdateInput>
  }

  /**
   * user_skills delete
   */
  export type user_skillsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    /**
     * Filter which user_skills to delete.
     */
    where: user_skillsWhereUniqueInput
  }

  /**
   * user_skills deleteMany
   */
  export type user_skillsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_skills to delete
     */
    where?: user_skillsWhereInput
    /**
     * Limit how many user_skills to delete.
     */
    limit?: number
  }

  /**
   * user_skills.skills
   */
  export type user_skills$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skills
     */
    select?: skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the skills
     */
    omit?: skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillsInclude<ExtArgs> | null
    where?: skillsWhereInput
  }

  /**
   * user_skills.users
   */
  export type user_skills$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * user_skills without action
   */
  export type user_skillsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
    role_id: number | null
    semester: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: bigint | null
    role_id: bigint | null
    semester: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: bigint | null
    email: string | null
    password: string | null
    name: string | null
    last_name: string | null
    personal_email: string | null
    is_active: boolean | null
    role_id: bigint | null
    motivation: string | null
    semester: number | null
  }

  export type UsersMaxAggregateOutputType = {
    id: bigint | null
    email: string | null
    password: string | null
    name: string | null
    last_name: string | null
    personal_email: string | null
    is_active: boolean | null
    role_id: bigint | null
    motivation: string | null
    semester: number | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    last_name: number
    personal_email: number
    is_active: number
    role_id: number
    motivation: number
    semester: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
    role_id?: true
    semester?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
    role_id?: true
    semester?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    last_name?: true
    personal_email?: true
    is_active?: true
    role_id?: true
    motivation?: true
    semester?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    last_name?: true
    personal_email?: true
    is_active?: true
    role_id?: true
    motivation?: true
    semester?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    last_name?: true
    personal_email?: true
    is_active?: true
    role_id?: true
    motivation?: true
    semester?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: bigint
    email: string
    password: string
    name: string
    last_name: string
    personal_email: string | null
    is_active: boolean
    role_id: bigint
    motivation: string
    semester: number
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    last_name?: boolean
    personal_email?: boolean
    is_active?: boolean
    role_id?: boolean
    motivation?: boolean
    semester?: boolean
    attendances?: boolean | users$attendancesArgs<ExtArgs>
    user_platforms?: boolean | users$user_platformsArgs<ExtArgs>
    user_projects?: boolean | users$user_projectsArgs<ExtArgs>
    user_skills?: boolean | users$user_skillsArgs<ExtArgs>
    roles?: boolean | rolesDefaultArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    last_name?: boolean
    personal_email?: boolean
    is_active?: boolean
    role_id?: boolean
    motivation?: boolean
    semester?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    last_name?: boolean
    personal_email?: boolean
    is_active?: boolean
    role_id?: boolean
    motivation?: boolean
    semester?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    last_name?: boolean
    personal_email?: boolean
    is_active?: boolean
    role_id?: boolean
    motivation?: boolean
    semester?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "last_name" | "personal_email" | "is_active" | "role_id" | "motivation" | "semester", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendances?: boolean | users$attendancesArgs<ExtArgs>
    user_platforms?: boolean | users$user_platformsArgs<ExtArgs>
    user_projects?: boolean | users$user_projectsArgs<ExtArgs>
    user_skills?: boolean | users$user_skillsArgs<ExtArgs>
    roles?: boolean | rolesDefaultArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      attendances: Prisma.$attendancesPayload<ExtArgs>[]
      user_platforms: Prisma.$user_platformsPayload<ExtArgs>[]
      user_projects: Prisma.$user_projectsPayload<ExtArgs>[]
      user_skills: Prisma.$user_skillsPayload<ExtArgs>[]
      roles: Prisma.$rolesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      email: string
      password: string
      name: string
      last_name: string
      personal_email: string | null
      is_active: boolean
      role_id: bigint
      motivation: string
      semester: number
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendances<T extends users$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, users$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_platforms<T extends users$user_platformsArgs<ExtArgs> = {}>(args?: Subset<T, users$user_platformsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_platformsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_projects<T extends users$user_projectsArgs<ExtArgs> = {}>(args?: Subset<T, users$user_projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_skills<T extends users$user_skillsArgs<ExtArgs> = {}>(args?: Subset<T, users$user_skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_skillsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roles<T extends rolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, rolesDefaultArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'BigInt'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly personal_email: FieldRef<"users", 'String'>
    readonly is_active: FieldRef<"users", 'Boolean'>
    readonly role_id: FieldRef<"users", 'BigInt'>
    readonly motivation: FieldRef<"users", 'String'>
    readonly semester: FieldRef<"users", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.attendances
   */
  export type users$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendances
     */
    select?: attendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendances
     */
    omit?: attendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancesInclude<ExtArgs> | null
    where?: attendancesWhereInput
    orderBy?: attendancesOrderByWithRelationInput | attendancesOrderByWithRelationInput[]
    cursor?: attendancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * users.user_platforms
   */
  export type users$user_platformsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_platforms
     */
    select?: user_platformsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_platforms
     */
    omit?: user_platformsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_platformsInclude<ExtArgs> | null
    where?: user_platformsWhereInput
    orderBy?: user_platformsOrderByWithRelationInput | user_platformsOrderByWithRelationInput[]
    cursor?: user_platformsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_platformsScalarFieldEnum | User_platformsScalarFieldEnum[]
  }

  /**
   * users.user_projects
   */
  export type users$user_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_projects
     */
    select?: user_projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_projects
     */
    omit?: user_projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_projectsInclude<ExtArgs> | null
    where?: user_projectsWhereInput
    orderBy?: user_projectsOrderByWithRelationInput | user_projectsOrderByWithRelationInput[]
    cursor?: user_projectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_projectsScalarFieldEnum | User_projectsScalarFieldEnum[]
  }

  /**
   * users.user_skills
   */
  export type users$user_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_skills
     */
    select?: user_skillsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_skills
     */
    omit?: user_skillsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_skillsInclude<ExtArgs> | null
    where?: user_skillsWhereInput
    orderBy?: user_skillsOrderByWithRelationInput | user_skillsOrderByWithRelationInput[]
    cursor?: user_skillsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_skillsScalarFieldEnum | User_skillsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AttendancesScalarFieldEnum: {
    id: 'id',
    attendance_date: 'attendance_date',
    user_id: 'user_id'
  };

  export type AttendancesScalarFieldEnum = (typeof AttendancesScalarFieldEnum)[keyof typeof AttendancesScalarFieldEnum]


  export const PlatformsScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type PlatformsScalarFieldEnum = (typeof PlatformsScalarFieldEnum)[keyof typeof PlatformsScalarFieldEnum]


  export const ProjectsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    start_date: 'start_date',
    is_archived: 'is_archived',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProjectsScalarFieldEnum = (typeof ProjectsScalarFieldEnum)[keyof typeof ProjectsScalarFieldEnum]


  export const RolesScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const SkillsScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type SkillsScalarFieldEnum = (typeof SkillsScalarFieldEnum)[keyof typeof SkillsScalarFieldEnum]


  export const User_platformsScalarFieldEnum: {
    id: 'id',
    link: 'link',
    platform_id: 'platform_id',
    user_id: 'user_id'
  };

  export type User_platformsScalarFieldEnum = (typeof User_platformsScalarFieldEnum)[keyof typeof User_platformsScalarFieldEnum]


  export const User_projectsScalarFieldEnum: {
    id: 'id',
    project_id: 'project_id',
    user_id: 'user_id',
    is_active: 'is_active',
    project_role: 'project_role'
  };

  export type User_projectsScalarFieldEnum = (typeof User_projectsScalarFieldEnum)[keyof typeof User_projectsScalarFieldEnum]


  export const User_skillsScalarFieldEnum: {
    id: 'id',
    skill_id: 'skill_id',
    user_id: 'user_id'
  };

  export type User_skillsScalarFieldEnum = (typeof User_skillsScalarFieldEnum)[keyof typeof User_skillsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    last_name: 'last_name',
    personal_email: 'personal_email',
    is_active: 'is_active',
    role_id: 'role_id',
    motivation: 'motivation',
    semester: 'semester'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type attendancesWhereInput = {
    AND?: attendancesWhereInput | attendancesWhereInput[]
    OR?: attendancesWhereInput[]
    NOT?: attendancesWhereInput | attendancesWhereInput[]
    id?: BigIntFilter<"attendances"> | bigint | number
    attendance_date?: DateTimeFilter<"attendances"> | Date | string
    user_id?: BigIntNullableFilter<"attendances"> | bigint | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type attendancesOrderByWithRelationInput = {
    id?: SortOrder
    attendance_date?: SortOrder
    user_id?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type attendancesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: attendancesWhereInput | attendancesWhereInput[]
    OR?: attendancesWhereInput[]
    NOT?: attendancesWhereInput | attendancesWhereInput[]
    attendance_date?: DateTimeFilter<"attendances"> | Date | string
    user_id?: BigIntNullableFilter<"attendances"> | bigint | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type attendancesOrderByWithAggregationInput = {
    id?: SortOrder
    attendance_date?: SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: attendancesCountOrderByAggregateInput
    _avg?: attendancesAvgOrderByAggregateInput
    _max?: attendancesMaxOrderByAggregateInput
    _min?: attendancesMinOrderByAggregateInput
    _sum?: attendancesSumOrderByAggregateInput
  }

  export type attendancesScalarWhereWithAggregatesInput = {
    AND?: attendancesScalarWhereWithAggregatesInput | attendancesScalarWhereWithAggregatesInput[]
    OR?: attendancesScalarWhereWithAggregatesInput[]
    NOT?: attendancesScalarWhereWithAggregatesInput | attendancesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"attendances"> | bigint | number
    attendance_date?: DateTimeWithAggregatesFilter<"attendances"> | Date | string
    user_id?: BigIntNullableWithAggregatesFilter<"attendances"> | bigint | number | null
  }

  export type platformsWhereInput = {
    AND?: platformsWhereInput | platformsWhereInput[]
    OR?: platformsWhereInput[]
    NOT?: platformsWhereInput | platformsWhereInput[]
    id?: BigIntFilter<"platforms"> | bigint | number
    name?: StringFilter<"platforms"> | string
    user_platforms?: User_platformsListRelationFilter
  }

  export type platformsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    user_platforms?: user_platformsOrderByRelationAggregateInput
  }

  export type platformsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: platformsWhereInput | platformsWhereInput[]
    OR?: platformsWhereInput[]
    NOT?: platformsWhereInput | platformsWhereInput[]
    name?: StringFilter<"platforms"> | string
    user_platforms?: User_platformsListRelationFilter
  }, "id">

  export type platformsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: platformsCountOrderByAggregateInput
    _avg?: platformsAvgOrderByAggregateInput
    _max?: platformsMaxOrderByAggregateInput
    _min?: platformsMinOrderByAggregateInput
    _sum?: platformsSumOrderByAggregateInput
  }

  export type platformsScalarWhereWithAggregatesInput = {
    AND?: platformsScalarWhereWithAggregatesInput | platformsScalarWhereWithAggregatesInput[]
    OR?: platformsScalarWhereWithAggregatesInput[]
    NOT?: platformsScalarWhereWithAggregatesInput | platformsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"platforms"> | bigint | number
    name?: StringWithAggregatesFilter<"platforms"> | string
  }

  export type projectsWhereInput = {
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    id?: BigIntFilter<"projects"> | bigint | number
    title?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
    start_date?: DateTimeNullableFilter<"projects"> | Date | string | null
    is_archived?: BoolNullableFilter<"projects"> | boolean | null
    created_at?: DateTimeFilter<"projects"> | Date | string
    updated_at?: DateTimeFilter<"projects"> | Date | string
    user_projects?: User_projectsListRelationFilter
  }

  export type projectsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrderInput | SortOrder
    is_archived?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_projects?: user_projectsOrderByRelationAggregateInput
  }

  export type projectsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    title?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
    start_date?: DateTimeNullableFilter<"projects"> | Date | string | null
    is_archived?: BoolNullableFilter<"projects"> | boolean | null
    created_at?: DateTimeFilter<"projects"> | Date | string
    updated_at?: DateTimeFilter<"projects"> | Date | string
    user_projects?: User_projectsListRelationFilter
  }, "id">

  export type projectsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrderInput | SortOrder
    is_archived?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: projectsCountOrderByAggregateInput
    _avg?: projectsAvgOrderByAggregateInput
    _max?: projectsMaxOrderByAggregateInput
    _min?: projectsMinOrderByAggregateInput
    _sum?: projectsSumOrderByAggregateInput
  }

  export type projectsScalarWhereWithAggregatesInput = {
    AND?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    OR?: projectsScalarWhereWithAggregatesInput[]
    NOT?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"projects"> | bigint | number
    title?: StringWithAggregatesFilter<"projects"> | string
    description?: StringWithAggregatesFilter<"projects"> | string
    start_date?: DateTimeNullableWithAggregatesFilter<"projects"> | Date | string | null
    is_archived?: BoolNullableWithAggregatesFilter<"projects"> | boolean | null
    created_at?: DateTimeWithAggregatesFilter<"projects"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"projects"> | Date | string
  }

  export type rolesWhereInput = {
    AND?: rolesWhereInput | rolesWhereInput[]
    OR?: rolesWhereInput[]
    NOT?: rolesWhereInput | rolesWhereInput[]
    id?: BigIntFilter<"roles"> | bigint | number
    name?: StringFilter<"roles"> | string
    users?: UsersListRelationFilter
  }

  export type rolesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    users?: usersOrderByRelationAggregateInput
  }

  export type rolesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    name?: string
    AND?: rolesWhereInput | rolesWhereInput[]
    OR?: rolesWhereInput[]
    NOT?: rolesWhereInput | rolesWhereInput[]
    users?: UsersListRelationFilter
  }, "id" | "name">

  export type rolesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: rolesCountOrderByAggregateInput
    _avg?: rolesAvgOrderByAggregateInput
    _max?: rolesMaxOrderByAggregateInput
    _min?: rolesMinOrderByAggregateInput
    _sum?: rolesSumOrderByAggregateInput
  }

  export type rolesScalarWhereWithAggregatesInput = {
    AND?: rolesScalarWhereWithAggregatesInput | rolesScalarWhereWithAggregatesInput[]
    OR?: rolesScalarWhereWithAggregatesInput[]
    NOT?: rolesScalarWhereWithAggregatesInput | rolesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"roles"> | bigint | number
    name?: StringWithAggregatesFilter<"roles"> | string
  }

  export type skillsWhereInput = {
    AND?: skillsWhereInput | skillsWhereInput[]
    OR?: skillsWhereInput[]
    NOT?: skillsWhereInput | skillsWhereInput[]
    id?: BigIntFilter<"skills"> | bigint | number
    name?: StringFilter<"skills"> | string
    user_skills?: User_skillsListRelationFilter
  }

  export type skillsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    user_skills?: user_skillsOrderByRelationAggregateInput
  }

  export type skillsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    name?: string
    AND?: skillsWhereInput | skillsWhereInput[]
    OR?: skillsWhereInput[]
    NOT?: skillsWhereInput | skillsWhereInput[]
    user_skills?: User_skillsListRelationFilter
  }, "id" | "name">

  export type skillsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: skillsCountOrderByAggregateInput
    _avg?: skillsAvgOrderByAggregateInput
    _max?: skillsMaxOrderByAggregateInput
    _min?: skillsMinOrderByAggregateInput
    _sum?: skillsSumOrderByAggregateInput
  }

  export type skillsScalarWhereWithAggregatesInput = {
    AND?: skillsScalarWhereWithAggregatesInput | skillsScalarWhereWithAggregatesInput[]
    OR?: skillsScalarWhereWithAggregatesInput[]
    NOT?: skillsScalarWhereWithAggregatesInput | skillsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"skills"> | bigint | number
    name?: StringWithAggregatesFilter<"skills"> | string
  }

  export type user_platformsWhereInput = {
    AND?: user_platformsWhereInput | user_platformsWhereInput[]
    OR?: user_platformsWhereInput[]
    NOT?: user_platformsWhereInput | user_platformsWhereInput[]
    id?: BigIntFilter<"user_platforms"> | bigint | number
    link?: StringFilter<"user_platforms"> | string
    platform_id?: BigIntNullableFilter<"user_platforms"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_platforms"> | bigint | number | null
    platforms?: XOR<PlatformsNullableScalarRelationFilter, platformsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type user_platformsOrderByWithRelationInput = {
    id?: SortOrder
    link?: SortOrder
    platform_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    platforms?: platformsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type user_platformsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: user_platformsWhereInput | user_platformsWhereInput[]
    OR?: user_platformsWhereInput[]
    NOT?: user_platformsWhereInput | user_platformsWhereInput[]
    link?: StringFilter<"user_platforms"> | string
    platform_id?: BigIntNullableFilter<"user_platforms"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_platforms"> | bigint | number | null
    platforms?: XOR<PlatformsNullableScalarRelationFilter, platformsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type user_platformsOrderByWithAggregationInput = {
    id?: SortOrder
    link?: SortOrder
    platform_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: user_platformsCountOrderByAggregateInput
    _avg?: user_platformsAvgOrderByAggregateInput
    _max?: user_platformsMaxOrderByAggregateInput
    _min?: user_platformsMinOrderByAggregateInput
    _sum?: user_platformsSumOrderByAggregateInput
  }

  export type user_platformsScalarWhereWithAggregatesInput = {
    AND?: user_platformsScalarWhereWithAggregatesInput | user_platformsScalarWhereWithAggregatesInput[]
    OR?: user_platformsScalarWhereWithAggregatesInput[]
    NOT?: user_platformsScalarWhereWithAggregatesInput | user_platformsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"user_platforms"> | bigint | number
    link?: StringWithAggregatesFilter<"user_platforms"> | string
    platform_id?: BigIntNullableWithAggregatesFilter<"user_platforms"> | bigint | number | null
    user_id?: BigIntNullableWithAggregatesFilter<"user_platforms"> | bigint | number | null
  }

  export type user_projectsWhereInput = {
    AND?: user_projectsWhereInput | user_projectsWhereInput[]
    OR?: user_projectsWhereInput[]
    NOT?: user_projectsWhereInput | user_projectsWhereInput[]
    id?: BigIntFilter<"user_projects"> | bigint | number
    project_id?: BigIntNullableFilter<"user_projects"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_projects"> | bigint | number | null
    is_active?: BoolNullableFilter<"user_projects"> | boolean | null
    project_role?: StringNullableFilter<"user_projects"> | string | null
    projects?: XOR<ProjectsNullableScalarRelationFilter, projectsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type user_projectsOrderByWithRelationInput = {
    id?: SortOrder
    project_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    project_role?: SortOrderInput | SortOrder
    projects?: projectsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type user_projectsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: user_projectsWhereInput | user_projectsWhereInput[]
    OR?: user_projectsWhereInput[]
    NOT?: user_projectsWhereInput | user_projectsWhereInput[]
    project_id?: BigIntNullableFilter<"user_projects"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_projects"> | bigint | number | null
    is_active?: BoolNullableFilter<"user_projects"> | boolean | null
    project_role?: StringNullableFilter<"user_projects"> | string | null
    projects?: XOR<ProjectsNullableScalarRelationFilter, projectsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type user_projectsOrderByWithAggregationInput = {
    id?: SortOrder
    project_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    project_role?: SortOrderInput | SortOrder
    _count?: user_projectsCountOrderByAggregateInput
    _avg?: user_projectsAvgOrderByAggregateInput
    _max?: user_projectsMaxOrderByAggregateInput
    _min?: user_projectsMinOrderByAggregateInput
    _sum?: user_projectsSumOrderByAggregateInput
  }

  export type user_projectsScalarWhereWithAggregatesInput = {
    AND?: user_projectsScalarWhereWithAggregatesInput | user_projectsScalarWhereWithAggregatesInput[]
    OR?: user_projectsScalarWhereWithAggregatesInput[]
    NOT?: user_projectsScalarWhereWithAggregatesInput | user_projectsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"user_projects"> | bigint | number
    project_id?: BigIntNullableWithAggregatesFilter<"user_projects"> | bigint | number | null
    user_id?: BigIntNullableWithAggregatesFilter<"user_projects"> | bigint | number | null
    is_active?: BoolNullableWithAggregatesFilter<"user_projects"> | boolean | null
    project_role?: StringNullableWithAggregatesFilter<"user_projects"> | string | null
  }

  export type user_skillsWhereInput = {
    AND?: user_skillsWhereInput | user_skillsWhereInput[]
    OR?: user_skillsWhereInput[]
    NOT?: user_skillsWhereInput | user_skillsWhereInput[]
    id?: BigIntFilter<"user_skills"> | bigint | number
    skill_id?: BigIntNullableFilter<"user_skills"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_skills"> | bigint | number | null
    skills?: XOR<SkillsNullableScalarRelationFilter, skillsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type user_skillsOrderByWithRelationInput = {
    id?: SortOrder
    skill_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    skills?: skillsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type user_skillsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: user_skillsWhereInput | user_skillsWhereInput[]
    OR?: user_skillsWhereInput[]
    NOT?: user_skillsWhereInput | user_skillsWhereInput[]
    skill_id?: BigIntNullableFilter<"user_skills"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_skills"> | bigint | number | null
    skills?: XOR<SkillsNullableScalarRelationFilter, skillsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type user_skillsOrderByWithAggregationInput = {
    id?: SortOrder
    skill_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: user_skillsCountOrderByAggregateInput
    _avg?: user_skillsAvgOrderByAggregateInput
    _max?: user_skillsMaxOrderByAggregateInput
    _min?: user_skillsMinOrderByAggregateInput
    _sum?: user_skillsSumOrderByAggregateInput
  }

  export type user_skillsScalarWhereWithAggregatesInput = {
    AND?: user_skillsScalarWhereWithAggregatesInput | user_skillsScalarWhereWithAggregatesInput[]
    OR?: user_skillsScalarWhereWithAggregatesInput[]
    NOT?: user_skillsScalarWhereWithAggregatesInput | user_skillsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"user_skills"> | bigint | number
    skill_id?: BigIntNullableWithAggregatesFilter<"user_skills"> | bigint | number | null
    user_id?: BigIntNullableWithAggregatesFilter<"user_skills"> | bigint | number | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: BigIntFilter<"users"> | bigint | number
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    personal_email?: StringNullableFilter<"users"> | string | null
    is_active?: BoolFilter<"users"> | boolean
    role_id?: BigIntFilter<"users"> | bigint | number
    motivation?: StringFilter<"users"> | string
    semester?: IntFilter<"users"> | number
    attendances?: AttendancesListRelationFilter
    user_platforms?: User_platformsListRelationFilter
    user_projects?: User_projectsListRelationFilter
    user_skills?: User_skillsListRelationFilter
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    personal_email?: SortOrderInput | SortOrder
    is_active?: SortOrder
    role_id?: SortOrder
    motivation?: SortOrder
    semester?: SortOrder
    attendances?: attendancesOrderByRelationAggregateInput
    user_platforms?: user_platformsOrderByRelationAggregateInput
    user_projects?: user_projectsOrderByRelationAggregateInput
    user_skills?: user_skillsOrderByRelationAggregateInput
    roles?: rolesOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    personal_email?: StringNullableFilter<"users"> | string | null
    is_active?: BoolFilter<"users"> | boolean
    role_id?: BigIntFilter<"users"> | bigint | number
    motivation?: StringFilter<"users"> | string
    semester?: IntFilter<"users"> | number
    attendances?: AttendancesListRelationFilter
    user_platforms?: User_platformsListRelationFilter
    user_projects?: User_projectsListRelationFilter
    user_skills?: User_skillsListRelationFilter
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    personal_email?: SortOrderInput | SortOrder
    is_active?: SortOrder
    role_id?: SortOrder
    motivation?: SortOrder
    semester?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"users"> | bigint | number
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    name?: StringWithAggregatesFilter<"users"> | string
    last_name?: StringWithAggregatesFilter<"users"> | string
    personal_email?: StringNullableWithAggregatesFilter<"users"> | string | null
    is_active?: BoolWithAggregatesFilter<"users"> | boolean
    role_id?: BigIntWithAggregatesFilter<"users"> | bigint | number
    motivation?: StringWithAggregatesFilter<"users"> | string
    semester?: IntWithAggregatesFilter<"users"> | number
  }

  export type attendancesCreateInput = {
    id?: bigint | number
    attendance_date: Date | string
    users?: usersCreateNestedOneWithoutAttendancesInput
  }

  export type attendancesUncheckedCreateInput = {
    id?: bigint | number
    attendance_date: Date | string
    user_id?: bigint | number | null
  }

  export type attendancesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    attendance_date?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneWithoutAttendancesNestedInput
  }

  export type attendancesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    attendance_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type attendancesCreateManyInput = {
    id?: bigint | number
    attendance_date: Date | string
    user_id?: bigint | number | null
  }

  export type attendancesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    attendance_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendancesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    attendance_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type platformsCreateInput = {
    id?: bigint | number
    name: string
    user_platforms?: user_platformsCreateNestedManyWithoutPlatformsInput
  }

  export type platformsUncheckedCreateInput = {
    id?: bigint | number
    name: string
    user_platforms?: user_platformsUncheckedCreateNestedManyWithoutPlatformsInput
  }

  export type platformsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    user_platforms?: user_platformsUpdateManyWithoutPlatformsNestedInput
  }

  export type platformsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    user_platforms?: user_platformsUncheckedUpdateManyWithoutPlatformsNestedInput
  }

  export type platformsCreateManyInput = {
    id?: bigint | number
    name: string
  }

  export type platformsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type platformsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type projectsCreateInput = {
    id?: bigint | number
    title: string
    description: string
    start_date?: Date | string | null
    is_archived?: boolean | null
    created_at?: Date | string
    updated_at?: Date | string
    user_projects?: user_projectsCreateNestedManyWithoutProjectsInput
  }

  export type projectsUncheckedCreateInput = {
    id?: bigint | number
    title: string
    description: string
    start_date?: Date | string | null
    is_archived?: boolean | null
    created_at?: Date | string
    updated_at?: Date | string
    user_projects?: user_projectsUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type projectsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_archived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_projects?: user_projectsUpdateManyWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_archived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_projects?: user_projectsUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type projectsCreateManyInput = {
    id?: bigint | number
    title: string
    description: string
    start_date?: Date | string | null
    is_archived?: boolean | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type projectsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_archived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_archived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type rolesCreateInput = {
    id?: bigint | number
    name: string
    users?: usersCreateNestedManyWithoutRolesInput
  }

  export type rolesUncheckedCreateInput = {
    id?: bigint | number
    name: string
    users?: usersUncheckedCreateNestedManyWithoutRolesInput
  }

  export type rolesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    users?: usersUpdateManyWithoutRolesNestedInput
  }

  export type rolesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    users?: usersUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type rolesCreateManyInput = {
    id?: bigint | number
    name: string
  }

  export type rolesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type rolesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type skillsCreateInput = {
    id?: bigint | number
    name: string
    user_skills?: user_skillsCreateNestedManyWithoutSkillsInput
  }

  export type skillsUncheckedCreateInput = {
    id?: bigint | number
    name: string
    user_skills?: user_skillsUncheckedCreateNestedManyWithoutSkillsInput
  }

  export type skillsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    user_skills?: user_skillsUpdateManyWithoutSkillsNestedInput
  }

  export type skillsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    user_skills?: user_skillsUncheckedUpdateManyWithoutSkillsNestedInput
  }

  export type skillsCreateManyInput = {
    id?: bigint | number
    name: string
  }

  export type skillsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type skillsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type user_platformsCreateInput = {
    id?: bigint | number
    link: string
    platforms?: platformsCreateNestedOneWithoutUser_platformsInput
    users?: usersCreateNestedOneWithoutUser_platformsInput
  }

  export type user_platformsUncheckedCreateInput = {
    id?: bigint | number
    link: string
    platform_id?: bigint | number | null
    user_id?: bigint | number | null
  }

  export type user_platformsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    platforms?: platformsUpdateOneWithoutUser_platformsNestedInput
    users?: usersUpdateOneWithoutUser_platformsNestedInput
  }

  export type user_platformsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    platform_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_platformsCreateManyInput = {
    id?: bigint | number
    link: string
    platform_id?: bigint | number | null
    user_id?: bigint | number | null
  }

  export type user_platformsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
  }

  export type user_platformsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    platform_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_projectsCreateInput = {
    id?: bigint | number
    is_active?: boolean | null
    project_role?: string | null
    projects?: projectsCreateNestedOneWithoutUser_projectsInput
    users?: usersCreateNestedOneWithoutUser_projectsInput
  }

  export type user_projectsUncheckedCreateInput = {
    id?: bigint | number
    project_id?: bigint | number | null
    user_id?: bigint | number | null
    is_active?: boolean | null
    project_role?: string | null
  }

  export type user_projectsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: projectsUpdateOneWithoutUser_projectsNestedInput
    users?: usersUpdateOneWithoutUser_projectsNestedInput
  }

  export type user_projectsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_projectsCreateManyInput = {
    id?: bigint | number
    project_id?: bigint | number | null
    user_id?: bigint | number | null
    is_active?: boolean | null
    project_role?: string | null
  }

  export type user_projectsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_projectsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_skillsCreateInput = {
    id?: bigint | number
    skills?: skillsCreateNestedOneWithoutUser_skillsInput
    users?: usersCreateNestedOneWithoutUser_skillsInput
  }

  export type user_skillsUncheckedCreateInput = {
    id?: bigint | number
    skill_id?: bigint | number | null
    user_id?: bigint | number | null
  }

  export type user_skillsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    skills?: skillsUpdateOneWithoutUser_skillsNestedInput
    users?: usersUpdateOneWithoutUser_skillsNestedInput
  }

  export type user_skillsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    skill_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_skillsCreateManyInput = {
    id?: bigint | number
    skill_id?: bigint | number | null
    user_id?: bigint | number | null
  }

  export type user_skillsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type user_skillsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    skill_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type usersCreateInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
    attendances?: attendancesCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    role_id: bigint | number
    motivation: string
    semester: number
    attendances?: attendancesUncheckedCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsUncheckedCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsUncheckedCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUncheckedUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUncheckedUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUncheckedUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    role_id: bigint | number
    motivation: string
    semester: number
  }

  export type usersUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
  }

  export type usersUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type attendancesCountOrderByAggregateInput = {
    id?: SortOrder
    attendance_date?: SortOrder
    user_id?: SortOrder
  }

  export type attendancesAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type attendancesMaxOrderByAggregateInput = {
    id?: SortOrder
    attendance_date?: SortOrder
    user_id?: SortOrder
  }

  export type attendancesMinOrderByAggregateInput = {
    id?: SortOrder
    attendance_date?: SortOrder
    user_id?: SortOrder
  }

  export type attendancesSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type User_platformsListRelationFilter = {
    every?: user_platformsWhereInput
    some?: user_platformsWhereInput
    none?: user_platformsWhereInput
  }

  export type user_platformsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type platformsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type platformsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type platformsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type platformsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type platformsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type User_projectsListRelationFilter = {
    every?: user_projectsWhereInput
    some?: user_projectsWhereInput
    none?: user_projectsWhereInput
  }

  export type user_projectsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type projectsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    is_archived?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type projectsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type projectsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    is_archived?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type projectsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    is_archived?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type projectsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type rolesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type rolesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type rolesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type rolesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type rolesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type User_skillsListRelationFilter = {
    every?: user_skillsWhereInput
    some?: user_skillsWhereInput
    none?: user_skillsWhereInput
  }

  export type user_skillsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type skillsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type skillsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type skillsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type skillsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type skillsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PlatformsNullableScalarRelationFilter = {
    is?: platformsWhereInput | null
    isNot?: platformsWhereInput | null
  }

  export type user_platformsCountOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    platform_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_platformsAvgOrderByAggregateInput = {
    id?: SortOrder
    platform_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_platformsMaxOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    platform_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_platformsMinOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    platform_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_platformsSumOrderByAggregateInput = {
    id?: SortOrder
    platform_id?: SortOrder
    user_id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ProjectsNullableScalarRelationFilter = {
    is?: projectsWhereInput | null
    isNot?: projectsWhereInput | null
  }

  export type user_projectsCountOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    user_id?: SortOrder
    is_active?: SortOrder
    project_role?: SortOrder
  }

  export type user_projectsAvgOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_projectsMaxOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    user_id?: SortOrder
    is_active?: SortOrder
    project_role?: SortOrder
  }

  export type user_projectsMinOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    user_id?: SortOrder
    is_active?: SortOrder
    project_role?: SortOrder
  }

  export type user_projectsSumOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    user_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SkillsNullableScalarRelationFilter = {
    is?: skillsWhereInput | null
    isNot?: skillsWhereInput | null
  }

  export type user_skillsCountOrderByAggregateInput = {
    id?: SortOrder
    skill_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_skillsAvgOrderByAggregateInput = {
    id?: SortOrder
    skill_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_skillsMaxOrderByAggregateInput = {
    id?: SortOrder
    skill_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_skillsMinOrderByAggregateInput = {
    id?: SortOrder
    skill_id?: SortOrder
    user_id?: SortOrder
  }

  export type user_skillsSumOrderByAggregateInput = {
    id?: SortOrder
    skill_id?: SortOrder
    user_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AttendancesListRelationFilter = {
    every?: attendancesWhereInput
    some?: attendancesWhereInput
    none?: attendancesWhereInput
  }

  export type RolesScalarRelationFilter = {
    is?: rolesWhereInput
    isNot?: rolesWhereInput
  }

  export type attendancesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    personal_email?: SortOrder
    is_active?: SortOrder
    role_id?: SortOrder
    motivation?: SortOrder
    semester?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    semester?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    personal_email?: SortOrder
    is_active?: SortOrder
    role_id?: SortOrder
    motivation?: SortOrder
    semester?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    personal_email?: SortOrder
    is_active?: SortOrder
    role_id?: SortOrder
    motivation?: SortOrder
    semester?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    semester?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type usersCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<usersCreateWithoutAttendancesInput, usersUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: usersCreateOrConnectWithoutAttendancesInput
    connect?: usersWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersUpdateOneWithoutAttendancesNestedInput = {
    create?: XOR<usersCreateWithoutAttendancesInput, usersUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: usersCreateOrConnectWithoutAttendancesInput
    upsert?: usersUpsertWithoutAttendancesInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAttendancesInput, usersUpdateWithoutAttendancesInput>, usersUncheckedUpdateWithoutAttendancesInput>
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type user_platformsCreateNestedManyWithoutPlatformsInput = {
    create?: XOR<user_platformsCreateWithoutPlatformsInput, user_platformsUncheckedCreateWithoutPlatformsInput> | user_platformsCreateWithoutPlatformsInput[] | user_platformsUncheckedCreateWithoutPlatformsInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutPlatformsInput | user_platformsCreateOrConnectWithoutPlatformsInput[]
    createMany?: user_platformsCreateManyPlatformsInputEnvelope
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
  }

  export type user_platformsUncheckedCreateNestedManyWithoutPlatformsInput = {
    create?: XOR<user_platformsCreateWithoutPlatformsInput, user_platformsUncheckedCreateWithoutPlatformsInput> | user_platformsCreateWithoutPlatformsInput[] | user_platformsUncheckedCreateWithoutPlatformsInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutPlatformsInput | user_platformsCreateOrConnectWithoutPlatformsInput[]
    createMany?: user_platformsCreateManyPlatformsInputEnvelope
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type user_platformsUpdateManyWithoutPlatformsNestedInput = {
    create?: XOR<user_platformsCreateWithoutPlatformsInput, user_platformsUncheckedCreateWithoutPlatformsInput> | user_platformsCreateWithoutPlatformsInput[] | user_platformsUncheckedCreateWithoutPlatformsInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutPlatformsInput | user_platformsCreateOrConnectWithoutPlatformsInput[]
    upsert?: user_platformsUpsertWithWhereUniqueWithoutPlatformsInput | user_platformsUpsertWithWhereUniqueWithoutPlatformsInput[]
    createMany?: user_platformsCreateManyPlatformsInputEnvelope
    set?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    disconnect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    delete?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    update?: user_platformsUpdateWithWhereUniqueWithoutPlatformsInput | user_platformsUpdateWithWhereUniqueWithoutPlatformsInput[]
    updateMany?: user_platformsUpdateManyWithWhereWithoutPlatformsInput | user_platformsUpdateManyWithWhereWithoutPlatformsInput[]
    deleteMany?: user_platformsScalarWhereInput | user_platformsScalarWhereInput[]
  }

  export type user_platformsUncheckedUpdateManyWithoutPlatformsNestedInput = {
    create?: XOR<user_platformsCreateWithoutPlatformsInput, user_platformsUncheckedCreateWithoutPlatformsInput> | user_platformsCreateWithoutPlatformsInput[] | user_platformsUncheckedCreateWithoutPlatformsInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutPlatformsInput | user_platformsCreateOrConnectWithoutPlatformsInput[]
    upsert?: user_platformsUpsertWithWhereUniqueWithoutPlatformsInput | user_platformsUpsertWithWhereUniqueWithoutPlatformsInput[]
    createMany?: user_platformsCreateManyPlatformsInputEnvelope
    set?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    disconnect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    delete?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    update?: user_platformsUpdateWithWhereUniqueWithoutPlatformsInput | user_platformsUpdateWithWhereUniqueWithoutPlatformsInput[]
    updateMany?: user_platformsUpdateManyWithWhereWithoutPlatformsInput | user_platformsUpdateManyWithWhereWithoutPlatformsInput[]
    deleteMany?: user_platformsScalarWhereInput | user_platformsScalarWhereInput[]
  }

  export type user_projectsCreateNestedManyWithoutProjectsInput = {
    create?: XOR<user_projectsCreateWithoutProjectsInput, user_projectsUncheckedCreateWithoutProjectsInput> | user_projectsCreateWithoutProjectsInput[] | user_projectsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutProjectsInput | user_projectsCreateOrConnectWithoutProjectsInput[]
    createMany?: user_projectsCreateManyProjectsInputEnvelope
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
  }

  export type user_projectsUncheckedCreateNestedManyWithoutProjectsInput = {
    create?: XOR<user_projectsCreateWithoutProjectsInput, user_projectsUncheckedCreateWithoutProjectsInput> | user_projectsCreateWithoutProjectsInput[] | user_projectsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutProjectsInput | user_projectsCreateOrConnectWithoutProjectsInput[]
    createMany?: user_projectsCreateManyProjectsInputEnvelope
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type user_projectsUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<user_projectsCreateWithoutProjectsInput, user_projectsUncheckedCreateWithoutProjectsInput> | user_projectsCreateWithoutProjectsInput[] | user_projectsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutProjectsInput | user_projectsCreateOrConnectWithoutProjectsInput[]
    upsert?: user_projectsUpsertWithWhereUniqueWithoutProjectsInput | user_projectsUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: user_projectsCreateManyProjectsInputEnvelope
    set?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    disconnect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    delete?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    update?: user_projectsUpdateWithWhereUniqueWithoutProjectsInput | user_projectsUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: user_projectsUpdateManyWithWhereWithoutProjectsInput | user_projectsUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: user_projectsScalarWhereInput | user_projectsScalarWhereInput[]
  }

  export type user_projectsUncheckedUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<user_projectsCreateWithoutProjectsInput, user_projectsUncheckedCreateWithoutProjectsInput> | user_projectsCreateWithoutProjectsInput[] | user_projectsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutProjectsInput | user_projectsCreateOrConnectWithoutProjectsInput[]
    upsert?: user_projectsUpsertWithWhereUniqueWithoutProjectsInput | user_projectsUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: user_projectsCreateManyProjectsInputEnvelope
    set?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    disconnect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    delete?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    update?: user_projectsUpdateWithWhereUniqueWithoutProjectsInput | user_projectsUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: user_projectsUpdateManyWithWhereWithoutProjectsInput | user_projectsUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: user_projectsScalarWhereInput | user_projectsScalarWhereInput[]
  }

  export type usersCreateNestedManyWithoutRolesInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersUpdateManyWithoutRolesNestedInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutRolesInput | usersUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutRolesInput | usersUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutRolesInput | usersUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutRolesInput | usersUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutRolesInput | usersUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutRolesInput | usersUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type user_skillsCreateNestedManyWithoutSkillsInput = {
    create?: XOR<user_skillsCreateWithoutSkillsInput, user_skillsUncheckedCreateWithoutSkillsInput> | user_skillsCreateWithoutSkillsInput[] | user_skillsUncheckedCreateWithoutSkillsInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutSkillsInput | user_skillsCreateOrConnectWithoutSkillsInput[]
    createMany?: user_skillsCreateManySkillsInputEnvelope
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
  }

  export type user_skillsUncheckedCreateNestedManyWithoutSkillsInput = {
    create?: XOR<user_skillsCreateWithoutSkillsInput, user_skillsUncheckedCreateWithoutSkillsInput> | user_skillsCreateWithoutSkillsInput[] | user_skillsUncheckedCreateWithoutSkillsInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutSkillsInput | user_skillsCreateOrConnectWithoutSkillsInput[]
    createMany?: user_skillsCreateManySkillsInputEnvelope
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
  }

  export type user_skillsUpdateManyWithoutSkillsNestedInput = {
    create?: XOR<user_skillsCreateWithoutSkillsInput, user_skillsUncheckedCreateWithoutSkillsInput> | user_skillsCreateWithoutSkillsInput[] | user_skillsUncheckedCreateWithoutSkillsInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutSkillsInput | user_skillsCreateOrConnectWithoutSkillsInput[]
    upsert?: user_skillsUpsertWithWhereUniqueWithoutSkillsInput | user_skillsUpsertWithWhereUniqueWithoutSkillsInput[]
    createMany?: user_skillsCreateManySkillsInputEnvelope
    set?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    disconnect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    delete?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    update?: user_skillsUpdateWithWhereUniqueWithoutSkillsInput | user_skillsUpdateWithWhereUniqueWithoutSkillsInput[]
    updateMany?: user_skillsUpdateManyWithWhereWithoutSkillsInput | user_skillsUpdateManyWithWhereWithoutSkillsInput[]
    deleteMany?: user_skillsScalarWhereInput | user_skillsScalarWhereInput[]
  }

  export type user_skillsUncheckedUpdateManyWithoutSkillsNestedInput = {
    create?: XOR<user_skillsCreateWithoutSkillsInput, user_skillsUncheckedCreateWithoutSkillsInput> | user_skillsCreateWithoutSkillsInput[] | user_skillsUncheckedCreateWithoutSkillsInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutSkillsInput | user_skillsCreateOrConnectWithoutSkillsInput[]
    upsert?: user_skillsUpsertWithWhereUniqueWithoutSkillsInput | user_skillsUpsertWithWhereUniqueWithoutSkillsInput[]
    createMany?: user_skillsCreateManySkillsInputEnvelope
    set?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    disconnect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    delete?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    update?: user_skillsUpdateWithWhereUniqueWithoutSkillsInput | user_skillsUpdateWithWhereUniqueWithoutSkillsInput[]
    updateMany?: user_skillsUpdateManyWithWhereWithoutSkillsInput | user_skillsUpdateManyWithWhereWithoutSkillsInput[]
    deleteMany?: user_skillsScalarWhereInput | user_skillsScalarWhereInput[]
  }

  export type platformsCreateNestedOneWithoutUser_platformsInput = {
    create?: XOR<platformsCreateWithoutUser_platformsInput, platformsUncheckedCreateWithoutUser_platformsInput>
    connectOrCreate?: platformsCreateOrConnectWithoutUser_platformsInput
    connect?: platformsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutUser_platformsInput = {
    create?: XOR<usersCreateWithoutUser_platformsInput, usersUncheckedCreateWithoutUser_platformsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_platformsInput
    connect?: usersWhereUniqueInput
  }

  export type platformsUpdateOneWithoutUser_platformsNestedInput = {
    create?: XOR<platformsCreateWithoutUser_platformsInput, platformsUncheckedCreateWithoutUser_platformsInput>
    connectOrCreate?: platformsCreateOrConnectWithoutUser_platformsInput
    upsert?: platformsUpsertWithoutUser_platformsInput
    disconnect?: platformsWhereInput | boolean
    delete?: platformsWhereInput | boolean
    connect?: platformsWhereUniqueInput
    update?: XOR<XOR<platformsUpdateToOneWithWhereWithoutUser_platformsInput, platformsUpdateWithoutUser_platformsInput>, platformsUncheckedUpdateWithoutUser_platformsInput>
  }

  export type usersUpdateOneWithoutUser_platformsNestedInput = {
    create?: XOR<usersCreateWithoutUser_platformsInput, usersUncheckedCreateWithoutUser_platformsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_platformsInput
    upsert?: usersUpsertWithoutUser_platformsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUser_platformsInput, usersUpdateWithoutUser_platformsInput>, usersUncheckedUpdateWithoutUser_platformsInput>
  }

  export type projectsCreateNestedOneWithoutUser_projectsInput = {
    create?: XOR<projectsCreateWithoutUser_projectsInput, projectsUncheckedCreateWithoutUser_projectsInput>
    connectOrCreate?: projectsCreateOrConnectWithoutUser_projectsInput
    connect?: projectsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutUser_projectsInput = {
    create?: XOR<usersCreateWithoutUser_projectsInput, usersUncheckedCreateWithoutUser_projectsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_projectsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type projectsUpdateOneWithoutUser_projectsNestedInput = {
    create?: XOR<projectsCreateWithoutUser_projectsInput, projectsUncheckedCreateWithoutUser_projectsInput>
    connectOrCreate?: projectsCreateOrConnectWithoutUser_projectsInput
    upsert?: projectsUpsertWithoutUser_projectsInput
    disconnect?: projectsWhereInput | boolean
    delete?: projectsWhereInput | boolean
    connect?: projectsWhereUniqueInput
    update?: XOR<XOR<projectsUpdateToOneWithWhereWithoutUser_projectsInput, projectsUpdateWithoutUser_projectsInput>, projectsUncheckedUpdateWithoutUser_projectsInput>
  }

  export type usersUpdateOneWithoutUser_projectsNestedInput = {
    create?: XOR<usersCreateWithoutUser_projectsInput, usersUncheckedCreateWithoutUser_projectsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_projectsInput
    upsert?: usersUpsertWithoutUser_projectsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUser_projectsInput, usersUpdateWithoutUser_projectsInput>, usersUncheckedUpdateWithoutUser_projectsInput>
  }

  export type skillsCreateNestedOneWithoutUser_skillsInput = {
    create?: XOR<skillsCreateWithoutUser_skillsInput, skillsUncheckedCreateWithoutUser_skillsInput>
    connectOrCreate?: skillsCreateOrConnectWithoutUser_skillsInput
    connect?: skillsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutUser_skillsInput = {
    create?: XOR<usersCreateWithoutUser_skillsInput, usersUncheckedCreateWithoutUser_skillsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_skillsInput
    connect?: usersWhereUniqueInput
  }

  export type skillsUpdateOneWithoutUser_skillsNestedInput = {
    create?: XOR<skillsCreateWithoutUser_skillsInput, skillsUncheckedCreateWithoutUser_skillsInput>
    connectOrCreate?: skillsCreateOrConnectWithoutUser_skillsInput
    upsert?: skillsUpsertWithoutUser_skillsInput
    disconnect?: skillsWhereInput | boolean
    delete?: skillsWhereInput | boolean
    connect?: skillsWhereUniqueInput
    update?: XOR<XOR<skillsUpdateToOneWithWhereWithoutUser_skillsInput, skillsUpdateWithoutUser_skillsInput>, skillsUncheckedUpdateWithoutUser_skillsInput>
  }

  export type usersUpdateOneWithoutUser_skillsNestedInput = {
    create?: XOR<usersCreateWithoutUser_skillsInput, usersUncheckedCreateWithoutUser_skillsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_skillsInput
    upsert?: usersUpsertWithoutUser_skillsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUser_skillsInput, usersUpdateWithoutUser_skillsInput>, usersUncheckedUpdateWithoutUser_skillsInput>
  }

  export type attendancesCreateNestedManyWithoutUsersInput = {
    create?: XOR<attendancesCreateWithoutUsersInput, attendancesUncheckedCreateWithoutUsersInput> | attendancesCreateWithoutUsersInput[] | attendancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendancesCreateOrConnectWithoutUsersInput | attendancesCreateOrConnectWithoutUsersInput[]
    createMany?: attendancesCreateManyUsersInputEnvelope
    connect?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
  }

  export type user_platformsCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_platformsCreateWithoutUsersInput, user_platformsUncheckedCreateWithoutUsersInput> | user_platformsCreateWithoutUsersInput[] | user_platformsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutUsersInput | user_platformsCreateOrConnectWithoutUsersInput[]
    createMany?: user_platformsCreateManyUsersInputEnvelope
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
  }

  export type user_projectsCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_projectsCreateWithoutUsersInput, user_projectsUncheckedCreateWithoutUsersInput> | user_projectsCreateWithoutUsersInput[] | user_projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutUsersInput | user_projectsCreateOrConnectWithoutUsersInput[]
    createMany?: user_projectsCreateManyUsersInputEnvelope
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
  }

  export type user_skillsCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_skillsCreateWithoutUsersInput, user_skillsUncheckedCreateWithoutUsersInput> | user_skillsCreateWithoutUsersInput[] | user_skillsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutUsersInput | user_skillsCreateOrConnectWithoutUsersInput[]
    createMany?: user_skillsCreateManyUsersInputEnvelope
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
  }

  export type rolesCreateNestedOneWithoutUsersInput = {
    create?: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: rolesCreateOrConnectWithoutUsersInput
    connect?: rolesWhereUniqueInput
  }

  export type attendancesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<attendancesCreateWithoutUsersInput, attendancesUncheckedCreateWithoutUsersInput> | attendancesCreateWithoutUsersInput[] | attendancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendancesCreateOrConnectWithoutUsersInput | attendancesCreateOrConnectWithoutUsersInput[]
    createMany?: attendancesCreateManyUsersInputEnvelope
    connect?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
  }

  export type user_platformsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_platformsCreateWithoutUsersInput, user_platformsUncheckedCreateWithoutUsersInput> | user_platformsCreateWithoutUsersInput[] | user_platformsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutUsersInput | user_platformsCreateOrConnectWithoutUsersInput[]
    createMany?: user_platformsCreateManyUsersInputEnvelope
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
  }

  export type user_projectsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_projectsCreateWithoutUsersInput, user_projectsUncheckedCreateWithoutUsersInput> | user_projectsCreateWithoutUsersInput[] | user_projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutUsersInput | user_projectsCreateOrConnectWithoutUsersInput[]
    createMany?: user_projectsCreateManyUsersInputEnvelope
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
  }

  export type user_skillsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_skillsCreateWithoutUsersInput, user_skillsUncheckedCreateWithoutUsersInput> | user_skillsCreateWithoutUsersInput[] | user_skillsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutUsersInput | user_skillsCreateOrConnectWithoutUsersInput[]
    createMany?: user_skillsCreateManyUsersInputEnvelope
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type attendancesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<attendancesCreateWithoutUsersInput, attendancesUncheckedCreateWithoutUsersInput> | attendancesCreateWithoutUsersInput[] | attendancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendancesCreateOrConnectWithoutUsersInput | attendancesCreateOrConnectWithoutUsersInput[]
    upsert?: attendancesUpsertWithWhereUniqueWithoutUsersInput | attendancesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: attendancesCreateManyUsersInputEnvelope
    set?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    disconnect?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    delete?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    connect?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    update?: attendancesUpdateWithWhereUniqueWithoutUsersInput | attendancesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: attendancesUpdateManyWithWhereWithoutUsersInput | attendancesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: attendancesScalarWhereInput | attendancesScalarWhereInput[]
  }

  export type user_platformsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_platformsCreateWithoutUsersInput, user_platformsUncheckedCreateWithoutUsersInput> | user_platformsCreateWithoutUsersInput[] | user_platformsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutUsersInput | user_platformsCreateOrConnectWithoutUsersInput[]
    upsert?: user_platformsUpsertWithWhereUniqueWithoutUsersInput | user_platformsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_platformsCreateManyUsersInputEnvelope
    set?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    disconnect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    delete?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    update?: user_platformsUpdateWithWhereUniqueWithoutUsersInput | user_platformsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_platformsUpdateManyWithWhereWithoutUsersInput | user_platformsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_platformsScalarWhereInput | user_platformsScalarWhereInput[]
  }

  export type user_projectsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_projectsCreateWithoutUsersInput, user_projectsUncheckedCreateWithoutUsersInput> | user_projectsCreateWithoutUsersInput[] | user_projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutUsersInput | user_projectsCreateOrConnectWithoutUsersInput[]
    upsert?: user_projectsUpsertWithWhereUniqueWithoutUsersInput | user_projectsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_projectsCreateManyUsersInputEnvelope
    set?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    disconnect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    delete?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    update?: user_projectsUpdateWithWhereUniqueWithoutUsersInput | user_projectsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_projectsUpdateManyWithWhereWithoutUsersInput | user_projectsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_projectsScalarWhereInput | user_projectsScalarWhereInput[]
  }

  export type user_skillsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_skillsCreateWithoutUsersInput, user_skillsUncheckedCreateWithoutUsersInput> | user_skillsCreateWithoutUsersInput[] | user_skillsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutUsersInput | user_skillsCreateOrConnectWithoutUsersInput[]
    upsert?: user_skillsUpsertWithWhereUniqueWithoutUsersInput | user_skillsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_skillsCreateManyUsersInputEnvelope
    set?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    disconnect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    delete?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    update?: user_skillsUpdateWithWhereUniqueWithoutUsersInput | user_skillsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_skillsUpdateManyWithWhereWithoutUsersInput | user_skillsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_skillsScalarWhereInput | user_skillsScalarWhereInput[]
  }

  export type rolesUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: rolesCreateOrConnectWithoutUsersInput
    upsert?: rolesUpsertWithoutUsersInput
    connect?: rolesWhereUniqueInput
    update?: XOR<XOR<rolesUpdateToOneWithWhereWithoutUsersInput, rolesUpdateWithoutUsersInput>, rolesUncheckedUpdateWithoutUsersInput>
  }

  export type attendancesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<attendancesCreateWithoutUsersInput, attendancesUncheckedCreateWithoutUsersInput> | attendancesCreateWithoutUsersInput[] | attendancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendancesCreateOrConnectWithoutUsersInput | attendancesCreateOrConnectWithoutUsersInput[]
    upsert?: attendancesUpsertWithWhereUniqueWithoutUsersInput | attendancesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: attendancesCreateManyUsersInputEnvelope
    set?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    disconnect?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    delete?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    connect?: attendancesWhereUniqueInput | attendancesWhereUniqueInput[]
    update?: attendancesUpdateWithWhereUniqueWithoutUsersInput | attendancesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: attendancesUpdateManyWithWhereWithoutUsersInput | attendancesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: attendancesScalarWhereInput | attendancesScalarWhereInput[]
  }

  export type user_platformsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_platformsCreateWithoutUsersInput, user_platformsUncheckedCreateWithoutUsersInput> | user_platformsCreateWithoutUsersInput[] | user_platformsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_platformsCreateOrConnectWithoutUsersInput | user_platformsCreateOrConnectWithoutUsersInput[]
    upsert?: user_platformsUpsertWithWhereUniqueWithoutUsersInput | user_platformsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_platformsCreateManyUsersInputEnvelope
    set?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    disconnect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    delete?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    connect?: user_platformsWhereUniqueInput | user_platformsWhereUniqueInput[]
    update?: user_platformsUpdateWithWhereUniqueWithoutUsersInput | user_platformsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_platformsUpdateManyWithWhereWithoutUsersInput | user_platformsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_platformsScalarWhereInput | user_platformsScalarWhereInput[]
  }

  export type user_projectsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_projectsCreateWithoutUsersInput, user_projectsUncheckedCreateWithoutUsersInput> | user_projectsCreateWithoutUsersInput[] | user_projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_projectsCreateOrConnectWithoutUsersInput | user_projectsCreateOrConnectWithoutUsersInput[]
    upsert?: user_projectsUpsertWithWhereUniqueWithoutUsersInput | user_projectsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_projectsCreateManyUsersInputEnvelope
    set?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    disconnect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    delete?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    connect?: user_projectsWhereUniqueInput | user_projectsWhereUniqueInput[]
    update?: user_projectsUpdateWithWhereUniqueWithoutUsersInput | user_projectsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_projectsUpdateManyWithWhereWithoutUsersInput | user_projectsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_projectsScalarWhereInput | user_projectsScalarWhereInput[]
  }

  export type user_skillsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_skillsCreateWithoutUsersInput, user_skillsUncheckedCreateWithoutUsersInput> | user_skillsCreateWithoutUsersInput[] | user_skillsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_skillsCreateOrConnectWithoutUsersInput | user_skillsCreateOrConnectWithoutUsersInput[]
    upsert?: user_skillsUpsertWithWhereUniqueWithoutUsersInput | user_skillsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_skillsCreateManyUsersInputEnvelope
    set?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    disconnect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    delete?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    connect?: user_skillsWhereUniqueInput | user_skillsWhereUniqueInput[]
    update?: user_skillsUpdateWithWhereUniqueWithoutUsersInput | user_skillsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_skillsUpdateManyWithWhereWithoutUsersInput | user_skillsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_skillsScalarWhereInput | user_skillsScalarWhereInput[]
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type usersCreateWithoutAttendancesInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
    user_platforms?: user_platformsCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutAttendancesInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    role_id: bigint | number
    motivation: string
    semester: number
    user_platforms?: user_platformsUncheckedCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsUncheckedCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutAttendancesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAttendancesInput, usersUncheckedCreateWithoutAttendancesInput>
  }

  export type usersUpsertWithoutAttendancesInput = {
    update: XOR<usersUpdateWithoutAttendancesInput, usersUncheckedUpdateWithoutAttendancesInput>
    create: XOR<usersCreateWithoutAttendancesInput, usersUncheckedCreateWithoutAttendancesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAttendancesInput, usersUncheckedUpdateWithoutAttendancesInput>
  }

  export type usersUpdateWithoutAttendancesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    user_platforms?: user_platformsUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutAttendancesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    user_platforms?: user_platformsUncheckedUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUncheckedUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type user_platformsCreateWithoutPlatformsInput = {
    id?: bigint | number
    link: string
    users?: usersCreateNestedOneWithoutUser_platformsInput
  }

  export type user_platformsUncheckedCreateWithoutPlatformsInput = {
    id?: bigint | number
    link: string
    user_id?: bigint | number | null
  }

  export type user_platformsCreateOrConnectWithoutPlatformsInput = {
    where: user_platformsWhereUniqueInput
    create: XOR<user_platformsCreateWithoutPlatformsInput, user_platformsUncheckedCreateWithoutPlatformsInput>
  }

  export type user_platformsCreateManyPlatformsInputEnvelope = {
    data: user_platformsCreateManyPlatformsInput | user_platformsCreateManyPlatformsInput[]
    skipDuplicates?: boolean
  }

  export type user_platformsUpsertWithWhereUniqueWithoutPlatformsInput = {
    where: user_platformsWhereUniqueInput
    update: XOR<user_platformsUpdateWithoutPlatformsInput, user_platformsUncheckedUpdateWithoutPlatformsInput>
    create: XOR<user_platformsCreateWithoutPlatformsInput, user_platformsUncheckedCreateWithoutPlatformsInput>
  }

  export type user_platformsUpdateWithWhereUniqueWithoutPlatformsInput = {
    where: user_platformsWhereUniqueInput
    data: XOR<user_platformsUpdateWithoutPlatformsInput, user_platformsUncheckedUpdateWithoutPlatformsInput>
  }

  export type user_platformsUpdateManyWithWhereWithoutPlatformsInput = {
    where: user_platformsScalarWhereInput
    data: XOR<user_platformsUpdateManyMutationInput, user_platformsUncheckedUpdateManyWithoutPlatformsInput>
  }

  export type user_platformsScalarWhereInput = {
    AND?: user_platformsScalarWhereInput | user_platformsScalarWhereInput[]
    OR?: user_platformsScalarWhereInput[]
    NOT?: user_platformsScalarWhereInput | user_platformsScalarWhereInput[]
    id?: BigIntFilter<"user_platforms"> | bigint | number
    link?: StringFilter<"user_platforms"> | string
    platform_id?: BigIntNullableFilter<"user_platforms"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_platforms"> | bigint | number | null
  }

  export type user_projectsCreateWithoutProjectsInput = {
    id?: bigint | number
    is_active?: boolean | null
    project_role?: string | null
    users?: usersCreateNestedOneWithoutUser_projectsInput
  }

  export type user_projectsUncheckedCreateWithoutProjectsInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    is_active?: boolean | null
    project_role?: string | null
  }

  export type user_projectsCreateOrConnectWithoutProjectsInput = {
    where: user_projectsWhereUniqueInput
    create: XOR<user_projectsCreateWithoutProjectsInput, user_projectsUncheckedCreateWithoutProjectsInput>
  }

  export type user_projectsCreateManyProjectsInputEnvelope = {
    data: user_projectsCreateManyProjectsInput | user_projectsCreateManyProjectsInput[]
    skipDuplicates?: boolean
  }

  export type user_projectsUpsertWithWhereUniqueWithoutProjectsInput = {
    where: user_projectsWhereUniqueInput
    update: XOR<user_projectsUpdateWithoutProjectsInput, user_projectsUncheckedUpdateWithoutProjectsInput>
    create: XOR<user_projectsCreateWithoutProjectsInput, user_projectsUncheckedCreateWithoutProjectsInput>
  }

  export type user_projectsUpdateWithWhereUniqueWithoutProjectsInput = {
    where: user_projectsWhereUniqueInput
    data: XOR<user_projectsUpdateWithoutProjectsInput, user_projectsUncheckedUpdateWithoutProjectsInput>
  }

  export type user_projectsUpdateManyWithWhereWithoutProjectsInput = {
    where: user_projectsScalarWhereInput
    data: XOR<user_projectsUpdateManyMutationInput, user_projectsUncheckedUpdateManyWithoutProjectsInput>
  }

  export type user_projectsScalarWhereInput = {
    AND?: user_projectsScalarWhereInput | user_projectsScalarWhereInput[]
    OR?: user_projectsScalarWhereInput[]
    NOT?: user_projectsScalarWhereInput | user_projectsScalarWhereInput[]
    id?: BigIntFilter<"user_projects"> | bigint | number
    project_id?: BigIntNullableFilter<"user_projects"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_projects"> | bigint | number | null
    is_active?: BoolNullableFilter<"user_projects"> | boolean | null
    project_role?: StringNullableFilter<"user_projects"> | string | null
  }

  export type usersCreateWithoutRolesInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
    attendances?: attendancesCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutRolesInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
    attendances?: attendancesUncheckedCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsUncheckedCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsUncheckedCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutRolesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput>
  }

  export type usersCreateManyRolesInputEnvelope = {
    data: usersCreateManyRolesInput | usersCreateManyRolesInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithWhereUniqueWithoutRolesInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutRolesInput, usersUncheckedUpdateWithoutRolesInput>
    create: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput>
  }

  export type usersUpdateWithWhereUniqueWithoutRolesInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutRolesInput, usersUncheckedUpdateWithoutRolesInput>
  }

  export type usersUpdateManyWithWhereWithoutRolesInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutRolesInput>
  }

  export type usersScalarWhereInput = {
    AND?: usersScalarWhereInput | usersScalarWhereInput[]
    OR?: usersScalarWhereInput[]
    NOT?: usersScalarWhereInput | usersScalarWhereInput[]
    id?: BigIntFilter<"users"> | bigint | number
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    personal_email?: StringNullableFilter<"users"> | string | null
    is_active?: BoolFilter<"users"> | boolean
    role_id?: BigIntFilter<"users"> | bigint | number
    motivation?: StringFilter<"users"> | string
    semester?: IntFilter<"users"> | number
  }

  export type user_skillsCreateWithoutSkillsInput = {
    id?: bigint | number
    users?: usersCreateNestedOneWithoutUser_skillsInput
  }

  export type user_skillsUncheckedCreateWithoutSkillsInput = {
    id?: bigint | number
    user_id?: bigint | number | null
  }

  export type user_skillsCreateOrConnectWithoutSkillsInput = {
    where: user_skillsWhereUniqueInput
    create: XOR<user_skillsCreateWithoutSkillsInput, user_skillsUncheckedCreateWithoutSkillsInput>
  }

  export type user_skillsCreateManySkillsInputEnvelope = {
    data: user_skillsCreateManySkillsInput | user_skillsCreateManySkillsInput[]
    skipDuplicates?: boolean
  }

  export type user_skillsUpsertWithWhereUniqueWithoutSkillsInput = {
    where: user_skillsWhereUniqueInput
    update: XOR<user_skillsUpdateWithoutSkillsInput, user_skillsUncheckedUpdateWithoutSkillsInput>
    create: XOR<user_skillsCreateWithoutSkillsInput, user_skillsUncheckedCreateWithoutSkillsInput>
  }

  export type user_skillsUpdateWithWhereUniqueWithoutSkillsInput = {
    where: user_skillsWhereUniqueInput
    data: XOR<user_skillsUpdateWithoutSkillsInput, user_skillsUncheckedUpdateWithoutSkillsInput>
  }

  export type user_skillsUpdateManyWithWhereWithoutSkillsInput = {
    where: user_skillsScalarWhereInput
    data: XOR<user_skillsUpdateManyMutationInput, user_skillsUncheckedUpdateManyWithoutSkillsInput>
  }

  export type user_skillsScalarWhereInput = {
    AND?: user_skillsScalarWhereInput | user_skillsScalarWhereInput[]
    OR?: user_skillsScalarWhereInput[]
    NOT?: user_skillsScalarWhereInput | user_skillsScalarWhereInput[]
    id?: BigIntFilter<"user_skills"> | bigint | number
    skill_id?: BigIntNullableFilter<"user_skills"> | bigint | number | null
    user_id?: BigIntNullableFilter<"user_skills"> | bigint | number | null
  }

  export type platformsCreateWithoutUser_platformsInput = {
    id?: bigint | number
    name: string
  }

  export type platformsUncheckedCreateWithoutUser_platformsInput = {
    id?: bigint | number
    name: string
  }

  export type platformsCreateOrConnectWithoutUser_platformsInput = {
    where: platformsWhereUniqueInput
    create: XOR<platformsCreateWithoutUser_platformsInput, platformsUncheckedCreateWithoutUser_platformsInput>
  }

  export type usersCreateWithoutUser_platformsInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
    attendances?: attendancesCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUser_platformsInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    role_id: bigint | number
    motivation: string
    semester: number
    attendances?: attendancesUncheckedCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsUncheckedCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutUser_platformsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_platformsInput, usersUncheckedCreateWithoutUser_platformsInput>
  }

  export type platformsUpsertWithoutUser_platformsInput = {
    update: XOR<platformsUpdateWithoutUser_platformsInput, platformsUncheckedUpdateWithoutUser_platformsInput>
    create: XOR<platformsCreateWithoutUser_platformsInput, platformsUncheckedCreateWithoutUser_platformsInput>
    where?: platformsWhereInput
  }

  export type platformsUpdateToOneWithWhereWithoutUser_platformsInput = {
    where?: platformsWhereInput
    data: XOR<platformsUpdateWithoutUser_platformsInput, platformsUncheckedUpdateWithoutUser_platformsInput>
  }

  export type platformsUpdateWithoutUser_platformsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type platformsUncheckedUpdateWithoutUser_platformsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type usersUpsertWithoutUser_platformsInput = {
    update: XOR<usersUpdateWithoutUser_platformsInput, usersUncheckedUpdateWithoutUser_platformsInput>
    create: XOR<usersCreateWithoutUser_platformsInput, usersUncheckedCreateWithoutUser_platformsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUser_platformsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUser_platformsInput, usersUncheckedUpdateWithoutUser_platformsInput>
  }

  export type usersUpdateWithoutUser_platformsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_platformsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUncheckedUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUncheckedUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type projectsCreateWithoutUser_projectsInput = {
    id?: bigint | number
    title: string
    description: string
    start_date?: Date | string | null
    is_archived?: boolean | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type projectsUncheckedCreateWithoutUser_projectsInput = {
    id?: bigint | number
    title: string
    description: string
    start_date?: Date | string | null
    is_archived?: boolean | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type projectsCreateOrConnectWithoutUser_projectsInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutUser_projectsInput, projectsUncheckedCreateWithoutUser_projectsInput>
  }

  export type usersCreateWithoutUser_projectsInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
    attendances?: attendancesCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUser_projectsInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    role_id: bigint | number
    motivation: string
    semester: number
    attendances?: attendancesUncheckedCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsUncheckedCreateNestedManyWithoutUsersInput
    user_skills?: user_skillsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutUser_projectsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_projectsInput, usersUncheckedCreateWithoutUser_projectsInput>
  }

  export type projectsUpsertWithoutUser_projectsInput = {
    update: XOR<projectsUpdateWithoutUser_projectsInput, projectsUncheckedUpdateWithoutUser_projectsInput>
    create: XOR<projectsCreateWithoutUser_projectsInput, projectsUncheckedCreateWithoutUser_projectsInput>
    where?: projectsWhereInput
  }

  export type projectsUpdateToOneWithWhereWithoutUser_projectsInput = {
    where?: projectsWhereInput
    data: XOR<projectsUpdateWithoutUser_projectsInput, projectsUncheckedUpdateWithoutUser_projectsInput>
  }

  export type projectsUpdateWithoutUser_projectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_archived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUncheckedUpdateWithoutUser_projectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_archived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUpsertWithoutUser_projectsInput = {
    update: XOR<usersUpdateWithoutUser_projectsInput, usersUncheckedUpdateWithoutUser_projectsInput>
    create: XOR<usersCreateWithoutUser_projectsInput, usersUncheckedCreateWithoutUser_projectsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUser_projectsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUser_projectsInput, usersUncheckedUpdateWithoutUser_projectsInput>
  }

  export type usersUpdateWithoutUser_projectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_projectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUncheckedUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUncheckedUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type skillsCreateWithoutUser_skillsInput = {
    id?: bigint | number
    name: string
  }

  export type skillsUncheckedCreateWithoutUser_skillsInput = {
    id?: bigint | number
    name: string
  }

  export type skillsCreateOrConnectWithoutUser_skillsInput = {
    where: skillsWhereUniqueInput
    create: XOR<skillsCreateWithoutUser_skillsInput, skillsUncheckedCreateWithoutUser_skillsInput>
  }

  export type usersCreateWithoutUser_skillsInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
    attendances?: attendancesCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUser_skillsInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    role_id: bigint | number
    motivation: string
    semester: number
    attendances?: attendancesUncheckedCreateNestedManyWithoutUsersInput
    user_platforms?: user_platformsUncheckedCreateNestedManyWithoutUsersInput
    user_projects?: user_projectsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutUser_skillsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_skillsInput, usersUncheckedCreateWithoutUser_skillsInput>
  }

  export type skillsUpsertWithoutUser_skillsInput = {
    update: XOR<skillsUpdateWithoutUser_skillsInput, skillsUncheckedUpdateWithoutUser_skillsInput>
    create: XOR<skillsCreateWithoutUser_skillsInput, skillsUncheckedCreateWithoutUser_skillsInput>
    where?: skillsWhereInput
  }

  export type skillsUpdateToOneWithWhereWithoutUser_skillsInput = {
    where?: skillsWhereInput
    data: XOR<skillsUpdateWithoutUser_skillsInput, skillsUncheckedUpdateWithoutUser_skillsInput>
  }

  export type skillsUpdateWithoutUser_skillsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type skillsUncheckedUpdateWithoutUser_skillsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type usersUpsertWithoutUser_skillsInput = {
    update: XOR<usersUpdateWithoutUser_skillsInput, usersUncheckedUpdateWithoutUser_skillsInput>
    create: XOR<usersCreateWithoutUser_skillsInput, usersUncheckedCreateWithoutUser_skillsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUser_skillsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUser_skillsInput, usersUncheckedUpdateWithoutUser_skillsInput>
  }

  export type usersUpdateWithoutUser_skillsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_skillsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUncheckedUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUncheckedUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type attendancesCreateWithoutUsersInput = {
    id?: bigint | number
    attendance_date: Date | string
  }

  export type attendancesUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    attendance_date: Date | string
  }

  export type attendancesCreateOrConnectWithoutUsersInput = {
    where: attendancesWhereUniqueInput
    create: XOR<attendancesCreateWithoutUsersInput, attendancesUncheckedCreateWithoutUsersInput>
  }

  export type attendancesCreateManyUsersInputEnvelope = {
    data: attendancesCreateManyUsersInput | attendancesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type user_platformsCreateWithoutUsersInput = {
    id?: bigint | number
    link: string
    platforms?: platformsCreateNestedOneWithoutUser_platformsInput
  }

  export type user_platformsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    link: string
    platform_id?: bigint | number | null
  }

  export type user_platformsCreateOrConnectWithoutUsersInput = {
    where: user_platformsWhereUniqueInput
    create: XOR<user_platformsCreateWithoutUsersInput, user_platformsUncheckedCreateWithoutUsersInput>
  }

  export type user_platformsCreateManyUsersInputEnvelope = {
    data: user_platformsCreateManyUsersInput | user_platformsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type user_projectsCreateWithoutUsersInput = {
    id?: bigint | number
    is_active?: boolean | null
    project_role?: string | null
    projects?: projectsCreateNestedOneWithoutUser_projectsInput
  }

  export type user_projectsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    project_id?: bigint | number | null
    is_active?: boolean | null
    project_role?: string | null
  }

  export type user_projectsCreateOrConnectWithoutUsersInput = {
    where: user_projectsWhereUniqueInput
    create: XOR<user_projectsCreateWithoutUsersInput, user_projectsUncheckedCreateWithoutUsersInput>
  }

  export type user_projectsCreateManyUsersInputEnvelope = {
    data: user_projectsCreateManyUsersInput | user_projectsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type user_skillsCreateWithoutUsersInput = {
    id?: bigint | number
    skills?: skillsCreateNestedOneWithoutUser_skillsInput
  }

  export type user_skillsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    skill_id?: bigint | number | null
  }

  export type user_skillsCreateOrConnectWithoutUsersInput = {
    where: user_skillsWhereUniqueInput
    create: XOR<user_skillsCreateWithoutUsersInput, user_skillsUncheckedCreateWithoutUsersInput>
  }

  export type user_skillsCreateManyUsersInputEnvelope = {
    data: user_skillsCreateManyUsersInput | user_skillsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type rolesCreateWithoutUsersInput = {
    id?: bigint | number
    name: string
  }

  export type rolesUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    name: string
  }

  export type rolesCreateOrConnectWithoutUsersInput = {
    where: rolesWhereUniqueInput
    create: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
  }

  export type attendancesUpsertWithWhereUniqueWithoutUsersInput = {
    where: attendancesWhereUniqueInput
    update: XOR<attendancesUpdateWithoutUsersInput, attendancesUncheckedUpdateWithoutUsersInput>
    create: XOR<attendancesCreateWithoutUsersInput, attendancesUncheckedCreateWithoutUsersInput>
  }

  export type attendancesUpdateWithWhereUniqueWithoutUsersInput = {
    where: attendancesWhereUniqueInput
    data: XOR<attendancesUpdateWithoutUsersInput, attendancesUncheckedUpdateWithoutUsersInput>
  }

  export type attendancesUpdateManyWithWhereWithoutUsersInput = {
    where: attendancesScalarWhereInput
    data: XOR<attendancesUpdateManyMutationInput, attendancesUncheckedUpdateManyWithoutUsersInput>
  }

  export type attendancesScalarWhereInput = {
    AND?: attendancesScalarWhereInput | attendancesScalarWhereInput[]
    OR?: attendancesScalarWhereInput[]
    NOT?: attendancesScalarWhereInput | attendancesScalarWhereInput[]
    id?: BigIntFilter<"attendances"> | bigint | number
    attendance_date?: DateTimeFilter<"attendances"> | Date | string
    user_id?: BigIntNullableFilter<"attendances"> | bigint | number | null
  }

  export type user_platformsUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_platformsWhereUniqueInput
    update: XOR<user_platformsUpdateWithoutUsersInput, user_platformsUncheckedUpdateWithoutUsersInput>
    create: XOR<user_platformsCreateWithoutUsersInput, user_platformsUncheckedCreateWithoutUsersInput>
  }

  export type user_platformsUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_platformsWhereUniqueInput
    data: XOR<user_platformsUpdateWithoutUsersInput, user_platformsUncheckedUpdateWithoutUsersInput>
  }

  export type user_platformsUpdateManyWithWhereWithoutUsersInput = {
    where: user_platformsScalarWhereInput
    data: XOR<user_platformsUpdateManyMutationInput, user_platformsUncheckedUpdateManyWithoutUsersInput>
  }

  export type user_projectsUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_projectsWhereUniqueInput
    update: XOR<user_projectsUpdateWithoutUsersInput, user_projectsUncheckedUpdateWithoutUsersInput>
    create: XOR<user_projectsCreateWithoutUsersInput, user_projectsUncheckedCreateWithoutUsersInput>
  }

  export type user_projectsUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_projectsWhereUniqueInput
    data: XOR<user_projectsUpdateWithoutUsersInput, user_projectsUncheckedUpdateWithoutUsersInput>
  }

  export type user_projectsUpdateManyWithWhereWithoutUsersInput = {
    where: user_projectsScalarWhereInput
    data: XOR<user_projectsUpdateManyMutationInput, user_projectsUncheckedUpdateManyWithoutUsersInput>
  }

  export type user_skillsUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_skillsWhereUniqueInput
    update: XOR<user_skillsUpdateWithoutUsersInput, user_skillsUncheckedUpdateWithoutUsersInput>
    create: XOR<user_skillsCreateWithoutUsersInput, user_skillsUncheckedCreateWithoutUsersInput>
  }

  export type user_skillsUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_skillsWhereUniqueInput
    data: XOR<user_skillsUpdateWithoutUsersInput, user_skillsUncheckedUpdateWithoutUsersInput>
  }

  export type user_skillsUpdateManyWithWhereWithoutUsersInput = {
    where: user_skillsScalarWhereInput
    data: XOR<user_skillsUpdateManyMutationInput, user_skillsUncheckedUpdateManyWithoutUsersInput>
  }

  export type rolesUpsertWithoutUsersInput = {
    update: XOR<rolesUpdateWithoutUsersInput, rolesUncheckedUpdateWithoutUsersInput>
    create: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    where?: rolesWhereInput
  }

  export type rolesUpdateToOneWithWhereWithoutUsersInput = {
    where?: rolesWhereInput
    data: XOR<rolesUpdateWithoutUsersInput, rolesUncheckedUpdateWithoutUsersInput>
  }

  export type rolesUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type rolesUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type user_platformsCreateManyPlatformsInput = {
    id?: bigint | number
    link: string
    user_id?: bigint | number | null
  }

  export type user_platformsUpdateWithoutPlatformsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    users?: usersUpdateOneWithoutUser_platformsNestedInput
  }

  export type user_platformsUncheckedUpdateWithoutPlatformsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_platformsUncheckedUpdateManyWithoutPlatformsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_projectsCreateManyProjectsInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    is_active?: boolean | null
    project_role?: string | null
  }

  export type user_projectsUpdateWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneWithoutUser_projectsNestedInput
  }

  export type user_projectsUncheckedUpdateWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_projectsUncheckedUpdateManyWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateManyRolesInput = {
    id?: bigint | number
    email: string
    password: string
    name: string
    last_name: string
    personal_email?: string | null
    is_active?: boolean
    motivation: string
    semester: number
  }

  export type usersUpdateWithoutRolesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutRolesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    attendances?: attendancesUncheckedUpdateManyWithoutUsersNestedInput
    user_platforms?: user_platformsUncheckedUpdateManyWithoutUsersNestedInput
    user_projects?: user_projectsUncheckedUpdateManyWithoutUsersNestedInput
    user_skills?: user_skillsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutRolesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    motivation?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
  }

  export type user_skillsCreateManySkillsInput = {
    id?: bigint | number
    user_id?: bigint | number | null
  }

  export type user_skillsUpdateWithoutSkillsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    users?: usersUpdateOneWithoutUser_skillsNestedInput
  }

  export type user_skillsUncheckedUpdateWithoutSkillsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_skillsUncheckedUpdateManyWithoutSkillsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type attendancesCreateManyUsersInput = {
    id?: bigint | number
    attendance_date: Date | string
  }

  export type user_platformsCreateManyUsersInput = {
    id?: bigint | number
    link: string
    platform_id?: bigint | number | null
  }

  export type user_projectsCreateManyUsersInput = {
    id?: bigint | number
    project_id?: bigint | number | null
    is_active?: boolean | null
    project_role?: string | null
  }

  export type user_skillsCreateManyUsersInput = {
    id?: bigint | number
    skill_id?: bigint | number | null
  }

  export type attendancesUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    attendance_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendancesUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    attendance_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendancesUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    attendance_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_platformsUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    platforms?: platformsUpdateOneWithoutUser_platformsNestedInput
  }

  export type user_platformsUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    platform_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_platformsUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    link?: StringFieldUpdateOperationsInput | string
    platform_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_projectsUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: projectsUpdateOneWithoutUser_projectsNestedInput
  }

  export type user_projectsUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_projectsUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    project_role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_skillsUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    skills?: skillsUpdateOneWithoutUser_skillsNestedInput
  }

  export type user_skillsUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    skill_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type user_skillsUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    skill_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}