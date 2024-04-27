export interface CrudPort<ENTITY> {
    getById: (id: string) => Promise<ENTITY>;
    create: (dto: Omit<ENTITY, 'id' | 'createdAt'>) => Promise<ENTITY>;
    updateById: (id: string, dto: Partial<Omit<ENTITY, 'id'>>) => Promise<ENTITY>;
    deleteByIds: (ids: string[]) => Promise<boolean>;
}
