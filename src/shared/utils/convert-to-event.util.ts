import { from, Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { EventResponse } from "@shared/types/event-response.type";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const convertToEvent = (event: string, databaseResponse: any): Observable<EventResponse> => 
    from(databaseResponse)
        .pipe(
            map(val => ({ event, value: null, error: val })),
            // catchError(val => of({ event, value: null, error: val }))
        );