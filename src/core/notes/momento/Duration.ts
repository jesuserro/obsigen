export class Duration {
    days: number;
    hours: number;
    minutes: number;

    constructor(totalMinutes: number) {
        this.days = Math.floor(totalMinutes / (60 * 24));
        totalMinutes %= 60 * 24;
        this.hours = Math.floor(totalMinutes / 60);
        this.minutes = totalMinutes % 60;
    }

    toString(): string {
        let parts: string[] = [];
        if (this.days > 0) {
            parts.push(`${this.days}d`);
        }
        if (this.hours > 0) {
            parts.push(`${this.hours}h`);
        }
        if (this.minutes > 0 || parts.length === 0) { // always show minutes if it's the only unit
            parts.push(`${this.minutes}m`);
        }
        return parts.join(' ');
    }
}