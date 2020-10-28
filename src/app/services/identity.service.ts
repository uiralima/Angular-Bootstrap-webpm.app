import { Observable } from 'rxjs';
import { User } from '../models/user.models';

export interface IIdentityService {
    registerByEmailAndPassword(email: string, password: string): Observable<User>;
    login(email: string, password: string): Observable<User>;
    logoff(): Observable<any>;
    isAuthenticated(): boolean;
    readonly currentUser: User;
    loaded(): Observable<boolean>;
}