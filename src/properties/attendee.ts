import { PARAMETER, PROPERTY } from '~/constant';
import { foldLine } from '~/helper';
import { PropertyImpl } from '~/interfaces/impl';
import { propertyParameterToString } from '~/internal-helper';
import { Property } from '~/properties/property';
import { BooleanValue } from '~/values/boolean';
import { CalAddressValue } from '~/values/cal-address';
import { TextValue } from '~/values/text';
import { URIValue } from '~/values/uri';

export class Attendee extends Property implements PropertyImpl<CalAddressValue> {
	public type = PROPERTY.Attendee;
	public value!: CalAddressValue;
	public parameters = {
		CN: null as TextValue | null,
		CUType: null as TextValue | null,
		DelegatedFrom: null as CalAddressValue[] | null,
		DelegatedTo: null as CalAddressValue[] | null,
		Dir: null as URIValue | null,
		Email: null as TextValue | null,
		Language: null as TextValue | null,
		Member: null as CalAddressValue | null,
		PartStat: null as TextValue | null,
		Role: null as TextValue | null,
		Rsvp: null as BooleanValue | null,
		SentBy: null as CalAddressValue | null,
	};

	public setValue(value: string): this {
		// set value
		this.value = new CalAddressValue().setValue(value);
		return this;
	}

	public setParameter(type: string, value: string): this {
		switch (type) {
			case PARAMETER.CN:
				this.parameters.CN = new TextValue().setValue(value);
				break;
			case PARAMETER.CUType:
				this.parameters.CUType = new TextValue().setValue(value);
				break;
			case PARAMETER.DelegatedFrom:
				this.parameters.DelegatedFrom = value.split(',').map((v) => new CalAddressValue().setValue(v));
				break;
			case PARAMETER.DelegatedTo:
				this.parameters.DelegatedTo = value.split(',').map((v) => new CalAddressValue().setValue(v));
				break;
			case PARAMETER.Dir:
				this.parameters.Dir = new URIValue().setValue(value);
				break;
			case PARAMETER.Email:
				this.parameters.Email = new TextValue().setValue(value);
				break;
			case PARAMETER.Language:
				this.parameters.Language = new TextValue().setValue(value);
				break;
			case PARAMETER.Member:
				this.parameters.Member = new CalAddressValue().setValue(value);
				break;
			case PARAMETER.PartStat:
				this.parameters.PartStat = new TextValue().setValue(value);
				break;
			case PARAMETER.Role:
				this.parameters.Role = new TextValue().setValue(value);
				break;
			case PARAMETER.Rsvp:
				this.parameters.Rsvp = new BooleanValue().setValue(value);
				break;
			case PARAMETER.SentBy:
				this.parameters.SentBy = new CalAddressValue().setValue(value);
				break;
		}
		return this;
	}

	public toString(): string {
		const paramStr = propertyParameterToString(this.parameters);
		return foldLine(`${this.type}${paramStr}:${this.value.toString()}`);
	}
}
