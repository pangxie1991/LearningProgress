class CustomSet extends Set {
	union(anotherSet) {
		return new CustomSet([...this, ...anotherSet]);
	}

	diff(anotherSet) {
		return new CustomSet([...this].filter(x => !anotherSet.has(x)));
	}

	intersect(anotherSet) {
		return new CustomSet([...this].filter(x => anotherSet.has(x)));
	}

	isSubset(mainSet) {
		return  [...this].every(x => mainSet.has(x));
	}

	show () {
		console.log([...this]);
	}
}

export default CustomSet

/*
const a = new CustomSet(),  c = new CustomSet();

[...'fancy is a good guy'].map( x => {a.add(x)});
[...'linFatZ'].map(x => {c.add(x)});

const union = a.union(c);
const diff = a.diff(c);
const inter = a.intersect(c);
const bool = diff.isSubset(a);
const anotherBool = c.isSubset(a);

union.show();
console.log('\n');
diff.show();
console.log('\n');
inter.show();
console.log('\n');
console.log(bool, anotherBool);
*/

