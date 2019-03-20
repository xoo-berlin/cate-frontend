export interface HistoryItem {
    id?: number;

    createdOn?;
    updatedOn?;
    deletedOn?;
    createdBy?: string;
    updatedBy?: string;
    deletedBy?: string;
    entityState?: string;
    rowVersion?: number;

    entityClass?: string;
    entityId?: number;
    field?: string;
    valueOld?: string;
    valueNew?: string;
}
