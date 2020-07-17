const preserveCamelCase = string => {
	let isLastCharLower = false
	let isLastCharUpper = false
	let isLastLastCharUpper = false

	for (let i = 0; i < string.length; i++) {
		const character = string[i]

		if (isLastCharLower && /[\p{Lu}]/u.test(character)) {
			string = string.slice(0, i) + '-' + string.slice(i)
			isLastCharLower = false
			isLastLastCharUpper = isLastCharUpper
			isLastCharUpper = true
			i++
		} else if (isLastCharUpper && isLastLastCharUpper && /[\p{Ll}]/u.test(character)) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1)
			isLastLastCharUpper = isLastCharUpper
			isLastCharUpper = false
			isLastCharLower = true
		} else {
			isLastCharLower = character.toLocaleLowerCase() === character && character.toLocaleUpperCase() !== character
			isLastLastCharUpper = isLastCharUpper
			isLastCharUpper = character.toLocaleUpperCase() === character && character.toLocaleLowerCase() !== character
		}
	}

	return string
}

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`')
	}

	options = {
		...{pascalCase: false},
		...options
	}

	const postProcess = x => options.pascalCase ? x.charAt(0).toLocaleUpperCase() + x.slice(1) : x

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-')
	} else {
		input = input.trim()
	}

	if (input.length === 0) {
		return ''
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toLocaleUpperCase() : input.toLocaleLowerCase()
	}

	const hasUpperCase = input !== input.toLocaleLowerCase()

	if (hasUpperCase) {
		input = preserveCamelCase(input)
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLocaleLowerCase()
		.replace(/[_.\- ]+([\p{Alpha}\p{N}_]|$)/gu, (_, p1) => p1.toLocaleUpperCase())
		.replace(/\d+([\p{Alpha}\p{N}_]|$)/gu, m => m.toLocaleUpperCase())

	return postProcess(input)
}

const caps = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const stringifyProps = (obj) => {
	const clone = { }
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			clone[key] = JSON.stringify(obj[key])
		}
	}

	return clone
}

const removeNull = (obj) => {
	const clone = {}
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const val = obj[key]
			if (!(val === undefined || val === null)) {
				if (typeof val === 'object') {
					if (Array.isArray(val)) {
						if (val.length > 0) {
							clone[key] = val
								.map(v => (typeof v === 'object') ? removeNull(v) : v)
						}
					} else {
						clone[key] = removeNull(val)
					}
				} else {
					clone[key] = val
				}
			}
		}
	}
	return clone
}

const pick = (obj, props, target, nullify = false) => {
	for (let index = 0; index < props.length; index++) {
		const key = props[index]
		const val = obj[key]
		if (nullify) {
			if (val) {
				target[key] = val
			}
		} else {
			target[key] = val
		}
	}
}

const pickCheck = (obj, must, optional) => {
	const clone = {}
	for (let index = 0; index < must.length; index++) {
		const key = must[index]
		const val = obj[key]
		if (val) {
			clone[key] = val
		} else {
			console.log(key, val)
			return null
		}
	}
	for (let index = 0; index < optional.length; index++) {
		const key = optional[index]
		const val = obj[key]
		if (val) {
			clone[key] = val
		}
	}
	return clone
}

module.exports = {
  camelCase,
  caps,
	stringifyProps,
	removeNull,
	pick,
	pickCheck
}
