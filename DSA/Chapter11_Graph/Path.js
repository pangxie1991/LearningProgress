// *
// 最短路径算法是基于广度优先搜索的, 因为广度优先搜索的本意就是逐层递进, 即路径从短到长.
// --------------------------------------------------------------------------------

import Base from './Graph'

class Graph extends Base {
	constructor(n) {
		super(n);
		this._edgeTo = [];
		this._marked = [];
		for (let i = 0; i < n; i++) {
			this._marked[i] = false;
		}
	}
	
	bfs(s) {
		const queue = [];
		this._marked[s] = true;
		queue.push(s);
		while (queue.length > 0) {
			let v = queue.shift();
			if (this._adj[v] !== undefined) {        
			    console.log(`Visited vertex: ${v}`);
			}
			for (let w of this._adj[v]) {
			    if (!this._marked[w]) {        
			        this._marked[w] = true;
					this._edgeTo[w] = v;
					queue.push(w);
			    }
			}
		}
	}
	
	hasPathTo(v) {
		return this._marked[v];
	}
	
	pathTo(v) {
		let source = 0;
		if (!this.hasPathTo(v)) {        
		    return undefined;
		}
		var path = [];
		for (let i = v; i !== source; i = this._edgeTo[i]) {
		    path.push(i);
		}
		path.push(source);
		return path;
	}
}
