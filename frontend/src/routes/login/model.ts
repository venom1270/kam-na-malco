export type User = {
    id: number,
    username: string,
    password: string,
    created_at: number
};

export function toUserType(data: any) : User {
    return data?.map((res: any) : User => {
        return {
            id: res.id,
            username: res.username,
            password: res.password,
            created_at: res.created_at
        }
    });
}