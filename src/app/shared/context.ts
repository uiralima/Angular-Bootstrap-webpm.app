export class AppContext {
    public constructor(
        private _isTest: boolean,
        private _fakeServer: boolean = false
    ) {}

    public get isTest(): boolean {
        return this._isTest;
    }

    
    public get fakeServer() : boolean {
        return this._fakeServer;
    }
    
}

export class ContextFactoty {
    public static CreateContext(isTest: boolean) : AppContext {
        return new AppContext(isTest, true);
    }
}