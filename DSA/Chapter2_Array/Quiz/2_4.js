class Word {
	constructor(name) {
		this.name = name;
		this.chars = [].concat(this.name.split(''));
	}
	
	add(char) {
		this.chars.push(char);
		return this;
	}
	
	show() {
		console.log(this.chars.join(''));
	}
}

const fancy = new Word('fancy');

fancy.add('i').add('s').add('g').add('o').add('o').add('d');

console.log(fancy.chars);

fancy.show();

process.exit();
