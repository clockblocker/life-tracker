export type Maybe<T> =
	| { error: true; errorText?: string }
	| { error: false; data: T };
