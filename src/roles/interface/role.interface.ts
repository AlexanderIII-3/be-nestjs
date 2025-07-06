export interface IRole {
    id?: string;
    name?: string;
    description?: string;
    is_active?: boolean;
    permissions?: string[];

}
export interface ICheckRoleExists {
    name?: string;
    id?: string;
}
