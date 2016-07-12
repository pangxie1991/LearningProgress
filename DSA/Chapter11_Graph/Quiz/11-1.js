import Graph from '../Final'

const {random, floor} = Math;

const randomEdge = (n, vNum) => {
	const arr = [];
	for (let i = 0; i < n; i++) {
		arr.push([floor(random()*vNum), floor(random()*vNum)]);
	}
	return arr;
};

function getTime (func, arg, n, g) {
	const start = new Date();
	for (let i = 0; i < n; i++) {
	    func(arg);
	}
	const result = func(arg);
	const end = new Date();
	console.log(result.length);
	console.log(`with ${g.vertexNum} vertices and ${g._edges} edges\n ${func.name} run ${n + 1} times take ${end-start} ms`);
}

const getGraph = (vNum, eNum) => {
	const g = new Graph(vNum);
	const args = randomEdge(eNum, vNum);
	args.map(x => {g.addEdge(...x)});
	return g;
};

const test = getGraph(15,450);

getTime(test.bfs.bind(test), 0, 20, test);

getTime(test.dfs.bind(test), 0, 20, test);
