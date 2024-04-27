export interface User {
    id: string;
    login: string;
    passwordhash: string;
    avaUrl?: string;
    createdAt: string;
    role: string;
    classId: string;
}
