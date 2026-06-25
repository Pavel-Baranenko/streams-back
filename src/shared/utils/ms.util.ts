const s = 1000
const m = s * 60
const h = m * 60
const d = h * 24
const w = d * 7
const y = d * 365.25

type Unit =
	| 'Years'
	| 'Year'
	| 'Yrs'
	| 'Yr'
	| 'Y'
	| 'Weeks'
	| 'Week'
	| 'Wks'
	| 'Wk'
	| 'W'
	| 'Days'
	| 'Day'
	| 'D'
	| 'Hours'
	| 'Hour'
	| 'Hrs'
	| 'Hr'
	| 'H'
	| 'Minutes'
	| 'Minute'
	| 'Mins'
	| 'Min'
	| 'M'
	| 'Seconds'
	| 'Second'
	| 'Secs'
	| 'Sec'
	| 'S'
	| 'Milliseconds'
	| 'Millisecond'
	| 'Ms'

type UnitAnyCase = Unit | Lowercase<Unit> | Uppercase<Unit>

export type StringValue =
	| `${number}`
	| `${number}${UnitAnyCase}`
	| `${number} ${UnitAnyCase}`

// ms.util.ts
export function ms(str: StringValue): number {
	if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
		throw new Error(
			'Value must be a non-empty string less than 100 characters long for ms function'
		)
	}

	// ✅ Добавляем именованные группы (?<value>...) и (?<type>...)
	const match =
		/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
			str
		)

	if (!match) {
		throw new Error(`Invalid time string: "${str}"`)
	}

	// ✅ Извлекаем значения из match (без .groups)
	const value = match[1] // первая группа - число
	const type = (match[2] || 'ms').toLowerCase() // вторая группа - единица измерения

	const n = parseFloat(value)
	if (isNaN(n) || n <= 0) {
		throw new Error(`Invalid number in time string: "${str}"`)
	}

	switch (type) {
		case 'years':
		case 'year':
		case 'yrs':
		case 'yr':
		case 'y':
			return n * y
		case 'weeks':
		case 'week':
		case 'wks':
		case 'wk':
		case 'w':
			return n * w
		case 'days':
		case 'day':
		case 'd':
			return n * d
		case 'hours':
		case 'hour':
		case 'hrs':
		case 'hr':
		case 'h':
			return n * h
		case 'minutes':
		case 'minute':
		case 'mins':
		case 'min':
		case 'm':
			return n * m
		case 'seconds':
		case 'second':
		case 'secs':
		case 'sec':
		case 's':
			return n * s
		case 'milliseconds':
		case 'millisecond':
		case 'msecs':
		case 'msec':
		case 'ms':
			return n
		default:
			throw new Error(`Unknown unit type: "${type}" in string: "${str}"`)
	}
}
