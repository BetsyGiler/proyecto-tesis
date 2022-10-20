/**
 * @T is the return datatype, @P is the parameter datatype and 
 * @R is the repository datatype
 */
abstract class UseCase<T, P, R> {
	public repository: R;
	constructor(repository: R) {
		this.repository = repository;
	}

	abstract call(params: P): Promise<T>;
}

export default UseCase;
