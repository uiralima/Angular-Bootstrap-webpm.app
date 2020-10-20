export class AppContext {
    public constructor(
        private _isTest: boolean
    ) {}

    public get isTest(): boolean {
        return this._isTest;
    }
}

export class ContextFactoty {
    public static CreateContext(isTest: boolean) : AppContext {
        return new AppContext(isTest);
    }
}