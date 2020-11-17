import numpy as np
import osmnx as ox 
import networkx as nx

def distance(lat1, long1, lat2, long2):
    # Computes the straight line distance (in feet) between 
    # two points, given their latitudes and longitudes.
    lat1_R = np.radians(lat1)
    long1_R = np.radians(long1)
    lat2_R = np.radians(lat2)
    long2_R = np.radians(long2)

    # Haversine formula
    delta_lat = lat1_R - lat2_R
    delta_lon = long1_R - long2_R 
    a = np.sin(delta_lat/2)**2 + np.cos(lat1_R)*np.cos(lat2_R)*np.sin(delta_lon/2)**2

    r = 3956   # Earth's radius in miles

    return 2 * np.arcsin(np.sqrt(a)) * 5280*r

def get_closest_vertex(G, (lat, long)):
    # Find the closest vertex in the graph, given lat and long tuple
    return ox.get_nearest_node(G, (lat, long))

def distance(lat1, long1, lat2, long2):
    # Computes the straight line distance (in feet) between 
    # two points, given their latitudes and longitudes.
    lat1_R = np.radians(lat1)
    long1_R = np.radians(long1)
    lat2_R = np.radians(lat2)
    long2_R = np.radians(long2)

    # Haversine formula
    delta_lat = lat1_R - lat2_R
    delta_lon = long1_R - long2_R 
    a = np.sin(delta_lat/2)**2 + np.cos(lat1_R)*np.cos(lat2_R)*np.sin(delta_lon/2)**2

    r = 3956   # Earth's radius in miles

    return 2 * np.arcsin(np.sqrt(a)) * 5280*r

def get_closest_vertex(G, lat, long):
    # Find the closest vertex in the graph, given lat and long tuple
    return ox.get_nearest_node(G, (lat, long))

def Dijkstra(Graph, start, dest):
    # Vanilla Dijkstra that finds the shortest path from start to dest in a given graph. 
    # Displays no valid path if dest not reachable from start
    """
    Graph: a MultiDiGraph object with nodes, edges, and distances defined
    start: index of start vertex in the MultiDiGraph
    dest: index of destination vertex in the MultiDiGraph
    """
    min_heap = []
    touched = set()         # Maintains a set of nodes reachable from start, stop search when touched is empty
    dists = {start: 0}
    for node in list(Graph.adj[start]):
        weight = Graph.edges[start, node, 0]['dist']
        heappush(min_heap, (weight, (start, node)))
        touched.add(node)
        
    while len(touched) > 0:
        min_dist, (u, v) = heappop(min_heap)
        if v in dists.keys():     # Don't compute distance again
            continue
        dists[v] = min_dist
        touched.remove(v)
        if v == dest:
            print(f"The shortest path from {start} to {dest} is {min_dist}")
            return min_dist
        for node in list(Graph.adj[v]):
            if node not in dists.keys():
                weight = Graph.edges[v, node, 0]['dist']
                heappush(min_heap, (dists[v]+weight, (v, node)))
                touched.add(node)
    print(f"Path from start {start} to destination {dest} does not exist.")
    return -1

def A_star(Graph, start, dest, percent, min_elev=True):
    # A-star algorithm to find the optimal route that minimizes/maximizes the elevation gain,
    # which also within (1+percent) of the shortest route. 
    # This algorithm limits the search to intermediate vertices within the allowed distance.
    """
    Graph: a MultiDiGraph object with nodes, edges, and distances defined
    start: index of start vertex in the MultiDiGraph
    dest: index of destination vertex in the MultiDiGraph
    percent: extra distance percentage allowed to search
    min_elev: searches for path to minimize elevation gain if True, 
              searches for path to maximize elevation gain if False. 
              0 elev difference and negative elev difference are treated equally. 
    """
    min_dist = Dijkstra(Graph, start, dest)
    if min_dist == -1:
        print(f"Path from start {start} to destination {dest} does not exist.")
        return -1
    elev_heap = []
    attrs = {start: (0, 0, 0)}  # Dictionary stores 3 attributes: distance and elev gain from start, predecessor node
    touched = set()                # Maintains a set of nodes reachable from start, stop search when touched is empty
    for node in list(Graph.adj[start]):
        d = Graph.edges[start, node, 0]['dist']
        e = max(Graph.edges[start, node, 0]['elev'], 0)
        if min_elev == False:  e = -e              # Maximize elevation gain (flip elevation sign in heap)
        heappush(elev_heap, (e, (start, node, d)))
        touched.add(node)
        
    while len(elev_heap)>0:
        # print(f"Curr attrs {attrs}, curr touched {touched}")
        # print(f"Curr elev_heap {elev_heap}")
        elev, (u, v, dist_step) = heappop(elev_heap)
        if attrs[u][0] + dist_step > (1+percent) * min_dist:    
            continue
        if attrs.get(v, (-1, 10000, -1))[1] > elev:
            attrs[v] = (attrs[u][0]+dist_step, elev, u)
            touched.remove(v)
        for node in list(Graph.adj[v]):
            if node not in attrs.keys():
                d = Graph.edges[v, node, 0]['dist']
                e = max(Graph.edges[v, node, 0]['elev'], 0)
                if min_elev == False:  e = -e      # Maximize elevation gain (flip elevation sign in heap)
                heappush(elev_heap, (attrs[v][1]+e, (v, node, d)))
                touched.add(node)
    if dest in attrs.keys():
        if elev_min == False:  attrs[dest][1] = - attrs[dest][1]
        print(f"The optimal path from {start} to {dest} found, with {attrs[dest][1]} elevation gain.")
    else:
        print(f"Path from start {start} to destination {dest} does not exist.")



print(distance(42.371174, -72.498462, 42.373491, -72.501051))
print(distance(42.369365, -72.502101, 42.373491, -72.501051))


G = None
G = nx.MultiDiGraph()
G.add_nodes_from([1,2,3,4,5,6,7])
G.add_edges_from([
                  (1, 2, dict(dist=20, elev=3)),
                  (1, 6, dict(dist=100, elev=-2)),
                  (2, 3, dict(dist=35, elev=2)),
                  (2, 4, dict(dist=20, elev=-2)),
                  (3, 4, dict(dist=10, elev=-5)), 
                  (3, 6, dict(dist=30, elev=0)),
                  (4, 3, dict(dist=10, elev=5)),
                  (4, 5, dict(dist=20, elev=-2)),
                  (5, 6, dict(dist=20, elev=-1)), 
                  ])

print(Dijkstra(G, 1, 6))
print(A_star(G, 1, 3, 0.5))