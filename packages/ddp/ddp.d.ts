import { Meteor as BaseMeteor } from 'meteor/meteor';
import { EJSONable, EJSONableProperty } from 'meteor/ejson';

export type global_Error = Error;

export namespace DDP {
  interface DDPStatic {
    subscribe(name: string, ...rest: any[]): BaseMeteor.SubscriptionHandle;
    call(method: string, ...parameters: any[]): any;
    apply(method: string, ...parameters: any[]): any;
    methods(IMeteorMethodsDictionary: any): any;
    status(): DDPStatus;
    reconnect(): void;
    disconnect(): void;
    onReconnect(): void;
  }

  function _allSubscriptionsReady(): boolean;

  type Status = 'connected' | 'connecting' | 'failed' | 'waiting' | 'offline';

  interface DDPStatus {
    connected: boolean;
    status: Status;
    retryCount: number;
    retryTime?: number | undefined;
    reason?: string | undefined;
  }

  function connect(url: string): DDPStatic;
}

export namespace Meteor {

  /** Method **/
  interface MethodThisType {
    /** Access inside a method invocation. Boolean value, true if this invocation is a stub. */
    isSimulation: boolean;
    /** The id of the user that made this method call, or `null` if no user was logged in. */
    userId: string | null;
    /**
     * Access inside a method invocation. The connection that this method was received on. `null` if the method is not associated with a connection, eg. a server initiated method call. Calls
     * to methods made from a server method which was in turn initiated from the client share the same `connection`. */
    connection: BaseMeteor.Connection | null;
    /**
     * Set the logged in user.
     * @param userId The value that should be returned by `userId` on this connection.
     */
    setUserId(userId: string | null): void;
    /** Call inside a method invocation. Allow subsequent method from this client to begin running in a new fiber. */
    unblock(): void;
  }

  /**
   * Defines functions that can be invoked over the network by clients.
   * @param methods Dictionary whose keys are method names and values are functions.
   */
  function methods(methods: {
    [key: string]: (this: MethodThisType, ...args: any[]) => any;
  }): void;

  /**
   * Invokes a method passing any number of arguments.
   * @param name Name of method to invoke
   * @param args Optional method arguments
   */
  function call(name: string, ...args: any[]): any;

  function apply<
    Result extends
      | EJSONable
      | EJSONable[]
      | EJSONableProperty
      | EJSONableProperty[]
  >(
    name: string,
    args: ReadonlyArray<EJSONable | EJSONableProperty>,
    options?: {
      wait?: boolean | undefined;
      onResultReceived?:
        | ((
            error: global_Error | BaseMeteor.Error | undefined,
            result?: Result
          ) => void)
        | undefined;
      /**
       * (Client only) if true, don't send this method again on reload, simply call the callback an error with the error code 'invocation-failed'.
       */
      noRetry?: boolean | undefined;
      returnStubValue?: boolean | undefined;
      throwStubExceptions?: boolean | undefined;
    },
    asyncCallback?: (
      error: global_Error | BaseMeteor.Error | undefined,
      result?: Result
    ) => void
  ): any;
  /** Method **/
}

export namespace DDPCommon {
  interface MethodInvocationOptions {
    userId: string | null;
    setUserId?: ((newUserId: string) => void) | undefined;
    isSimulation: boolean;
    connection: BaseMeteor.Connection;
    randomSeed: string;
  }

  /** The state for a single invocation of a method, referenced by this inside a method definition. */
  interface MethodInvocation {
    new (options: MethodInvocationOptions): MethodInvocation;
    /**
     * Call inside a method invocation.  Allow subsequent method from this client to begin running in a new fiber.
     */
    unblock(): void;
    /**
     * Set the logged in user.
     * @param userId The value that should be returned by `userId` on this connection.
     */
    setUserId(userId: string | null): void;
    /**
     * The id of the user that made this method call, or `null` if no user was logged in.
     */
    userId: string | null;
    /**
     * Access inside a method invocation.  Boolean value, true if this invocation is a stub.
     */
    isSimulation: boolean;
    /**
     * Access inside a method invocation. The [connection](#meteor_onconnection) that this method was received on. `null` if the method is not associated with a connection, eg. a server
     * initiated method call. Calls to methods made from a server method which was in turn initiated from the client share the same `connection`.
     */
    connection: BaseMeteor.Connection;
  }

  /** Connection **/
  function reconnect(): void;

  function disconnect(): void;
  /** Connection **/

  /** Status **/
  function status(): DDP.DDPStatus;
  /** Status **/
}
