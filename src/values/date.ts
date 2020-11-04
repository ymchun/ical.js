import { parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { VALUE_DATA_TYPE } from '~/constant';
import { formatDate } from '~/helper';
import { Value } from '~/values/value';

export class DateValue extends Value<Date> {
	public type = VALUE_DATA_TYPE.Date;
	private value!: Date;

	public getValue(): Date {
		return this.value;
	}

	public setValue(value: string): this {
		this.value = parseISO(value);
		return this;
	}

	public convertFromTZ(tz: string): this {
		this.value = zonedTimeToUtc(this.value, tz);
		return this;
	}

	public toString(): string {
		return formatDate(this.value);
	}
}
