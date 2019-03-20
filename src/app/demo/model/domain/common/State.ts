export interface State {
    id;
    name;
}

export const UNKNOWN: State = {id: 'unknown', name: 'Unbekannt'};
export const VALID: State = {id: 'valid', name: 'Gültig'};
export const DELETED: State = {id: 'deleted', name: 'Gelöscht'};

export const ALL_STATES: State [] = [UNKNOWN, VALID, DELETED];

export const MEASUREMENT_PART_MAPPING: Map<string, State> =
    new Map([
        [UNKNOWN.id, UNKNOWN],
        [VALID.id, VALID],
        [DELETED.id, DELETED]
    ]);

export function f(candidate: string): State {

    if (candidate) {
        const key = candidate.trim().toLowerCase();

        if (MEASUREMENT_PART_MAPPING.has(key)) {
            return MEASUREMENT_PART_MAPPING.get(candidate);
        }

    }

    return UNKNOWN;

}

