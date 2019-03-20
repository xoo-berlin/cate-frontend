export interface Page<T> {
    page?;
    size?;
    totalPages?;
    totalElements?;
    items?: T[];
}
