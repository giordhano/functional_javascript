/*  
	A partir de un archivo con un registro de ventas (data.txt) se quiere obtener un resumen por cliente y producto.
	
	Pasar de esto:

	8484	0001	10	3
	8484	0008	35	6
	8484	0002	3	6
	2133	0006	17	4
	3330	0001	10	8
	8484	0007	9	3 

	a esto: 

		{ 
			'8484':
			   { '0001': { quantity: 710, total: 7100, counter: 141 },
			     '0008': { quantity: 640, total: 22400, counter: 126 },
			     '0002': { quantity: 601, total: 1803, counter: 127 } 
			    }
		}

	Usando Map y reduce 

*/ 
 
const fs = require('fs')

var salesData = fs.readFileSync('data.txt', 'utf8')
	.trim()
	.split('\n')
	.map(line => line.split('\t') )
	.reduce( (custumers, line) => {
 
		custumers[line[0]] = custumers[line[0]] || {}

		custumers[line[0]][line[1]] = custumers[line[0]][line[1]] || { 'quantity' : 0, 'total' : 0, 'counter' : 0 }

		let custumerProduct = custumers[line[0]][line[1]]

		custumerProduct.quantity+=parseFloat(line[3])
		custumerProduct.total+=parseFloat(line[2]) * parseFloat(line[3])
		custumerProduct.counter+=1
   
		return custumers

	}, {} )

console.log(salesData) 

console.log(process.memoryUsage())
 