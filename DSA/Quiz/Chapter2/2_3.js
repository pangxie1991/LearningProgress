class weekTemps {
	constructor () {
		this.dataStore = [];
	}

	add (temp) {
		this.dataStore.push(temp);
		return this;
	}
	
	getSum () {
		return this.dataStore.reduce((sum, temp) => {
			sum += temp;
			return sum;
		});
	}
	
	getDayNum() {
		return this.dataStore.length;
	}

	getWeekAverage () {
		let sum = this.dataStore.reduce((sum, temp) => {
			sum += temp;
			return sum;
		});
		
		return (sum/this.getDayNum()).toFixed(2);
	}
}

class mouthTemps {
	constructor () {
		this.weeks = [];
		this.weekAverages = [];
	}
	
	add (week) {
		this.weeks.push(week);
		this.weekAverages.push(week.getWeekAverage());
		return this;
	}
	
	getTotalAverage () {
		let sum = 0,
			dayNum = 0;
		this.weeks.forEach((value) => {
			sum += value.getSum();
			dayNum += value.getDayNum();
		});
		
		return (sum/dayNum).toFixed(2);
	}
}

const firstWeek = new weekTemps();

firstWeek.add(28).add(31).add(27).add(33).add(25).add(17).add(22);

const secondWeek = new weekTemps();

secondWeek.add(15).add(17).add(25).add(30);

const jan = new mouthTemps();

jan.add(firstWeek).add(secondWeek);

console.log(jan.getTotalAverage());
console.log(String(jan.weekAverages));

process.exit();
