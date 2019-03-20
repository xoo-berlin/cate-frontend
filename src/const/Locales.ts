// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.staging.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {LocaleSettings} from 'primeng/primeng';

export class Locales {

    public static get localeDE(): LocaleSettings {
        return {
            firstDayOfWeek: 0,
            dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Sonnabend'],
            dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            monthNames: ['Januar', 'Februar', 'März',
                'April', 'Mai', 'Juni', 'Juli',
                'August', 'September',
                'Oktober', 'November', 'Dezember'],
            monthNamesShort: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            today: 'Heute',
            clear: 'Löschen'
        };

    }


}
