import re
from math import sqrt
import sys

class STL:
	def __init__(self, name):
		self.name = name
		self.facets = []
	def __add__(self, facet):
		self.add_facet(facet)
	def add_facet(self, facet):
		self.facets.append(facet)
	def scale(self, x_scale, y_scale, z_scale):
		for facet in self.facets:
			facet.scale(x_scale, y_scale, z_scale)
	def vertices(self):
		for facet in self.facets:
			for vertex in facet.vertices:
				yield vertex

class Facet:
	def __init__(self, nx, ny, nz):
		self.vertices = []
		self.nx = nx
		self.ny = ny
		self.nz = nz
	def __add__(self, vertex):
		self.add_vertex(vertex)
	def add_vertex_points(self, x, y, z):
		self.vertices.append(Vertex(x, y, z))
	def add_vertex(self, vertex):
		self.vertices.append(vertex)
	def scale(self, x_scale, y_scale, z_scale):
		for vertex in self.vertices:
			vertex.scale(x_scale, y_scale, z_scale)

class Vertex:
	def __init__(self, x, y, z):
		self.x = x
		self.y = y
		self.z = z
	def scale(self, x_scale, y_scale, z_scale):
		self.x *= x_scale
		self.y *= y_scale
		self.z *= z_scale
	def rotate(self, x_degrees, y_degrees, z_degrees):
		pass
	def distance(self, v):
		return sqrt((self.x - v.x)**2 + (self.y - v.y)**2 + (self.z - v.z)**2)

def read_stl(file_name):
	model = open(file_name, 'r')
	stl = STL('')
	working_facet = Facet(0, 0, 0)
	for line in model:
		tokens = [s for s in re.split(' |\n', line) if len(s) > 0]
		if tokens[0] == 'solid':
			stl = STL(tokens[1])
		if tokens[0] == 'facet':
			nx = float(tokens[2])
			ny = float(tokens[3])
			nz = float(tokens[4])
			working_facet = Facet(nx, ny, nz)
		if tokens[0] == 'endfacet':
			stl.add_facet(working_facet)
		if tokens[0] == 'vertex':
			x = float(tokens[1])
			y = float(tokens[2])
			z = float(tokens[3])
			working_facet.add_vertex_points(x, y, z)
	model.close()
	return stl

def write_stl(file_name, stl):
	out_file = open(file_name, 'w')
	out_file.truncate()
	out_str = 'solid ' + stl.name + '\n'
	for f in stl.facets:
		out_str += '  facet normal {0} {1} {2}\n'.format(format(f.nx, 'e'), format(f.ny, 'e'), format(f.nz, 'e'))
		out_str += '    outer loop\n'
		for v in f.vertices:
			out_str += '      vertex   {0} {1} {2}\n'.format(format(v.x, 'e'), format(v.y, 'e'), format(v.z, 'e'))
		out_str += '    endloop\n'
		out_str += '  endfacet\n'
	out_str += "endsolid\n"
	out_file.write(out_str)
	out_file.close()

if len(sys.argv) != 3:
	print "file usage: " + argv[0] + " <x scale> <y scale>"
	sys.exit()

x = float(argv[1])
y = float(argv[2])
filename = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10)) + ".stl"

stl = read_stl('FingerCast.stl')
stl.scale(x, x, y)
write_stl(filename, stl)

print filename + " created"