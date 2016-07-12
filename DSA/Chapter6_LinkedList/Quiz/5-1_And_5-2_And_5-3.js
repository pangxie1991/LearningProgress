import {LinkedList as List} from '../LinkedList'

class QuizList extends List {
	
	advance(n) {
		for (let i = 0; i < n; i++) {
		    if (this._curr.element !== '_head') {        
		        this._curr = this.findPrev(this._curr.element)
		    } else {
				this._curr = this._head;
				return console.log('Out ranged');
			}
		}
		
		return this._curr.element;
	}
	
	back(n) {
		for (let i = 0; i< n ; i++) {
		    if (this._curr._next) {        
		        this._curr = this._curr._next;
		    } else {
				console.log('Out ranged');
				break;
			}
		}
		return this._curr.element;
	}
	
	show() {
		console.log(this._curr.element);
	}
}



const test = new QuizList();


test.append('la').append('ma').append('na').insert('ka', 'la');

test.find('na');

let a = test.advance(2).element;

test.display();

console.log(a);

console.log(test.advance(2).element);

