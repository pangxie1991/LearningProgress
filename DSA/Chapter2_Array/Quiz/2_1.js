class Student {
	constructor(name) {
		this.name = name;
		this.scoreStore = [];
	}
	
	getName() {
		return this.name;
	}
	
	add(score) {
		this.scoreStore.push(score);
		
		return this;
	}
	
	getAverageScore() {
		let sum = this.scoreStore.reduce((sum, score) => {
			sum += score;
			return sum;
		});
		
		return (sum/this.scoreStore.length).toFixed(1);
	}
}

const fancy = new Student('fancy');

fancy.add(100).add(98).add(96).add(42);

console.log(fancy.getAverageScore());

export default Student

process.exit();
