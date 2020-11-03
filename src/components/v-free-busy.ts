import { Component } from '~/components/component';
import { COMPONENT, ICS_LINE_BREAK, KEYWORD, PROPERTY } from '~/constant';
import { ComponentImpl } from '~/interfaces/component-impl';
import { Attendee } from '~/properties/attendee';
import { Comment } from '~/properties/comment';
import { Contact } from '~/properties/contact';
import { DateTimeEnd } from '~/properties/date-time-end';
import { DateTimeStamp } from '~/properties/date-time-stamp';
import { DateTimeStart } from '~/properties/date-time-start';
import { FreeBusy } from '~/properties/free-busy';
import { Organizer } from '~/properties/organizer';
import { Property } from '~/properties/property';
import { UID } from '~/properties/uid';
import { Url } from '~/properties/url';

export class VFreeBusy extends Component implements ComponentImpl {
	public type = COMPONENT.FreeBusy;

	// properties

	// The following are REQUIRED
	// but MUST NOT occur more than once
	public dtStamp!: DateTimeStamp;
	public uid!: UID;

	// The following are OPTIONAL
	// but MUST NOT occur more than once
	public contact!: Contact;
	public dtEnd!: DateTimeEnd;
	public dtStart!: DateTimeStart;
	public organizer!: Organizer;
	public url!: Url;

	// The following are OPTIONAL
	// and MAY occur more than once
	public attendees!: Attendee[];
	public comments!: Comment[];
	public freeBusy!: FreeBusy[];

	public setProperty(property: Property): void {
		switch (property.type) {
			case PROPERTY.DTStamp:
				this.dtStamp = property as DateTimeStamp;
				break;
			case PROPERTY.UID:
				this.uid = property as UID;
				break;

			case PROPERTY.Contact:
				this.contact = property as Contact;
				break;
			case PROPERTY.DTEnd:
				this.dtEnd = property as DateTimeEnd;
				break;
			case PROPERTY.DTStart:
				this.dtStart = property as DateTimeStart;
				break;
			case PROPERTY.Organizer:
				this.organizer = property as Organizer;
				break;
			case PROPERTY.Url:
				this.url = property as Url;
				break;

			case PROPERTY.Attendee:
				this.attendees = this.attendees || [];
				this.attendees.push(property as Attendee);
				break;
			case PROPERTY.Comment:
				this.comments = this.comments || [];
				this.comments.push(property as Comment);
				break;
			case PROPERTY.FreeBusy:
				this.freeBusy = this.freeBusy || [];
				this.freeBusy.push(property as FreeBusy);
				break;
		}
	}

	public toString(excludeBeginEnd = false): string {
		// result array
		const lines: string[] = [];

		// push properties

		if (this.dtStamp) {
			lines.push(this.dtStamp.toString());
		}
		if (this.uid) {
			lines.push(this.uid.toString());
		}

		if (this.contact) {
			lines.push(this.contact.toString());
		}
		if (this.dtEnd) {
			lines.push(this.dtEnd.toString());
		}
		if (this.dtStart) {
			lines.push(this.dtStart.toString());
		}
		if (this.organizer) {
			lines.push(this.organizer.toString());
		}
		if (this.url) {
			lines.push(this.url.toString());
		}

		if (this.attendees) {
			lines.push(...this.attendees.map((p) => p.toString()));
		}
		if (this.comments) {
			lines.push(...this.comments.map((p) => p.toString()));
		}
		if (this.freeBusy) {
			lines.push(...this.freeBusy.map((p) => p.toString()));
		}

		// do not include component begin / end tag
		if (excludeBeginEnd) {
			return lines.join(ICS_LINE_BREAK);
		}

		// push begin tag
		lines.unshift(`${KEYWORD.Begin}:${this.type}`);
		// push end tag
		lines.push(`${KEYWORD.End}:${this.type}`);

		return lines.join(ICS_LINE_BREAK);
	}
}
