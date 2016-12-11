/*
 * Controllers
 */

angular.module('d3-angular.controllers', ['simple-autocomplete'], function () { })


.controller('ListCtrl', function ($scope) {
    $scope.visualizations = [
                 "Task 1 - Parse the XML files and display all the post in a good ui.There should be only 10 posts in one page, post which all the others should be paginated",
                // "Build a vote up or vote down feature for every post. Use HTML 5 Local storage for storage",
                 "Task 3 - Classify every question into categories and display the split up of the questions based on categories using charts (use d3.js library)"
    ];
})

.controller('Viz1Ctrl', function ($scope, $http) {

    $scope.Users;
    $http.get("data/Users.xml",
            {
                transformResponse: function (cnv) {
                    var x2js = new X2JS();
                    var aftCnv = x2js.xml_str2json(cnv);
                    $scope.Users = aftCnv;
                    //  console.log($scope.Users);
                    return aftCnv;
                }
            })
    .success(function (response) {
        //console.log(response);
        // $scope.Users = response.data;
        // $scope.Users = console.log(response);
        console.log($scope.Users);
    });

})

.controller('Viz2Ctrl', function ($scope, $http) {
    // svg parameters
    var width = 500, height = 500, margin = 25, radius = Math.min(width, height) / 2;
    var color = d3.scale.category20c();     //builtin range of colors


   
    $http.get("data/Badges.xml",
            {
                transformResponse: function (cnv) {
                    var x2js = new X2JS();
                    var aftCnv = x2js.xml_str2json(cnv);
                    console.log(aftCnv);
                    // select our svg element, set up some properties
                    var svg = d3.select("svg")
                            .attr("width", width).attr("height", height)
                            .append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    // build the arc
                    var arc = d3.svg.arc()
                            .outerRadius(radius - 10)
                            .innerRadius(0);

                    // and the pie
                    var pie = d3.layout.pie()
                            .sort(null)
                            .value(function (d) { return d.Class; });

                    var g = svg.selectAll(".arc")
                            .data(pie(aftCnv))
                            .enter().append("g")
                            .attr("class", "arc");

                    g.append("path")
                            .attr("d", arc)
                            .style("fill", function (d) { return color(d.data.Name); });

                    g.append("text")
                            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
                            .attr("dy", ".35em")
                            .style("text-anchor", "middle")
                            .style("font-size", "28px")
                            .attr("fill", "#222")
                            .text(function (d) { return d.data.Name; });
                    return aftCnv;
                }
            })
    .success(function (response) {
        //console.log(response);
        // $scope.Users = response.data;
        // $scope.Users = console.log(response);
        console.log(aftCnv);
    });

   
 

});





