import { VCalendar } from '~/components/v-calendar';
import { PARAMETER, PROPERTY, VALUE_DATA_TYPE } from '~/constant';
import { foldLine, getTimezoneOffset, propertyParameterToString } from '~/helper';
import { PropertyImpl } from '~/interfaces/property-impl';
import { Property } from '~/properties/property';
import { DateValue } from '~/values/date';
import { DateTimeValue } from '~/values/date-time';
import { TextValue } from '~/values/text';

export class RecurrenceId extends Property implements PropertyImpl<DateValue | DateTimeValue> {
	public type = PROPERTY.RecurrenceId;
	public value!: DateValue | DateTimeValue;
	public parameters = {
		Range: null as TextValue | null,
		TZID: null as TextValue | null,
		Value: null as TextValue | null,
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public evaluate(calendar: VCalendar): void {
		// set parameters
		if (this.token.parameters) {
			this.token.parameters.map((param) => {
				switch (param.name) {
					case PARAMETER.Range:
						this.parameters.Range = new TextValue().setValue(param.value);
						break;
					case PARAMETER.TZID:
						this.parameters.TZID = new TextValue().setValue(param.value);
						break;
					case PARAMETER.Value:
						this.parameters.Value = new TextValue().setValue(param.value);
						break;
				}
			});
		}
		// get timezone
		const tz = getTimezoneOffset(calendar, this.parameters.TZID?.getValue() || null);
		// set value
		if (this.parameters.Value?.getValue() === VALUE_DATA_TYPE.Date) {
			this.value = new DateValue().setValue(this.token.value).convertFromTZ(tz);
		} else {
			this.value = new DateTimeValue().setValue(this.token.value).convertFromTZ(tz);
		}
	}

	public toString(): string {
		const paramStr = propertyParameterToString(this.parameters);
		return foldLine(`${this.type}${paramStr}:${this.value.toString()}`);
	}
}
