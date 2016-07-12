import {Node} from './Node'

export class CircularList {

	constructor(element) {
		this._head = new Node(element);
		this._head._next = this._head;
	}
	
	head() {
		return this._head;
	}

	find(item) {
		let curr = this._head;
		if (item === curr.element) {
		    return curr
		} else {
			do {
				curr = curr._next;
			} while (curr !== this._head && curr.element !== item)
		}

		return curr.element === item ? curr : console.log(`no ${item} in the list`);
	}

	findPrev(item) {
		let prev = this._head;
		if (item === prev._next.element) {
		    return prev
		} else {
			do {
				prev = prev._next;
			} while(prev!== this._head && prev._next.element !== item)
		}

		return prev._next.element === item ? prev : console.log(`no ${item} in the list`);
	}

	display() {
		let curr = this._head;
		do {
			console.log(curr.element);
			curr = curr._next;
		} while (curr !== this._head);
	}

	insert(element, item) {
		const curr = this.find(item);
		const temp = new Node(element);
		[curr._next, temp._next] = [temp, curr._next];
	}
	
	remove(item) {
		const curr = this.find(item);
		const prev = this.findPrev(item);
		if (curr === this._head) {        
		    this._head = this._head._next;
		}
		prev._next = curr._next;
	}

	findLast() {
		let curr = this._head;
		while(curr._next !== this._head) {
			curr = curr._next;
		}
		return curr;
	}
	
	push(element) {
		const last = this.findLast();
		const temp = new Node(element);
		[last._next, temp._next] = [temp, last._next];
	}

	getLength() {
		let result = 0;
		let curr = this._head;
		do {
			result++;
			curr = curr._next;
		} while(curr !== this._head);
		return result;
	}
	
	show(item) {
		const temp = this.find(item);
		let curr = temp;
		do {
			console.log(curr.element);
			curr = curr._next;
		} while(curr !== temp);
	}
}
