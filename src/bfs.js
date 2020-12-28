const TRAVERSABLE_TYPES = new Set(['object', 'function']);

const isDOMElement = typeof Element === 'undefined' ? () => false : value => value instanceof Element;

const isNil = value => value == null; // eslint-disable-line no-eq-null

function log() {
	// eslint-disable-next-line prefer-rest-params, no-console, prefer-spread
	console.log.apply(console, ['%c BFS ', 'background:#35495e; padding:2px; border-radius:3px; color:#fff'].concat(Array.from(arguments)));
}

const { isPrototypeOf } = Object.prototype;
const isObject = object => typeof object === 'object' && object !== null;

// eslint-disable-next-line complexity
function visitNode([node, path], searchValue, queue, cache, silenceErrors) {
	let foundMatches = 0;

	const properties = Object.getOwnPropertyNames(node);

	// eslint-disable-next-line unicorn/no-for-loop, no-plusplus
	for (let i = 0; i < properties.length; i++) {
		const property = properties[i];
		const propertyPath = path + '.' + property; // eslint-disable-line prefer-template

		let value;
		try {
			value = node[property];
		} catch (error) {
			if (!silenceErrors) {
				log(`⚠️ Caught error traversing "${propertyPath}"`, error);
			}
		}

		if (
			isNil(value)
			|| isDOMElement(value)
			// Object.getOwnPropertyDescriptor(node, prop).get ||
			// prop.startsWith('_') ||
		) {
			continue;
		}

		if (
			value === searchValue

			// TODO: Add option to check for inheritance, does value inherit searchValue?
			|| (isObject(searchValue) && isObject(value) && isPrototypeOf.call(searchValue, value))
		) {
			log('👉 Found:', propertyPath);
			foundMatches++; // eslint-disable-line no-plusplus
		} else if (
			TRAVERSABLE_TYPES.has(typeof value)

			// TODO: if encounterd a loop, add to output to show an alternative path w/o re-traversing
			&& !cache.has(value)
		) {
			cache.add(value);
			queue.push([value, propertyPath]);
		}
	}

	return foundMatches;
}

function BFS(sourceNode, searchValue, options = {}) {
	const {
		timeout = 10000,
		maxFinds = 100,
		silenceErrors = true,
	} = options;

	log('Starting traversal', {
		'Source node': sourceNode,
		'Search value': searchValue,
	});

	const startTime = Date.now();
	const cache = new Set([sourceNode]);
	const queue = [[sourceNode, '']];

	let findCount = 0;

	const logUpdate = () => {
		log('💁‍♀️', {
			Searched: `${cache.size.toLocaleString()} nodes`,
			'Remaining in queue': `${queue.length.toLocaleString()} nodes`,
		});
	};

	const updateLogger = setInterval(logUpdate, 2000);

	const end = (exitMessage) => {
		clearInterval(updateLogger);
		log(exitMessage);
	};

	// eslint-disable-next-line consistent-return
	(function processNextNode() {
		const nodeData = queue.shift(); // Might also be faster to pick a random one
		const elapsed = (Date.now() - startTime);

		if (!nodeData) {
			return end(`✅ Completed traversal in ${elapsed.toLocaleString()}ms and found ${findCount} path(s)`);
		}

		if ((Date.now() - startTime) > timeout) {
			return end(`⚠️ Timeout ${timeout.toLocaleString()}ms`);
		}

		if (findCount >= maxFinds) {
			return end(`⚠️ Hit max finds ${maxFinds.toLocaleString()}`);
		}

		findCount += visitNode(nodeData, searchValue, queue, cache, silenceErrors);

		setTimeout(processNextNode, 0);
	})();
}

export default BFS;
