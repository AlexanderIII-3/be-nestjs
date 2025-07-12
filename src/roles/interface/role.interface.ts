export interface IRole {
    id?: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    permissions?: string[];

}
export interface ICheckRoleExists {
    name?: string;
    id?: string;
}
