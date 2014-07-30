var app = angular.module("app", []);

app.controller("AppCtrl", function($http) {
    var app = this;
    $http.get("http://localhost:8100/clusters")
      .success(function(data) {
        app.clusters = data;
      })

		app.addResources = function(cluster) {
        $http.post("http://localhost:8100/clusters/"+cluster.clusterName+"/resourceGroups", 'jsonParameters={"command":"addResource","resourceGroupName":"' + cluster.resourceName+'","partitions":"8","stateModelDefRef":"MasterSlave"}')
          .success(function(data) {
		   //app.cluster.clusterName = null;
           // app.clusters = data;
		   app.listResources(cluster);
          })
    }
	
	app.listClusters = function() {
        $http.get("http://localhost:8100/clusters")
      .success(function(data) {
        app.clusters = data;
      })
    }
	
	app.listResources = function(cluster) {
	console.log(cluster.clusterName)
        $http.get("http://localhost:8100/clusters/"+cluster.clusterName+"/resourceGroups")
      .success(function(data) {
        app.resources = data;
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