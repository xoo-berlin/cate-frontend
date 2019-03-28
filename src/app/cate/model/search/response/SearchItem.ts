import {KeyValue} from '../../common/KeyValue';

export interface SearchItem {
    id?: string;
    name?: string;

    gender?: string;
    title?: string;
    firstName?: string;
    lastName?: string;

    email?: string;
    phone?: string;
    mobile?: string;
    fax?: string;


    buildingId?: string;
    buildingName?: string;

    street?: string;
    streetNumber?: string;
    room?: string;
    zipCode?: string;
    city?: string;

    // assignment
    assignmentNumeric?: string;
    assignmentLetter?: string;
    assignmentRegion?: string;

    m?: Map<string, string>;

    userIds?: KeyValue<string, string>[];

    // debug
    dbgScoreOV?: number;
    dbgAssignmentFirst?: string;
}
