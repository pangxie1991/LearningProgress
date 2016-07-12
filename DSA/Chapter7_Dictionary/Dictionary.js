class Dictionary extends Map {
	showAll() {
		for (let [key, value] of this.entries()) {
		    console.log(`${key}:${value}`);
		}
	}
	
	count() {
		let i = 0;
		for (let key of this.keys()) {
		    i++;
		}
		return i;
	}
	
	clear() {
		for (let key of this.keys()) {
			this.remove(key);
		}
	}
}

/*
const test = new Dictionary();

test.set('fancy', 15959287039);
test.set('papa', 13814408038);
test.set('CD', 13880023744);

console.log(test.count());
*/

export default Dictionary
