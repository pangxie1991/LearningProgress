// *
// js中的数组本质上是对象, 相比将数组定义在更底层的语言(Java, C++)其效率天生就不占优势.
// 相比于数组, 链表更适合作为不需要随机访问的一维数据结构.
// 链表的插入和删除相比较数组需要的操作而言更加简单, 其在广义上表现为离散的, 通过链也就是引用进行组织.
// --------------------------------------------------------------------------------
import {Node} from './Node'

export class LinkedList {

	constructor() {
		this._head = new Node('_head');
		this._curr = this._head;
	}
	
	head() {
		return this._head;
	}
	
	find(item) {
		let curr = this._head;
		while(curr && curr.element !== item) {
			curr = curr._next;
		}
		if (curr) {        
		    this._curr = curr;
			return curr;
		} else {
			console.log(`There is no ${item} in this LinkedList`);
			return null;
		}
	}

	findPrev(item) {
		let prev = this._head;
		while (prev._next && prev._next.element !== item) {
			prev = prev._next;
		}
		
		return prev._next ? prev : console.log(`There is no ${item} in this LinkedList`);
	}

	insert(element, item) {
		const newNode = new Node(element);
		const curr = this.find(item);
		if (curr) {
			[newNode._next, curr._next] = [curr._next, newNode];
			return this;
		}
	}

	display() {
		let curr = this._head;
		while (curr._next) {
			console.log(curr._next.element);
			curr = curr._next;
		}
	}

	remove(item) {
		if (this._head.element === item) {
			if (this._head._next) {
				this._head = this._head._next;
			} else {
				throw {
					message: 'Only head in the List'
				}
			}
		} else {
			let prev = this.findPrev(item);
			if (prev && prev._next) {
				prev._next = prev._next._next;
				return this;
			}
		}
	}

	findLast() {
		let curr = this._head;
		while(curr._next) {
			curr = curr._next;
		}
		return curr;
	}

	append(element) {
		const tail = this.findLast();
		tail._next = new Node(element);
		return this;
	}
}

/*
const test = new LinkedList();


test.append('la').append('ma').append('na').insert('ka', 'la');

test.remove('ma');

test.display();
 */

