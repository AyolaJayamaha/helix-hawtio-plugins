var app = angular.module("app", []);

app.controller("AppCtrl", function($http) {
    var app = this;
    $http.get("http://localhost:8100/clusters")
      .success(function(data) {
        app.clusters = data;
      })

		app.addInstances = function(cluster) {
        $http.post("http://localhost:8100/clusters/"+cluster.clusterName+"/instances", 'jsonParameters={"command":"addInstance","instanceNames":"' + cluster.instanceName+'"}')
          .success(function(data) {
		   //app.cluster.clusterName = null;
           // app.clusters = data;
		   app.listInstances(cluster);
          })
    }
	
	app.listClusters = function() {
        $http.get("http://localhost:8100/clusters")
      .success(function(data) {
        app.clusters = data;
      })
    }
	
	app.listInstances = function(cluster) {
	console.log(cluster.clusterName)
        $http.get("http://localhost:8100/clusters/"+cluster.clusterName+"/instances")
      .success(function(data) {
        app.instances = data;
      })
    }
	
	    app.removeClusters = function(cluster) {
        $http.delete("http://localhost:8100/clusters/"+cluster.clusterName)
          .success(function(data) {
		   app.cluster.clusterName = null;
		   app.listClusters();
		   alert('Succesfull Deleted');
          })
    }
	
})